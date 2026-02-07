import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { AnnouncementForm } from "../announcement-form";

export default async function EditAnnouncementPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = await db.announcement.findUnique({ where: { id } });
  if (!item) notFound();

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text">Modifier l&apos;annonce</h1>
      </div>
      <AnnouncementForm
        initialData={{
          id: item.id,
          title: item.title,
          contentHtml: item.contentHtml,
          active: item.active,
          startDate: item.startDate
            ? item.startDate.toISOString().split("T")[0]
            : null,
          endDate: item.endDate
            ? item.endDate.toISOString().split("T")[0]
            : null,
        }}
      />
    </>
  );
}
