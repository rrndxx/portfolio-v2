import Image from "next/image";
import Link from "next/link";
import { Tag } from "@/components/ui/Tag";
import type { Project } from "@/lib/types";

interface ProjectCardProps {
  project: Project;
}

/** Calmer archive card — still reads as a web viewport, not a photo tile. */
export function ProjectCard({ project }: ProjectCardProps) {
  const tech = project.techStack.filter((item) => !item.startsWith("TODO")).slice(0, 4);
  const host = project.liveUrl
    ? project.liveUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")
    : `${project.slug}.local`;

  return (
    <Link
      href={`/work/${project.slug}`}
      className="group block overflow-hidden border border-border-subtle bg-bg-panel-raised transition-colors duration-300 hover:border-accent-electric/50 hover:bg-bg-panel"
    >
      <div className="flex items-center gap-2 border-b border-border-subtle bg-bg-void/80 px-2.5 py-1.5">
        <span aria-hidden className="flex gap-1">
          <span className="block size-1.5 rounded-full bg-accent-primary" />
          <span className="block size-1.5 rounded-full bg-accent-glow/70" />
          <span className="block size-1.5 rounded-full bg-accent-electric/60" />
        </span>
        <span className="min-w-0 truncate font-mono text-[0.55rem] uppercase tracking-[0.12em] text-text-muted">
          <span className="text-accent-electric">https://</span>
          {host}
        </span>
      </div>

      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Image
          src={project.image}
          alt={project.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
        />
        <div
          aria-hidden
          className="project-orb-scanlines pointer-events-none absolute inset-0 opacity-25 mix-blend-overlay"
        />
      </div>

      <div className="p-5 md:p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-[1.35rem] uppercase leading-tight tracking-tight text-text-primary md:text-xl">
            {project.name}
          </h3>
          {project.featured ? (
            <span className="shrink-0 font-sans text-[0.65rem] uppercase tracking-[0.1em] text-accent-glow">
              Featured
            </span>
          ) : null}
        </div>
        <p className="mt-3 line-clamp-2 font-sans text-body text-text-secondary">
          {project.description}
        </p>
        {tech.length > 0 ? (
          <ul className="mt-4 flex flex-wrap gap-2">
            {tech.map((item) => (
              <li key={item}>
                <Tag className="py-1 text-[0.65rem]">{item}</Tag>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </Link>
  );
}
