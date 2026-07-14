/** Soft indigo halo behind the hero figure — dual layer for visible bloom. */
export function GlowDisc() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute left-1/2 top-[36%] z-[2] -translate-x-1/2 -translate-y-1/2 md:left-[58%] md:top-[38%]"
    >
      {/* Wide outer bloom */}
      <div
        className="h-[min(85vw,620px)] w-[min(85vw,620px)] rounded-full"
        style={{
          backgroundImage:
            "radial-gradient(circle, color-mix(in srgb, var(--accent-primary) 85%, transparent) 0%, color-mix(in srgb, var(--accent-glow) 45%, transparent) 38%, transparent 70%)",
          filter: "blur(48px)",
        }}
      />
      {/* Hot core — sits behind the avatar head */}
      <div
        className="absolute left-1/2 top-1/2 h-[min(42vw,300px)] w-[min(42vw,300px)] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--accent-glow) 0%, var(--accent-primary) 42%, transparent 72%)",
          filter: "blur(18px)",
          opacity: 0.95,
        }}
      />
    </div>
  );
}
