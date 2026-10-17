import { getAchievements, getProjects } from "@/lib/content";
import {
  dbGetResumeExperience,
  dbGetResumeProfile,
  dbGetResumeRoles,
} from "@/lib/db/queries";
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

const ATS_HINTS = [
  "Single-column layout",
  "Standard section headings: Summary, Skills, Experience, Projects, Education, Achievements",
  "No tables, text boxes, or multi-column CSS for the ATS text layer",
  "Use the provided bullet strings verbatim unless the user edits them",
] as const;

async function loadResumeSources(): Promise<{
  profile: ResumeProfile;
  experience: ResumeExperienceJob[];
  roles: ResumeRoleProfile[];
}> {
  const [profile, experience, roles] = await Promise.all([
    dbGetResumeProfile(),
    dbGetResumeExperience(),
    dbGetResumeRoles(),
  ]);
  return { profile, experience, roles };
}

export async function listResumeRoles(): Promise<ResumeRoleListItem[]> {
  const roles = await dbGetResumeRoles();
  return roles.map((role) => ({
    id: role.id,
    label: role.label,
    targetTitle: role.targetTitle,
    relatedRoles: role.relatedRoles,
  }));
}

export async function getResumeRole(
  roleId: string,
): Promise<ResumeRoleProfile | undefined> {
  const roles = await dbGetResumeRoles();
  return roles.find((role) => role.id === roleId);
}

export async function isResumeRoleId(value: string): Promise<boolean> {
  const roles = await dbGetResumeRoles();
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
  profile: ResumeProfile,
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
  experience: ResumeExperienceJob[],
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

async function assembleProjects(
  profile: ResumeProfile,
  role: ResumeRoleProfile,
  kind: ResumeDocumentKind,
): Promise<AssembledResumeProject[]> {
  const limit = role.maxProjects[kind];
  const catalog = await getProjects();
  const bySlug = new Map(catalog.map((project) => [project.slug, project]));

  const ranked = profile.projects
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
    .slice(0, limit);

  const assembled: AssembledResumeProject[] = [];
  for (const { ref } of ranked) {
    const project = bySlug.get(ref.slug);
    if (!project) continue;
    assembled.push({
      slug: project.slug,
      name: project.name,
      blurb: ref.blurb ?? project.description,
      techStack: project.techStack.filter((item) => !item.startsWith("TODO")),
      liveUrl: project.liveUrl || undefined,
      repoUrl: project.repoUrl || undefined,
    });
  }
  return assembled;
}

async function assembleAchievements(
  profile: ResumeProfile,
  role: ResumeRoleProfile,
  kind: ResumeDocumentKind,
): Promise<AssembledResumeAchievement[]> {
  const limit = role.maxAchievements[kind];
  const catalog = await getAchievements();
  const byId = new Map(catalog.map((item) => [item.id, item]));

  const ranked = profile.achievements
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
    .slice(0, limit);

  const assembled: AssembledResumeAchievement[] = [];
  for (const { ref } of ranked) {
    const item = byId.get(ref.id);
    if (!item) continue;
    assembled.push({
      id: item.id,
      title: item.title,
      year: item.year,
      category: item.category,
      organization: item.organization,
    });
  }
  return assembled;
}

export async function assembleResumeDocument(
  roleId: ResumeRoleId,
  kind: ResumeDocumentKind = "resume",
): Promise<AssembledResumeDocument> {
  const { profile, experience, roles } = await loadResumeSources();
  const role = roles.find((item) => item.id === roleId);
  if (!role) {
    throw new Error(`Unknown resume role: ${roleId}`);
  }

  const summary =
    profile.summaries[roleId] ?? profile.summaries.default ?? "";

  const [projects, achievements] = await Promise.all([
    assembleProjects(profile, role, kind),
    assembleAchievements(profile, role, kind),
  ]);

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
    skills: assembleSkills(profile, role),
    experience: assembleExperience(experience, role, kind),
    projects,
    education: profile.education,
    achievements,
  };
}
