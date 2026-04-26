import * as React from "react";

interface AdminEmailProps {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  message: string;
}

export const AdminEmailTemplate = ({
  name,
  email,
  projectType,
  budget,
  message,
}: AdminEmailProps) => (
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
    <h2
      style={{
        color: "#0ea5e9",
        fontSize: "24px",
        marginBottom: "20px",
        borderBottom: "1px solid rgba(14, 165, 233, 0.1)",
        paddingBottom: "10px",
      }}
    >
      New Project Inquiry 🚀
    </h2>
    <div style={{ marginBottom: "25px" }}>
      <p style={{ margin: "5px 0" }}>
        <strong>From:</strong> {name}
      </p>
      <p style={{ margin: "5px 0" }}>
        <strong>Email:</strong> {email}
      </p>
    </div>

    <div
      style={{
        backgroundColor: "rgba(255,255,255,0.03)",
        padding: "20px",
        borderRadius: "12px",
        marginBottom: "25px",
      }}
    >
      <p style={{ margin: "10px 0" }}>
        <strong style={{ color: "#7dd3fc" }}>Project Type:</strong>{" "}
        {projectType}
      </p>
      <p style={{ margin: "10px 0" }}>
        <strong style={{ color: "#7dd3fc" }}>Budget Range:</strong> {budget}
      </p>
    </div>

    <div style={{ marginBottom: "25px" }}>
      <p
        style={{
          color: "#94a3b8",
          fontSize: "14px",
          textTransform: "uppercase",
          letterSpacing: "1px",
          marginBottom: "10px",
        }}
      >
        Message
      </p>
      <p style={{ lineHeight: "1.6", color: "#e2e8f0" }}>{message}</p>
    </div>

    <div
      style={{
        marginTop: "40px",
        paddingTop: "20px",
        borderTop: "1px solid rgba(14, 165, 233, 0.1)",
        fontSize: "12px",
        color: "#64748b",
        textAlign: "center",
      }}
    >
      This inquiry was sent from the Quantum Blaze contact form.
    </div>
  </div>
);
