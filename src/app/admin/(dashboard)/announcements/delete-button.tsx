"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { DeleteModal } from "@/components/admin/delete-modal";

export function DeleteButton({ id }: { id: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    setLoading(true);
    try {
      await fetch(`/api/admin/announcements/${id}`, { method: "DELETE" });
      setOpen(false);
      router.refresh();
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded px-2 py-1 text-xs font-medium text-red-600 hover:bg-red-50 disabled:opacity-50"
      >
        Supprimer
      </button>
      <DeleteModal
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={handleDelete}
        title="Supprimer l'annonce"
        description="Cette annonce sera définitivement supprimée. Voulez-vous continuer ?"
        loading={loading}
      />
    </>
  );
}
