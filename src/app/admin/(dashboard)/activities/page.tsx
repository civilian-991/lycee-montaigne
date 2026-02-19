import { Suspense } from "react";
import { db } from "@/lib/db";
import Link from "next/link";
import { Plus } from "lucide-react";
import { SearchInput } from "@/components/admin/search-input";
import { Pagination } from "@/components/admin/pagination";
import { parsePagination, totalPages as computeTotalPages } from "@/lib/admin-utils";
import { ActivitiesSortableList } from "./activities-sortable-list";

export default async function AdminActivitiesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>;
}) {
  const params = await searchParams;
  const { page: currentPage, skip, take } = parsePagination(params);
  const search = params.q?.trim() || "";

  let items: { id: string; title: string; description: string | null; category: string; order: number }[] = [];
  let totalCount = 0;

  try {
    const where = search
      ? {
          OR: [
            { title: { contains: search, mode: "insensitive" as const } },
            { category: { contains: search, mode: "insensitive" as const } },
            { description: { contains: search, mode: "insensitive" as const } },
          ],
        }
      : {};

    [items, totalCount] = await Promise.all([
      db.activityItem.findMany({
        where,
        orderBy: [{ category: "asc" }, { order: "asc" }],
        select: { id: true, title: true, description: true, category: true, order: true },
        skip,
        take,
      }),
      db.activityItem.count({ where }),
    ]);
  } catch {
    // DB not connected
  }

  const pages = computeTotalPages(totalCount);
  const categories = [...new Set(items.map((item) => item.category))];

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text">Activites</h1>
          <p className="mt-1 text-sm text-text-muted">{totalCount} activite(s)</p>
        </div>
        <Link
          href="/admin/activities/new"
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-light"
        >
          <Plus className="h-4 w-4" />
          Ajouter
        </Link>
      </div>

      <div className="mb-4 max-w-sm">
        <Suspense fallback={null}>
          <SearchInput placeholder="Rechercher une activite..." />
        </Suspense>
      </div>

      {items.length === 0 ? (
        <div className="rounded-xl border border-border bg-white p-8 text-center text-sm text-text-muted">
          {search ? "Aucun resultat pour cette recherche." : "Aucune activite pour le moment."}
        </div>
      ) : (
        categories.map((category) => (
          <ActivitiesSortableList
            key={category}
            category={category}
            initialItems={items.filter((item) => item.category === category)}
          />
        ))
      )}

      <Suspense fallback={null}>
        <Pagination totalPages={pages} currentPage={currentPage} />
      </Suspense>
    </>
  );
}
