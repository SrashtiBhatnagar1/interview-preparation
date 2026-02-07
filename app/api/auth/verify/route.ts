export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

// -------------------
// GET /api/auth/verify
// -------------------
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json(
        { error: "Missing token" },
        { status: 400 }
      );
    }

    const record = await prisma.verificationToken.findUnique({
      where: { token },
    });

    if (!record) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 400 }
      );
    }

    if (record.consumedAt) {
      return NextResponse.json(
        { error: "Token already used" },
        { status: 400 }
      );
    }

    if (record.expiresAt < new Date()) {
      return NextResponse.json(
        { error: "Token expired" },
        { status: 400 }
      );
    }

    // Mark user verified
    await prisma.user.update({
      where: { id: record.userId },
      data: { isVerified: true },
    });

    // Mark token consumed
    await prisma.verificationToken.update({
      where: { id: record.id },
      data: { consumedAt: new Date() },
    });

    return NextResponse.redirect(
      new URL("/login?verified=true", APP_URL)
    );
  } catch (err) {
    console.error("VERIFY ERROR:", err);
    return NextResponse.json(
      { error: "Verification failed" },
      { status: 500 }
    );
  }
}
