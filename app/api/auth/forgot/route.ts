import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { validateEmail } from "@/lib/validators";
import { generateResetToken } from "@/lib/auth";
import { sendEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!validateEmail(email)) {
      // Don't reveal if email exists
      return NextResponse.json(
        { message: "If email exists, reset link will be sent" },
        { status: 200 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { message: "If email exists, reset link will be sent" },
        { status: 200 }
      );
    }

    // Generate reset token
    const resetToken = generateResetToken();
    await prisma.passwordResetToken.create({
      data: {
        token: resetToken,
        userId: user.id,
        expiresAt: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
      },
    });

    // Send reset email
    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}`;
    const subject = "Password Reset Request";
    const html = `
      <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #4F46E5;">Password Reset Request</h2>
        <p>You requested to reset your password. Click the button below to reset it:</p>
        <a href="${resetUrl}" style="display: inline-block; padding: 12px 24px; background-color: #4F46E5; color: white; text-decoration: none; border-radius: 6px; margin: 20px 0;">Reset Password</a>
        <p style="color: #666;">This link will expire in 1 hour.</p>
        <p style="color: #666;">If you didn't request this, please ignore this email.</p>
      </div>
    `;
    
    await sendEmail(email, subject, html);

    return NextResponse.json(
      { message: "If email exists, reset link will be sent" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
