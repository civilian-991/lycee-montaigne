"use client";

import Image from "next/image";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeader } from "@/components/ui/section-header";
import { FadeInView, StaggerChildren, StaggerItem } from "@/components/ui/motion";

const staffMessages = [
  {
    id: "chef",
    title: "Mot de la cheffe d'etablissement",
    name: "Mme Rachel Atallah",
    image: "/images/eta-s3/November2024/tN7I8Zm4bodDopvV14Hw.png",
    text: `Le Lycee Montaigne est un etablissement jeune et dynamique qui accueille pres de 1100 eleves de la maternelle a la terminale. Notre mission est de re-enchanter l'ecole, comme le dit Edgar Morin, en offrant a chaque eleve un parcours d'excellence adapte a ses talents et a ses aspirations. Nous croyons en l'educabilite de tous et en la force du regard positif pour accompagner nos eleves vers la reussite.`,
  },
  {
    id: "delegue",
    title: "Mot de la proviseure deleguee",
    name: "",
    image: "/images/mot-directrices/March2025/rLBOCUkYuoLx7jcdp3LE.jpeg",
    text: `Au Lycee Montaigne, nous mettons tout en oeuvre pour accompagner chaque eleve dans son parcours scolaire et personnel. Notre equipe pedagogique s'engage au quotidien pour offrir un enseignement de qualite dans un environnement bienveillant et stimulant.`,
  },
];

const comiteMembers = [
  { role: "President", name: "M. Karim Faddoul" },
  { role: "Vice-president", name: "M. Antoine Nader" },
  { role: "Secretaire", name: "Mme Maria Nahas" },
  { role: "Tresorier", name: "M. Amin Rouhana" },
];

export default function EtablissementPage() {
  return (
    <>
      <PageHero title="Etablissement" />

      {/* Mission et Vision */}
      <section id="mission" className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <FadeInView>
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <SectionHeader title="Mission et Vision" className="text-left" />
                <h3 className="mt-6 text-xl font-semibold text-secondary">Notre projet educatif</h3>
                <p className="mt-4 leading-relaxed text-text-muted">
                  Le Lycee Montaigne est une ecole pour toutes les intelligences et tous les talents.
                  Notre projet educatif repose sur le regard positif porte sur chaque personne,
                  le refus du determinisme et la confiance dans l&apos;educabilite cognitive, affective et physiologique de chacun.
                </p>
                <p className="mt-4 leading-relaxed text-text-muted">
                  Bienvenue a la communaute du LM, a ses amis et aux visiteurs de notre site web.
                  Nous vous invitons a decouvrir notre etablissement, nos valeurs et notre engagement
                  envers l&apos;excellence educative.
                </p>
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-[var(--shadow-warm)]">
                <Image
                  src="/images/eta-s2/November2024/mJKjRY5yzkeXW04S1XmZ.jpg"
                  alt="Eleves en classe au Lycee Montaigne"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </FadeInView>
        </div>
      </section>

      {/* Staff Messages */}
      {staffMessages.map((person, i) => (
        <section
          key={person.id}
          id={person.id}
          className={i % 2 === 0 ? "bg-background-alt py-16 md:py-24" : "py-16 md:py-24"}
        >
          <div className="mx-auto max-w-7xl px-4">
            <FadeInView>
              <div className={`grid items-center gap-12 lg:grid-cols-2 ${i % 2 !== 0 ? "lg:grid-flow-dense" : ""}`}>
                <div className={i % 2 !== 0 ? "lg:col-start-2" : ""}>
                  <div className="relative mx-auto aspect-[3/4] max-w-sm overflow-hidden rounded-2xl shadow-[var(--shadow-warm)]">
                    <Image
                      src={person.image}
                      alt={person.name || person.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 400px"
                    />
                  </div>
                </div>
                <div>
                  <SectionHeader title={person.title} className="text-left" />
                  {person.name && (
                    <p className="mt-2 font-medium text-secondary">{person.name}</p>
                  )}
                  <p className="mt-6 leading-relaxed text-text-muted">{person.text}</p>
                </div>
              </div>
            </FadeInView>
          </div>
        </section>
      ))}

      {/* Comite des parents */}
      <section id="comite" className="bg-background-alt py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <FadeInView>
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <SectionHeader title="Comite des parents" className="text-left" />
                <StaggerChildren className="mt-8 space-y-4">
                  {comiteMembers.map((member) => (
                    <StaggerItem key={member.name}>
                      <div className="flex items-center gap-4 rounded-2xl bg-background p-4 shadow-[var(--shadow-soft)]">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                          {member.name.split(" ").pop()?.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-text">{member.name}</p>
                          <p className="text-sm text-text-muted">{member.role}</p>
                        </div>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerChildren>
                <p className="mt-6 text-sm text-text-muted">
                  Contact : <a href="mailto:comitedesparents@lycee-montaigne.edu.lb" className="text-secondary hover:underline">comitedesparents@lycee-montaigne.edu.lb</a>
                </p>
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-[var(--shadow-warm)]">
                <Image
                  src="/images/comite-parents/December2025/ex9aVmzf9X4A0EDTgZEz.jpg"
                  alt="Comite des parents du Lycee Montaigne"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </FadeInView>
        </div>
      </section>

      {/* Reglement + Instances */}
      <section id="reglement" className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader title="Reglement Interieur & Instances" />
          <StaggerChildren className="mt-12 grid gap-8 md:grid-cols-2">
            <StaggerItem>
              <div className="rounded-[20px] border border-border bg-background p-8 shadow-[var(--shadow-soft)]">
                <h3 className="text-xl font-semibold">Reglement Interieur</h3>
                <p className="mt-4 text-text-muted">
                  Le reglement interieur du Lycee Montaigne definit les droits et devoirs de chaque membre
                  de la communaute scolaire. Il garantit un cadre de vie harmonieux et propice a l&apos;apprentissage.
                </p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div id="instances" className="rounded-[20px] border border-border bg-background p-8 shadow-[var(--shadow-soft)]">
                <h3 className="text-xl font-semibold">Instances</h3>
                <p className="mt-4 text-text-muted">
                  Les instances de l&apos;etablissement (conseil d&apos;etablissement, conseil pedagogique,
                  conseil de discipline) assurent la bonne gouvernance et le fonctionnement democratique du lycee.
                </p>
              </div>
            </StaggerItem>
          </StaggerChildren>
        </div>
      </section>
    </>
  );
}
