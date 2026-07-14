import { ProjectCard } from "@/components/projects/ProjectCard";
import type { Project } from "@/lib/types";

interface ProjectArchiveGridProps {
  projects: Project[];
}

export function ProjectArchiveGrid({ projects }: ProjectArchiveGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
      {projects.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </div>
  );
}
