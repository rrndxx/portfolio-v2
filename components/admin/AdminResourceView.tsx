"use client";

import { AboutForm } from "@/components/admin/forms/AboutForm";
import { AchievementsForm } from "@/components/admin/forms/AchievementsForm";
import { ExperienceForm } from "@/components/admin/forms/ExperienceForm";
import { GalleryForm } from "@/components/admin/forms/GalleryForm";
import { ProjectsForm } from "@/components/admin/forms/ProjectsForm";
import { ResumeExperienceForm } from "@/components/admin/forms/ResumeExperienceForm";
import { ResumeProfileForm } from "@/components/admin/forms/ResumeProfileForm";
import { ResumeRolesForm } from "@/components/admin/forms/ResumeRolesForm";
import { SiteConfigForm } from "@/components/admin/forms/SiteConfigForm";
import { SkillsForm } from "@/components/admin/forms/SkillsForm";
import type { AdminResource } from "@/lib/admin-resources";
import type {
  AboutContent,
  Achievement,
  ExperienceEntry,
  GalleryItem,
  Project,
  ResumeExperienceJob,
  ResumeProfile,
  ResumeRoleProfile,
  SiteConfig,
  SkillsContent,
} from "@/lib/types";

export function AdminResourceView({
  resource,
  data,
}: {
  resource: AdminResource;
  data: unknown;
}) {
  switch (resource) {
    case "site-config":
      return <SiteConfigForm initial={data as SiteConfig} />;
    case "about":
      return <AboutForm initial={data as AboutContent} />;
    case "skills":
      return <SkillsForm initial={data as SkillsContent} />;
    case "projects":
      return <ProjectsForm initial={data as Project[]} />;
    case "experience":
      return <ExperienceForm initial={data as ExperienceEntry[]} />;
    case "achievements":
      return <AchievementsForm initial={data as Achievement[]} />;
    case "gallery":
      return <GalleryForm initial={data as GalleryItem[]} />;
    case "resume-profile":
      return <ResumeProfileForm initial={data as ResumeProfile} />;
    case "resume-experience":
      return <ResumeExperienceForm initial={data as ResumeExperienceJob[]} />;
    case "resume-roles":
      return <ResumeRolesForm initial={data as ResumeRoleProfile[]} />;
  }
}
