"use client";

import { useState } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { SortableList } from "@/components/admin/sortable-list";
import { useReorder } from "@/hooks/use-reorder";
import { StaffDeleteButton } from "./delete-button";

interface StaffMember {
  id: string;
  name: string;
  title: string;
  section: string;
  order: number;
}

export function StaffSortableList({
  initialStaff,
  section,
}: {
  initialStaff: StaffMember[];
  section: string;
}) {
  const [members, setMembers] = useState(initialStaff);
  const { saveOrder, saving } = useReorder("staff");

  function handleReorder(reordered: StaffMember[]) {
    setMembers(reordered);
    saveOrder(reordered.map((m, i) => ({ id: m.id, order: i })));
  }

  return (
    <div className="mb-6">
      <div className="mb-3 flex items-center gap-2">
        <h2 className="text-sm font-semibold uppercase text-text-muted">{section}</h2>
        {saving && <Loader2 className="h-3.5 w-3.5 animate-spin text-primary" />}
      </div>
      <div className="space-y-2">
        <SortableList
          items={members}
          onReorder={handleReorder}
          renderItem={(member) => (
            <div className="flex items-center justify-between rounded-r-xl border border-l-0 border-border bg-white p-4">
              <div>
                <p className="font-medium text-text">{member.name}</p>
                <p className="text-sm text-text-muted">{member.title}</p>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href={`/admin/staff/${member.id}`}
                  className="rounded px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/10"
                >
                  Modifier
                </Link>
                <StaffDeleteButton id={member.id} />
              </div>
            </div>
          )}
        />
      </div>
    </div>
  );
}
