import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { GovernanceInstanceForm } from "../governance-instance-form";

export default async function EditGovernanceInstancePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await db.governanceInstance.findUnique({ where: { id } });
  if (!item) notFound();

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text">Modifier l&apos;instance</h1>
      </div>
      <GovernanceInstanceForm
        initialData={{
          id: item.id,
          slug: item.slug,
          title: item.title,
          subtitle: item.subtitle,
          iconName: item.iconName,
          accentColor: item.accentColor,
          descriptionHtml: item.descriptionHtml,
          compositionHtml: item.compositionHtml,
          membersJson: item.membersJson,
          meetingFrequency: item.meetingFrequency,
          presidence: item.presidence,
          responsibilitiesHtml: item.responsibilitiesHtml,
          order: item.order,
        }}
      />
    </>
  );
}
