"use client";

import { useRouter } from "next/navigation";

export function MarkReadButton({ id }: { id: string }) {
  const router = useRouter();

  async function handleMarkRead() {
    await fetch(`/api/admin/contact-submissions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ read: true }),
    });
    router.refresh();
  }

  return (
    <button
      onClick={handleMarkRead}
      className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-text-muted hover:bg-background-alt"
    >
      Marquer lu
    </button>
  );
}
