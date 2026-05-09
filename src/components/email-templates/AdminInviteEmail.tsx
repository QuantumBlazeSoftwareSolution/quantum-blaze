import * as React from "react";

interface AdminInviteEmailProps {
  name: string;
  email: string;
  loginUrl: string;
}

export const AdminInviteEmailTemplate = ({
  name,
  email,
  loginUrl,
}: AdminInviteEmailProps) => (
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
          textAlign: "center",
        }}
      >
        <div style={{ display: "inline-block" }}>
          <div
            style={{
              fontSize: "24px",
              fontWeight: "800",
              letterSpacing: "-0.02em",
              color: "#0f172a",
            }}
          >
            QUANTUM <span style={{ color: "#0ea5e9" }}>BLAZE</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ padding: "40px", textAlign: "center" }}>
        <div
          style={{
            width: "64px",
            height: "64px",
            backgroundColor: "#f0f9ff",
            borderRadius: "50%",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "24px",
          }}
        >
          <span style={{ fontSize: "32px" }}>🛡️</span>
        </div>

        <h1
          style={{
            margin: "0 0 16px",
            fontSize: "24px",
            fontWeight: "700",
            color: "#0f172a",
          }}
        >
          Welcome to the Team, {name}!
        </h1>
        <p
          style={{
            margin: "0 0 24px",
            fontSize: "16px",
            lineHeight: "1.6",
            color: "#475569",
          }}
        >
          You have been appointed as an Administrator for the Quantum Blaze
          official portal. Your account is now active and ready for use.
        </p>

        <div
          style={{
            backgroundColor: "#f8fafc",
            borderRadius: "12px",
            padding: "24px",
            marginBottom: "32px",
            border: "1px solid #f1f5f9",
            textAlign: "left",
          }}
        >
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
            Account Details
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <tr>
              <td
                style={{
                  padding: "8px 0",
                  fontSize: "14px",
                  color: "#64748b",
                  width: "100px",
                }}
              >
                Email
              </td>
              <td
                style={{
                  padding: "8px 0",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#0f172a",
                }}
              >
                {email}
              </td>
            </tr>
            <tr>
              <td
                style={{ padding: "8px 0", fontSize: "14px", color: "#64748b" }}
              >
                Role
              </td>
              <td
                style={{
                  padding: "8px 0",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#0f172a",
                }}
              >
                Administrator
              </td>
            </tr>
          </table>
        </div>

        <a
          href={loginUrl}
          style={{
            display: "inline-block",
            backgroundColor: "#0ea5e9",
            color: "#ffffff",
            padding: "16px 32px",
            borderRadius: "12px",
            fontSize: "16px",
            fontWeight: "700",
            textDecoration: "none",
            boxShadow: "0 4px 6px -1px rgba(14, 165, 233, 0.2)",
          }}
        >
          Access Admin Portal
        </a>

        <p
          style={{
            margin: "32px 0 0",
            fontSize: "13px",
            color: "#94a3b8",
            lineHeight: "1.5",
          }}
        >
          If you didn't expect this invitation, please contact your system
          administrator immediately. For security reasons, please update your
          password after your first login.
        </p>
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
          © {new Date().getFullYear()} Quantum Blaze Software Solutions. All rights reserved.
        </p>
      </div>
    </div>
  </div>
);
