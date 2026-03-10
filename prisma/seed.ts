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
      password: hashSync((() => {
        const pw = process.env.ADMIN_PASSWORD;
        if (!pw) throw new Error("ADMIN_PASSWORD env var required for seeding");
        return pw;
      })(), 12),
      name: "Administrateur",
      role: "ADMIN",
    },
  });
  console.log("Admin user ready.");

  /* ── 3. Site settings ────────────────────────────────── */
  const settings = [
    { key: "site_name", value: "Lycée Montaigne" },
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
    { imageUrl: "/images/hp-sliders/February2026/xsOXezH2jzRWmKTDo9zN.jpeg", altText: "Lycée Montaigne campus", order: 0 },
    { imageUrl: "/images/hp-sliders/February2026/xsOXezH2jzRWmKTDo9zN.jpeg", altText: "Vue aérienne du campus", order: 1 },
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
    { title: "Un nouveau bâtiment, une nouvelle étape", image: "/images/hp-services-items/November2025/n0ITOyY5hysOK9K70ztj.jpeg", link: "/etablissement", category: "etablissement" },
    { title: "Résultats 2024-2025", image: "/images/examens-resultats/January2026/resized_IMG_6942.PNG", link: "/excellence-academique#resultats", category: "resultats" },
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
      title: "Cheffe d'établissement",
      photo: "/images/eta-s3/November2024/tN7I8Zm4bodDopvV14Hw.png",
      section: "direction",
      order: 1,
      messageHtml: "<p>Le Lycée Montaigne est un établissement jeune et dynamique qui accueille près de 1100 élèves de la maternelle à la terminale.</p>",
    },
    {
      name: "",
      title: "Proviseure déléguée",
      photo: "/images/mot-directrices/March2025/rLBOCUkYuoLx7jcdp3LE.jpeg",
      section: "direction",
      order: 2,
      messageHtml: "<p>Au Lycée Montaigne, nous mettons tout en œuvre pour accompagner chaque élève dans son parcours scolaire et personnel.</p>",
    },
    // Comite de parents
    {
      name: "Représentants des parents",
      title: "Comité des parents d'élèves",
      photo: "/images/comite-parents/December2025/AaMNgQhtPtYL9V1v6MeP.jpeg",
      section: "comite",
      order: 1,
      messageHtml: "<p>Le comité des parents d'élèves du Lycée Montaigne est un partenaire essentiel de la communauté éducative.</p>",
    },
    // BCD team
    { name: "Jennifer Bou Zeid", title: "Documentaliste arabe", photo: null, section: "bcd", order: 1, messageHtml: null },
    { name: "Leila Abboud", title: "Documentaliste francaise", photo: null, section: "bcd", order: 2, messageHtml: null },
    // Health staff
    { name: "Mme Jeanine Gharby", title: "Infirmière", photo: null, section: "sante", order: 1, messageHtml: "<p>Soins quotidiens, suivi médical et éducation à la santé.</p>" },
    { name: "", title: "Médecin", photo: null, section: "sante", order: 2, messageHtml: "<p>Examen médical annuel pour tous les élèves.</p>" },
    { name: "", title: "Optométriste", photo: null, section: "sante", order: 3, messageHtml: "<p>Examen visuel annuel de dépistage.</p>" },
    { name: "Dr Harbouk", title: "Dentiste", photo: null, section: "sante", order: 4, messageHtml: "<p>Éducation à l'hygiène bucco-dentaire et dépistage.</p>" },
    // Alumni committee
    { name: "Yorgo Abou Haidar", title: "President", photo: null, section: "alumni", order: 1, messageHtml: null },
    { name: "Rebecca Maroun", title: "Vice-présidente", photo: null, section: "alumni", order: 2, messageHtml: null },
    { name: "Hayfa Ghandour Achkar", title: "Secrétaire", photo: null, section: "alumni", order: 3, messageHtml: null },
    { name: "Andrea Abou Haidar", title: "Reseaux sociaux", photo: null, section: "alumni", order: 4, messageHtml: null },
    { name: "Matteo Kozak & Fay Haydamous", title: "Newsletter", photo: null, section: "alumni", order: 5, messageHtml: null },
    { name: "Maria Keuchgerian", title: "Événements", photo: null, section: "alumni", order: 6, messageHtml: null },
    { name: "Marc Bejjani", title: "Trésorerie", photo: null, section: "alumni", order: 7, messageHtml: null },
  ];
  for (const s of staffMembers) {
    await db.staffMember.create({ data: s });
  }
  console.log("Staff members seeded.");

  /* ── 8. Certifications ───────────────────────────────── */
  const certifications = [
    { name: "Cambridge English Certificate", image: "/images/certificates/November2024/YutiYtDi0zuxMBPliMh3.jpeg", description: "Certification d'anglais de l'Université de Cambridge", order: 1 },
    { name: "IELTS", image: "/images/certificates/November2024/efSpqghzlYYijlgfFavw.png", description: "International English Language Testing System", order: 2 },
    { name: "DELE", image: "/images/certificates/November2024/ViDy8mEJXK3IcwBFsWR8.png", description: "Diplomas de Espanol como Lengua Extranjera", order: 3 },
    { name: "PIX", image: "/images/certificates/November2024/Pg3enjuqnTHgxraxiYwT.png", description: "Certification des compétences numériques", order: 4 },
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
    { title: "Menu Café Molière", fileUrl: "/images/restauration-files/February2026/vhQNsAH69rrHNHkytBc7.pdf", category: "restauration", academicYear: "2025-2026", order: 2 },
    // Recrutement
    { title: "Formulaire de recrutement", fileUrl: "https://lycee-montaigne.datarays.co/Employee", category: "recrutement", academicYear: "2025-2026", order: 1 },
    // Inscription documents
    { title: "Carnet de vaccination et fiche médicale", fileUrl: "#", category: "inscription-documents", academicYear: "2026-2027", order: 1 },
    { title: "Deux photos d'identité", fileUrl: "#", category: "inscription-documents", academicYear: "2026-2027", order: 2 },
    { title: "Pièces d'identité (libanaises, binationales ou étrangères)", fileUrl: "#", category: "inscription-documents", academicYear: "2026-2027", order: 3 },
    { title: "Attestation scolaire de l'établissement actuel", fileUrl: "#", category: "inscription-documents", academicYear: "2026-2027", order: 4 },
    { title: "Bulletins scolaires de l'année en cours et de l'année précédente", fileUrl: "#", category: "inscription-documents", academicYear: "2026-2027", order: 5 },
    { title: "Pour le secondaire : copie du Brevet Libanais", fileUrl: "#", category: "inscription-documents", academicYear: "2026-2027", order: 6 },
    { title: "Dispense d'arabe le cas échéant", fileUrl: "#", category: "inscription-documents", academicYear: "2026-2027", order: 7 },
    { title: "Jugement de divorce avec garde le cas échéant", fileUrl: "#", category: "inscription-documents", academicYear: "2026-2027", order: 8 },
    // Orientation calendars
    { title: "Calendrier d'orientation annuel des élèves de Terminale", fileUrl: "/images/calenders/October2025/Lx0wFEvWtizsi6yOH2q1.pdf", category: "orientation-calendrier", academicYear: "2025-2026", order: 1 },
    { title: "Calendrier d'orientation annuel des élèves de 1ère", fileUrl: "/images/calenders/September2025/KwWpmr2QDmyQQPjalcUG.pdf", category: "orientation-calendrier", academicYear: "2025-2026", order: 2 },
    { title: "Calendrier d'orientation annuel des élèves de 2de", fileUrl: "/images/calenders/October2025/lXqdceNiOj3Pz9DpwBO7.pdf", category: "orientation-calendrier", academicYear: "2025-2026", order: 3 },
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
    { title: "Découverte de la littérature", description: "Explorations littéraires variées comme 'Comment j'ai changé ma vie' pour éveiller la curiosité des lecteurs.", image: "/images/bcd-ccc-activities/November2025/uJc8mo3uFntTF5807HcA.jpg", category: "bcd", order: 1 },
    { title: "Commedia dell'arte", description: "Exploration de la commedia dell'arte avec les CM1, mêlant lecture, théâtre et découverte culturelle italienne.", image: "/images/bcd-ccc-activities/November2025/5aFOcCygmmCCNsJ5i77o.jpg", category: "bcd", order: 2 },
    { title: "Spectacle de marionnettes", description: "Spectacles de marionnettes pour les maternelles, alliant narration et art visuel pour les plus jeunes.", image: "/images/bcd-ccc-activities/November2025/XUHDsG37R1DsVLDHQTus.jpg", category: "bcd", order: 3 },
    { title: "Lecture en mouvement", description: "Activités de lecture en mouvement combinant expression corporelle et découverte de textes.", image: "/images/bcd-ccc-activities/November2025/PF5zFTuWOokRWkUk2sTw.jpg", category: "bcd", order: 4 },
    { title: "Nuits de la Lecture", description: "Événement festif dédié à la lecture, avec animations nocturnes et découvertes littéraires pour toute la communauté.", image: "/images/bcd-ccc-activities/May2025/A8B44PA9Uf7SSRXFWtiH.jpeg", category: "bcd", order: 5 },
    { title: "Droits de l'enfant", description: "Projet sur les droits de l'enfant à travers la littérature jeunesse et les échanges en classe.", image: "/images/bcd-ccc-activities/May2025/qHFqUnIkY9Uxb0Xo1x10.jpg", category: "bcd", order: 6 },
    { title: "Silence, on lit !", description: "Temps de lecture silencieuse quotidien où toute la communauté scolaire partage un moment de lecture.", image: "/images/bcd-ccc-activities/March2025/cpcffW6KpE8O5Sut2wrH.png", category: "bcd", order: 7 },
    { title: "Cercle de lecture", description: "Cercles de lecture permettant aux élèves d'échanger, débattre et partager leurs coups de cœur littéraires.", image: "/images/bcd-ccc-activities/March2025/GclzoDEQpepHmSongJrP.png", category: "bcd", order: 8 },
    // CCC activities
    { title: "Rentrée littéraire", description: "Célébration de la rentrée littéraire avec découverte des nouveautés, coups de cœur des documentalistes et mises en avant thématiques.", image: "/images/bcd-ccc-activities/October2025/wFv9DxTPfPBBSkAPj5Mg.jpeg", category: "ccc", order: 1 },
    { title: "Hommage à Henri Zoghaib", description: "Hommage au poète libanais Henri Zoghaib avec lectures, performances d'élèves et exploration de son œuvre littéraire.", image: "/images/bcd-ccc-activities/August2025/AhQJx4qBNekBpGeyjMwR.jpeg", category: "ccc", order: 2 },
    { title: "Semaine de la presse et des médias", description: "Semaine dédiée à l'éducation aux médias : analyse de la presse, ateliers d'écriture journalistique et débats sur l'information.", image: "/images/bcd-ccc-activities/August2025/6WkTnG0H4jldI5KagUt0.png", category: "ccc", order: 3 },
    { title: "Nuits de la Lecture, 9ème édition", description: "La 9ème édition des Nuits de la Lecture sur le thème du patrimoine : lectures à voix haute, rencontres et ateliers créatifs.", image: "/images/bcd-ccc-activities/May2025/fmjdjk2fwuGQDkpDyS63.jpeg", category: "ccc", order: 4 },
    { title: "Journée de la langue arabe", description: "Célébration de la langue arabe à travers des activités culturelles, des lectures poétiques et des ateliers de calligraphie.", image: "/images/bcd-ccc-activities/May2025/5ud7anyWXrlJ1RhWxD8s.jpeg", category: "ccc", order: 5 },
    { title: "Semaine des lycées français du monde", description: "Participation au réseau AEFE avec des projets collaboratifs, des échanges interculturels et des événements fédérateurs.", image: "/images/bcd-ccc-activities/May2025/XVqppxZDQpQf1Xi0ECqQ.jpg", category: "ccc", order: 6 },
    { title: "Cercle de lecture", description: "Rencontres régulières entre lecteurs pour partager, débattre et approfondir la lecture d'œuvres choisies collectivement.", image: "/images/excellence-bcd-ccc-extras/March2025/rH1Pp2VNCmOq42KoG7Rm.jpeg", category: "ccc", order: 7 },
    // Orientation activities
    { title: "Forum des universités — 14 novembre 2025", description: "18 universités et 12 grandes écoles ont participé à cette journée, offrant 30 sources d'inspiration à nos élèves.", image: "/images/oriantation-activities/November2025/0HnUrhMFu9ReUOd5Dcbs.jpeg", category: "orientation", order: 1 },
    { title: "Forum des Métiers — 22 mars 2025", description: "Médecine, ingénierie, droit, communication, entrepreneuriat — des professionnels ont partagé leurs parcours et conseils.", image: "/images/oriantation-activities/July2025/xKaDU1qKXJrvkFI8kJc3.jpeg", category: "orientation", order: 2 },
    { title: "Forum des universités — 20 décembre 2024", description: "Journée d'échanges avec les représentants des universités locales et internationales.", image: "/images/oriantation-activities/July2025/E74I8wu2UsLKK4EImXJU.jpeg", category: "orientation", order: 3 },
    // Periscolaire activities
    { title: "Activités périscolaires", description: "Activités périscolaires variées pour les élèves après les heures de cours.", image: "/images/activites-prescolaires/May2025/vjpXai9c7VbVIINjggcN.jpeg", category: "periscolaire", order: 1 },
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
  await seedPage("etablissement", "Établissement", [
    {
      sectionKey: "mission",
      title: "Notre Mission",
      contentHtml: "<p>Le Lycée Montaigne est un établissement français à l'étranger, membre du réseau MLF (Mission Laïque Française). Notre mission est de proposer un enseignement d'excellence dans un cadre multiculturel et bienveillant.</p>",
      image: "/images/eta-s2/November2024/kS2xRaJfz5u5hTJYdlVW.jpeg",
      order: 1,
    },
  ]);
  console.log("  Page: etablissement");

  // ─── Excellence Academique ───
  await seedPage("excellence-academique", "Excellence Académique", [
    {
      sectionKey: "diplomas",
      title: "Diplômes et Certifications",
      contentHtml: JSON.stringify([
        { name: "Diplôme National du Brevet (DNB)", type: "Français" },
        { name: "Brevet Libanais", type: "Libanais" },
        { name: "Bac Français", type: "Français" },
        { name: "Bac Libanais", type: "Libanais" },
        { name: "Bac Français International (BFI)", type: "International" },
      ]),
      order: 1,
    },
    {
      sectionKey: "axes",
      title: "Axes Stratégiques",
      contentHtml: JSON.stringify([
        {
          title: "Assurer un parcours d'excellence à tous les élèves",
          num: "01",
          items: [
            "Renforcer la maîtrise de la langue française",
            "Développer les compétences en langues vivantes",
            "Promouvoir les sciences et la culture numérique",
            "Favoriser les parcours artistiques et culturels",
            "Accompagner chaque élève vers sa réussite",
            "Renforcer l'évaluation formative",
          ],
          image: "/images/axes/April2024/Fn1kk4j4j4fhc0yTmXkP.png",
        },
        {
          title: "Accompagner la montée en puissance du Lycée Montaigne",
          num: "02",
          items: [
            "Développer une politique d'attractivité",
            "Renforcer la communication interne et externe",
            "Moderniser les pratiques pédagogiques",
            "Optimiser la gestion des ressources",
            "Développer les partenariats",
          ],
          image: "/images/axes/April2024/hqG7U0znrO7cPD9llXWC.png",
        },
        {
          title: "Cultiver l'identité humaniste de l'établissement",
          num: "03",
          items: [
            "Promouvoir les valeurs de tolérance et de respect",
            "Développer l'éco-citoyenneté",
            "Renforcer l'égalité filles-garçons",
            "Favoriser l'inclusion et la diversité",
            "Développer le sentiment d'appartenance",
          ],
          image: "/images/axes/April2024/03oaImjGLsLUMIf7Ydtb.png",
        },
      ]),
      order: 2,
    },
    {
      sectionKey: "parcours",
      title: "Parcours Éducatifs",
      contentHtml: JSON.stringify([
        { title: "Parcours citoyen", description: "Formation du citoyen responsable et engagé, participation à la vie démocratique de l'établissement.", icon: "Compass" },
        { title: "Parcours Avenir", description: "Orientation et découverte du monde professionnel dès la 6ème jusqu'à la terminale.", icon: "GraduationCap" },
        { title: "Parcours éducatif de santé", description: "Éducation à la santé, prévention et protection des élèves tout au long de leur scolarité.", icon: "Heart" },
        { title: "Parcours d'éducation artistique et culturelle", description: "Rencontre avec les œuvres, pratique artistique et acquisition de connaissances culturelles.", icon: "Palette" },
      ]),
      order: 3,
    },
  ]);
  console.log("  Page: excellence-academique");

  // ─── Vie du LM ───
  await seedPage("vie-du-lm", "Vie du LM", [
    {
      sectionKey: "developpement-durable",
      title: "Développement durable",
      contentHtml: "<p>Depuis sa création en 2012, le Lycée Montaigne s'engage en faveur du développement durable et de l'éco-citoyenneté. Notre démarche vise à former des citoyens responsables et conscients des enjeux environnementaux.</p><p><strong>Label EFE3D Niveau Expert</strong></p><p>Référents : Mme Roula Chalabi (1er degré), M. Robert Sreih (2nd degré)</p>",
      image: "/images/development-durables/November2024/IXjTyiAwx79KnYFRYWvR.jpg",
      order: 1,
    },
    {
      sectionKey: "webradio",
      title: "Webradio",
      contentHtml: "<p>La webradio du Lycée Montaigne est un projet éducatif qui permet aux élèves de développer leurs compétences en communication, expression orale et travail d'équipe. Les élèves produisent des émissions sur des sujets variés.</p><p>Référentes : Mme Leila Abboud (1er degré), Mme Joelle Maalouf (2nd degré)</p>",
      image: "/images/webradios/November2024/amxLKLrgOzIeBoHAVT4x.jpeg",
      order: 2,
    },
    {
      sectionKey: "climat",
      title: "Démocratie scolaire",
      contentHtml: "<p>Le Lycée Montaigne favorise la participation active des élèves à travers les instances de démocratie scolaire : conseil de vie collégienne (CVC), conseil de vie lycéenne (CVL), et élections de délégués.</p>",
      image: "/images/climat-categories/April2025/mNHwl4NOWUZkZgPfyTNi.jpeg",
      order: 3,
    },
    {
      sectionKey: "egalite",
      title: "Égalité",
      contentHtml: "<p>Conformément à la politique de l'AEFE, le Lycée Montaigne s'inscrit dans une démarche active de promotion de l'égalité entre les filles et les garçons et de lutte contre les stéréotypes.</p>",
      image: "/images/egalite-intros/October2024/7QOD9LQ0ZmvqaH1ck4qJ.jpg",
      order: 4,
    },
  ]);
  console.log("  Page: vie-du-lm");

  // ─── Pole Inclusion ───
  await seedPage("pole-inclusion", "Pôle Inclusion", [
    {
      sectionKey: "intro",
      title: "Élèves à Besoins Éducatifs Particuliers",
      contentHtml: "<p>Le Lycée Montaigne s'engage pour l'inclusion de tous les élèves. Notre pôle inclusion accompagne les élèves à besoins éducatifs particuliers (EBEP) tout au long de leur parcours scolaire, de la maternelle à la terminale.</p><p>Notre approche repose sur le regard positif porté sur chaque personne et la confiance dans l'éducabilité de chacun, quels que soient ses besoins spécifiques.</p>",
      image: "/images/vie-s1/November2024/GS7jV1MyA75tAjglBQcx.jpg",
      order: 1,
    },
    {
      sectionKey: "accompagnement",
      title: "Accompagnement personnalisé",
      contentHtml: "<p>Chaque élève bénéficie d'un suivi adapté à ses besoins spécifiques, avec des dispositifs pédagogiques individualisés.</p>",
      order: 2,
    },
    {
      sectionKey: "equipe",
      title: "Équipe pluridisciplinaire",
      contentHtml: "<p>Enseignants, psychologue, orthophoniste et éducateurs travaillent ensemble pour le bien-être de l'élève.</p>",
      order: 3,
    },
    {
      sectionKey: "amenagements",
      title: "Aménagements pédagogiques",
      contentHtml: "<p>PAP, PPS, PAI : des plans adaptés pour garantir l'accès aux apprentissages de tous les élèves.</p>",
      order: 4,
    },
    {
      sectionKey: "bienveillance",
      title: "Bienveillance et respect",
      contentHtml: "<p>Un cadre inclusif où chaque différence est accueillie comme une richesse pour la communauté scolaire.</p>",
      order: 5,
    },
  ]);
  console.log("  Page: pole-inclusion");

  // ─── Sejours Pedagogiques ───
  await seedPage("sejours-pedagogiques", "Séjours Pédagogiques", [
    {
      sectionKey: "intro",
      title: "Voyages et séjours",
      contentHtml: "<p>Le Lycée Montaigne organise des séjours pédagogiques et des voyages scolaires qui enrichissent le parcours éducatif des élèves. Ces expériences favorisent l'ouverture culturelle, l'autonomie et la cohésion de groupe.</p><p>De la découverte du patrimoine local aux échanges internationaux, chaque séjour est conçu pour prolonger les apprentissages en classe et offrir aux élèves des expériences inoubliables.</p>",
      image: "/images/actions-sportives/May2025/5AyqpqwCqoBIFxIXphFP.jpeg",
      order: 1,
    },
    {
      sectionKey: "ligue-sportive",
      title: "Ligue sportive AEFE-UNSS",
      contentHtml: "<p>Les élèves du Lycée Montaigne participent aux compétitions sportives inter-établissements dans le cadre de la ligue sportive AEFE-UNSS, offrant des opportunités de rencontres sportives au niveau régional et international.</p>",
      order: 2,
    },
  ]);
  console.log("  Page: sejours-pedagogiques");

  // ─── Inscriptions ───
  await seedPage("inscriptions", "Inscriptions et Réinscriptions", [
    {
      sectionKey: "procedure",
      title: "Procédure d'inscription 2026-2027",
      contentHtml: "<p>Pour inscrire votre enfant au Lycée Montaigne, veuillez préparer les documents suivants :</p><ul><li>Carnet de vaccination et fiche médicale</li><li>Deux photos d'identité</li><li>Pièces d'identité (libanaises, binationales ou étrangères)</li><li>Attestation scolaire de l'établissement actuel</li><li>Bulletins scolaires de l'année en cours et de l'année précédente</li><li>Pour le secondaire : copie du Brevet Libanais</li><li>Dispense d'arabe le cas échéant</li><li>Jugement de divorce avec garde le cas échéant</li></ul>",
      image: "/images/adm-s1/December2025/xbMaFrODRj51WGOcKi4k.png",
      order: 1,
    },
    {
      sectionKey: "portes-ouvertes",
      title: "Portes Ouvertes Maternelle",
      contentHtml: "<p>Venez découvrir notre école maternelle lors de nos journées portes ouvertes. Un moment d'accueil, de visite des locaux et d'échanges avec l'équipe pédagogique vous attend.</p><p><strong>Prochaines portes ouvertes</strong><br/>Consultez nos réseaux sociaux pour les dates à venir.</p>",
      image: "/images/s4-files/January2026/U4IfChjnxOFzmzse6Tme.jpeg",
      order: 2,
    },
    {
      sectionKey: "bourses",
      title: "Bourses Scolaires",
      contentHtml: "<p>Les bourses scolaires sont destinées aux enfants français résidant à l'étranger. Elles permettent de couvrir tout ou partie des frais de scolarité dans les établissements d'enseignement français à l'étranger.</p><p>Pour plus d'informations sur les conditions d'éligibilité et la procédure de demande, veuillez consulter le site de l'AEFE ou contacter l'ambassade de France au Liban.</p>",
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
      contentHtml: "<p>Le parcours Avenir permet à chaque élève de la 6ème à la Terminale de construire progressivement son orientation et de découvrir le monde économique et professionnel.</p>",
      order: 1,
    },
    {
      sectionKey: "parcoursup",
      title: "Parcoursup",
      contentHtml: "<p>Parcoursup est la plateforme nationale de préinscription en première année de l'enseignement supérieur en France. Nos élèves sont accompagnés tout au long de la procédure.</p>",
      order: 2,
    },
    {
      sectionKey: "admissions",
      title: "Admissions post-bac",
      contentHtml: "<p>Le Lycée Montaigne accompagne ses élèves dans leurs démarches d'admission dans les universités libanaises et internationales. Nos résultats témoignent de l'excellence de la préparation.</p>",
      order: 3,
    },
    {
      sectionKey: "admissions-images",
      title: "Résultats Admissions",
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
      title: "Universités partenaires",
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
      contentHtml: "<p>Notre équipe d'orientation est à votre disposition pour vous accompagner dans vos choix.</p>",
      order: 6,
    },
  ]);
  console.log("  Page: orientation");

  // ─── Offre Maternelle ───
  await seedPage("offre-maternelle", "École Maternelle", [
    {
      sectionKey: "overview",
      title: "Le chemin de l'avenir commence ici.",
      contentHtml: "<p>L'école maternelle constitue un cycle unique d'enseignement fondamental pour les enfants de 3 à 5 ans. Ce premier pas dans le parcours scolaire est essentiel pour garantir la réussite de tous les élèves.</p><p>Au Lycée Montaigne, la maternelle accueille les enfants dans un environnement bienveillant et stimulant où ils développent progressivement leur autonomie et acquièrent les compétences fondamentales qui les accompagneront tout au long de leur scolarité.</p>",
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
      title: "Philosophie pédagogique",
      contentHtml: "<p>L'école maternelle constitue la première étape fondamentale pour garantir la réussite des élèves. Elle intègre des méthodes d'apprentissage diversifiées — résolution de problèmes, exercices pratiques, mémorisation — avec le jeu comme élément central de la pédagogie. Chaque enfant apprend à son rythme dans un cadre sécurisant et adapté.</p>",
      order: 3,
    },
    {
      sectionKey: "domains",
      title: "Domaines d'apprentissage",
      contentHtml: JSON.stringify([
        { title: "Mobiliser le langage dans toutes ses dimensions", description: "Développer l'expression orale et écrite, découvrir la fonction de l'écrit, enrichir le vocabulaire et préparer l'apprentissage de la lecture.", icon: "BookOpen" },
        { title: "Agir, s'exprimer, comprendre à travers l'activité physique", description: "Explorer les possibilités corporelles, coopérer, s'engager dans des activités motrices et développer la coordination.", icon: "Users" },
        { title: "Agir, s'exprimer, comprendre à travers les activités artistiques", description: "Développer la sensibilité, l'imagination et la créativité à travers les arts visuels, la musique et les spectacles vivants.", icon: "Music" },
        { title: "Acquérir les premiers outils mathématiques", description: "Découvrir les nombres, les formes, les grandeurs et les repères spatiaux à travers la manipulation et le jeu.", icon: "Calculator" },
        { title: "Explorer le monde", description: "Découvrir le vivant, la matière, les objets, le temps et l'espace pour construire les premiers repères sur le monde environnant.", icon: "Compass" },
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
  await seedPage("offre-elementaire", "École Élémentaire", [
    {
      sectionKey: "overview",
      title: "Construire les fondations de la réussite.",
      contentHtml: "<p>L'école élémentaire du Lycée Montaigne offre un parcours structuré de cinq années où les élèves acquièrent les fondamentaux en lecture, écriture et mathématiques. Ces apprentissages constituent le socle de leur réussite académique future.</p><p>À travers deux cycles complémentaires, les élèves développent leur esprit critique, leur curiosité intellectuelle et leur conscience de l'environnement, tout en renforçant progressivement leur autonomie et leurs compétences sociales.</p>",
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
        { name: "Cycle 2", levels: "CP – CE1 – CE2", description: "Le cycle des apprentissages fondamentaux met l'accent sur la curiosité et l'interaction avec l'environnement. Les élèves apprennent à lire, écrire et compter tout en développant leur créativité et leur goût pour la découverte." },
        { name: "Cycle 3", levels: "CM1 – CM2", description: "Le cycle de consolidation fait le lien entre l'école primaire et le collège. Il renforce les fondamentaux en français, mathématiques et anglais, et prépare les élèves à une plus grande autonomie dans les apprentissages." },
      ]),
      order: 3,
    },
    {
      sectionKey: "enrichment",
      title: "Activités d'enrichissement",
      contentHtml: JSON.stringify([
        "Projets pédagogiques interdisciplinaires",
        "Activités artistiques et culturelles",
        "Initiation sportive et éducation physique",
        "Découvertes scientifiques et expérimentations",
        "Sorties de terrain et visites culturelles",
        "Conférences et rencontres éducatives",
      ]),
      order: 4,
    },
    {
      sectionKey: "key-features",
      title: "Points forts",
      contentHtml: JSON.stringify([
        "Intégration des sciences humaines et sociales",
        "Développement de l'esprit critique dès la primaire",
        "Acquisition de bonnes habitudes de travail",
        "Apprentissage de l'argumentation et du débat",
        "Construction progressive de l'autonomie",
        "Maîtrise des outils numériques de base",
      ]),
      order: 5,
    },
  ]);
  console.log("  Page: offre-elementaire");

  // ─── Offre College ───
  await seedPage("offre-college", "Collège", [
    {
      sectionKey: "overview",
      title: "Développer l'autonomie et la pensée critique.",
      contentHtml: "<p>Le collège du Lycée Montaigne accompagne les élèves de la 6ème à la 3ème dans le système secondaire français. C'est une période charnière où les jeunes développent leur autonomie intellectuelle avec des enseignants spécialisés par matière.</p><p>À travers des compétitions académiques, des voyages éducatifs, des projets collaboratifs et le développement de la pensée critique, nos élèves acquièrent les compétences nécessaires pour réussir au lycée et au-delà.</p>",
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
        "Enseignants spécialisés par discipline",
        "Compétitions académiques et olympiades",
        "Voyages éducatifs et échanges culturels",
        "Projets collaboratifs interdisciplinaires",
        "Développement de la pensée critique",
        "Préparation au Diplôme National du Brevet",
      ]),
      order: 3,
    },
    {
      sectionKey: "dnb",
      title: "Diplôme National du Brevet",
      contentHtml: "<p>Le Diplôme National du Brevet (DNB) est le premier examen national que passent les élèves en fin de 3ème. Il évalue la maîtrise du socle commun de connaissances, de compétences et de culture, et comprend des épreuves écrites et une épreuve orale.</p>",
      order: 4,
    },
    {
      sectionKey: "dnb-exams",
      title: "Épreuves du DNB",
      contentHtml: JSON.stringify([
        { subject: "Français", description: "Épreuve écrite évaluant la compréhension, l'analyse de texte et la maîtrise de la langue écrite.", icon: "BookOpen" },
        { subject: "Mathématiques", description: "Épreuve écrite testant le raisonnement logique, la résolution de problèmes et les compétences calculatoires.", icon: "Calculator" },
        { subject: "Histoire-Géographie et EMC", description: "Épreuve écrite portant sur les repères historiques, géographiques et l'enseignement moral et civique.", icon: "Globe" },
        { subject: "Sciences", description: "Épreuve écrite couvrant deux matières parmi les sciences de la vie et de la Terre, la physique-chimie et la technologie.", icon: "FlaskConical" },
        { subject: "Épreuve orale", description: "Soutenance d'un projet mené dans le cadre des EPI ou des parcours éducatifs, évaluant l'expression et l'argumentation.", icon: "Users" },
      ]),
      order: 5,
    },
  ]);
  console.log("  Page: offre-college");

  // ─── Offre Lycee ───
  await seedPage("offre-lycee", "Lycée", [
    {
      sectionKey: "overview",
      title: "Vers l'excellence et l'enseignement supérieur.",
      contentHtml: "<p>Le lycée du Lycée Montaigne offre un parcours de trois années — Seconde, Première et Terminale — qui prépare les élèves au baccalauréat et à la poursuite d'études supérieures. C'est le moment où chaque élève affine ses choix d'orientation.</p><p>Les élèves explorent d'abord un large éventail de matières en Seconde avant de se spécialiser progressivement. Des programmes de certifications internationales et d'exploration professionnelle complètent la formation académique pour préparer chaque élève à son avenir.</p>",
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
      title: "Filières de spécialisation",
      contentHtml: "<p>À partir de la classe de Première, les élèves choisissent une filière de spécialisation correspondant à leurs aptitudes et à leur projet d'orientation. Chaque filière offre un parcours riche et exigeant.</p>",
      order: 3,
    },
    {
      sectionKey: "tracks",
      title: "Nos filières",
      contentHtml: JSON.stringify([
        { name: "Filière Scientifique", description: "Mathématiques, physique-chimie, sciences de la vie et de la Terre, numérique et sciences informatiques. Un parcours rigoureux pour les élèves passionnés par les sciences et la recherche.", icon: "FlaskConical", color: "from-primary to-primary-dark" },
        { name: "Filière Littéraire", description: "Humanités, littérature, philosophie, langues, histoire-géographie, géopolitique et sciences politiques. Un parcours pour les esprits curieux et les futurs acteurs de la culture.", icon: "BookOpen", color: "from-secondary to-secondary-dark" },
        { name: "Filière Économique et Sociale", description: "Sciences économiques et sociales, mathématiques appliquées, histoire-géographie, géopolitique. Un parcours préparé aux enjeux du monde contemporain et aux métiers de demain.", icon: "Globe", color: "from-[#8B6914] to-[#C4961A]" },
      ]),
      order: 4,
    },
    {
      sectionKey: "key-features",
      title: "Points forts",
      contentHtml: JSON.stringify([
        "Préparation au Baccalauréat français et libanais",
        "Bac Français International (BFI)",
        "Certifications internationales (Cambridge, IELTS, DELE, SAT)",
        "Programmes d'exploration professionnelle",
        "Accompagnement personnalisé à l'orientation",
        "Transition vers l'enseignement supérieur ou l'emploi",
      ]),
      order: 5,
    },
    {
      sectionKey: "additional",
      title: "Compléments",
      contentHtml: JSON.stringify([
        {
          title: "Préparation aux examens",
          description: "Nos élèves sont préparés aux examens nationaux et internationaux avec un accompagnement rigoureux.",
          items: [
            "Baccalauréat français général",
            "Baccalauréat libanais",
            "Bac Français International (BFI)",
            "Épreuves anticipées de Première",
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
      descriptionHtml: "<p>Retrouvailles entre anciens, enseignants et personnel du lycée autour d'un brunch convivial sur le campus de Beit Chabab. Une journée de fraternité, de convivialité et de souvenirs partagés où chacun a pu raviver les liens qui unissent les générations du Lycée Montaigne.</p>",
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
      title: "Réunion de Noël",
      date: new Date("2024-12-23"),
      descriptionHtml: "<p>Retrouvailles festives à l'occasion des fêtes de fin d'année. Retrouvailles émouvantes, rires et souvenirs partagés — l'occasion parfaite de se retrouver, d'échanger sur les parcours depuis le lycée et de profiter de l'esprit de Noël en bonne compagnie.</p>",
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
      descriptionHtml: "<p>Premier brunch des anciens sur le campus de Beit Chabab pour les promos 2022, 2023 et 2024. C'est lors de cette journée fondatrice qu'a été élu le comité constitutif de l'AALM, marquant le début officiel de l'Amicale des Anciens du Lycée Montaigne.</p>",
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
      title: "Conseil Stratégique",
      subtitle: "Instance consultative de pilotage stratégique",
      iconName: "Building2",
      accentColor: "from-primary to-primary-dark",
      descriptionHtml: "<p>Un Conseil Stratégique, consultatif, qui accompagne le Conseil d'Administration dans sa stratégie de croissance, de positionnement, de planification et de développement.</p><p>Cette instance joue un rôle essentiel dans la définition des orientations à long terme de l'établissement, en apportant une expertise diversifiée et une vision prospective au service du projet éducatif du Lycée Montaigne.</p>",
      compositionHtml: "<ul><li>Président</li><li>Membre d'honneur</li><li>Cheffe d'établissement</li><li>Président du Conseil d'Administration</li><li>Membres nommés</li></ul>",
      membersJson: JSON.stringify([
        { name: "Raymond Araygi", role: "Président" },
        { name: "Yves Aubin De La Messuzière", role: "Membre d'honneur" },
        { name: "Rachel Atallah", role: "Cheffe d'établissement" },
        { name: "Chaaya Atallah", role: "Président du Conseil d'Administration" },
        { name: "Camil Atallah", role: "Membre" },
        { name: "Sami Toubia", role: "Membre" },
        { name: "Andrée Daouk", role: "Membre" },
        { name: "Viviane Ghanem", role: "Membre" },
      ]),
      responsibilitiesHtml: "<ul><li>Accompagner le Conseil d'Administration dans sa stratégie de croissance</li><li>Conseiller sur le positionnement institutionnel</li><li>Contribuer à la planification stratégique à moyen et long terme</li><li>Orienter les axes de développement de l'établissement</li></ul>",
      order: 1,
    },
    {
      slug: "conseil-etablissement",
      title: "Conseil d'Établissement",
      subtitle: "Instance principale de gouvernance scolaire",
      iconName: "Scale",
      accentColor: "from-secondary to-secondary-dark",
      descriptionHtml: "<p>Le conseil d'établissement est une instance importante qui est consultée sur ce qui touche à la vie de l'établissement.</p><p>Il réunit l'ensemble des parties prenantes de la communauté éducative pour débattre et orienter les décisions majeures concernant le fonctionnement et le projet pédagogique du lycée.</p>",
      compositionHtml: "<ul><li>Direction</li><li>Représentants des parents</li><li>Élèves du secondaire</li><li>Représentants des enseignants</li></ul>",
      meetingFrequency: "Le conseil d'établissement se réunit au moins 3 fois par an.",
      presidence: "Présidé par la Cheffe d'établissement",
      responsibilitiesHtml: "<ul><li>Adopter le projet d'établissement</li><li>Émettre des avis sur les questions touchant à la vie de l'établissement</li><li>Examiner le rapport annuel de fonctionnement</li><li>Voter le règlement intérieur</li></ul>",
      order: 2,
    },
    {
      slug: "conseil-ecole",
      title: "Conseil d'École",
      subtitle: "Organe consultatif du premier degré",
      iconName: "GraduationCap",
      accentColor: "from-primary to-primary-dark",
      descriptionHtml: "<p>Le conseil d'école est un organe du conseil d'établissement. Il est l'instance de concertation qui examine les questions relatives à l'organisation et au fonctionnement pédagogique des classes du primaire.</p><p>Il couvre l'ensemble du premier degré, de la PS de maternelle au CM2, et permet une coordination étroite entre les équipes pédagogiques et les familles.</p>",
      compositionHtml: "<ul><li>Direction</li><li>Représentants des parents</li><li>Équipe pédagogique</li></ul>",
      meetingFrequency: "Le conseil d'école se réunit à minima trois fois par an.",
      presidence: "Présidé par la directrice de l'école",
      responsibilitiesHtml: "<ul><li>Voter le règlement intérieur de l'école</li><li>Adopter le projet d'école</li><li>Donner un avis sur les questions intéressant la vie de l'école</li><li>Examiner les conditions de bonne intégration des enfants en situation de handicap</li></ul>",
      order: 3,
    },
    {
      slug: "conseil-pedagogique",
      title: "Conseil Pédagogique",
      subtitle: "Instance de réflexion et d'innovation pédagogique",
      iconName: "BookOpen",
      accentColor: "from-secondary to-secondary-dark",
      descriptionHtml: "<p>Le conseil pédagogique est une instance de consultation des enseignants sur la politique éducative de l'établissement. Il prépare la partie pédagogique du projet d'établissement.</p><p>Il favorise la concertation entre les enseignants, notamment sur la coordination des enseignements, les dispositifs d'aide et de soutien, les innovations pédagogiques et l'évaluation des élèves.</p>",
      compositionHtml: "<ul><li>Cheffe d'établissement</li><li>Adjoints et directeurs</li><li>Coordinateurs de discipline</li><li>Professeurs représentants</li></ul>",
      presidence: "Présidé par la Cheffe d'établissement",
      responsibilitiesHtml: "<ul><li>Préparer la partie pédagogique du projet d'établissement</li><li>Coordonner les enseignements et les méthodes pédagogiques</li><li>Favoriser l'innovation et l'expérimentation pédagogique</li><li>Proposer des actions de formation des enseignants</li><li>Accompagner les dispositifs d'aide et de soutien aux élèves</li></ul>",
      order: 4,
    },
    {
      slug: "conseil-discipline",
      title: "Conseil de Discipline",
      subtitle: "Garant du respect du règlement intérieur",
      iconName: "Gavel",
      accentColor: "from-primary to-primary-dark",
      descriptionHtml: "<p>Le conseil de discipline est compétent pour prononcer les sanctions prévues par le règlement intérieur à l'encontre des élèves ayant commis des fautes graves.</p><p>Il garantit le respect du droit et de l'équité dans le traitement des situations disciplinaires, en veillant au respect du contradictoire et des droits de la défense.</p>",
      compositionHtml: "<ul><li>Cheffe d'établissement</li><li>Adjoints</li><li>Représentants des enseignants</li><li>Représentants des parents</li><li>Représentants des élèves</li><li>Conseiller principal d'éducation</li></ul>",
      presidence: "Présidé par la Cheffe d'établissement",
      responsibilitiesHtml: "<ul><li>Examiner les cas de manquement grave au règlement intérieur</li><li>Prononcer des sanctions disciplinaires</li><li>Garantir le respect des droits de la défense</li><li>Veiller à l'équité dans le traitement des situations</li></ul>",
      order: 5,
    },
    {
      slug: "conseil-classe",
      title: "Conseil de Classe",
      subtitle: "Suivi individuel et collectif des élèves",
      iconName: "ClipboardList",
      accentColor: "from-secondary to-secondary-dark",
      descriptionHtml: "<p>Le conseil de classe est l'instance qui examine les questions pédagogiques intéressant la vie de la classe, notamment les modalités d'organisation du travail personnel des élèves.</p><p>Il se prononce sur les conditions dans lesquelles se poursuit la scolarité de chaque élève, émet des avis et formule des propositions d'orientation.</p>",
      compositionHtml: "<ul><li>Professeur principal</li><li>Enseignants de la classe</li><li>Délégués des élèves</li><li>Délégués des parents</li><li>Conseiller principal d'éducation</li><li>Direction</li></ul>",
      meetingFrequency: "Le conseil de classe se réunit trois fois par an, à chaque fin de trimestre.",
      presidence: "Présidé par la Cheffe d'établissement ou son représentant",
      responsibilitiesHtml: "<ul><li>Examiner les résultats scolaires individuels et collectifs</li><li>Émettre des propositions d'orientation</li><li>Formuler un avis sur le passage en classe supérieure</li><li>Identifier les élèves en difficulté et proposer des solutions</li></ul>",
      order: 6,
    },
    {
      slug: "conseil-vie-collegienne",
      title: "Conseil de Vie Collégienne",
      subtitle: "CVCO — Expression et citoyenneté des collégiens",
      iconName: "Megaphone",
      accentColor: "from-primary to-primary-dark",
      descriptionHtml: "<p>Le Conseil de Vie Collégienne (CVCO) favorise l'expression des collégiens et contribue à l'apprentissage de la citoyenneté.</p><p>Instance de dialogue et d'échange, le CVCO permet aux élèves du collège de formuler des propositions sur la vie de l'établissement et de participer activement aux décisions qui les concernent.</p>",
      compositionHtml: "<ul><li>Élèves élus représentant les collégiens</li><li>Représentants de la direction</li><li>Représentants des enseignants</li><li>Conseiller principal d'éducation</li></ul>",
      responsibilitiesHtml: "<ul><li>Favoriser l'expression des collégiens</li><li>Contribuer à l'apprentissage de la citoyenneté</li><li>Formuler des propositions sur la vie scolaire</li><li>Participer à l'amélioration du climat scolaire</li><li>Porter les projets et initiatives des élèves</li></ul>",
      order: 7,
    },
    {
      slug: "commission-hygiene-securite",
      title: "Commission Hygiène et Sécurité",
      subtitle: "Prévention des risques et bien-être collectif",
      iconName: "HeartPulse",
      accentColor: "from-secondary to-secondary-dark",
      descriptionHtml: "<p>La Commission Hygiène et Sécurité est un groupe de travail chargé d'identifier les risques potentiels (incendie, accidents, santé), de vérifier le respect des normes de sécurité, et de proposer des mesures de prévention.</p><p>Elle assure le suivi des incidents, l'amélioration des conditions de travail et d'étude, et la sensibilisation de la communauté scolaire aux comportements responsables en matière de sécurité et d'hygiène.</p>",
      compositionHtml: "<ul><li>Représentants de l'administration</li><li>Représentants des enseignants</li><li>Représentants du personnel</li><li>Représentants des parents</li><li>Représentants des élèves</li></ul>",
      meetingFrequency: "La commission se réunit deux fois par an et peut soumettre des recommandations à la direction.",
      responsibilitiesHtml: "<ul><li>Identifier les risques potentiels (incendie, accidents, santé)</li><li>Vérifier le respect des normes de sécurité dans les locaux</li><li>Proposer des actions de prévention (exercices d'évacuation, formations)</li><li>Assurer le suivi des accidents et incidents</li><li>Améliorer les conditions de travail et d'étude</li><li>Sensibiliser la communauté aux comportements responsables</li></ul>",
      order: 8,
    },
    {
      slug: "conseil-vie-lyceenne",
      title: "Conseil de Vie Lycéenne",
      subtitle: "CVL — Participation des lycéens aux décisions",
      iconName: "UserCheck",
      accentColor: "from-primary to-primary-dark",
      descriptionHtml: "<p>Le Conseil de Vie Lycéenne (CVL) est le lieu où les lycéens sont associés aux décisions de l'établissement.</p><p>Les élus y représentent les élèves et participent activement à la réflexion sur les grandes questions de la vie scolaire, contribuant ainsi à une gouvernance plus inclusive et démocratique.</p>",
      compositionHtml: "<ul><li>Élèves élus représentant les lycéens</li><li>Représentants de la direction</li><li>Représentants des enseignants</li><li>Représentants des parents</li></ul>",
      responsibilitiesHtml: "<ul><li>Associer les lycéens aux décisions de l'établissement</li><li>Représenter les élèves du lycée</li><li>Formuler des propositions sur l'organisation scolaire</li><li>Contribuer au bien-être et à la vie lycéenne</li><li>Promouvoir l'engagement citoyen des élèves</li></ul>",
      order: 9,
    },
    {
      slug: "cellule-formation",
      title: "Cellule de Formation",
      subtitle: "Pilotage de la formation continue des personnels",
      iconName: "Globe",
      accentColor: "from-secondary to-secondary-dark",
      descriptionHtml: "<p>La Cellule de Formation est un groupe de pilotage et de coordination chargé d'identifier les besoins en formation des personnels et de proposer des actions de formation continue en cohérence avec le projet d'établissement.</p><p>Elle travaille en lien étroit avec les priorités institutionnelles et les orientations du réseau MLF pour garantir un développement professionnel de qualité au service des élèves.</p>",
      compositionHtml: "<ul><li>Cheffe d'établissement</li><li>Responsables pédagogiques</li><li>Coordinateurs de formation</li><li>Représentants des équipes pédagogiques</li></ul>",
      responsibilitiesHtml: "<ul><li>Identifier les besoins en formation des équipes pédagogiques et éducatives</li><li>Aligner les besoins avec les priorités institutionnelles et les orientations du réseau</li><li>Élaborer le plan de formation annuel ou pluriannuel</li><li>Suivre et évaluer les actions de formation mises en œuvre</li><li>Favoriser le partage de compétences et de pratiques professionnelles</li></ul>",
      order: 10,
    },
    {
      slug: "cesce",
      title: "CESCE",
      subtitle: "Comité d'Éducation à la Santé, à la Citoyenneté et à l'Environnement",
      iconName: "Shield",
      accentColor: "from-primary to-primary-dark",
      descriptionHtml: "<p>Le CESCE est une instance de réflexion, d'observation et de proposition qui conçoit, met en œuvre et évalue un projet éducatif en matière d'éducation à la citoyenneté, à la santé, à l'environnement et au développement durable.</p><p>Intégré au projet d'établissement, le CESCE organise des partenariats en fonction des problématiques éducatives à traiter et contribue à la formation globale des citoyens de demain.</p>",
      compositionHtml: "<ul><li>Représentants de la direction</li><li>Représentants des enseignants</li><li>Représentants des parents</li><li>Représentants des élèves</li><li>Partenaires extérieurs</li></ul>",
      responsibilitiesHtml: "<ul><li>Concevoir et mettre en œuvre des projets éducatifs en santé et citoyenneté</li><li>Évaluer l'efficacité des programmes engagés</li><li>Organiser des partenariats autour de thématiques éducatives spécifiques</li><li>Intégrer les actions au projet d'établissement</li><li>Promouvoir l'éducation au développement durable et à l'environnement</li></ul>",
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
      contentHtml: "<p>Les inscriptions et réinscriptions pour l'année scolaire 2026-2027 sont désormais ouvertes. <a href='/inscriptions'>Consultez la procédure</a>.</p>",
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
