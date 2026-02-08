export interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

export const navigation: NavItem[] = [
  {
    label: "Accueil",
    href: "/",
    children: [
      { label: "Liens utiles", href: "/#liens-utiles" },
      { label: "Pourquoi l'enseignement français", href: "/#pourquoi" },
      { label: "Info à la une", href: "/#info-une" },
      { label: "Trait d'union", href: "/#trait-union" },
    ],
  },
  {
    label: "Établissement",
    href: "/etablissement",
    children: [
      { label: "Mission et Vision", href: "/etablissement#mission" },
      { label: "Mot de la cheffe", href: "/etablissement#chef" },
      {
        label: "Mot de la proviseure déléguée",
        href: "/etablissement#delegue",
      },
      { label: "Mot de la directrice", href: "/etablissement#directrice" },
      { label: "Comité des parents", href: "/etablissement#comite" },
      { label: "Règlement Intérieur", href: "/etablissement#reglement" },
      { label: "Instances", href: "/etablissement#instances" },
    ],
  },
  {
    label: "Excellence académique",
    href: "/excellence-academique",
    children: [
      { label: "Offre pédagogique", href: "/excellence-academique#pedagogie" },
      {
        label: "Examens et certificats",
        href: "/excellence-academique#resultats",
      },
      {
        label: "Projet d'établissement",
        href: "/excellence-academique#projet",
      },
      { label: "Parcours éducatifs", href: "/excellence-academique#parcours" },
      { label: "Pôle inclusion", href: "/excellence-academique#pole" },
      { label: "BCD - CCC", href: "/excellence-academique#bcd" },
    ],
  },
  {
    label: "Inscriptions et réinscriptions",
    href: "/inscriptions",
    children: [
      {
        label: "Inscriptions et réinscriptions",
        href: "/inscriptions#inscription",
      },
      { label: "Portes Ouvertes", href: "/inscriptions#porte-ouvertes" },
      { label: "Bourses Scolaires", href: "/inscriptions#bourse" },
    ],
  },
  {
    label: "Vie du LM",
    href: "/vie-du-lm",
    children: [
      { label: "Actualités", href: "/vie-du-lm#actualite" },
      { label: "Développement durable", href: "/vie-du-lm#dev" },
      { label: "Webradio", href: "/vie-du-lm#web" },
      { label: "Démocratie scolaire", href: "/vie-du-lm#climat" },
      { label: "Égalité", href: "/vie-du-lm#egalite" },
      { label: "Séjours", href: "/vie-du-lm#sejour" },
    ],
  },
  {
    label: "Orientation",
    href: "/orientation",
    children: [
      { label: "Parcours avenir", href: "/orientation#presentation" },
      { label: "Parcoursup", href: "/orientation#parcoursup" },
      { label: "Inscriptions Universités", href: "/orientation#uni" },
      { label: "Activités", href: "/orientation#activites" },
    ],
  },
  {
    label: "Extrascolaire",
    href: "/extrascolaire",
    children: [
      { label: "Activités périscolaires", href: "/extrascolaire#activite" },
      { label: "Association sportive", href: "/extrascolaire#action" },
    ],
  },
  {
    label: "Informations pratiques",
    href: "/informations-pratiques",
    children: [
      {
        label: "Calendrier scolaire",
        href: "/informations-pratiques#calendrier",
      },
      { label: "Listes de manuels", href: "/informations-pratiques#liste" },
      { label: "Restauration", href: "/informations-pratiques#restauration" },
      { label: "Santé", href: "/informations-pratiques#sante" },
      { label: "Recrutement", href: "/informations-pratiques#recrutement" },
    ],
  },
];
