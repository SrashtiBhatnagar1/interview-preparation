"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export function TopBar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Don't show TopBar on login/signup pages
  const hideOnPages = ["/login", "/signup", "/verify", "/reset-password"];
  if (hideOnPages.includes(pathname)) {
    return null;
  }

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (res.ok) {
        window.location.href = "/login";
      } else {
        console.error("Logout failed");
        setIsLoggingOut(false);
      }
    } catch (error) {
      console.error("Logout error:", error);
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-900">TCS Interview Bundle</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button
              onClick={handleLogout}
              disabled={isLoggingOut}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              {isLoggingOut ? "Logging out..." : "Logout"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
