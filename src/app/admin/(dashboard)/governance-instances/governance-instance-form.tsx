"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface GovernanceInstanceFormProps {
  initialData?: {
    id: string;
    slug: string;
    title: string;
    subtitle: string;
    iconName: string;
    accentColor: string;
    descriptionHtml: string;
    compositionHtml: string;
    membersJson: string | null;
    meetingFrequency: string | null;
    presidence: string | null;
    responsibilitiesHtml: string;
    order: number;
  };
}

export function GovernanceInstanceForm({ initialData }: GovernanceInstanceFormProps) {
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
      subtitle: form.get("subtitle") as string,
      iconName: (form.get("iconName") as string) || "Building2",
      accentColor: (form.get("accentColor") as string) || "from-primary to-primary-dark",
      descriptionHtml: form.get("descriptionHtml") as string,
      compositionHtml: form.get("compositionHtml") as string,
      membersJson: (form.get("membersJson") as string) || null,
      meetingFrequency: (form.get("meetingFrequency") as string) || null,
      presidence: (form.get("presidence") as string) || null,
      responsibilitiesHtml: form.get("responsibilitiesHtml") as string,
      order: parseInt((form.get("order") as string) || "0", 10),
    };

    try {
      const url = isEdit
        ? `/api/admin/governance-instances/${initialData.id}`
        : "/api/admin/governance-instances";
      const method = isEdit ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error("Erreur");
      router.push("/admin/governance-instances");
      router.refresh();
    } catch {
      setError("Une erreur est survenue.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl rounded-xl border border-border bg-white p-6">
      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="slug" className="block text-sm font-medium text-text">
              Slug *
            </label>
            <input
              id="slug"
              name="slug"
              required
              defaultValue={initialData?.slug}
              placeholder="conseil-strategique"
              className="mt-1 block w-full rounded-lg border border-border px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <p className="mt-1 text-xs text-text-muted">Identifiant URL unique (ex: conseil-strategique)</p>
          </div>
          <div>
            <label htmlFor="order" className="block text-sm font-medium text-text">
              Ordre
            </label>
            <input
              id="order"
              name="order"
              type="number"
              defaultValue={initialData?.order ?? 0}
              className="mt-1 block w-full rounded-lg border border-border px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
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
            className="mt-1 block w-full rounded-lg border border-border px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        <div>
          <label htmlFor="subtitle" className="block text-sm font-medium text-text">
            Sous-titre *
          </label>
          <input
            id="subtitle"
            name="subtitle"
            required
            defaultValue={initialData?.subtitle}
            className="mt-1 block w-full rounded-lg border border-border px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="iconName" className="block text-sm font-medium text-text">
              Icone
            </label>
            <input
              id="iconName"
              name="iconName"
              defaultValue={initialData?.iconName || "Building2"}
              className="mt-1 block w-full rounded-lg border border-border px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <p className="mt-1 text-xs text-text-muted">
              Nom Lucide icon (Building2, Scale, GraduationCap, BookOpen, Gavel, ClipboardList, Megaphone, HeartPulse, UserCheck, Globe, Shield)
            </p>
          </div>
          <div>
            <label htmlFor="accentColor" className="block text-sm font-medium text-text">
              Couleur accent
            </label>
            <input
              id="accentColor"
              name="accentColor"
              defaultValue={initialData?.accentColor || "from-primary to-primary-dark"}
              className="mt-1 block w-full rounded-lg border border-border px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <p className="mt-1 text-xs text-text-muted">
              Classes Tailwind gradient (ex: from-primary to-primary-dark, from-secondary to-secondary-dark)
            </p>
          </div>
        </div>

        <div>
          <label htmlFor="descriptionHtml" className="block text-sm font-medium text-text">
            Description (HTML) *
          </label>
          <textarea
            id="descriptionHtml"
            name="descriptionHtml"
            required
            rows={6}
            defaultValue={initialData?.descriptionHtml}
            className="mt-1 block w-full rounded-lg border border-border px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="<p>Description de l'instance...</p>"
          />
          <p className="mt-1 text-xs text-text-muted">Contenu HTML pour la section description</p>
        </div>

        <div>
          <label htmlFor="compositionHtml" className="block text-sm font-medium text-text">
            Composition (HTML) *
          </label>
          <textarea
            id="compositionHtml"
            name="compositionHtml"
            required
            rows={4}
            defaultValue={initialData?.compositionHtml}
            className="mt-1 block w-full rounded-lg border border-border px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="<ul><li>Membre 1</li><li>Membre 2</li></ul>"
          />
          <p className="mt-1 text-xs text-text-muted">Contenu HTML pour la section composition</p>
        </div>

        <div>
          <label htmlFor="membersJson" className="block text-sm font-medium text-text">
            Membres (JSON)
          </label>
          <textarea
            id="membersJson"
            name="membersJson"
            rows={4}
            defaultValue={initialData?.membersJson || ""}
            className="mt-1 block w-full rounded-lg border border-border px-4 py-2.5 text-sm font-mono focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder='[{"name":"Nom Complet","role":"President"}]'
          />
          <p className="mt-1 text-xs text-text-muted">
            Format JSON : [{'"'}name{'"'}:{'"'}...{'"'},{'"'}role{'"'}:{'"'}...{'"'}]
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="meetingFrequency" className="block text-sm font-medium text-text">
              Frequence des reunions
            </label>
            <input
              id="meetingFrequency"
              name="meetingFrequency"
              defaultValue={initialData?.meetingFrequency || ""}
              className="mt-1 block w-full rounded-lg border border-border px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="Se reunit 3 fois par an"
            />
          </div>
          <div>
            <label htmlFor="presidence" className="block text-sm font-medium text-text">
              Presidence
            </label>
            <input
              id="presidence"
              name="presidence"
              defaultValue={initialData?.presidence || ""}
              className="mt-1 block w-full rounded-lg border border-border px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="Preside par la Cheffe d'etablissement"
            />
          </div>
        </div>

        <div>
          <label htmlFor="responsibilitiesHtml" className="block text-sm font-medium text-text">
            Responsabilites (HTML) *
          </label>
          <textarea
            id="responsibilitiesHtml"
            name="responsibilitiesHtml"
            required
            rows={5}
            defaultValue={initialData?.responsibilitiesHtml}
            className="mt-1 block w-full rounded-lg border border-border px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="<ul><li>Responsabilite 1</li><li>Responsabilite 2</li></ul>"
          />
          <p className="mt-1 text-xs text-text-muted">Contenu HTML pour la section missions principales</p>
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
