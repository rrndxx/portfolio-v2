import Image from "next/image";

interface HeroAvatarProps {
  src: string;
  alt: string;
}

export function HeroAvatar({ src, alt }: HeroAvatarProps) {
  return (
    <div className="hero-enter-avatar pointer-events-none absolute inset-x-0 bottom-0 z-20 flex justify-center">
      <div className="relative h-[52vh] w-[min(78vw,400px)] md:h-[72vh] md:w-[min(42vw,480px)]">
        <Image
          src={src}
          alt={alt}
          fill
          priority
          sizes="(max-width: 768px) 78vw, 42vw"
          className="object-contain object-bottom"
        />
      </div>
    </div>
  );
}
