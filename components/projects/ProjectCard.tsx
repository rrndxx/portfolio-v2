import Image from "next/image";
import Link from "next/link";
import { Tag } from "@/components/ui/Tag";
import type { Project } from "@/lib/types";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const tech = project.techStack.filter((item) => !item.startsWith("TODO")).slice(0, 4);

  return (
    <Link
      href={`/work/${project.slug}`}
      className="project-card-frame group block overflow-hidden bg-bg-panel-raised transition-colors duration-300 hover:bg-bg-panel"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Image
          src={project.image}
          alt={project.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
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
