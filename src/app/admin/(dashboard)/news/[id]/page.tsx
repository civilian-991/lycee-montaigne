import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { NewsForm } from "../news-form";

export default async function EditNewsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await db.newsItem.findUnique({ where: { id } });
  if (!item) notFound();

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text">Modifier l&apos;actualité</h1>
      </div>
      <NewsForm
        initialData={{
          id: item.id,
          title: item.title,
          image: item.image,
          link: item.link,
          category: item.category,
          status: item.status,
        }}
      />
    </>
  );
}
