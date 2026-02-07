import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Lycée Montaigne — Beit Chabab",
    template: "%s | Lycée Montaigne",
  },
  description:
    "Le Lycée Montaigne de Beit Chabab est un établissement scolaire francophone au Liban, de la maternelle à la terminale.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Lycée Montaigne",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "School",
  name: "Lycée Montaigne",
  alternateName: "Lycée Montaigne Beit Chabab",
  url: "https://lycee-montaigne.edu.lb",
  description:
    "Établissement scolaire francophone au Liban, de la maternelle à la terminale, homologué par le Ministère français de l'Éducation nationale.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Quartier Baydar Chouar",
    addressLocality: "Beit Chabab",
    addressRegion: "Metn",
    addressCountry: "LB",
  },
  telephone: "+961-4-982082",
  faxNumber: "+961-4-985256",
  email: "info@lycee-montaigne.edu.lb",
  sameAs: [
    "https://www.facebook.com/LyceeMontaigneBeitChabab",
    "https://www.instagram.com/lyceemontaignebeitchabab/",
    "https://www.linkedin.com/school/lyc%C3%A9e-montaigne-beit-chabab/",
  ],
  numberOfStudents: 1085,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
