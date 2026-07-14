import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Tag } from "@/components/ui/Tag";
import { getProjects } from "@/lib/content";
import { getProjectBySlug } from "@/lib/projects";

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
  return {
    title: `${project.name} — Case Study`,
    description: project.description,
  };
}

export default async function WorkSlugPage({ params }: WorkSlugPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug, getProjects());
  if (!project) notFound();

  const tech = project.techStack.filter((item) => !item.startsWith("TODO"));

  return (
    <main className="min-h-dvh bg-bg-void">
      <div className="relative aspect-[21/9] w-full overflow-hidden bg-bg-panel md:aspect-[24/9]">
        <Image
          src={project.image}
          alt={project.name}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-void via-bg-void/40 to-transparent" />
      </div>

      <article className="mx-auto max-w-3xl px-6 py-12 md:px-8 md:py-16">
        <Link
          href="/work"
          className="font-sans text-meta uppercase tracking-[0.08em] text-text-muted transition-colors hover:text-accent-glow"
        >
          ← All work
        </Link>

        <h1 className="mt-6 font-display text-display uppercase leading-[0.95] tracking-tight text-text-primary">
          {project.name}
        </h1>
        <p className="mt-6 font-sans text-body-lg text-text-secondary">
          {project.description}
        </p>

        {tech.length > 0 ? (
          <ul className="mt-8 flex flex-wrap gap-2">
            {tech.map((item) => (
              <li key={item}>
                <Tag>{item}</Tag>
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-10 flex flex-wrap gap-5">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-meta uppercase tracking-[0.08em] text-accent-electric hover:text-accent-glow"
            >
              Live site →
            </a>
          ) : null}
          {project.repoUrl ? (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-meta uppercase tracking-[0.08em] text-accent-electric hover:text-accent-glow"
            >
              Repository →
            </a>
          ) : null}
        </div>

        <p className="mt-16 border-t border-border-subtle pt-8 font-sans text-body text-text-muted">
          TODO: expand this case study with problem, approach, and outcomes when
          ready. Template scaffold is in place.
        </p>
      </article>
    </main>
  );
}
