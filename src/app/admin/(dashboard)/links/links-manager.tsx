"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, ExternalLink } from "lucide-react";

interface QuickLink {
  id: string;
  label: string;
  url: string;
  target: string;
  order: number;
}

export function LinksManager({ initialLinks }: { initialLinks: QuickLink[] }) {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleAdd(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.currentTarget);
    const body = {
      label: form.get("label") as string,
      url: form.get("url") as string,
      target: form.get("target") as string,
      order: initialLinks.length,
    };

    await fetch("/api/admin/links", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    setShowForm(false);
    setLoading(false);
    router.refresh();
  }

  async function handleDelete(id: string) {
    if (!confirm("Supprimer ce lien ?")) return;
    await fetch(`/api/admin/links/${id}`, { method: "DELETE" });
    router.refresh();
  }

  return (
    <div>
      <div className="space-y-2">
        {initialLinks.map((link) => (
          <div key={link.id} className="flex items-center justify-between rounded-xl border border-border bg-white p-4">
            <div className="min-w-0 flex-1">
              <p className="font-medium text-text">{link.label}</p>
              <p className="truncate text-sm text-text-muted">{link.url}</p>
            </div>
            <div className="flex items-center gap-2">
              {link.target === "_blank" && <ExternalLink className="h-3.5 w-3.5 text-text-muted" />}
              <button
                onClick={() => handleDelete(link.id)}
                className="rounded p-1.5 text-red-500 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {initialLinks.length === 0 && !showForm && (
        <div className="rounded-xl border border-border bg-white p-8 text-center text-sm text-text-muted">
          Aucun lien rapide pour le moment.
        </div>
      )}

      {showForm ? (
        <form onSubmit={handleAdd} className="mt-4 max-w-lg rounded-xl border border-border bg-white p-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="label" className="block text-sm font-medium text-text">Libellé *</label>
              <input id="label" name="label" required className="mt-1 block w-full rounded-lg border border-border px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
            </div>
            <div>
              <label htmlFor="url" className="block text-sm font-medium text-text">URL *</label>
              <input id="url" name="url" required className="mt-1 block w-full rounded-lg border border-border px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" placeholder="https://... ou /page" />
            </div>
            <div>
              <label htmlFor="target" className="block text-sm font-medium text-text">Ouverture</label>
              <select id="target" name="target" className="mt-1 block w-full rounded-lg border border-border px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
                <option value="_self">Même fenêtre</option>
                <option value="_blank">Nouvel onglet</option>
              </select>
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
          className="mt-4 flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-light"
        >
          <Plus className="h-4 w-4" />
          Ajouter un lien
        </button>
      )}
    </div>
  );
}
