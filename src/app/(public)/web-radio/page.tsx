import type { Metadata } from "next";
import Image from "next/image";
import { db } from "@/lib/db";
import { sanitizeSections } from "@/lib/sanitize";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeader } from "@/components/ui/section-header";
import { FadeInView, StaggerChildren, StaggerItem } from "@/components/ui/motion";
import { Radio } from "lucide-react";

export const metadata: Metadata = {
  title: "Webradio | Lycée Montaigne",
  description: "Les émissions de la webradio scolaire du Lycée Montaigne.",
  alternates: { canonical: "/web-radio" },
};

export default async function WebRadioPage() {
  let sections: { id: string; sectionKey: string; title: string | null; contentHtml: string | null; image: string | null; order: number }[] = [];

  try {
    const page = await db.page.findFirst({
      where: { slug: "web-radio", status: "PUBLISHED" },
      include: { sections: { orderBy: { order: "asc" } } },
    });
    sections = sanitizeSections(page?.sections ?? []);
  } catch {
    // DB unreachable
  }

  return (
    <>
      <PageHero title="Webradio" />

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex items-center justify-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10">
              <Radio className="h-5 w-5 text-red-500" />
            </div>
            <span className="text-xs font-semibold tracking-wide text-red-500 uppercase">On Air</span>
          </div>
          <SectionHeader
            title="Nos émissions"
            subtitle="Les productions de la webradio scolaire du Lycée Montaigne"
          />

          {sections.length > 0 ? (
            <StaggerChildren className="mt-12 space-y-12">
              {sections.map((emission) => (
                <StaggerItem key={emission.id}>
                  <div className="grid items-center gap-10 overflow-hidden rounded-[24px] border border-border bg-background shadow-[var(--shadow-soft)] lg:grid-cols-2">
                    {emission.image && (
                      <div className="relative aspect-[4/3] overflow-hidden lg:aspect-auto lg:h-full lg:min-h-[320px]">
                        <Image
                          src={emission.image}
                          alt={emission.title ?? "Émission"}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                      </div>
                    )}
                    <div className="p-8 md:p-10">
                      {emission.title && (
                        <h2 className="font-heading text-2xl font-bold text-primary">{emission.title}</h2>
                      )}
                      {emission.contentHtml && (
                        <div
                          className="mt-4 leading-relaxed text-text-muted [&>p]:mt-3 [&_a]:font-semibold [&_a]:text-primary [&_a]:underline [&_a]:decoration-primary/30 hover:[&_a]:decoration-primary"
                          dangerouslySetInnerHTML={{ __html: emission.contentHtml }}
                        />
                      )}
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerChildren>
          ) : (
            <p className="mt-12 text-center text-text-muted">
              Aucune émission pour le moment. Revenez bientôt !
            </p>
          )}
        </div>
      </section>
    </>
  );
}
