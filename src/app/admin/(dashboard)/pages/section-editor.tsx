"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowDown, ArrowUp, ChevronDown, ChevronUp, Plus, Save, Trash2 } from "lucide-react";
import { DeleteModal } from "@/components/admin/delete-modal";
import { RichTextEditor } from "@/components/admin/rich-text-editor";

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
  const [saveError, setSaveError] = useState<string | null>(null);

  const [movingId, setMovingId] = useState<string | null>(null);

  // Rich text state for each section's contentHtml, keyed by section id
  const [contentHtmlMap, setContentHtmlMap] = useState<Record<string, string>>(() => {
    const map: Record<string, string> = {};
    for (const s of initialSections) {
      map[s.id] = s.contentHtml || "";
    }
    return map;
  });

  // New section form state
  const [showNewForm, setShowNewForm] = useState(false);
  const [newLoading, setNewLoading] = useState(false);
  const [newError, setNewError] = useState("");
  const [newContentHtml, setNewContentHtml] = useState("");

  async function handleSaveSection(sectionId: string, form: FormData) {
    setSaveError(null);
    setSavingId(sectionId);
    const body = {
      sectionKey: form.get("sectionKey") as string,
      title: (form.get("title") as string) || null,
      contentHtml: contentHtmlMap[sectionId] || null,
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
      // Sync the content map with the server response
      setContentHtmlMap((prev) => ({ ...prev, [sectionId]: updated.contentHtml || "" }));
    } catch {
      setSaveError("Erreur lors de la sauvegarde.");
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
      setContentHtmlMap((prev) => {
        const next = { ...prev };
        delete next[deleteTarget];
        return next;
      });
      setDeleteTarget(null);
    } catch {
      setSaveError("Erreur lors de la suppression.");
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
      contentHtml: newContentHtml || null,
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
      setContentHtmlMap((prev) => ({ ...prev, [created.id]: created.contentHtml || "" }));
      setShowNewForm(false);
      setNewContentHtml("");
      setExpandedId(created.id);
      router.refresh();
      (e.target as HTMLFormElement).reset();
    } catch {
      setNewError("Erreur lors de la creation. Verifiez que la cle de section est unique.");
    } finally {
      setNewLoading(false);
    }
  }

  async function handleMove(index: number, direction: "up" | "down") {
    const swapIndex = direction === "up" ? index - 1 : index + 1;
    if (swapIndex < 0 || swapIndex >= sections.length) return;

    const current = sections[index];
    const neighbor = sections[swapIndex];
    setMovingId(current.id);
    setSaveError(null);

    try {
      await Promise.all([
        fetch(`/api/admin/pages/${pageId}/sections/${current.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sectionKey: current.sectionKey, title: current.title, contentHtml: current.contentHtml, image: current.image, order: neighbor.order }),
        }),
        fetch(`/api/admin/pages/${pageId}/sections/${neighbor.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sectionKey: neighbor.sectionKey, title: neighbor.title, contentHtml: neighbor.contentHtml, image: neighbor.image, order: current.order }),
        }),
      ]);
      setSections((prev) => {
        const next = [...prev];
        const tempOrder = next[index].order;
        next[index] = { ...next[index], order: next[swapIndex].order };
        next[swapIndex] = { ...next[swapIndex], order: tempOrder };
        return next.sort((a, b) => a.order - b.order);
      });
    } catch {
      setSaveError("Erreur lors du deplacement.");
    } finally {
      setMovingId(null);
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

      {saveError && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {saveError}
        </div>
      )}

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
                Cle de section *
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
              <RichTextEditor
                value={newContentHtml}
                onChange={setNewContentHtml}
                label="Contenu"
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
              {newLoading ? "Creation..." : "Creer la section"}
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
                <div className="flex items-center justify-between px-5 py-4">
                  <button
                    type="button"
                    onClick={() => setExpandedId(isExpanded ? null : section.id)}
                    className="flex flex-1 items-center gap-3 text-left"
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-md bg-background-alt text-xs font-semibold text-text-muted">
                      {section.order}
                    </span>
                    <div>
                      <span className="font-mono text-xs text-primary">{section.sectionKey}</span>
                      {section.title && (
                        <span className="ml-2 text-sm text-text">{section.title}</span>
                      )}
                    </div>
                  </button>
                  <div className="flex items-center gap-1">
                    {/* Move Up */}
                    <button
                      type="button"
                      disabled={movingId !== null || sections.indexOf(section) === 0}
                      onClick={(e) => { e.stopPropagation(); handleMove(sections.indexOf(section), "up"); }}
                      title="Monter"
                      className="rounded p-1.5 text-text-muted transition-colors hover:bg-background-alt hover:text-text disabled:opacity-30 disabled:hover:bg-transparent"
                    >
                      <ArrowUp className="h-3.5 w-3.5" />
                    </button>
                    {/* Move Down */}
                    <button
                      type="button"
                      disabled={movingId !== null || sections.indexOf(section) === sections.length - 1}
                      onClick={(e) => { e.stopPropagation(); handleMove(sections.indexOf(section), "down"); }}
                      title="Descendre"
                      className="rounded p-1.5 text-text-muted transition-colors hover:bg-background-alt hover:text-text disabled:opacity-30 disabled:hover:bg-transparent"
                    >
                      <ArrowDown className="h-3.5 w-3.5" />
                    </button>
                    {/* Expand/Collapse */}
                    <button
                      type="button"
                      onClick={() => setExpandedId(isExpanded ? null : section.id)}
                      className="rounded p-1.5 text-text-muted transition-colors hover:bg-background-alt hover:text-text"
                    >
                      {isExpanded ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

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
                          Cle de section *
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
                        <RichTextEditor
                          value={contentHtmlMap[section.id] || ""}
                          onChange={(html) =>
                            setContentHtmlMap((prev) => ({ ...prev, [section.id]: html }))
                          }
                          label="Contenu"
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
        description="Cette section sera definitivement supprimee. Cette action est irreversible."
        loading={deleteLoading}
      />
    </div>
  );
}
