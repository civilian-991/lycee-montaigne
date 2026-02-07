"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface ActivityFormProps {
  initialData?: {
    id: string;
    title: string;
    description: string | null;
    image: string | null;
    category: string;
    order: number;
  };
}

export function ActivityForm({ initialData }: ActivityFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const isEdit = !!initialData;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const body = {
      title: form.get("title") as string,
      description: (form.get("description") as string) || null,
      image: (form.get("image") as string) || null,
      category: form.get("category") as string,
      order: parseInt((form.get("order") as string) || "0", 10),
    };

    try {
      const url = isEdit ? `/api/admin/activities/${initialData.id}` : "/api/admin/activities";
      const method = isEdit ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error("Erreur");
      router.push("/admin/activities");
      router.refresh();
    } catch {
      setError("Une erreur est survenue.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl rounded-xl border border-border bg-white p-6">
      <div className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-text">Titre *</label>
          <input id="title" name="title" required defaultValue={initialData?.title} className="mt-1 block w-full rounded-lg border border-border px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-text">Description</label>
          <textarea id="description" name="description" rows={4} defaultValue={initialData?.description || ""} className="mt-1 block w-full rounded-lg border border-border px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
        </div>
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-text">URL image</label>
          <input id="image" name="image" type="url" defaultValue={initialData?.image || ""} className="mt-1 block w-full rounded-lg border border-border px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" placeholder="https://..." />
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-text">Catégorie *</label>
          <input id="category" name="category" required defaultValue={initialData?.category || ""} className="mt-1 block w-full rounded-lg border border-border px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" placeholder="Ex: Sportives, Culturelles, Scientifiques..." />
        </div>
        <div>
          <label htmlFor="order" className="block text-sm font-medium text-text">Ordre</label>
          <input id="order" name="order" type="number" min={0} defaultValue={initialData?.order ?? 0} className="mt-1 block w-full rounded-lg border border-border px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
        </div>
      </div>
      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
      <div className="mt-6 flex gap-3">
        <button type="submit" disabled={loading} className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-light disabled:opacity-50">
          {loading ? "Enregistrement..." : isEdit ? "Mettre à jour" : "Créer"}
        </button>
        <button type="button" onClick={() => router.back()} className="rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-text-muted hover:bg-background-alt">
          Annuler
        </button>
      </div>
    </form>
  );
}
