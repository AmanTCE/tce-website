"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "./Arrow";
import SmartLink from "./SmartLink";
import { enquiryServiceOptions, coreServices, growthCapabilities } from "@/content/services";
import { budgetOptions, validateEnquiry, type Enquiry, type FieldErrors } from "@/lib/contact";
import { isPreview, isPublicStatic, netlifyForms } from "@/lib/paths";

/** A static host with no form service: the enquiry is handed to email or WhatsApp instead. */
const handoff = isPublicStatic && !netlifyForms;
import { site } from "@/content/site";
import { track } from "./Analytics";

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "sent" }
  | { kind: "whatsapp" }
  | { kind: "email" }
  | { kind: "error"; message: string };

const empty: Enquiry = { name: "", company: "", email: "", phone: "", service: "", budget: "", message: "" };

export default function ContactForm() {
  const [values, setValues] = useState<Enquiry>(empty);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof Enquiry, boolean>>>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const startedAt = useRef(Date.now());
  const statusRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Preselect a service from ?service=slug (links on the Services page use this).
  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get("service");
    if (!slug) return;
    const match = [...coreServices, ...growthCapabilities].find((s) => s.slug === slug);
    if (match) setValues((v) => ({ ...v, service: match.title }));
  }, []);

  const update = (k: keyof Enquiry) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const next = { ...values, [k]: e.target.value };
    setValues(next);
    if (touched[k]) setErrors(validateEnquiry(next).errors);
  };
  const blur = (k: keyof Enquiry) => () => {
    setTouched((t) => ({ ...t, [k]: true }));
    setErrors(validateEnquiry(values).errors);
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { errors: errs } = validateEnquiry(values);
    setErrors(errs);
    setTouched({ name: true, email: true, phone: true, service: true, budget: true, message: true });
    if (Object.keys(errs).length) {
      const first = Object.keys(errs)[0];
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    // Static hosting has no server to send from: hand the enquiry, prefilled, to the visitor's
    // email app or to WhatsApp, depending on the button they pressed.
    const via = ((e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null)?.value;
    if (handoff && (site.contact.email || site.contact.whatsapp)) {
      const fields: [string, string][] = [
        ["Name", values.name],
        ["Company", values.company],
        ["Email", values.email],
        ["Phone", values.phone],
        ["Interested in", values.service],
        ["Budget", values.budget],
      ];
      const lines = [
        "New enquiry from the TCE website",
        ...fields.filter(([, v]) => v.trim()).map(([k, v]) => `${k}: ${v.trim()}`),
        "",
        values.message.trim(),
      ];
      if ((via === "email" || !site.contact.whatsapp) && site.contact.email) {
        track("generate_lead", { method: "email_form", service: values.service });
        const subject = `Website enquiry: ${values.service}${values.company.trim() ? ` for ${values.company.trim()}` : ""}`;
        window.location.href = `mailto:${site.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
        setStatus({ kind: "email" });
      } else {
        track("generate_lead", { method: "whatsapp_form", service: values.service });
        window.open(`https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`, "_blank", "noopener");
        setStatus({ kind: "whatsapp" });
      }
      window.setTimeout(() => statusRef.current?.focus(), 0);
      return;
    }

    setStatus({ kind: "sending" });
    const website = (formRef.current?.elements.namedItem("website") as HTMLInputElement | null)?.value ?? "";

    try {
      if (isPreview) throw new Error("preview");
      if (netlifyForms) {
        // Netlify Forms: matches the hidden form in public/__forms.html. Netlify stores the
        // enquiry, filters spam (the "website" honeypot) and emails it to TCE.
        const res = await fetch("/__forms.html", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({ "form-name": "enquiry", ...values, website }).toString(),
        });
        if (!res.ok) throw new Error(`netlify ${res.status}`);
        track("generate_lead", { method: "form", service: values.service });
        setStatus({ kind: "sent" });
        setValues(empty);
        setTouched({});
        window.setTimeout(() => statusRef.current?.focus(), 0);
        return;
      }
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, website, startedAt: startedAt.current }),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.ok) {
        track("generate_lead", { method: "form", service: values.service });
        setStatus({ kind: "sent" });
        setValues(empty);
        setTouched({});
      } else {
        if (json.errors) setErrors(json.errors);
        setStatus({ kind: "error", message: json.message || "Your message was not sent. Please try again." });
      }
    } catch {
      setStatus({
        kind: "error",
        message: isPreview
          ? "This is a design preview with no enquiry inbox connected, so your message was not sent."
          : "We couldn’t reach the server, so your message was not sent. Please check your connection and try again.",
      });
    }
    window.setTimeout(() => statusRef.current?.focus(), 0);
  }

  if (status.kind === "sent") {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="page-enter border-t border-ink pt-10 outline-none">
        <p className="label">Message received</p>
        <h2 className="display display-md mt-6">Thank you. Your enquiry is with us.</h2>
        <p className="mt-6 max-w-md text-charcoal">We’ll reply to the email address you gave us.</p>
        <button type="button" onClick={() => setStatus({ kind: "idle" })} className="link-line mt-10">
          Send another enquiry
        </button>
      </div>
    );
  }

  const fieldProps = (k: keyof Enquiry) => ({
    id: `f-${k}`,
    name: k,
    value: values[k],
    onChange: update(k),
    onBlur: blur(k),
    "aria-invalid": touched[k] && errors[k] ? (true as const) : undefined,
    "aria-describedby": touched[k] && errors[k] ? `e-${k}` : undefined,
    className: "input",
  });
  const err = (k: keyof Enquiry) =>
    touched[k] && errors[k] ? (
      <p id={`e-${k}`} className="field-error">
        {errors[k]}
      </p>
    ) : null;

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="grid gap-10" aria-describedby="form-note">
      <p id="form-note" className="mono text-[0.7rem] uppercase tracking-[0.12em] text-mute">
        Fields marked <span className="text-blue">*</span> are required
      </p>

      <div className="grid gap-10 md:grid-cols-2 md:gap-x-10">
        <div className="field">
          <label htmlFor="f-name">Full name <span className="req">*</span></label>
          <input {...fieldProps("name")} type="text" autoComplete="name" required placeholder="Your name" />
          {err("name")}
        </div>
        <div className="field">
          <label htmlFor="f-company">Company / brand name</label>
          <input {...fieldProps("company")} type="text" autoComplete="organization" placeholder="Brand or company" />
        </div>
        <div className="field">
          <label htmlFor="f-email">Email address <span className="req">*</span></label>
          <input {...fieldProps("email")} type="email" autoComplete="email" inputMode="email" required placeholder="name@company.com" />
          {err("email")}
        </div>
        <div className="field">
          <label htmlFor="f-phone">Phone / WhatsApp</label>
          <input {...fieldProps("phone")} type="tel" autoComplete="tel" inputMode="tel" placeholder="+971" />
          {err("phone")}
        </div>
        <div className="field">
          <label htmlFor="f-service">Service interested in <span className="req">*</span></label>
          <select {...fieldProps("service")} required>
            <option value="" disabled>
              Choose a service
            </option>
            <optgroup label="Core services">
              {coreServices.map((s) => (
                <option key={s.slug}>{s.title}</option>
              ))}
            </optgroup>
            <optgroup label="Growth capabilities">
              {growthCapabilities.map((c) => (
                <option key={c.slug}>{c.title}</option>
              ))}
            </optgroup>
            <option>{enquiryServiceOptions[enquiryServiceOptions.length - 1]}</option>
          </select>
          {err("service")}
        </div>
        <div className="field">
          <label htmlFor="f-budget">Estimated budget (optional)</label>
          <select {...fieldProps("budget")}>
            <option value="">Prefer not to say</option>
            {budgetOptions.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
          {err("budget")}
        </div>
      </div>

      <div className="field">
        <label htmlFor="f-message">Project description <span className="req">*</span></label>
        <textarea {...fieldProps("message")} required rows={6} placeholder="What are you working on, and what would you like to achieve?" />
        {err("message")}
      </div>

      {/* Honeypot: hidden from people and assistive tech, tempting to bots */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="f-website">Website</label>
        <input id="f-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-6 border-t border-ink/15 pt-8 md:grid-cols-[1fr_auto] md:items-center">
        <p className="max-w-md text-sm text-mute">
          We use the details in this form only to reply to your enquiry, as explained in our{" "}
          <SmartLink href="/privacy-policy" className="underline decoration-blue underline-offset-4">
            Privacy Policy
          </SmartLink>
          . Please don’t include sensitive personal information.
        </p>
        {handoff ? (
          <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
            {site.contact.email && (
              <button type="submit" name="via" value="email" className="btn btn-lg w-full sm:w-auto">
                Send by email <ArrowUpRight />
              </button>
            )}
            {site.contact.whatsapp && (
              <button type="submit" name="via" value="whatsapp" className={`btn btn-lg w-full sm:w-auto ${site.contact.email ? "btn-ghost" : ""}`}>
                Send on WhatsApp <ArrowUpRight />
              </button>
            )}
          </div>
        ) : (
          <button type="submit" className="btn btn-lg w-full md:w-auto" disabled={status.kind === "sending"} aria-disabled={status.kind === "sending"}>
            {status.kind === "sending" ? "Sending…" : "Send Enquiry"} <ArrowUpRight />
          </button>
        )}
      </div>

      <div ref={statusRef} tabIndex={-1} aria-live="assertive" className="outline-none">
        {status.kind === "whatsapp" && (
          <p role="status" className="mt-6 border-l-2 border-blue bg-stone px-5 py-4 text-charcoal">
            WhatsApp has opened with your enquiry filled in. Press send there and it reaches our team. If nothing opened,{" "}
            <a className="underline" href={`https://wa.me/${site.contact.whatsapp}`} target="_blank" rel="noopener noreferrer">
              message us on WhatsApp
            </a>
            .
          </p>
        )}
        {status.kind === "email" && site.contact.email && (
          <p role="status" className="mt-6 border-l-2 border-blue bg-stone px-5 py-4 text-charcoal">
            Your email app has opened with your enquiry filled in. Press send there and it reaches our team. If nothing opened, email us at{" "}
            <a className="underline" href={`mailto:${site.contact.email}`}>
              {site.contact.email}
            </a>
            .
          </p>
        )}
        {status.kind === "error" && (
          <p role="alert" className="border-l-2 border-[#b3261e] bg-[#b3261e]/5 px-5 py-4 text-[0.95rem] text-charcoal">
            {status.message}
          </p>
        )}
      </div>
    </form>
  );
}
