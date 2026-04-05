import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function getCurrentUserId(): Promise<string | null> {
  const { userId } = await auth();
  return userId ?? null;
}

export async function getCurrentAuthUser() {
  return currentUser();
}

export async function requireAuth(): Promise<string> {
  const userId = await getCurrentUserId();

  if (!userId) {
    throw new Error("UNAUTHORIZED");
  }

  return userId;
}

export function unauthorizedJson() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}
