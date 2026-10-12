import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import SmartLink from "@/components/SmartLink";
import { Operator, ContactLine } from "@/components/LegalContact";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

const description = "The terms that apply when you use The Creative Economy (TCE) website, including intellectual property, liability and governing law.";
export const metadata: Metadata = pageMetadata({ title: "Terms of Use", description, path: "/terms" });

export default function Terms() {
  const courts = site.legal.jurisdiction ? `the courts of the Emirate of ${site.legal.jurisdiction}` : "the competent courts of the United Arab Emirates";
  return (
    <LegalPage title="Terms of Use" path="/terms" description={description}>
      <h2>1. About these terms</h2>
      <Operator />
      <p>By using this website you agree to these terms. If you don’t agree, please don’t use the site.</p>

      <h2>2. Using the website</h2>
      <p>You may browse the site and share links to it. You must not misuse it, for example by trying to gain unauthorised access, disrupting how it works, or using it for anything unlawful.</p>

      <h2>3. Intellectual property</h2>
      <p>
        The films, photographs, text, design and the TCE logo on this website belong to TCE or are used with permission. You may not copy, download, edit or republish them without our written consent, except as the law allows.
      </p>
      <p>Client names, logos and brands shown on the site are the property of their owners. They are shown to identify work TCE has produced and do not mean those owners endorse this website.</p>

      <h2>4. Enquiries and services</h2>
      <p>Information on this website describes our services in general terms and is not an offer. Any work we do for you is governed by a separate written proposal or agreement, which takes priority over anything on this site.</p>

      <h2>5. Accuracy</h2>
      <p>We work to keep the website accurate and up to date, but we don’t guarantee that it is complete, error-free or always available.</p>

      <h2>6. Links to other websites</h2>
      <p>The site links to services such as WhatsApp and Instagram. We are not responsible for the content or privacy practices of websites we don’t control.</p>

      <h2>7. Liability</h2>
      <p>To the extent the law allows, TCE is not liable for any loss arising from your use of this website or reliance on its content. Nothing in these terms limits liability that cannot be limited by law.</p>

      <h2>8. Privacy</h2>
      <p>
        How we handle personal data is explained in our <SmartLink href="/privacy-policy">Privacy Policy</SmartLink> and <SmartLink href="/cookie-policy">Cookie Policy</SmartLink>.
      </p>

      <h2>9. Governing law</h2>
      <p>These terms are governed by the laws of the United Arab Emirates. Any dispute will be handled by {courts}.</p>

      <h2>10. Changes</h2>
      <p>We may update these terms. The date at the top shows when they last changed.</p>

      <h2>11. Contact</h2>
      <ContactLine />
    </LegalPage>
  );
}
