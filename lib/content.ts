import type {
  AboutContent,
  Achievement,
  ExperienceEntry,
  GalleryItem,
  Project,
  SiteConfig,
  SkillsContent,
} from "@/lib/types";

import aboutJson from "@/data/about.json";
import achievementsJson from "@/data/achievements.json";
import experienceJson from "@/data/experience.json";
import galleryJson from "@/data/gallery.json";
import projectsJson from "@/data/projects.json";
import siteConfigJson from "@/data/site-config.json";
import skillsJson from "@/data/skills.json";

export function getSiteConfig(): SiteConfig {
  return siteConfigJson as SiteConfig;
}

export function getAbout(): AboutContent {
  return aboutJson as AboutContent;
}

export function getSkills(): SkillsContent {
  return skillsJson as SkillsContent;
}

export function getProjects(): Project[] {
  return projectsJson as Project[];
}

export function getFeaturedProjects(): Project[] {
  return getProjects().filter((project) => project.featured).slice(0, 3);
}

export function getExperience(): ExperienceEntry[] {
  return experienceJson as ExperienceEntry[];
}

export function getAchievements(): Achievement[] {
  return achievementsJson as Achievement[];
}

export function getGallery(): GalleryItem[] {
  return galleryJson as GalleryItem[];
}
