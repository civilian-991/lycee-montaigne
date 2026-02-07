import { PrismaClient } from "@prisma/client";
import { hashSync } from "bcryptjs";

const db = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Create admin user
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
  console.log("Admin user created: admin@lycee-montaigne.edu.lb / admin123");

  // Site settings
  const settings = [
    { key: "site_name", value: "Lycée Montaigne" },
    { key: "site_subtitle", value: "Beit Chabab" },
    { key: "email", value: "info@lycee-montaigne.edu.lb" },
    { key: "phone", value: "+961 4 982 082 / 983 845 / 985 256" },
    { key: "fax", value: "+961 4 985 256" },
    { key: "address", value: "Beit Chabab, Quartier Baydar Chouar, Metn, Liban" },
    { key: "facebook", value: "https://www.facebook.com/LyceeMontaigneBeitChabab" },
    { key: "instagram", value: "https://www.instagram.com/lyceemontaignebeitchabab/" },
    { key: "linkedin", value: "https://www.linkedin.com/school/lyc%C3%A9e-montaigne-beit-chabab/" },
    { key: "stat_eleves", value: "1085" },
    { key: "stat_reussite", value: "100%" },
    { key: "stat_nationalites", value: "29" },
    { key: "stat_langues", value: "3" },
  ];

  for (const s of settings) {
    await db.siteSetting.upsert({
      where: { key: s.key },
      update: { value: s.value },
      create: s,
    });
  }
  console.log("Site settings seeded.");

  // Staff members
  const staff = [
    {
      name: "Mme Rachel Atallah",
      title: "Cheffe d'établissement",
      photo: "/images/eta-s3/November2024/tN7I8Zm4bodDopvV14Hw.png",
      section: "direction",
      order: 1,
      messageHtml:
        "Le Lycée Montaigne est un établissement jeune et dynamique qui accueille près de 1100 élèves de la maternelle à la terminale.",
    },
    {
      name: "",
      title: "Proviseure déléguée",
      photo: "/images/mot-directrices/March2025/rLBOCUkYuoLx7jcdp3LE.jpeg",
      section: "direction",
      order: 2,
      messageHtml:
        "Au Lycée Montaigne, nous mettons tout en œuvre pour accompagner chaque élève dans son parcours scolaire et personnel.",
    },
  ];

  for (const s of staff) {
    await db.staffMember.create({ data: s });
  }
  console.log("Staff members seeded.");

  // News items
  const news = [
    {
      title: "Inscriptions 2026-2027",
      image: "/images/adm-s1/December2025/xbMaFrODRj51WGOcKi4k.png",
      link: "/inscriptions",
      category: "inscriptions",
    },
    {
      title: "Portes Ouvertes Maternelle",
      image: "/images/s4-files/January2026/U4IfChjnxOFzmzse6Tme.jpeg",
      link: "/inscriptions#porte-ouvertes",
      category: "événement",
    },
    {
      title: "Résultats 2024-2025",
      image: "/images/examens-resultats/January2026/resized_IMG_6942.PNG",
      link: "/excellence-academique#resultats",
      category: "résultats",
    },
  ];

  for (const n of news) {
    await db.newsItem.create({ data: n });
  }
  console.log("News items seeded.");

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
