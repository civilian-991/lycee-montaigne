"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function DeleteButton({ id }: { id: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!confirm("Supprimer cette actualité ?")) return;
    setLoading(true);
    await fetch(`/api/admin/news/${id}`, { method: "DELETE" });
    router.refresh();
    setLoading(false);
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="rounded px-2 py-1 text-xs font-medium text-red-600 hover:bg-red-50 disabled:opacity-50"
    >
      Supprimer
    </button>
  );
}
