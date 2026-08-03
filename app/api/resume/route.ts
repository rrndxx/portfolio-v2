import { NextResponse } from "next/server";
import {
  assembleResumeDocument,
  getResumeRole,
  isResumeRoleId,
  listResumeRoles,
} from "@/lib/resume";
import type { ResumeDocumentKind } from "@/lib/types";

function unauthorized() {
  return NextResponse.json(
    { error: "Unauthorized. Provide a valid x-api-key header." },
    { status: 401 },
  );
}

function assertApiKey(request: Request): boolean {
  const expected = process.env.RESUME_API_KEY;
  // Fail closed in production when key is missing.
  if (!expected) {
    return process.env.NODE_ENV !== "production";
  }
  const provided = request.headers.get("x-api-key");
  return Boolean(provided && provided === expected);
}

/**
 * GET /api/resume?role=frontend&kind=resume|cv
 *
 * Auth: `x-api-key: $RESUME_API_KEY`
 * Omit `role` to list available roles.
 */
export async function GET(request: Request) {
  if (!assertApiKey(request)) {
    return unauthorized();
  }

  const { searchParams } = new URL(request.url);
  const roleParam = searchParams.get("role");
  const kindParam = (searchParams.get("kind") ?? "resume").toLowerCase();

  if (!roleParam) {
    return NextResponse.json({
      roles: listResumeRoles(),
      usage: {
        document: "/api/resume?role=fullstack&kind=resume",
        cv: "/api/resume?role=frontend&kind=cv",
        header: "x-api-key: <RESUME_API_KEY>",
      },
    });
  }

  if (!isResumeRoleId(roleParam)) {
    return NextResponse.json(
      {
        error: `Unknown role "${roleParam}".`,
        roles: listResumeRoles().map((role) => role.id),
      },
      { status: 400 },
    );
  }

  if (kindParam !== "resume" && kindParam !== "cv") {
    return NextResponse.json(
      { error: 'Invalid kind. Use "resume" or "cv".' },
      { status: 400 },
    );
  }

  const kind = kindParam as ResumeDocumentKind;
  const role = getResumeRole(roleParam);
  if (!role) {
    return NextResponse.json({ error: "Role not found." }, { status: 404 });
  }

  const document = assembleResumeDocument(roleParam, kind);

  return NextResponse.json(document, {
    headers: {
      "Cache-Control": "private, no-store",
    },
  });
}
