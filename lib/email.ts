let ResendClient: any = null;

function getResendClient() {
  if (!ResendClient) {
    try {
      const Resend = require("resend").Resend;
      ResendClient = new Resend(process.env.RESEND_API_KEY);
    } catch (e) {
      throw new Error("RESEND_API_KEY is missing in .env");
    }
  }
  return ResendClient;
}

/**
 * Sends an email using Resend
 * @param to recipient email
 * @param subject email subject
 * @param html html body
 */
export async function sendEmail(
  to: string,
  subject: string,
  html: string
) {
  try {
    const resend = getResendClient();

    console.log("SENDING EMAIL TO:", to);

    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || "onboarding@resend.dev",
      to,
      subject,
      html,
    });

    if (error) {
      console.error("RESEND ERROR:", error);
      throw new Error(error.message || "Failed to send email");
    }

    console.log("EMAIL SENT SUCCESSFULLY:", data?.id || "no-id");
  } catch (err) {
    console.error("SEND EMAIL FAILED:", err);
    throw err;
  }
}
