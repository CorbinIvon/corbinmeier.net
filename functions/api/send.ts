import { render } from "@react-email/render";
import { EmailTemplate } from "../../src/components/EmailTemplateContactConfirmation";
import { Resend } from "resend";

interface CloudflareEnv {
  RESEND_API_KEY: string;
  PERSONAL_EMAIL: string;
}

export const onRequestPost: PagesFunction<CloudflareEnv> = async (context) => {
  const { request, env } = context;

  try {
    const resend = new Resend(env.RESEND_API_KEY);
    const body: any = await request.json();

    // Basic validation
    if (!body.firstName || !body.email || !body.subject) {
      return new Response(
        JSON.stringify({ error: "Please provide firstName, email and subject." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Render email template
    const emailHtml = await render(
      EmailTemplate({
        firstName: body.firstName || "",
        lastName: body.lastName || "",
        subject: body.subject || "",
        messagePreview: body.message || undefined,
      })
    );

    // Confirmation email text fallback
    const textContent = `Thanks for contacting me, ${
      [body.firstName, body.lastName].filter(Boolean).join(" ") || ""
    }.
    
${body.subject ? `Subject: ${body.subject}\n\n` : ""}I appreciate you reaching out. This is a confirmation that I received your message — I will review it and get back to you as soon as possible.

${body.message ? `Message preview:\n${body.message}\n\n` : ""}— Corbin`;

    // Send confirmation email to the visitor
    const confirmationPromise = resend.emails.send({
      from: "Corbin Meier <contact@corbinmeier.net>",
      to: [body.email],
      subject: "Contact Confirmation",
      html: emailHtml,
      text: textContent,
      headers: {
        "List-Unsubscribe": "<mailto:contact@corbinmeier.net?subject=unsubscribe>",
      },
    });

    // Send notification to site owner
    const ownerNotificationPromise = resend.emails.send({
      from: "corbinmeier.net <no-reply@corbinmeier.net>",
      to: [env.PERSONAL_EMAIL],
      subject: `New contact: ${body.subject}`,
      text: `New contact submission:\n\nName: ${body.firstName || ""} ${
        body.lastName || ""
      }\nEmail: ${body.email}\nPhone: ${body.phone || ""}\nSubject: ${
        body.subject || ""
      }\n\nMessage:\n${body.message || "(no message)"}`,
    });

    const results = await Promise.allSettled([
      confirmationPromise,
      ownerNotificationPromise,
    ]);

    const rejected = results.filter((r) => r.status === "rejected");
    if (rejected.length > 0) {
      console.error("Email sending failed:", rejected);
      return new Response(
        JSON.stringify({ error: "Failed to send one or more emails." }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("API Error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Internal Server Error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
