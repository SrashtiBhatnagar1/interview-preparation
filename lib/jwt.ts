import * as jwt from "jsonwebtoken";

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || "access_secret";
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "refresh_secret";

export interface JWTPayload {
  userId: string;
  email: string;
  iat?: number;
  exp?: number;
}

export function generateAccessToken(userId: string, email: string): string {
  return jwt.sign(
    { userId, email },
    ACCESS_SECRET,
    { expiresIn: "30d" } // Extended to 30 days
  );
}

export function generateRefreshToken(userId: string): string {
  return jwt.sign(
    { userId },
    REFRESH_SECRET,
    { expiresIn: "90d" } // Extended to 90 days
  );
}

export function verifyAccessToken(token: string): JWTPayload | null {
  try {
    const decoded = jwt.verify(token, ACCESS_SECRET) as JWTPayload;
    console.log("JWT: Token verified successfully for user:", decoded.email);
    return decoded;
  } catch (error) {
    console.error("JWT: Token verification failed:", error instanceof Error ? error.message : error);
    return null;
  }
}

export function verifyRefreshToken(token: string): { userId: string } | null {
  try {
    return jwt.verify(token, REFRESH_SECRET) as { userId: string };
  } catch {
    return null;
  }
}