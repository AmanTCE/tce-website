import { site, formatWhatsapp } from "@/content/site";

/** Who runs the site and how to reach them, as stated on the legal pages. */
export function Operator() {
  const { companyName, licenceNumber, licensingAuthority } = site.legal;
  return (
    <p>
      This website is operated by {companyName ? <>{companyName}, trading as {site.name} (“TCE”, “we”, “us”)</> : <>{site.name} (“TCE”, “we”, “us”)</>}, a creative media and growth marketing agency in the United Arab Emirates
      {licenceNumber && licensingAuthority ? <>, licensed by {licensingAuthority} under trade licence number {licenceNumber}</> : null}.
    </p>
  );
}

export function ContactLine() {
  const { email, whatsapp } = site.contact;
  return (
    <ul>
      {email && (
        <li>
          Email: <a href={`mailto:${email}`}>{email}</a>
        </li>
      )}
      {whatsapp && (
        <li>
          WhatsApp:{" "}
          <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer">
            {formatWhatsapp(whatsapp)}
          </a>
        </li>
      )}
      {site.contact.address && (
        <li>
          Address: {site.contact.address.street}, {site.contact.address.city}, {site.contact.address.emirate}, United Arab Emirates
        </li>
      )}
    </ul>
  );
}
