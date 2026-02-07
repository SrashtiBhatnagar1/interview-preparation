"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ErrorBox } from "@/components/common/ErrorBox";
import { Loader } from "@/components/common/Loader";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include", // Important: to send/receive cookies
      });
                                                                  
      const data = await res.json();
      console.log("LoginForm: Login response:", { status: res.status, data });

      if (!res.ok) {
        setError(data.error || "Login failed");
        setLoading(false);
        return;
      }

      // Wait a moment for cookies to be set, then redirect
      console.log("LoginForm: Login successful, waiting for cookies to be set...");
      await new Promise(resolve => setTimeout(resolve, 300));
      console.log("LoginForm: Redirecting to dashboard1...");
      window.location.href = "/dashboard1";
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error("LoginForm: Login error:", err);
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Enter your credentials to access your account</CardDescription>
      </CardHeader>
      <CardContent>
        {error && <ErrorBox message={error} />}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? <Loader /> : "Login"}
          </Button>
        </form>
        <p className="text-center text-sm mt-4">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </p>
      </CardContent>
    </Card>
  );
}