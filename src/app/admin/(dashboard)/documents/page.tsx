import { db } from "@/lib/db";
import Link from "next/link";
import { Plus, FileText, ExternalLink } from "lucide-react";
import { DeleteDocButton } from "./delete-button";
import { Pagination } from "@/components/admin/pagination";
import { SearchInput } from "@/components/admin/search-input";
import { parsePagination, parseSearch, totalPages } from "@/lib/admin-utils";

export default async function AdminDocumentsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const { page, pageSize, skip } = parsePagination(sp);
  const q = parseSearch(sp);

  const where = q
    ? {
        OR: [
          { title: { contains: q, mode: "insensitive" as const } },
          { category: { contains: q, mode: "insensitive" as const } },
          { academicYear: { contains: q, mode: "insensitive" as const } },
        ],
      }
    : {};

  let docs: { id: string; title: string; fileUrl: string; category: string; academicYear: string | null }[] = [];
  let count = 0;

  try {
    [docs, count] = await Promise.all([
      db.document.findMany({
        where,
        orderBy: [{ category: "asc" }, { order: "asc" }],
        select: { id: true, title: true, fileUrl: true, category: true, academicYear: true },
        skip,
        take: pageSize,
      }),
      db.document.count({ where }),
    ]);
  } catch {
    // DB not connected
  }

  const pages = totalPages(count, pageSize);
  const categories = [...new Set(docs.map((d) => d.category))];

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text">Documents</h1>
          <p className="mt-1 text-sm text-text-muted">{count} document(s)</p>
        </div>
        <Link
          href="/admin/documents/new"
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-light"
        >
          <Plus className="h-4 w-4" />
          Ajouter
        </Link>
      </div>

      <div className="mb-4 max-w-sm">
        <SearchInput placeholder="Rechercher un document..." />
      </div>

      {docs.length === 0 ? (
        <div className="rounded-xl border border-border bg-white p-8 text-center text-sm text-text-muted">
          {q ? "Aucun document trouvé pour cette recherche." : "Aucun document pour le moment."}
        </div>
      ) : (
        categories.map((cat) => (
          <div key={cat} className="mb-6">
            <h2 className="mb-3 text-sm font-semibold uppercase text-text-muted">{cat}</h2>
            <div className="overflow-hidden rounded-xl border border-border bg-white">
              <table className="w-full text-sm">
                <tbody className="divide-y divide-border">
                  {docs
                    .filter((d) => d.category === cat)
                    .map((doc) => (
                      <tr key={doc.id} className="hover:bg-background-alt/50">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <FileText className="h-4 w-4 text-text-muted" />
                            <span className="font-medium text-text">{doc.title}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-text-muted">{doc.academicYear || "—"}</td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <a
                              href={doc.fileUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="rounded px-2 py-1 text-xs font-medium text-primary hover:bg-primary/10"
                            >
                              <ExternalLink className="h-3 w-3" />
                            </a>
                            <Link
                              href={`/admin/documents/${doc.id}`}
                              className="rounded px-2 py-1 text-xs font-medium text-primary hover:bg-primary/10"
                            >
                              Modifier
                            </Link>
                            <DeleteDocButton id={doc.id} />
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        ))
      )}

      <Pagination totalPages={pages} currentPage={page} />
    </>
  );
}
