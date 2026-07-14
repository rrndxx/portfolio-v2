import type { Project } from "@/lib/types";

/** Split a project name into two stacked title halves (HIS / STORY language). */
export function splitStackedTitle(name: string): [string, string] {
  const camelParts = name.match(/[A-Z]+(?![a-z])|[A-Z]?[a-z]+/g);
  if (camelParts && camelParts.length >= 2) {
    const mid = Math.ceil(camelParts.length / 2);
    return [
      camelParts.slice(0, mid).join(" "),
      camelParts.slice(mid).join(" "),
    ];
  }

  const words = name.trim().split(/\s+/);
  if (words.length >= 2) {
    const mid = Math.ceil(words.length / 2);
    return [words.slice(0, mid).join(" "), words.slice(mid).join(" ")];
  }

  const mid = Math.ceil(name.length / 2);
  return [name.slice(0, mid), name.slice(mid)];
}

export function getProjectBySlug(slug: string, projects: Project[]): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function projectLinks(project: Project): { label: string; href: string }[] {
  const links: { label: string; href: string }[] = [];
  if (project.liveUrl) links.push({ label: "Live", href: project.liveUrl });
  if (project.repoUrl) links.push({ label: "Repo", href: project.repoUrl });
  links.push({ label: "Case study", href: `/work/${project.slug}` });
  return links;
}
