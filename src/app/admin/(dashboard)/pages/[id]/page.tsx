import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PageForm } from "../page-form";
import { SectionEditor } from "../section-editor";

export default async function EditPagePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const page = await db.page.findUnique({
    where: { id },
    include: { sections: { orderBy: { order: "asc" } } },
  });
  if (!page) notFound();

  return (
    <>
      <div className="mb-6">
        <Link
          href="/admin/pages"
          className="mb-3 inline-flex items-center gap-1 text-sm text-text-muted hover:text-text"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Retour aux pages
        </Link>
        <h1 className="text-2xl font-bold text-text">Modifier la page</h1>
        <p className="mt-1 text-sm text-text-muted">
          Slug : <span className="font-mono">{page.slug}</span>
        </p>
      </div>

      <PageForm
        initialData={{
          id: page.id,
          slug: page.slug,
          title: page.title,
          metaDescription: page.metaDescription,
          ogImage: page.ogImage,
          status: page.status,
        }}
      />

      <SectionEditor
        pageId={page.id}
        initialSections={page.sections.map((s) => ({
          id: s.id,
          sectionKey: s.sectionKey,
          title: s.title,
          contentHtml: s.contentHtml,
          image: s.image,
          order: s.order,
        }))}
      />
    </>
  );
}
