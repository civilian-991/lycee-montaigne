import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

/**
 * Seeds extrascolaire ActivityItems for the "Activités périscolaires" and "Association sportive" sections.
 * Run with: npx tsx prisma/seed-extrascolaire.ts
 */
async function main() {
  console.log("Seeding extrascolaire activities...\n");

  // ── Périscolaires ──────────────────────────────────────────────
  const existing = await db.activityItem.findMany({ where: { category: "periscolaire" } });
  if (existing.length <= 1) {
    // Remove placeholder if it has generic title
    const placeholder = existing.find((a) => a.title === "Activités périscolaires");
    if (placeholder) {
      await db.activityItem.delete({ where: { id: placeholder.id } });
    }

    await db.activityItem.createMany({
      data: [
        {
          title: "Arts plastiques",
          description: "Peinture, dessin, sculpture et expression créative. Les élèves développent leur sensibilité artistique et leur créativité à travers différentes techniques.",
          image: "https://lycee-montaigne.edu.lb/storage/activites-prescolaires/May2025/vjpXai9c7VbVIINjggcN.jpeg",
          category: "periscolaire",
          order: 1,
        },
        {
          title: "Robotique & Coding",
          description: "Initiation à la programmation et à la robotique. Les élèves conçoivent et programment des robots et participent à des compétitions nationales et internationales.",
          image: "https://lycee-montaigne.edu.lb/storage/espagne-events/September2024/40s9JhoWVokBBj9DzImD.jpg",
          category: "periscolaire",
          order: 2,
        },
        {
          title: "Musique & Chorale",
          description: "Pratique vocale et instrumentale, éveil musical et participation à des spectacles. La chorale du lycée se produit lors des grands événements de l'établissement.",
          image: "https://lycee-montaigne.edu.lb/storage/activites-prescolaires/May2025/vjpXai9c7VbVIINjggcN.jpeg",
          category: "periscolaire",
          order: 3,
        },
        {
          title: "Théâtre",
          description: "Expression théâtrale, improvisation et mise en scène. Les élèves présentent leurs créations lors du spectacle de fin d'année.",
          image: "https://lycee-montaigne.edu.lb/storage/climat-categories/April2025/mNHwl4NOWUZkZgPfyTNi.jpeg",
          category: "periscolaire",
          order: 4,
        },
        {
          title: "Club Lecture & Écriture",
          description: "Ateliers d'écriture créative, débats littéraires et cercles de lecture pour développer l'amour des livres et l'expression écrite.",
          image: "https://lycee-montaigne.edu.lb/storage/orientation-s1/July2025/4WWbVtfsEoVLlFT5F8AR.png",
          category: "periscolaire",
          order: 5,
        },
        {
          title: "Cuisine & Gastronomie",
          description: "Ateliers culinaires pour découvrir les saveurs du monde, apprendre les bases de la cuisine et développer l'autonomie au quotidien.",
          image: "https://lycee-montaigne.edu.lb/storage/vie-s1/November2024/GS7jV1MyA75tAjglBQcx.jpg",
          category: "periscolaire",
          order: 6,
        },
      ],
      skipDuplicates: true,
    });
    console.log("  Périscolaire activities created.");
  } else {
    console.log(`  Périscolaire activities already exist (${existing.length}), skipping.`);
  }

  // ── Sportives ──────────────────────────────────────────────────
  const existingSport = await db.activityItem.findMany({ where: { category: "sportive" } });
  if (existingSport.length <= 1) {
    const placeholder = existingSport.find((a) => a.title === "Association sportive");
    if (placeholder) {
      await db.activityItem.delete({ where: { id: placeholder.id } });
    }

    await db.activityItem.createMany({
      data: [
        {
          title: "Basketball",
          description: "Entraînements hebdomadaires et participation aux compétitions inter-lycées de la ligue AEFE-UNSS. Équipes masculines et féminines.",
          image: "https://lycee-montaigne.edu.lb/storage/ligue-sportive-events/January2026/cu5MtjhcWR9veHHS8X6k.jpeg",
          category: "sportive",
          order: 1,
        },
        {
          title: "Tennis de table",
          description: "Discipline phare de l'association sportive. Nos élèves obtiennent régulièrement des classements de haut niveau lors des compétitions ZPO AEFE-UNSS.",
          image: "https://lycee-montaigne.edu.lb/storage/ligue-sportive-events/May2025/4RSzcaY5Pm9PpOYkhyfK.jpeg",
          category: "sportive",
          order: 2,
        },
        {
          title: "Escalade",
          description: "Initiation et perfectionnement à l'escalade, développant la confiance en soi, la coordination et la persévérance.",
          image: "https://lycee-montaigne.edu.lb/storage/ligue-sportive-events/May2025/P3OuuxEc709C0u8wyFTB.jpeg",
          category: "sportive",
          order: 3,
        },
        {
          title: "Ultimate Frisbee",
          description: "Sport collectif alliant vitesse et esprit d'équipe. Le Lycée Montaigne a obtenu la 2ème place lors du tournoi d'Ultimate Frisbee ZPO 2025.",
          image: "https://lycee-montaigne.edu.lb/storage/ligue-sportive-events/May2025/oXxwOv94KQ89cfaEnDuy.jpeg",
          category: "sportive",
          order: 4,
        },
        {
          title: "Ski & Sports d'hiver",
          description: "Participation au criterium de ski à Faraya. Chris Tchopourian a obtenu la 2ème place en catégorie II garçons lors du critérium 2024.",
          image: "https://lycee-montaigne.edu.lb/storage/ligue-sportive-events/September2024/LiFT96PPIbuZ7icTClEs.jpg",
          category: "sportive",
          order: 5,
        },
        {
          title: "Échecs",
          description: "Club d'échecs proposant des entraînements réguliers et des participations aux championnats AEFE-UNSS. William Mbarak a obtenu la 3ème place au championnat 2024.",
          image: "https://lycee-montaigne.edu.lb/storage/ligue-sportive-events/September2024/zaHImTS6XcJCm6ND56Tf.jpg",
          category: "sportive",
          order: 6,
        },
      ],
      skipDuplicates: true,
    });
    console.log("  Sportive activities created.");
  } else {
    console.log(`  Sportive activities already exist (${existingSport.length}), skipping.`);
  }

  console.log("\nDone! Extrascolaire activities seeded.");
}

main()
  .catch(console.error)
  .finally(() => db.$disconnect());
