"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Setting {
  key: string;
  label: string;
  value: string;
}

export function SettingsForm({ settings }: { settings: Setting[] }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const form = new FormData(e.currentTarget);
    const data: Record<string, string> = {};
    settings.forEach((s) => {
      data[s.key] = form.get(s.key) as string;
    });

    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Erreur");
      setMessage("Paramètres enregistrés.");
      router.refresh();
    } catch {
      setMessage("Erreur lors de l'enregistrement.");
    }
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl rounded-xl border border-border bg-white p-6">
      <div className="space-y-4">
        {settings.map((setting) => (
          <div key={setting.key}>
            <label htmlFor={setting.key} className="block text-sm font-medium text-text">
              {setting.label}
            </label>
            <input
              id={setting.key}
              name={setting.key}
              defaultValue={setting.value}
              className="mt-1 block w-full rounded-lg border border-border px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        ))}
      </div>

      {message && (
        <p className={`mt-4 text-sm ${message.includes("Erreur") ? "text-red-600" : "text-green-600"}`}>
          {message}
        </p>
      )}

      <div className="mt-6">
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-light disabled:opacity-50"
        >
          {loading ? "Enregistrement..." : "Enregistrer"}
        </button>
      </div>
    </form>
  );
}
