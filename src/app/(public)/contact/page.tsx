import { db } from "@/lib/db";
import { ContactContent } from "./contact-content";

export default async function ContactPage() {
  const settings = await db.siteSetting.findMany();
  const settingsMap = Object.fromEntries(settings.map((s) => [s.key, s.value]));
  return <ContactContent settings={settingsMap} />;
}
