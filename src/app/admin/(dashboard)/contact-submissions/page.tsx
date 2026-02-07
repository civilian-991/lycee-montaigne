import Link from "next/link";
import { db } from "@/lib/db";
import { parsePagination, totalPages } from "@/lib/admin-utils";
import { Pagination } from "@/components/admin/pagination";
import { MarkReadButton } from "./mark-read-button";
import { ContactDeleteButton } from "./delete-button";

const FILTERS = [
  { label: "Tous", value: "" },
  { label: "Non lus", value: "unread" },
  { label: "Lus", value: "read" },
] as const;

export default async function ContactSubmissionsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const { page, skip, take, pageSize } = parsePagination(sp);
  const filter = (sp.filter as string) || "";

  const where =
    filter === "unread"
      ? { read: false }
      : filter === "read"
        ? { read: true }
        : {};

  let submissions: { id: string; name: string; email: string; message: string; read: boolean; createdAt: Date }[] = [];
  let count = 0;
  let unreadCount = 0;

  try {
    [submissions, count, unreadCount] = await Promise.all([
      db.contactSubmission.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take,
      }),
      db.contactSubmission.count({ where }),
      db.contactSubmission.count({ where: { read: false } }),
    ]);
  } catch {
    // DB not connected
  }

  const pages = totalPages(count, pageSize);

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text">Messages de contact</h1>
        <p className="mt-1 text-sm text-text-muted">
          {count} message(s){unreadCount > 0 ? ` dont ${unreadCount} non lu(s)` : ""}
        </p>
      </div>

      {/* Filter tabs */}
      <div className="mb-4 flex gap-2">
        {FILTERS.map((f) => {
          const active = filter === f.value;
          const params = new URLSearchParams();
          if (f.value) params.set("filter", f.value);
          const href = `/admin/contact-submissions${params.toString() ? `?${params.toString()}` : ""}`;

          return (
            <Link
              key={f.value}
              href={href}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                active
                  ? "bg-primary text-white"
                  : "bg-white text-text-muted border border-border hover:bg-background-alt"
              }`}
            >
              {f.label}
            </Link>
          );
        })}
      </div>

      <div className="space-y-4">
        {submissions.length === 0 ? (
          <div className="rounded-xl border border-border bg-white p-8 text-center text-sm text-text-muted">
            Aucun message pour le moment.
          </div>
        ) : (
          submissions.map((sub) => (
            <div
              key={sub.id}
              className={`rounded-xl border bg-white p-5 ${sub.read ? "border-border" : "border-secondary/30 bg-secondary/5"}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-text">{sub.name}</p>
                    {!sub.read && (
                      <span className="rounded-full bg-secondary px-2 py-0.5 text-xs font-medium text-white">
                        Nouveau
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 text-sm text-text-muted">{sub.email}</p>
                  <p className="mt-3 text-sm text-text whitespace-pre-wrap">{sub.message}</p>
                  <p className="mt-3 text-xs text-text-muted">
                    {new Intl.DateTimeFormat("fr-FR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    }).format(sub.createdAt)}
                  </p>
                </div>
                <div className="flex shrink-0 gap-2">
                  {!sub.read && <MarkReadButton id={sub.id} />}
                  <a
                    href={`mailto:${sub.email}?subject=Re: Message de contact`}
                    className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-text-muted hover:bg-background-alt"
                  >
                    Répondre
                  </a>
                  <ContactDeleteButton id={sub.id} />
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <Pagination totalPages={pages} currentPage={page} />
    </>
  );
}
