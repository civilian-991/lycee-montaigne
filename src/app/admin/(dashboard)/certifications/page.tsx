import { Suspense } from "react";
import { db } from "@/lib/db";
import Link from "next/link";
import { Plus } from "lucide-react";
import { SearchInput } from "@/components/admin/search-input";
import { Pagination } from "@/components/admin/pagination";
import { CertificationsSortableList } from "./certifications-sortable-list";

const PAGE_SIZE = 20;

export default async function AdminCertificationsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>;
}) {
  const { q, page } = await searchParams;
  const currentPage = Math.max(1, parseInt(page || "1", 10));
  const search = q?.trim() || "";

  let certifications: { id: string; name: string; image: string | null; description: string | null; order: number }[] = [];
  let totalCount = 0;

  try {
    const where = search
      ? {
          OR: [
            { name: { contains: search, mode: "insensitive" as const } },
            { description: { contains: search, mode: "insensitive" as const } },
          ],
        }
      : {};

    [certifications, totalCount] = await Promise.all([
      db.certification.findMany({
        where,
        orderBy: { order: "asc" },
        select: { id: true, name: true, image: true, description: true, order: true },
        skip: (currentPage - 1) * PAGE_SIZE,
        take: PAGE_SIZE,
      }),
      db.certification.count({ where }),
    ]);
  } catch {
    // DB not connected
  }

  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text">Certifications</h1>
          <p className="mt-1 text-sm text-text-muted">{totalCount} certification(s)</p>
        </div>
        <Link
          href="/admin/certifications/new"
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-light"
        >
          <Plus className="h-4 w-4" />
          Ajouter
        </Link>
      </div>

      <div className="mb-4 max-w-sm">
        <Suspense fallback={null}>
          <SearchInput placeholder="Rechercher une certification..." />
        </Suspense>
      </div>

      {certifications.length === 0 ? (
        <div className="rounded-xl border border-border bg-white p-8 text-center text-sm text-text-muted">
          {search ? "Aucun resultat pour cette recherche." : "Aucune certification pour le moment."}
        </div>
      ) : (
        <CertificationsSortableList initialCertifications={certifications} />
      )}

      <Suspense fallback={null}>
        <Pagination totalPages={totalPages} currentPage={currentPage} />
      </Suspense>
    </>
  );
}
