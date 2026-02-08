import { Suspense } from "react";
import { db } from "@/lib/db";
import Link from "next/link";
import { Plus } from "lucide-react";
import { GovernanceInstanceDeleteButton } from "./delete-button";
import { SearchInput } from "@/components/admin/search-input";
import { Pagination } from "@/components/admin/pagination";

const PAGE_SIZE = 20;

export default async function AdminGovernanceInstancesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>;
}) {
  const { q, page } = await searchParams;
  const currentPage = Math.max(1, parseInt(page || "1", 10));
  const search = q?.trim() || "";

  let items: { id: string; slug: string; title: string; subtitle: string; order: number }[] = [];
  let totalCount = 0;

  try {
    const where = search
      ? {
          OR: [
            { title: { contains: search, mode: "insensitive" as const } },
            { subtitle: { contains: search, mode: "insensitive" as const } },
            { slug: { contains: search, mode: "insensitive" as const } },
          ],
        }
      : {};

    [items, totalCount] = await Promise.all([
      db.governanceInstance.findMany({
        where,
        orderBy: { order: "asc" },
        select: { id: true, slug: true, title: true, subtitle: true, order: true },
        skip: (currentPage - 1) * PAGE_SIZE,
        take: PAGE_SIZE,
      }),
      db.governanceInstance.count({ where }),
    ]);
  } catch {
    // DB not connected
  }

  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text">Instances de Gouvernance</h1>
          <p className="mt-1 text-sm text-text-muted">{totalCount} instance(s)</p>
        </div>
        <Link
          href="/admin/governance-instances/new"
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-light"
        >
          <Plus className="h-4 w-4" />
          Ajouter
        </Link>
      </div>

      <div className="mb-4 max-w-sm">
        <Suspense fallback={null}>
          <SearchInput placeholder="Rechercher une instance..." />
        </Suspense>
      </div>

      {items.length === 0 ? (
        <div className="rounded-xl border border-border bg-white p-8 text-center text-sm text-text-muted">
          {search ? "Aucun résultat pour cette recherche." : "Aucune instance de gouvernance pour le moment."}
        </div>
      ) : (
        <div className="space-y-2">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between rounded-xl border border-border bg-white p-4"
            >
              <div>
                <p className="font-medium text-text">{item.title}</p>
                <p className="text-sm text-text-muted">
                  {item.subtitle}
                  <span className="ml-2 text-xs text-text-muted/60">/{item.slug}</span>
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="rounded bg-background-alt px-2 py-0.5 text-xs text-text-muted">
                  #{item.order}
                </span>
                <Link
                  href={`/admin/governance-instances/${item.id}`}
                  className="rounded px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/10"
                >
                  Modifier
                </Link>
                <GovernanceInstanceDeleteButton id={item.id} />
              </div>
            </div>
          ))}
        </div>
      )}

      <Suspense fallback={null}>
        <Pagination totalPages={totalPages} currentPage={currentPage} />
      </Suspense>
    </>
  );
}
