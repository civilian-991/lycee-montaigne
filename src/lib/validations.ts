import { z } from "zod";
import { ALL_SETTING_KEYS } from "@/lib/settings";

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

export const passwordSchema = z
  .string()
  .min(8, "Le mot de passe doit contenir au moins 8 caractères");

export const loginSchema = z.object({
  email: z.string().email("Adresse email invalide").max(200),
  password: z.string().min(8, "Le mot de passe doit contenir au moins 8 caractères").max(200),
});

export type LoginData = z.infer<typeof loginSchema>;

// Admin resource schemas

export const newsSchema = z.object({
  title: z.string().min(1, "Le titre est requis").max(200),
  image: z.string().max(2000).nullable().optional(),
  link: z.string().max(2000).nullable().optional(),
  category: z.string().max(200).nullable().optional(),
  status: z.enum(["DRAFT", "PUBLISHED"]).optional().default("PUBLISHED"),
});

export const documentSchema = z.object({
  title: z.string().min(1, "Le titre est requis").max(200),
  fileUrl: z.string().min(1, "L'URL du fichier est requise").max(2000),
  category: z.string().min(1, "La catégorie est requise").max(200),
  academicYear: z.string().max(200).nullable().optional(),
});

export const staffSchema = z.object({
  name: z.string().min(1, "Le nom est requis").max(200),
  title: z.string().min(1, "Le titre est requis").max(200),
  photo: z.string().max(2000).nullable().optional(),
  messageHtml: z.string().max(100000).nullable().optional(),
  section: z.string().min(1, "La section est requise").max(200),
});

export const carouselSchema = z.object({
  imageUrl: z.string().min(1, "L'URL de l'image est requise").max(2000),
  altText: z.string().max(200).optional().default(""),
  link: z.string().max(2000).nullable().optional(),
  order: z.number().optional().default(0),
});

export const quickLinkSchema = z.object({
  label: z.string().min(1, "Le libellé est requis").max(200),
  url: z.string().min(1, "L'URL est requise").max(2000),
  target: z.string().max(200).optional().default("_self"),
  order: z.number().optional().default(0),
});

export const announcementSchema = z.object({
  title: z.string().min(1, "Le titre est requis").max(200),
  contentHtml: z.string().min(1, "Le contenu est requis").max(100000),
  active: z.boolean().optional().default(true),
  startDate: z.string().max(200).nullable().optional(),
  endDate: z.string().max(200).nullable().optional(),
  status: z.enum(["DRAFT", "PUBLISHED"]).optional().default("PUBLISHED"),
});

export const pageSchema = z.object({
  slug: z.string().min(1, "Le slug est requis").max(100),
  title: z.string().min(1, "Le titre est requis").max(200),
  metaDescription: z.string().max(1000).nullable().optional(),
  ogImage: z.string().max(2000).nullable().optional(),
  status: z.enum(["DRAFT", "PUBLISHED"]).optional().default("PUBLISHED"),
});

export const pageSectionSchema = z.object({
  sectionKey: z.string().min(1, "La clé de section est requise").max(100),
  title: z.string().max(200).nullable().optional(),
  contentHtml: z.string().max(100000).nullable().optional(),
  image: z.string().max(2000).nullable().optional(),
  order: z.number().optional().default(0),
});

export const alumniEventSchema = z.object({
  title: z.string().min(1, "Le titre est requis").max(200),
  date: z.string().min(1, "La date est requise").max(200),
  descriptionHtml: z.string().max(100000).nullable().optional(),
});

export const alumniPhotoSchema = z.object({
  imageUrl: z.string().min(1, "L'URL de l'image est requise").max(2000),
  altText: z.string().max(200).optional().default(""),
  order: z.number().optional().default(0),
});

export const activitySchema = z.object({
  title: z.string().min(1, "Le titre est requis").max(200),
  description: z.string().max(1000).nullable().optional(),
  image: z.string().max(2000).nullable().optional(),
  category: z.string().min(1, "La catégorie est requise").max(200),
  order: z.number().optional().default(0),
});

export const certificationSchema = z.object({
  name: z.string().min(1, "Le nom est requis").max(200),
  image: z.string().max(2000).nullable().optional(),
  description: z.string().max(1000).nullable().optional(),
  order: z.number().optional().default(0),
});

export const governanceInstanceSchema = z.object({
  slug: z.string().min(1, "Le slug est requis").max(100),
  title: z.string().min(1, "Le titre est requis").max(200),
  subtitle: z.string().min(1, "Le sous-titre est requis").max(200),
  iconName: z.string().max(200).default("Building2"),
  accentColor: z.string().max(200).default("from-primary to-primary-dark"),
  descriptionHtml: z.string().min(1, "La description est requise").max(100000),
  compositionHtml: z.string().min(1, "La composition est requise").max(100000),
  membersJson: z.string().max(100000).nullable().optional(),
  meetingFrequency: z.string().max(200).nullable().optional(),
  presidence: z.string().max(200).nullable().optional(),
  responsibilitiesHtml: z.string().min(1, "Les responsabilités sont requises").max(100000),
  order: z.coerce.number().int().default(0),
});

export const menuItemSchema = z.object({
  label: z.string().min(1, "Le libellé est requis").max(200),
  url: z.string().max(2000).nullable().optional(),
  parentId: z.string().max(200).nullable().optional(),
  order: z.number().optional().default(0),
  pageId: z.string().max(200).nullable().optional(),
});

export const contactSubmissionPatchSchema = z.object({
  read: z.boolean(),
});

export const settingsSchema = z.record(z.string().max(100), z.string().max(10000)).refine(
  (data) => {
    const keys = Object.keys(data);
    return keys.every((key) =>
      (ALL_SETTING_KEYS as readonly string[]).includes(key)
    );
  },
  {
    message: `Cle non autorisee`,
  }
);

export const uploadDeleteSchema = z.object({
  url: z.string().min(1, "L'URL est requise").max(2000),
});

export const ALLOWED_UPLOAD_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "application/pdf",
] as const;

export const MAX_UPLOAD_SIZE = 10 * 1024 * 1024; // 10MB
