import { About } from "@/components/about/About";
import { Contact } from "@/components/contact/Contact";
import { ExperienceTimeline } from "@/components/experience/ExperienceTimeline";
import { Gallery } from "@/components/gallery/Gallery";
import { Hero } from "@/components/hero/Hero";
import { SkillsGrid } from "@/components/skills/SkillsGrid";
import { PlaceholderSection } from "@/components/ui/PlaceholderSection";
import {
  getAbout,
  getExperience,
  getGallery,
  getSiteConfig,
  getSkills,
} from "@/lib/content";

export default function HomePage() {
  const site = getSiteConfig();
  const about = getAbout();
  const skills = getSkills();
  const experience = getExperience();
  const gallery = getGallery();

  return (
    <main>
      <Hero config={site} />
      <About content={about} />
      <SkillsGrid content={skills} />
      <PlaceholderSection id="projects" title="Work" />
      <ExperienceTimeline entries={experience} />
      <Gallery items={gallery} />
      <Contact config={site} />
    </main>
  );
}
