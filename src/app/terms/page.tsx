import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
};

export default function TermsOfService() {
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
              Terms of <span className="text-sky-400">Service</span>
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
                1. Agreement to Terms
              </h2>
              <p className="leading-relaxed mb-4">
                These Terms of Service constitute a legally binding agreement
                made between you and Quantum Blaze concerning your access to and
                use of our website and services.
              </p>
              <p className="leading-relaxed">
                By accessing the site, you agree that you have read, understood,
                and agree to be bound by all of these Terms of Service. If you
                do not agree with all of these Terms of Service, then you are
                expressly prohibited from using the site and you must
                discontinue use immediately.
              </p>
            </section>

            <section>
              <h2
                className="text-2xl font-bold text-white mb-4"
                style={{ fontFamily: "var(--font-grotesk)" }}
              >
                2. Intellectual Property Rights
              </h2>
              <p className="leading-relaxed mb-4">
                Unless otherwise indicated, the Site is our proprietary property
                and all source code, databases, functionality, software, website
                designs, audio, video, text, photographs, and graphics on the
                Site (collectively, the "Content") and the trademarks, service
                marks, and logos contained therein are owned or controlled by us
                or licensed to us.
              </p>
            </section>

            <section>
              <h2
                className="text-2xl font-bold text-white mb-4"
                style={{ fontFamily: "var(--font-grotesk)" }}
              >
                3. User Representations
              </h2>
              <p className="leading-relaxed mb-4">
                By using the Site, you represent and warrant that:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>
                  All registration information you submit will be true,
                  accurate, current, and complete.
                </li>
                <li>
                  You will maintain the accuracy of such information and
                  promptly update such registration information as necessary.
                </li>
                <li>
                  You have the legal capacity and you agree to comply with these
                  Terms of Service.
                </li>
                <li>
                  You will not use the Site for any illegal or unauthorized
                  purpose.
                </li>
              </ul>
            </section>

            <section>
              <h2
                className="text-2xl font-bold text-white mb-4"
                style={{ fontFamily: "var(--font-grotesk)" }}
              >
                4. Modifications and Interruptions
              </h2>
              <p className="leading-relaxed mb-4">
                We reserve the right to change, modify, or remove the contents
                of the Site at any time or for any reason at our sole discretion
                without notice. We also reserve the right to modify or
                discontinue all or part of the Site without notice at any time.
                We will not be liable to you or any third party for any
                modification, price change, suspension, or discontinuance of the
                Site.
              </p>
            </section>

            <section>
              <h2
                className="text-2xl font-bold text-white mb-4"
                style={{ fontFamily: "var(--font-grotesk)" }}
              >
                5. Contact Us
              </h2>
              <p className="leading-relaxed">
                In order to resolve a complaint regarding the Site or to receive
                further information regarding use of the Site, please contact us
                at:
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
