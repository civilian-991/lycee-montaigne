"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { RichTextEditor } from "@/components/admin/rich-text-editor";

interface StaffFormProps {
  initialData?: {
    id: string;
    name: string;
    title: string;
    photo: string | null;
    messageHtml: string | null;
    section: string;
  };
}

export function StaffForm({ initialData }: StaffFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [messageHtml, setMessageHtml] = useState(initialData?.messageHtml || "");
  const isEdit = !!initialData;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const body = {
      name: form.get("name") as string,
      title: form.get("title") as string,
      photo: (form.get("photo") as string) || null,
      messageHtml: messageHtml || null,
      section: form.get("section") as string,
    };

    try {
      const url = isEdit ? `/api/admin/staff/${initialData.id}` : "/api/admin/staff";
      const method = isEdit ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error("Erreur");
      router.push("/admin/staff");
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
          <label htmlFor="name" className="block text-sm font-medium text-text">Nom *</label>
          <input id="name" name="name" required defaultValue={initialData?.name} className="mt-1 block w-full rounded-lg border border-border px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
        </div>
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-text">Titre / Fonction *</label>
          <input id="title" name="title" required defaultValue={initialData?.title} className="mt-1 block w-full rounded-lg border border-border px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
        </div>
        <div>
          <label htmlFor="photo" className="block text-sm font-medium text-text">URL photo</label>
          <input id="photo" name="photo" type="url" defaultValue={initialData?.photo || ""} className="mt-1 block w-full rounded-lg border border-border px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" placeholder="https://..." />
        </div>
        <div>
          <label htmlFor="section" className="block text-sm font-medium text-text">Section *</label>
          <select id="section" name="section" required defaultValue={initialData?.section || "direction"} className="mt-1 block w-full rounded-lg border border-border px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
            <option value="direction">Direction</option>
            <option value="administration">Administration</option>
            <option value="comite">Comite des parents</option>
          </select>
        </div>
        <RichTextEditor
          value={messageHtml}
          onChange={setMessageHtml}
          label="Message"
          placeholder="Message du membre..."
        />
      </div>
      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
      <div className="mt-6 flex gap-3">
        <button type="submit" disabled={loading} className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-light disabled:opacity-50">
          {loading ? "Enregistrement..." : isEdit ? "Mettre a jour" : "Creer"}
        </button>
        <button type="button" onClick={() => router.back()} className="rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-text-muted hover:bg-background-alt">
          Annuler
        </button>
      </div>
    </form>
  );
}
