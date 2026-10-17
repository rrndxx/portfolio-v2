import {
  assertResumeApiKey,
  resumeJson,
  resumeOptions,
  resumeUnauthorized,
} from "@/lib/resume-api";
import { listResumeRoles } from "@/lib/resume";

export const dynamic = "force-dynamic";

export async function OPTIONS(request: Request) {
  return resumeOptions(request);
}

/**
 * GET /api/resume/roles
 *
 * Source of truth for the builder site role dropdown.
 */
export async function GET(request: Request) {
  if (!assertResumeApiKey(request)) {
    return resumeUnauthorized();
  }

  const roles = await listResumeRoles();

  return resumeJson(
    {
      source: "portfolio-v2",
      updatedHint:
        "Roles are configured in the portfolio database (seeded from data/resume/roles.json). Sync this list into the builder dropdown.",
      kinds: ["resume", "cv"] as const,
      exportFormatsSuggested: ["pdf", "docx", "txt", "json"],
      roles,
      documentEndpoint: "/api/resume?role={roleId}&kind={resume|cv}",
    },
    request,
    {
      headers: {
        "Cache-Control": "private, max-age=60",
      },
    },
  );
}
