"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface AnnouncementFormProps {
  initialData?: {
    id: string;
    title: string;
    contentHtml: string;
    active: boolean;
    startDate: string | null;
    endDate: string | null;
  };
}

export function AnnouncementForm({ initialData }: AnnouncementFormProps) {
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
      contentHtml: form.get("contentHtml") as string,
      active: form.get("active") === "on",
      startDate: (form.get("startDate") as string) || null,
      endDate: (form.get("endDate") as string) || null,
    };

    try {
      const url = isEdit
        ? `/api/admin/announcements/${initialData.id}`
        : "/api/admin/announcements";
      const method = isEdit ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("Erreur");
      router.push("/admin/announcements");
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
          <label htmlFor="contentHtml" className="block text-sm font-medium text-text">
            Contenu HTML *
          </label>
          <textarea
            id="contentHtml"
            name="contentHtml"
            required
            rows={8}
            defaultValue={initialData?.contentHtml}
            className="mt-1 block w-full rounded-lg border border-border px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="<p>Contenu de l'annonce...</p>"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            id="active"
            name="active"
            type="checkbox"
            defaultChecked={initialData?.active ?? true}
            className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
          />
          <label htmlFor="active" className="text-sm font-medium text-text">
            Actif
          </label>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-text">
              Date de début
            </label>
            <input
              id="startDate"
              name="startDate"
              type="date"
              defaultValue={initialData?.startDate ?? ""}
              className="mt-1 block w-full rounded-lg border border-border px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-text">
              Date de fin
            </label>
            <input
              id="endDate"
              name="endDate"
              type="date"
              defaultValue={initialData?.endDate ?? ""}
              className="mt-1 block w-full rounded-lg border border-border px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
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
