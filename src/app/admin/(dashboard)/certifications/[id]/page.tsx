import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { CertificationForm } from "../certification-form";

export default async function EditCertificationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const certification = await db.certification.findUnique({ where: { id } });
  if (!certification) notFound();

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text">Modifier la certification</h1>
      </div>
      <CertificationForm
        initialData={{
          id: certification.id,
          name: certification.name,
          image: certification.image,
          description: certification.description,
          order: certification.order,
        }}
      />
    </>
  );
}
