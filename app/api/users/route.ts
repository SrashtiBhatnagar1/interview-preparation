import { NextResponse } from "next/server";
import { getCurrentUserId, unauthorizedJson } from "@/services/auth/server";

export async function GET() {
  const userId = await getCurrentUserId();

  if (!userId) {
    return unauthorizedJson();
  }

  return NextResponse.json({
    status: "ok",
    message: "Users API working",
    userId,
  });
}
