import type { CaseStudy, Project } from "@/lib/types";

export function getProjectBySlug(
  slug: string,
  projects: Project[],
): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getAdjacentProjects(
  slug: string,
  projects: Project[],
): { prev: Project | null; next: Project | null } {
  const index = projects.findIndex((project) => project.slug === slug);
  if (index === -1) return { prev: null, next: null };
  return {
    prev: index > 0 ? projects[index - 1] : null,
    next: index < projects.length - 1 ? projects[index + 1] : null,
  };
}

export function getCaseStudy(project: Project): CaseStudy | null {
  return project.caseStudy ?? null;
}

export function projectLinks(
  project: Project,
): { label: string; href: string }[] {
  const links: { label: string; href: string }[] = [];
  if (project.liveUrl) links.push({ label: "Live", href: project.liveUrl });
  if (project.repoUrl) links.push({ label: "Repo", href: project.repoUrl });
  links.push({ label: "Case study", href: `/work/${project.slug}` });
  return links;
}
