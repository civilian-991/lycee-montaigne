"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Plus, Trash2, Pencil } from "lucide-react";
import { DeleteModal } from "@/components/admin/delete-modal";

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
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<{ imageUrl: string; altText: string; link: string }>({
    imageUrl: "",
    altText: "",
    link: "",
  });
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  function startEdit(slide: Slide) {
    setEditingId(slide.id);
    setEditData({
      imageUrl: slide.imageUrl,
      altText: slide.altText,
      link: slide.link || "",
    });
  }

  function cancelEdit() {
    setEditingId(null);
    setEditData({ imageUrl: "", altText: "", link: "" });
  }

  async function handleUpdate(id: string) {
    setLoading(true);
    await fetch(`/api/admin/carousel/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        imageUrl: editData.imageUrl,
        altText: editData.altText,
        link: editData.link || null,
      }),
    });
    setEditingId(null);
    setLoading(false);
    router.refresh();
  }

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

  async function confirmDelete() {
    if (!deleteId) return;
    setDeleteLoading(true);
    await fetch(`/api/admin/carousel/${deleteId}`, { method: "DELETE" });
    setDeleteId(null);
    setDeleteLoading(false);
    router.refresh();
  }

  const inputClass =
    "mt-1 block w-full rounded-lg border border-border px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";

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

            {editingId === slide.id ? (
              <div className="space-y-3 p-4">
                <div>
                  <label className="block text-sm font-medium text-text">URL image *</label>
                  <input
                    type="url"
                    required
                    value={editData.imageUrl}
                    onChange={(e) => setEditData({ ...editData, imageUrl: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text">Description</label>
                  <input
                    value={editData.altText}
                    onChange={(e) => setEditData({ ...editData, altText: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text">Lien</label>
                  <input
                    type="url"
                    value={editData.link}
                    onChange={(e) => setEditData({ ...editData, link: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleUpdate(slide.id)}
                    disabled={loading || !editData.imageUrl}
                    className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-light disabled:opacity-50"
                  >
                    {loading ? "Enregistrement..." : "Enregistrer"}
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="rounded-lg border border-border px-4 py-2 text-sm text-text-muted hover:bg-background-alt"
                  >
                    Annuler
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-3">
                <p className="truncate text-sm text-text-muted">{slide.altText || "Sans description"}</p>
              </div>
            )}

            {editingId !== slide.id && (
              <div className="absolute right-2 top-2 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                <button
                  onClick={() => startEdit(slide)}
                  className="rounded-lg bg-primary p-1.5 text-white"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setDeleteId(slide.id)}
                  className="rounded-lg bg-red-500 p-1.5 text-white"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            )}
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
              <input id="imageUrl" name="imageUrl" type="url" required className={inputClass} />
            </div>
            <div>
              <label htmlFor="altText" className="block text-sm font-medium text-text">Description</label>
              <input id="altText" name="altText" className={inputClass} />
            </div>
            <div>
              <label htmlFor="link" className="block text-sm font-medium text-text">Lien</label>
              <input id="link" name="link" type="url" className={inputClass} />
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

      <DeleteModal
        open={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirm={confirmDelete}
        title="Supprimer cette slide"
        description="Cette slide sera définitivement supprimée. Voulez-vous continuer ?"
        loading={deleteLoading}
      />
    </div>
  );
}
