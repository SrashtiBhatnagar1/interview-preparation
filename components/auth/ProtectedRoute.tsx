"use client";

import { useAuth } from "@clerk/nextjs";

const clerkPublishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
const hasClerkPublishableKey = Boolean(clerkPublishableKey);

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  if (!hasClerkPublishableKey) {
    console.log("Auth:", false);
    return <div>Unauthorized</div>;
  }

  const { isLoaded, isSignedIn } = useAuth();

  console.log("Auth:", isSignedIn);

  if (!isLoaded) return null;

  if (!isSignedIn) {
    return <div>Unauthorized</div>;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
export { ProtectedRoute };