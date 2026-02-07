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
    await fetch(`/api/admin/pages/${id}`, { method: "DELETE" });
    setOpen(false);
    router.refresh();
    setLoading(false);
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
        title="Supprimer cette page"
        description="Toutes les sections associées seront également supprimées. Cette action est irréversible."
        loading={loading}
      />
    </>
  );
}
