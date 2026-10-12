import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RevealObserver from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import Analytics from "@/components/Analytics";
import { site } from "@/content/site";
import { graph, organization, website } from "@/lib/schema";
import { asset } from "@/lib/paths";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `Video Production & Digital Marketing Agency in Dubai | ${site.name}`,
    template: `%s | ${site.shortName}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  category: "Marketing and advertising",
  openGraph: {
    siteName: site.name,
    locale: site.locale,
    type: "website",
    images: [{ url: "/media/og.jpg", width: 1200, height: 630, alt: "The Creative Economy, video production and digital marketing agency in Dubai, UAE" }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-video-preview": -1, "max-snippet": -1 } },
  verification: {
    ...(site.analytics.googleSiteVerification ? { google: site.analytics.googleSiteVerification } : {}),
    ...(site.analytics.bingSiteVerification ? { other: { "msvalidate.01": site.analytics.bingSiteVerification } } : {}),
  },
  other: { "geo.region": "AE", "geo.placename": "United Arab Emirates" },
};

export const viewport: Viewport = {
  themeColor: "#080808",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const plausible = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AE">
      <body>
        <Header />
        {children}
        <Footer />
        <RevealObserver />
        <JsonLd data={graph(organization(), website())} />
        <Analytics />
        {/* TCE chat assistant (public/tce-chatbot.js): scripted answers, runs in the browser, on every page */}
        <Script src={asset("/tce-chatbot.js")} strategy="lazyOnload" />
        {plausible && <Script defer data-domain={plausible} src="https://plausible.io/js/script.js" strategy="afterInteractive" />}
      </body>
    </html>
  );
}
