import type { Metadata } from "next";
import { Space_Grotesk, Inter, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Quantum Blaze — Premium Software Development Agency",
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
    url: "https://quantumblaze.io",
    title: "Quantum Blaze — Premium Software Development Agency",
    description:
      "We architect and engineer scalable, high-end digital products. Enterprise SaaS, mobile apps, and custom web applications.",
    siteName: "Quantum Blaze",
  },
  twitter: {
    card: "summary_large_image",
    title: "Quantum Blaze — Premium Software Development Agency",
    description:
      "We architect and engineer scalable, high-end digital products.",
    creator: "@quantumblaze",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(spaceGrotesk.variable, inter.variable, "font-sans", geist.variable)}
      suppressHydrationWarning
    >
      <head>
        <link rel="canonical" href="https://quantumblaze.io" />
        <meta name="theme-color" content="#020c1b" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
