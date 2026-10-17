export const ADMIN_RESOURCES = [
  "site-config",
  "about",
  "skills",
  "projects",
  "experience",
  "achievements",
  "gallery",
  "resume-profile",
  "resume-experience",
  "resume-roles",
] as const;

export type AdminResource = (typeof ADMIN_RESOURCES)[number];

export function isAdminResource(value: string): value is AdminResource {
  return (ADMIN_RESOURCES as readonly string[]).includes(value);
}

export const ADMIN_RESOURCE_LABELS: Record<AdminResource, string> = {
  "site-config": "Site & contact",
  about: "About",
  skills: "Skills",
  projects: "Projects",
  experience: "Experience",
  achievements: "Achievements",
  gallery: "Gallery",
  "resume-profile": "Resume profile",
  "resume-experience": "Resume jobs",
  "resume-roles": "Resume roles",
};
