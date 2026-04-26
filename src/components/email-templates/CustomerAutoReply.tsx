import * as React from "react";

interface CustomerEmailProps {
  name: string;
}

export const CustomerEmailTemplate = ({ name }: CustomerEmailProps) => (
  <div
    style={{
      fontFamily: "'Inter', sans-serif",
      backgroundColor: "#050b14",
      color: "#ffffff",
      padding: "40px",
      borderRadius: "20px",
      maxWidth: "600px",
      margin: "0 auto",
      border: "1px solid rgba(14, 165, 233, 0.2)",
    }}
  >
    <div style={{ textAlign: "center", marginBottom: "30px" }}>
      <h1 style={{ color: "#0ea5e9", fontSize: "28px", margin: "0" }}>
        Quantum Blaze
      </h1>
      <p
        style={{
          color: "#64748b",
          fontSize: "12px",
          textTransform: "uppercase",
          letterSpacing: "2px",
        }}
      >
        Engineering Excellence
      </p>
    </div>

    <h2 style={{ fontSize: "22px", marginBottom: "15px" }}>Hello {name},</h2>

    <p style={{ lineHeight: "1.7", color: "#e2e8f0", fontSize: "16px" }}>
      Thank you for reaching out to us! We&apos;ve received your inquiry and our
      team is already reviewing the details of your project.
    </p>

    <p style={{ lineHeight: "1.7", color: "#e2e8f0", fontSize: "16px" }}>
      At <strong>Quantum Blaze</strong>, we take every project seriously. You
      can expect to hear from one of our tech leads within the next{" "}
      <strong>24 hours</strong> to discuss the next steps.
    </p>

    <div
      style={{
        marginTop: "40px",
        padding: "25px",
        backgroundColor: "rgba(14, 165, 233, 0.05)",
        borderRadius: "15px",
        textAlign: "center",
      }}
    >
      <p style={{ margin: "0", color: "#7dd3fc", fontWeight: "bold" }}>
        We&apos;re excited about the possibility of building something
        extraordinary together.
      </p>
    </div>

    <div
      style={{
        marginTop: "40px",
        paddingTop: "20px",
        borderTop: "1px solid rgba(14, 165, 233, 0.1)",
        fontSize: "14px",
        color: "#64748b",
      }}
    >
      <p style={{ margin: "0" }}>Best Regards,</p>
      <p style={{ margin: "5px 0", color: "#ffffff", fontWeight: "bold" }}>
        The Quantum Blaze Team
      </p>
      <p style={{ margin: "0", fontSize: "12px" }}>Colombo, Sri Lanka</p>
    </div>
  </div>
);
