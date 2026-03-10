import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

/**
 * Seeds missing vie-du-lm sections: EFE3D label + dev activities
 * Run with: npx tsx prisma/seed-vie-missing.ts
 */
async function main() {
  const viePage = await db.page.findFirst({ where: { slug: "vie-du-lm" } });
  if (!viePage) {
    console.error("vie-du-lm page not found in DB");
    return;
  }

  const existing = await db.pageSection.findMany({ where: { pageId: viePage.id } });
  const existingKeys = existing.map((s) => s.sectionKey);

  // ── EFE3D ────────────────────────────────────────────────────────────
  if (!existingKeys.includes("efe3d")) {
    await db.pageSection.create({
      data: {
        pageId: viePage.id,
        sectionKey: "efe3d",
        title: "EFE3D — Label Expert",
        contentHtml: `<p>Le Lycée Montaigne a le plaisir de vous annoncer sa labellisation au niveau 3 (expert) en tant qu'établissement français à l'étranger en démarche de développement durable – EFE3D.</p><p>Nous venons d'obtenir le plus haut niveau de labellisation, concrétisant ainsi un travail qui a débuté lors de la création de notre établissement. Dès son origine, l'un des objectifs majeurs était de sensibiliser les élèves aux grands enjeux environnementaux, sociaux et économiques, afin de construire un monde résilient et équitable.</p><p>Nous nous engageons auprès de toute la communauté du Lycée Montaigne à continuer dans le même sens, en favorisant auprès de nos élèves cette éducation au développement durable, fondamentale pour former les citoyens de demain.</p>`,
        image: "https://lycee-montaigne.edu.lb/storage/development-durables/November2024/IXjTyiAwx79KnYFRYWvR.jpg",
        order: 15,
      },
    });
    console.log("  EFE3D section created.");
  } else {
    console.log("  EFE3D section already exists, skipping.");
  }

  // ── Dev Activities ────────────────────────────────────────────────────
  if (!existingKeys.includes("dev-activite-1")) {
    await db.pageSection.create({
      data: {
        pageId: viePage.id,
        sectionKey: "dev-activite-1",
        title: "Un lycée engagé pour le tri",
        contentHtml: `<p>En collaboration avec l'entreprise Gemayel Frères – Bikfaya, qui nous a offert gracieusement des poubelles en carton, toutes les classes, salles et bureaux du Lycée Montaigne sont désormais équipés pour le tri du papier.</p><p>Merci aux responsables qui ont préparé les étiquettes de tri, aux assistants d'éducation qui ont ajusté les poubelles, aux élèves de terminale qui ont donné un coup de main, et au personnel administratif qui nous a mis à disposition une salle de travail.</p><p><strong>Consigne de tri – PAPIER SEULEMENT :</strong> Propre, non froissé, pas de mouchoirs.</p>`,
        image: "https://lycee-montaigne.edu.lb/storage/development-durables/November2024/IXjTyiAwx79KnYFRYWvR.jpg",
        order: 16,
      },
    });
    console.log("  dev-activite-1 created.");
  } else {
    console.log("  dev-activite-1 already exists, skipping.");
  }

  if (!existingKeys.includes("dev-activite-2")) {
    await db.pageSection.create({
      data: {
        pageId: viePage.id,
        sectionKey: "dev-activite-2",
        title: "Une fête des profs écoresponsable",
        contentHtml: `<p>Les éco-déléguées de la 6ᵉ C ont voulu faire de la fête des professeurs un moment unique, en engageant toute leur classe et leurs parents dans une démarche respectueuse de la planète.</p><ul><li>Invitations envoyées par e-mail</li><li>Messages écrits sur du papier bio fabriqué à partir de feuilles de bananier</li><li>Décoration naturelle et artisanale</li><li>Couverts réutilisables &amp; gâteaux faits maison</li><li>Cadeaux en bois massif, fabriqués à la main</li><li>Musique live interprétée par les élèves</li></ul>`,
        image: "https://lycee-montaigne.edu.lb/storage/climate-categories/April2025/mNHwl4NOWUZkZgPfyTNi.jpeg",
        order: 17,
      },
    });
    console.log("  dev-activite-2 created.");
  } else {
    console.log("  dev-activite-2 already exists, skipping.");
  }

  console.log("\nDone! Missing vie-du-lm sections seeded.");
}

main()
  .catch(console.error)
  .finally(() => db.$disconnect());
