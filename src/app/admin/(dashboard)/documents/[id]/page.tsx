import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { DocumentForm } from "../document-form";

export default async function EditDocumentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const doc = await db.document.findUnique({ where: { id } });
  if (!doc) notFound();

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text">Modifier le document</h1>
      </div>
      <DocumentForm
        initialData={{
          id: doc.id,
          title: doc.title,
          fileUrl: doc.fileUrl,
          category: doc.category,
          academicYear: doc.academicYear,
        }}
      />
    </>
  );
}
