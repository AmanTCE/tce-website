import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import SmartLink from "@/components/SmartLink";
import { Operator, ContactLine } from "@/components/LegalContact";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { netlifyForms } from "@/lib/paths";

const description = "How The Creative Economy (TCE) collects, uses and protects personal data from this website, in line with the UAE Personal Data Protection Law.";
export const metadata: Metadata = pageMetadata({ title: "Privacy Policy", description, path: "/privacy-policy" });

export default function PrivacyPolicy() {
  const analytics = !!site.analytics.ga4;
  return (
    <LegalPage title="Privacy Policy" path="/privacy-policy" description={description}>
      <h2>1. Who we are</h2>
      <Operator />
      <p>
        This policy explains what personal data we collect through this website, why, and the choices you have. We handle personal data in line with the UAE Federal Decree-Law No. 45 of 2021 on the Protection of Personal Data (PDPL) and, where it applies to you, other data protection laws such as the EU General Data Protection Regulation.
      </p>

      <h2>2. What we collect</h2>
      <h3>When you send an enquiry</h3>
      <p>The enquiry form asks for your name, company or brand, email address, phone or WhatsApp number, the service you’re interested in, an optional budget range and a description of your project.</p>
      <p>
        {netlifyForms
          ? "When you send the form, your enquiry is stored by our website host, Netlify, and emailed to our team through Web3Forms, a form delivery service."
          : "On this website the form doesn’t send anything itself: it opens your own email app or WhatsApp with your details filled in, and nothing reaches us until you press send there. Email and WhatsApp (operated by Meta) handle your message under their own privacy policies."}{" "}
        If you message or email us directly, we receive what you choose to send.
      </p>
      <h3>When you browse the site</h3>
      {analytics ? (
        <p>
          If you accept analytics cookies, we use Google Analytics 4 to understand how visitors use the site: pages visited, approximate location (country and city), device and browser type, how you arrived and actions such as opening WhatsApp. Google Analytics does not log or store your full IP address. If you decline, Google Analytics stores no cookies on your device. See our <SmartLink href="/cookie-policy">Cookie Policy</SmartLink>.
        </p>
      ) : (
        <p>This website does not currently use analytics or advertising cookies. If that changes, this policy and our <SmartLink href="/cookie-policy">Cookie Policy</SmartLink> will be updated first and we will ask for your consent.</p>
      )}
      <p>Our hosting provider automatically processes technical information such as your IP address and browser type to deliver the site and keep it secure.</p>

      <h2>3. How we use your data</h2>
      <ul>
        <li>To reply to your enquiry and discuss your project.</li>
        <li>To prepare proposals and quotes, and to deliver services you engage us for.</li>
        <li>To understand and improve how the website performs{analytics ? ", where you have consented" : ""}.</li>
        <li>To keep the website secure and to meet our legal obligations.</li>
      </ul>
      <p>We do not sell your personal data, and we do not use it for marketing you haven’t asked for.</p>

      <h2>4. Our legal grounds</h2>
      <p>
        We process your data because you asked us to (for example by sending an enquiry), to take steps before entering into a contract with you, with your consent (for analytics cookies), for our legitimate interest in running and securing our business and website, or where the law requires it.
      </p>

      <h2>5. Who we share it with</h2>
      <p>We share personal data only with service providers that help us run the website and our business, and only as far as they need it:</p>
      <ul>
        <li>Website hosting{netlifyForms ? " and form handling (Netlify and Web3Forms)" : ""}.</li>
        <li>Email (Gmail, operated by Google), where enquiries sent by email arrive.</li>
        <li>Messaging (WhatsApp, operated by Meta), when you choose to contact us there.</li>
        {analytics && <li>Website analytics (Google Analytics, operated by Google).</li>}
        <li>Professional advisers, or authorities where the law requires it.</li>
      </ul>
      <p>Some of these providers process data outside the UAE. Where they do, we rely on them to protect it to the standard the PDPL requires.</p>

      <h2>6. How long we keep it</h2>
      <p>We keep enquiry details for as long as we need them to respond and to handle any work that follows, and after that only for as long as the law requires or allows.</p>

      <h2>7. Your rights</h2>
      <p>Under the PDPL you can ask us to:</p>
      <ul>
        <li>give you a copy of the personal data we hold about you;</li>
        <li>correct data that is inaccurate or incomplete;</li>
        <li>delete your data, or restrict how we use it;</li>
        <li>stop processing your data, including withdrawing any consent you gave;</li>
        <li>transfer your data to another organisation where technically possible.</li>
      </ul>
      <p>To make a request, contact us using the details below. If you are not satisfied with our response, you can complain to the UAE Data Office.</p>

      <h2>8. Security</h2>
      <p>We use reasonable technical and organisational measures to protect personal data. No method of transmission over the internet is completely secure, so please don’t send sensitive personal information through the enquiry form.</p>

      <h2>9. Children</h2>
      <p>This website is meant for businesses and adults. We do not knowingly collect personal data from anyone under 18.</p>

      <h2>10. Changes to this policy</h2>
      <p>We may update this policy. The date at the top shows when it last changed.</p>

      <h2>11. Contact us</h2>
      <p>For any privacy question or request, contact {site.name}:</p>
      <ContactLine />
    </LegalPage>
  );
}
