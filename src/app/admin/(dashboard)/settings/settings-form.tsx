"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, Plus, Trash2 } from "lucide-react";
import type { SettingCategory, SettingField } from "./page";

/* ------------------------------------------------------------------ */
/*  Props                                                              */
/* ------------------------------------------------------------------ */

interface SettingsFormProps {
  settings: Record<string, string>;
  categories: SettingCategory[];
}

/* ------------------------------------------------------------------ */
/*  Main form                                                          */
/* ------------------------------------------------------------------ */

export function SettingsForm({ settings, categories }: SettingsFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [openSections, setOpenSections] = useState<Set<string>>(
    new Set(["general"])
  );
  const [values, setValues] = useState<Record<string, string>>({ ...settings });

  const toggleSection = useCallback((id: string) => {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const updateValue = useCallback((key: string, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  }, []);

  async function handleSubmit() {
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error || "Erreur");
      }
      setMessage("Parametres enregistres.");
      router.refresh();
    } catch (err) {
      setMessage(
        err instanceof Error
          ? `Erreur : ${err.message}`
          : "Erreur lors de l'enregistrement."
      );
    }
    setLoading(false);
  }

  return (
    <div className="max-w-4xl space-y-3">
      {categories.map((cat) => {
        const isOpen = openSections.has(cat.id);
        return (
          <div
            key={cat.id}
            className="rounded-xl border border-border bg-white overflow-hidden"
          >
            {/* Category header — click to toggle */}
            <button
              type="button"
              onClick={() => toggleSection(cat.id)}
              className="flex w-full items-center justify-between px-5 py-4 text-left hover:bg-background-alt/50 transition-colors"
            >
              <span className="text-sm font-semibold text-text">
                {cat.label}
              </span>
              <ChevronDown
                className={`h-4 w-4 text-text-muted transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Collapsible body */}
            {isOpen && (
              <div className="border-t border-border px-5 pb-5 pt-4 space-y-5">
                {cat.fields.map((field) => (
                  <FieldEditor
                    key={field.key}
                    field={field}
                    value={values[field.key] ?? ""}
                    onChange={(v) => updateValue(field.key, v)}
                  />
                ))}
              </div>
            )}
          </div>
        );
      })}

      {/* Feedback + save */}
      {message && (
        <p
          className={`text-sm ${
            message.includes("Erreur") ? "text-red-600" : "text-green-600"
          }`}
        >
          {message}
        </p>
      )}

      <div className="pt-2">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-white hover:bg-primary-light disabled:opacity-50"
        >
          {loading ? "Enregistrement..." : "Enregistrer tous les parametres"}
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Field editor — dispatches to text/url/textarea or JSON repeater    */
/* ------------------------------------------------------------------ */

function FieldEditor({
  field,
  value,
  onChange,
}: {
  field: SettingField;
  value: string;
  onChange: (v: string) => void;
}) {
  if (field.type === "json") {
    return (
      <JsonArrayEditor
        field={field}
        value={value}
        onChange={onChange}
      />
    );
  }

  const inputClasses =
    "mt-1 block w-full rounded-lg border border-border px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";

  return (
    <div>
      <label className="block text-sm font-medium text-text">
        {field.label}
      </label>
      {field.type === "textarea" ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className={inputClasses + " resize-y"}
        />
      ) : (
        <input
          type={field.type === "url" ? "url" : "text"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={inputClasses}
        />
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  JSON Array repeater                                                */
/* ------------------------------------------------------------------ */

function JsonArrayEditor({
  field,
  value,
  onChange,
}: {
  field: SettingField;
  value: string;
  onChange: (v: string) => void;
}) {
  const jsonFields = field.jsonFields ?? [];
  const nestedArray = field.nestedArrayField;

  // Parse the current JSON value
  let items: Record<string, unknown>[];
  try {
    items = JSON.parse(value || "[]");
    if (!Array.isArray(items)) items = [];
  } catch {
    items = [];
  }

  function commit(updated: Record<string, unknown>[]) {
    onChange(JSON.stringify(updated));
  }

  function addItem() {
    const blank: Record<string, unknown> = {};
    for (const f of jsonFields) {
      blank[f.key] = "";
    }
    if (nestedArray) {
      if (nestedArray.itemFields) {
        blank[nestedArray.key] = [];
      } else {
        // Simple string array (e.g. strategic_axes.items)
        blank[nestedArray.key] = [];
      }
    }
    commit([...items, blank]);
  }

  function removeItem(idx: number) {
    commit(items.filter((_, i) => i !== idx));
  }

  function updateField(idx: number, key: string, val: unknown) {
    const updated = items.map((item, i) =>
      i === idx ? { ...item, [key]: val } : item
    );
    commit(updated);
  }

  return (
    <div>
      <label className="block text-sm font-semibold text-text mb-2">
        {field.label}
      </label>

      {items.length === 0 && (
        <p className="text-xs text-text-muted mb-2">Aucun element.</p>
      )}

      <div className="space-y-3">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="rounded-lg border border-border/70 bg-background-alt/30 p-3 space-y-2"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-text-muted">
                #{idx + 1}
              </span>
              <button
                type="button"
                onClick={() => removeItem(idx)}
                className="text-red-400 hover:text-red-600 transition-colors"
                title="Supprimer"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Regular fields */}
            <div className="grid gap-2 sm:grid-cols-2">
              {jsonFields.map((jf) => (
                <div key={jf.key} className={jf.type === "textarea" ? "sm:col-span-2" : ""}>
                  <label className="block text-xs text-text-muted mb-0.5">
                    {jf.label}
                  </label>
                  {jf.type === "textarea" ? (
                    <textarea
                      value={String(item[jf.key] ?? "")}
                      onChange={(e) =>
                        updateField(idx, jf.key, e.target.value)
                      }
                      rows={2}
                      className="block w-full rounded border border-border px-3 py-1.5 text-sm resize-y focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  ) : (
                    <input
                      type={jf.type === "url" ? "url" : "text"}
                      value={String(item[jf.key] ?? "")}
                      onChange={(e) =>
                        updateField(idx, jf.key, e.target.value)
                      }
                      className="block w-full rounded border border-border px-3 py-1.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Nested array (e.g. items inside strategic_axes or supply_lists) */}
            {nestedArray && (
              <NestedArrayEditor
                parentIdx={idx}
                nestedKey={nestedArray.key}
                label={nestedArray.label}
                itemFields={nestedArray.itemFields}
                items={
                  Array.isArray(item[nestedArray.key])
                    ? (item[nestedArray.key] as unknown[])
                    : []
                }
                onChange={(nestedItems) =>
                  updateField(idx, nestedArray.key, nestedItems)
                }
              />
            )}
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addItem}
        className="mt-2 flex items-center gap-1.5 rounded-lg border border-dashed border-border px-3 py-1.5 text-xs font-medium text-text-muted hover:border-primary hover:text-primary transition-colors"
      >
        <Plus className="h-3.5 w-3.5" />
        Ajouter
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Nested array editor (for strategic_axes.items, supply_lists.items) */
/* ------------------------------------------------------------------ */

function NestedArrayEditor({
  label,
  itemFields,
  items,
  onChange,
}: {
  parentIdx: number;
  nestedKey: string;
  label: string;
  itemFields?: { key: string; label: string; type?: "text" | "url" }[];
  items: unknown[];
  onChange: (items: unknown[]) => void;
}) {
  // Two modes:
  // 1. Simple string array (no itemFields) — e.g. strategic_axes.items: string[]
  // 2. Object array (with itemFields) — e.g. supply_lists.items: {name, pdfUrl}[]

  if (!itemFields) {
    // Simple string array
    const stringItems = items.map((it) => String(it ?? ""));

    return (
      <div className="mt-1 ml-2 border-l-2 border-border/50 pl-3">
        <label className="block text-xs font-medium text-text-muted mb-1">
          {label}
        </label>
        {stringItems.map((val, i) => (
          <div key={i} className="flex items-center gap-1 mb-1">
            <input
              type="text"
              value={val}
              onChange={(e) => {
                const updated = [...stringItems];
                updated[i] = e.target.value;
                onChange(updated);
              }}
              className="flex-1 rounded border border-border px-2 py-1 text-xs focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <button
              type="button"
              onClick={() => onChange(stringItems.filter((_, j) => j !== i))}
              className="text-red-400 hover:text-red-600"
            >
              <Trash2 className="h-3 w-3" />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => onChange([...stringItems, ""])}
          className="flex items-center gap-1 text-xs text-text-muted hover:text-primary"
        >
          <Plus className="h-3 w-3" />
          Ajouter
        </button>
      </div>
    );
  }

  // Object array
  const objItems = items.map((it) =>
    typeof it === "object" && it !== null
      ? (it as Record<string, string>)
      : ({} as Record<string, string>)
  );

  return (
    <div className="mt-1 ml-2 border-l-2 border-border/50 pl-3">
      <label className="block text-xs font-medium text-text-muted mb-1">
        {label}
      </label>
      {objItems.map((obj, i) => (
        <div
          key={i}
          className="flex items-start gap-1 mb-1"
        >
          <div className="flex flex-1 gap-1">
            {itemFields.map((f) => (
              <input
                key={f.key}
                type={f.type === "url" ? "url" : "text"}
                placeholder={f.label}
                value={obj[f.key] ?? ""}
                onChange={(e) => {
                  const updated = [...objItems];
                  updated[i] = { ...updated[i], [f.key]: e.target.value };
                  onChange(updated);
                }}
                className="flex-1 rounded border border-border px-2 py-1 text-xs focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => onChange(objItems.filter((_, j) => j !== i))}
            className="mt-1 text-red-400 hover:text-red-600"
          >
            <Trash2 className="h-3 w-3" />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => {
          const blank: Record<string, string> = {};
          for (const f of itemFields) blank[f.key] = "";
          onChange([...objItems, blank]);
        }}
        className="flex items-center gap-1 text-xs text-text-muted hover:text-primary"
      >
        <Plus className="h-3 w-3" />
        Ajouter
      </button>
    </div>
  );
}
