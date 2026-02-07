"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, ChevronUp, Plus, Save, Trash2 } from "lucide-react";
import { DeleteModal } from "@/components/admin/delete-modal";

interface Section {
  id: string;
  sectionKey: string;
  title: string | null;
  contentHtml: string | null;
  image: string | null;
  order: number;
}

interface SectionEditorProps {
  pageId: string;
  initialSections: Section[];
}

const inputClass =
  "mt-1 block w-full rounded-lg border border-border px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";

export function SectionEditor({ pageId, initialSections }: SectionEditorProps) {
  const router = useRouter();
  const [sections, setSections] = useState<Section[]>(initialSections);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // New section form state
  const [showNewForm, setShowNewForm] = useState(false);
  const [newLoading, setNewLoading] = useState(false);
  const [newError, setNewError] = useState("");

  async function handleSaveSection(sectionId: string, form: FormData) {
    setSavingId(sectionId);
    const body = {
      sectionKey: form.get("sectionKey") as string,
      title: (form.get("title") as string) || null,
      contentHtml: (form.get("contentHtml") as string) || null,
      image: (form.get("image") as string) || null,
      order: parseInt(form.get("order") as string, 10) || 0,
    };

    try {
      const res = await fetch(`/api/admin/pages/${pageId}/sections/${sectionId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("Erreur");

      const updated = await res.json();
      setSections((prev) =>
        prev.map((s) => (s.id === sectionId ? updated : s)).sort((a, b) => a.order - b.order)
      );
    } catch {
      alert("Erreur lors de la sauvegarde.");
    } finally {
      setSavingId(null);
    }
  }

  async function handleDeleteSection() {
    if (!deleteTarget) return;
    setDeleteLoading(true);

    try {
      await fetch(`/api/admin/pages/${pageId}/sections/${deleteTarget}`, {
        method: "DELETE",
      });
      setSections((prev) => prev.filter((s) => s.id !== deleteTarget));
      setDeleteTarget(null);
    } catch {
      alert("Erreur lors de la suppression.");
    } finally {
      setDeleteLoading(false);
    }
  }

  async function handleAddSection(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setNewError("");
    setNewLoading(true);

    const form = new FormData(e.currentTarget);
    const body = {
      sectionKey: form.get("sectionKey") as string,
      title: (form.get("title") as string) || null,
      contentHtml: (form.get("contentHtml") as string) || null,
      image: (form.get("image") as string) || null,
      order: parseInt(form.get("order") as string, 10) || 0,
    };

    try {
      const res = await fetch(`/api/admin/pages/${pageId}/sections`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("Erreur");

      const created = await res.json();
      setSections((prev) => [...prev, created].sort((a, b) => a.order - b.order));
      setShowNewForm(false);
      setExpandedId(created.id);
      router.refresh();
      (e.target as HTMLFormElement).reset();
    } catch {
      setNewError("Erreur lors de la création. Vérifiez que la clé de section est unique.");
    } finally {
      setNewLoading(false);
    }
  }

  return (
    <div className="mt-8">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-text">Sections ({sections.length})</h2>
        <button
          onClick={() => setShowNewForm(!showNewForm)}
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-light"
        >
          <Plus className="h-4 w-4" />
          Ajouter une section
        </button>
      </div>

      {/* Add new section form */}
      {showNewForm && (
        <form
          onSubmit={handleAddSection}
          className="mb-4 rounded-xl border border-primary/30 bg-primary/5 p-5"
        >
          <h3 className="mb-4 text-sm font-semibold text-text">Nouvelle section</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="new-sectionKey" className="block text-sm font-medium text-text">
                Clé de section *
              </label>
              <input
                id="new-sectionKey"
                name="sectionKey"
                required
                className={inputClass}
                placeholder="ex: hero, intro, gallery"
              />
            </div>
            <div>
              <label htmlFor="new-title" className="block text-sm font-medium text-text">
                Titre
              </label>
              <input id="new-title" name="title" className={inputClass} />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="new-contentHtml" className="block text-sm font-medium text-text">
                Contenu HTML
              </label>
              <textarea
                id="new-contentHtml"
                name="contentHtml"
                rows={4}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="new-image" className="block text-sm font-medium text-text">
                Image (URL)
              </label>
              <input
                id="new-image"
                name="image"
                type="url"
                className={inputClass}
                placeholder="https://..."
              />
            </div>
            <div>
              <label htmlFor="new-order" className="block text-sm font-medium text-text">
                Ordre
              </label>
              <input
                id="new-order"
                name="order"
                type="number"
                defaultValue={sections.length}
                className={inputClass}
              />
            </div>
          </div>
          {newError && <p className="mt-3 text-sm text-red-600">{newError}</p>}
          <div className="mt-4 flex gap-3">
            <button
              type="submit"
              disabled={newLoading}
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-light disabled:opacity-50"
            >
              {newLoading ? "Création..." : "Créer la section"}
            </button>
            <button
              type="button"
              onClick={() => setShowNewForm(false)}
              className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-text-muted hover:bg-background-alt"
            >
              Annuler
            </button>
          </div>
        </form>
      )}

      {/* Existing sections list */}
      {sections.length === 0 ? (
        <div className="rounded-xl border border-border bg-white p-8 text-center text-sm text-text-muted">
          Aucune section pour cette page.
        </div>
      ) : (
        <div className="space-y-3">
          {sections.map((section) => {
            const isExpanded = expandedId === section.id;
            return (
              <div
                key={section.id}
                className="rounded-xl border border-border bg-white"
              >
                {/* Card header */}
                <button
                  type="button"
                  onClick={() => setExpandedId(isExpanded ? null : section.id)}
                  className="flex w-full items-center justify-between px-5 py-4 text-left"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-md bg-background-alt text-xs font-semibold text-text-muted">
                      {section.order}
                    </span>
                    <div>
                      <span className="font-mono text-xs text-primary">{section.sectionKey}</span>
                      {section.title && (
                        <span className="ml-2 text-sm text-text">{section.title}</span>
                      )}
                    </div>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="h-4 w-4 text-text-muted" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-text-muted" />
                  )}
                </button>

                {/* Card body (expanded) */}
                {isExpanded && (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSaveSection(section.id, new FormData(e.currentTarget));
                    }}
                    className="border-t border-border px-5 pb-5 pt-4"
                  >
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-sm font-medium text-text">
                          Clé de section *
                        </label>
                        <input
                          name="sectionKey"
                          required
                          defaultValue={section.sectionKey}
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-text">Titre</label>
                        <input
                          name="title"
                          defaultValue={section.title || ""}
                          className={inputClass}
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-text">
                          Contenu HTML
                        </label>
                        <textarea
                          name="contentHtml"
                          rows={6}
                          defaultValue={section.contentHtml || ""}
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-text">
                          Image (URL)
                        </label>
                        <input
                          name="image"
                          type="url"
                          defaultValue={section.image || ""}
                          className={inputClass}
                          placeholder="https://..."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-text">Ordre</label>
                        <input
                          name="order"
                          type="number"
                          defaultValue={section.order}
                          className={inputClass}
                        />
                      </div>
                    </div>
                    <div className="mt-4 flex items-center gap-3">
                      <button
                        type="submit"
                        disabled={savingId === section.id}
                        className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-light disabled:opacity-50"
                      >
                        <Save className="h-3.5 w-3.5" />
                        {savingId === section.id ? "Sauvegarde..." : "Enregistrer"}
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleteTarget(section.id)}
                        className="flex items-center gap-2 rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        Supprimer
                      </button>
                    </div>
                  </form>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Delete confirmation modal */}
      <DeleteModal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteSection}
        title="Supprimer cette section"
        description="Cette section sera définitivement supprimée. Cette action est irréversible."
        loading={deleteLoading}
      />
    </div>
  );
}
