"use client";

import { useState, Suspense } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ErrorBox } from "@/components/common/ErrorBox";
import { useSearchParams } from "next/navigation";

function VerifyContent() {
  const searchParams = useSearchParams();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const token = searchParams.get("token");

  const handleVerify = async () => {
    if (!token) {
      setError("No verification token found");
      return;
    }

    try {
      const res = await fetch("/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Verification failed");
        return;
      }

      setSuccess(true);
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 2000);
    } catch {
      setError("An error occurred");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Verify Email</CardTitle>
          <CardDescription>Confirm your email address to activate your account</CardDescription>
        </CardHeader>
        <CardContent>
          {error && <ErrorBox message={error} />}
          {success && (
            <div className="bg-green-50 border border-green-200 rounded-md p-4 text-green-800">
              ✓ Email verified! Redirecting...
            </div>
          )}
          <Button onClick={handleVerify} className="w-full" disabled={success || !token}>
            Verify Email
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <VerifyContent />
    </Suspense>
  );
}
