import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import SmartLink from "@/components/SmartLink";
import CookieSettingsButton from "@/components/CookieSettingsButton";
import { ContactLine } from "@/components/LegalContact";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

const description = "Which cookies The Creative Economy (TCE) website uses, why, and how to change your choice.";
export const metadata: Metadata = pageMetadata({ title: "Cookie Policy", description, path: "/cookie-policy" });

export default function CookiePolicy() {
  const analytics = !!site.analytics.ga4;
  return (
    <LegalPage title="Cookie Policy" path="/cookie-policy" description={description}>
      <h2>1. What cookies are</h2>
      <p>Cookies are small files a website stores on your device. Similar technologies, such as local storage, work in the same way. Some are needed for a site to work; others help the owner understand how it is used.</p>

      <h2>2. Cookies on this website</h2>
      {analytics ? (
        <>
          <p>We only set analytics cookies if you accept them in the cookie banner. If you decline, Google Analytics stores nothing on your device.</p>
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Provider</th>
                  <th scope="col">Purpose</th>
                  <th scope="col">Duration</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>tce-consent</td>
                  <td>TCE (local storage)</td>
                  <td>Remembers whether you accepted or declined analytics cookies.</td>
                  <td>Until you clear it</td>
                </tr>
                <tr>
                  <td>tce-chat-lang</td>
                  <td>TCE (local storage)</td>
                  <td>Remembers whether you chose English or Arabic in the chat assistant.</td>
                  <td>Until you clear it</td>
                </tr>
                <tr>
                  <td>_ga</td>
                  <td>Google Analytics</td>
                  <td>Distinguishes visitors so we can count them. Only after you accept.</td>
                  <td>2 years</td>
                </tr>
                <tr>
                  <td>_ga_*</td>
                  <td>Google Analytics</td>
                  <td>Keeps track of your visit. Only after you accept.</td>
                  <td>2 years</td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <p>This website does not currently set analytics or advertising cookies. Our hosting provider may set strictly necessary cookies to deliver the site securely; these don’t track you across other websites.</p>
      )}
      <p>Our films are hosted with the site rather than on YouTube or Vimeo, so watching them sets no third-party cookies. Links to WhatsApp and Instagram take you to those services, which have their own cookie policies.</p>

      {analytics && (
        <>
          <h2>3. Changing your choice</h2>
          <p>You can change your mind at any time:</p>
          <p>
            <CookieSettingsButton className="btn" />
          </p>
          <p>You can also block or delete cookies in your browser settings.</p>
        </>
      )}

      <h2>{analytics ? "4" : "3"}. More information</h2>
      <p>
        See our <SmartLink href="/privacy-policy">Privacy Policy</SmartLink> for how we handle personal data, or contact us:
      </p>
      <ContactLine />
    </LegalPage>
  );
}
