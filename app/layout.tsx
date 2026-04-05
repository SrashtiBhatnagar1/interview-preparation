import type { Metadata } from "next";
import "./globals.css";
import React from "react";
import { TopBar } from "@/components/common/TopBar";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "TCS Interview Bundle",
  description: "Complete 2026 TCS Interview Preparation Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
      <html lang="en" suppressHydrationWarning>
        <body className="bg-white dark:bg-[#0f0f0f] text-black dark:text-white transition-colors duration-300">
          <TopBar />
          <div className="pt-16">{children}</div>
        </body>
      </html>
    );
  }

  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className="bg-white dark:bg-[#0f0f0f] text-black dark:text-white transition-colors duration-300">
          <TopBar />
          <div className="pt-16">{children}</div>
        </body>
      </html>
    </ClerkProvider>
  );
}
