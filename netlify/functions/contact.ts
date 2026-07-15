type NetlifyEvent = {
  httpMethod: string;
  body: string | null;
};

type NetlifyResponse = {
  statusCode: number;
  headers?: Record<string, string>;
  body: string;
};

type ContactBody = {
  name?: string;
  subject?: string;
  message?: string;
};

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Content-Type": "application/json",
};

/** Inbox destination — override with CONTACT_TO_EMAIL if needed. */
const DEFAULT_TO = "rendyllcabardo11@gmail.com";

/**
 * Contact endpoint for Netlify + Resend.
 * Required: `RESEND_API_KEY`
 * Optional: `CONTACT_TO_EMAIL` (defaults to rendyllcabardo11@gmail.com)
 * Optional: `CONTACT_FROM_EMAIL` (defaults to Portfolio <onboarding@resend.dev>)
 */
export async function handler(event: NetlifyEvent): Promise<NetlifyResponse> {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  let body: ContactBody;
  try {
    body = JSON.parse(event.body ?? "{}") as ContactBody;
  } catch {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: "Invalid JSON body" }),
    };
  }

  const name = body.name?.trim() ?? "";
  const subject = body.subject?.trim() ?? "";
  const message = body.message?.trim() ?? "";

  if (!name || !subject || !message) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: "Name, subject, and message are required" }),
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? DEFAULT_TO;
  const from =
    process.env.CONTACT_FROM_EMAIL ??
    "Portfolio Contact <onboarding@resend.dev>";

  if (!apiKey) {
    console.warn(
      "[contact] Missing RESEND_API_KEY — accepting payload without send.",
      { name, subject, messageLength: message.length },
    );
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        ok: true,
        queued: false,
        note: "Function ready. Set RESEND_API_KEY to deliver mail.",
      }),
    };
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject,
      text: [`From: ${name}`, "", message].join("\n"),
    }),
  });

  if (!res.ok) {
    const detail = await res.text();
    console.error("[contact] Resend error", res.status, detail);
    return {
      statusCode: 502,
      headers,
      body: JSON.stringify({ error: "Failed to deliver transmission" }),
    };
  }

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({ ok: true, queued: true }),
  };
}
