import * as React from "react";

interface CustomerEmailProps {
  name: string;
}

export const CustomerEmailTemplate = ({ name }: CustomerEmailProps) => (
  <div
    style={{
      fontFamily:
        "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
      backgroundColor: "#f8fafc",
      padding: "50px 20px",
      color: "#0f172a",
    }}
  >
    <div
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        backgroundColor: "#ffffff",
        borderRadius: "16px",
        overflow: "hidden",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
        border: "1px solid #e2e8f0",
      }}
    >
      <div style={{ padding: "40px" }}>
        <div style={{ marginBottom: "32px", textAlign: "center" }}>
          <div
            style={{
              fontSize: "18px",
              fontWeight: "800",
              letterSpacing: "0.1em",
              color: "#0f172a",
            }}
          >
            QUANTUM <span style={{ color: "#0ea5e9" }}>BLAZE</span>
          </div>
          <div
            style={{
              fontSize: "10px",
              fontWeight: "600",
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              color: "#94a3b8",
              marginTop: "4px",
            }}
          >
            Engineering Digital Excellence
          </div>
        </div>

        <h2
          style={{
            fontSize: "20px",
            fontWeight: "700",
            marginBottom: "16px",
            color: "#0f172a",
          }}
        >
          Hello {name},
        </h2>

        <p
          style={{
            fontSize: "15px",
            lineHeight: "1.7",
            color: "#334155",
            marginBottom: "20px",
          }}
        >
          Thank you for reaching out to **Quantum Blaze**. We have successfully
          received your inquiry and our architectural team is currently
          reviewing your requirements.
        </p>

        <p
          style={{
            fontSize: "15px",
            lineHeight: "1.7",
            color: "#334155",
            marginBottom: "32px",
          }}
        >
          We pride ourselves on rapid and meaningful engagement. One of our
          technology leads will contact you within the next **24 business
          hours** to discuss the next steps of your project.
        </p>

        <div
          style={{
            padding: "24px",
            backgroundColor: "#f0f9ff",
            borderRadius: "12px",
            border: "1px solid #e0f2fe",
            marginBottom: "32px",
          }}
        >
          <p
            style={{
              margin: "0",
              fontSize: "14px",
              color: "#0369a1",
              fontWeight: "600",
              textAlign: "center",
            }}
          >
            &quot;We don&apos;t just build software; we architect solutions that
            define the future.&quot;
          </p>
        </div>

        <div style={{ borderTop: "1px solid #f1f5f9", paddingTop: "24px" }}>
          <p style={{ margin: "0", fontSize: "14px", color: "#64748b" }}>
            Best Regards,
          </p>
          <p
            style={{
              margin: "4px 0",
              fontSize: "15px",
              fontWeight: "700",
              color: "#0f172a",
            }}
          >
            The Quantum Blaze Team
          </p>
          <p style={{ margin: "0", fontSize: "12px", color: "#94a3b8" }}>
            Colombo, Sri Lanka • quantumblaze.lk
          </p>
        </div>
      </div>

      <div
        style={{
          padding: "20px",
          backgroundColor: "#f8fafc",
          textAlign: "center",
          borderTop: "1px solid #f1f5f9",
        }}
      >
        <p style={{ margin: "0", fontSize: "11px", color: "#cbd5e1" }}>
          This is an automated response from our inquiry engine.
        </p>
      </div>
    </div>
  </div>
);
