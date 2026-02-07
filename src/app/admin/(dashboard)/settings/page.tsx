import { db } from "@/lib/db";
import { SettingsForm } from "./settings-form";

const defaultSettings = [
  { key: "site_name", label: "Nom du site", value: "Lycée Montaigne" },
  { key: "site_subtitle", label: "Sous-titre", value: "Beit Chabab" },
  { key: "email", label: "Email de contact", value: "info@lycee-montaigne.edu.lb" },
  { key: "phone", label: "Téléphone", value: "+961 4 982 082 / 983 845 / 985 256" },
  { key: "fax", label: "Fax", value: "+961 4 985 256" },
  { key: "address", label: "Adresse", value: "Beit Chabab, Quartier Baydar Chouar, Metn, Liban" },
  { key: "facebook", label: "Facebook", value: "https://www.facebook.com/LyceeMontaigneBeitChabab" },
  { key: "instagram", label: "Instagram", value: "https://www.instagram.com/lyceemontaigne.liban/" },
  { key: "linkedin", label: "LinkedIn", value: "https://www.linkedin.com/school/lyc%C3%A9e-montaigne-beit-chabab/" },
  { key: "stat_eleves", label: "Nombre d'élèves", value: "1085" },
  { key: "stat_reussite", label: "Taux de réussite", value: "100%" },
  { key: "stat_nationalites", label: "Nationalités", value: "29" },
  { key: "stat_langues", label: "Langues d'enseignement", value: "3" },
];

export default async function AdminSettingsPage() {
  let settings: { key: string; value: string }[] = [];
  try {
    settings = await db.siteSetting.findMany({
      select: { key: true, value: true },
    });
  } catch {
    // DB not connected
  }

  const mergedSettings = defaultSettings.map((def) => {
    const saved = settings.find((s) => s.key === def.key);
    return { ...def, value: saved?.value ?? def.value };
  });

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text">Paramètres</h1>
        <p className="mt-1 text-sm text-text-muted">Configuration générale du site</p>
      </div>
      <SettingsForm settings={mergedSettings} />
    </>
  );
}
