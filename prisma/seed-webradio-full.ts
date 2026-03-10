import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function main() {
  const page = await db.page.findFirst({ where: { slug: "web-radio" } });
  if (!page) {
    console.error("web-radio page not found. Run seed-webradio-activites.ts first.");
    return;
  }

  const existing = await db.pageSection.findMany({ where: { pageId: page.id } });
  const existingKeys = existing.map((s) => s.sectionKey);

  const emissions = [
    {
      sectionKey: "emission-rentree-petits",
      title: "La rentrée au Lycée Montaigne chez les petits",
      contentHtml: `<p>C'est avec beaucoup de joie que nous vous présentons notre première émission, réalisée par des élèves de CP et de CM1, sur le thème de la rentrée au Lycée Montaigne chez les petits !</p><p>Des voix pleines d'enthousiasme et une belle énergie pour démarrer cette nouvelle aventure radiophonique !</p><p>C'est le début d'une année riche en émissions, avec la participation des élèves tout au long de l'année !</p><p>À écouter en famille !</p><p><a href="https://www.instagram.com/reel/DQLu5s0Dd8y/?igsh=MWVtZDFqcW80M2poOQ==" target="_blank" rel="noopener noreferrer">Regardez la Vidéo</a></p>`,
      image: "https://lycee-montaigne.edu.lb/storage/web-radio-events/November2025/BRWhv5T0TuYTu6iHAg2Y.jpeg",
      order: 3,
    },
    {
      sectionKey: "emission-zigougnou-cpb",
      title: "« Zigougnou, le petit rat » imaginée par les élèves de CPB",
      contentHtml: `<p>Nous avons le plaisir de vous partager "Zigougnou, le petit rat", une émission Webradio entièrement imaginée, écrite et enregistrée par les élèves de CPB.</p><p>Ce projet autour de la création d'une histoire plurilingue s'est inspiré des illustrations poétiques de Claude Ponti. Les enfants y explorent le français, l'anglais et l'arabe avec créativité et enthousiasme.</p><p>Un magnifique travail collectif qui célèbre la coopération, l'imaginaire et l'ouverture aux langues dès le plus jeune âge.</p><p><a href="https://www.instagram.com/reel/DL-QkHJsitZ/?igsh=MTN2anJ0aTRvY2g3bw==" target="_blank" rel="noopener noreferrer">Regardez la Vidéo</a></p>`,
      image: "https://lycee-montaigne.edu.lb/storage/web-radio-events/August2025/99KPeHCvtZk1sx1EjFFQ.jpeg",
      order: 4,
    },
    {
      sectionKey: "emission-marathon-beyrouth",
      title: "La webradio au marathon de Beyrouth",
      contentHtml: `<p>Les reporters de Radio LM à la rencontre des participants du marathon de Beyrouth pour des échanges de questions/réponses aussi sympas que spontanés ! Regardez jusqu'à la fin pour découvrir pourquoi il vaut mieux éviter de manger des bananes.</p><p><a href="https://www.instagram.com/reel/DJPIw82MLDa/?igsh=MWQ5amJ5MWgwZml1aA==" target="_blank" rel="noopener noreferrer">Regardez la Vidéo</a></p>`,
      image: "https://lycee-montaigne.edu.lb/storage/web-radio-events/May2025/yttQ7p9wLO2kijEMN2DX.jpeg",
      order: 5,
    },
    {
      sectionKey: "emission-chadi-zein",
      title: "Rencontre des élèves de 1ère avec l'artiste Chadi Zein",
      contentHtml: `<p>Le théâtre ne révèle toute sa richesse qu'à ceux qui en explorent les coulisses et vivent pleinement ses expériences.</p><p>Dans cette démarche d'apprentissage authentique, nous avons eu l'honneur d'accueillir l'un des grands noms du théâtre libanais, l'artiste Chadi Zein, pour une rencontre passionnante avec nos élèves de 1ère.</p><p>À travers son témoignage et son expertise, il a su les plonger au cœur de l'art théâtral, en leur transmettant ses fondements, ses règles, ses composantes et toute sa beauté.</p><p><a href="https://www.instagram.com/reel/DIRQWXCsc73/?igsh=ZG0zbjFtN2tkMWJq" target="_blank" rel="noopener noreferrer">Regardez la Vidéo</a></p>`,
      image: "https://lycee-montaigne.edu.lb/storage/web-radio-events/May2025/BTwAclwjhfBx7shhvBxA.jpeg",
      order: 6,
    },
    {
      sectionKey: "emission-semaine-webradios-aefe",
      title: "Semaine des webradios AEFE",
      contentHtml: `<p>Le vendredi 28 mars, l'équipe de Radio LM a pris les ondes pour une émission spéciale à l'occasion de la Semaine des Webradios de l'AEFE ! Un moment riche en énergie, en créativité et en échanges passionnants.</p><p>Un immense bravo à nos jeunes journalistes pour leur travail et leur engagement ! Et un grand merci à tous ceux qui nous ont écoutés et soutenus.</p><p>Continuez à nous suivre et à partager cette belle aventure radiophonique !</p><p><a href="https://www.instagram.com/reel/DIB9rEhsS2a/?igsh=cnBsZjJocXExdXds" target="_blank" rel="noopener noreferrer">Regardez la Vidéo</a></p>`,
      image: "https://lycee-montaigne.edu.lb/storage/web-radio-events/May2025/nW3VDNq5gVAyUZ2ypU8n.jpeg",
      order: 7,
    },
    {
      sectionKey: "emission-petra-abou-haidar",
      title: "Rencontre exclusive avec Madame Petra Abou Haidar !",
      contentHtml: `<p>L'info, la rumeur et le divertissement – Comment faire le tri dans le flot d'informations ? Rencontre exclusive avec Madame Petra Abou Haidar – journaliste, présentatrice et productrice !</p><p><a href="https://www.instagram.com/reel/DHvrtpTs7KI/?igsh=MXhubGxiY3prbzB0OQ==" target="_blank" rel="noopener noreferrer">Regardez la Vidéo</a></p>`,
      image: "https://lycee-montaigne.edu.lb/storage/web-radio-events/May2025/pGEHZPMUbodoq8075mwT.jpeg",
      order: 8,
    },
    {
      sectionKey: "emission-ecriture-manuscrite",
      title: "Journée mondiale de l'écriture manuscrite",
      contentHtml: `<p>À la découverte de l'écriture manuscrite sur notre webradio !</p><p>Après une visite inspirante à la bibliothèque de l'USEK, nous vous embarquons pour une émission spéciale dédiée à la Journée Mondiale de l'Écriture Manuscrite. Plongée dans des manuscrits d'exception, découvertes fascinantes et échanges passionnants sur l'art d'écrire à la main !</p><p><a href="https://www.instagram.com/reel/DFusNSJsU-K/?igsh=MTd4ZTl4cXNjY2plbQ==" target="_blank" rel="noopener noreferrer">Regardez la Vidéo</a></p>`,
      image: "https://lycee-montaigne.edu.lb/storage/web-radio-events/May2025/X4HCbip5WVzDY9dz1XAX.jpeg",
      order: 9,
    },
    {
      sectionKey: "emission-nuits-lecture-primaire",
      title: "Emission : Les Nuits de la lecture au primaire",
      contentHtml: `<p><a href="https://www.instagram.com/reel/DFsX9GzMBY5/?igsh=MXdhY2dxNW11bmV6dQ==" target="_blank" rel="noopener noreferrer">Regardez la Vidéo</a></p>`,
      image: null,
      order: 10,
    },
    {
      sectionKey: "emission-grand-direct",
      title: "Le Grand Direct avec la webradio du Lycée Montaigne",
      contentHtml: `<p>Le 28 novembre, un événement exceptionnel a réuni les élèves et les membres de la communauté des Lycées Français du Monde autour du thème de la Francophonie. Le Grand Direct de notre webradio a été diffusé en direct, permettant à chacun de participer activement à cette discussion passionnante.</p><p>Après cette émission, nous avons eu l'honneur de recueillir les impressions de Mme Isabelle Picault, Conseillère Culturelle Adjointe, et Mme Sabine Pacaud, proviseure déléguée du Lycée Montaigne.</p><p>Découvrez un extrait sur le Grand Direct du 28 novembre !</p><p><a href="https://www.instagram.com/reel/DDHjK_esJBM/?igsh=OXJlNzBhMGdldDlr" target="_blank" rel="noopener noreferrer">Regardez la Vidéo</a></p>`,
      image: "https://lycee-montaigne.edu.lb/storage/web-radio-events/January2025/YbLjQJeZ2H6f11cbFr2G.png",
      order: 11,
    },
    {
      sectionKey: "emission-echos-cedre",
      title: "Emission « Echos du Cèdre »",
      contentHtml: `<p>« Echos du Cèdre »<br>Idée et réalisation : Christy Khairallah et Maria Tawil</p><p><a href="https://www.instagram.com/reel/DC4rOhlsEwl/?igsh=ZG4xZjZiOXhyeWE5" target="_blank" rel="noopener noreferrer">Regardez la Vidéo</a></p>`,
      image: "https://lycee-montaigne.edu.lb/storage/web-radio-events/January2025/RDw5tGT2ZlLjtTWGa6li.jpeg",
      order: 12,
    },
    {
      sectionKey: "emission-non-harcelement-primaire",
      title: "Emission « Non au harcèlement » au primaire",
      contentHtml: `<p>Emission "Non au harcèlement" présentée par les élèves du primaire.</p><p><a href="https://www.instagram.com/reel/DC1XwS9MhoP/?igsh=cnBobXYwYXZncWFm" target="_blank" rel="noopener noreferrer">Regardez la Vidéo</a></p>`,
      image: "https://lycee-montaigne.edu.lb/storage/web-radio-events/January2025/0nZrVug53J1yQpEQlaUF.jpeg",
      order: 13,
    },
    {
      sectionKey: "emission-independance-day",
      title: "Empowering young voices this Independence Day",
      contentHtml: `<p>Our students of Lycée Montaigne took the mic, asking the big questions on how we can all contribute to a brighter future for our country. Change begins with conversation!</p><p><a href="https://www.instagram.com/reel/DCoDsAFs65d/?igsh=M3BnNzZlZGlwdnEy" target="_blank" rel="noopener noreferrer">Regardez la Vidéo</a></p>`,
      image: "https://lycee-montaigne.edu.lb/storage/web-radio-events/January2025/TPTCSuHCXxNwybV4C2SL.jpeg",
      order: 14,
    },
    {
      sectionKey: "emission-vibes-automne",
      title: "Emission « Vibes d'automne »",
      contentHtml: `<p>Nous avons le plaisir de partager une émission Webradio réalisée par les élèves des classes de primaire sur le thème de l'automne.</p><p>Nous vous souhaitons une très bonne écoute !</p><p><a href="https://www.instagram.com/reel/DCl6nMfMUmm/?igsh=a3E5d3EyYmUzY3M=" target="_blank" rel="noopener noreferrer">Regardez la Vidéo</a></p>`,
      image: null,
      order: 15,
    },
    {
      sectionKey: "emission-alumni-solidarite",
      title: "Un message de solidarité et d'espoir de la part des alumni",
      contentHtml: `<p>Les alumni de la webradio LM ont exprimé un puissant message de solidarité et d'espoir à l'égard du Liban. En réponse à la situation actuelle du pays, ces anciens membres se mobilisent pour apporter soutien et encouragement à ceux qui en ont besoin.</p><p>Le message des alumni de la webradio LM résonne comme un appel à l'unité et à l'espoir. Dans une période où le Liban fait face à de nombreux défis, leur solidarité envoie un signal fort : ensemble, nous pouvons surmonter les défis et contribuer à un avenir prometteur pour ce pays riche en culture et en histoire.</p><p><a href="https://www.instagram.com/reel/DBi8raUsJv4/?igsh=a3ZqZmltZTltZ3Np" target="_blank" rel="noopener noreferrer">Regardez la Vidéo</a></p>`,
      image: "https://lycee-montaigne.edu.lb/storage/web-radio-events/January2025/RSSfVacATeMRqpeCzXH3.jpeg",
      order: 16,
    },
    {
      sectionKey: "emission-lancement-webradio",
      title: "Nouveauté : La Webradio du Lycée Montaigne est en ligne !",
      contentHtml: `<p>Nous avons le plaisir de vous annoncer le lancement de notre toute nouvelle page Webradio dédiée à la vie du lycée ! Un espace où vous pourrez découvrir des émissions, interviews, musiques et actualités créées par et pour les élèves, les enseignants et toute la communauté scolaire.</p><p>Au programme :<br>* Des émissions thématiques<br>* Des podcasts sur la culture, l'actualité et plus encore<br>* Des interviews exclusives<br>* Et bien d'autres surprises !</p><p>Nous vous invitons à écouter, partager et participer à cette aventure sonore qui reflète l'esprit dynamique et créatif du Lycée Montaigne !</p><p><a href="https://www.instagram.com/p/DBI9XiwsnJ9/?igsh=Y2tmdWVtN3N4c3Zs" target="_blank" rel="noopener noreferrer">Regardez la Vidéo</a></p>`,
      image: null,
      order: 17,
    },
  ];

  for (const emission of emissions) {
    if (!existingKeys.includes(emission.sectionKey)) {
      await db.pageSection.create({ data: { pageId: page.id, ...emission } });
      console.log(`  ✓ "${emission.title}" created.`);
    } else {
      console.log(`  – "${emission.title}" already exists, skipping.`);
    }
  }

  // Also update the image for emission-radio-portes-ouvertes (was seeded with wrong image)
  const portesOuvertes = existing.find((s) => s.sectionKey === "emission-radio-portes-ouvertes");
  if (portesOuvertes && portesOuvertes.image !== "https://lycee-montaigne.edu.lb/storage/web-radio-events/November2025/D3kKXJG5aDlcNHU6vzV9.jpeg") {
    await db.pageSection.update({
      where: { id: portesOuvertes.id },
      data: { image: "https://lycee-montaigne.edu.lb/storage/web-radio-events/November2025/D3kKXJG5aDlcNHU6vzV9.jpeg" },
    });
    console.log("  ✓ Updated image for portes ouvertes emission.");
  }

  console.log("\nDone!");
}

main()
  .catch(console.error)
  .finally(() => db.$disconnect());
