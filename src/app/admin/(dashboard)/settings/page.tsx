import { getSettings, ALL_SETTING_KEYS, type SiteSettings } from "@/lib/settings";
import { SettingsForm } from "./settings-form";

/* ------------------------------------------------------------------ */
/*  Category definitions for the admin settings form                   */
/* ------------------------------------------------------------------ */

export interface SettingField {
  key: string;
  label: string;
  type: "text" | "url" | "textarea" | "json";
  /** For JSON fields — describes the shape of each item in the array */
  jsonFields?: { key: string; label: string; type?: "text" | "url" | "textarea" }[];
  /** For JSON fields with nested arrays (e.g. strategic_axes.items, supply_lists.items) */
  nestedArrayField?: { key: string; label: string; itemFields?: { key: string; label: string; type?: "text" | "url" }[] };
}

export interface SettingCategory {
  id: string;
  label: string;
  fields: SettingField[];
}

const categories: SettingCategory[] = [
  {
    id: "general",
    label: "General",
    fields: [
      { key: "site_name", label: "Nom du site", type: "text" },
      { key: "site_subtitle", label: "Sous-titre", type: "text" },
      { key: "stat_eleves", label: "Nombre d'eleves", type: "text" },
      { key: "stat_reussite", label: "Taux de reussite", type: "text" },
      { key: "stat_nationalites", label: "Nationalites", type: "text" },
      { key: "stat_langues", label: "Langues d'enseignement", type: "text" },
    ],
  },
  {
    id: "contact",
    label: "Contact",
    fields: [
      { key: "email", label: "Email de contact", type: "text" },
      { key: "phone", label: "Telephone", type: "text" },
      { key: "fax", label: "Fax", type: "text" },
      { key: "address", label: "Adresse", type: "text" },
      { key: "google_maps_url", label: "URL Google Maps", type: "url" },
      { key: "google_maps_embed", label: "Code embed Google Maps", type: "textarea" },
    ],
  },
  {
    id: "social",
    label: "Reseaux sociaux",
    fields: [
      { key: "facebook", label: "Facebook", type: "url" },
      { key: "instagram", label: "Instagram", type: "url" },
      { key: "linkedin", label: "LinkedIn", type: "url" },
    ],
  },
  {
    id: "external",
    label: "Liens externes",
    fields: [
      { key: "pronote_url", label: "URL Pronote", type: "url" },
    ],
  },
  {
    id: "footer",
    label: "Pied de page",
    fields: [
      {
        key: "footer_nav_links",
        label: "Liens de navigation",
        type: "json",
        jsonFields: [
          { key: "label", label: "Libelle" },
          { key: "href", label: "Lien", type: "url" },
        ],
      },
      {
        key: "footer_useful_links",
        label: "Liens utiles",
        type: "json",
        jsonFields: [
          { key: "label", label: "Libelle" },
          { key: "href", label: "Lien", type: "url" },
        ],
      },
      {
        key: "partner_logos",
        label: "Logos partenaires",
        type: "json",
        jsonFields: [
          { key: "src", label: "URL de l'image", type: "url" },
          { key: "alt", label: "Texte alternatif" },
        ],
      },
    ],
  },
  {
    id: "programs",
    label: "Programmes academiques",
    fields: [
      {
        key: "programs",
        label: "Programmes",
        type: "json",
        jsonFields: [
          { key: "name", label: "Nom" },
          { key: "levels", label: "Niveaux" },
          { key: "ages", label: "Ages" },
          { key: "slug", label: "Slug" },
        ],
      },
      {
        key: "diplomas",
        label: "Diplomes",
        type: "json",
        jsonFields: [
          { key: "name", label: "Nom" },
          { key: "description", label: "Type" },
        ],
      },
      {
        key: "strategic_axes",
        label: "Axes strategiques",
        type: "json",
        jsonFields: [
          { key: "title", label: "Titre" },
          { key: "image", label: "URL image", type: "url" },
        ],
        nestedArrayField: { key: "items", label: "Elements" },
      },
      {
        key: "educational_paths",
        label: "Parcours educatifs",
        type: "json",
        jsonFields: [
          { key: "name", label: "Nom" },
          { key: "description", label: "Description", type: "textarea" },
          { key: "icon", label: "Icone (compass, graduation-cap, heart, palette, book-open, school)" },
        ],
      },
    ],
  },
  {
    id: "orientation",
    label: "Orientation",
    fields: [
      {
        key: "universities",
        label: "Universites",
        type: "json",
        jsonFields: [
          { key: "name", label: "Nom" },
          { key: "url", label: "URL", type: "url" },
        ],
      },
    ],
  },
  {
    id: "inscriptions",
    label: "Inscriptions",
    fields: [
      {
        key: "inscription_documents",
        label: "Documents d'inscription",
        type: "json",
        jsonFields: [
          { key: "title", label: "Titre" },
          { key: "description", label: "Description" },
        ],
      },
    ],
  },
  {
    id: "health",
    label: "Sante",
    fields: [
      {
        key: "health_staff",
        label: "Personnel de sante",
        type: "json",
        jsonFields: [
          { key: "name", label: "Nom" },
          { key: "role", label: "Role" },
        ],
      },
      { key: "health_referents", label: "Referents sante", type: "textarea" },
    ],
  },
  {
    id: "bcd_ccc",
    label: "BCD & CCC",
    fields: [
      {
        key: "bcd_functions",
        label: "Fonctions BCD",
        type: "json",
        jsonFields: [
          { key: "title", label: "Titre" },
          { key: "description", label: "Description", type: "textarea" },
        ],
      },
      {
        key: "ccc_functions",
        label: "Fonctions CCC",
        type: "json",
        jsonFields: [
          { key: "title", label: "Titre" },
          { key: "description", label: "Description", type: "textarea" },
        ],
      },
      {
        key: "ccc_resources",
        label: "Ressources CCC",
        type: "json",
        jsonFields: [
          { key: "name", label: "Nom" },
          { key: "url", label: "URL", type: "url" },
        ],
      },
      { key: "ccc_email", label: "Email CCC", type: "text" },
    ],
  },
  {
    id: "inclusion",
    label: "Pole Inclusion",
    fields: [
      {
        key: "pole_inclusion_pillars",
        label: "Piliers du pole inclusion",
        type: "json",
        jsonFields: [
          { key: "title", label: "Titre" },
          { key: "description", label: "Description", type: "textarea" },
        ],
      },
    ],
  },
  {
    id: "alumni",
    label: "Anciens",
    fields: [
      {
        key: "alumni_committee",
        label: "Comite des anciens",
        type: "json",
        jsonFields: [
          { key: "role", label: "Role" },
          { key: "members", label: "Membres" },
          { key: "alternates", label: "Suppleants" },
        ],
      },
      {
        key: "alumni_subcommittees",
        label: "Sous-comites",
        type: "json",
        jsonFields: [
          { key: "name", label: "Nom" },
          { key: "description", label: "Description", type: "textarea" },
        ],
      },
    ],
  },
  {
    id: "vie_lm",
    label: "Vie du LM",
    fields: [
      { key: "webradio_referents", label: "Referents webradio", type: "textarea" },
      {
        key: "supply_lists",
        label: "Listes de fournitures",
        type: "json",
        jsonFields: [
          { key: "level", label: "Niveau" },
        ],
        nestedArrayField: {
          key: "items",
          label: "Fichiers",
          itemFields: [
            { key: "name", label: "Nom" },
            { key: "pdfUrl", label: "URL du PDF", type: "url" },
          ],
        },
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Server component                                                   */
/* ------------------------------------------------------------------ */

export default async function AdminSettingsPage() {
  const settings = await getSettings();

  // Serialize all values to strings for the client form
  const serialized: Record<string, string> = {};
  for (const key of ALL_SETTING_KEYS) {
    const val = settings[key as keyof SiteSettings];
    if (typeof val === "string") {
      serialized[key] = val;
    } else {
      serialized[key] = JSON.stringify(val);
    }
  }

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text">Parametres</h1>
        <p className="mt-1 text-sm text-text-muted">
          Configuration generale du site — tous les contenus editables
        </p>
      </div>
      <SettingsForm settings={serialized} categories={categories} />
    </>
  );
}
