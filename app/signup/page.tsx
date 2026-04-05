"use client";

import { SignUp } from "@clerk/nextjs";

export default function SignupPage() {
  const clerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ?? "";
  const normalizedClerkKey = clerkKey.toLowerCase();
  const hasClerkKey =
    /^pk_(test|live)_[a-z0-9_-]+$/i.test(clerkKey) &&
    !normalizedClerkKey.includes("example") &&
    !normalizedClerkKey.includes("dummy") &&
    !normalizedClerkKey.includes("local-dev") &&
    !normalizedClerkKey.includes("zxhhbxbszs");

  if (!hasClerkKey) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a1a1a] p-6 text-center transition-colors duration-300">
          <h1 className="text-xl font-semibold text-black dark:text-white">Authentication not configured</h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Set a valid Clerk publishable key to enable sign-up.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8">
      <SignUp path="/signup" routing="path" signInUrl="/login" fallbackRedirectUrl="/dashboard1" />
    </div>
  );
}