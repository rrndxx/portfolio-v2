import {
  assertResumeApiKey,
  resumeJson,
  resumeOptions,
  resumeUnauthorized,
} from "@/lib/resume-api";
import {
  assembleResumeDocument,
  getResumeRole,
  isResumeRoleId,
  listResumeRoles,
} from "@/lib/resume";
import type { ResumeDocumentKind, ResumeRoleId } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function OPTIONS(request: Request) {
  return resumeOptions(request);
}

/**
 * GET /api/resume?role=frontend&kind=resume|cv
 *
 * Auth: `x-api-key: $RESUME_API_KEY`
 * Prefer GET /api/resume/roles for the dropdown sync list.
 */
export async function GET(request: Request) {
  if (!assertResumeApiKey(request)) {
    return resumeUnauthorized();
  }

  const { searchParams } = new URL(request.url);
  const roleParam = searchParams.get("role");
  const kindParam = (searchParams.get("kind") ?? "resume").toLowerCase();

  if (!roleParam) {
    return resumeJson(
      {
        roles: await listResumeRoles(),
        endpoints: {
          roles: "/api/resume/roles",
          document: "/api/resume?role={roleId}&kind=resume|cv",
        },
        usage: {
          header: "x-api-key: <RESUME_API_KEY>",
        },
      },
      request,
    );
  }

  if (!(await isResumeRoleId(roleParam))) {
    return resumeJson(
      {
        error: `Unknown role "${roleParam}".`,
        roles: (await listResumeRoles()).map((role) => role.id),
      },
      request,
      { status: 400 },
    );
  }

  if (kindParam !== "resume" && kindParam !== "cv") {
    return resumeJson(
      { error: 'Invalid kind. Use "resume" or "cv".' },
      request,
      { status: 400 },
    );
  }

  const kind = kindParam as ResumeDocumentKind;
  const roleId = roleParam as ResumeRoleId;
  const role = await getResumeRole(roleId);
  if (!role) {
    return resumeJson({ error: "Role not found." }, request, { status: 404 });
  }

  const document = await assembleResumeDocument(roleId, kind);

  return resumeJson(document, request, {
    headers: {
      "Cache-Control": "private, no-store",
    },
  });
}
