import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const accessSecret = new TextEncoder().encode(
  process.env.JWT_ACCESS_SECRET || "access_secret"
);

async function verifyAccessToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, accessSecret);
    return payload as { email?: string; userId?: string };
  } catch (error) {
    console.error("JWT: Token verification failed in middleware:", error);
    return null;
  }
}

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("access")?.value;
  const { pathname } = req.nextUrl;

  console.log(`Middleware: ${pathname}, hasToken: ${!!token}`);

  const protectedRoutes = ["/dashboard1", "/ninja", "/prime", "/digital"];
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Block unauthenticated users from protected routes
  if (isProtectedRoute) {
    if (!token) {
      console.log(`Middleware: No token, redirecting to /login`);
      return NextResponse.redirect(new URL("/login", req.url));
    }

    console.log(`Middleware: Token found, length: ${token.length}, first 20 chars: ${token.substring(0, 20)}...`);

    const payload = await verifyAccessToken(token);
    if (!payload) {
      console.log(`Middleware: Invalid token, redirecting to /login`);
      const response = NextResponse.redirect(new URL("/login", req.url));
      response.cookies.delete("access");
      response.cookies.delete("refresh");
      return response;
    }

    console.log(`Middleware: Valid token for user ${payload.email ?? "unknown"}, allowing access to ${pathname}`);
  }

  // Redirect logged-in users away from auth pages
  if ((pathname === "/login" || pathname === "/signup") && token) {
    const payload = await verifyAccessToken(token);
    if (payload) {
      console.log(`Middleware: User already logged in, redirecting to /dashboard1`);
      return NextResponse.redirect(new URL("/dashboard1", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
};
