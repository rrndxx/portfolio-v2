import Image from "next/image";

interface HeroAvatarProps {
  src: string;
  alt: string;
}

export function HeroAvatar({ src, alt }: HeroAvatarProps) {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex justify-center md:left-[22vw]">
      <div className="relative h-[48vh] w-[min(72vw,340px)] md:h-[68vh] md:w-[min(36vw,440px)]">
        <Image
          src={src}
          alt={alt}
          fill
          priority
          sizes="(max-width: 768px) 72vw, 36vw"
          className="object-contain object-bottom"
        />
      </div>
    </div>
  );
}
