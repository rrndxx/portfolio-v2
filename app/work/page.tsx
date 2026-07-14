import type { Metadata } from "next";
import Link from "next/link";
import { ProjectArchiveGrid } from "@/components/projects/ProjectArchiveGrid";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Work — Archive",
  description: "All projects and case studies",
};

export default function WorkPage() {
  const projects = getProjects();

  return (
    <main className="min-h-dvh bg-bg-void px-[6vw] py-16 md:px-[10vw] md:py-24">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4 md:mb-14">
        <div>
          <SectionHeading>All Work</SectionHeading>
          <p className="mt-3 max-w-md font-sans text-body text-text-secondary">
            Full archive — including featured case studies.
          </p>
        </div>
        <Link
          href="/#projects"
          className="font-sans text-meta uppercase tracking-[0.08em] text-text-muted transition-colors hover:text-accent-glow"
        >
          ← Back to home
        </Link>
      </div>

      <ProjectArchiveGrid projects={projects} />
    </main>
  );
}
