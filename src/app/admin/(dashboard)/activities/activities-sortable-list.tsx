"use client";

import { useState } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { SortableList } from "@/components/admin/sortable-list";
import { useReorder } from "@/hooks/use-reorder";
import { ActivityDeleteButton } from "./delete-button";

interface ActivityItem {
  id: string;
  title: string;
  description: string | null;
  category: string;
  order: number;
}

export function ActivitiesSortableList({
  initialItems,
  category,
}: {
  initialItems: ActivityItem[];
  category: string;
}) {
  const [items, setItems] = useState(initialItems);
  const { saveOrder, saving } = useReorder("activities");

  function handleReorder(reordered: ActivityItem[]) {
    setItems(reordered);
    saveOrder(reordered.map((item, i) => ({ id: item.id, order: i })));
  }

  return (
    <div className="mb-6">
      <div className="mb-3 flex items-center gap-2">
        <h2 className="text-sm font-semibold uppercase text-text-muted">{category}</h2>
        {saving && <Loader2 className="h-3.5 w-3.5 animate-spin text-primary" />}
      </div>
      <div className="space-y-2">
        <SortableList
          items={items}
          onReorder={handleReorder}
          renderItem={(item) => (
            <div className="flex items-center justify-between rounded-r-xl border border-l-0 border-border bg-white p-4">
              <div>
                <p className="font-medium text-text">{item.title}</p>
                {item.description && (
                  <p className="mt-0.5 text-sm text-text-muted line-clamp-1">{item.description}</p>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href={`/admin/activities/${item.id}`}
                  className="rounded px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/10"
                >
                  Modifier
                </Link>
                <ActivityDeleteButton id={item.id} />
              </div>
            </div>
          )}
        />
      </div>
    </div>
  );
}
