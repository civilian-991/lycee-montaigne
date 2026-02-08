"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { DeleteModal } from "@/components/admin/delete-modal";

export function DeleteDocButton({ id }: { id: string }) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    setLoading(true);
    try {
      await fetch(`/api/admin/documents/${id}`, { method: "DELETE" });
      router.refresh();
    } catch {
      // keep modal open on error
    } finally {
      setShowModal(false);
      setLoading(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="rounded px-2 py-1 text-xs font-medium text-red-600 hover:bg-red-50"
      >
        Supprimer
      </button>
      <DeleteModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleDelete}
        loading={loading}
      />
    </>
  );
}
