import type { Metadata } from "next";
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
        url: "/api/og?title=Premium Software Development Agency",
        width: 1200,
        height: 630,
        alt: "Quantum Blaze",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Quantum Blaze — Premium Software Development Agency",
    description:
      "We architect and engineer scalable, high-end digital products.",
    creator: "@quantumblaze",
    images: ["/api/og?title=Premium Software Development Agency"],
  },
  icons: {
    icon: "/circle-icon.png",
    shortcut: "/circle-icon.png",
    apple: "/circle-icon.png",
  },
  robots: {
    index: true,
    follow: true,
  },
};

import { CommandPalette } from "@/components/ui/CommandPalette";

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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Quantum Blaze",
              url: "https://quantumblaze.lk",
              logo: "https://quantumblaze.lk/qb-logo-final.png",
              sameAs: [
                "https://www.linkedin.com/company/quantum-blaze-software-solution-pvt-ltd",
                // "https://twitter.com/quantumblaze"
                "https://www.facebook.com/QuantumBlazeSoftwareSolutions",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+94-78-805-6838",
                contactType: "customer service",
                areaServed: "Global",
                availableLanguage: ["English", "Sinhala"],
              },
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
