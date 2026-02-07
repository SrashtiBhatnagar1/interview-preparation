import * as crypto from "crypto";

export function generateCSRFToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

export function verifyCSRFToken(token: string): boolean {
  return !!token && token.length === 64;
}


export function hashToken(token: string): string {
  return crypto.createHash("sha256").update(token).digest("hex");
}
