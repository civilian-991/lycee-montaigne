"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Plus, Trash2 } from "lucide-react";

interface Slide {
  id: string;
  imageUrl: string;
  altText: string;
  link: string | null;
  order: number;
}

export function CarouselManager({ initialSlides }: { initialSlides: Slide[] }) {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleAdd(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.currentTarget);
    const body = {
      imageUrl: form.get("imageUrl") as string,
      altText: (form.get("altText") as string) || "",
      link: (form.get("link") as string) || null,
      order: initialSlides.length,
    };

    await fetch("/api/admin/carousel", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    setShowForm(false);
    setLoading(false);
    router.refresh();
  }

  async function handleDelete(id: string) {
    if (!confirm("Supprimer cette slide ?")) return;
    await fetch(`/api/admin/carousel/${id}`, { method: "DELETE" });
    router.refresh();
  }

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {initialSlides.map((slide) => (
          <div key={slide.id} className="group relative overflow-hidden rounded-xl border border-border bg-white">
            <div className="relative aspect-[16/9]">
              <Image
                src={slide.imageUrl}
                alt={slide.altText}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="p-3">
              <p className="truncate text-sm text-text-muted">{slide.altText || "Sans description"}</p>
            </div>
            <button
              onClick={() => handleDelete(slide.id)}
              className="absolute right-2 top-2 rounded-lg bg-red-500 p-1.5 text-white opacity-0 transition-opacity group-hover:opacity-100"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      {initialSlides.length === 0 && !showForm && (
        <div className="rounded-xl border border-border bg-white p-8 text-center text-sm text-text-muted">
          Aucune slide pour le moment.
        </div>
      )}

      {showForm ? (
        <form onSubmit={handleAdd} className="mt-6 max-w-lg rounded-xl border border-border bg-white p-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="imageUrl" className="block text-sm font-medium text-text">URL image *</label>
              <input id="imageUrl" name="imageUrl" type="url" required className="mt-1 block w-full rounded-lg border border-border px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
            </div>
            <div>
              <label htmlFor="altText" className="block text-sm font-medium text-text">Description</label>
              <input id="altText" name="altText" className="mt-1 block w-full rounded-lg border border-border px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
            </div>
            <div>
              <label htmlFor="link" className="block text-sm font-medium text-text">Lien</label>
              <input id="link" name="link" type="url" className="mt-1 block w-full rounded-lg border border-border px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
            </div>
          </div>
          <div className="mt-4 flex gap-3">
            <button type="submit" disabled={loading} className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-light disabled:opacity-50">
              {loading ? "Ajout..." : "Ajouter"}
            </button>
            <button type="button" onClick={() => setShowForm(false)} className="rounded-lg border border-border px-4 py-2 text-sm text-text-muted hover:bg-background-alt">
              Annuler
            </button>
          </div>
        </form>
      ) : (
        <button
          onClick={() => setShowForm(true)}
          className="mt-6 flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-light"
        >
          <Plus className="h-4 w-4" />
          Ajouter une slide
        </button>
      )}
    </div>
  );
}
