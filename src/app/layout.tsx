import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Space_Grotesk, Inter, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://quantumblaze.lk"),
  title: {
    default: "Quantum Blaze — Premium Software Development Agency",
    template: "%s | Quantum Blaze",
  },
  description:
    "We architect and engineer scalable, high-end digital products. Enterprise SaaS, mobile apps, and custom web applications built by a world-class team.",
  keywords: [
    "software development agency",
    "enterprise SaaS",
    "mobile app development",
    "web application",
    "Sri Lanka tech company",
    "Next.js development",
    "Flutter app development",
    "Quantum Blaze",
  ],
  authors: [{ name: "Quantum Blaze" }],
  creator: "Quantum Blaze",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://quantumblaze.lk",
    title: "Quantum Blaze — Premium Software Development Agency",
    description:
      "We architect and engineer scalable, high-end digital products. Enterprise SaaS, mobile apps, and custom web applications.",
    siteName: "Quantum Blaze",
    images: [
      {
        url: "https://quantumblaze.lk/og-image.png",
        width: 1200,
        height: 630,
        alt: "Quantum Blaze - Premium Software Development Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Quantum Blaze — Premium Software Development Agency",
    description:
      "We architect and engineer scalable, high-end digital products.",
    creator: "@quantumblaze",
    images: ["https://quantumblaze.lk/og-image.png"],
  },
  icons: {
    icon: "/original-logo.png",
    shortcut: "/original-logo.png",
    apple: "/original-logo.png",
  },
  robots: {
    index: true,
    follow: true,
  },
};

import { CommandPalette } from "@/components/ui/CommandPalette";
import { ScrollToTop } from "@/components/providers/ScrollToTop";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(
        spaceGrotesk.variable,
        inter.variable,
        "font-sans",
        geist.variable
      )}
      suppressHydrationWarning
    >
      <head>
        <link rel="canonical" href="https://quantumblaze.lk" />
        <meta name="theme-color" content="#020c1b" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="antialiased">
        <ScrollToTop />
        <Analytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Quantum Blaze",
              alternateName: "Quantum Blaze Software Solutions",
              url: "https://quantumblaze.lk",
              logo: "https://quantumblaze.lk/original-logo.png",
              image: "https://quantumblaze.lk/og-image.png",
              description:
                "Quantum Blaze is a premium software development agency in Sri Lanka, specializing in custom web applications, mobile apps, enterprise SaaS solutions, and UI/UX design. We architect and engineer scalable, high-performance digital products for businesses worldwide.",
              foundingDate: "2024",
              industry: "Software Development",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Urapola",
                addressRegion: "Southern Province",
                addressCountry: "LK",
              },
              sameAs: [
                "https://www.linkedin.com/company/quantum-blaze-software-solution-pvt-ltd",
                // "https://twitter.com/quantumblaze"
                "https://www.facebook.com/Quantum.Blaze.Pvt.Ltd",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+94-78-805-6838",
                contactType: "customer service",
                areaServed: "Global",
                availableLanguage: ["English", "Sinhala"],
              },
              knowsAbout: [
                "Web Application Development",
                "Mobile App Development",
                "Enterprise SaaS",
                "UI/UX Design",
                "Cloud & DevOps",
                "Next.js",
                "Flutter",
                "React",
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Quantum Blaze",
              url: "https://quantumblaze.lk",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://quantumblaze.lk/?s={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
        {children}
        <CommandPalette />
      </body>
    </html>
  );
}
