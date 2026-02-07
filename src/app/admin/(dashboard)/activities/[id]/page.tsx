import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { ActivityForm } from "../activity-form";

export default async function EditActivityPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await db.activityItem.findUnique({ where: { id } });
  if (!item) notFound();

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text">Modifier l&apos;activité</h1>
      </div>
      <ActivityForm
        initialData={{
          id: item.id,
          title: item.title,
          description: item.description,
          image: item.image,
          category: item.category,
          order: item.order,
        }}
      />
    </>
  );
}
