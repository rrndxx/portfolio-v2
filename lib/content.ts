import {
  dbGetAbout,
  dbGetAchievements,
  dbGetExperience,
  dbGetGallery,
  dbGetProjects,
  dbGetSiteConfig,
  dbGetSkills,
} from "@/lib/db/queries";
import type {
  AboutContent,
  Achievement,
  ExperienceEntry,
  GalleryItem,
  Project,
  SiteConfig,
  SkillsContent,
} from "@/lib/types";

export async function getSiteConfig(): Promise<SiteConfig> {
  return dbGetSiteConfig();
}

export async function getAbout(): Promise<AboutContent> {
  return dbGetAbout();
}

export async function getSkills(): Promise<SkillsContent> {
  return dbGetSkills();
}

export async function getProjects(): Promise<Project[]> {
  return dbGetProjects();
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const projects = await getProjects();
  return projects.filter((project) => project.featured).slice(0, 3);
}

export async function getExperience(): Promise<ExperienceEntry[]> {
  return dbGetExperience();
}

export async function getAchievements(): Promise<Achievement[]> {
  return dbGetAchievements();
}

export async function getFeaturedAchievements(
  limit = 4,
): Promise<Achievement[]> {
  const all = await getAchievements();
  const featured = all.filter((item) => item.featured);
  if (featured.length === 0) return all.slice(0, limit);
  return featured.slice(0, limit);
}

export async function getGallery(): Promise<GalleryItem[]> {
  return dbGetGallery();
}

export async function getFeaturedGallery(limit = 6): Promise<GalleryItem[]> {
  const all = await getGallery();
  const featured = all.filter((item) => item.featured);
  if (featured.length === 0) return all.slice(0, limit);

  const selected = [...featured];
  if (selected.length < limit) {
    const featuredIds = new Set(featured.map((item) => item.id));
    for (const item of all) {
      if (selected.length >= limit) break;
      if (!featuredIds.has(item.id)) selected.push(item);
    }
  }
  return selected.slice(0, limit);
}
