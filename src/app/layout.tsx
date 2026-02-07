import type { Metadata } from "next";
import { Fraunces, Source_Sans_3 } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Lycee Montaigne -- Beit Chabab",
    template: "%s | Lycee Montaigne",
  },
  description:
    "Le Lycee Montaigne de Beit Chabab est un etablissement scolaire francophone au Liban, de la maternelle a la terminale.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Lycee Montaigne",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "School",
  name: "Lycee Montaigne",
  alternateName: "Lycee Montaigne Beit Chabab",
  url: "https://lycee-montaigne.edu.lb",
  description:
    "Etablissement scolaire francophone au Liban, de la maternelle a la terminale, homologue par le Ministere francais de l'Education nationale.",
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
    <html lang="fr" className={`${fraunces.variable} ${sourceSans.variable}`} suppressHydrationWarning>
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
