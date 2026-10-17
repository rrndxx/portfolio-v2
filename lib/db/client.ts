import { createClient, type Client } from "@libsql/client";
import { readFileSync } from "node:fs";
import { join } from "node:path";

let client: Client | null = null;
let schemaReady: Promise<void> | null = null;

function resolveDatabaseUrl(): string {
  const turso = process.env.TURSO_DATABASE_URL?.trim();
  if (turso) return turso;

  const local = process.env.DATABASE_URL?.trim();
  if (local) return local;

  // Default local file for `next dev` / seed when env is unset.
  return "file:./data/portfolio.db";
}

export function getDb(): Client {
  if (client) return client;

  const url = resolveDatabaseUrl();
  const authToken = process.env.TURSO_AUTH_TOKEN?.trim();

  client = createClient({
    url,
    ...(authToken ? { authToken } : {}),
  });

  return client;
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
    })();
  }
  await schemaReady;
}

export function parseJsonColumn<T>(raw: string): T {
  return JSON.parse(raw) as T;
}
