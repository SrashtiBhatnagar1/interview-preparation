"use client";

import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export function TopBar() {
  const pathname = usePathname();
  const clerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ?? "";
  const normalizedClerkKey = clerkKey.toLowerCase();
  const hasClerkKey =
    /^pk_(test|live)_[a-z0-9_-]+$/i.test(clerkKey) &&
    !normalizedClerkKey.includes("example") &&
    !normalizedClerkKey.includes("dummy") &&
    !normalizedClerkKey.includes("local-dev") &&
    !normalizedClerkKey.includes("zxhhbxbszs");

  const hideOnPages = ["/login", "/signup"];
  if (hideOnPages.includes(pathname)) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50 border-b border-border/80 bg-background/95 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/85 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-foreground">TCS Interview Bundle</h1>
          </div>
          <div className="flex items-center gap-4">
            {hasClerkKey ? (
              <>
                <SignedOut>
                  <SignInButton mode="modal">
                    <Button variant="outline" size="sm" className="dark-glow">Sign in</Button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <Button size="sm" className="dark-glow">Sign up</Button>
                  </SignUpButton>
                </SignedOut>
                <SignedIn>
                  <UserButton afterSignOutUrl="/login" />
                </SignedIn>
              </>
            ) : (
              <>
                <a href="/login">
                  <Button variant="outline" size="sm" className="dark-glow">Sign in</Button>
                </a>
                <a href="/signup">
                  <Button size="sm" className="dark-glow">Sign up</Button>
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
