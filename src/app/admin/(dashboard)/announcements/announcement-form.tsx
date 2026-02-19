"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { RichTextEditor } from "@/components/admin/rich-text-editor";

interface AnnouncementFormProps {
  initialData?: {
    id: string;
    title: string;
    contentHtml: string;
    active: boolean;
    startDate: string | null;
    endDate: string | null;
    status: string;
  };
}

export function AnnouncementForm({ initialData }: AnnouncementFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [contentHtml, setContentHtml] = useState(initialData?.contentHtml || "");
  const isEdit = !!initialData;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const body = {
      title: form.get("title") as string,
      contentHtml,
      active: form.get("active") === "on",
      startDate: (form.get("startDate") as string) || null,
      endDate: (form.get("endDate") as string) || null,
      status: form.get("status") as string,
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

        <RichTextEditor
          value={contentHtml}
          onChange={setContentHtml}
          label="Contenu"
          required
          placeholder="Contenu de l'annonce..."
        />

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
              Date de debut
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
          {loading ? "Enregistrement..." : isEdit ? "Mettre a jour" : "Creer"}
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
