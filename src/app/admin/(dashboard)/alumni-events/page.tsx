import { db } from "@/lib/db";
import Link from "next/link";
import { Plus } from "lucide-react";
import { DeleteButton } from "./delete-button";
import { Pagination } from "@/components/admin/pagination";
import { parsePagination, totalPages } from "@/lib/admin-utils";

export default async function AdminAlumniEventsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const { page, skip, take, pageSize } = parsePagination(sp);

  let items: {
    id: string;
    title: string;
    date: Date;
    _count: { photos: number };
  }[] = [];
  let count = 0;

  try {
    [items, count] = await Promise.all([
      db.alumniEvent.findMany({
        orderBy: { date: "desc" },
        select: {
          id: true,
          title: true,
          date: true,
          _count: { select: { photos: true } },
        },
        skip,
        take,
      }),
      db.alumniEvent.count(),
    ]);
  } catch {
    // DB not connected yet
  }

  const pages = totalPages(count, pageSize);

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text">Événements anciens élèves</h1>
          <p className="mt-1 text-sm text-text-muted">{count} événement(s)</p>
        </div>
        <Link
          href="/admin/alumni-events/new"
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-light"
        >
          <Plus className="h-4 w-4" />
          Ajouter
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-white">
        {items.length === 0 ? (
          <div className="p-8 text-center text-sm text-text-muted">
            Aucun événement pour le moment.
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-background-alt text-left text-xs font-medium uppercase text-text-muted">
              <tr>
                <th className="px-4 py-3">Titre</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Photos</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-background-alt/50">
                  <td className="px-4 py-3 font-medium text-text">{item.title}</td>
                  <td className="px-4 py-3 text-text-muted">
                    {new Intl.DateTimeFormat("fr-FR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    }).format(item.date)}
                  </td>
                  <td className="px-4 py-3 text-text-muted">{item._count.photos}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/alumni-events/${item.id}`}
                        className="rounded px-2 py-1 text-xs font-medium text-primary hover:bg-primary/10"
                      >
                        Modifier
                      </Link>
                      <DeleteButton id={item.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Pagination totalPages={pages} currentPage={page} />
    </>
  );
}
