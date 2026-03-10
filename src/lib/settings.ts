import { cache } from "react";
import { db } from "@/lib/db";

/* ------------------------------------------------------------------ */
/*  JSON array setting keys — these get auto-parsed from JSON strings  */
/* ------------------------------------------------------------------ */

export const JSON_SETTING_KEYS = [
  "partner_logos",
  "footer_nav_links",
  "footer_useful_links",
  "universities",
  "inscription_documents",
  "pole_inclusion_pillars",
  "alumni_committee",
  "alumni_subcommittees",
  "bcd_functions",
  "ccc_functions",
  "ccc_resources",
  "programs",
  "diplomas",
  "strategic_axes",
  "educational_paths",
  "supply_lists",
  "health_staff",
  "homepage_reasons",
  "tuition_levels",
] as const;

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface PartnerLogo {
  src: string;
  alt: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface University {
  name: string;
  url: string;
}

export interface InscriptionDocument {
  title: string;
  description: string;
}

export interface PoleInclusionPillar {
  title: string;
  description: string;
}

export interface AlumniCommitteeMember {
  role: string;
  members: string;
  alternates: string;
}

export interface AlumniSubcommittee {
  name: string;
  description: string;
}

export interface BcdFunction {
  title: string;
  description: string;
}

export interface CccFunction {
  title: string;
  description: string;
}

export interface CccResource {
  name: string;
  url: string;
}

export interface Program {
  name: string;
  levels: string;
  ages: string;
  slug: string;
}

export interface Diploma {
  name: string;
  description: string;
}

export interface StrategicAxis {
  title: string;
  items: string[];
  image?: string;
}

export interface EducationalPath {
  name: string;
  description: string;
  icon?: string;
}

export interface SupplyListLevel {
  level: string;
  items: { name: string; pdfUrl: string }[];
}

export interface HealthStaffMember {
  name: string;
  role: string;
}

export interface HomepageReason {
  title: string;
  description: string;
}

export interface TuitionInstallment {
  label: string;
  fraisLL: string;
  fraisUSD: string;
  contributionUSD: string;
  collationUSD: string;
}

export interface TuitionLevel {
  level: string;
  installments: TuitionInstallment[];
}

export interface SiteSettings {
  /* General */
  site_name: string;
  site_subtitle: string;
  stat_eleves: string;
  stat_reussite: string;
  stat_nationalites: string;
  stat_langues: string;

  /* Contact */
  email: string;
  phone: string;
  fax: string;
  address: string;
  google_maps_url: string;
  google_maps_embed: string;

  /* Social */
  facebook: string;
  instagram: string;
  linkedin: string;

  /* External links */
  pronote_url: string;

  /* Footer */
  partner_logos: PartnerLogo[];
  footer_nav_links: NavLink[];
  footer_useful_links: NavLink[];

  /* Academic programs */
  programs: Program[];
  diplomas: Diploma[];
  strategic_axes: StrategicAxis[];
  educational_paths: EducationalPath[];

  /* Orientation */
  universities: University[];

  /* Inscriptions */
  inscription_documents: InscriptionDocument[];

  /* Tarifs */
  tuition_levels: TuitionLevel[];
  tuition_year: string;

  /* Health */
  health_staff: HealthStaffMember[];
  health_referents: string;

  /* BCD & CCC */
  bcd_functions: BcdFunction[];
  ccc_functions: CccFunction[];
  ccc_resources: CccResource[];
  ccc_email: string;

  /* Pole Inclusion */
  pole_inclusion_pillars: PoleInclusionPillar[];

  /* Alumni */
  alumni_committee: AlumniCommitteeMember[];
  alumni_subcommittees: AlumniSubcommittee[];

  /* Homepage */
  homepage_reasons: HomepageReason[];
  trait_union_title: string;
  trait_union_description: string;
  trait_union_image: string;
  trait_union_link: string;

  /* Vie du LM */
  webradio_referents: string;
  sustainability_referents: string;
  sustainability_label: string;
  cvc_url: string;
  cvl_url: string;
  supply_lists: SupplyListLevel[];
}

/* ------------------------------------------------------------------ */
/*  Default values — match current hardcoded content on the website    */
/* ------------------------------------------------------------------ */

export const DEFAULT_SETTINGS: SiteSettings = {
  /* General */
  site_name: "Lycée Montaigne",
  site_subtitle: "Beit Chabab",
  stat_eleves: "1085",
  stat_reussite: "100%",
  stat_nationalites: "29",
  stat_langues: "3",

  /* Contact */
  email: "info@lycee-montaigne.edu.lb",
  phone: "+961 4 982 082 / +961 4 983 845 / +961 4 985 256",
  fax: "+961 4 985 256",
  address: "Beit Chabab, Quartier Baydar Chouar, Metn, Liban",
  google_maps_url: "https://maps.app.goo.gl/n8oJmjd1FfVNT2cp9",
  google_maps_embed: "",

  /* Social */
  facebook: "https://www.facebook.com/LyceeMontaigneBeitChabab",
  instagram: "https://www.instagram.com/lyceemontaigne.liban/",
  linkedin:
    "https://www.linkedin.com/school/lyc%C3%A9e-montaigne-beit-chabab/",

  /* External links */
  pronote_url: "https://2050048n.index-education.net/pronote/",

  /* Footer */
  partner_logos: [
    {
      src: "/images/infos/June2025/epI0N3MR04HkiCEJL5RO.png",
      alt: "Reseau mlfmonde",
    },
    {
      src: "/images/infos/June2025/rHzXQq9eC2AmCsOYzLgz.png",
      alt: "AEFE",
    },
    {
      src: "/images/infos/June2025/uCw1d3Difxn6BtzjXI90.png",
      alt: "Homologation",
    },
  ],
  footer_nav_links: [
    { label: "Accueil", href: "/" },
    { label: "Établissement", href: "/etablissement" },
    { label: "Inscriptions", href: "/inscriptions" },
    { label: "Vie du LM", href: "/vie-du-lm" },
    { label: "Orientation", href: "/orientation" },
    { label: "Extrascolaire", href: "/extrascolaire" },
    { label: "Informations pratiques", href: "/informations-pratiques" },
  ],
  footer_useful_links: [
    { label: "Inscriptions", href: "/inscriptions" },
    { label: "Égalité-diversité", href: "/vie-du-lm#egalite" },
    { label: "Anciens du LM", href: "/anciens" },
    { label: "Recrutement", href: "/informations-pratiques#recrutement" },
    { label: "Développement durable", href: "/vie-du-lm#dev" },
    { label: "Webradio", href: "/vie-du-lm#web" },
    { label: "Bourses scolaires", href: "/inscriptions#bourse" },
  ],

  /* Academic programs */
  programs: [
    {
      name: "École Maternelle",
      levels: "PS - MS - GS",
      ages: "3-5 ans",
      slug: "maternelle",
    },
    {
      name: "École Élémentaire",
      levels: "CP - CE1 - CE2 - CM1 - CM2",
      ages: "6-10 ans",
      slug: "elementaire",
    },
    {
      name: "Collège",
      levels: "6ème - 5ème - 4ème - 3ème",
      ages: "11-14 ans",
      slug: "college",
    },
    {
      name: "Lycée",
      levels: "2nde - 1ère - Terminale",
      ages: "15-17 ans",
      slug: "lycee",
    },
  ],
  diplomas: [
    {
      name: "Diplôme National du Brevet (DNB)",
      description: "Français",
    },
    { name: "Brevet Libanais", description: "Libanais" },
    { name: "Bac Français", description: "Français" },
    { name: "Bac Libanais", description: "Libanais" },
    {
      name: "Bac Français International (BFI)",
      description: "International",
    },
  ],
  strategic_axes: [
    {
      title: "Assurer un parcours d'excellence à tous les élèves",
      items: [
        "Renforcer la maîtrise de la langue française",
        "Développer les compétences en langues vivantes",
        "Promouvoir les sciences et la culture numérique",
        "Favoriser les parcours artistiques et culturels",
        "Accompagner chaque élève vers sa réussite",
        "Renforcer l'évaluation formative",
      ],
    },
    {
      title: "Accompagner la montée en puissance du Lycée Montaigne",
      items: [
        "Développer une politique d'attractivité",
        "Renforcer la communication interne et externe",
        "Moderniser les pratiques pédagogiques",
        "Optimiser la gestion des ressources",
        "Développer les partenariats",
      ],
    },
    {
      title: "Cultiver l'identité humaniste de l'établissement",
      items: [
        "Promouvoir les valeurs de tolérance et de respect",
        "Développer l'éco-citoyenneté",
        "Renforcer l'égalité filles-garçons",
        "Favoriser l'inclusion et la diversité",
        "Développer le sentiment d'appartenance",
      ],
    },
  ],
  educational_paths: [
    {
      name: "Parcours citoyen",
      description:
        "Formation du citoyen responsable et engagé, participation à la vie démocratique de l'établissement.",
    },
    {
      name: "Parcours Avenir",
      description:
        "Orientation et découverte du monde professionnel dès la 6ème jusqu'à la terminale.",
    },
    {
      name: "Parcours éducatif de santé",
      description:
        "Éducation à la santé, prévention et protection des élèves tout au long de leur scolarité.",
    },
    {
      name: "Parcours d'éducation artistique et culturelle",
      description:
        "Rencontre avec les œuvres, pratique artistique et acquisition de connaissances culturelles.",
    },
  ],

  /* Orientation */
  universities: [
    {
      name: "USJ",
      url: "https://usj.edu.lb/e-doors/",
    },
    {
      name: "AUB",
      url: "https://www.aub.edu.lb/admissions/Pages/default.aspx",
    },
    { name: "NDU", url: "https://www.ndu.edu.lb/apply" },
    {
      name: "LAU",
      url: "https://www.lau.edu.lb/apply/first-time-applicant.php",
    },
    {
      name: "Balamand",
      url: "https://www.balamand.edu.lb/ProspectiveStudents/Pages/UndergraduateAdmissions.aspx",
    },
    {
      name: "ALBA",
      url: "https://alba.edu.lb/sites/ALBA1/InsAdm/Pages/default.aspx",
    },
    {
      name: "ESA",
      url: "https://www.esa.edu.lb/french/formation-diplomante/bachelor-in-business-administration",
    },
    {
      name: "USEK",
      url: "https://www.usek.edu.lb/en/admission/online-admission-requirements",
    },
    { name: "UCAS", url: "https://www.ucas.com/applying" },
    { name: "Common App", url: "https://www.commonapp.org/" },
  ],

  /* Inscriptions */
  inscription_documents: [],

  /* Tarifs */
  tuition_year: "2025-2026",
  tuition_levels: [
    {
      level: "Maternelle",
      installments: [
        { label: "1er versement", fraisLL: "5 000 000", fraisUSD: "550", contributionUSD: "200", collationUSD: "100" },
        { label: "2e versement", fraisLL: "5 000 000", fraisUSD: "550", contributionUSD: "200", collationUSD: "—" },
        { label: "3e versement", fraisLL: "5 000 000", fraisUSD: "550", contributionUSD: "200", collationUSD: "—" },
      ],
    },
    {
      level: "École élémentaire",
      installments: [
        { label: "1er versement", fraisLL: "5 000 000", fraisUSD: "650", contributionUSD: "200", collationUSD: "100" },
        { label: "2e versement", fraisLL: "5 000 000", fraisUSD: "650", contributionUSD: "200", collationUSD: "—" },
        { label: "3e versement", fraisLL: "5 000 000", fraisUSD: "650", contributionUSD: "200", collationUSD: "—" },
      ],
    },
    {
      level: "Collège",
      installments: [
        { label: "1er versement", fraisLL: "6 000 000", fraisUSD: "750", contributionUSD: "250", collationUSD: "—" },
        { label: "2e versement", fraisLL: "6 000 000", fraisUSD: "750", contributionUSD: "250", collationUSD: "—" },
        { label: "3e versement", fraisLL: "6 000 000", fraisUSD: "750", contributionUSD: "250", collationUSD: "—" },
      ],
    },
    {
      level: "Lycée",
      installments: [
        { label: "1er versement", fraisLL: "7 000 000", fraisUSD: "900", contributionUSD: "300", collationUSD: "—" },
        { label: "2e versement", fraisLL: "7 000 000", fraisUSD: "900", contributionUSD: "300", collationUSD: "—" },
        { label: "3e versement", fraisLL: "7 000 000", fraisUSD: "900", contributionUSD: "300", collationUSD: "—" },
      ],
    },
  ],

  /* Health */
  health_staff: [],
  health_referents: "",

  /* BCD & CCC */
  bcd_functions: [],
  ccc_functions: [],
  ccc_resources: [],
  ccc_email: "",

  /* Pole Inclusion */
  pole_inclusion_pillars: [],

  /* Alumni */
  alumni_committee: [],
  alumni_subcommittees: [],

  /* Homepage */
  homepage_reasons: [
    { title: "Excellence académique", description: "Un enseignement rigoureux suivant les programmes français, avec des résultats exceptionnels aux examens nationaux et internationaux." },
    { title: "Ouverture internationale", description: "29 nationalités représentées, un Bac Français International, et des partenariats avec des universités prestigieuses dans le monde entier." },
    { title: "Épanouissement de l'élève", description: "Un accompagnement personnalisé de la maternelle à la terminale, avec des activités périscolaires variées et un pôle inclusion dédié." },
    { title: "Valeurs humanistes", description: "Une école pour toutes les intelligences et tous les talents, fondée sur le regard positif, l'éducabilité et le refus du déterminisme." },
  ],
  trait_union_title: "Numéro 91 - Décembre 2025",
  trait_union_description: "Découvrez le dernier numéro du Trait d'union, le journal du Lycée Montaigne.",
  trait_union_image: "/images/hp-services-items/January2026/HcSaUtgkncgRCfvVKoV4.jpeg",
  trait_union_link: "https://lycee-montaigne.edu.lb/storage/hp-services-items/January2026/ypxca3h4YSBTMQbvSzQb.pdf",

  /* Vie du LM */
  webradio_referents: "",
  sustainability_referents: "Mme Roula Chalabi (1er degre)\nM. Robert Sreih (2nd degre)",
  sustainability_label: "Label EFE3D Niveau Expert",
  cvc_url: "",
  cvl_url: "",
  supply_lists: [],
};

/* ------------------------------------------------------------------ */
/*  ALL setting keys (union of text + JSON keys)                       */
/* ------------------------------------------------------------------ */

export const ALL_SETTING_KEYS = [
  "site_name",
  "site_subtitle",
  "stat_eleves",
  "stat_reussite",
  "stat_nationalites",
  "stat_langues",
  "email",
  "phone",
  "fax",
  "address",
  "google_maps_url",
  "google_maps_embed",
  "facebook",
  "instagram",
  "linkedin",
  "pronote_url",
  "health_referents",
  "ccc_email",
  "webradio_referents",
  "sustainability_referents",
  "sustainability_label",
  "cvc_url",
  "cvl_url",
  "trait_union_title",
  "trait_union_description",
  "trait_union_image",
  "trait_union_link",
  "tuition_year",
  ...JSON_SETTING_KEYS,
] as const;

/* ------------------------------------------------------------------ */
/*  getSettings() — main helper used by server components              */
/* ------------------------------------------------------------------ */

export const getSettings = cache(async function getSettings(): Promise<SiteSettings> {
  let rows: { key: string; value: string }[] = [];
  try {
    rows = await db.siteSetting.findMany({
      select: { key: true, value: true },
    });
  } catch {
    // DB not connected — fall back to defaults
  }

  const map = new Map(rows.map((r) => [r.key, r.value]));

  // Build the result by merging DB values with defaults
  const result = { ...DEFAULT_SETTINGS } as Record<string, unknown>;

  for (const key of ALL_SETTING_KEYS) {
    const dbValue = map.get(key);
    if (dbValue === undefined) continue;

    if (
      (JSON_SETTING_KEYS as readonly string[]).includes(key)
    ) {
      try {
        result[key] = JSON.parse(dbValue);
      } catch {
        // Keep default if JSON is malformed
      }
    } else {
      result[key] = dbValue;
    }
  }

  return result as unknown as SiteSettings;
});
