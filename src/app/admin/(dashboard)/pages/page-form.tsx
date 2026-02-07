"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface PageFormProps {
  initialData?: {
    id: string;
    slug: string;
    title: string;
    metaDescription: string | null;
    ogImage: string | null;
  };
}

const inputClass =
  "mt-1 block w-full rounded-lg border border-border px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";

export function PageForm({ initialData }: PageFormProps) {
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
      slug: form.get("slug") as string,
      title: form.get("title") as string,
      metaDescription: (form.get("metaDescription") as string) || null,
      ogImage: (form.get("ogImage") as string) || null,
    };

    try {
      const url = isEdit ? `/api/admin/pages/${initialData.id}` : "/api/admin/pages";
      const method = isEdit ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("Erreur");
      router.push("/admin/pages");
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
          <label htmlFor="slug" className="block text-sm font-medium text-text">
            Slug *
          </label>
          <input
            id="slug"
            name="slug"
            required
            defaultValue={initialData?.slug}
            className={inputClass}
            placeholder="ex: vie-scolaire"
          />
        </div>
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-text">
            Titre *
          </label>
          <input
            id="title"
            name="title"
            required
            defaultValue={initialData?.title}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="metaDescription" className="block text-sm font-medium text-text">
            Meta description
          </label>
          <textarea
            id="metaDescription"
            name="metaDescription"
            rows={3}
            defaultValue={initialData?.metaDescription || ""}
            className={inputClass}
            placeholder="Description pour le référencement..."
          />
        </div>
        <div>
          <label htmlFor="ogImage" className="block text-sm font-medium text-text">
            Image OG (URL)
          </label>
          <input
            id="ogImage"
            name="ogImage"
            type="url"
            defaultValue={initialData?.ogImage || ""}
            className={inputClass}
            placeholder="https://..."
          />
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
