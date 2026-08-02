export interface NavItem {
  label: string;
  href: string;
}

export interface Socials {
  github: string;
  linkedin: string;
  portfolio?: string;
  facebook?: string;
  instagram?: string;
}

export interface HeroCta {
  label: string;
  href: string;
}

export interface ContactFormCopy {
  eyebrow: string;
  title: string;
  statusIdle: string;
  channelMeta: string;
  nameLabel: string;
  subjectLabel: string;
  messageLabel: string;
  namePlaceholder: string;
  subjectPlaceholder: string;
  messagePlaceholder: string;
  submitLabel: string;
  sendingLabel: string;
  successMessage: string;
  errorMessage: string;
  /** Netlify function path, e.g. `/.netlify/functions/contact` */
  endpoint: string;
}

export interface SiteConfig {
  name: string;
  role: string;
  heroHeadline: string;
  heroBackdrop: string;
  heroAvatar: string;
  location: string;
  email: string;
  socials: Socials;
  navItems: NavItem[];
  heroTag: string;
  heroCta: HeroCta;
  closingHeadline: string;
  footerNote: string;
  contactForm: ContactFormCopy;
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

/** Shared angled composition; side is chosen by featured index (alternating). */
export type ProjectLayoutVariant = "angled-color-field";

export interface CaseStudyOutcome {
  label: string;
  value: string;
}

export interface CaseStudySection {
  heading: string;
  body: string;
}

export interface CaseStudy {
  role: string;
  timeline: string;
  /** Optional lead — falls back to project.description when omitted. */
  summary?: string;
  problem: string;
  approach: string;
  highlights: string[];
  outcomes: CaseStudyOutcome[];
  sections?: CaseStudySection[];
}

export interface ProductBrief {
  tagline: string;
  pitch: string;
  coreGameplayHook: string;
  platform: string;
  audience: string;
  primaryGoal: string;
  tone: string;
  successCriteria: string;
}

export interface Project {
  slug: string;
  name: string;
  featured?: boolean;
  description: string;
  techStack: string[];
  image: string;
  liveUrl?: string;
  repoUrl?: string;
  layoutVariant: ProjectLayoutVariant;
  caseStudy?: CaseStudy;
  productBrief?: ProductBrief;
}

export interface ExperienceEntry {
  date: string;
  role: string;
  org: string;
  description: string;
}

export interface Achievement {
  id: string;
  title: string;
  year: string;
  category?: string;
  organization?: string;
}

export type GalleryItemType = "project" | "milestone" | "keeps";
export type GalleryAspect = "landscape" | "portrait" | "square";

export interface GalleryItem {
  id: string;
  type: GalleryItemType;
  image: string;
  caption: string;
  aspect: GalleryAspect;
  /** Shown in the homepage gallery preview when true. */
  featured?: boolean;
}
