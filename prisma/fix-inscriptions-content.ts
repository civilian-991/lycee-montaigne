import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function main() {
  console.log("Fixing inscriptions page content...\n");

  const page = await db.page.findFirst({ where: { slug: "inscriptions" } });
  if (!page) {
    console.error("inscriptions page not found in DB.");
    return;
  }

  // ── 1. Procedure section — add formulaire + fiche médicale + direction@ ──
  const procedureSection = await db.pageSection.findFirst({
    where: { pageId: page.id, sectionKey: "procedure" },
  });

  const procedureHtml = `<p>Pour toute demande d'inscription, les familles sont priées de remplir le <a href="https://lyceemontaigne.datarays.co/studentprofile/publicpages/new/Step0.aspx" target="_blank" rel="noopener noreferrer">formulaire d'inscription en ligne</a>.</p>
<p>Les documents à fournir sont les suivants :</p>
<ul>
<li>Photocopie du livret de famille ou acte de naissance</li>
<li>Bulletins scolaires des deux dernières années</li>
<li>Carnet de vaccination et <a href="https://lyceemontaigneedulb-my.sharepoint.com/:w:/g/personal/zeina_karam_lycee-montaigne_edu_lb/EapGzcgDH-FBh30uhsZG7KEBBnuyLbmxIDxehoeainUA7w?rtime=FR1m48Qw3kg" target="_blank" rel="noopener noreferrer">fiche médicale</a></li>
<li>Deux photos d'identité</li>
<li>Photocopie du passeport ou carte d'identité</li>
</ul>
<p>Pour tout renseignement, contactez-nous à <a href="mailto:direction@lycee-montaigne.edu.lb">direction@lycee-montaigne.edu.lb</a> ou au <a href="tel:+9614982082">+961 4 982 082</a>.</p>`;

  if (procedureSection) {
    // Only update contentHtml if it doesn't already have the datarays link
    if (!procedureSection.contentHtml?.includes("datarays")) {
      await db.pageSection.update({
        where: { id: procedureSection.id },
        data: { contentHtml: procedureHtml },
      });
      console.log("✓ Procedure section updated with formulaire + fiche médicale + direction@");
    } else {
      console.log("– Procedure section already has datarays link, skipping");
    }
  } else {
    await db.pageSection.create({
      data: {
        pageId: page.id,
        sectionKey: "procedure",
        title: "Procédure d'inscription 2026-2027",
        contentHtml: procedureHtml,
        order: 1,
      },
    });
    console.log("✓ Procedure section created");
  }

  // ── 2. Portes ouvertes — add poster image ────────────────────────────
  const portesSection = await db.pageSection.findFirst({
    where: { pageId: page.id, sectionKey: "portes-ouvertes" },
  });

  const portesImage = "https://lycee-montaigne.edu.lb/storage/s4-files/January2026/YL5Fzq6r4YsYWLP4M7uF.jpeg";

  if (portesSection) {
    if (!portesSection.image) {
      await db.pageSection.update({
        where: { id: portesSection.id },
        data: { image: portesImage },
      });
      console.log("✓ Portes Ouvertes image added");
    } else {
      console.log("– Portes Ouvertes already has image, skipping");
    }
  } else {
    await db.pageSection.create({
      data: {
        pageId: page.id,
        sectionKey: "portes-ouvertes",
        title: "Portes Ouvertes Maternelle",
        contentHtml: "<p>Venez découvrir notre école maternelle lors de nos journées portes ouvertes. Consultez nos réseaux sociaux pour les prochaines dates.</p>",
        image: portesImage,
        order: 2,
      },
    });
    console.log("✓ Portes Ouvertes section created with image");
  }

  // ── 3. Bourses — add direct PDF link ─────────────────────────────────
  const boursesSection = await db.pageSection.findFirst({
    where: { pageId: page.id, sectionKey: "bourses" },
  });

  const boursesHtml = `<p>Les bourses scolaires sont destinées aux enfants français résidant à l'étranger. Elles sont accordées par le Consulat de France sur critères sociaux.</p>
<p>Pour plus d'informations sur les conditions d'éligibilité et la procédure de demande, consultez le site de l'<a href="https://www.aefe.fr/reseau-scolaire-mondial/faire-scolariser-son-enfant/bourses-scolaires" target="_blank" rel="noopener noreferrer">AEFE</a>.</p>
<p><a href="https://lycee-montaigne.edu.lb/storage/s3-files/December2025/lC4IB4p8m8weoPId1SS8.pdf" target="_blank" rel="noopener noreferrer">Télécharger : Bourses scolaires 2026-2027 — Premier conseil consulaire (PDF)</a></p>`;

  if (boursesSection) {
    if (!boursesSection.contentHtml?.includes("lC4IB4p8m8weoPId1SS8")) {
      await db.pageSection.update({
        where: { id: boursesSection.id },
        data: { contentHtml: boursesHtml },
      });
      console.log("✓ Bourses section updated with direct PDF link");
    } else {
      console.log("– Bourses section already has PDF link, skipping");
    }
  } else {
    await db.pageSection.create({
      data: {
        pageId: page.id,
        sectionKey: "bourses",
        title: "Bourses Scolaires",
        contentHtml: boursesHtml,
        order: 3,
      },
    });
    console.log("✓ Bourses section created with PDF link");
  }

  console.log("\nDone!");
}

main()
  .catch(console.error)
  .finally(() => db.$disconnect());
