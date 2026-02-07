import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";

export const runtime = "nodejs";

export async function GET() {
  try {
    await sendEmail(
      "YOUR_PERSONAL_EMAIL@gmail.com",
      "Resend Test",
      "<h1>This is a test email from your app</h1>"
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("TEST EMAIL FAILED:", err);
    return NextResponse.json(
      { error: "Email failed" },
      { status: 500 }
    );
  }
}
