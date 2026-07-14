import Image from "next/image";

interface HeroAvatarProps {
  src: string;
  alt: string;
}

export function HeroAvatar({ src, alt }: HeroAvatarProps) {
  return (
    <div className="hero-enter-avatar pointer-events-none absolute inset-x-0 bottom-0 z-20 flex justify-center">
      <div className="relative h-[58vh] w-[min(86vw,460px)] md:h-[78vh] md:w-[min(48vw,560px)]">
        {/* Hard angled underplate — no soft orb */}
        <div
          aria-hidden
          className="absolute inset-x-[10%] bottom-[2%] top-[28%] -skew-x-[10deg] bg-bg-void/35"
          style={{
            clipPath: "polygon(8% 0, 100% 0, 92% 100%, 0 100%)",
          }}
        />
        <Image
          src={src}
          alt={alt}
          fill
          priority
          sizes="(max-width: 768px) 86vw, 48vw"
          className="relative z-[1] object-contain object-bottom"
        />
      </div>
    </div>
  );
}
