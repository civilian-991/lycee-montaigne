import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .max(100),
  email: z.string().email("Adresse email invalide"),
  subject: z.string().max(200).optional(),
  message: z
    .string()
    .min(10, "Le message doit contenir au moins 10 caractères")
    .max(5000),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export const loginSchema = z.object({
  email: z.string().email("Adresse email invalide"),
  password: z.string().min(1, "Le mot de passe est requis"),
});

export type LoginData = z.infer<typeof loginSchema>;

// Admin resource schemas

export const newsSchema = z.object({
  title: z.string().min(1, "Le titre est requis"),
  image: z.string().nullable().optional(),
  link: z.string().nullable().optional(),
  category: z.string().nullable().optional(),
});

export const documentSchema = z.object({
  title: z.string().min(1, "Le titre est requis"),
  fileUrl: z.string().min(1, "L'URL du fichier est requise"),
  category: z.string().min(1, "La catégorie est requise"),
  academicYear: z.string().nullable().optional(),
});

export const staffSchema = z.object({
  name: z.string().min(1, "Le nom est requis"),
  title: z.string().min(1, "Le titre est requis"),
  photo: z.string().nullable().optional(),
  messageHtml: z.string().nullable().optional(),
  section: z.string().min(1, "La section est requise"),
});

export const carouselSchema = z.object({
  imageUrl: z.string().min(1, "L'URL de l'image est requise"),
  altText: z.string().optional().default(""),
  link: z.string().nullable().optional(),
  order: z.number().optional().default(0),
});

export const quickLinkSchema = z.object({
  label: z.string().min(1, "Le libellé est requis"),
  url: z.string().min(1, "L'URL est requise"),
  target: z.string().optional().default("_self"),
  order: z.number().optional().default(0),
});

export const announcementSchema = z.object({
  title: z.string().min(1, "Le titre est requis"),
  contentHtml: z.string().min(1, "Le contenu est requis"),
  active: z.boolean().optional().default(true),
  startDate: z.string().nullable().optional(),
  endDate: z.string().nullable().optional(),
});

export const pageSchema = z.object({
  slug: z.string().min(1, "Le slug est requis"),
  title: z.string().min(1, "Le titre est requis"),
  metaDescription: z.string().nullable().optional(),
  ogImage: z.string().nullable().optional(),
});

export const pageSectionSchema = z.object({
  sectionKey: z.string().min(1, "La clé de section est requise"),
  title: z.string().nullable().optional(),
  contentHtml: z.string().nullable().optional(),
  image: z.string().nullable().optional(),
  order: z.number().optional().default(0),
});

export const alumniEventSchema = z.object({
  title: z.string().min(1, "Le titre est requis"),
  date: z.string().min(1, "La date est requise"),
  descriptionHtml: z.string().nullable().optional(),
});

export const alumniPhotoSchema = z.object({
  imageUrl: z.string().min(1, "L'URL de l'image est requise"),
  altText: z.string().optional().default(""),
  order: z.number().optional().default(0),
});

export const activitySchema = z.object({
  title: z.string().min(1, "Le titre est requis"),
  description: z.string().nullable().optional(),
  image: z.string().nullable().optional(),
  category: z.string().min(1, "La catégorie est requise"),
  order: z.number().optional().default(0),
});

export const certificationSchema = z.object({
  name: z.string().min(1, "Le nom est requis"),
  image: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  order: z.number().optional().default(0),
});

export const governanceInstanceSchema = z.object({
  slug: z.string().min(1, "Le slug est requis"),
  title: z.string().min(1, "Le titre est requis"),
  subtitle: z.string().min(1, "Le sous-titre est requis"),
  iconName: z.string().default("Building2"),
  accentColor: z.string().default("from-primary to-primary-dark"),
  descriptionHtml: z.string().min(1, "La description est requise"),
  compositionHtml: z.string().min(1, "La composition est requise"),
  membersJson: z.string().nullable().optional(),
  meetingFrequency: z.string().nullable().optional(),
  presidence: z.string().nullable().optional(),
  responsibilitiesHtml: z.string().min(1, "Les responsabilités sont requises"),
  order: z.coerce.number().int().default(0),
});

export const contactSubmissionPatchSchema = z.object({
  read: z.boolean(),
});

const ALLOWED_SETTING_KEYS = [
  "site_name",
  "site_subtitle",
  "email",
  "phone",
  "fax",
  "address",
  "facebook",
  "instagram",
  "linkedin",
  "stat_eleves",
  "stat_reussite",
  "stat_nationalites",
  "stat_langues",
] as const;

export const settingsSchema = z.record(z.string(), z.string()).refine(
  (data) => {
    const keys = Object.keys(data);
    return keys.every((key) =>
      (ALLOWED_SETTING_KEYS as readonly string[]).includes(key)
    );
  },
  {
    message: `Clés autorisées : ${ALLOWED_SETTING_KEYS.join(", ")}`,
  }
);

export const uploadDeleteSchema = z.object({
  url: z.string().min(1, "L'URL est requise"),
});

export const ALLOWED_UPLOAD_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/svg+xml",
  "application/pdf",
] as const;

export const MAX_UPLOAD_SIZE = 10 * 1024 * 1024; // 10MB
