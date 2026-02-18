import type { Metadata } from "next";
import { getSettings } from "@/lib/settings";
import { ContactContent } from "./contact-content";

export const metadata: Metadata = {
  title: "Contact | Lycee Montaigne",
  description:
    "Contactez le Lycee Montaigne de Beit Chabab, Metn, Liban.",
  alternates: { canonical: "/contact" },
};

export default async function ContactPage() {
  const settings = await getSettings();
  return (
    <ContactContent
      address={settings.address}
      email={settings.email}
      phone={settings.phone}
      fax={settings.fax}
      googleMapsUrl={settings.google_maps_url}
      googleMapsEmbed={settings.google_maps_embed}
    />
  );
}
