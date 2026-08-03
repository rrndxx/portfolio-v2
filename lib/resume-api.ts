import { NextResponse } from "next/server";

export function resumeUnauthorized() {
  return withResumeCors(
    NextResponse.json(
      { error: "Unauthorized. Provide a valid x-api-key header." },
      { status: 401 },
    ),
  );
}

export function assertResumeApiKey(request: Request): boolean {
  const expected = process.env.RESUME_API_KEY;
  // Fail closed in production when key is missing.
  if (!expected) {
    return process.env.NODE_ENV !== "production";
  }
  const provided = request.headers.get("x-api-key");
  return Boolean(provided && provided === expected);
}

function allowedOrigins(): string[] {
  const raw = process.env.RESUME_CORS_ORIGINS ?? "";
  return raw
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
}

export function withResumeCors(response: NextResponse, request?: Request) {
  const origins = allowedOrigins();
  const requestOrigin = request?.headers.get("origin") ?? "";

  if (origins.includes("*")) {
    response.headers.set("Access-Control-Allow-Origin", "*");
  } else if (requestOrigin && origins.includes(requestOrigin)) {
    response.headers.set("Access-Control-Allow-Origin", requestOrigin);
    response.headers.set("Vary", "Origin");
  } else if (origins.length === 1) {
    response.headers.set("Access-Control-Allow-Origin", origins[0]);
    response.headers.set("Vary", "Origin");
  }

  response.headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, x-api-key",
  );
  response.headers.set("Access-Control-Max-Age", "86400");
  return response;
}

export function resumeOptions(request: Request) {
  return withResumeCors(new NextResponse(null, { status: 204 }), request);
}

export function resumeJson(data: unknown, request: Request, init?: ResponseInit) {
  return withResumeCors(NextResponse.json(data, init), request);
}
