"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewDocumentPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const body = {
      title: form.get("title") as string,
      fileUrl: form.get("fileUrl") as string,
      category: form.get("category") as string,
      academicYear: (form.get("academicYear") as string) || null,
    };

    try {
      const res = await fetch("/api/admin/documents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error("Erreur");
      router.push("/admin/documents");
      router.refresh();
    } catch {
      setError("Une erreur est survenue.");
      setLoading(false);
    }
  }

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text">Nouveau document</h1>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl rounded-xl border border-border bg-white p-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-text">Titre *</label>
            <input id="title" name="title" required className="mt-1 block w-full rounded-lg border border-border px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
          </div>
          <div>
            <label htmlFor="fileUrl" className="block text-sm font-medium text-text">URL du fichier *</label>
            <input id="fileUrl" name="fileUrl" type="url" required className="mt-1 block w-full rounded-lg border border-border px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" placeholder="https://..." />
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-text">Catégorie *</label>
            <select id="category" name="category" required className="mt-1 block w-full rounded-lg border border-border px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
              <option value="calendrier">Calendrier</option>
              <option value="examens">Examens officiels</option>
              <option value="fournitures">Liste de fournitures</option>
              <option value="restauration">Restauration</option>
              <option value="autre">Autre</option>
            </select>
          </div>
          <div>
            <label htmlFor="academicYear" className="block text-sm font-medium text-text">Année scolaire</label>
            <input id="academicYear" name="academicYear" className="mt-1 block w-full rounded-lg border border-border px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" placeholder="2025-2026" />
          </div>
        </div>

        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

        <div className="mt-6 flex gap-3">
          <button type="submit" disabled={loading} className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-light disabled:opacity-50">
            {loading ? "Enregistrement..." : "Créer"}
          </button>
          <button type="button" onClick={() => router.back()} className="rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-text-muted hover:bg-background-alt">
            Annuler
          </button>
        </div>
      </form>
    </>
  );
}
