import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { EventForm } from "../event-form";
import { PhotoManager } from "../photo-manager";

export default async function EditAlumniEventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = await db.alumniEvent.findUnique({
    where: { id },
    include: { photos: { orderBy: { order: "asc" } } },
  });

  if (!event) notFound();

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text">Modifier l&apos;événement</h1>
      </div>
      <EventForm
        initialData={{
          id: event.id,
          title: event.title,
          date: event.date.toISOString().split("T")[0],
          descriptionHtml: event.descriptionHtml,
        }}
      />

      <div className="mt-10">
        <PhotoManager
          eventId={event.id}
          initialPhotos={event.photos.map((p) => ({
            id: p.id,
            imageUrl: p.imageUrl,
            altText: p.altText,
            order: p.order,
          }))}
        />
      </div>
    </>
  );
}
