"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Pencil, ChevronDown, ChevronRight, Loader2 } from "lucide-react";
import { DeleteModal } from "@/components/admin/delete-modal";
import { SortableList } from "@/components/admin/sortable-list";
import { useReorder } from "@/hooks/use-reorder";

interface ChildItem {
  id: string;
  label: string;
  url: string | null;
  parentId: string | null;
  order: number;
}

interface MenuItem {
  id: string;
  label: string;
  url: string | null;
  parentId: string | null;
  order: number;
  children: ChildItem[];
}

export function MenuItemsManager({ initialItems }: { initialItems: MenuItem[] }) {
  const router = useRouter();
  const [items, setItems] = useState(initialItems);
  const [loading, setLoading] = useState(false);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set(initialItems.map((i) => i.id)));
  const { saveOrder: saveTopOrder, saving: savingTop } = useReorder("menu-items");
  const { saveOrder: saveChildOrder, saving: savingChild } = useReorder("menu-items");
  const saving = savingTop || savingChild;

  // Edit state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<{ label: string; url: string }>({ label: "", url: "" });

  // Add top-level form
  const [showTopForm, setShowTopForm] = useState(false);

  // Add child form (keyed by parent id)
  const [addChildParentId, setAddChildParentId] = useState<string | null>(null);

  // Delete state
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteLabel, setDeleteLabel] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);

  function toggleExpand(id: string) {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function startEdit(item: { id: string; label: string; url: string | null }) {
    setEditingId(item.id);
    setEditData({ label: item.label, url: item.url || "" });
  }

  function cancelEdit() {
    setEditingId(null);
    setEditData({ label: "", url: "" });
  }

  async function handleUpdate(id: string) {
    setLoading(true);
    await fetch(`/api/admin/menu-items/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ label: editData.label, url: editData.url || null }),
    });
    setEditingId(null);
    setLoading(false);
    router.refresh();
  }

  async function handleAddTopLevel(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.currentTarget);
    await fetch("/api/admin/menu-items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        label: form.get("label") as string,
        url: (form.get("url") as string) || null,
        order: items.length,
      }),
    });
    setShowTopForm(false);
    setLoading(false);
    router.refresh();
  }

  async function handleAddChild(e: React.FormEvent<HTMLFormElement>, parentId: string) {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.currentTarget);
    const parent = items.find((i) => i.id === parentId);
    await fetch("/api/admin/menu-items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        label: form.get("label") as string,
        url: (form.get("url") as string) || null,
        parentId,
        order: parent ? parent.children.length : 0,
      }),
    });
    setAddChildParentId(null);
    setLoading(false);
    router.refresh();
  }

  async function confirmDelete() {
    if (!deleteId) return;
    setDeleteLoading(true);
    await fetch(`/api/admin/menu-items/${deleteId}`, { method: "DELETE" });
    setDeleteId(null);
    setDeleteLoading(false);
    router.refresh();
  }

  function requestDelete(id: string, label: string) {
    setDeleteId(id);
    setDeleteLabel(label);
  }

  function handleTopReorder(reordered: MenuItem[]) {
    setItems(reordered);
    saveTopOrder(reordered.map((item, i) => ({ id: item.id, order: i })));
  }

  function handleChildReorder(parentId: string, reordered: ChildItem[]) {
    setItems((prev) =>
      prev.map((item) =>
        item.id === parentId ? { ...item, children: reordered } : item,
      ),
    );
    saveChildOrder(reordered.map((child, i) => ({ id: child.id, order: i })));
  }

  const inputClass =
    "mt-1 block w-full rounded-lg border border-border px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";

  return (
    <div>
      {saving && (
        <div className="mb-4 flex items-center gap-2 rounded-lg bg-primary/10 px-3 py-2 text-sm text-primary">
          <Loader2 className="h-4 w-4 animate-spin" />
          Enregistrement de l&apos;ordre...
        </div>
      )}

      <div className="space-y-2">
        <SortableList
          items={items}
          onReorder={handleTopReorder}
          renderItem={(item) => (
            <div className="rounded-r-xl border border-l-0 border-border bg-white">
              {/* Top-level item header */}
              <div className="p-4">
                {editingId === item.id ? (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-text">Libelle *</label>
                      <input
                        required
                        value={editData.label}
                        onChange={(e) => setEditData({ ...editData, label: e.target.value })}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text">URL</label>
                      <input
                        value={editData.url}
                        onChange={(e) => setEditData({ ...editData, url: e.target.value })}
                        className={inputClass}
                        placeholder="/page ou https://..."
                      />
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleUpdate(item.id)}
                        disabled={loading || !editData.label}
                        className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-light disabled:opacity-50"
                      >
                        {loading ? "Enregistrement..." : "Enregistrer"}
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="rounded-lg border border-border px-4 py-2 text-sm text-text-muted hover:bg-background-alt"
                      >
                        Annuler
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {item.children.length > 0 && (
                        <button
                          onClick={() => toggleExpand(item.id)}
                          className="rounded p-1 text-text-muted hover:bg-background-alt"
                        >
                          {expandedIds.has(item.id) ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronRight className="h-4 w-4" />
                          )}
                        </button>
                      )}
                      {item.children.length === 0 && <div className="w-6" />}
                      <div>
                        <p className="font-medium text-text">{item.label}</p>
                        {item.url && <p className="text-sm text-text-muted">{item.url}</p>}
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="mr-2 rounded-full bg-background-alt px-2 py-0.5 text-xs text-text-muted">
                        {item.children.length} sous-element{item.children.length !== 1 ? "s" : ""}
                      </span>
                      <button
                        onClick={() => startEdit(item)}
                        className="rounded p-1.5 text-primary hover:bg-primary/10"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => requestDelete(item.id, item.label)}
                        className="rounded p-1.5 text-red-500 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Children */}
              {expandedIds.has(item.id) && (item.children.length > 0 || addChildParentId === item.id) && (
                <div className="border-t border-border bg-background-alt/30 px-4 py-2">
                  <div className="space-y-1">
                    <SortableList
                      items={item.children}
                      onReorder={(reordered) => handleChildReorder(item.id, reordered)}
                      renderItem={(child) => (
                        <div className="rounded-r-lg px-3 py-2.5">
                          {editingId === child.id ? (
                            <div className="space-y-3">
                              <div>
                                <label className="block text-sm font-medium text-text">Libelle *</label>
                                <input
                                  required
                                  value={editData.label}
                                  onChange={(e) => setEditData({ ...editData, label: e.target.value })}
                                  className={inputClass}
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-text">URL</label>
                                <input
                                  value={editData.url}
                                  onChange={(e) => setEditData({ ...editData, url: e.target.value })}
                                  className={inputClass}
                                  placeholder="/page#section"
                                />
                              </div>
                              <div className="flex gap-3">
                                <button
                                  onClick={() => handleUpdate(child.id)}
                                  disabled={loading || !editData.label}
                                  className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-light disabled:opacity-50"
                                >
                                  {loading ? "Enregistrement..." : "Enregistrer"}
                                </button>
                                <button
                                  onClick={cancelEdit}
                                  className="rounded-lg border border-border px-4 py-2 text-sm text-text-muted hover:bg-background-alt"
                                >
                                  Annuler
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-border-dark" />
                                <div>
                                  <p className="text-sm font-medium text-text">{child.label}</p>
                                  {child.url && <p className="text-xs text-text-muted">{child.url}</p>}
                                </div>
                              </div>
                              <div className="flex items-center gap-1">
                                <button
                                  onClick={() => startEdit(child)}
                                  className="rounded p-1.5 text-primary hover:bg-primary/10"
                                >
                                  <Pencil className="h-3.5 w-3.5" />
                                </button>
                                <button
                                  onClick={() => requestDelete(child.id, child.label)}
                                  className="rounded p-1.5 text-red-500 hover:bg-red-50"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    />
                  </div>

                  {/* Add child form */}
                  {addChildParentId === item.id ? (
                    <form
                      onSubmit={(e) => handleAddChild(e, item.id)}
                      className="mt-2 rounded-lg border border-border bg-white p-4"
                    >
                      <div className="space-y-3">
                        <div>
                          <label htmlFor={`child-label-${item.id}`} className="block text-sm font-medium text-text">
                            Libelle *
                          </label>
                          <input id={`child-label-${item.id}`} name="label" required className={inputClass} />
                        </div>
                        <div>
                          <label htmlFor={`child-url-${item.id}`} className="block text-sm font-medium text-text">
                            URL
                          </label>
                          <input
                            id={`child-url-${item.id}`}
                            name="url"
                            className={inputClass}
                            placeholder="/page#section"
                          />
                        </div>
                      </div>
                      <div className="mt-3 flex gap-3">
                        <button
                          type="submit"
                          disabled={loading}
                          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-light disabled:opacity-50"
                        >
                          {loading ? "Ajout..." : "Ajouter"}
                        </button>
                        <button
                          type="button"
                          onClick={() => setAddChildParentId(null)}
                          className="rounded-lg border border-border px-4 py-2 text-sm text-text-muted hover:bg-background-alt"
                        >
                          Annuler
                        </button>
                      </div>
                    </form>
                  ) : (
                    <button
                      onClick={() => {
                        setAddChildParentId(item.id);
                        if (!expandedIds.has(item.id)) toggleExpand(item.id);
                      }}
                      className="mt-2 flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/10"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      Ajouter un sous-element
                    </button>
                  )}
                </div>
              )}

              {/* Add child button when collapsed and no children */}
              {!expandedIds.has(item.id) && item.children.length === 0 && (
                <div className="border-t border-border px-4 py-2">
                  <button
                    onClick={() => {
                      setAddChildParentId(item.id);
                      toggleExpand(item.id);
                    }}
                    className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/10"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Ajouter un sous-element
                  </button>
                </div>
              )}
            </div>
          )}
        />
      </div>

      {items.length === 0 && !showTopForm && (
        <div className="rounded-xl border border-border bg-white p-8 text-center text-sm text-text-muted">
          Aucun element de navigation pour le moment.
        </div>
      )}

      {/* Add top-level form */}
      {showTopForm ? (
        <form onSubmit={handleAddTopLevel} className="mt-4 max-w-lg rounded-xl border border-border bg-white p-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="label" className="block text-sm font-medium text-text">
                Libelle *
              </label>
              <input id="label" name="label" required className={inputClass} />
            </div>
            <div>
              <label htmlFor="url" className="block text-sm font-medium text-text">
                URL
              </label>
              <input id="url" name="url" className={inputClass} placeholder="/page ou https://..." />
            </div>
          </div>
          <div className="mt-4 flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-light disabled:opacity-50"
            >
              {loading ? "Ajout..." : "Ajouter"}
            </button>
            <button
              type="button"
              onClick={() => setShowTopForm(false)}
              className="rounded-lg border border-border px-4 py-2 text-sm text-text-muted hover:bg-background-alt"
            >
              Annuler
            </button>
          </div>
        </form>
      ) : (
        <button
          onClick={() => setShowTopForm(true)}
          className="mt-4 flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-light"
        >
          <Plus className="h-4 w-4" />
          Ajouter un element
        </button>
      )}

      <DeleteModal
        open={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirm={confirmDelete}
        title="Supprimer cet element"
        description={`L'element « ${deleteLabel} » et tous ses sous-elements seront definitivement supprimes. Voulez-vous continuer ?`}
        loading={deleteLoading}
      />
    </div>
  );
}
