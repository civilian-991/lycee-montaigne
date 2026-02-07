"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PhotoGalleryProps {
  photos: { src: string; alt: string }[];
  columns?: 2 | 3 | 4;
  className?: string;
}

export function PhotoGallery({
  photos,
  columns = 3,
  className,
}: PhotoGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const colsClass = {
    2: "grid-cols-2",
    3: "grid-cols-2 md:grid-cols-3",
    4: "grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
  };

  return (
    <>
      <div className={cn("grid gap-3", colsClass[columns], className)}>
        {photos.map((photo, i) => (
          <button
            key={i}
            onClick={() => setLightboxIndex(i)}
            className="group relative aspect-square overflow-hidden rounded-lg"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            aria-label="Fermer"
          >
            <X className="h-6 w-6" />
          </button>

          {lightboxIndex > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex(lightboxIndex - 1);
              }}
              className="absolute left-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
              aria-label="Photo précédente"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          )}

          <div
            className="relative max-h-[80vh] max-w-[90vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={photos[lightboxIndex].src}
              alt={photos[lightboxIndex].alt}
              width={1200}
              height={800}
              className="max-h-[80vh] w-auto rounded-lg object-contain"
            />
          </div>

          {lightboxIndex < photos.length - 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex(lightboxIndex + 1);
              }}
              className="absolute right-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
              aria-label="Photo suivante"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          )}

          <div className="absolute bottom-4 text-sm text-white/70">
            {lightboxIndex + 1} / {photos.length}
          </div>
        </div>
      )}
    </>
  );
}
