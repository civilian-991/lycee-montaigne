import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

/**
 * Seeds web-radio and vie-du-lm-activites pages with their sections.
 * Run with: npx tsx prisma/seed-webradio-activites.ts
 */
async function main() {
  // ── Web Radio Page ────────────────────────────────────────────────────
  let webRadioPage = await db.page.findFirst({ where: { slug: "web-radio" } });
  if (!webRadioPage) {
    webRadioPage = await db.page.create({
      data: { slug: "web-radio", title: "Webradio", status: "PUBLISHED" },
    });
    console.log("  web-radio page created.");
  } else {
    console.log("  web-radio page already exists.");
  }

  const existingRadio = await db.pageSection.findMany({ where: { pageId: webRadioPage.id } });
  const existingRadioKeys = existingRadio.map((s) => s.sectionKey);

  const radioEmissions = [
    {
      sectionKey: "emission-confidences-ecoliers",
      title: "Confidences d'écoliers",
      contentHtml: `<p>Nouvelle émission sur la webradio scolaire : <strong>Confidences d'écoliers</strong></p><p>Les élèves de CM2 vous invitent à découvrir leur toute nouvelle production autour d'un thème intime et universel : <strong>le journal intime</strong>.</p><p>Exploré en classe avec leur enseignante, puis approfondi à la BCD avec la documentaliste, ce thème a éveillé curiosité et émotions. Les élèves ont découvert que de nombreuses personnalités tenaient un journal intime… et que certains d'entre eux aussi !</p><p>Dans cette émission, ils nous expliquent : Ce qu'est un journal intime, Comment débuter son propre carnet de confidences, Pourquoi cela peut faire du bien.</p><p>Finalement, écrire dans un journal intime, c'est un peu comme parler à soi-même… en toute liberté.</p><p><a href="https://www.instagram.com/reel/DQotJpzCIpG/?igsh=d2J1ZGp1amdxaHF1" target="_blank" rel="noopener noreferrer">Regardez la Vidéo</a></p>`,
      image: "https://lycee-montaigne.edu.lb/storage/web-radio-events/November2025/IFUfkoYfl4Nk6N3WJekP.jpeg",
      order: 1,
    },
    {
      sectionKey: "emission-radio-portes-ouvertes",
      title: "La radio LM en action pour les portes ouvertes maternelle",
      contentHtml: `<p>Nos jeunes reporters de la Radio LM étaient mobilisés à l'occasion des portes ouvertes de la maternelle. Micros en main, ils ont accueilli les familles, posé des questions et partagé leur enthousiasme pour l'école.</p><p><a href="https://www.instagram.com/reel/DQbqcQNjdwK/?igsh=MWJrbXcycWlwNTU5Zw==" target="_blank" rel="noopener noreferrer">Regardez la Vidéo</a></p>`,
      image: "https://lycee-montaigne.edu.lb/storage/webradios/November2024/amxLKLrgOzIeBoHAVT4x.jpeg",
      order: 2,
    },
  ];

  for (const emission of radioEmissions) {
    if (!existingRadioKeys.includes(emission.sectionKey)) {
      await db.pageSection.create({ data: { pageId: webRadioPage.id, ...emission } });
      console.log(`  Emission "${emission.title}" created.`);
    } else {
      console.log(`  Emission "${emission.title}" already exists, skipping.`);
    }
  }

  // ── Vie du LM Activites Page ──────────────────────────────────────────
  let activitesPage = await db.page.findFirst({ where: { slug: "vie-du-lm-activites" } });
  if (!activitesPage) {
    activitesPage = await db.page.create({
      data: { slug: "vie-du-lm-activites", title: "Activités — Développement durable", status: "PUBLISHED" },
    });
    console.log("  vie-du-lm-activites page created.");
  } else {
    console.log("  vie-du-lm-activites page already exists.");
  }

  const existingActs = await db.pageSection.findMany({ where: { pageId: activitesPage.id } });
  const existingActKeys = existingActs.map((s) => s.sectionKey);

  const activities = [
    // 2025-2026
    {
      sectionKey: "act-2026-tri",
      title: "Un lycée engagé pour le tri",
      contentHtml: `<p>En collaboration avec l'entreprise <strong>Gemayel Frères – Bikfaya</strong>, qui nous a offert gracieusement des poubelles en carton, toutes les classes, salles et bureaux du Lycée Montaigne sont désormais équipés pour le tri du papier.</p><p>Merci aux responsables qui ont préparé les étiquettes de tri, aux assistants d'éducation qui ont ajusté les poubelles, aux élèves de terminale qui ont donné un coup de main, et au personnel administratif qui nous a mis à disposition une salle de travail.</p><p><strong>Consigne de tri – PAPIER SEULEMENT :</strong> Propre · Non froissé · Pas de mouchoirs</p><p>Résultat : une belle mobilisation collective pour un geste simple mais essentiel !</p>`,
      image: "https://lycee-montaigne.edu.lb/storage/vie-de-lm-acts/October2025/m2M0KoM8dRAvr3uixgHW.jpeg",
      order: 1,
    },
    {
      sectionKey: "act-2026-paix",
      title: "Journée internationale de la Paix",
      contentHtml: `<p>À l'occasion de la Journée internationale de la paix, célébrée le vendredi 26 septembre au lycée Montaigne, les élèves de CM1 et CM2 ont exploré la notion de paix avec leur enseignante en EMC à travers des discussions, des vidéos et des échanges riches.</p><p>Pendant la récréation, accompagnés des documentalistes, ils ont transformé de vieux tee-shirts en bracelets de la paix, décorés de messages et dessins porteurs d'espoir.</p><p>Un beau moment de création, de partage et d'engagement pour un monde plus serein.</p><p><a href="https://www.instagram.com/reel/DJjxN-Nsyje/?igsh=MTV3MWR2cjZ5dXNsaQ==" target="_blank" rel="noopener noreferrer">Voir la vidéo</a></p>`,
      image: "https://lycee-montaigne.edu.lb/storage/vie-de-lm-acts/October2025/dMyXDIb3IY59dr9xrAwc.jpg",
      order: 2,
    },
    {
      sectionKey: "act-2026-greenup",
      title: "Formation des éco-délégués — Projet Green Up Lebanon",
      contentHtml: `<p>Nos éco-délégués de seconde — Elio, Reem et Ella — ont participé à une formation inspirante organisée par Live Love et l'UNICEF dans le cadre du projet <strong>Green Up Lebanon</strong>.</p><p>Au programme : écogestes, idées vertes et engagement collectif pour un avenir durable. Rencontres au Beirut Digital District et découverte de la plateforme Nahnou pour valoriser les actions éco-responsables.</p>`,
      image: "https://lycee-montaigne.edu.lb/storage/vie-de-lm-acts/November2025/hZav3NfXmxLUfUOHN9gF.jpeg",
      order: 3,
    },
    {
      sectionKey: "act-2026-serd",
      title: "Semaine Européenne de la Réduction des Déchets (SERD)",
      contentHtml: `<p>La SERD au Lycée Montaigne : agir pour réduire nos déchets !</p><p>Cette année, focus sur les <strong>déchets électroniques</strong> :</p><ul><li>5e A ont exploré le cycle de vie d'un smartphone, de l'usage au recyclage.</li><li>5e B ont découvert un lexique arabe de la pollution numérique.</li><li>Les secondes ont été sensibilisées aux e-waste par Live Love Lebanon et invitées à s'engager via NAHNOU.</li></ul><p>Au primaire, les élèves participent à <strong>Ma Petite Planète</strong>, un jeu éco-responsable de trois semaines avec des défis écologiques à relever en classe ou à la maison.</p>`,
      image: "https://lycee-montaigne.edu.lb/storage/vie-de-lm-acts/December2025/MYfH8cPDPoTSXVd9TtSc.jpeg",
      order: 4,
    },
    // 2024-2025
    {
      sectionKey: "act-2025-fete-profs",
      title: "Une fête des profs écoresponsable",
      contentHtml: `<p>Les éco-déléguées de la 6ᵉ C ont voulu faire de la fête des professeurs un moment unique, en engageant toute leur classe et leurs parents dans une démarche respectueuse de la planète. 🌱</p><ul><li>Invitations envoyées par e-mail</li><li>Messages écrits sur du papier bio fabriqué à partir de feuilles de bananier</li><li>Décoration naturelle et artisanale</li><li>Couverts réutilisables &amp; gâteaux faits maison</li><li>Cadeaux en bois massif, fabriqués à la main</li><li>Musique live interprétée par les élèves</li></ul>`,
      image: "https://lycee-montaigne.edu.lb/storage/vie-de-lm-acts/May2025/0UiEI51uPzzeAM4DK7EJ.jpeg",
      order: 5,
    },
    {
      sectionKey: "act-2025-mer-shorts",
      title: "Opération « Ma mer en shorts »",
      contentHtml: `<p>« Ma Mer en Shorts ! » : quand les jeunes prennent la parole pour l'océan.</p><p>Dans le cadre de cette initiative qui invite les 14-18 ans à exprimer en moins d'une minute leur lien personnel avec la mer, Nai Majdalani et Elie El Ghoul livrent un court-métrage poignant sur la pollution en Méditerranée.</p><p>Leur vidéo dresse le portrait d'une mer défigurée — un paysage que l'on admire, mais dont on s'éloigne par crainte de s'y plonger. Un cri d'alerte : il y a urgence à agir.</p><p><a href="https://www.instagram.com/reel/DJjxN-Nsyje/?igsh=MTV3MWR2cjZ5dXNsaQ==" target="_blank" rel="noopener noreferrer">Lien vidéo</a></p>`,
      image: "https://lycee-montaigne.edu.lb/storage/vie-de-lm-acts/May2025/jlmak3Mc18WImfjohK4s.jpeg",
      order: 6,
    },
    {
      sectionKey: "act-2025-plage-okaibe",
      title: "Nettoyage de la plage de Okaibe",
      contentHtml: `<p>Les élèves de Seconde et les écodélégués ont nettoyé la plage de Okaibé comme acte de sensibilisation sur l'importance de préserver l'environnement, l'écosystème et la nature.</p><p>Les élèves ont vécu une expérience inoubliable en s'engageant pleinement dans une activité concrète de citoyenneté.</p>`,
      image: "https://lycee-montaigne.edu.lb/storage/vie-de-lm-acts/May2025/0UiEI51uPzzeAM4DK7EJ.jpeg",
      order: 7,
    },
    {
      sectionKey: "act-2025-byblos-aefe",
      title: "Journée Eco-L'eau à Byblos — AEFE ZPO",
      contentHtml: `<p>Le samedi 17 mai, trois éco-délégués du Lycée Montaigne ont représenté notre établissement lors de la Journée Éco L'Eau organisée par l'AEFE à Byblos, aux côtés de 38 autres établissements de la Zone Proche-Orient.</p><p>Ils ont présenté une saynète percutante sur la pollution de l'eau, saluée pour son message engagé. Entre parade, découvertes à Byblos (port, plage, musée, cathédrale) et échanges inspirants, cette journée a renforcé leur sentiment d'appartenance à une communauté éco-responsable.</p>`,
      image: "https://lycee-montaigne.edu.lb/storage/vie-de-lm-acts/May2025/jlmak3Mc18WImfjohK4s.jpeg",
      order: 8,
    },
  ];

  for (const act of activities) {
    if (!existingActKeys.includes(act.sectionKey)) {
      await db.pageSection.create({ data: { pageId: activitesPage.id, ...act } });
      console.log(`  Activity "${act.title}" created.`);
    } else {
      console.log(`  Activity "${act.title}" already exists, skipping.`);
    }
  }

  console.log("\nDone!");
}

main()
  .catch(console.error)
  .finally(() => db.$disconnect());
