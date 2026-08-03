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

/* ── Resume / CV API (consumed by external builder site) ── */

export type ResumeDocumentKind = "resume" | "cv";

export type ResumeRoleId =
  | "fullstack"
  | "frontend"
  | "backend"
  | "technical-support"
  | "software-engineer"
  | "web-developer";

export interface ResumeContact {
  name: string;
  email: string;
  phone?: string;
  location: string;
  links: {
    label: string;
    url: string;
  }[];
}

export interface ResumeEducation {
  id: string;
  school: string;
  degree: string;
  honors?: string;
  start: string;
  end: string;
  location?: string;
}

export interface ResumeExperienceBullet {
  id: string;
  text: string;
  /** Roles that should prefer this bullet. Empty = available to all. */
  roles: ResumeRoleId[];
  /** Higher = more likely to appear when a role profile selects this job. */
  weight: number;
}

export interface ResumeExperienceJob {
  id: string;
  title: string;
  organization: string;
  location?: string;
  start: string;
  end: string;
  /** ISO-ish sort key, e.g. 2026-07 */
  sortKey: string;
  bullets: ResumeExperienceBullet[];
}

export interface ResumeSkillGroup {
  name: string;
  skills: string[];
}

export interface ResumeProjectRef {
  slug: string;
  /** One-line impact blurb for ATS (overrides project.description when set). */
  blurb?: string;
  roles: ResumeRoleId[];
  weight: number;
}

export interface ResumeAchievementRef {
  id: string;
  roles: ResumeRoleId[];
  weight: number;
}

export interface ResumeProfile {
  contact: ResumeContact;
  targetTitleDefault: string;
  summaries: Partial<Record<ResumeRoleId, string>> & { default: string };
  education: ResumeEducation[];
  skillGroups: ResumeSkillGroup[];
  /** Extra skills to inject only for certain roles. */
  roleSkillOverrides?: Partial<
    Record<ResumeRoleId, { emphasize: string[]; deprioritize: string[] }>
  >;
  projects: ResumeProjectRef[];
  achievements: ResumeAchievementRef[];
}

export interface ResumeRoleProfile {
  id: ResumeRoleId;
  label: string;
  /** Headline shown under the name on the document. */
  targetTitle: string;
  relatedRoles: ResumeRoleId[];
  /** Max bullets per experience job (resume). CV uses a higher soft cap. */
  maxBulletsPerJob: number;
  maxProjects: { resume: number; cv: number };
  maxAchievements: { resume: number; cv: number };
  skillCategoryOrder: string[];
  experienceOrder: string[];
  notes?: string;
}

export interface AssembledResumeExperience {
  id: string;
  title: string;
  organization: string;
  location?: string;
  start: string;
  end: string;
  bullets: string[];
}

export interface AssembledResumeProject {
  slug: string;
  name: string;
  blurb: string;
  techStack: string[];
  liveUrl?: string;
  repoUrl?: string;
}

export interface AssembledResumeAchievement {
  id: string;
  title: string;
  year: string;
  category?: string;
  organization?: string;
}

/** Payload returned by GET /api/resume — builder site renders templates from this. */
export interface AssembledResumeDocument {
  meta: {
    role: ResumeRoleId;
    roleLabel: string;
    kind: ResumeDocumentKind;
    generatedAt: string;
    source: "portfolio-v2";
    atsHints: string[];
  };
  contact: ResumeContact;
  targetTitle: string;
  summary: string;
  skills: ResumeSkillGroup[];
  experience: AssembledResumeExperience[];
  projects: AssembledResumeProject[];
  education: ResumeEducation[];
  achievements: AssembledResumeAchievement[];
}

export interface ResumeRoleListItem {
  id: ResumeRoleId;
  label: string;
  targetTitle: string;
  relatedRoles: ResumeRoleId[];
}
