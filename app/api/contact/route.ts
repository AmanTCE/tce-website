import { NextResponse } from "next/server";
import { validateEnquiry } from "@/lib/contact";

/**
 * Enquiry endpoint. Delivers by email through the Resend HTTP API when
 * RESEND_API_KEY, CONTACT_TO_EMAIL and CONTACT_FROM_EMAIL are set (server-side
 * only). Without them it answers 503 and the form tells the visitor plainly
 * that nothing was sent.
 */
export const runtime = "nodejs";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

const escapeHtml = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, code: "bad_request", message: "The form could not be read. Please try again." }, { status: 400 });
  }

  // Spam protection: hidden honeypot field and a minimum time on the page.
  const startedAt = Number(body.startedAt);
  if (typeof body.website === "string" && body.website.length > 0) {
    return NextResponse.json({ ok: true }); // silently accept bots
  }
  if (!Number.isFinite(startedAt) || Date.now() - startedAt < 3000) {
    return NextResponse.json({ ok: false, code: "too_fast", message: "That was quicker than expected. Please wait a moment and send again." }, { status: 400 });
  }

  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, code: "rate_limited", message: "Too many messages from this connection. Please try again in a few minutes." }, { status: 429 });
  }

  const { data, errors } = validateEnquiry(body);
  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, code: "invalid", errors, message: "Please check the highlighted fields." }, { status: 422 });
  }

  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env;
  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) {
    return NextResponse.json(
      { ok: false, code: "not_configured", message: "Our enquiry inbox isn’t connected yet, so your message was not sent." },
      { status: 503 },
    );
  }

  const rows: [string, string][] = [
    ["Name", data.name],
    ["Company / brand", data.company || "—"],
    ["Email", data.email],
    ["Phone / WhatsApp", data.phone || "—"],
    ["Service", data.service],
    ["Budget", data.budget || "—"],
  ];
  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n") + `\n\n${data.message}`;
  const html =
    `<table cellpadding="6">${rows.map(([k, v]) => `<tr><td><b>${k}</b></td><td>${escapeHtml(v)}</td></tr>`).join("")}</table>` +
    `<p style="white-space:pre-wrap">${escapeHtml(data.message)}</p>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: CONTACT_FROM_EMAIL,
        to: CONTACT_TO_EMAIL.split(",").map((s) => s.trim()),
        reply_to: data.email,
        subject: `New enquiry: ${data.service} from ${data.name}`,
        text,
        html,
      }),
    });
    if (!res.ok) throw new Error(`Resend responded ${res.status}`);
  } catch (err) {
    console.error("[contact] delivery failed", err);
    return NextResponse.json({ ok: false, code: "delivery_failed", message: "We couldn’t deliver your message just now. Please try again shortly." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
