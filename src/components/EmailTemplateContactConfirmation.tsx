import * as React from "react";

interface EmailTemplateProps {
  firstName: string;
  lastName?: string;
  subject?: string;
  messagePreview?: string;
}

export function EmailTemplate({
  firstName,
  lastName,
  subject,
  messagePreview,
}: EmailTemplateProps) {
  return (
    <div
      style={{
        fontFamily:
          'Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
        color: "#111827",
        lineHeight: 1.5,
      }}
    >
      <div
        style={{
          maxWidth: 600,
          margin: "0 auto",
          padding: 24,
          border: "1px solid #e5e7eb",
          borderRadius: 8,
        }}
      >
        <h1 style={{ margin: 0, fontSize: 20 }}>
          Thanks for contacting me, {firstName}
          {lastName ? ` ${lastName}` : ""}.
        </h1>

        <p style={{ marginTop: 12, color: "#374151" }}>
          I appreciate you reaching out. This is a confirmation that I received
          your message — I&apos;ll review it and get back to you as soon as
          possible.
        </p>

        {subject && (
          <p style={{ marginTop: 8, color: "#374151", fontSize: 14 }}>
            <strong>Subject:</strong> {subject}
          </p>
        )}

        {messagePreview && (
          <div
            style={{
              marginTop: 12,
              padding: 12,
              background: "#f9fafb",
              borderRadius: 6,
            }}
          >
            <strong>Message preview</strong>
            <p style={{ marginTop: 6 }}>{messagePreview}</p>
          </div>
        )}

        <p style={{ marginTop: 18, color: "#6b7280", fontSize: 13 }}>
          — Corbin Meier
        </p>

        <hr
          style={{
            marginTop: 20,
            border: "none",
            borderTop: "1px solid #e5e7eb",
          }}
        />
        <p style={{ marginTop: 12, color: "#9ca3af", fontSize: 12 }}>
          If you didn&apos;t make this request, please ignore this email.
        </p>
      </div>
    </div>
  );
}
