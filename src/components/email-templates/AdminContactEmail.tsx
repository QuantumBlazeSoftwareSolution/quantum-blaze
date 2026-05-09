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
        boxShadow:
          "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)",
        border: "1px solid #e2e8f0",
      }}
    >
      {/* Header Bar */}
      <div
        style={{
          backgroundColor: "#ffffff",
          padding: "32px 40px",
          borderBottom: "1px solid #f1f5f9",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              fontSize: "20px",
              fontWeight: "800",
              letterSpacing: "-0.02em",
              color: "#0f172a",
            }}
          >
            QUANTUM <span style={{ color: "#0ea5e9" }}>BLAZE</span>
          </div>
        </div>
        <div style={{ marginTop: "24px" }}>
          <h1
            style={{
              margin: "0",
              fontSize: "24px",
              fontWeight: "700",
              color: "#0f172a",
            }}
          >
            New Project Inquiry
          </h1>
          <p style={{ margin: "8px 0 0", fontSize: "14px", color: "#64748b" }}>
            A new lead has been captured from the official contact form.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ padding: "40px" }}>
        <div style={{ marginBottom: "32px" }}>
          <div
            style={{
              fontSize: "12px",
              fontWeight: "700",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              color: "#0ea5e9",
              marginBottom: "12px",
            }}
          >
            Contact Information
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <tr>
              <td
                style={{
                  padding: "8px 0",
                  fontSize: "14px",
                  color: "#64748b",
                  width: "120px",
                }}
              >
                Name
              </td>
              <td
                style={{
                  padding: "8px 0",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#0f172a",
                }}
              >
                {name}
              </td>
            </tr>
            <tr>
              <td
                style={{ padding: "8px 0", fontSize: "14px", color: "#64748b" }}
              >
                Email
              </td>
              <td
                style={{
                  padding: "8px 0",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#0ea5e9",
                }}
              >
                {email}
              </td>
            </tr>
          </table>
        </div>

        <div
          style={{
            marginBottom: "32px",
            padding: "24px",
            backgroundColor: "#f8fafc",
            borderRadius: "12px",
            border: "1px solid #f1f5f9",
          }}
        >
          <div
            style={{
              fontSize: "12px",
              fontWeight: "700",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              color: "#0ea5e9",
              marginBottom: "16px",
            }}
          >
            Project Requirements
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <tr>
              <td
                style={{
                  padding: "6px 0",
                  fontSize: "14px",
                  color: "#64748b",
                  width: "120px",
                }}
              >
                Project Type
              </td>
              <td
                style={{
                  padding: "6px 0",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#0f172a",
                }}
              >
                {projectType}
              </td>
            </tr>
            <tr>
              <td
                style={{ padding: "6px 0", fontSize: "14px", color: "#64748b" }}
              >
                Budget Range
              </td>
              <td
                style={{
                  padding: "6px 0",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#0f172a",
                }}
              >
                {budget}
              </td>
            </tr>
          </table>
        </div>

        <div>
          <div
            style={{
              fontSize: "12px",
              fontWeight: "700",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              color: "#0ea5e9",
              marginBottom: "12px",
            }}
          >
            Message Detail
          </div>
          <div
            style={{
              fontSize: "15px",
              lineHeight: "1.6",
              color: "#334155",
              backgroundColor: "#ffffff",
              padding: "16px",
              border: "1px solid #f1f5f9",
              borderRadius: "8px",
            }}
          >
            {message}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          padding: "32px 40px",
          backgroundColor: "#f8fafc",
          borderTop: "1px solid #f1f5f9",
          textAlign: "center",
        }}
      >
        <p style={{ margin: "0", fontSize: "12px", color: "#94a3b8" }}>
          Internal Notification System • Quantum Blaze Software Solutions
        </p>
      </div>
    </div>
  </div>
);
