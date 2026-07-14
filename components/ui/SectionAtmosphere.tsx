import { GlitchField } from "@/components/hero/GlitchField";
import { CyberAmbient } from "@/components/ui/CyberAmbient";
import { GhostMarks } from "@/components/ui/GhostMarks";

type AtmosphereVariant =
  | "experience"
  | "skills"
  | "gallery"
  | "about"
  | "contact"
  | "achievements"
  | "projects";

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
  projects: ["W", "R", "K"],
};

/**
 * Quiet cyber atmosphere for below-fold sections —
 * same language as hero, lower opacity for hierarchy.
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
      <CyberAmbient density="lite" className="z-[1]" />
      <GlitchField density="lite" className="z-[1] opacity-40" />
    </div>
  );
}
