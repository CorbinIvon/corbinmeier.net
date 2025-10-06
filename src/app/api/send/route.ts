import { EmailTemplate } from "@/components/EmailTemplateContactConfirmation";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

type FormBody = {
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  subject?: string;
  message?: string;
};

export async function POST(req: Request) {
  try {
    const body: FormBody = await req.json();

    // Basic validation to match client-side checks
    if (!body.firstName || !body.email || !body.subject) {
      return Response.json(
        { error: "Please provide firstName, email and subject." },
        { status: 400 }
      );
    }

    // Send confirmation email to the visitor
    const confirmationPromise = resend.emails.send({
      from: "Corbin Meier <contact@corbinmeier.net>",
      to: [body.email],
      subject: "Contact Confirmation",
      react: EmailTemplate({
        firstName: body.firstName || "",
        lastName: body.lastName || "",
        subject: body.subject || "",
        messagePreview: body.message || undefined,
      }),
      // Plain-text fallback mirrors the HTML template to improve deliverability
      text: `Thanks for contacting me, ${
        [body.firstName, body.lastName].filter(Boolean).join(" ") || ""
      }.

${
  body.subject
    ? `Subject: ${body.subject}

`
    : ""
}I appreciate you reaching out. This is a confirmation that I received your message — I will review it and get back to you as soon as possible.

${
  body.subject
    ? `Message preview:
${body.message || body.subject}

`
    : ""
}— Corbin

If you did not request this or received this in error, please reply to this email.
${
  body.subject
    ? `

Subject: ${body.subject}
`
    : ""
}`,
      headers: {
        // Provide a simple List-Unsubscribe header (mailto) for receivers
        "List-Unsubscribe":
          "<mailto:contact@corbinmeier.net?subject=unsubscribe>",
      },
    });

    // Send notification to site owner with form contents
    const ownerNotificationPromise = resend.emails.send({
      from: "corbinmeier.net <no-reply@corbinmeier.net>",
      to: [process.env.PERSONAL_EMAIL as string],
      subject: `New contact: ${body.subject}`,
      text: `New contact submission:\n\nName: ${body.firstName || ""} ${
        body.lastName || ""
      }\nEmail: ${body.email}\nPhone: ${body.phone || ""}\nSubject: ${
        body.subject || ""
      }\n\nMessage:\n${body.message || "(no message)"}`,
    });

    const [confirmationRes, ownerRes] = await Promise.allSettled([
      confirmationPromise,
      ownerNotificationPromise,
    ]);

    // Check results
    if (
      confirmationRes.status === "rejected" ||
      ownerRes.status === "rejected"
    ) {
      const err =
        (confirmationRes as PromiseRejectedResult).reason ||
        (ownerRes as PromiseRejectedResult).reason ||
        "Unknown error sending emails";
      return Response.json({ error: String(err) }, { status: 500 });
    }

    return Response.json({ ok: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return Response.json({ error: message }, { status: 500 });
  }
}
