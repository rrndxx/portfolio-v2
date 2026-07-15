import type { Metadata } from "next";
import { GalleryArchive } from "@/components/gallery/GalleryArchive";
import { getGallery } from "@/lib/content";

export const metadata: Metadata = {
  title: "Gallery — Archive",
  description: "Visual buffer — captures, milestones, and keeps",
};

export default function GalleryPage() {
  const items = getGallery();

  return (
    <main>
      <GalleryArchive items={items} />
    </main>
  );
}
