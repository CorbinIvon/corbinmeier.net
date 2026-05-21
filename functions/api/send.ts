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
        phone: body.phone || undefined,
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
    if (!env.PERSONAL_EMAIL) {
      console.error("PERSONAL_EMAIL is not defined in the environment.");
    }

    const ownerNotificationPromise = resend.emails.send({
      from: "corbinmeier.net <contact@corbinmeier.net>",
      to: [env.PERSONAL_EMAIL || "contact@corbinmeier.net"], // Fallback to avoid crash if missing
      subject: `New contact: ${body.subject}`,
      text: `New contact submission:\n\nName: ${body.firstName || ""} ${
        body.lastName || ""
      }\nEmail: ${body.email}\nPhone: ${body.phone || ""}\nSubject: ${
        body.subject || ""
      }\n\nMessage:\n${body.message || "(no message)"}`,
    });

    const [confRes, ownerRes] = await Promise.all([
      confirmationPromise,
      ownerNotificationPromise,
    ]);

    if (confRes.error || ownerRes.error) {
      console.error("Email sending failed:", {
        confirmation: confRes.error,
        owner: ownerRes.error,
      });
      return new Response(
        JSON.stringify({ 
          error: "Failed to send one or more emails.",
          details: {
            visitor: confRes.error ? "Failed" : "Sent",
            owner: ownerRes.error ? "Failed" : "Sent"
          }
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Internal Server Error";
    console.error("API Error:", error);
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
