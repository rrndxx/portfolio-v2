import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import {
  isAdminResource,
  loadAdminResource,
  saveAdminResource,
  type AdminResource,
} from "@/lib/admin-content";

export const dynamic = "force-dynamic";

interface RouteContext {
  params: Promise<{ resource: string }>;
}

export async function GET(_request: Request, context: RouteContext) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { resource } = await context.params;
  if (!isAdminResource(resource)) {
    return NextResponse.json({ error: "Unknown resource." }, { status: 404 });
  }

  try {
    const data = await loadAdminResource(resource);
    return NextResponse.json({ resource, data });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to load content.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(request: Request, context: RouteContext) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { resource } = await context.params;
  if (!isAdminResource(resource)) {
    return NextResponse.json({ error: "Unknown resource." }, { status: 404 });
  }

  let body: { data?: unknown };
  try {
    body = (await request.json()) as { data?: unknown };
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (body.data === undefined) {
    return NextResponse.json(
      { error: 'Body must be `{ "data": ... }`.' },
      { status: 400 },
    );
  }

  try {
    await saveAdminResource(resource as AdminResource, body.data);
    return NextResponse.json({ ok: true, resource });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to save content.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
