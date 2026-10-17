import type { AdminResource } from "@/lib/admin-resources";
import {
  dbGetAbout,
  dbGetAchievements,
  dbGetExperience,
  dbGetGallery,
  dbGetProjects,
  dbGetResumeExperience,
  dbGetResumeProfile,
  dbGetResumeRoles,
  dbGetSiteConfig,
  dbGetSkills,
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
} from "@/lib/db/queries";
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

export type { AdminResource } from "@/lib/admin-resources";
export {
  ADMIN_RESOURCE_LABELS,
  ADMIN_RESOURCES,
  isAdminResource,
} from "@/lib/admin-resources";

export async function loadAdminResource(
  resource: AdminResource,
): Promise<unknown> {
  switch (resource) {
    case "site-config":
      return dbGetSiteConfig();
    case "about":
      return dbGetAbout();
    case "skills":
      return dbGetSkills();
    case "projects":
      return dbGetProjects();
    case "experience":
      return dbGetExperience();
    case "achievements":
      return dbGetAchievements();
    case "gallery":
      return dbGetGallery();
    case "resume-profile":
      return dbGetResumeProfile();
    case "resume-experience":
      return dbGetResumeExperience();
    case "resume-roles":
      return dbGetResumeRoles();
  }
}

export async function saveAdminResource(
  resource: AdminResource,
  data: unknown,
): Promise<void> {
  switch (resource) {
    case "site-config":
      await dbPutSiteConfig(data as SiteConfig);
      return;
    case "about":
      await dbPutAbout(data as AboutContent);
      return;
    case "skills":
      await dbPutSkills(data as SkillsContent);
      return;
    case "projects":
      await dbReplaceProjects(data as Project[]);
      return;
    case "experience":
      await dbReplaceExperience(data as ExperienceEntry[]);
      return;
    case "achievements":
      await dbReplaceAchievements(data as Achievement[]);
      return;
    case "gallery":
      await dbReplaceGallery(data as GalleryItem[]);
      return;
    case "resume-profile":
      await dbPutResumeProfile(data as ResumeProfile);
      return;
    case "resume-experience":
      await dbReplaceResumeExperience(data as ResumeExperienceJob[]);
      return;
    case "resume-roles":
      await dbReplaceResumeRoles(data as ResumeRoleProfile[]);
      return;
  }
}
