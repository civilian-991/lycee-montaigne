"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Plus, ImageIcon } from "lucide-react";
import { DeleteModal } from "@/components/admin/delete-modal";

interface Photo {
  id: string;
  imageUrl: string;
  altText: string;
  order: number;
}

interface PhotoManagerProps {
  eventId: string;
  initialPhotos: Photo[];
}

export function PhotoManager({ eventId, initialPhotos }: PhotoManagerProps) {
  const router = useRouter();
  const [photos, setPhotos] = useState<Photo[]>(initialPhotos);
  const [imageUrl, setImageUrl] = useState("");
  const [altText, setAltText] = useState("");
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState("");

  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!imageUrl.trim()) return;
    setError("");
    setAdding(true);

    try {
      const res = await fetch(`/api/admin/alumni-events/${eventId}/photos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageUrl: imageUrl.trim(),
          altText: altText.trim(),
          order: photos.length,
        }),
      });

      if (!res.ok) throw new Error("Erreur");
      const photo = await res.json();
      setPhotos((prev) => [...prev, photo]);
      setImageUrl("");
      setAltText("");
      router.refresh();
    } catch {
      setError("Impossible d'ajouter la photo.");
    } finally {
      setAdding(false);
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleting(true);

    try {
      await fetch(`/api/admin/alumni-events/${eventId}/photos/${deleteTarget}`, {
        method: "DELETE",
      });
      setPhotos((prev) => prev.filter((p) => p.id !== deleteTarget));
      setDeleteTarget(null);
      router.refresh();
    } catch {
      setError("Impossible de supprimer la photo.");
    } finally {
      setDeleting(false);
    }
  }

  const inputClass =
    "mt-1 block w-full rounded-lg border border-border px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";

  return (
    <div className="max-w-4xl">
      <h2 className="text-xl font-bold text-text">Photos</h2>
      <p className="mt-1 text-sm text-text-muted">{photos.length} photo(s)</p>

      {photos.length > 0 && (
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="group relative overflow-hidden rounded-lg border border-border bg-white"
            >
              <div className="relative aspect-square">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photo.imageUrl}
                  alt={photo.altText || "Photo"}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-2">
                <p className="truncate text-xs text-text-muted">
                  {photo.altText || "Sans description"}
                </p>
              </div>
              <button
                onClick={() => setDeleteTarget(photo.id)}
                className="absolute right-2 top-2 rounded-full bg-white/90 p-1.5 text-red-600 opacity-0 shadow transition-opacity hover:bg-red-50 group-hover:opacity-100"
                title="Supprimer"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {photos.length === 0 && (
        <div className="mt-4 flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-background-alt/50 py-12">
          <ImageIcon className="h-10 w-10 text-text-muted/40" />
          <p className="mt-2 text-sm text-text-muted">Aucune photo pour le moment.</p>
        </div>
      )}

      <form onSubmit={handleAdd} className="mt-6 rounded-xl border border-border bg-white p-4">
        <h3 className="text-sm font-semibold text-text">Ajouter une photo</h3>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <div>
            <label htmlFor="photoUrl" className="block text-sm font-medium text-text">
              URL de l&apos;image *
            </label>
            <input
              id="photoUrl"
              type="url"
              required
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className={inputClass}
              placeholder="https://..."
            />
          </div>
          <div>
            <label htmlFor="photoAlt" className="block text-sm font-medium text-text">
              Texte alternatif
            </label>
            <input
              id="photoAlt"
              value={altText}
              onChange={(e) => setAltText(e.target.value)}
              className={inputClass}
              placeholder="Description de l'image"
            />
          </div>
        </div>

        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

        <div className="mt-4">
          <button
            type="submit"
            disabled={adding}
            className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-light disabled:opacity-50"
          >
            <Plus className="h-4 w-4" />
            {adding ? "Ajout..." : "Ajouter la photo"}
          </button>
        </div>
      </form>

      <DeleteModal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Supprimer la photo"
        description="Cette photo sera supprimée définitivement. Voulez-vous continuer ?"
        loading={deleting}
      />
    </div>
  );
}
