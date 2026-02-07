import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const refreshToken = req.cookies.get("refresh")?.value;

    // Delete refresh token from database
    if (refreshToken) {
      await prisma.refreshToken.deleteMany({
        where: { token: refreshToken },
      });
    }

    const response = NextResponse.json(
      { 
        message: "Logged out successfully",
        redirectUrl: "/login"
      },
      { status: 200 }
    );

    // Clear cookies with proper settings
    response.cookies.set("access", "", { 
      maxAge: 0, 
      path: "/",
      httpOnly: true,
      sameSite: "lax",
    });
    response.cookies.set("refresh", "", { 
      maxAge: 0, 
      path: "/",
      httpOnly: true,
      sameSite: "lax",
    });

    console.log("Logout API: Cookies cleared, user logged out successfully");
    return response;
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}