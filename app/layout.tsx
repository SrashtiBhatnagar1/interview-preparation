import type { Metadata } from "next";
import "./globals.css";
import React from "react";
import { TopBar } from "@/components/common/TopBar";

export const metadata: Metadata = {
  title: "TCS Interview Bundle",
  description: "Complete 2026 TCS Interview Preparation Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground">
        <TopBar />
        <div className="pt-16">
          {children}
        </div>
      </body>
    </html>
  );
}
