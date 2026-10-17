import { createClient, type Client } from "@libsql/client";
import { readFileSync } from "node:fs";
import { join } from "node:path";

let client: Client | null = null;
let schemaReady: Promise<void> | null = null;

export type DbTarget = "auto" | "local" | "turso";

function resolveTarget(): DbTarget {
  const raw = process.env.DB_TARGET?.trim().toLowerCase();
  if (raw === "local" || raw === "turso" || raw === "auto") return raw;
  return "auto";
}

function resolveDatabaseUrl(): { url: string; authToken?: string; label: string } {
  const target = resolveTarget();
  const tursoUrl = process.env.TURSO_DATABASE_URL?.trim();
  const tursoToken = process.env.TURSO_AUTH_TOKEN?.trim();
  const localUrl =
    process.env.DATABASE_URL?.trim() || "file:./data/portfolio.db";

  if (target === "local") {
    return { url: localUrl, label: `local (${localUrl})` };
  }

  if (target === "turso") {
    if (!tursoUrl) {
      throw new Error(
        'DB_TARGET=turso but TURSO_DATABASE_URL is missing. Set it in .env.local.',
      );
    }
    if (!tursoToken) {
      throw new Error(
        "DB_TARGET=turso but TURSO_AUTH_TOKEN is missing. Create a database token in the Turso dashboard.",
      );
    }
    return {
      url: tursoUrl,
      authToken: tursoToken,
      label: `turso (${tursoUrl})`,
    };
  }

  // auto:
  // - production: prefer Turso when both URL + token exist
  // - development: prefer local so bad/missing Turso tokens don't break `next dev`
  const preferTurso =
    process.env.NODE_ENV === "production" || process.env.DB_TARGET === "auto";

  if (preferTurso && tursoUrl && tursoToken) {
    return {
      url: tursoUrl,
      authToken: tursoToken,
      label: `turso (${tursoUrl})`,
    };
  }

  return { url: localUrl, label: `local (${localUrl})` };
}

export function getDb(): Client {
  if (client) return client;

  const { url, authToken, label } = resolveDatabaseUrl();

  client = createClient({
    url,
    ...(authToken ? { authToken } : {}),
  });

  // Helpful when seeding / debugging connection target.
  if (process.env.DB_DEBUG === "1") {
    console.log(`[db] connected → ${label}`);
  }

  return client;
}

/** Reset singleton (used by seed scripts that set DB_TARGET before import). */
export function resetDbClient(): void {
  client = null;
  schemaReady = null;
}

function splitSqlStatements(sql: string): string[] {
  const withoutLineComments = sql
    .split("\n")
    .map((line) => {
      const trimmed = line.trim();
      if (trimmed.startsWith("--")) return "";
      return line;
    })
    .join("\n");

  return withoutLineComments
    .split(";")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

export async function ensureSchema(): Promise<void> {
  if (!schemaReady) {
    schemaReady = (async () => {
      const db = getDb();
      const schemaPath = join(process.cwd(), "lib/db/schema.sql");
      const sql = readFileSync(schemaPath, "utf8");
      for (const statement of splitSqlStatements(sql)) {
        await db.execute(statement);
      }
    })().catch((error) => {
      schemaReady = null;
      const message = error instanceof Error ? error.message : String(error);
      if (message.includes("401") || message.includes("Unauthorized")) {
        throw new Error(
          [
            "Turso auth failed (HTTP 401).",
            "Create a fresh database token for this DB in the Turso dashboard",
            "(Database → Tokens → Create token), then update TURSO_AUTH_TOKEN.",
            "For local-only seed: npm run db:seed",
            "For Turso seed: npm run db:seed:turso",
          ].join(" "),
        );
      }
      throw error;
    });
  }
  await schemaReady;
}

export function parseJsonColumn<T>(raw: string): T {
  return JSON.parse(raw) as T;
}

export function describeDbTarget(): string {
  return resolveDatabaseUrl().label;
}
