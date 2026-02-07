import { z } from "zod";

// -------------------
// Shared Regex Rules
// -------------------

const PASSWORD_RULES = {
  minLength: 8,
  uppercase: /[A-Z]/,
  lowercase: /[a-z]/,
  number: /[0-9]/,
  special: /[^A-Za-z0-9]/ // ANY special character
};

// -------------------
// Helper functions
// -------------------

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 255;
}

export function validateName(name: string): boolean {
  return !!name && name.trim().length >= 2 && name.length <= 100;
}

export function validatePassword(password: string): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (password.length < PASSWORD_RULES.minLength) {
    errors.push(
      `Password must be at least ${PASSWORD_RULES.minLength} characters`
    );
  }
  if (!PASSWORD_RULES.uppercase.test(password)) {
    errors.push("Password must contain at least one uppercase letter");
  }
  if (!PASSWORD_RULES.lowercase.test(password)) {
    errors.push("Password must contain at least one lowercase letter");
  }
  if (!PASSWORD_RULES.number.test(password)) {
    errors.push("Password must contain at least one number");
  }
  if (!PASSWORD_RULES.special.test(password)) {
    errors.push("Password must contain at least one special character");
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

// -------------------
// Zod Schemas (USES SAME RULES)
// -------------------

export const signupSchema = z.object({
  email: z.string().email("Invalid email address"),
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be at most 100 characters"),
  password: z
    .string()
    .min(
      PASSWORD_RULES.minLength,
      `Password must be at least ${PASSWORD_RULES.minLength} characters`
    )
    .regex(PASSWORD_RULES.uppercase, {
      message: "Password must contain at least one uppercase letter"
    })
    .regex(PASSWORD_RULES.lowercase, {
      message: "Password must contain at least one lowercase letter"
    })
    .regex(PASSWORD_RULES.number, {
      message: "Password must contain at least one number"
    })
    .regex(PASSWORD_RULES.special, {
      message: "Password must contain at least one special character"
    })
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required")
});
