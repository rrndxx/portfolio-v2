export interface NavItem {
  label: string;
  href: string;
}

export interface Socials {
  github: string;
  portfolio: string;
  linkedin: string;
}

export interface HeroCta {
  label: string;
  href: string;
}

export interface SiteConfig {
  name: string;
  role: string;
  heroHeadline: string;
  heroAvatar: string;
  location: string;
  email: string;
  socials: Socials;
  navItems: NavItem[];
  heroTag: string;
  heroCta: HeroCta;
  closingHeadline: string;
  footerNote: string;
}

export interface AboutContent {
  pullQuote: string;
  paragraph: string;
  credentials: string[];
}

export interface SkillCategory {
  name: string;
  skills: string[];
}

export interface SkillsContent {
  categories: SkillCategory[];
}

export type ProjectLayoutVariant =
  | "stacked-title-left-bleed"
  | "right-bleed-diagonal"
  | "full-bleed-color-field";

export interface Project {
  slug: string;
  name: string;
  featured: boolean;
  description: string;
  techStack: string[];
  image: string;
  liveUrl: string;
  repoUrl: string;
  layoutVariant: ProjectLayoutVariant;
}

export interface ExperienceEntry {
  date: string;
  role: string;
  org: string;
  description: string;
}

export type GalleryItemType = "project-shot" | "art";
export type GalleryAspect = "landscape" | "portrait" | "square";

export interface GalleryItem {
  id: string;
  type: GalleryItemType;
  image: string;
  caption: string;
  aspect: GalleryAspect;
}
