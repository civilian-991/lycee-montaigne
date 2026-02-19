"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { SortableList } from "@/components/admin/sortable-list";
import { useReorder } from "@/hooks/use-reorder";
import { CertificationDeleteButton } from "./delete-button";

interface Certification {
  id: string;
  name: string;
  image: string | null;
  description: string | null;
  order: number;
}

export function CertificationsSortableList({
  initialCertifications,
}: {
  initialCertifications: Certification[];
}) {
  const [certs, setCerts] = useState(initialCertifications);
  const { saveOrder, saving } = useReorder("certifications");

  function handleReorder(reordered: Certification[]) {
    setCerts(reordered);
    saveOrder(reordered.map((c, i) => ({ id: c.id, order: i })));
  }

  return (
    <div>
      {saving && (
        <div className="mb-4 flex items-center gap-2 rounded-lg bg-primary/10 px-3 py-2 text-sm text-primary">
          <Loader2 className="h-4 w-4 animate-spin" />
          Enregistrement de l&apos;ordre...
        </div>
      )}
      <div className="space-y-2">
        <SortableList
          items={certs}
          onReorder={handleReorder}
          renderItem={(cert) => (
            <div className="flex items-center justify-between rounded-r-xl border border-l-0 border-border bg-white p-4">
              <div className="flex items-center gap-4">
                {cert.image ? (
                  <Image
                    src={cert.image}
                    alt={cert.name}
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-lg object-cover"
                  />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-background-alt text-xs text-text-muted">
                    —
                  </div>
                )}
                <div>
                  <p className="font-medium text-text">{cert.name}</p>
                  {cert.description && (
                    <p className="text-sm text-text-muted line-clamp-1">{cert.description}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  href={`/admin/certifications/${cert.id}`}
                  className="rounded px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/10"
                >
                  Modifier
                </Link>
                <CertificationDeleteButton id={cert.id} />
              </div>
            </div>
          )}
        />
      </div>
    </div>
  );
}
