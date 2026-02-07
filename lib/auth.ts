import * as crypto from "crypto";

export function hashPassword(password: string): string {
  const salt = process.env.PASSWORD_SALT || "default-salt";
  return crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");
}

export function verifyPassword(password: string, hash: string): boolean {
  const hashToCompare = hashPassword(password);
  try {
    return crypto.timingSafeEqual(
      Buffer.from(hash),
      Buffer.from(hashToCompare)
    );
  } catch {
    return false;
  }
}

export function generateVerificationToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

export function generateResetToken(): string {
  return crypto.randomBytes(32).toString("hex");
}
