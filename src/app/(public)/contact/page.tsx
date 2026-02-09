import type { Metadata } from "next";
import { db } from "@/lib/db";
import { ContactContent } from "./contact-content";

export const metadata: Metadata = {
  title: "Contact | Lycée Montaigne",
  description:
    "Contactez le Lycée Montaigne de Beit Chabab, Metn, Liban.",
};

export default async function ContactPage() {
  const settings = await db.siteSetting.findMany();
  const settingsMap = Object.fromEntries(settings.map((s) => [s.key, s.value]));
  return <ContactContent settings={settingsMap} />;
}
