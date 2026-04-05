"use client";

import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function VerifyPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Email Verification</CardTitle>
          <CardDescription>
            Email verification is handled directly by Clerk during sign up.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link href="/signup">
            <Button className="w-full">Go to Sign Up</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
