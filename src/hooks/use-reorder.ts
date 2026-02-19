"use client";

import { useState, useCallback } from "react";

export function useReorder(resource: string) {
  const [saving, setSaving] = useState(false);

  const saveOrder = useCallback(
    async (items: { id: string; order: number }[]) => {
      setSaving(true);
      try {
        await fetch("/api/admin/reorder", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ resource, items }),
        });
      } finally {
        setSaving(false);
      }
    },
    [resource],
  );

  return { saveOrder, saving };
}
