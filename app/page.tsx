import { About } from "@/components/about/About";
import { Achievements } from "@/components/achievements/Achievements";
import { Contact } from "@/components/contact/Contact";
import { ExperienceTimeline } from "@/components/experience/ExperienceTimeline";
import { Gallery } from "@/components/gallery/Gallery";
import { Hero } from "@/components/hero/Hero";
import { FeaturedProjects } from "@/components/projects/FeaturedProjects";
import { SkillsGrid } from "@/components/skills/SkillsGrid";
import {
  getAbout,
  getAchievements,
  getExperience,
  getFeaturedProjects,
  getGallery,
  getSiteConfig,
  getSkills,
} from "@/lib/content";

export default function HomePage() {
  const site = getSiteConfig();
  const about = getAbout();
  const skills = getSkills();
  const featured = getFeaturedProjects();
  const experience = getExperience();
  const achievements = getAchievements();
  const gallery = getGallery();

  return (
    <main>
      <Hero config={site} />
      <About content={about} />
      <SkillsGrid content={skills} />
      <FeaturedProjects projects={featured} />
      <ExperienceTimeline entries={experience} />
      <Achievements items={achievements} />
      <Gallery items={gallery} />
      <Contact config={site} />
    </main>
  );
}
