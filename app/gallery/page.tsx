import type { Metadata } from "next";
import { GalleryArchive } from "@/components/gallery/GalleryArchive";
import { getGallery } from "@/lib/content";

export const metadata: Metadata = {
  title: "Gallery — Archive",
  description: "Visual buffer — captures, milestones, and keeps",
};

export default async function GalleryPage() {
  const items = await getGallery();

  return (
    <main>
      <GalleryArchive items={items} />
    </main>
  );
}
