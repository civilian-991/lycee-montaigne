"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface NewsFormProps {
  initialData?: {
    id: string;
    title: string;
    image: string | null;
    link: string | null;
    category: string | null;
    status: string;
  };
}

export function NewsForm({ initialData }: NewsFormProps) {
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
      image: (form.get("image") as string) || null,
      link: (form.get("link") as string) || null,
      category: (form.get("category") as string) || null,
      status: form.get("status") as string,
    };

    try {
      const url = isEdit ? `/api/admin/news/${initialData.id}` : "/api/admin/news";
      const method = isEdit ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("Erreur");
      router.push("/admin/news");
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
          <input
            id="title"
            name="title"
            required
            defaultValue={initialData?.title}
            className="mt-1 block w-full rounded-lg border border-border px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-text">URL image</label>
          <input
            id="image"
            name="image"
            type="url"
            defaultValue={initialData?.image || ""}
            className="mt-1 block w-full rounded-lg border border-border px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="https://..."
          />
        </div>
        <div>
          <label htmlFor="link" className="block text-sm font-medium text-text">Lien externe</label>
          <input
            id="link"
            name="link"
            type="url"
            defaultValue={initialData?.link || ""}
            className="mt-1 block w-full rounded-lg border border-border px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="https://..."
          />
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-text">Catégorie</label>
          <input
            id="category"
            name="category"
            defaultValue={initialData?.category || ""}
            className="mt-1 block w-full rounded-lg border border-border px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="actualité, événement..."
          />
        </div>
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-text">Statut</label>
          <select
            id="status"
            name="status"
            defaultValue={initialData?.status ?? "PUBLISHED"}
            className="mt-1 block w-full rounded-lg border border-border px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="PUBLISHED">Publié</option>
            <option value="DRAFT">Brouillon</option>
          </select>
        </div>
      </div>

      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

      <div className="mt-6 flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-light disabled:opacity-50"
        >
          {loading ? "Enregistrement..." : isEdit ? "Mettre à jour" : "Créer"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-text-muted hover:bg-background-alt"
        >
          Annuler
        </button>
      </div>
    </form>
  );
}
