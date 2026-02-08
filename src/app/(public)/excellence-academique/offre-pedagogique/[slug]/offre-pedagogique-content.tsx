"use client";

import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeader } from "@/components/ui/section-header";
import {
  FadeInView,
  StaggerChildren,
  StaggerItem,
} from "@/components/ui/motion";
import { WaveDivider } from "@/components/ui/wave-divider";
import {
  Baby,
  Pencil,
  School,
  GraduationCap,
  ArrowLeft,
  CheckCircle2,
  BookOpen,
  Globe,
  Music,
  Calculator,
  Compass,
  Users,
  Award,
  FileText,
  Lightbulb,
  FlaskConical,
  type LucideIcon,
} from "lucide-react";

/* ================================================================
   DATA — Each slug maps to a full program definition
   ================================================================ */

interface LearningDomain {
  title: string;
  description: string;
  icon: LucideIcon;
}

interface Cycle {
  name: string;
  levels: string;
  description: string;
}

interface Track {
  name: string;
  description: string;
  icon: LucideIcon;
  color: string;
}

interface DnbExam {
  subject: string;
  description: string;
  icon: LucideIcon;
}

interface ProgramData {
  slug: string;
  title: string;
  badge: string;
  levels: string;
  tagline: string;
  overview: string[];
  philosophy?: string;
  heroImage: string;
  secondaryImage: string;
  icon: LucideIcon;
  gradient: string;
  domains?: LearningDomain[];
  cycles?: Cycle[];
  enrichment?: string[];
  keyFeatures?: string[];
  dnbExams?: DnbExam[];
  dnbDescription?: string;
  tracks?: Track[];
  tracksIntro?: string;
  gallery?: string[];
  additionalSections?: {
    title: string;
    description: string;
    items: string[];
  }[];
}

const programs: Record<string, ProgramData> = {
  maternelle: {
    slug: "maternelle",
    title: "Ecole Maternelle",
    badge: "3\u20135 ans",
    levels: "PS \u2013 MS \u2013 GS",
    tagline: "Le chemin de l\u2019avenir commence ici.",
    overview: [
      "L\u2019ecole maternelle constitue un cycle unique d\u2019enseignement fondamental pour les enfants de 3 a 5 ans. Ce premier pas dans le parcours scolaire est essentiel pour garantir la reussite de tous les eleves.",
      "Au Lycee Montaigne, la maternelle accueille les enfants dans un environnement bienveillant et stimulant ou ils developpent progressivement leur autonomie et acquierent les competences fondamentales qui les accompagneront tout au long de leur scolarite.",
    ],
    philosophy:
      "L\u2019ecole maternelle constitue la premiere etape fondamentale pour garantir la reussite des eleves. Elle integre des methodes d\u2019apprentissage diversifiees \u2014 resolution de problemes, exercices pratiques, memorisation \u2014 avec le jeu comme element central de la pedagogie. Chaque enfant apprend a son rythme dans un cadre securisant et adapte.",
    heroImage:
      "/images/offre-pedagogiques/September2025/RYKcgYOvU9hKhJWzsKpe.jpeg",
    secondaryImage:
      "/images/offre-pedagogiques/September2025/EKkMhqWAkoI1bJlFPWHz.jpeg",
    icon: Baby,
    gradient: "from-secondary to-secondary-dark",
    gallery: [
      "/images/offre-pedagogiques/September2025/oIEoavvupzlerr5CcMSB.jpeg",
      "/images/offre-pedagogiques/September2025/S0xrz6K0KeHsdpg8Lf5d.jpeg",
      "/images/offre-pedagogiques/September2025/DrXjEoJLUP0UhTAzSdfI.jpeg",
      "/images/offre-pedagogiques/September2025/xGr2TekFXQInfCueF24P.jpeg",
      "/images/offre-pedagogiques/September2025/1L4Qqu5svW8SNhI93fis.jpeg",
    ],
    domains: [
      {
        title: "Mobiliser le langage dans toutes ses dimensions",
        description:
          "Developper l\u2019expression orale et ecrite, decouvrir la fonction de l\u2019ecrit, enrichir le vocabulaire et preparer l\u2019apprentissage de la lecture.",
        icon: BookOpen,
      },
      {
        title:
          "Agir, s\u2019exprimer, comprendre a travers l\u2019activite physique",
        description:
          "Explorer les possibilites corporelles, cooperer, s\u2019engager dans des activites motrices et developper la coordination.",
        icon: Users,
      },
      {
        title:
          "Agir, s\u2019exprimer, comprendre a travers les activites artistiques",
        description:
          "Developper la sensibilite, l\u2019imagination et la creativite a travers les arts visuels, la musique et les spectacles vivants.",
        icon: Music,
      },
      {
        title: "Acquerir les premiers outils mathematiques",
        description:
          "Decouvrir les nombres, les formes, les grandeurs et les reperes spatiaux a travers la manipulation et le jeu.",
        icon: Calculator,
      },
      {
        title: "Explorer le monde",
        description:
          "Decouvrir le vivant, la matiere, les objets, le temps et l\u2019espace pour construire les premiers reperes sur le monde environnant.",
        icon: Compass,
      },
    ],
  },

  elementaire: {
    slug: "elementaire",
    title: "Ecole Elementaire",
    badge: "6\u201310 ans",
    levels: "CP \u2013 CE1 \u2013 CE2 \u2013 CM1 \u2013 CM2",
    tagline: "Construire les fondations de la reussite.",
    overview: [
      "L\u2019ecole elementaire du Lycee Montaigne offre un parcours structure de cinq annees ou les eleves acquierent les fondamentaux en lecture, ecriture et mathematiques. Ces apprentissages constituent le socle de leur reussite academique future.",
      "A travers deux cycles complementaires, les eleves developpent leur esprit critique, leur curiosite intellectuelle et leur conscience de l\u2019environnement, tout en renforcant progressivement leur autonomie et leurs competences sociales.",
    ],
    heroImage:
      "/images/offre-pedagogiques/November2024/Y7T7wBDtRqLzZ0v4BIFD.jpg",
    secondaryImage:
      "/images/offre-pedagogiques/March2025/FMajMIbeBmTj2pZsVXg2.png",
    icon: Pencil,
    gradient: "from-secondary to-secondary-dark",
    cycles: [
      {
        name: "Cycle 2",
        levels: "CP \u2013 CE1 \u2013 CE2",
        description:
          "Le cycle des apprentissages fondamentaux met l\u2019accent sur la curiosite et l\u2019interaction avec l\u2019environnement. Les eleves apprennent a lire, ecrire et compter tout en developpant leur creativite et leur gout pour la decouverte.",
      },
      {
        name: "Cycle 3",
        levels: "CM1 \u2013 CM2",
        description:
          "Le cycle de consolidation fait le lien entre l\u2019ecole primaire et le college. Il renforce les fondamentaux en francais, mathematiques et anglais, et prepare les eleves a une plus grande autonomie dans les apprentissages.",
      },
    ],
    enrichment: [
      "Projets pedagogiques interdisciplinaires",
      "Activites artistiques et culturelles",
      "Initiation sportive et education physique",
      "Decouvertes scientifiques et experimentations",
      "Sorties de terrain et visites culturelles",
      "Conferences et rencontres educatives",
    ],
    keyFeatures: [
      "Integration des sciences humaines et sociales",
      "Developpement de l\u2019esprit critique des la primaire",
      "Acquisition de bonnes habitudes de travail",
      "Apprentissage de l\u2019argumentation et du debat",
      "Construction progressive de l\u2019autonomie",
      "Maitrise des outils numeriques de base",
    ],
  },

  college: {
    slug: "college",
    title: "College",
    badge: "11\u201314 ans",
    levels: "6eme \u2013 5eme \u2013 4eme \u2013 3eme",
    tagline: "Developper l\u2019autonomie et la pensee critique.",
    overview: [
      "Le college du Lycee Montaigne accompagne les eleves de la 6eme a la 3eme dans le systeme secondaire francais. C\u2019est une periode charniere ou les jeunes developpent leur autonomie intellectuelle avec des enseignants specialises par matiere.",
      "A travers des competitions academiques, des voyages educatifs, des projets collaboratifs et le developpement de la pensee critique, nos eleves acquierent les competences necessaires pour reussir au lycee et au-dela.",
    ],
    heroImage:
      "/images/offre-pedagogiques/November2024/0EbCvhFl2VOnVhsAYtA3.jpeg",
    secondaryImage:
      "/images/offre-pedagogiques/March2025/V5TaePZh3OK30gBE0zGt.png",
    icon: School,
    gradient: "from-primary to-primary-dark",
    keyFeatures: [
      "Enseignants specialises par discipline",
      "Competitions academiques et olympiades",
      "Voyages educatifs et echanges culturels",
      "Projets collaboratifs interdisciplinaires",
      "Developpement de la pensee critique",
      "Preparation au Diplome National du Brevet",
    ],
    dnbDescription:
      "Le Diplome National du Brevet (DNB) est le premier examen national que passent les eleves en fin de 3eme. Il evalue la maitrise du socle commun de connaissances, de competences et de culture, et comprend des epreuves ecrites et une epreuve orale.",
    dnbExams: [
      {
        subject: "Francais",
        description:
          "Epreuve ecrite evaluant la comprehension, l\u2019analyse de texte et la maitrise de la langue ecrite.",
        icon: BookOpen,
      },
      {
        subject: "Mathematiques",
        description:
          "Epreuve ecrite testant le raisonnement logique, la resolution de problemes et les competences calculatoires.",
        icon: Calculator,
      },
      {
        subject: "Histoire-Geographie et EMC",
        description:
          "Epreuve ecrite portant sur les reperes historiques, geographiques et l\u2019enseignement moral et civique.",
        icon: Globe,
      },
      {
        subject: "Sciences",
        description:
          "Epreuve ecrite couvrant deux matieres parmi les sciences de la vie et de la Terre, la physique-chimie et la technologie.",
        icon: FlaskConical,
      },
      {
        subject: "Epreuve orale",
        description:
          "Soutenance d\u2019un projet mene dans le cadre des EPI ou des parcours educatifs, evaluant l\u2019expression et l\u2019argumentation.",
        icon: Users,
      },
    ],
  },

  lycee: {
    slug: "lycee",
    title: "Lycee",
    badge: "15\u201317 ans",
    levels: "2nde \u2013 1ere \u2013 Terminale",
    tagline: "Vers l\u2019excellence et l\u2019enseignement superieur.",
    overview: [
      "Le lycee du Lycee Montaigne offre un parcours de trois annees \u2014 Seconde, Premiere et Terminale \u2014 qui prepare les eleves au baccalaureat et a la poursuite d\u2019etudes superieures. C\u2019est le moment ou chaque eleve affine ses choix d\u2019orientation.",
      "Les eleves explorent d\u2019abord un large eventail de matieres en Seconde avant de se specialiser progressivement. Des programmes de certifications internationales et d\u2019exploration professionnelle completent la formation academique pour preparer chaque eleve a son avenir.",
    ],
    heroImage:
      "/images/offre-pedagogiques/August2025/KQgmgLL8bIPNctv63kfN.png",
    secondaryImage:
      "/images/offre-pedagogiques/March2025/yBsX8u4ZVOVu4Ki1b9bZ.png",
    icon: GraduationCap,
    gradient: "from-primary to-primary-dark",
    tracksIntro:
      "A partir de la classe de Premiere, les eleves choisissent une filiere de specialisation correspondant a leurs aptitudes et a leur projet d\u2019orientation. Chaque filiere offre un parcours riche et exigeant.",
    tracks: [
      {
        name: "Filiere Scientifique",
        description:
          "Mathematiques, physique-chimie, sciences de la vie et de la Terre, numerique et sciences informatiques. Un parcours rigoureux pour les eleves passionnes par les sciences et la recherche.",
        icon: FlaskConical,
        color: "from-primary to-primary-dark",
      },
      {
        name: "Filiere Litteraire",
        description:
          "Humanites, litterature, philosophie, langues, histoire-geographie, geopolitique et sciences politiques. Un parcours pour les esprits curieux et les futurs acteurs de la culture.",
        icon: BookOpen,
        color: "from-secondary to-secondary-dark",
      },
      {
        name: "Filiere Economique et Sociale",
        description:
          "Sciences economiques et sociales, mathematiques appliquees, histoire-geographie, geopolitique. Un parcours prepare aux enjeux du monde contemporain et aux metiers de demain.",
        icon: Globe,
        color: "from-[#8B6914] to-[#C4961A]",
      },
    ],
    keyFeatures: [
      "Preparation au Baccalaureat francais et libanais",
      "Bac Francais International (BFI)",
      "Certifications internationales (Cambridge, IELTS, DELE, SAT)",
      "Programmes d\u2019exploration professionnelle",
      "Accompagnement personnalise a l\u2019orientation",
      "Transition vers l\u2019enseignement superieur ou l\u2019emploi",
    ],
    additionalSections: [
      {
        title: "Preparation aux examens",
        description:
          "Nos eleves sont prepares aux examens nationaux et internationaux avec un accompagnement rigoureux.",
        items: [
          "Baccalaureat francais general",
          "Baccalaureat libanais",
          "Bac Francais International (BFI)",
          "Epreuves anticipees de Premiere",
          "Grand oral de Terminale",
        ],
      },
    ],
  },
};

/* ================================================================
   CLIENT COMPONENT
   ================================================================ */

export function OffrePedagogiqueContent({ slug }: { slug: string }) {
  const program = programs[slug];

  // Safety fallback — the server page already calls notFound() for bad slugs
  if (!program) return null;

  const Icon = program.icon;

  return (
    <>
      {/* ─── Hero ──────────────────────────────────────────────── */}
      <PageHero title={program.title} image={program.heroImage} />

      {/* ─── Overview ──────────────────────────────────────────── */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <FadeInView>
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                {/* Icon + badge row */}
                <div className="mb-6 flex items-center gap-4">
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${program.gradient} text-white shadow-[var(--shadow-soft)]`}
                  >
                    <Icon className="h-7 w-7" strokeWidth={1.5} />
                  </div>
                  <div>
                    <span className="rounded-full bg-secondary/10 px-3 py-1 text-xs font-semibold text-secondary">
                      {program.badge}
                    </span>
                    <p className="mt-1 text-sm text-text-muted">
                      {program.levels}
                    </p>
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-primary md:text-3xl">
                  {program.tagline}
                </h2>

                {program.overview.map((paragraph, i) => (
                  <p key={i} className="mt-4 leading-relaxed text-text-muted">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="relative aspect-[4/3] overflow-hidden rounded-[20px] shadow-[var(--shadow-warm)]">
                <Image
                  src={program.heroImage}
                  alt={program.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </FadeInView>
        </div>
      </section>

      {/* ─── Philosophy (Maternelle) ───────────────────────────── */}
      {program.philosophy && (
        <section className="relative overflow-hidden bg-background-alt">
          <WaveDivider
            fill="var(--color-background)"
            flip
            className="relative z-10"
          />
          <div className="py-16 md:py-24">
            <div className="mx-auto max-w-7xl px-4">
              <FadeInView>
                <div className="mx-auto max-w-3xl text-center">
                  <SectionHeader title="Notre philosophie pedagogique" />
                  <div className="mt-8 rounded-[20px] border border-border bg-background p-8 shadow-[var(--shadow-soft)] md:p-10">
                    <Lightbulb className="mx-auto h-10 w-10 text-secondary" />
                    <p className="mt-6 text-lg leading-relaxed text-text-muted">
                      {program.philosophy}
                    </p>
                  </div>
                </div>
              </FadeInView>
            </div>
          </div>
          <WaveDivider fill="var(--color-background)" />
        </section>
      )}

      {/* ─── Five Learning Domains (Maternelle) ────────────────── */}
      {program.domains && (
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4">
            <SectionHeader
              title="Les cinq domaines d&apos;apprentissage"
              subtitle="Un programme riche et equilibre pour le developpement global de l&apos;enfant"
            />
            <StaggerChildren className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {program.domains.map((domain) => {
                const DomainIcon = domain.icon;
                return (
                  <StaggerItem key={domain.title}>
                    <div className="group flex h-full flex-col rounded-[20px] border border-border bg-background p-6 shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-warm)]">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-secondary to-secondary-dark text-white shadow-[var(--shadow-soft)]">
                        <DomainIcon className="h-5 w-5" />
                      </div>
                      <h3 className="mt-4 text-base font-bold text-text">
                        {domain.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-text-muted">
                        {domain.description}
                      </p>
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerChildren>
          </div>
        </section>
      )}

      {/* ─── Photo Gallery (Maternelle) ────────────────────────── */}
      {program.gallery && (
        <section className="relative overflow-hidden bg-background-alt">
          <WaveDivider
            fill="var(--color-background)"
            flip
            className="relative z-10"
          />
          <div className="py-16 md:py-24">
            <div className="mx-auto max-w-7xl px-4">
              <SectionHeader
                title="La vie en maternelle"
                subtitle="Nos eleves en action"
              />
              <StaggerChildren className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
                {program.gallery.map((src, i) => (
                  <StaggerItem key={src}>
                    <div className="group relative aspect-[4/3] overflow-hidden rounded-[20px] shadow-[var(--shadow-soft)] transition-transform duration-300 hover:scale-[1.03]">
                      <Image
                        src={src}
                        alt={`La vie en maternelle ${i + 1}`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 50vw, 33vw"
                      />
                    </div>
                  </StaggerItem>
                ))}
              </StaggerChildren>
            </div>
          </div>
          <WaveDivider fill="var(--color-background)" />
        </section>
      )}

      {/* ─── Cycles (Elementaire) ──────────────────────────────── */}
      {program.cycles && (
        <section className="relative overflow-hidden bg-background-alt">
          <WaveDivider
            fill="var(--color-background)"
            flip
            className="relative z-10"
          />
          <div className="py-16 md:py-24">
            <div className="mx-auto max-w-7xl px-4">
              <SectionHeader
                title="Les cycles d&apos;apprentissage"
                subtitle="Une progression structuree et adaptee a chaque etape du developpement"
              />
              <StaggerChildren className="mt-12 grid gap-8 md:grid-cols-2">
                {program.cycles.map((cycle, i) => (
                  <StaggerItem key={cycle.name}>
                    <div className="group overflow-hidden rounded-[20px] border border-border bg-background shadow-[var(--shadow-soft)] transition-all duration-300 hover:shadow-[var(--shadow-warm)]">
                      <div
                        className={`bg-gradient-to-r ${i === 0 ? "from-secondary to-secondary-dark" : "from-primary to-primary-dark"} px-6 py-4`}
                      >
                        <h3 className="text-lg font-bold text-white">
                          {cycle.name}
                        </h3>
                        <p className="text-sm text-white/80">{cycle.levels}</p>
                      </div>
                      <div className="p-6">
                        <p className="leading-relaxed text-text-muted">
                          {cycle.description}
                        </p>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerChildren>
            </div>
          </div>
          <WaveDivider fill="var(--color-background)" />
        </section>
      )}

      {/* ─── Enrichment (Elementaire) ──────────────────────────── */}
      {program.enrichment && (
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4">
            <FadeInView>
              <div className="grid items-center gap-12 lg:grid-cols-2">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[20px] shadow-[var(--shadow-warm)]">
                  <Image
                    src={program.secondaryImage}
                    alt="Activites enrichissantes"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div>
                  <SectionHeader
                    title="Enrichissement pedagogique"
                    className="text-left"
                  />
                  <p className="mt-4 text-text-muted">
                    Au-dela du programme academique, nos eleves beneficient
                    d&apos;activites enrichissantes qui stimulent leur curiosite
                    et developpent leurs talents.
                  </p>
                  <ul className="mt-6 space-y-3">
                    {program.enrichment.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />
                        <span className="text-text-muted">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </FadeInView>
          </div>
        </section>
      )}

      {/* ─── Key Features ──────────────────────────────────────── */}
      {program.keyFeatures && (
        <section className="relative overflow-hidden bg-background-alt">
          <WaveDivider
            fill="var(--color-background)"
            flip
            className="relative z-10"
          />
          <div className="py-16 md:py-24">
            <div className="mx-auto max-w-7xl px-4">
              <SectionHeader
                title={
                  program.slug === "lycee"
                    ? "Parcours et certifications"
                    : program.slug === "college"
                      ? "Points forts du college"
                      : "Competences cles"
                }
                subtitle={
                  program.slug === "lycee"
                    ? "Un accompagnement complet vers la reussite au baccalaureat et au-dela"
                    : program.slug === "college"
                      ? "Un environnement stimulant pour developper l&apos;autonomie et l&apos;excellence"
                      : "Des competences transversales pour reussir"
                }
              />
              <StaggerChildren className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {program.keyFeatures.map((feature) => (
                  <StaggerItem key={feature}>
                    <div className="flex h-full items-start gap-4 rounded-[20px] border border-border bg-background p-5 shadow-[var(--shadow-soft)] transition-all duration-300 hover:shadow-[var(--shadow-warm)]">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/8">
                        <CheckCircle2 className="h-5 w-5 text-primary" />
                      </div>
                      <p className="text-sm font-medium text-text">{feature}</p>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerChildren>
            </div>
          </div>
          <WaveDivider fill="var(--color-background)" />
        </section>
      )}

      {/* ─── DNB Section (College) ─────────────────────────────── */}
      {program.dnbExams && (
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4">
            <SectionHeader
              title="Diplome National du Brevet"
              subtitle="Le premier examen national, une etape cle du parcours scolaire"
            />

            <FadeInView>
              <div className="mx-auto mt-8 max-w-3xl">
                <div className="rounded-[20px] border border-border bg-gradient-to-br from-primary/5 to-secondary/5 p-6 shadow-[var(--shadow-soft)] md:p-8">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary-dark text-white shadow-[var(--shadow-soft)]">
                      <Award className="h-6 w-6" />
                    </div>
                    <p className="leading-relaxed text-text-muted">
                      {program.dnbDescription}
                    </p>
                  </div>
                </div>
              </div>
            </FadeInView>

            <StaggerChildren className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {program.dnbExams.map((exam) => {
                const ExamIcon = exam.icon;
                return (
                  <StaggerItem key={exam.subject}>
                    <div className="group flex h-full flex-col rounded-[20px] border border-border bg-background p-6 shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-warm)]">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary-light text-white shadow-[var(--shadow-soft)]">
                        <ExamIcon className="h-5 w-5" />
                      </div>
                      <h3 className="mt-4 text-base font-bold text-text">
                        {exam.subject}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-text-muted">
                        {exam.description}
                      </p>
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerChildren>
          </div>
        </section>
      )}

      {/* ─── Tracks (Lycee) ────────────────────────────────────── */}
      {program.tracks && (
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4">
            <SectionHeader
              title="Filieres de specialisation"
              subtitle="Trois parcours d&apos;excellence pour preparer l&apos;avenir"
            />

            {program.tracksIntro && (
              <FadeInView>
                <p className="mx-auto mt-6 max-w-3xl text-center leading-relaxed text-text-muted">
                  {program.tracksIntro}
                </p>
              </FadeInView>
            )}

            <StaggerChildren className="mt-12 grid gap-6 md:grid-cols-3">
              {program.tracks.map((track) => {
                const TrackIcon = track.icon;
                return (
                  <StaggerItem key={track.name}>
                    <div className="group flex h-full flex-col overflow-hidden rounded-[20px] border border-border bg-background shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[var(--shadow-elevated)]">
                      <div
                        className={`flex items-center gap-4 bg-gradient-to-r ${track.color} px-6 py-5`}
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                          <TrackIcon className="h-5 w-5 text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-white">
                          {track.name}
                        </h3>
                      </div>
                      <div className="flex flex-1 flex-col p-6">
                        <p className="leading-relaxed text-text-muted">
                          {track.description}
                        </p>
                      </div>
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerChildren>
          </div>
        </section>
      )}

      {/* ─── Additional Sections (Lycee exam prep) ─────────────── */}
      {program.additionalSections?.map((sec) => (
        <section
          key={sec.title}
          className="relative overflow-hidden bg-background-alt"
        >
          <WaveDivider
            fill="var(--color-background)"
            flip
            className="relative z-10"
          />
          <div className="py-16 md:py-24">
            <div className="mx-auto max-w-7xl px-4">
              <FadeInView>
                <div className="grid items-center gap-12 lg:grid-cols-2">
                  <div>
                    <SectionHeader title={sec.title} className="text-left" />
                    <p className="mt-4 text-text-muted">{sec.description}</p>
                    <ul className="mt-6 space-y-3">
                      {sec.items.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary/10">
                            <FileText className="h-4 w-4 text-secondary" />
                          </div>
                          <span className="mt-1 font-medium text-text">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[20px] shadow-[var(--shadow-warm)]">
                    <Image
                      src={program.secondaryImage}
                      alt={sec.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                </div>
              </FadeInView>
            </div>
          </div>
          <WaveDivider fill="var(--color-background)" />
        </section>
      ))}

      {/* ─── CTA Banner ────────────────────────────────────────── */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <FadeInView>
            <div className="overflow-hidden rounded-[24px] bg-gradient-to-br from-primary to-primary-dark shadow-[var(--shadow-elevated)]">
              <div className="grid items-center lg:grid-cols-2">
                <div className="p-8 md:p-12">
                  <span className="inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-semibold tracking-wide text-white/80 uppercase">
                    {program.levels}
                  </span>
                  <h2 className="mt-4 font-heading text-3xl font-bold text-white md:text-4xl">
                    {program.title}
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-white/75">
                    {program.tagline} Rejoignez le Lycee Montaigne et offrez a
                    votre enfant un parcours d&apos;excellence dans un
                    environnement bienveillant et stimulant.
                  </p>
                  <Link
                    href="/inscriptions"
                    className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-primary transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-4px_rgba(0,0,0,0.2)]"
                  >
                    S&apos;inscrire
                    <ArrowLeft className="h-4 w-4 rotate-180" />
                  </Link>
                </div>
                <div className="relative min-h-[300px] lg:min-h-full">
                  <Image
                    src={program.secondaryImage}
                    alt={program.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/40 to-transparent lg:from-primary/60" />
                </div>
              </div>
            </div>
          </FadeInView>
        </div>
      </section>

      {/* ─── Back link ─────────────────────────────────────────── */}
      <section className="pb-16 md:pb-24">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <FadeInView>
            <Link
              href="/excellence-academique"
              className="inline-flex items-center gap-2.5 rounded-full border border-border bg-background px-6 py-3 text-sm font-semibold text-primary shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-elevated)]"
            >
              <ArrowLeft className="h-4 w-4" />
              Retour a l&apos;Excellence Academique
            </Link>
          </FadeInView>
        </div>
      </section>
    </>
  );
}
