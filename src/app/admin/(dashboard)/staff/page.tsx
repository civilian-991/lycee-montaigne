import { db } from "@/lib/db";
import Link from "next/link";
import { Plus } from "lucide-react";

export default async function AdminStaffPage() {
  let staff: { id: string; name: string; title: string; section: string; order: number }[] = [];
  try {
    staff = await db.staffMember.findMany({
      orderBy: [{ section: "asc" }, { order: "asc" }],
      select: { id: true, name: true, title: true, section: true, order: true },
    });
  } catch {
    // DB not connected
  }

  const sections = [...new Set(staff.map((s) => s.section))];

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text">Équipe</h1>
          <p className="mt-1 text-sm text-text-muted">{staff.length} membre(s)</p>
        </div>
        <Link
          href="/admin/staff/new"
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-light"
        >
          <Plus className="h-4 w-4" />
          Ajouter
        </Link>
      </div>

      {staff.length === 0 ? (
        <div className="rounded-xl border border-border bg-white p-8 text-center text-sm text-text-muted">
          Aucun membre d&apos;équipe pour le moment.
        </div>
      ) : (
        sections.map((section) => (
          <div key={section} className="mb-6">
            <h2 className="mb-3 text-sm font-semibold uppercase text-text-muted">{section}</h2>
            <div className="space-y-2">
              {staff
                .filter((s) => s.section === section)
                .map((member) => (
                  <div key={member.id} className="flex items-center justify-between rounded-xl border border-border bg-white p-4">
                    <div>
                      <p className="font-medium text-text">{member.name}</p>
                      <p className="text-sm text-text-muted">{member.title}</p>
                    </div>
                    <Link
                      href={`/admin/staff/${member.id}`}
                      className="rounded px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/10"
                    >
                      Modifier
                    </Link>
                  </div>
                ))}
            </div>
          </div>
        ))
      )}
    </>
  );
}
