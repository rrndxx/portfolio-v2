import { About } from "@/components/about/About";
import { Achievements } from "@/components/achievements/Achievements";
import { Contact } from "@/components/contact/Contact";
import { ExperienceTimeline } from "@/components/experience/ExperienceTimeline";
import { GalleryPreview } from "@/components/gallery/GalleryPreview";
import { Hero } from "@/components/hero/Hero";
import { FeaturedProjects } from "@/components/projects/FeaturedProjects";
import { SkillsGrid } from "@/components/skills/SkillsGrid";
import {
  getAbout,
  getAchievements,
  getExperience,
  getFeaturedGallery,
  getFeaturedProjects,
  getProjects,
  getGallery,
  getSiteConfig,
  getSkills,
} from "@/lib/content";

export default function HomePage() {
  const site = getSiteConfig();
  const about = getAbout();
  const skills = getSkills();
  const allProjects = getProjects();
  const featured = getFeaturedProjects();
  const experience = getExperience();
  const achievements = getAchievements();
  const galleryPreview = getFeaturedGallery(6);
  const galleryTotal = getGallery().length;

  return (
    <main>
      <Hero config={site} />
      <About content={about} />
      <SkillsGrid content={skills} />
      <FeaturedProjects projects={featured} totalCount={allProjects.length} />
      <ExperienceTimeline entries={experience} />
      <Achievements items={achievements} />
      <GalleryPreview items={galleryPreview} totalCount={galleryTotal} />
      <Contact config={site} />
    </main>
  );
}
