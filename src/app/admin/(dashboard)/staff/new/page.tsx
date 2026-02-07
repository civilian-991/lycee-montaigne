"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewStaffPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const body = {
      name: form.get("name") as string,
      title: form.get("title") as string,
      photo: (form.get("photo") as string) || null,
      messageHtml: (form.get("messageHtml") as string) || null,
      section: form.get("section") as string,
    };

    try {
      const res = await fetch("/api/admin/staff", {
        method: "POST",
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
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text">Nouveau membre</h1>
      </div>
      <form onSubmit={handleSubmit} className="max-w-2xl rounded-xl border border-border bg-white p-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-text">Nom *</label>
            <input id="name" name="name" required className="mt-1 block w-full rounded-lg border border-border px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
          </div>
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-text">Titre / Fonction *</label>
            <input id="title" name="title" required className="mt-1 block w-full rounded-lg border border-border px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
          </div>
          <div>
            <label htmlFor="photo" className="block text-sm font-medium text-text">URL photo</label>
            <input id="photo" name="photo" type="url" className="mt-1 block w-full rounded-lg border border-border px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" placeholder="https://..." />
          </div>
          <div>
            <label htmlFor="section" className="block text-sm font-medium text-text">Section *</label>
            <select id="section" name="section" required className="mt-1 block w-full rounded-lg border border-border px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
              <option value="direction">Direction</option>
              <option value="administration">Administration</option>
              <option value="comite">Comité des parents</option>
            </select>
          </div>
          <div>
            <label htmlFor="messageHtml" className="block text-sm font-medium text-text">Message</label>
            <textarea id="messageHtml" name="messageHtml" rows={5} className="mt-1 block w-full rounded-lg border border-border px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
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
