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

export default async function HomePage() {
  const [
    site,
    about,
    skills,
    allProjects,
    featured,
    experience,
    achievements,
    galleryPreview,
    gallery,
  ] = await Promise.all([
    getSiteConfig(),
    getAbout(),
    getSkills(),
    getProjects(),
    getFeaturedProjects(),
    getExperience(),
    getAchievements(),
    getFeaturedGallery(6),
    getGallery(),
  ]);

  return (
    <main>
      <Hero config={site} proofSignals={about.highlights} />
      <About content={about} />
      <SkillsGrid content={skills} />
      <FeaturedProjects projects={featured} totalCount={allProjects.length} />
      <ExperienceTimeline entries={experience} />
      <Achievements items={achievements} />
      <GalleryPreview items={galleryPreview} totalCount={gallery.length} />
      <Contact config={site} />
    </main>
  );
}
