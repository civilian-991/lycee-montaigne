"use client";

import Image from "next/image";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeader } from "@/components/ui/section-header";
import { FadeInView } from "@/components/ui/motion";
import { FileText, Vote } from "lucide-react";
import { localImage } from "@/lib/utils";

type PageSectionRow = {
  id: string;
  pageId: string;
  sectionKey: string;
  title: string | null;
  contentHtml: string | null;
  image: string | null;
  order: number;
};

export function CvcContent({ sections }: { sections: PageSectionRow[] }) {
  const introSection = sections.find((s) => s.sectionKey === "intro");

  return (
    <>
      <PageHero title="Conseil de Vie Collégienne" />

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <FadeInView>
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                    <Vote className="h-5 w-5 text-primary" />
                  </div>
                  <SectionHeader
                    title={introSection?.title || "C'est quoi le CVC ?"}
                    className="mb-0 text-left"
                  />
                </div>
                {introSection?.contentHtml ? (
                  <div
                    className="mt-6 leading-relaxed text-text-muted [&>p]:mt-4"
                    dangerouslySetInnerHTML={{ __html: introSection.contentHtml }}
                  />
                ) : (
                  <>
                    <p className="mt-6 leading-relaxed text-text-muted">
                      Le Conseil de Vie Collégienne (CVC) est une instance de dialogue et
                      d&apos;échange entre élèves et membres de la communauté éducative. Il
                      permet aux collégiens de devenir acteurs de la vie de leur établissement.
                    </p>
                    <p className="mt-4 leading-relaxed text-text-muted">
                      Les élèves élus au CVC formulent des propositions sur l&apos;organisation
                      de la scolarité, le bien-être des élèves, et les projets éducatifs. C&apos;est
                      un espace d&apos;apprentissage de la citoyenneté et de la démocratie.
                    </p>
                  </>
                )}
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-[var(--shadow-warm)]">
                <Image
                  src={localImage(introSection?.image) || "/images/climat-categories/April2025/mNHwl4NOWUZkZgPfyTNi.jpeg"}
                  alt="Conseil de Vie Collégienne"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </FadeInView>
        </div>
      </section>

      {/* Documents */}
      <section className="bg-background-alt py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <FadeInView>
            <SectionHeader title="Documents" />
            <div className="mx-auto mt-8 max-w-md">
              <a
                href="https://lycee-montaigne.edu.lb/storage/climat-activities/March2025/As2E38KMEIK420hEq9V7.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-2xl border border-border bg-background p-5 shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-elevated)]"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-500/10">
                  <FileText className="h-6 w-6 text-red-500" />
                </div>
                <div>
                  <p className="font-semibold text-primary">C&apos;est quoi le CVC ?</p>
                  <p className="mt-0.5 text-sm text-text-muted">Télécharger le document PDF</p>
                </div>
              </a>
            </div>
          </FadeInView>
        </div>
      </section>
    </>
  );
}
