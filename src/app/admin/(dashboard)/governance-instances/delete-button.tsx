"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { DeleteModal } from "@/components/admin/delete-modal";

export function GovernanceInstanceDeleteButton({ id }: { id: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    setLoading(true);
    await fetch(`/api/admin/governance-instances/${id}`, { method: "DELETE" });
    setOpen(false);
    router.refresh();
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded px-2 py-1 text-xs font-medium text-red-600 hover:bg-red-50"
      >
        Supprimer
      </button>
      <DeleteModal
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={handleDelete}
        loading={loading}
        description="Cette instance sera supprimée définitivement."
      />
    </>
  );
}
