import { NextRequest, NextResponse } from "next/server";
import { verifyRefreshToken, generateAccessToken } from "@/lib/jwt";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const refreshToken = req.cookies.get("refresh")?.value;

    if (!refreshToken) {
      return NextResponse.json(
        { error: "Refresh token required" },
        { status: 401 }
      );
    }

    const payload = verifyRefreshToken(refreshToken);
    if (!payload) {
      return NextResponse.json(
        { error: "Invalid or expired refresh token" },
        { status: 401 }
      );
    }

    // Verify token exists in DB and not revoked
    const dbToken = await prisma.refreshToken.findUnique({
      where: { token: refreshToken },
    });

    if (!dbToken || dbToken.revokedAt) {
      return NextResponse.json(
        { error: "Token revoked" },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Generate new access token
    const newAccessToken = generateAccessToken(user.id, user.email);

    const response = NextResponse.json(
      { message: "Token refreshed" },
      { status: 200 }
    );

    response.cookies.set("access", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60, // 30 days
    });

    return response;
  } catch (error) {
    console.error("Refresh error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
