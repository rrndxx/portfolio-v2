import { NextResponse } from "next/server";
import {
  checkAdminPassword,
  createAdminSession,
  isAdminPasswordConfigured,
} from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  if (!isAdminPasswordConfigured()) {
    return NextResponse.json(
      { error: "ADMIN_PASSWORD is not configured on the server." },
      { status: 503 },
    );
  }

  let body: { password?: string };
  try {
    body = (await request.json()) as { password?: string };
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const password = body.password ?? "";
  if (!checkAdminPassword(password)) {
    return NextResponse.json({ error: "Invalid password." }, { status: 401 });
  }

  await createAdminSession();
  return NextResponse.json({ ok: true });
}
