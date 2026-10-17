import { ensureSchema, getDb, parseJsonColumn } from "@/lib/db/client";
import type {
  AboutContent,
  Achievement,
  ExperienceEntry,
  GalleryItem,
  Project,
  ResumeExperienceJob,
  ResumeProfile,
  ResumeRoleProfile,
  SiteConfig,
  SkillsContent,
} from "@/lib/types";

async function getSingleton<T>(table: string): Promise<T> {
  await ensureSchema();
  const db = getDb();
  const result = await db.execute(`SELECT data FROM ${table} WHERE id = 1`);
  const row = result.rows[0];
  if (!row?.data || typeof row.data !== "string") {
    throw new Error(`Missing content in ${table}. Run: npm run db:seed`);
  }
  return parseJsonColumn<T>(row.data);
}

async function putSingleton(table: string, data: unknown): Promise<void> {
  await ensureSchema();
  const db = getDb();
  await db.execute({
    sql: `INSERT INTO ${table} (id, data) VALUES (1, ?)
          ON CONFLICT(id) DO UPDATE SET data = excluded.data`,
    args: [JSON.stringify(data)],
  });
}

export async function dbGetSiteConfig(): Promise<SiteConfig> {
  return getSingleton<SiteConfig>("site_config");
}

export async function dbPutSiteConfig(data: SiteConfig): Promise<void> {
  await putSingleton("site_config", data);
}

export async function dbGetAbout(): Promise<AboutContent> {
  return getSingleton<AboutContent>("about");
}

export async function dbPutAbout(data: AboutContent): Promise<void> {
  await putSingleton("about", data);
}

export async function dbGetSkills(): Promise<SkillsContent> {
  return getSingleton<SkillsContent>("skills");
}

export async function dbPutSkills(data: SkillsContent): Promise<void> {
  await putSingleton("skills", data);
}

export async function dbGetResumeProfile(): Promise<ResumeProfile> {
  return getSingleton<ResumeProfile>("resume_profile");
}

export async function dbPutResumeProfile(data: ResumeProfile): Promise<void> {
  await putSingleton("resume_profile", data);
}

export async function dbGetProjects(): Promise<Project[]> {
  await ensureSchema();
  const db = getDb();
  const result = await db.execute(
    "SELECT data FROM projects ORDER BY sort_order ASC, slug ASC",
  );
  return result.rows.map((row) => parseJsonColumn<Project>(String(row.data)));
}

export async function dbGetProject(slug: string): Promise<Project | null> {
  await ensureSchema();
  const db = getDb();
  const result = await db.execute({
    sql: "SELECT data FROM projects WHERE slug = ?",
    args: [slug],
  });
  const row = result.rows[0];
  if (!row?.data) return null;
  return parseJsonColumn<Project>(String(row.data));
}

export async function dbUpsertProject(
  project: Project,
  sortOrder?: number,
): Promise<void> {
  await ensureSchema();
  const db = getDb();

  let order = sortOrder;
  if (order === undefined) {
    const existing = await db.execute({
      sql: "SELECT sort_order FROM projects WHERE slug = ?",
      args: [project.slug],
    });
    if (existing.rows[0]) {
      order = Number(existing.rows[0].sort_order);
    } else {
      const max = await db.execute(
        "SELECT COALESCE(MAX(sort_order), -1) AS m FROM projects",
      );
      order = Number(max.rows[0]?.m ?? -1) + 1;
    }
  }

  await db.execute({
    sql: `INSERT INTO projects (slug, data, featured, sort_order)
          VALUES (?, ?, ?, ?)
          ON CONFLICT(slug) DO UPDATE SET
            data = excluded.data,
            featured = excluded.featured,
            sort_order = excluded.sort_order`,
    args: [
      project.slug,
      JSON.stringify(project),
      project.featured ? 1 : 0,
      order,
    ],
  });
}

export async function dbDeleteProject(slug: string): Promise<void> {
  await ensureSchema();
  const db = getDb();
  await db.execute({
    sql: "DELETE FROM projects WHERE slug = ?",
    args: [slug],
  });
}

export async function dbReplaceProjects(projects: Project[]): Promise<void> {
  await ensureSchema();
  const db = getDb();
  await db.execute("DELETE FROM projects");
  for (let i = 0; i < projects.length; i++) {
    const project = projects[i];
    await db.execute({
      sql: `INSERT INTO projects (slug, data, featured, sort_order)
            VALUES (?, ?, ?, ?)`,
      args: [
        project.slug,
        JSON.stringify(project),
        project.featured ? 1 : 0,
        i,
      ],
    });
  }
}

export async function dbGetExperience(): Promise<ExperienceEntry[]> {
  await ensureSchema();
  const db = getDb();
  const result = await db.execute(
    "SELECT data FROM experience ORDER BY sort_order ASC, id ASC",
  );
  return result.rows.map((row) =>
    parseJsonColumn<ExperienceEntry>(String(row.data)),
  );
}

export async function dbReplaceExperience(
  entries: ExperienceEntry[],
): Promise<void> {
  await ensureSchema();
  const db = getDb();
  await db.execute("DELETE FROM experience");
  for (let i = 0; i < entries.length; i++) {
    await db.execute({
      sql: "INSERT INTO experience (data, sort_order) VALUES (?, ?)",
      args: [JSON.stringify(entries[i]), i],
    });
  }
}

export async function dbGetAchievements(): Promise<Achievement[]> {
  await ensureSchema();
  const db = getDb();
  const result = await db.execute(
    "SELECT data FROM achievements ORDER BY sort_order ASC, id ASC",
  );
  return result.rows.map((row) =>
    parseJsonColumn<Achievement>(String(row.data)),
  );
}

export async function dbUpsertAchievement(
  item: Achievement,
  sortOrder?: number,
): Promise<void> {
  await ensureSchema();
  const db = getDb();

  let order = sortOrder;
  if (order === undefined) {
    const existing = await db.execute({
      sql: "SELECT sort_order FROM achievements WHERE id = ?",
      args: [item.id],
    });
    if (existing.rows[0]) {
      order = Number(existing.rows[0].sort_order);
    } else {
      const max = await db.execute(
        "SELECT COALESCE(MAX(sort_order), -1) AS m FROM achievements",
      );
      order = Number(max.rows[0]?.m ?? -1) + 1;
    }
  }

  await db.execute({
    sql: `INSERT INTO achievements (id, data, featured, sort_order)
          VALUES (?, ?, ?, ?)
          ON CONFLICT(id) DO UPDATE SET
            data = excluded.data,
            featured = excluded.featured,
            sort_order = excluded.sort_order`,
    args: [item.id, JSON.stringify(item), item.featured ? 1 : 0, order],
  });
}

export async function dbDeleteAchievement(id: string): Promise<void> {
  await ensureSchema();
  const db = getDb();
  await db.execute({
    sql: "DELETE FROM achievements WHERE id = ?",
    args: [id],
  });
}

export async function dbReplaceAchievements(
  items: Achievement[],
): Promise<void> {
  await ensureSchema();
  const db = getDb();
  await db.execute("DELETE FROM achievements");
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    await db.execute({
      sql: `INSERT INTO achievements (id, data, featured, sort_order)
            VALUES (?, ?, ?, ?)`,
      args: [item.id, JSON.stringify(item), item.featured ? 1 : 0, i],
    });
  }
}

export async function dbGetGallery(): Promise<GalleryItem[]> {
  await ensureSchema();
  const db = getDb();
  const result = await db.execute(
    "SELECT data FROM gallery ORDER BY sort_order ASC, id ASC",
  );
  return result.rows.map((row) =>
    parseJsonColumn<GalleryItem>(String(row.data)),
  );
}

export async function dbUpsertGalleryItem(
  item: GalleryItem,
  sortOrder?: number,
): Promise<void> {
  await ensureSchema();
  const db = getDb();

  let order = sortOrder;
  if (order === undefined) {
    const existing = await db.execute({
      sql: "SELECT sort_order FROM gallery WHERE id = ?",
      args: [item.id],
    });
    if (existing.rows[0]) {
      order = Number(existing.rows[0].sort_order);
    } else {
      const max = await db.execute(
        "SELECT COALESCE(MAX(sort_order), -1) AS m FROM gallery",
      );
      order = Number(max.rows[0]?.m ?? -1) + 1;
    }
  }

  await db.execute({
    sql: `INSERT INTO gallery (id, data, featured, sort_order)
          VALUES (?, ?, ?, ?)
          ON CONFLICT(id) DO UPDATE SET
            data = excluded.data,
            featured = excluded.featured,
            sort_order = excluded.sort_order`,
    args: [item.id, JSON.stringify(item), item.featured ? 1 : 0, order],
  });
}

export async function dbDeleteGalleryItem(id: string): Promise<void> {
  await ensureSchema();
  const db = getDb();
  await db.execute({
    sql: "DELETE FROM gallery WHERE id = ?",
    args: [id],
  });
}

export async function dbReplaceGallery(items: GalleryItem[]): Promise<void> {
  await ensureSchema();
  const db = getDb();
  await db.execute("DELETE FROM gallery");
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    await db.execute({
      sql: `INSERT INTO gallery (id, data, featured, sort_order)
            VALUES (?, ?, ?, ?)`,
      args: [item.id, JSON.stringify(item), item.featured ? 1 : 0, i],
    });
  }
}

export async function dbGetResumeExperience(): Promise<ResumeExperienceJob[]> {
  await ensureSchema();
  const db = getDb();
  const result = await db.execute(
    "SELECT data FROM resume_experience ORDER BY sort_order ASC, id ASC",
  );
  return result.rows.map((row) =>
    parseJsonColumn<ResumeExperienceJob>(String(row.data)),
  );
}

export async function dbReplaceResumeExperience(
  jobs: ResumeExperienceJob[],
): Promise<void> {
  await ensureSchema();
  const db = getDb();
  await db.execute("DELETE FROM resume_experience");
  for (let i = 0; i < jobs.length; i++) {
    const job = jobs[i];
    await db.execute({
      sql: "INSERT INTO resume_experience (id, data, sort_order) VALUES (?, ?, ?)",
      args: [job.id, JSON.stringify(job), i],
    });
  }
}

export async function dbGetResumeRoles(): Promise<ResumeRoleProfile[]> {
  await ensureSchema();
  const db = getDb();
  const result = await db.execute(
    "SELECT data FROM resume_roles ORDER BY sort_order ASC, id ASC",
  );
  return result.rows.map((row) =>
    parseJsonColumn<ResumeRoleProfile>(String(row.data)),
  );
}

export async function dbReplaceResumeRoles(
  roles: ResumeRoleProfile[],
): Promise<void> {
  await ensureSchema();
  const db = getDb();
  await db.execute("DELETE FROM resume_roles");
  for (let i = 0; i < roles.length; i++) {
    const role = roles[i];
    await db.execute({
      sql: "INSERT INTO resume_roles (id, data, sort_order) VALUES (?, ?, ?)",
      args: [role.id, JSON.stringify(role), i],
    });
  }
}
