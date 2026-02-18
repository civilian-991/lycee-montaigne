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

  /* Vie du LM */
  webradio_referents: string;
  supply_lists: SupplyListLevel[];
}

/* ------------------------------------------------------------------ */
/*  Default values — match current hardcoded content on the website    */
/* ------------------------------------------------------------------ */

export const DEFAULT_SETTINGS: SiteSettings = {
  /* General */
  site_name: "Lycee Montaigne",
  site_subtitle: "Beit Chabab",
  stat_eleves: "1085",
  stat_reussite: "100%",
  stat_nationalites: "29",
  stat_langues: "3",

  /* Contact */
  email: "info@lycee-montaigne.edu.lb",
  phone: "+961 4 982 082 / 983 845 / 985 256",
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
    { label: "Etablissement", href: "/etablissement" },
    { label: "Inscriptions", href: "/inscriptions" },
    { label: "Vie du LM", href: "/vie-du-lm" },
    { label: "Orientation", href: "/orientation" },
    { label: "Extrascolaire", href: "/extrascolaire" },
    { label: "Informations pratiques", href: "/informations-pratiques" },
  ],
  footer_useful_links: [
    { label: "Inscriptions", href: "/inscriptions" },
    { label: "Egalite-diversite", href: "/vie-du-lm#egalite" },
    { label: "Anciens du LM", href: "/anciens" },
    { label: "Recrutement", href: "/informations-pratiques#recrutement" },
    { label: "Developpement durable", href: "/vie-du-lm#dev" },
    { label: "Webradio", href: "/vie-du-lm#web" },
    { label: "Bourses scolaires", href: "/inscriptions#bourse" },
  ],

  /* Academic programs */
  programs: [
    {
      name: "Ecole Maternelle",
      levels: "PS - MS - GS",
      ages: "3-5 ans",
      slug: "maternelle",
    },
    {
      name: "Ecole Elementaire",
      levels: "CP - CE1 - CE2 - CM1 - CM2",
      ages: "6-10 ans",
      slug: "elementaire",
    },
    {
      name: "College",
      levels: "6eme - 5eme - 4eme - 3eme",
      ages: "11-14 ans",
      slug: "college",
    },
    {
      name: "Lycee",
      levels: "2nde - 1ere - Terminale",
      ages: "15-17 ans",
      slug: "lycee",
    },
  ],
  diplomas: [
    {
      name: "Diplome National du Brevet (DNB)",
      description: "Francais",
    },
    { name: "Brevet Libanais", description: "Libanais" },
    { name: "Bac Francais", description: "Francais" },
    { name: "Bac Libanais", description: "Libanais" },
    {
      name: "Bac Francais International (BFI)",
      description: "International",
    },
  ],
  strategic_axes: [
    {
      title: "Assurer un parcours d'excellence a tous les eleves",
      items: [
        "Renforcer la maitrise de la langue francaise",
        "Developper les competences en langues vivantes",
        "Promouvoir les sciences et la culture numerique",
        "Favoriser les parcours artistiques et culturels",
        "Accompagner chaque eleve vers sa reussite",
        "Renforcer l'evaluation formative",
      ],
    },
    {
      title: "Accompagner la montee en puissance du Lycee Montaigne",
      items: [
        "Developper une politique d'attractivite",
        "Renforcer la communication interne et externe",
        "Moderniser les pratiques pedagogiques",
        "Optimiser la gestion des ressources",
        "Developper les partenariats",
      ],
    },
    {
      title: "Cultiver l'identite humaniste de l'etablissement",
      items: [
        "Promouvoir les valeurs de tolerance et de respect",
        "Developper l'eco-citoyennete",
        "Renforcer l'egalite filles-garcons",
        "Favoriser l'inclusion et la diversite",
        "Developper le sentiment d'appartenance",
      ],
    },
  ],
  educational_paths: [
    {
      name: "Parcours citoyen",
      description:
        "Formation du citoyen responsable et engage, participation a la vie democratique de l'etablissement.",
    },
    {
      name: "Parcours Avenir",
      description:
        "Orientation et decouverte du monde professionnel des la 6eme jusqu'a la terminale.",
    },
    {
      name: "Parcours educatif de sante",
      description:
        "Education a la sante, prevention et protection des eleves tout au long de leur scolarite.",
    },
    {
      name: "Parcours d'education artistique et culturelle",
      description:
        "Rencontre avec les oeuvres, pratique artistique et acquisition de connaissances culturelles.",
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

  /* Vie du LM */
  webradio_referents: "",
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
  ...JSON_SETTING_KEYS,
] as const;

/* ------------------------------------------------------------------ */
/*  getSettings() — main helper used by server components              */
/* ------------------------------------------------------------------ */

export async function getSettings(): Promise<SiteSettings> {
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
}
