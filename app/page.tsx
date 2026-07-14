import { About } from "@/components/about/About";
import { ExperienceTimeline } from "@/components/experience/ExperienceTimeline";
import { Hero } from "@/components/hero/Hero";
import { SkillsGrid } from "@/components/skills/SkillsGrid";
import { PlaceholderSection } from "@/components/ui/PlaceholderSection";
import {
  getAbout,
  getExperience,
  getSiteConfig,
  getSkills,
} from "@/lib/content";

export default function HomePage() {
  const site = getSiteConfig();
  const about = getAbout();
  const skills = getSkills();
  const experience = getExperience();

  return (
    <main>
      <Hero config={site} />
      <About content={about} />
      <SkillsGrid content={skills} />
      <PlaceholderSection id="projects" title="Work" />
      <ExperienceTimeline entries={experience} />
      <PlaceholderSection id="gallery" title="Gallery" />
      <PlaceholderSection id="contact" title="Contact" />
    </main>
  );
}
