import { db } from "@/lib/db";
import { CarouselManager } from "./carousel-manager";

export default async function AdminCarouselPage() {
  let slides: { id: string; imageUrl: string; altText: string; link: string | null; order: number }[] = [];
  try {
    slides = await db.carouselSlide.findMany({
      orderBy: { order: "asc" },
    });
  } catch {
    // DB not connected
  }

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text">Carousel</h1>
        <p className="mt-1 text-sm text-text-muted">Gérez les slides du carousel de la page d&apos;accueil</p>
      </div>
      <CarouselManager initialSlides={slides} />
    </>
  );
}
