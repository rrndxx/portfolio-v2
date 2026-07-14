import type { Metadata } from "next";
import { WorkSelectScreen } from "@/components/projects/WorkSelectScreen";
import { getProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Work — Archive",
  description: "All projects and case studies",
};

export default function WorkPage() {
  const projects = getProjects();

  return (
    <main>
      <WorkSelectScreen projects={projects} />
    </main>
  );
}
