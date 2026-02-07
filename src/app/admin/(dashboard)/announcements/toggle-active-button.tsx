"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function ToggleActiveButton({ id, active }: { id: string; active: boolean }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleToggle() {
    setLoading(true);
    try {
      await fetch(`/api/admin/announcements/${id}`, { method: "PATCH" });
      router.refresh();
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className="rounded px-2 py-1 text-xs font-medium disabled:opacity-50"
      title={active ? "Désactiver" : "Activer"}
    >
      {active ? (
        <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
          Actif
        </span>
      ) : (
        <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700">
          Inactif
        </span>
      )}
    </button>
  );
}
