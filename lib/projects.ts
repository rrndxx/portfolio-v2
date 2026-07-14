import type { Project } from "@/lib/types";

export function getProjectBySlug(
  slug: string,
  projects: Project[],
): Project | undefined {
  return projects.find((project) => project.slug === slug);
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
