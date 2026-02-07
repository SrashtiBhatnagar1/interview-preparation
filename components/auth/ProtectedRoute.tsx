"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [isAuthed, setIsAuthed] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    let isMounted = true;

    const checkAuth = async () => {
      try {
        console.log("ProtectedRoute: Checking authentication...");
        const res = await fetch("/api/auth/me", {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        });
        
        console.log("ProtectedRoute: Auth check response status:", res.status);
        
        if (!isMounted) return;

        if (res.ok) {
          const data = await res.json();
          console.log("ProtectedRoute: Auth successful for user:", data.user?.email);
          setIsAuthed(true);
          setLoading(false);
        } else {
          console.log("ProtectedRoute: Auth failed, redirecting to login");
          setLoading(false);
          // Use a small delay to ensure state updates before redirect
          setTimeout(() => {
            if (isMounted) router.push("/login");
          }, 50);
        }
      } catch (err) {
        console.error("ProtectedRoute: Auth check error:", err);
        if (isMounted) {
          setLoading(false);
          setTimeout(() => {
            if (isMounted) router.push("/login");
          }, 50);
        }
      }
    };

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, [router]);

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (!isAuthed) return null;

  return <>{children}</>;
}
