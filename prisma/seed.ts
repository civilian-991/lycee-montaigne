import { PrismaClient } from "@prisma/client";
import { hashSync } from "bcryptjs";

const db = new PrismaClient();

/* ================================================================
   COMPREHENSIVE SEED — Populates ALL CMS tables so zero hardcoded
   fallbacks are ever used on public pages.
   ================================================================ */

async function main() {
  console.log("🌱 Seeding database...\n");

  /* ── 1. Clean slate (keep users) ─────────────────────── */
  console.log("Cleaning existing data...");
  await db.alumniPhoto.deleteMany();
  await db.alumniEvent.deleteMany();
  await db.pageSection.deleteMany();
  await db.page.deleteMany();
  await db.carouselSlide.deleteMany();
  await db.quickLink.deleteMany();
  await db.newsItem.deleteMany();
  await db.staffMember.deleteMany();
  await db.certification.deleteMany();
  await db.document.deleteMany();
  await db.activityItem.deleteMany();
  await db.announcement.deleteMany();
  await db.governanceInstance.deleteMany();
  await db.menuItem.deleteMany();
  console.log("  Done.\n");

  /* ── 2. Admin user ───────────────────────────────────── */
  await db.user.upsert({
    where: { email: "admin@lycee-montaigne.edu.lb" },
    update: {},
    create: {
      email: "admin@lycee-montaigne.edu.lb",
      password: hashSync("admin123", 12),
      name: "Administrateur",
      role: "admin",
    },
  });
  console.log("Admin user ready.");

  /* ── 3. Site settings ────────────────────────────────── */
  const settings = [
    { key: "site_name", value: "Lycee Montaigne" },
    { key: "site_subtitle", value: "Beit Chabab" },
    { key: "email", value: "info@lycee-montaigne.edu.lb" },
    { key: "phone", value: "+961 4 982 082 / 983 845 / 985 256" },
    { key: "fax", value: "+961 4 985 256" },
    { key: "address", value: "Beit Chabab, Quartier Baydar Chouar, Metn, Liban" },
    { key: "facebook", value: "https://www.facebook.com/LyceeMontaigneBeitChabab" },
    { key: "instagram", value: "https://www.instagram.com/lyceemontaigne.liban/" },
    { key: "linkedin", value: "https://www.linkedin.com/school/lyc%C3%A9e-montaigne-beit-chabab/" },
    { key: "stat_eleves", value: "1085" },
    { key: "stat_reussite", value: "100%" },
    { key: "stat_nationalites", value: "29" },
    { key: "stat_langues", value: "3" },
  ];
  for (const s of settings) {
    await db.siteSetting.upsert({ where: { key: s.key }, update: { value: s.value }, create: s });
  }
  console.log("Site settings seeded.");

  /* ── 4. Carousel slides ──────────────────────────────── */
  const slides = [
    { imageUrl: "/images/hp-sliders/February2026/xsOXezH2jzRWmKTDo9zN.jpeg", altText: "Lycee Montaigne campus", order: 0 },
    { imageUrl: "/images/hp-sliders/February2026/xsOXezH2jzRWmKTDo9zN.jpeg", altText: "Vue aerienne du campus", order: 1 },
  ];
  for (const s of slides) {
    await db.carouselSlide.create({ data: s });
  }
  console.log("Carousel slides seeded.");

  /* ── 5. Quick links ──────────────────────────────────── */
  const quickLinks = [
    { label: "Inscriptions 2026-2027", url: "/inscriptions", target: "_self", order: 0 },
    { label: "Calendrier scolaire", url: "/informations-pratiques#calendrier", target: "_self", order: 1 },
    { label: "Menu Cantine", url: "/informations-pratiques#restauration", target: "_self", order: 2 },
    { label: "Pronote", url: "https://2050048n.index-education.net/pronote/", target: "_blank", order: 3 },
  ];
  for (const q of quickLinks) {
    await db.quickLink.create({ data: q });
  }
  console.log("Quick links seeded.");

  /* ── 6. News items ───────────────────────────────────── */
  const newsItems = [
    { title: "Inscriptions 2026-2027", image: "/images/hp-services-items/December2025/EZgt9SOFhrSnxoEsdD9t.png", link: "/inscriptions", category: "inscriptions" },
    { title: "Calendrier des examens officiels 2025-2026", image: "/images/hp-services-items/December2025/jB6WorbNeDHehA1SkNHp.png", link: "/informations-pratiques#calendrier", category: "examens" },
    { title: "Portes Ouvertes Maternelle", image: "/images/hp-services-items/January2026/T10fTkBuq4F4fN4HaND9.png", link: "/inscriptions#porte-ouvertes", category: "evenement" },
    { title: "Un nouveau batiment, une nouvelle etape", image: "/images/hp-services-items/November2025/n0ITOyY5hysOK9K70ztj.jpeg", link: "/etablissement", category: "etablissement" },
    { title: "Resultats 2024-2025", image: "/images/examens-resultats/January2026/resized_IMG_6942.PNG", link: "/excellence-academique#resultats", category: "resultats" },
    { title: "Nuits de la lecture", image: "/images/actualites/January2026/Gr126Yxp86fX8jQaSwnh.jpeg", link: null, category: "culture" },
  ];
  for (const n of newsItems) {
    await db.newsItem.create({ data: n });
  }
  console.log("News items seeded.");

  /* ── 7. Staff members ────────────────────────────────── */
  const staffMembers = [
    // Direction
    {
      name: "Mme Rachel Atallah",
      title: "Cheffe d'etablissement",
      photo: "/images/eta-s3/November2024/tN7I8Zm4bodDopvV14Hw.png",
      section: "direction",
      order: 1,
      messageHtml: "<p>Le Lycee Montaigne est un etablissement jeune et dynamique qui accueille pres de 1100 eleves de la maternelle a la terminale.</p>",
    },
    {
      name: "",
      title: "Proviseure deleguee",
      photo: "/images/mot-directrices/March2025/rLBOCUkYuoLx7jcdp3LE.jpeg",
      section: "direction",
      order: 2,
      messageHtml: "<p>Au Lycee Montaigne, nous mettons tout en oeuvre pour accompagner chaque eleve dans son parcours scolaire et personnel.</p>",
    },
    // Comite de parents
    {
      name: "Representants des parents",
      title: "Comite des parents d'eleves",
      photo: "/images/comite-parents/December2025/AaMNgQhtPtYL9V1v6MeP.jpeg",
      section: "comite",
      order: 1,
      messageHtml: "<p>Le comite des parents d'eleves du Lycee Montaigne est un partenaire essentiel de la communaute educative.</p>",
    },
    // BCD team
    { name: "Jennifer Bou Zeid", title: "Documentaliste arabe", photo: null, section: "bcd", order: 1, messageHtml: null },
    { name: "Leila Abboud", title: "Documentaliste francaise", photo: null, section: "bcd", order: 2, messageHtml: null },
    // Health staff
    { name: "Mme Jeanine Gharby", title: "Infirmiere", photo: null, section: "sante", order: 1, messageHtml: "<p>Soins quotidiens, suivi medical et education a la sante.</p>" },
    { name: "", title: "Medecin", photo: null, section: "sante", order: 2, messageHtml: "<p>Examen medical annuel pour tous les eleves.</p>" },
    { name: "", title: "Optometriste", photo: null, section: "sante", order: 3, messageHtml: "<p>Examen visuel annuel de depistage.</p>" },
    { name: "Dr Harbouk", title: "Dentiste", photo: null, section: "sante", order: 4, messageHtml: "<p>Education a l'hygiene bucco-dentaire et depistage.</p>" },
    // Alumni committee
    { name: "Yorgo Abou Haidar", title: "President", photo: null, section: "alumni", order: 1, messageHtml: null },
    { name: "Rebecca Maroun", title: "Vice-presidente", photo: null, section: "alumni", order: 2, messageHtml: null },
    { name: "Hayfa Ghandour Achkar", title: "Secretaire", photo: null, section: "alumni", order: 3, messageHtml: null },
    { name: "Andrea Abou Haidar", title: "Reseaux sociaux", photo: null, section: "alumni", order: 4, messageHtml: null },
    { name: "Matteo Kozak & Fay Haydamous", title: "Newsletter", photo: null, section: "alumni", order: 5, messageHtml: null },
    { name: "Maria Keuchgerian", title: "Evenements", photo: null, section: "alumni", order: 6, messageHtml: null },
    { name: "Marc Bejjani", title: "Tresorerie", photo: null, section: "alumni", order: 7, messageHtml: null },
  ];
  for (const s of staffMembers) {
    await db.staffMember.create({ data: s });
  }
  console.log("Staff members seeded.");

  /* ── 8. Certifications ───────────────────────────────── */
  const certifications = [
    { name: "Cambridge English Certificate", image: "/images/certificates/November2024/YutiYtDi0zuxMBPliMh3.jpeg", description: "Certification d'anglais de l'Universite de Cambridge", order: 1 },
    { name: "IELTS", image: "/images/certificates/November2024/efSpqghzlYYijlgfFavw.png", description: "International English Language Testing System", order: 2 },
    { name: "DELE", image: "/images/certificates/November2024/ViDy8mEJXK3IcwBFsWR8.png", description: "Diplomas de Espanol como Lengua Extranjera", order: 3 },
    { name: "PIX", image: "/images/certificates/November2024/Pg3enjuqnTHgxraxiYwT.png", description: "Certification des competences numeriques", order: 4 },
    { name: "SAT", image: "/images/certificates/November2024/XyKeUu4XU8MRwE5EwY4z.png", description: "Scholastic Assessment Test", order: 5 },
    { name: "CIMA", image: "/images/certificates/May2025/fD40mxinf2JZXQHf1GYq.webp", description: "Chartered Institute of Management Accountants", order: 6 },
  ];
  for (const c of certifications) {
    await db.certification.create({ data: c });
  }
  console.log("Certifications seeded.");

  /* ── 9. Documents ────────────────────────────────────── */
  const documents = [
    // Supply lists – Maternelle
    { title: "PS", fileUrl: "/images/list-files/August2025/LkbuRXzAEWZu6MgGs8ey.pdf", category: "fournitures-maternelle", academicYear: "2025-2026", order: 1 },
    { title: "MS", fileUrl: "/images/list-files/August2025/Nnn53vPsziSf7k51md1j.pdf", category: "fournitures-maternelle", academicYear: "2025-2026", order: 2 },
    { title: "GS", fileUrl: "/images/list-files/August2025/jFfpUNum1erRXyh4i7v5.pdf", category: "fournitures-maternelle", academicYear: "2025-2026", order: 3 },
    // Supply lists – Elementaire
    { title: "CP", fileUrl: "/images/list-files/August2025/xWLw8YK0awBY1hP5Pley.pdf", category: "fournitures-elementaire", academicYear: "2025-2026", order: 1 },
    { title: "CE1", fileUrl: "/images/list-files/August2025/YV5psty1jxoal41T9eUh.pdf", category: "fournitures-elementaire", academicYear: "2025-2026", order: 2 },
    { title: "CE2", fileUrl: "/images/list-files/August2025/NcpBMIHwSncNlGTjx0Fn.pdf", category: "fournitures-elementaire", academicYear: "2025-2026", order: 3 },
    { title: "CM1", fileUrl: "/images/list-files/August2025/RhX3VyydytAzxBma6xLI.pdf", category: "fournitures-elementaire", academicYear: "2025-2026", order: 4 },
    { title: "CM2", fileUrl: "/images/list-files/August2025/zqrlyg2PfGa0tSOQEAFL.pdf", category: "fournitures-elementaire", academicYear: "2025-2026", order: 5 },
    // Supply lists – College
    { title: "6eme", fileUrl: "/images/list-files/August2025/vbyAAnbd1ZHIwr5oP2f9.pdf", category: "fournitures-college", academicYear: "2025-2026", order: 1 },
    { title: "5eme", fileUrl: "/images/list-files/August2025/Ymu02aBD7P1r9kKc8p1i.pdf", category: "fournitures-college", academicYear: "2025-2026", order: 2 },
    { title: "4eme", fileUrl: "/images/list-files/August2025/H6LXNQFNdH66zsHeZ9um.pdf", category: "fournitures-college", academicYear: "2025-2026", order: 3 },
    { title: "3eme", fileUrl: "/images/list-files/August2025/4YbiS8nrl2hX5ODfohLG.pdf", category: "fournitures-college", academicYear: "2025-2026", order: 4 },
    // Supply lists – Lycee
    { title: "Seconde", fileUrl: "/images/list-files/August2025/r7Nnhm43huO61dv6Ih9L.pdf", category: "fournitures-lycee", academicYear: "2025-2026", order: 1 },
    { title: "Premiere", fileUrl: "/images/list-files/August2025/j51nEsAzVsi257npEwZg.pdf", category: "fournitures-lycee", academicYear: "2025-2026", order: 2 },
    { title: "Terminale", fileUrl: "/images/list-files/September2025/l6PgNMwCKnEgx4pF25kO.pdf", category: "fournitures-lycee", academicYear: "2025-2026", order: 3 },
    // Calendrier scolaire
    { title: "Calendrier scolaire 2025-2026", fileUrl: "/images/calendrier-scolaires/August2025/VNpHBW2LnqOi8ZjeTJpD.pdf", category: "calendrier-scolaire", academicYear: "2025-2026", order: 1 },
    // Examens officiels
    { title: "Examens officiels 2025-2026", fileUrl: "/images/examens-officiels/December2025/N8h4O64ek0R28q9ArxEL.pdf", category: "examens-officiels", academicYear: "2025-2026", order: 1 },
    // Restauration
    { title: "Menu Cantine", fileUrl: "/images/restauration-files/January2026/mpYrj6lfFbbmG89EhsCF.pdf", category: "restauration", academicYear: "2025-2026", order: 1 },
    { title: "Menu Kiosque", fileUrl: "/images/restauration-files/September2025/Yi7GGMLiugwxHhD02Xek.pdf", category: "restauration", academicYear: "2025-2026", order: 2 },
    // Recrutement
    { title: "Formulaire de recrutement", fileUrl: "https://lycee-montaigne.datarays.co/Employee", category: "recrutement", academicYear: "2025-2026", order: 1 },
    // Inscription documents
    { title: "Carnet de vaccination et fiche medicale", fileUrl: "#", category: "inscription-documents", academicYear: "2026-2027", order: 1 },
    { title: "Deux photos d'identite", fileUrl: "#", category: "inscription-documents", academicYear: "2026-2027", order: 2 },
    { title: "Pieces d'identite (libanaises, binationales ou etrangeres)", fileUrl: "#", category: "inscription-documents", academicYear: "2026-2027", order: 3 },
    { title: "Attestation scolaire de l'etablissement actuel", fileUrl: "#", category: "inscription-documents", academicYear: "2026-2027", order: 4 },
    { title: "Bulletins scolaires de l'annee en cours et de l'annee precedente", fileUrl: "#", category: "inscription-documents", academicYear: "2026-2027", order: 5 },
    { title: "Pour le secondaire : copie du Brevet Libanais", fileUrl: "#", category: "inscription-documents", academicYear: "2026-2027", order: 6 },
    { title: "Dispense d'arabe le cas echeant", fileUrl: "#", category: "inscription-documents", academicYear: "2026-2027", order: 7 },
    { title: "Jugement de divorce avec garde le cas echeant", fileUrl: "#", category: "inscription-documents", academicYear: "2026-2027", order: 8 },
    // Orientation calendars
    { title: "Calendrier d'orientation annuel des eleves de Terminale", fileUrl: "/images/calenders/October2025/Lx0wFEvWtizsi6yOH2q1.pdf", category: "orientation-calendrier", academicYear: "2025-2026", order: 1 },
    { title: "Calendrier d'orientation annuel des eleves de 1ere", fileUrl: "/images/calenders/September2025/KwWpmr2QDmyQQPjalcUG.pdf", category: "orientation-calendrier", academicYear: "2025-2026", order: 2 },
    { title: "Calendrier d'orientation annuel des eleves de 2de", fileUrl: "/images/calenders/October2025/lXqdceNiOj3Pz9DpwBO7.pdf", category: "orientation-calendrier", academicYear: "2025-2026", order: 3 },
    // Orientation Parcoursup docs
    { title: "Brochure Salon AGORA Monde AEFE", fileUrl: "/images/orientation-s4-files/December2025/xxgQMty00QT31a5oJWY1.pdf", category: "orientation-parcoursup", academicYear: "2025-2026", order: 1 },
    { title: "Programme", fileUrl: "/images/orientation-s4-files/November2025/9ZYRV7SE9LloT6ZtYA5J.pdf", category: "orientation-parcoursup", academicYear: "2025-2026", order: 2 },
    { title: "Calendrier Parcoursup 2025-2026", fileUrl: "/images/orientation-s4-files/November2025/sii8vo2EC7jjb93vkb6h.pdf", category: "orientation-parcoursup", academicYear: "2025-2026", order: 3 },
  ];
  for (const d of documents) {
    await db.document.create({ data: d });
  }
  console.log("Documents seeded.");

  /* ── 10. Activity items ──────────────────────────────── */
  const activities = [
    // BCD activities
    { title: "Decouverte de la litterature", description: "Explorations litteraires variees comme 'Comment j'ai change ma vie' pour eveiller la curiosite des lecteurs.", image: "/images/bcd-ccc-activities/November2025/uJc8mo3uFntTF5807HcA.jpg", category: "bcd", order: 1 },
    { title: "Commedia dell'arte", description: "Exploration de la commedia dell'arte avec les CM1, melant lecture, theatre et decouverte culturelle italienne.", image: "/images/bcd-ccc-activities/November2025/5aFOcCygmmCCNsJ5i77o.jpg", category: "bcd", order: 2 },
    { title: "Spectacle de marionnettes", description: "Spectacles de marionnettes pour les maternelles, alliant narration et art visuel pour les plus jeunes.", image: "/images/bcd-ccc-activities/November2025/XUHDsG37R1DsVLDHQTus.jpg", category: "bcd", order: 3 },
    { title: "Lecture en mouvement", description: "Activites de lecture en mouvement combinant expression corporelle et decouverte de textes.", image: "/images/bcd-ccc-activities/November2025/PF5zFTuWOokRWkUk2sTw.jpg", category: "bcd", order: 4 },
    { title: "Nuits de la Lecture", description: "Evenement festif dedie a la lecture, avec animations nocturnes et decouvertes litteraires pour toute la communaute.", image: "/images/bcd-ccc-activities/May2025/A8B44PA9Uf7SSRXFWtiH.jpeg", category: "bcd", order: 5 },
    { title: "Droits de l'enfant", description: "Projet sur les droits de l'enfant a travers la litterature jeunesse et les echanges en classe.", image: "/images/bcd-ccc-activities/May2025/qHFqUnIkY9Uxb0Xo1x10.jpg", category: "bcd", order: 6 },
    { title: "Silence, on lit !", description: "Temps de lecture silencieuse quotidien ou toute la communaute scolaire partage un moment de lecture.", image: "/images/bcd-ccc-activities/March2025/cpcffW6KpE8O5Sut2wrH.png", category: "bcd", order: 7 },
    { title: "Cercle de lecture", description: "Cercles de lecture permettant aux eleves d'echanger, debattre et partager leurs coups de coeur litteraires.", image: "/images/bcd-ccc-activities/March2025/GclzoDEQpepHmSongJrP.png", category: "bcd", order: 8 },
    // CCC activities
    { title: "Rentree litteraire", description: "Celebration de la rentree litteraire avec decouverte des nouveautes, coups de coeur des documentalistes et mises en avant thematiques.", image: "/images/bcd-ccc-activities/October2025/wFv9DxTPfPBBSkAPj5Mg.jpeg", category: "ccc", order: 1 },
    { title: "Hommage a Henri Zoghaib", description: "Hommage au poete libanais Henri Zoghaib avec lectures, performances d'eleves et exploration de son oeuvre litteraire.", image: "/images/bcd-ccc-activities/August2025/AhQJx4qBNekBpGeyjMwR.jpeg", category: "ccc", order: 2 },
    { title: "Semaine de la presse et des medias", description: "Semaine dediee a l'education aux medias : analyse de la presse, ateliers d'ecriture journalistique et debats sur l'information.", image: "/images/bcd-ccc-activities/August2025/6WkTnG0H4jldI5KagUt0.png", category: "ccc", order: 3 },
    { title: "Nuits de la Lecture, 9eme edition", description: "La 9eme edition des Nuits de la Lecture sur le theme du patrimoine : lectures a voix haute, rencontres et ateliers creatifs.", image: "/images/bcd-ccc-activities/May2025/fmjdjk2fwuGQDkpDyS63.jpeg", category: "ccc", order: 4 },
    { title: "Journee de la langue arabe", description: "Celebration de la langue arabe a travers des activites culturelles, des lectures poetiques et des ateliers de calligraphie.", image: "/images/bcd-ccc-activities/May2025/5ud7anyWXrlJ1RhWxD8s.jpeg", category: "ccc", order: 5 },
    { title: "Semaine des lycees francais du monde", description: "Participation au reseau AEFE avec des projets collaboratifs, des echanges interculturels et des evenements fedateurs.", image: "/images/bcd-ccc-activities/May2025/XVqppxZDQpQf1Xi0ECqQ.jpg", category: "ccc", order: 6 },
    { title: "Cercle de lecture", description: "Rencontres regulieres entre lecteurs pour partager, debattre et approfondir la lecture d'oeuvres choisies collectivement.", image: "/images/excellence-bcd-ccc-extras/March2025/rH1Pp2VNCmOq42KoG7Rm.jpeg", category: "ccc", order: 7 },
    // Orientation activities
    { title: "Forum des universites — 14 novembre 2025", description: "18 universites et 12 grandes ecoles ont participe a cette journee, offrant 30 sources d'inspiration a nos eleves.", image: "/images/oriantation-activities/November2025/0HnUrhMFu9ReUOd5Dcbs.jpeg", category: "orientation", order: 1 },
    { title: "Forum des Metiers — 22 mars 2025", description: "Medecine, ingenierie, droit, communication, entrepreneuriat — des professionnels ont partage leurs parcours et conseils.", image: "/images/oriantation-activities/July2025/xKaDU1qKXJrvkFI8kJc3.jpeg", category: "orientation", order: 2 },
    { title: "Forum des universites — 20 decembre 2024", description: "Journee d'echanges avec les representants des universites locales et internationales.", image: "/images/oriantation-activities/July2025/E74I8wu2UsLKK4EImXJU.jpeg", category: "orientation", order: 3 },
    // Periscolaire activities
    { title: "Activites periscolaires", description: "Activites periscolaires variees pour les eleves apres les heures de cours.", image: "/images/activites-prescolaires/May2025/vjpXai9c7VbVIINjggcN.jpeg", category: "periscolaire", order: 1 },
    // Sports activities
    { title: "Association sportive", description: "Programme sportif complet avec competitions inter-etablissements.", image: "/images/actions-sportives/May2025/MJzrvOmYO8rmdfoypZDR.jpeg", category: "sportive", order: 1 },
  ];
  for (const a of activities) {
    await db.activityItem.create({ data: a });
  }
  console.log("Activity items seeded.");

  /* ── 11. Pages + Sections ────────────────────────────── */

  // Helper to create a page with its sections
  async function seedPage(slug: string, title: string, sections: { sectionKey: string; title?: string; contentHtml?: string; image?: string; order: number }[]) {
    const page = await db.page.create({ data: { slug, title } });
    for (const s of sections) {
      await db.pageSection.create({
        data: {
          pageId: page.id,
          sectionKey: s.sectionKey,
          title: s.title ?? null,
          contentHtml: s.contentHtml ?? null,
          image: s.image ?? null,
          order: s.order,
        },
      });
    }
    return page;
  }

  // ─── Etablissement ───
  await seedPage("etablissement", "Etablissement", [
    {
      sectionKey: "mission",
      title: "Notre Mission",
      contentHtml: "<p>Le Lycee Montaigne est un etablissement francais a l'etranger, membre du reseau MLF (Mission Laique Francaise). Notre mission est de proposer un enseignement d'excellence dans un cadre multiculturel et bienveillant.</p>",
      image: "/images/eta-s2/November2024/kS2xRaJfz5u5hTJYdlVW.jpeg",
      order: 1,
    },
  ]);
  console.log("  Page: etablissement");

  // ─── Excellence Academique ───
  await seedPage("excellence-academique", "Excellence Academique", [
    {
      sectionKey: "diplomas",
      title: "Diplomes et Certifications",
      contentHtml: JSON.stringify([
        { name: "Diplome National du Brevet (DNB)", type: "Francais" },
        { name: "Brevet Libanais", type: "Libanais" },
        { name: "Bac Francais", type: "Francais" },
        { name: "Bac Libanais", type: "Libanais" },
        { name: "Bac Francais International (BFI)", type: "International" },
      ]),
      order: 1,
    },
    {
      sectionKey: "axes",
      title: "Axes Strategiques",
      contentHtml: JSON.stringify([
        {
          title: "Assurer un parcours d'excellence a tous les eleves",
          num: "01",
          items: [
            "Renforcer la maitrise de la langue francaise",
            "Developper les competences en langues vivantes",
            "Promouvoir les sciences et la culture numerique",
            "Favoriser les parcours artistiques et culturels",
            "Accompagner chaque eleve vers sa reussite",
            "Renforcer l'evaluation formative",
          ],
          image: "/images/axes/April2024/Fn1kk4j4j4fhc0yTmXkP.png",
        },
        {
          title: "Accompagner la montee en puissance du Lycee Montaigne",
          num: "02",
          items: [
            "Developper une politique d'attractivite",
            "Renforcer la communication interne et externe",
            "Moderniser les pratiques pedagogiques",
            "Optimiser la gestion des ressources",
            "Developper les partenariats",
          ],
          image: "/images/axes/April2024/hqG7U0znrO7cPD9llXWC.png",
        },
        {
          title: "Cultiver l'identite humaniste de l'etablissement",
          num: "03",
          items: [
            "Promouvoir les valeurs de tolerance et de respect",
            "Developper l'eco-citoyennete",
            "Renforcer l'egalite filles-garcons",
            "Favoriser l'inclusion et la diversite",
            "Developper le sentiment d'appartenance",
          ],
          image: "/images/axes/April2024/03oaImjGLsLUMIf7Ydtb.png",
        },
      ]),
      order: 2,
    },
    {
      sectionKey: "parcours",
      title: "Parcours Educatifs",
      contentHtml: JSON.stringify([
        { title: "Parcours citoyen", description: "Formation du citoyen responsable et engage, participation a la vie democratique de l'etablissement.", icon: "Compass" },
        { title: "Parcours Avenir", description: "Orientation et decouverte du monde professionnel des la 6eme jusqu'a la terminale.", icon: "GraduationCap" },
        { title: "Parcours educatif de sante", description: "Education a la sante, prevention et protection des eleves tout au long de leur scolarite.", icon: "Heart" },
        { title: "Parcours d'education artistique et culturelle", description: "Rencontre avec les oeuvres, pratique artistique et acquisition de connaissances culturelles.", icon: "Palette" },
      ]),
      order: 3,
    },
  ]);
  console.log("  Page: excellence-academique");

  // ─── Vie du LM ───
  await seedPage("vie-du-lm", "Vie du LM", [
    {
      sectionKey: "developpement-durable",
      title: "Developpement durable",
      contentHtml: "<p>Depuis sa creation en 2012, le Lycee Montaigne s'engage en faveur du developpement durable et de l'eco-citoyennete. Notre demarche vise a former des citoyens responsables et conscients des enjeux environnementaux.</p><p><strong>Label EFE3D Niveau Expert</strong></p><p>Referents : Mme Roula Chalabi (1er degre), M. Robert Sreih (2nd degre)</p>",
      image: "/images/development-durables/November2024/IXjTyiAwx79KnYFRYWvR.jpg",
      order: 1,
    },
    {
      sectionKey: "webradio",
      title: "Webradio",
      contentHtml: "<p>La webradio du Lycee Montaigne est un projet educatif qui permet aux eleves de developper leurs competences en communication, expression orale et travail d'equipe. Les eleves produisent des emissions sur des sujets varies.</p><p>Referentes : Mme Leila Abboud (1er degre), Mme Joelle Maalouf (2nd degre)</p>",
      image: "/images/webradios/November2024/amxLKLrgOzIeBoHAVT4x.jpeg",
      order: 2,
    },
    {
      sectionKey: "climat",
      title: "Democratie scolaire",
      contentHtml: "<p>Le Lycee Montaigne favorise la participation active des eleves a travers les instances de democratie scolaire : conseil de vie collegienne (CVC), conseil de vie lyceenne (CVL), et elections de delegues.</p>",
      image: "/images/climat-categories/April2025/mNHwl4NOWUZkZgPfyTNi.jpeg",
      order: 3,
    },
    {
      sectionKey: "egalite",
      title: "Egalite",
      contentHtml: "<p>Conformement a la politique de l'AEFE, le Lycee Montaigne s'inscrit dans une demarche active de promotion de l'egalite entre les filles et les garcons et de lutte contre les stereotypes.</p>",
      image: "/images/egalite-intros/October2024/7QOD9LQ0ZmvqaH1ck4qJ.jpg",
      order: 4,
    },
  ]);
  console.log("  Page: vie-du-lm");

  // ─── Pole Inclusion ───
  await seedPage("pole-inclusion", "Pole Inclusion", [
    {
      sectionKey: "intro",
      title: "Eleves a Besoins Educatifs Particuliers",
      contentHtml: "<p>Le Lycee Montaigne s'engage pour l'inclusion de tous les eleves. Notre pole inclusion accompagne les eleves a besoins educatifs particuliers (EBEP) tout au long de leur parcours scolaire, de la maternelle a la terminale.</p><p>Notre approche repose sur le regard positif porte sur chaque personne et la confiance dans l'educabilite de chacun, quels que soient ses besoins specifiques.</p>",
      image: "/images/vie-s1/November2024/GS7jV1MyA75tAjglBQcx.jpg",
      order: 1,
    },
    {
      sectionKey: "accompagnement",
      title: "Accompagnement personnalise",
      contentHtml: "<p>Chaque eleve beneficie d'un suivi adapte a ses besoins specifiques, avec des dispositifs pedagogiques individualises.</p>",
      order: 2,
    },
    {
      sectionKey: "equipe",
      title: "Equipe pluridisciplinaire",
      contentHtml: "<p>Enseignants, psychologue, orthophoniste et educateurs travaillent ensemble pour le bien-etre de l'eleve.</p>",
      order: 3,
    },
    {
      sectionKey: "amenagements",
      title: "Amenagements pedagogiques",
      contentHtml: "<p>PAP, PPS, PAI : des plans adaptes pour garantir l'acces aux apprentissages de tous les eleves.</p>",
      order: 4,
    },
    {
      sectionKey: "bienveillance",
      title: "Bienveillance et respect",
      contentHtml: "<p>Un cadre inclusif ou chaque difference est accueillie comme une richesse pour la communaute scolaire.</p>",
      order: 5,
    },
  ]);
  console.log("  Page: pole-inclusion");

  // ─── Sejours Pedagogiques ───
  await seedPage("sejours-pedagogiques", "Sejours Pedagogiques", [
    {
      sectionKey: "intro",
      title: "Voyages et sejours",
      contentHtml: "<p>Le Lycee Montaigne organise des sejours pedagogiques et des voyages scolaires qui enrichissent le parcours educatif des eleves. Ces experiences favorisent l'ouverture culturelle, l'autonomie et la cohesion de groupe.</p><p>De la decouverte du patrimoine local aux echanges internationaux, chaque sejour est concu pour prolonger les apprentissages en classe et offrir aux eleves des experiences inoubliables.</p>",
      image: "/images/actions-sportives/May2025/5AyqpqwCqoBIFxIXphFP.jpeg",
      order: 1,
    },
    {
      sectionKey: "ligue-sportive",
      title: "Ligue sportive AEFE-UNSS",
      contentHtml: "<p>Les eleves du Lycee Montaigne participent aux competitions sportives inter-etablissements dans le cadre de la ligue sportive AEFE-UNSS, offrant des opportunites de rencontres sportives au niveau regional et international.</p>",
      order: 2,
    },
  ]);
  console.log("  Page: sejours-pedagogiques");

  // ─── Inscriptions ───
  await seedPage("inscriptions", "Inscriptions et Reinscriptions", [
    {
      sectionKey: "procedure",
      title: "Procedure d'inscription 2026-2027",
      contentHtml: "<p>Pour inscrire votre enfant au Lycee Montaigne, veuillez preparer les documents suivants :</p><ul><li>Carnet de vaccination et fiche medicale</li><li>Deux photos d'identite</li><li>Pieces d'identite (libanaises, binationales ou etrangeres)</li><li>Attestation scolaire de l'etablissement actuel</li><li>Bulletins scolaires de l'annee en cours et de l'annee precedente</li><li>Pour le secondaire : copie du Brevet Libanais</li><li>Dispense d'arabe le cas echeant</li><li>Jugement de divorce avec garde le cas echeant</li></ul>",
      image: "/images/adm-s1/December2025/xbMaFrODRj51WGOcKi4k.png",
      order: 1,
    },
    {
      sectionKey: "portes-ouvertes",
      title: "Portes Ouvertes Maternelle",
      contentHtml: "<p>Venez decouvrir notre ecole maternelle lors de nos journees portes ouvertes. Un moment d'accueil, de visite des locaux et d'echanges avec l'equipe pedagogique vous attend.</p><p><strong>Prochaines portes ouvertes</strong><br/>Consultez nos reseaux sociaux pour les dates a venir.</p>",
      image: "/images/s4-files/January2026/U4IfChjnxOFzmzse6Tme.jpeg",
      order: 2,
    },
    {
      sectionKey: "bourses",
      title: "Bourses Scolaires",
      contentHtml: "<p>Les bourses scolaires sont destinees aux enfants francais residant a l'etranger. Elles permettent de couvrir tout ou partie des frais de scolarite dans les etablissements d'enseignement francais a l'etranger.</p><p>Pour plus d'informations sur les conditions d'eligibilite et la procedure de demande, veuillez consulter le site de l'AEFE ou contacter l'ambassade de France au Liban.</p>",
      image: "/images/adm-s3/November2024/VOFelUKYIHWGosCjXmsz.png",
      order: 3,
    },
  ]);
  console.log("  Page: inscriptions");

  // ─── Orientation ───
  await seedPage("orientation", "Orientation", [
    {
      sectionKey: "parcours-avenir",
      title: "Parcours Avenir",
      contentHtml: "<p>Le parcours Avenir permet a chaque eleve de la 6eme a la Terminale de construire progressivement son orientation et de decouvrir le monde economique et professionnel.</p>",
      order: 1,
    },
    {
      sectionKey: "parcoursup",
      title: "Parcoursup",
      contentHtml: "<p>Parcoursup est la plateforme nationale de preinscription en premiere annee de l'enseignement superieur en France. Nos eleves sont accompagnes tout au long de la procedure.</p>",
      order: 2,
    },
    {
      sectionKey: "admissions",
      title: "Admissions post-bac",
      contentHtml: "<p>Le Lycee Montaigne accompagne ses eleves dans leurs demarches d'admission dans les universites libanaises et internationales. Nos resultats temoignent de l'excellence de la preparation.</p>",
      order: 3,
    },
    {
      sectionKey: "admissions-images",
      title: "Resultats Admissions",
      contentHtml: JSON.stringify([
        "/images/oriantation-activities/August2025/jGcBleXqGThjKsghZXBQ.jpeg",
        "/images/oriantation-activities/August2025/cZJX6xPO7h3xZDULgEXn.jpeg",
        "/images/oriantation-activities/August2025/Vuu9x02s0E1dfDfps58b.jpeg",
        "/images/oriantation-activities/August2025/XMhQO1k8tKpQaRhCt5AY.jpeg",
      ]),
      order: 4,
    },
    {
      sectionKey: "universites",
      title: "Universites partenaires",
      contentHtml: JSON.stringify([
        { name: "USJ", image: "/images/inscriptions-universites/April2024/IKh5ECmCosO0wEXbHJfE.png", url: "https://usj.edu.lb/e-doors/" },
        { name: "AUB", image: "/images/inscriptions-universites/April2024/mNyKwjEsKTILxE3Drypm.png", url: "https://www.aub.edu.lb/admissions/Pages/default.aspx" },
        { name: "NDU", image: "/images/inscriptions-universites/April2024/rRdze9NpnGrIp1CoPCfh.png", url: "https://www.ndu.edu.lb/apply" },
        { name: "LAU", image: "/images/inscriptions-universites/April2024/ElIddwesq0I3p3yO7Ppy.png", url: "https://www.lau.edu.lb/apply/first-time-applicant.php" },
        { name: "Balamand", image: "/images/inscriptions-universites/April2024/S6u02K7LW9Efb3cW531z.png", url: "https://www.balamand.edu.lb/ProspectiveStudents/Pages/UndergraduateAdmissions.aspx" },
        { name: "ALBA", image: "/images/inscriptions-universites/April2024/w9Jj9IYMat0esXyFAhkV.png", url: "https://alba.edu.lb/sites/ALBA1/InsAdm/Pages/default.aspx" },
        { name: "ESA", image: "/images/inscriptions-universites/September2025/bLasgg76UCYQgBL3mWiI.png", url: "https://www.esa.edu.lb/french/formation-diplomante/bachelor-in-business-administration" },
        { name: "USEK", image: "/images/inscriptions-universites/September2025/lZIXpZMUVtKqPWMmtWRZ.jpg", url: "https://www.usek.edu.lb/en/admission/online-admission-requirements" },
        { name: "UCAS", image: "/images/inscriptions-universites/September2025/OgIG56RFszFpJXrX2ayB.png", url: "https://www.ucas.com/applying" },
        { name: "Common App", image: "/images/inscriptions-universites/September2025/IOb6uT1ImkYMoE7MKong.png", url: "https://www.commonapp.org/" },
      ]),
      order: 5,
    },
    {
      sectionKey: "cta",
      title: "Besoin d'aide pour votre orientation ?",
      contentHtml: "<p>Notre equipe d'orientation est a votre disposition pour vous accompagner dans vos choix.</p>",
      order: 6,
    },
  ]);
  console.log("  Page: orientation");

  // ─── Offre Maternelle ───
  await seedPage("offre-maternelle", "Ecole Maternelle", [
    {
      sectionKey: "overview",
      title: "Le chemin de l'avenir commence ici.",
      contentHtml: "<p>L'ecole maternelle constitue un cycle unique d'enseignement fondamental pour les enfants de 3 a 5 ans. Ce premier pas dans le parcours scolaire est essentiel pour garantir la reussite de tous les eleves.</p><p>Au Lycee Montaigne, la maternelle accueille les enfants dans un environnement bienveillant et stimulant ou ils developpent progressivement leur autonomie et acquierent les competences fondamentales qui les accompagneront tout au long de leur scolarite.</p>",
      image: "/images/offre-pedagogiques/September2025/RYKcgYOvU9hKhJWzsKpe.jpeg",
      order: 1,
    },
    {
      sectionKey: "secondary-image",
      image: "/images/offre-pedagogiques/September2025/EKkMhqWAkoI1bJlFPWHz.jpeg",
      order: 2,
    },
    {
      sectionKey: "philosophy",
      title: "Philosophie pedagogique",
      contentHtml: "<p>L'ecole maternelle constitue la premiere etape fondamentale pour garantir la reussite des eleves. Elle integre des methodes d'apprentissage diversifiees — resolution de problemes, exercices pratiques, memorisation — avec le jeu comme element central de la pedagogie. Chaque enfant apprend a son rythme dans un cadre securisant et adapte.</p>",
      order: 3,
    },
    {
      sectionKey: "domains",
      title: "Domaines d'apprentissage",
      contentHtml: JSON.stringify([
        { title: "Mobiliser le langage dans toutes ses dimensions", description: "Developper l'expression orale et ecrite, decouvrir la fonction de l'ecrit, enrichir le vocabulaire et preparer l'apprentissage de la lecture.", icon: "BookOpen" },
        { title: "Agir, s'exprimer, comprendre a travers l'activite physique", description: "Explorer les possibilites corporelles, cooperer, s'engager dans des activites motrices et developper la coordination.", icon: "Users" },
        { title: "Agir, s'exprimer, comprendre a travers les activites artistiques", description: "Developper la sensibilite, l'imagination et la creativite a travers les arts visuels, la musique et les spectacles vivants.", icon: "Music" },
        { title: "Acquerir les premiers outils mathematiques", description: "Decouvrir les nombres, les formes, les grandeurs et les reperes spatiaux a travers la manipulation et le jeu.", icon: "Calculator" },
        { title: "Explorer le monde", description: "Decouvrir le vivant, la matiere, les objets, le temps et l'espace pour construire les premiers reperes sur le monde environnant.", icon: "Compass" },
      ]),
      order: 4,
    },
    {
      sectionKey: "gallery",
      title: "Galerie",
      contentHtml: JSON.stringify([
        "/images/offre-pedagogiques/September2025/oIEoavvupzlerr5CcMSB.jpeg",
        "/images/offre-pedagogiques/September2025/S0xrz6K0KeHsdpg8Lf5d.jpeg",
        "/images/offre-pedagogiques/September2025/DrXjEoJLUP0UhTAzSdfI.jpeg",
        "/images/offre-pedagogiques/September2025/xGr2TekFXQInfCueF24P.jpeg",
        "/images/offre-pedagogiques/September2025/1L4Qqu5svW8SNhI93fis.jpeg",
      ]),
      order: 5,
    },
  ]);
  console.log("  Page: offre-maternelle");

  // ─── Offre Elementaire ───
  await seedPage("offre-elementaire", "Ecole Elementaire", [
    {
      sectionKey: "overview",
      title: "Construire les fondations de la reussite.",
      contentHtml: "<p>L'ecole elementaire du Lycee Montaigne offre un parcours structure de cinq annees ou les eleves acquierent les fondamentaux en lecture, ecriture et mathematiques. Ces apprentissages constituent le socle de leur reussite academique future.</p><p>A travers deux cycles complementaires, les eleves developpent leur esprit critique, leur curiosite intellectuelle et leur conscience de l'environnement, tout en renforcant progressivement leur autonomie et leurs competences sociales.</p>",
      image: "/images/offre-pedagogiques/November2024/Y7T7wBDtRqLzZ0v4BIFD.jpg",
      order: 1,
    },
    {
      sectionKey: "secondary-image",
      image: "/images/offre-pedagogiques/March2025/FMajMIbeBmTj2pZsVXg2.png",
      order: 2,
    },
    {
      sectionKey: "cycles",
      title: "Cycles d'apprentissage",
      contentHtml: JSON.stringify([
        { name: "Cycle 2", levels: "CP – CE1 – CE2", description: "Le cycle des apprentissages fondamentaux met l'accent sur la curiosite et l'interaction avec l'environnement. Les eleves apprennent a lire, ecrire et compter tout en developpant leur creativite et leur gout pour la decouverte." },
        { name: "Cycle 3", levels: "CM1 – CM2", description: "Le cycle de consolidation fait le lien entre l'ecole primaire et le college. Il renforce les fondamentaux en francais, mathematiques et anglais, et prepare les eleves a une plus grande autonomie dans les apprentissages." },
      ]),
      order: 3,
    },
    {
      sectionKey: "enrichment",
      title: "Activites d'enrichissement",
      contentHtml: JSON.stringify([
        "Projets pedagogiques interdisciplinaires",
        "Activites artistiques et culturelles",
        "Initiation sportive et education physique",
        "Decouvertes scientifiques et experimentations",
        "Sorties de terrain et visites culturelles",
        "Conferences et rencontres educatives",
      ]),
      order: 4,
    },
    {
      sectionKey: "key-features",
      title: "Points forts",
      contentHtml: JSON.stringify([
        "Integration des sciences humaines et sociales",
        "Developpement de l'esprit critique des la primaire",
        "Acquisition de bonnes habitudes de travail",
        "Apprentissage de l'argumentation et du debat",
        "Construction progressive de l'autonomie",
        "Maitrise des outils numeriques de base",
      ]),
      order: 5,
    },
  ]);
  console.log("  Page: offre-elementaire");

  // ─── Offre College ───
  await seedPage("offre-college", "College", [
    {
      sectionKey: "overview",
      title: "Developper l'autonomie et la pensee critique.",
      contentHtml: "<p>Le college du Lycee Montaigne accompagne les eleves de la 6eme a la 3eme dans le systeme secondaire francais. C'est une periode charniere ou les jeunes developpent leur autonomie intellectuelle avec des enseignants specialises par matiere.</p><p>A travers des competitions academiques, des voyages educatifs, des projets collaboratifs et le developpement de la pensee critique, nos eleves acquierent les competences necessaires pour reussir au lycee et au-dela.</p>",
      image: "/images/offre-pedagogiques/November2024/0EbCvhFl2VOnVhsAYtA3.jpeg",
      order: 1,
    },
    {
      sectionKey: "secondary-image",
      image: "/images/offre-pedagogiques/March2025/V5TaePZh3OK30gBE0zGt.png",
      order: 2,
    },
    {
      sectionKey: "key-features",
      title: "Points forts",
      contentHtml: JSON.stringify([
        "Enseignants specialises par discipline",
        "Competitions academiques et olympiades",
        "Voyages educatifs et echanges culturels",
        "Projets collaboratifs interdisciplinaires",
        "Developpement de la pensee critique",
        "Preparation au Diplome National du Brevet",
      ]),
      order: 3,
    },
    {
      sectionKey: "dnb",
      title: "Diplome National du Brevet",
      contentHtml: "<p>Le Diplome National du Brevet (DNB) est le premier examen national que passent les eleves en fin de 3eme. Il evalue la maitrise du socle commun de connaissances, de competences et de culture, et comprend des epreuves ecrites et une epreuve orale.</p>",
      order: 4,
    },
    {
      sectionKey: "dnb-exams",
      title: "Epreuves du DNB",
      contentHtml: JSON.stringify([
        { subject: "Francais", description: "Epreuve ecrite evaluant la comprehension, l'analyse de texte et la maitrise de la langue ecrite.", icon: "BookOpen" },
        { subject: "Mathematiques", description: "Epreuve ecrite testant le raisonnement logique, la resolution de problemes et les competences calculatoires.", icon: "Calculator" },
        { subject: "Histoire-Geographie et EMC", description: "Epreuve ecrite portant sur les reperes historiques, geographiques et l'enseignement moral et civique.", icon: "Globe" },
        { subject: "Sciences", description: "Epreuve ecrite couvrant deux matieres parmi les sciences de la vie et de la Terre, la physique-chimie et la technologie.", icon: "FlaskConical" },
        { subject: "Epreuve orale", description: "Soutenance d'un projet mene dans le cadre des EPI ou des parcours educatifs, evaluant l'expression et l'argumentation.", icon: "Users" },
      ]),
      order: 5,
    },
  ]);
  console.log("  Page: offre-college");

  // ─── Offre Lycee ───
  await seedPage("offre-lycee", "Lycee", [
    {
      sectionKey: "overview",
      title: "Vers l'excellence et l'enseignement superieur.",
      contentHtml: "<p>Le lycee du Lycee Montaigne offre un parcours de trois annees — Seconde, Premiere et Terminale — qui prepare les eleves au baccalaureat et a la poursuite d'etudes superieures. C'est le moment ou chaque eleve affine ses choix d'orientation.</p><p>Les eleves explorent d'abord un large eventail de matieres en Seconde avant de se specialiser progressivement. Des programmes de certifications internationales et d'exploration professionnelle completent la formation academique pour preparer chaque eleve a son avenir.</p>",
      image: "/images/offre-pedagogiques/August2025/KQgmgLL8bIPNctv63kfN.png",
      order: 1,
    },
    {
      sectionKey: "secondary-image",
      image: "/images/offre-pedagogiques/March2025/yBsX8u4ZVOVu4Ki1b9bZ.png",
      order: 2,
    },
    {
      sectionKey: "tracks-intro",
      title: "Filieres de specialisation",
      contentHtml: "<p>A partir de la classe de Premiere, les eleves choisissent une filiere de specialisation correspondant a leurs aptitudes et a leur projet d'orientation. Chaque filiere offre un parcours riche et exigeant.</p>",
      order: 3,
    },
    {
      sectionKey: "tracks",
      title: "Nos filieres",
      contentHtml: JSON.stringify([
        { name: "Filiere Scientifique", description: "Mathematiques, physique-chimie, sciences de la vie et de la Terre, numerique et sciences informatiques. Un parcours rigoureux pour les eleves passionnes par les sciences et la recherche.", icon: "FlaskConical", color: "from-primary to-primary-dark" },
        { name: "Filiere Litteraire", description: "Humanites, litterature, philosophie, langues, histoire-geographie, geopolitique et sciences politiques. Un parcours pour les esprits curieux et les futurs acteurs de la culture.", icon: "BookOpen", color: "from-secondary to-secondary-dark" },
        { name: "Filiere Economique et Sociale", description: "Sciences economiques et sociales, mathematiques appliquees, histoire-geographie, geopolitique. Un parcours prepare aux enjeux du monde contemporain et aux metiers de demain.", icon: "Globe", color: "from-[#8B6914] to-[#C4961A]" },
      ]),
      order: 4,
    },
    {
      sectionKey: "key-features",
      title: "Points forts",
      contentHtml: JSON.stringify([
        "Preparation au Baccalaureat francais et libanais",
        "Bac Francais International (BFI)",
        "Certifications internationales (Cambridge, IELTS, DELE, SAT)",
        "Programmes d'exploration professionnelle",
        "Accompagnement personnalise a l'orientation",
        "Transition vers l'enseignement superieur ou l'emploi",
      ]),
      order: 5,
    },
    {
      sectionKey: "additional",
      title: "Complements",
      contentHtml: JSON.stringify([
        {
          title: "Preparation aux examens",
          description: "Nos eleves sont prepares aux examens nationaux et internationaux avec un accompagnement rigoureux.",
          items: [
            "Baccalaureat francais general",
            "Baccalaureat libanais",
            "Bac Francais International (BFI)",
            "Epreuves anticipees de Premiere",
            "Grand oral de Terminale",
          ],
        },
      ]),
      order: 6,
    },
  ]);
  console.log("  Page: offre-lycee");

  console.log("Pages + Sections seeded.\n");

  /* ── 12. Alumni events + photos ──────────────────────── */
  const alumniEventsData = [
    {
      title: "Brunch des Anciens",
      date: new Date("2025-07-11"),
      descriptionHtml: "<p>Retrouvailles entre anciens, enseignants et personnel du lycee autour d'un brunch convivial sur le campus de Beit Chabab. Une journee de fraternite, de convivialite et de souvenirs partages ou chacun a pu raviver les liens qui unissent les generations du Lycee Montaigne.</p>",
      photos: [
        "/images/anciens/August2025/tbgbFWe3V7nhiqK9KdbW.jpeg",
        "/images/anciens/August2025/aFC7rOpJhr2G0lM9Dr1M.jpeg",
        "/images/anciens/August2025/NWoTxLZNaGoLGqN3ALNM.jpeg",
        "/images/anciens/August2025/34dQliGXtze4qbuV35El.jpeg",
        "/images/anciens/August2025/e56wswRlMyehZbdlhHeN.jpeg",
        "/images/anciens/August2025/fAUvjSZcpr1xXwR8z0y9.jpeg",
      ],
    },
    {
      title: "Reunion de Noel",
      date: new Date("2024-12-23"),
      descriptionHtml: "<p>Retrouvailles festives a l'occasion des fetes de fin d'annee. Retrouvailles emouvantes, rires et souvenirs partages — l'occasion parfaite de se retrouver, d'echanger sur les parcours depuis le lycee et de profiter de l'esprit de Noel en bonne compagnie.</p>",
      photos: [
        "/images/anciens/March2025/LBqkCVHdyv78XpGnfAH1.jpeg",
        "/images/anciens/March2025/HEQxBeweJfWguNossQOS.jpeg",
        "/images/anciens/March2025/f3vVhxbqZ3nUKILttEH9.jpeg",
        "/images/anciens/March2025/WSLY3ZnIDWp00MfIrMMT.jpeg",
        "/images/anciens/March2025/67aHfEHl4KuY6fxQ2vGe.jpeg",
        "/images/anciens/March2025/5iiQNILm422XxkXqGkFe.jpeg",
        "/images/anciens/March2025/gM5S027koxZof9K6pum8.jpeg",
      ],
    },
    {
      title: "Premier Brunch & Fondation de l'AALM",
      date: new Date("2024-07-19"),
      descriptionHtml: "<p>Premier brunch des anciens sur le campus de Beit Chabab pour les promos 2022, 2023 et 2024. C'est lors de cette journee fondatrice qu'a ete elu le comite constitutif de l'AALM, marquant le debut officiel de l'Amicale des Anciens du Lycee Montaigne.</p>",
      photos: [
        "/images/anciens/December2024/Gr126Yxp86fX8jQaSwnh.jpeg",
        "/images/anciens/December2024/hjohJyJ8Yz3P14BGKWCk.jpeg",
        "/images/anciens/December2024/Yjx2dWMAEQgjzmlB9hcy.jpeg",
        "/images/anciens/December2024/UnkBO3aNJBHYDaqui4nt.jpeg",
        "/images/anciens/December2024/dcdN3CWKF92prbbgkGCc.jpeg",
      ],
    },
  ];

  for (const evt of alumniEventsData) {
    const event = await db.alumniEvent.create({
      data: {
        title: evt.title,
        date: evt.date,
        descriptionHtml: evt.descriptionHtml,
      },
    });
    for (let i = 0; i < evt.photos.length; i++) {
      await db.alumniPhoto.create({
        data: {
          eventId: event.id,
          imageUrl: evt.photos[i],
          altText: `${evt.title} - Photo ${i + 1}`,
          order: i,
        },
      });
    }
  }
  console.log("Alumni events + photos seeded.");

  /* ── 13. Governance instances ─────────────────────────── */
  const governanceInstances = [
    {
      slug: "conseil-strategique",
      title: "Conseil Strategique",
      subtitle: "Instance consultative de pilotage strategique",
      iconName: "Building2",
      accentColor: "from-primary to-primary-dark",
      descriptionHtml: "<p>Un Conseil Strategique, consultatif, qui accompagne le Conseil d'Administration dans sa strategie de croissance, de positionnement, de planification et de developpement.</p><p>Cette instance joue un role essentiel dans la definition des orientations a long terme de l'etablissement, en apportant une expertise diversifiee et une vision prospective au service du projet educatif du Lycee Montaigne.</p>",
      compositionHtml: "<ul><li>President</li><li>Membre d'honneur</li><li>Cheffe d'etablissement</li><li>President du Conseil d'Administration</li><li>Membres nommes</li></ul>",
      membersJson: JSON.stringify([
        { name: "Raymond Araygi", role: "President" },
        { name: "Yves Aubin De La Messuziere", role: "Membre d'honneur" },
        { name: "Rachel Atallah", role: "Cheffe d'etablissement" },
        { name: "Chaaya Atallah", role: "President du Conseil d'Administration" },
        { name: "Camil Atallah", role: "Membre" },
        { name: "Sami Toubia", role: "Membre" },
        { name: "Andree Daouk", role: "Membre" },
        { name: "Viviane Ghanem", role: "Membre" },
      ]),
      responsibilitiesHtml: "<ul><li>Accompagner le Conseil d'Administration dans sa strategie de croissance</li><li>Conseiller sur le positionnement institutionnel</li><li>Contribuer a la planification strategique a moyen et long terme</li><li>Orienter les axes de developpement de l'etablissement</li></ul>",
      order: 1,
    },
    {
      slug: "conseil-etablissement",
      title: "Conseil d'Etablissement",
      subtitle: "Instance principale de gouvernance scolaire",
      iconName: "Scale",
      accentColor: "from-secondary to-secondary-dark",
      descriptionHtml: "<p>Le conseil d'etablissement est une instance importante qui est consultee sur ce qui touche a la vie de l'etablissement.</p><p>Il reunit l'ensemble des parties prenantes de la communaute educative pour debattre et orienter les decisions majeures concernant le fonctionnement et le projet pedagogique du lycee.</p>",
      compositionHtml: "<ul><li>Direction</li><li>Representants des parents</li><li>Eleves du secondaire</li><li>Representants des enseignants</li></ul>",
      meetingFrequency: "Le conseil d'etablissement se reunit au moins 3 fois par an.",
      presidence: "Preside par la Cheffe d'etablissement",
      responsibilitiesHtml: "<ul><li>Adopter le projet d'etablissement</li><li>Emettre des avis sur les questions touchant a la vie de l'etablissement</li><li>Examiner le rapport annuel de fonctionnement</li><li>Voter le reglement interieur</li></ul>",
      order: 2,
    },
    {
      slug: "conseil-ecole",
      title: "Conseil d'Ecole",
      subtitle: "Organe consultatif du premier degre",
      iconName: "GraduationCap",
      accentColor: "from-primary to-primary-dark",
      descriptionHtml: "<p>Le conseil d'ecole est un organe du conseil d'etablissement. Il est l'instance de concertation qui examine les questions relatives a l'organisation et au fonctionnement pedagogique des classes du primaire.</p><p>Il couvre l'ensemble du premier degre, de la PS de maternelle au CM2, et permet une coordination etroite entre les equipes pedagogiques et les familles.</p>",
      compositionHtml: "<ul><li>Direction</li><li>Representants des parents</li><li>Equipe pedagogique</li></ul>",
      meetingFrequency: "Le conseil d'ecole se reunit a minima trois fois par an.",
      presidence: "Preside par la directrice de l'ecole",
      responsibilitiesHtml: "<ul><li>Voter le reglement interieur de l'ecole</li><li>Adopter le projet d'ecole</li><li>Donner un avis sur les questions interessant la vie de l'ecole</li><li>Examiner les conditions de bonne integration des enfants en situation de handicap</li></ul>",
      order: 3,
    },
    {
      slug: "conseil-pedagogique",
      title: "Conseil Pedagogique",
      subtitle: "Instance de reflexion et d'innovation pedagogique",
      iconName: "BookOpen",
      accentColor: "from-secondary to-secondary-dark",
      descriptionHtml: "<p>Le conseil pedagogique est une instance de consultation des enseignants sur la politique educative de l'etablissement. Il prepare la partie pedagogique du projet d'etablissement.</p><p>Il favorise la concertation entre les enseignants, notamment sur la coordination des enseignements, les dispositifs d'aide et de soutien, les innovations pedagogiques et l'evaluation des eleves.</p>",
      compositionHtml: "<ul><li>Cheffe d'etablissement</li><li>Adjoints et directeurs</li><li>Coordinateurs de discipline</li><li>Professeurs representants</li></ul>",
      presidence: "Preside par la Cheffe d'etablissement",
      responsibilitiesHtml: "<ul><li>Preparer la partie pedagogique du projet d'etablissement</li><li>Coordonner les enseignements et les methodes pedagogiques</li><li>Favoriser l'innovation et l'experimentation pedagogique</li><li>Proposer des actions de formation des enseignants</li><li>Accompagner les dispositifs d'aide et de soutien aux eleves</li></ul>",
      order: 4,
    },
    {
      slug: "conseil-discipline",
      title: "Conseil de Discipline",
      subtitle: "Garant du respect du reglement interieur",
      iconName: "Gavel",
      accentColor: "from-primary to-primary-dark",
      descriptionHtml: "<p>Le conseil de discipline est competent pour prononcer les sanctions prevues par le reglement interieur a l'encontre des eleves ayant commis des fautes graves.</p><p>Il garantit le respect du droit et de l'equite dans le traitement des situations disciplinaires, en veillant au respect du contradictoire et des droits de la defense.</p>",
      compositionHtml: "<ul><li>Cheffe d'etablissement</li><li>Adjoints</li><li>Representants des enseignants</li><li>Representants des parents</li><li>Representants des eleves</li><li>Conseiller principal d'education</li></ul>",
      presidence: "Preside par la Cheffe d'etablissement",
      responsibilitiesHtml: "<ul><li>Examiner les cas de manquement grave au reglement interieur</li><li>Prononcer des sanctions disciplinaires</li><li>Garantir le respect des droits de la defense</li><li>Veiller a l'equite dans le traitement des situations</li></ul>",
      order: 5,
    },
    {
      slug: "conseil-classe",
      title: "Conseil de Classe",
      subtitle: "Suivi individuel et collectif des eleves",
      iconName: "ClipboardList",
      accentColor: "from-secondary to-secondary-dark",
      descriptionHtml: "<p>Le conseil de classe est l'instance qui examine les questions pedagogiques interessant la vie de la classe, notamment les modalites d'organisation du travail personnel des eleves.</p><p>Il se prononce sur les conditions dans lesquelles se poursuit la scolarite de chaque eleve, emet des avis et formule des propositions d'orientation.</p>",
      compositionHtml: "<ul><li>Professeur principal</li><li>Enseignants de la classe</li><li>Delegues des eleves</li><li>Delegues des parents</li><li>Conseiller principal d'education</li><li>Direction</li></ul>",
      meetingFrequency: "Le conseil de classe se reunit trois fois par an, a chaque fin de trimestre.",
      presidence: "Preside par la Cheffe d'etablissement ou son representant",
      responsibilitiesHtml: "<ul><li>Examiner les resultats scolaires individuels et collectifs</li><li>Emettre des propositions d'orientation</li><li>Formuler un avis sur le passage en classe superieure</li><li>Identifier les eleves en difficulte et proposer des solutions</li></ul>",
      order: 6,
    },
    {
      slug: "conseil-vie-collegienne",
      title: "Conseil de Vie Collegienne",
      subtitle: "CVCO — Expression et citoyennete des collegiens",
      iconName: "Megaphone",
      accentColor: "from-primary to-primary-dark",
      descriptionHtml: "<p>Le Conseil de Vie Collegienne (CVCO) favorise l'expression des collegiens et contribue a l'apprentissage de la citoyennete.</p><p>Instance de dialogue et d'echange, le CVCO permet aux eleves du college de formuler des propositions sur la vie de l'etablissement et de participer activement aux decisions qui les concernent.</p>",
      compositionHtml: "<ul><li>Eleves elus representant les collegiens</li><li>Representants de la direction</li><li>Representants des enseignants</li><li>Conseiller principal d'education</li></ul>",
      responsibilitiesHtml: "<ul><li>Favoriser l'expression des collegiens</li><li>Contribuer a l'apprentissage de la citoyennete</li><li>Formuler des propositions sur la vie scolaire</li><li>Participer a l'amelioration du climat scolaire</li><li>Porter les projets et initiatives des eleves</li></ul>",
      order: 7,
    },
    {
      slug: "commission-hygiene-securite",
      title: "Commission Hygiene et Securite",
      subtitle: "Prevention des risques et bien-etre collectif",
      iconName: "HeartPulse",
      accentColor: "from-secondary to-secondary-dark",
      descriptionHtml: "<p>La Commission Hygiene et Securite est un groupe de travail charge d'identifier les risques potentiels (incendie, accidents, sante), de verifier le respect des normes de securite, et de proposer des mesures de prevention.</p><p>Elle assure le suivi des incidents, l'amelioration des conditions de travail et d'etude, et la sensibilisation de la communaute scolaire aux comportements responsables en matiere de securite et d'hygiene.</p>",
      compositionHtml: "<ul><li>Representants de l'administration</li><li>Representants des enseignants</li><li>Representants du personnel</li><li>Representants des parents</li><li>Representants des eleves</li></ul>",
      meetingFrequency: "La commission se reunit deux fois par an et peut soumettre des recommandations a la direction.",
      responsibilitiesHtml: "<ul><li>Identifier les risques potentiels (incendie, accidents, sante)</li><li>Verifier le respect des normes de securite dans les locaux</li><li>Proposer des actions de prevention (exercices d'evacuation, formations)</li><li>Assurer le suivi des accidents et incidents</li><li>Ameliorer les conditions de travail et d'etude</li><li>Sensibiliser la communaute aux comportements responsables</li></ul>",
      order: 8,
    },
    {
      slug: "conseil-vie-lyceenne",
      title: "Conseil de Vie Lyceenne",
      subtitle: "CVL — Participation des lyceens aux decisions",
      iconName: "UserCheck",
      accentColor: "from-primary to-primary-dark",
      descriptionHtml: "<p>Le Conseil de Vie Lyceenne (CVL) est le lieu ou les lyceens sont associes aux decisions de l'etablissement.</p><p>Les elus y representent les eleves et participent activement a la reflexion sur les grandes questions de la vie scolaire, contribuant ainsi a une gouvernance plus inclusive et democratique.</p>",
      compositionHtml: "<ul><li>Eleves elus representant les lyceens</li><li>Representants de la direction</li><li>Representants des enseignants</li><li>Representants des parents</li></ul>",
      responsibilitiesHtml: "<ul><li>Associer les lyceens aux decisions de l'etablissement</li><li>Representer les eleves du lycee</li><li>Formuler des propositions sur l'organisation scolaire</li><li>Contribuer au bien-etre et a la vie lyceenne</li><li>Promouvoir l'engagement citoyen des eleves</li></ul>",
      order: 9,
    },
    {
      slug: "cellule-formation",
      title: "Cellule de Formation",
      subtitle: "Pilotage de la formation continue des personnels",
      iconName: "Globe",
      accentColor: "from-secondary to-secondary-dark",
      descriptionHtml: "<p>La Cellule de Formation est un groupe de pilotage et de coordination charge d'identifier les besoins en formation des personnels et de proposer des actions de formation continue en coherence avec le projet d'etablissement.</p><p>Elle travaille en lien etroit avec les priorites institutionnelles et les orientations du reseau MLF pour garantir un developpement professionnel de qualite au service des eleves.</p>",
      compositionHtml: "<ul><li>Cheffe d'etablissement</li><li>Responsables pedagogiques</li><li>Coordinateurs de formation</li><li>Representants des equipes pedagogiques</li></ul>",
      responsibilitiesHtml: "<ul><li>Identifier les besoins en formation des equipes pedagogiques et educatives</li><li>Aligner les besoins avec les priorites institutionnelles et les orientations du reseau</li><li>Elaborer le plan de formation annuel ou pluriannuel</li><li>Suivre et evaluer les actions de formation mises en oeuvre</li><li>Favoriser le partage de competences et de pratiques professionnelles</li></ul>",
      order: 10,
    },
    {
      slug: "cesce",
      title: "CESCE",
      subtitle: "Comite d'Education a la Sante, a la Citoyennete et a l'Environnement",
      iconName: "Shield",
      accentColor: "from-primary to-primary-dark",
      descriptionHtml: "<p>Le CESCE est une instance de reflexion, d'observation et de proposition qui concoit, met en oeuvre et evalue un projet educatif en matiere d'education a la citoyennete, a la sante, a l'environnement et au developpement durable.</p><p>Integre au projet d'etablissement, le CESCE organise des partenariats en fonction des problematiques educatives a traiter et contribue a la formation globale des citoyens de demain.</p>",
      compositionHtml: "<ul><li>Representants de la direction</li><li>Representants des enseignants</li><li>Representants des parents</li><li>Representants des eleves</li><li>Partenaires exterieurs</li></ul>",
      responsibilitiesHtml: "<ul><li>Concevoir et mettre en oeuvre des projets educatifs en sante et citoyennete</li><li>Evaluer l'efficacite des programmes engages</li><li>Organiser des partenariats autour de thematiques educatives specifiques</li><li>Integrer les actions au projet d'etablissement</li><li>Promouvoir l'education au developpement durable et a l'environnement</li></ul>",
      order: 11,
    },
  ];

  for (const gi of governanceInstances) {
    await db.governanceInstance.create({ data: gi });
  }
  console.log("Governance instances seeded.");

  /* ── 14. Announcement ────────────────────────────────── */
  await db.announcement.create({
    data: {
      title: "Inscriptions 2026-2027 ouvertes",
      contentHtml: "<p>Les inscriptions et reinscriptions pour l'annee scolaire 2026-2027 sont desormais ouvertes. <a href='/inscriptions'>Consultez la procedure</a>.</p>",
      active: true,
    },
  });
  console.log("Announcements seeded.");

  /* ── 15. Menu items (navigation) ─────────────────────── */
  const navigationData = [
    {
      label: "Accueil",
      url: "/",
      order: 0,
      children: [
        { label: "Liens utiles", url: "/#liens-utiles", order: 0 },
        { label: "Pourquoi l'enseignement français", url: "/#pourquoi", order: 1 },
        { label: "Info à la une", url: "/#info-une", order: 2 },
        { label: "Trait d'union", url: "/#trait-union", order: 3 },
      ],
    },
    {
      label: "Établissement",
      url: "/etablissement",
      order: 1,
      children: [
        { label: "Mission et Vision", url: "/etablissement#mission", order: 0 },
        { label: "Mot de la cheffe", url: "/etablissement#chef", order: 1 },
        { label: "Mot de la proviseure déléguée", url: "/etablissement#delegue", order: 2 },
        { label: "Mot de la directrice", url: "/etablissement#directrice", order: 3 },
        { label: "Comité des parents", url: "/etablissement#comite", order: 4 },
        { label: "Règlement Intérieur", url: "/etablissement#reglement", order: 5 },
        { label: "Instances", url: "/etablissement#instances", order: 6 },
      ],
    },
    {
      label: "Excellence académique",
      url: "/excellence-academique",
      order: 2,
      children: [
        { label: "Offre pédagogique", url: "/excellence-academique#pedagogie", order: 0 },
        { label: "Examens et certificats", url: "/excellence-academique#resultats", order: 1 },
        { label: "Projet d'établissement", url: "/excellence-academique#projet", order: 2 },
        { label: "Parcours éducatifs", url: "/excellence-academique#parcours", order: 3 },
        { label: "Pôle inclusion", url: "/excellence-academique#pole", order: 4 },
        { label: "BCD - CCC", url: "/excellence-academique#bcd", order: 5 },
      ],
    },
    {
      label: "Inscriptions et réinscriptions",
      url: "/inscriptions",
      order: 3,
      children: [
        { label: "Inscriptions et réinscriptions", url: "/inscriptions#inscription", order: 0 },
        { label: "Portes Ouvertes", url: "/inscriptions#porte-ouvertes", order: 1 },
        { label: "Bourses Scolaires", url: "/inscriptions#bourse", order: 2 },
      ],
    },
    {
      label: "Vie du LM",
      url: "/vie-du-lm",
      order: 4,
      children: [
        { label: "Actualités", url: "/vie-du-lm#actualite", order: 0 },
        { label: "Développement durable", url: "/vie-du-lm#dev", order: 1 },
        { label: "Webradio", url: "/vie-du-lm#web", order: 2 },
        { label: "Démocratie scolaire", url: "/vie-du-lm#climat", order: 3 },
        { label: "Égalité", url: "/vie-du-lm#egalite", order: 4 },
        { label: "Séjours", url: "/vie-du-lm#sejour", order: 5 },
      ],
    },
    {
      label: "Orientation",
      url: "/orientation",
      order: 5,
      children: [
        { label: "Parcours avenir", url: "/orientation#presentation", order: 0 },
        { label: "Parcoursup", url: "/orientation#parcoursup", order: 1 },
        { label: "Inscriptions Universités", url: "/orientation#uni", order: 2 },
        { label: "Activités", url: "/orientation#activites", order: 3 },
      ],
    },
    {
      label: "Extrascolaire",
      url: "/extrascolaire",
      order: 6,
      children: [
        { label: "Activités périscolaires", url: "/extrascolaire#activite", order: 0 },
        { label: "Association sportive", url: "/extrascolaire#action", order: 1 },
      ],
    },
    {
      label: "Informations pratiques",
      url: "/informations-pratiques",
      order: 7,
      children: [
        { label: "Calendrier scolaire", url: "/informations-pratiques#calendrier", order: 0 },
        { label: "Listes de manuels", url: "/informations-pratiques#liste", order: 1 },
        { label: "Restauration", url: "/informations-pratiques#restauration", order: 2 },
        { label: "Santé", url: "/informations-pratiques#sante", order: 3 },
        { label: "Recrutement", url: "/informations-pratiques#recrutement", order: 4 },
      ],
    },
  ];

  for (const nav of navigationData) {
    const parent = await db.menuItem.create({
      data: { label: nav.label, url: nav.url, order: nav.order },
    });
    for (const child of nav.children) {
      await db.menuItem.create({
        data: { label: child.label, url: child.url, order: child.order, parentId: parent.id },
      });
    }
  }
  console.log("Menu items seeded.");

  console.log("\n✅ Seeding complete! All CMS tables populated.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
