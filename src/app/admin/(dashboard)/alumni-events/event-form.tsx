"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface EventFormProps {
  initialData?: {
    id: string;
    title: string;
    date: string;
    descriptionHtml: string | null;
  };
}

export function EventForm({ initialData }: EventFormProps) {
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
      date: form.get("date") as string,
      descriptionHtml: (form.get("descriptionHtml") as string) || null,
    };

    try {
      const url = isEdit
        ? `/api/admin/alumni-events/${initialData.id}`
        : "/api/admin/alumni-events";
      const method = isEdit ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("Erreur");
      router.push("/admin/alumni-events");
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
          <label htmlFor="title" className="block text-sm font-medium text-text">
            Titre *
          </label>
          <input
            id="title"
            name="title"
            required
            defaultValue={initialData?.title}
            className="mt-1 block w-full rounded-lg border border-border px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-text">
            Date *
          </label>
          <input
            id="date"
            name="date"
            type="date"
            required
            defaultValue={initialData?.date}
            className="mt-1 block w-full rounded-lg border border-border px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div>
          <label htmlFor="descriptionHtml" className="block text-sm font-medium text-text">
            Description (HTML)
          </label>
          <textarea
            id="descriptionHtml"
            name="descriptionHtml"
            rows={6}
            defaultValue={initialData?.descriptionHtml || ""}
            className="mt-1 block w-full rounded-lg border border-border px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="<p>Description de l'événement...</p>"
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
