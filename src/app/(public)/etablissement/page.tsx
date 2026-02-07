import Image from "next/image";
import type { Metadata } from "next";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeader } from "@/components/ui/section-header";

export const metadata: Metadata = {
  title: "Établissement",
  description: "Découvrez la mission, la vision et l'équipe de direction du Lycée Montaigne de Beit Chabab.",
};

const staffMessages = [
  {
    id: "chef",
    title: "Mot de la cheffe d'établissement",
    name: "Mme Rachel Atallah",
    image: "https://lycee-montaigne.edu.lb//storage/eta-s3/November2024/tN7I8Zm4bodDopvV14Hw.png",
    text: `Le Lycée Montaigne est un établissement jeune et dynamique qui accueille près de 1100 élèves de la maternelle à la terminale. Notre mission est de ré-enchanter l'école, comme le dit Edgar Morin, en offrant à chaque élève un parcours d'excellence adapté à ses talents et à ses aspirations. Nous croyons en l'éducabilité de tous et en la force du regard positif pour accompagner nos élèves vers la réussite.`,
  },
  {
    id: "delegue",
    title: "Mot de la proviseure déléguée",
    name: "",
    image: "https://lycee-montaigne.edu.lb//storage/mot-directrices/March2025/rLBOCUkYuoLx7jcdp3LE.jpeg",
    text: `Au Lycée Montaigne, nous mettons tout en œuvre pour accompagner chaque élève dans son parcours scolaire et personnel. Notre équipe pédagogique s'engage au quotidien pour offrir un enseignement de qualité dans un environnement bienveillant et stimulant.`,
  },
];

const comiteMembers = [
  { role: "Président", name: "M. Karim Faddoul" },
  { role: "Vice-président", name: "M. Antoine Nader" },
  { role: "Secrétaire", name: "Mme Maria Nahas" },
  { role: "Trésorier", name: "M. Amin Rouhana" },
];

export default function EtablissementPage() {
  return (
    <>
      <PageHero title="Établissement" />

      {/* Mission et Vision */}
      <section id="mission" className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <SectionHeader title="Mission et Vision" className="text-left" />
              <h3 className="mt-6 text-xl font-semibold text-secondary">Notre projet éducatif</h3>
              <p className="mt-4 leading-relaxed text-text-muted">
                Le Lycée Montaigne est une école pour toutes les intelligences et tous les talents.
                Notre projet éducatif repose sur le regard positif porté sur chaque personne,
                le refus du déterminisme et la confiance dans l&apos;éducabilité cognitive, affective et physiologique de chacun.
              </p>
              <p className="mt-4 leading-relaxed text-text-muted">
                Bienvenue à la communauté du LM, à ses amis et aux visiteurs de notre site web.
                Nous vous invitons à découvrir notre établissement, nos valeurs et notre engagement
                envers l&apos;excellence éducative.
              </p>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src="https://lycee-montaigne.edu.lb//storage/eta-s2/November2024/mJKjRY5yzkeXW04S1XmZ.jpg"
                alt="Élèves en classe au Lycée Montaigne"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
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
            <div className={`grid items-center gap-12 lg:grid-cols-2 ${i % 2 !== 0 ? "lg:grid-flow-dense" : ""}`}>
              <div className={i % 2 !== 0 ? "lg:col-start-2" : ""}>
                <div className="relative mx-auto aspect-[3/4] max-w-sm overflow-hidden rounded-2xl">
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
          </div>
        </section>
      ))}

      {/* Comité des parents */}
      <section id="comite" className="bg-background-alt py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <SectionHeader title="Comité des parents" className="text-left" />
              <div className="mt-8 space-y-4">
                {comiteMembers.map((member) => (
                  <div key={member.name} className="flex items-center gap-4 rounded-lg bg-white p-4 shadow-sm">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                      {member.name.split(" ").pop()?.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-text">{member.name}</p>
                      <p className="text-sm text-text-muted">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-sm text-text-muted">
                Contact : <a href="mailto:comitedesparents@lycee-montaigne.edu.lb" className="text-secondary hover:underline">comitedesparents@lycee-montaigne.edu.lb</a>
              </p>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src="https://lycee-montaigne.edu.lb//storage/comite-parents/December2025/ex9aVmzf9X4A0EDTgZEz.jpg"
                alt="Comité des parents du Lycée Montaigne"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Règlement + Instances */}
      <section id="reglement" className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader title="Règlement Intérieur & Instances" />
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <div className="rounded-xl border border-border bg-white p-8">
              <h3 className="text-xl font-semibold">Règlement Intérieur</h3>
              <p className="mt-4 text-text-muted">
                Le règlement intérieur du Lycée Montaigne définit les droits et devoirs de chaque membre
                de la communauté scolaire. Il garantit un cadre de vie harmonieux et propice à l&apos;apprentissage.
              </p>
            </div>
            <div id="instances" className="rounded-xl border border-border bg-white p-8">
              <h3 className="text-xl font-semibold">Instances</h3>
              <p className="mt-4 text-text-muted">
                Les instances de l&apos;établissement (conseil d&apos;établissement, conseil pédagogique,
                conseil de discipline) assurent la bonne gouvernance et le fonctionnement démocratique du lycée.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
