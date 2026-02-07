import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyPassword, generateVerificationToken } from "@/lib/auth";
import { validateEmail } from "@/lib/validators";
import { generateAccessToken, generateRefreshToken } from "@/lib/jwt";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    console.log("Login API: Login attempt for email:", email);

    if (!validateEmail(email) || !password) {
      console.log("Login API: Invalid credentials format");
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !verifyPassword(password, user.passwordHash)) {
      console.log("Login API: Invalid email or password");
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Generate tokens
    const accessToken = generateAccessToken(user.id, user.email);
    const refreshToken = generateRefreshToken(user.id);
    console.log("Login API: Generated tokens for user:", user.email);

    // Drop old refresh tokens for this user to avoid unique token collisions
    await prisma.refreshToken.deleteMany({ where: { userId: user.id } });

    // Store refresh token
    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id,
        expiresAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days
      },
    });

    const response = NextResponse.json(
      {
        message: "Login successful",
        
        
        
        
        redirectUrl: "/dashboard",
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
      },
      { status: 200 }
    );

    response.cookies.set("access", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: "/",
    });

    response.cookies.set("refresh", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 90 * 24 * 60 * 60, // 90 days
      path: "/",
    });

    console.log("Login API: Cookies set, returning success response");
    return response;
  } catch (error) {
    console.error("Login API: Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}