import profileJson from "@/data/resume/profile.json";
import experienceJson from "@/data/resume/experience.json";
import rolesJson from "@/data/resume/roles.json";
import { getAchievements, getProjects } from "@/lib/content";
import type {
  AssembledResumeAchievement,
  AssembledResumeDocument,
  AssembledResumeExperience,
  AssembledResumeProject,
  ResumeDocumentKind,
  ResumeExperienceJob,
  ResumeProfile,
  ResumeRoleId,
  ResumeRoleListItem,
  ResumeRoleProfile,
  ResumeSkillGroup,
} from "@/lib/types";

const profile = profileJson as ResumeProfile;
const experience = experienceJson as ResumeExperienceJob[];
const roles = rolesJson as ResumeRoleProfile[];

const ATS_HINTS = [
  "Single-column layout",
  "Standard section headings: Summary, Skills, Experience, Projects, Education, Achievements",
  "No tables, text boxes, or multi-column CSS for the ATS text layer",
  "Use the provided bullet strings verbatim unless the user edits them",
] as const;

export function listResumeRoles(): ResumeRoleListItem[] {
  return roles.map((role) => ({
    id: role.id,
    label: role.label,
    targetTitle: role.targetTitle,
    relatedRoles: role.relatedRoles,
  }));
}

export function getResumeRole(roleId: string): ResumeRoleProfile | undefined {
  return roles.find((role) => role.id === roleId);
}

export function isResumeRoleId(value: string): value is ResumeRoleId {
  return roles.some((role) => role.id === value);
}

function pickBullets(
  job: ResumeExperienceJob,
  roleId: ResumeRoleId,
  limit: number,
): string[] {
  const scored = job.bullets
    .map((bullet) => {
      const roleMatch =
        bullet.roles.length === 0 || bullet.roles.includes(roleId);
      if (!roleMatch) return null;
      const exact = bullet.roles.includes(roleId) ? 20 : 0;
      return { text: bullet.text, score: bullet.weight + exact };
    })
    .filter((item): item is { text: string; score: number } => item !== null)
    .sort((a, b) => b.score - a.score);

  const unique: string[] = [];
  for (const item of scored) {
    if (unique.includes(item.text)) continue;
    unique.push(item.text);
    if (unique.length >= limit) break;
  }
  return unique;
}

function assembleSkills(
  role: ResumeRoleProfile,
): ResumeSkillGroup[] {
  const override = profile.roleSkillOverrides?.[role.id];
  const emphasize = new Set(override?.emphasize ?? []);
  const deprioritize = new Set(override?.deprioritize ?? []);

  const byName = new Map(
    profile.skillGroups.map((group) => [group.name, group]),
  );

  const orderedNames = [
    ...role.skillCategoryOrder.filter((name) => byName.has(name)),
    ...profile.skillGroups
      .map((group) => group.name)
      .filter((name) => !role.skillCategoryOrder.includes(name)),
  ];

  return orderedNames
    .map((name) => {
      const group = byName.get(name);
      if (!group) return null;

      const skills = [...group.skills].sort((a, b) => {
        const aScore = (emphasize.has(a) ? 2 : 0) - (deprioritize.has(a) ? 2 : 0);
        const bScore = (emphasize.has(b) ? 2 : 0) - (deprioritize.has(b) ? 2 : 0);
        return bScore - aScore;
      });

      const filtered = skills.filter((skill) => !deprioritize.has(skill));
      const finalSkills =
        filtered.length > 0
          ? filtered
          : skills.filter((skill) => emphasize.has(skill));

      if (finalSkills.length === 0) return null;
      return { name, skills: finalSkills };
    })
    .filter((group): group is ResumeSkillGroup => group !== null);
}

function assembleExperience(
  role: ResumeRoleProfile,
  kind: ResumeDocumentKind,
): AssembledResumeExperience[] {
  const bulletLimit =
    kind === "cv" ? role.maxBulletsPerJob + 1 : role.maxBulletsPerJob;

  const byId = new Map(experience.map((job) => [job.id, job]));
  const orderedIds = [
    ...role.experienceOrder.filter((id) => byId.has(id)),
    ...experience
      .map((job) => job.id)
      .filter((id) => !role.experienceOrder.includes(id)),
  ];

  return orderedIds
    .map((id) => byId.get(id))
    .filter((job): job is ResumeExperienceJob => Boolean(job))
    .map((job) => ({
      id: job.id,
      title: job.title,
      organization: job.organization,
      location: job.location,
      start: job.start,
      end: job.end,
      bullets: pickBullets(job, role.id, bulletLimit),
    }))
    .filter((job) => job.bullets.length > 0);
}

function assembleProjects(
  role: ResumeRoleProfile,
  kind: ResumeDocumentKind,
): AssembledResumeProject[] {
  const limit = role.maxProjects[kind];
  const catalog = getProjects();
  const bySlug = new Map(catalog.map((project) => [project.slug, project]));

  return profile.projects
    .filter(
      (ref) =>
        ref.roles.includes(role.id) ||
        role.relatedRoles.some((related) => ref.roles.includes(related)),
    )
    .map((ref) => {
      const exact = ref.roles.includes(role.id) ? 25 : 0;
      return { ref, score: ref.weight + exact };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ ref }) => {
      const project = bySlug.get(ref.slug);
      if (!project) return null;
      return {
        slug: project.slug,
        name: project.name,
        blurb: ref.blurb ?? project.description,
        techStack: project.techStack.filter((item) => !item.startsWith("TODO")),
        liveUrl: project.liveUrl || undefined,
        repoUrl: project.repoUrl || undefined,
      };
    })
    .filter((item): item is AssembledResumeProject => item !== null);
}

function assembleAchievements(
  role: ResumeRoleProfile,
  kind: ResumeDocumentKind,
): AssembledResumeAchievement[] {
  const limit = role.maxAchievements[kind];
  const catalog = getAchievements();
  const byId = new Map(catalog.map((item) => [item.id, item]));

  return profile.achievements
    .filter(
      (ref) =>
        ref.roles.includes(role.id) ||
        role.relatedRoles.some((related) => ref.roles.includes(related)),
    )
    .map((ref) => {
      const exact = ref.roles.includes(role.id) ? 20 : 0;
      return { ref, score: ref.weight + exact };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ ref }) => {
      const item = byId.get(ref.id);
      if (!item) return null;
      return {
        id: item.id,
        title: item.title,
        year: item.year,
        category: item.category,
        organization: item.organization,
      };
    })
    .filter((item): item is AssembledResumeAchievement => item !== null);
}

export function assembleResumeDocument(
  roleId: ResumeRoleId,
  kind: ResumeDocumentKind = "resume",
): AssembledResumeDocument {
  const role = getResumeRole(roleId);
  if (!role) {
    throw new Error(`Unknown resume role: ${roleId}`);
  }

  const summary =
    profile.summaries[roleId] ??
    profile.summaries.default ??
    "";

  return {
    meta: {
      role: role.id,
      roleLabel: role.label,
      kind,
      generatedAt: new Date().toISOString(),
      source: "portfolio-v2",
      atsHints: [...ATS_HINTS],
    },
    contact: profile.contact,
    targetTitle: role.targetTitle || profile.targetTitleDefault,
    summary,
    skills: assembleSkills(role),
    experience: assembleExperience(role, kind),
    projects: assembleProjects(role, kind),
    education: profile.education,
    achievements: assembleAchievements(role, kind),
  };
}
