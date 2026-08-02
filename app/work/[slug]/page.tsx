import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyView } from "@/components/projects/CaseStudyView";
import { getProjects } from "@/lib/content";
import { getAdjacentProjects, getProjectBySlug } from "@/lib/projects";

interface WorkSlugPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: WorkSlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug, getProjects());
  if (!project) return { title: "Project" };

  const summary =
    project.caseStudy?.summary ?? project.description;

  return {
    title: `${project.name} — Case Study`,
    description: summary,
  };
}

export default async function WorkSlugPage({ params }: WorkSlugPageProps) {
  const { slug } = await params;
  const projects = getProjects();
  const project = getProjectBySlug(slug, projects);
  if (!project) notFound();

  const { prev, next } = getAdjacentProjects(slug, projects);

  return <CaseStudyView project={project} prev={prev} next={next} />;
}
