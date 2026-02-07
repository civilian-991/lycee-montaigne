import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { StaffForm } from "../staff-form";

export default async function EditStaffPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const member = await db.staffMember.findUnique({ where: { id } });
  if (!member) notFound();

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text">Modifier le membre</h1>
      </div>
      <StaffForm
        initialData={{
          id: member.id,
          name: member.name,
          title: member.title,
          photo: member.photo,
          messageHtml: member.messageHtml,
          section: member.section,
        }}
      />
    </>
  );
}
