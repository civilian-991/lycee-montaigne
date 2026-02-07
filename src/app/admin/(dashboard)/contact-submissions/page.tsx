import { db } from "@/lib/db";
import { MarkReadButton } from "./mark-read-button";

export default async function ContactSubmissionsPage() {
  let submissions: { id: string; name: string; email: string; message: string; read: boolean; createdAt: Date }[] = [];
  try {
    submissions = await db.contactSubmission.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch {
    // DB not connected
  }

  const unread = submissions.filter((s) => !s.read).length;

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text">Messages de contact</h1>
        <p className="mt-1 text-sm text-text-muted">
          {submissions.length} message(s){unread > 0 ? ` dont ${unread} non lu(s)` : ""}
        </p>
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
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}
