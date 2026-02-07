"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ErrorBox } from "@/components/common/ErrorBox";

const PASSWORD_REQUIREMENTS = {
  minLength: { regex: /.{8,}/, label: "At least 8 characters" },
  uppercase: { regex: /[A-Z]/, label: "At least 1 uppercase letter (A-Z)" },
  number: { regex: /[0-9]/, label: "At least 1 number (0-9)" },
  special: { regex: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, label: "At least 1 special character" },
};

function validatePassword(password: string) {
  return Object.entries(PASSWORD_REQUIREMENTS).map(([key, requirement]) => ({
    key,
    label: requirement.label,
    met: requirement.regex.test(password),
  }));
}

function PasswordRequirementsList({ requirements }: { requirements: ReturnType<typeof validatePassword> }) {
  return (
    <div className="space-y-2 mt-3 p-3 bg-gray-50 rounded-md border border-gray-200">
      {requirements.map((req) => (
        <div key={req.key} className="flex items-center gap-2 text-sm">
          <span className={`text-lg ${req.met ? "text-green-600" : "text-gray-400"}`}>
            {req.met ? "✓" : "○"}
          </span>
          <span className={req.met ? "text-green-700 font-medium" : "text-gray-600"}>
            {req.label}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | string[]>("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const passwordRequirements = validatePassword(password);
  const passwordValid = passwordRequirements.every((req) => req.met);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!name || !email || !password) {
      setError("All fields are required");
      return;
    }

    if (!passwordValid) {
      const missing = passwordRequirements
        .filter((req) => !req.met)
        .map((req) => req.label)
        .join(", ");
      setError(`Password requirements not met: ${missing}`);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.details && Array.isArray(data.details)) {
          setError(data.details);
        } else {
          setError(data.error || "Signup failed");
        }
        return;
      }

      setSuccess("Account created! Please check your email to verify your account.");
      setName("");
      setEmail("");
      setPassword("");

      // Redirect to verify page after 2 seconds
      setTimeout(() => {
        window.location.href = "/verify";
      }, 2000);
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Create Account</CardTitle>
          <CardDescription>Join TCS Interview Bundle today</CardDescription>
        </CardHeader>
        <CardContent>
          {error && <ErrorBox message={Array.isArray(error) ? error.join(", ") : error} />}

          {success && (
            <div className="bg-green-50 border border-green-200 rounded-md p-4 text-green-800 text-sm mb-4">
              ✓ {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                We'll send a verification link to this email
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              {password && <PasswordRequirementsList requirements={passwordRequirements} />}
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={loading || !passwordValid || !name || !email}
            >
              {loading ? "Creating account..." : "Sign Up"}
            </Button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 hover:underline font-medium">
              Login
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}