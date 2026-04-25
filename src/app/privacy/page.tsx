import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPolicy() {
  return (
    <main
      className="min-h-screen flex flex-col"
      style={{ background: "var(--bg-primary)" }}
    >
      <Navbar />

      <div className="flex-grow pt-32 pb-20">
        <div className="container-narrow">
          <div className="mb-12">
            <SectionLabel>Legal</SectionLabel>
            <h1
              className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6"
              style={{ fontFamily: "var(--font-grotesk)" }}
            >
              Privacy <span className="text-sky-400">Policy</span>
            </h1>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              Last updated:{" "}
              {new Date().toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>

          <div
            className="prose prose-invert max-w-none space-y-8"
            style={{ color: "var(--text-primary)" }}
          >
            <section>
              <h2
                className="text-2xl font-bold text-white mb-4"
                style={{ fontFamily: "var(--font-grotesk)" }}
              >
                1. Introduction
              </h2>
              <p className="leading-relaxed mb-4">
                At Quantum Blaze, we take your privacy seriously. This Privacy
                Policy explains how we collect, use, disclose, and safeguard
                your information when you visit our website or engage with our
                services.
              </p>
              <p className="leading-relaxed">
                Please read this privacy policy carefully. If you do not agree
                with the terms of this privacy policy, please do not access the
                site.
              </p>
            </section>

            <section>
              <h2
                className="text-2xl font-bold text-white mb-4"
                style={{ fontFamily: "var(--font-grotesk)" }}
              >
                2. Information We Collect
              </h2>
              <p className="leading-relaxed mb-4">
                We may collect information about you in a variety of ways. The
                information we may collect on the Site includes:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>
                  <strong>Personal Data:</strong> Personally identifiable
                  information, such as your name, email address, and telephone
                  number that you voluntarily give to us when you choose to
                  participate in various activities related to the Site, such as
                  contacting us.
                </li>
                <li>
                  <strong>Derivative Data:</strong> Information our servers
                  automatically collect when you access the Site, such as your
                  IP address, your browser type, your operating system, your
                  access times, and the pages you have viewed directly before
                  and after accessing the Site.
                </li>
              </ul>
            </section>

            <section>
              <h2
                className="text-2xl font-bold text-white mb-4"
                style={{ fontFamily: "var(--font-grotesk)" }}
              >
                3. Use of Your Information
              </h2>
              <p className="leading-relaxed mb-4">
                Having accurate information about you permits us to provide you
                with a smooth, efficient, and customized experience.
                Specifically, we may use information collected about you via the
                Site to:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>
                  Respond to your project inquiries and provide consultation.
                </li>
                <li>Improve our website and services.</li>
                <li>
                  Send you periodic emails regarding your project or other
                  products and services.
                </li>
              </ul>
            </section>

            <section>
              <h2
                className="text-2xl font-bold text-white mb-4"
                style={{ fontFamily: "var(--font-grotesk)" }}
              >
                4. Contact Us
              </h2>
              <p className="leading-relaxed">
                If you have questions or comments about this Privacy Policy,
                please contact us at:
                <br />
                <br />
                <strong>Quantum Blaze</strong>
                <br />
                Colombo, Sri Lanka
                <br />
                Email: hello@quantumblaze.io
              </p>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
