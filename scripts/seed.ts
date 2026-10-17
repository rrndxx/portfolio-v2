/**
 * Seed local (or Turso) DB from /data/*.json.
 * Usage: npm run db:seed
 *
 * Env:
 *   DATABASE_URL=file:./data/portfolio.db   (default)
 *   TURSO_DATABASE_URL + TURSO_AUTH_TOKEN     (production seed)
 */
import { config } from "dotenv";
import { readFileSync } from "node:fs";
import { join } from "node:path";

config({ path: ".env.local" });
config();

async function main() {
  // Dynamic import after dotenv so client picks up env.
  const {
    dbPutAbout,
    dbPutResumeProfile,
    dbPutSiteConfig,
    dbPutSkills,
    dbReplaceAchievements,
    dbReplaceExperience,
    dbReplaceGallery,
    dbReplaceProjects,
    dbReplaceResumeExperience,
    dbReplaceResumeRoles,
  } = await import("../lib/db/queries");
  const { ensureSchema } = await import("../lib/db/client");

  const root = process.cwd();
  const readJson = <T>(rel: string): T =>
    JSON.parse(readFileSync(join(root, rel), "utf8")) as T;

  await ensureSchema();

  const siteConfig = readJson("data/site-config.json");
  const about = readJson("data/about.json");
  const skills = readJson("data/skills.json");
  const projects = readJson("data/projects.json");
  const experience = readJson("data/experience.json");
  const achievements = readJson("data/achievements.json");
  const gallery = readJson("data/gallery.json");
  const resumeProfile = readJson("data/resume/profile.json");
  const resumeExperience = readJson("data/resume/experience.json");
  const resumeRoles = readJson("data/resume/roles.json");

  await dbPutSiteConfig(siteConfig as never);
  await dbPutAbout(about as never);
  await dbPutSkills(skills as never);
  await dbReplaceProjects(projects as never);
  await dbReplaceExperience(experience as never);
  await dbReplaceAchievements(achievements as never);
  await dbReplaceGallery(gallery as never);
  await dbPutResumeProfile(resumeProfile as never);
  await dbReplaceResumeExperience(resumeExperience as never);
  await dbReplaceResumeRoles(resumeRoles as never);

  console.log("Seed complete.");
  console.log(
    `  projects=${(projects as unknown[]).length} experience=${(experience as unknown[]).length} achievements=${(achievements as unknown[]).length} gallery=${(gallery as unknown[]).length}`,
  );
  console.log(
    `  resume jobs=${(resumeExperience as unknown[]).length} roles=${(resumeRoles as unknown[]).length}`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
