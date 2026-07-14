import { Hero } from "@/components/hero/Hero";
import { PlaceholderSection } from "@/components/ui/PlaceholderSection";
import { getSiteConfig } from "@/lib/content";

export default function HomePage() {
  const site = getSiteConfig();

  return (
    <main>
      <Hero config={site} />
      <PlaceholderSection id="about" title="About" />
      <PlaceholderSection id="projects" title="Work" />
      <PlaceholderSection id="gallery" title="Gallery" />
      <PlaceholderSection id="contact" title="Contact" />
    </main>
  );
}
