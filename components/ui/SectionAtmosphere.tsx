import { GlitchField } from "@/components/hero/GlitchField";
import { GhostMarks } from "@/components/ui/GhostMarks";

type AtmosphereVariant =
  | "experience"
  | "skills"
  | "gallery"
  | "about"
  | "contact"
  | "achievements";

interface SectionAtmosphereProps {
  variant?: AtmosphereVariant;
}

const LETTERS: Record<AtmosphereVariant, string[]> = {
  about: ["A", "B", "O", "U"],
  skills: ["S", "K", "L"],
  experience: ["E", "X", "P"],
  achievements: ["W", "I", "N"],
  gallery: ["G", "L", "Y"],
  contact: ["C", "T", "N"],
};

/**
 * Ambient glitch lines + ghost marks — no circular halos.
 */
export function SectionAtmosphere({
  variant = "experience",
}: SectionAtmosphereProps) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      <GhostMarks letters={LETTERS[variant]} />
      <GlitchField density="lite" className="opacity-80" />

      {/* Small geometric flecks instead of glow orbs */}
      <div className="absolute right-[12%] top-[20%] hidden h-2.5 w-2.5 rotate-45 border border-accent-glow/30 md:block" />
      <div className="absolute right-[28%] bottom-[24%] hidden h-2 w-2 rounded-full bg-accent-electric/35 md:block" />
      <div className="absolute left-[10%] bottom-[30%] hidden h-px w-10 bg-accent-primary/40 md:block" />
    </div>
  );
}
