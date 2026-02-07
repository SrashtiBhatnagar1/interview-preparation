export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword, generateVerificationToken } from "@/lib/auth";
import { validateEmail, validatePassword, validateName } from "@/lib/validators";
import { generateAccessToken, generateRefreshToken } from "@/lib/jwt";
import { sendEmail } from "@/lib/email";
import { hasMXRecord } from "@/lib/emailCheck";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

// -------------------
// Email Template
// -------------------
const generateVerificationEmail = (token: string) => {
  const link = `${APP_URL}/api/auth/verify?token=${token}`;

  return {
    subject: "Verify your email",
    html: `
      <div style="font-family:Arial,sans-serif">
        <h2>Verify Your Account</h2>
        <p>Click the button below to verify your email address:</p>
        <a 
          href="${link}"
          style="
            background:#2563eb;
            color:#ffffff;
            padding:10px 18px;
            border-radius:6px;
            text-decoration:none;
            display:inline-block;
          "
        >
          Verify Email
        </a>
        <p style="margin-top:16px;font-size:12px;color:#666">
          This link expires in 24 hours.
        </p>
        <p style="font-size:12px">
          Or copy and paste this link into your browser:
        </p>
        <p style="font-size:12px;color:#2563eb">
          ${link}
        </p>
      </div>
    `,
  };
};

// -------------------
// POST /api/auth/signup
// -------------------
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = String(body.email || "").toLowerCase();
    const password = String(body.password || "");
    const name = String(body.name || "").trim();

    // -------------------
    // Validate inputs
    // -------------------
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    if (!validateEmail(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    const pwCheck = validatePassword(password);
    if (!pwCheck.isValid) {
      return NextResponse.json(
        { error: "Password requirements not met", details: pwCheck.errors },
        { status: 400 }
      );
    }

    if (!validateName(name)) {
      return NextResponse.json(
        { error: "Name must be at least 2 characters" },
        { status: 400 }
      );
    }

    // -------------------
    // MX domain check
    // -------------------
    const domainValid = await hasMXRecord(email);
    if (!domainValid) {
      return NextResponse.json(
        { error: "Email domain does not exist or cannot receive mail" },
        { status: 400 }
      );
    }

    // -------------------
    // Check existing user
    // -------------------
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 409 }
      );
    }

    // -------------------
    // Create user
    // -------------------
    const passwordHash = hashPassword(password);

    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        name,
        isVerified: false,
      },
    });

    // -------------------
    // Create verification token
    // -------------------
    const verificationToken = generateVerificationToken();

    await prisma.verificationToken.create({
      data: {
        userId: user.id,
        token: verificationToken,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
    });

    // -------------------
    // Send email
    // -------------------
    const { subject, html } =
      generateVerificationEmail(verificationToken);

    try {
      console.log("ABOUT TO SEND EMAIL TO:", user.email);
      await sendEmail(user.email, subject, html);
      console.log("EMAIL SENT");
    } catch (e) {
      console.error("EMAIL FAILED:", e);
      // Don't block signup if email fails
    }

    // -------------------
    // Tokens
    // -------------------
    const accessToken = generateAccessToken(
      user.id,
      user.email
    );

    const refreshToken = generateRefreshToken(
      user.id
    );

    await prisma.refreshToken.create({
      data: {
        userId: user.id,
        token: refreshToken,
        expiresAt: new Date(
          Date.now() + 7 * 24 * 60 * 60 * 1000
        ),
      },
    });

    // -------------------
    // Response
    // -------------------
    const response = NextResponse.json(
      {
        message: "Signup successful. Please verify your email.",
      },
      { status: 201 }
    );

    response.cookies.set("access", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 15 * 60,
    });

    response.cookies.set("refresh", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
    });

    return response;
  } catch (err) {
    console.error("SIGNUP ERROR:", err);
    return NextResponse.json(
      { error: "Signup failed" },
      { status: 500 }
    );
  }
}
