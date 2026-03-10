import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

/* ================================================================
   DATA MIGRATION — Old site → Prisma/PostgreSQL
   Fetched from https://lycee-montaigne.edu.lb/ on 2026-03-10
   Run with: npx tsx prisma/migrate-old-site.ts
   ================================================================ */

async function main() {
  console.log("Starting data migration from old site...\n");

  // ── Helper: find or create a page by slug ──────────────────────
  async function getPage(slug: string, title: string) {
    let page = await db.page.findUnique({ where: { slug } });
    if (!page) {
      page = await db.page.create({ data: { slug, title } });
      console.log(`  Created page: ${slug}`);
    }
    return page;
  }

  // ── Helper: upsert a PageSection ──────────────────────────────
  async function upsertSection(
    pageId: string,
    sectionKey: string,
    title: string | null,
    contentHtml: string | null,
    image: string | null,
    order: number
  ) {
    await db.pageSection.upsert({
      where: { pageId_sectionKey: { pageId, sectionKey } },
      update: { title, contentHtml, image, order },
      create: { pageId, sectionKey, title, contentHtml, image, order },
    });
  }

  // ── 1. SITE SETTINGS ──────────────────────────────────────────
  console.log("Migrating site settings...");
  const settings = [
    { key: "stat_eleves", value: "1085" },
    { key: "stat_reussite", value: "100%" },
    { key: "stat_nationalites", value: "29" },
    { key: "stat_langues", value: "3" },
    { key: "site_name", value: "Lycée Montaigne" },
    { key: "site_subtitle", value: "Beit Chabab, Metn, Liban" },
    { key: "email", value: "info@lycee-montaigne.edu.lb" },
    { key: "phone", value: "+961 4 982 082 / 983 845 / 985 256" },
    { key: "fax", value: "+961 4 985 256" },
    { key: "address", value: "Beit Chabab, Quartier Baydar Chouar, Metn, Liban" },
    { key: "facebook", value: "https://www.facebook.com/pages/Lycee-Montaigne-Beit-Chebab/560736003940540" },
    { key: "instagram", value: "https://www.instagram.com/lyceemontaigne.liban/" },
    { key: "linkedin", value: "https://www.linkedin.com/company/lyc%C3%A9emontaigne/" },
    { key: "pronote", value: "https://2050048n.index-education.net/pronote/" },
  ];
  for (const s of settings) {
    await db.siteSetting.upsert({
      where: { key: s.key },
      update: { value: s.value },
      create: s,
    });
  }
  console.log("  Site settings done.\n");

  // ── 2. STAFF MEMBERS ──────────────────────────────────────────
  console.log("Migrating staff members...");

  // Direction
  const directionStaff = await db.staffMember.findMany({ where: { section: "direction" } });
  if (directionStaff.length === 0) {
    await db.staffMember.createMany({
      data: [
        {
          name: "Mme Rachel Atallah",
          title: "Cheffe d'établissement",
          photo: "https://lycee-montaigne.edu.lb/storage/eta-s3/November2024/tN7I8Zm4bodDopvV14Hw.png",
          section: "direction",
          order: 1,
          messageHtml: `<p><strong>Chers parents, chers élèves, chers partenaires,</strong></p>
<p>C'est avec une immense fierté et un enthousiasme sincère que je vous adresse ces quelques mots en ce début d'année.</p>
<p>Notre établissement, jeune et dynamique, accueille aujourd'hui près de 1100 élèves, de la maternelle à la terminale, et s'affirme chaque jour comme un lieu d'apprentissage, d'épanouissement et d'ambition partagée.</p>
<p>Les élèves y sont accueillis dans un cadre exceptionnel, rénové, où les espaces pédagogiques et éducatifs ont été pensés pour conjuguer bien être, sécurité, épanouissement intellectuel et physique.</p>
<p><strong>Chers élèves,</strong></p>
<p>Notre engagement à nourrir votre personnalité avec des valeurs humaines, à souligner l'importance de l'amitié et de l'éducation, continue de progresser afin de faire de vous des citoyens responsables du monde.</p>
<p>Cette année, nous « réenchanterons » l'école en suivant Edgard Morin, qui évoque un des objectifs de l'école : « La réalisation d'un épanouissement individuel au sein d'un épanouissement collectif, d'une communauté fraternelle. »</p>`,
        },
        {
          name: "Mme Elisabeth Orsini",
          title: "Proviseure déléguée",
          photo: "https://lycee-montaigne.edu.lb/storage/mot-directrices/March2025/rLBOCUkYuoLx7jcdp3LE.jpeg",
          section: "direction",
          order: 2,
          messageHtml: `<p>Au Lycée Montaigne, nous mettons tout en œuvre pour accompagner chaque élève dans son parcours scolaire et personnel, en alliant exigence académique et bienveillance éducative.</p>`,
        },
        {
          name: "Mme Salwa Nassar",
          title: "Directrice du primaire",
          photo: null,
          section: "direction",
          order: 3,
          messageHtml: `<p>Le premier degré du Lycée Montaigne accueille les élèves de la maternelle au CM2 dans un cadre bienveillant, propice à l'épanouissement et à l'apprentissage.</p>`,
        },
      ],
    });
    console.log("  Direction staff created.");
  } else {
    console.log("  Direction staff already exists, skipping.");
  }

  // Comité des parents
  const comiteStaff = await db.staffMember.findMany({ where: { section: "comite" } });
  if (comiteStaff.length === 0) {
    await db.staffMember.createMany({
      data: [
        {
          name: "M. Karim Faddoul",
          title: "Président",
          photo: null,
          section: "comite",
          order: 1,
          messageHtml: null,
        },
        {
          name: "M. Antoine Nader",
          title: "Vice-président",
          photo: null,
          section: "comite",
          order: 2,
          messageHtml: null,
        },
        {
          name: "Mme Maria Nahas",
          title: "Secrétaire",
          photo: null,
          section: "comite",
          order: 3,
          messageHtml: null,
        },
        {
          name: "M. Amin Rouhana",
          title: "Trésorier",
          photo: null,
          section: "comite",
          order: 4,
          messageHtml: null,
        },
        {
          name: "M. Samer Menhem",
          title: "Commission financière",
          photo: null,
          section: "comite",
          order: 5,
          messageHtml: null,
        },
        {
          name: "M. Raymond Soueid",
          title: "Commission financière",
          photo: null,
          section: "comite",
          order: 6,
          messageHtml: null,
        },
        {
          name: "Mme Sarah Dyon",
          title: "Membre",
          photo: null,
          section: "comite",
          order: 7,
          messageHtml: null,
        },
        {
          name: "Mme Gaëlle Kibranian",
          title: "Membre",
          photo: null,
          section: "comite",
          order: 8,
          messageHtml: null,
        },
        {
          name: "Mme Magali Majdalany",
          title: "Membre",
          photo: null,
          section: "comite",
          order: 9,
          messageHtml: null,
        },
        {
          name: "Mme Cynthia Wardé",
          title: "Membre",
          photo: null,
          section: "comite",
          order: 10,
          messageHtml: null,
        },
        {
          name: "Mme Mayssam Wehbé Fikani",
          title: "Membre",
          photo: null,
          section: "comite",
          order: 11,
          messageHtml: null,
        },
        {
          name: "Mme Stéphanie Youwakim",
          title: "Membre",
          photo: null,
          section: "comite",
          order: 12,
          messageHtml: null,
        },
        {
          name: "M. Elie El Khoury",
          title: "Membre",
          photo: null,
          section: "comite",
          order: 13,
          messageHtml: null,
        },
        {
          name: "M. Louis Hobeika",
          title: "Membre",
          photo: null,
          section: "comite",
          order: 14,
          messageHtml: null,
        },
        {
          name: "M. Eddy Maalouf",
          title: "Membre",
          photo: null,
          section: "comite",
          order: 15,
          messageHtml: null,
        },
        {
          name: "M. Nadim Makhoul",
          title: "Membre",
          photo: null,
          section: "comite",
          order: 16,
          messageHtml: null,
        },
        {
          name: "M. Chadi Maroun",
          title: "Membre",
          photo: null,
          section: "comite",
          order: 17,
          messageHtml: null,
        },
      ],
    });
    console.log("  Comité des parents created.");
  } else {
    console.log("  Comité des parents already exists, skipping.");
  }

  // Santé staff
  const santeStaff = await db.staffMember.findMany({ where: { section: "sante" } });
  if (santeStaff.length === 0) {
    await db.staffMember.createMany({
      data: [
        {
          name: "Mme Jeanine Gharby",
          title: "Infirmière",
          photo: "https://lycee-montaigne.edu.lb/storage/sante/April2024/zOGggcNlFFKSbbnNN9k6.png",
          section: "sante",
          order: 1,
          messageHtml: `<p>L'infirmerie est un lieu d'accueil pour les élèves se blessant dans le Lycée et pour les élèves présentant une maladie se déclarant au Lycée.</p>
<p>L'infirmière travaille en étroite collaboration avec l'équipe de santé et toute la communauté scolaire (professeurs, personnel de la vie scolaire…). Elle a aussi de contact avec les familles et le service de restauration scolaire.</p>`,
        },
        {
          name: "",
          title: "Médecin",
          photo: "https://lycee-montaigne.edu.lb/storage/sante/April2024/PXs3AGRYfgjCtjjAk9x2.png",
          section: "sante",
          order: 2,
          messageHtml: `<p>Pendant leur scolarisation, les enfants sont soumis chaque année à un examen médical. Cet examen a pour but de détecter d'éventuels problèmes de santé qui pourraient perturber la scolarité et entraîner des difficultés d'apprentissage.</p>`,
        },
        {
          name: "M. Jules Tabet",
          title: "Optométriste",
          photo: "https://lycee-montaigne.edu.lb/storage/sante/April2024/NwJeUJlilquJdhXs3pNI.png",
          section: "sante",
          order: 3,
          messageHtml: `<p>Une visite annuelle est faite. L'examen de l'acuité visuelle pratiqué est un examen primitif qui oriente vers d'autres examens approfondis en cas de besoin. De nombreux troubles sont détectés : myopie, hypermétropie, astigmatisme.</p>`,
        },
        {
          name: "Dr Harbouk",
          title: "Dentiste",
          photo: "https://lycee-montaigne.edu.lb/storage/sante/April2024/yJrfTPm3DtzLMsJ3NKbP.png",
          section: "sante",
          order: 4,
          messageHtml: `<p>L'éducation à la santé bucco-dentaire est primordiale. Dr Harbouk intervient pour former les élèves et les parents sur l'hygiène bucco-dentaire.</p>`,
        },
      ],
    });
    console.log("  Santé staff created.");
  } else {
    console.log("  Santé staff already exists, skipping.");
  }

  // Comité égalité
  const egaliteStaff = await db.staffMember.findMany({ where: { section: "egalite" } });
  if (egaliteStaff.length === 0) {
    await db.staffMember.createMany({
      data: [
        {
          name: "Mme Rachel Atallah",
          title: "Cheffe d'établissement",
          photo: null,
          section: "egalite",
          order: 1,
          messageHtml: null,
        },
        {
          name: "Mme Elisabeth Orsini",
          title: "Proviseure déléguée",
          photo: null,
          section: "egalite",
          order: 2,
          messageHtml: null,
        },
        {
          name: "Mme Salwa Nassar",
          title: "Directrice du primaire",
          photo: null,
          section: "egalite",
          order: 3,
          messageHtml: null,
        },
        {
          name: "M. Fawzi Makhoul",
          title: "Conseiller",
          photo: null,
          section: "egalite",
          order: 4,
          messageHtml: null,
        },
        {
          name: "M. Nadim Eid",
          title: "Coordinateur EPS",
          photo: null,
          section: "egalite",
          order: 5,
          messageHtml: null,
        },
        {
          name: "Mme Anne-Laure Semaan",
          title: "Contact 1er degré",
          photo: null,
          section: "egalite",
          order: 6,
          messageHtml: null,
        },
        {
          name: "Mme Jihane Fakhoury",
          title: "Contact 2nd degré",
          photo: null,
          section: "egalite",
          order: 7,
          messageHtml: null,
        },
      ],
    });
    console.log("  Comité égalité created.");
  } else {
    console.log("  Comité égalité already exists, skipping.");
  }

  console.log("  Staff members done.\n");

  // ── 3. PAGE SECTIONS ──────────────────────────────────────────

  // ─── ÉTABLISSEMENT ──────────────────────────────────────────
  console.log("Migrating établissement sections...");
  {
    const page = await getPage("etablissement", "Établissement");
    const pid = page.id;

    await upsertSection(
      pid,
      "mission",
      "Mission et Vision — Notre projet éducatif",
      `<p>Au Lycée Montaigne, nous faisons de l'accompagnement vers la réussite une priorité. Pour cela, nous préconisons :</p>
<ul>
  <li>Une école de toutes les intelligences et de tous les talents.</li>
  <li>Un regard d'emblée positif sur toute personne, un pari sur la réussite.</li>
  <li>Le refus de tout déterminisme et la confiance en l'éducabilité cognitive, affective et physiologique de toute personne humaine.</li>
</ul>`,
      "https://lycee-montaigne.edu.lb/storage/eta-s2/November2024/mJKjRY5yzkeXW04S1XmZ.jpg",
      1
    );

    await upsertSection(
      pid,
      "chef-etablissement",
      "Mot de la cheffe d'établissement",
      `<p><strong>Chers parents, chers élèves, chers partenaires,</strong></p>
<p>C'est avec une immense fierté et un enthousiasme sincère que je vous adresse ces quelques mots en ce début d'année.</p>
<p>Notre établissement, jeune et dynamique, accueille aujourd'hui près de 1100 élèves, de la maternelle à la terminale, et s'affirme chaque jour comme un lieu d'apprentissage, d'épanouissement et d'ambition partagée.</p>
<p>Les élèves y sont accueillis dans un cadre exceptionnel, rénové, où les espaces pédagogiques et éducatifs ont été pensés pour conjuguer bien être, sécurité, épanouissement intellectuel et physique.</p>
<p><strong>Chers élèves,</strong></p>
<p>Notre engagement à nourrir votre personnalité avec des valeurs humaines, à souligner l'importance de l'amitié et de l'éducation, continue de progresser afin de faire de vous des citoyens responsables du monde.</p>
<p>Cette année, nous « réenchanterons » l'école en suivant Edgard Morin, qui évoque un des objectifs de l'école : « La réalisation d'un épanouissement individuel au sein d'un épanouissement collectif, d'une communauté fraternelle. »</p>
<p><em>— Mme Rachel Atallah, Cheffe d'établissement</em></p>`,
      "https://lycee-montaigne.edu.lb/storage/eta-s3/November2024/tN7I8Zm4bodDopvV14Hw.png",
      2
    );

    await upsertSection(
      pid,
      "comite",
      "Comité des parents d'élèves du Lycée Montaigne",
      `<p><strong>Président :</strong> M. Karim Faddoul<br>
<strong>Vice-président :</strong> M. Antoine Nader<br>
<strong>Secrétaire :</strong> Mme Maria Nahas<br>
<strong>Trésorier :</strong> M. Amin Rouhana</p>
<p><strong>Commission financière :</strong> M. Samer Menhem et M. Raymond Soueid</p>
<p><strong>Membres :</strong><br>
Mme Sarah Dyon, Mme Gaëlle Kibranian, Mme Magali Majdalany, Mme Cynthia Wardé,
Mme Mayssam Wehbé Fikani, Mme Stéphanie Youwakim, M. Elie El Khoury, M. Louis Hobeika,
M. Eddy Maalouf, M. Nadim Makhoul, M. Chadi Maroun</p>
<p>Le Comité sera heureux d'accueillir vos suggestions et vos opinions à l'adresse suivante : <a href="mailto:comitedesparents@lycee-montaigne.edu.lb">comitedesparents@lycee-montaigne.edu.lb</a></p>`,
      "https://lycee-montaigne.edu.lb/storage/comite-parents/December2025/ex9aVmzf9X4A0EDTgZEz.jpg",
      3
    );

    await upsertSection(
      pid,
      "reglement",
      "Règlement Intérieur",
      `<p>Le règlement intérieur définit les droits et les devoirs de chaque membre de la communauté éducative du Lycée Montaigne. Il précise les règles de vie en collectivité, les sanctions applicables en cas de manquement, ainsi que les procédures disciplinaires.</p>
<p>Le respect du règlement intérieur est une condition indispensable au bon fonctionnement de l'établissement et au bien-être de tous.</p>`,
      null,
      4
    );

    await upsertSection(
      pid,
      "instances",
      "Instances de l'établissement",
      `<p>Le Lycée Montaigne dispose de plusieurs instances de gouvernance qui permettent à l'ensemble de la communauté éducative de participer à la vie de l'établissement :</p>
<ul>
  <li><strong>Conseil d'établissement :</strong> Instance délibérante qui fixe les grandes orientations de l'établissement.</li>
  <li><strong>Conseil pédagogique :</strong> Favorise la concertation entre les enseignants.</li>
  <li><strong>Conseil de vie lycéenne (CVL) :</strong> Représente les lycéens.</li>
  <li><strong>Conseil de vie collégienne (CVC) :</strong> Représente les collégiens.</li>
  <li><strong>Comité des parents :</strong> Représente les familles des élèves.</li>
</ul>`,
      null,
      5
    );
  }
  console.log("  Établissement done.\n");

  // ─── VIE DU LM ──────────────────────────────────────────────
  console.log("Migrating vie-du-lm sections...");
  {
    const page = await getPage("vie-du-lm", "Vie du LM");
    const pid = page.id;

    await upsertSection(
      pid,
      "developpement-durable",
      "Développement durable",
      `<p>Conscient de l'importance d'adopter les concepts d'éco-citoyenneté et de développement durable en termes de comportements, d'attitudes et de représentations, le Lycée Montaigne s'est engagé, depuis sa création en 2012, dans une démarche de durabilité visant à :</p>
<ul>
  <li><strong>Sensibiliser la communauté scolaire</strong> — jeunes et adultes — aux principes et aux enjeux de l'éco-citoyenneté et du développement durable, dans leurs différentes dimensions (environnement, société et économie)</li>
  <li><strong>Diffuser les bonnes pratiques environnementales au sein de l'établissement scolaire</strong></li>
  <li><strong>Mener des actions durables et œuvrer pour une infrastructure respectueuse de l'environnement au sein de l'école</strong></li>
  <li><strong>Devenir un acteur territorial exemplaire</strong> pour réduire son empreinte environnementale</li>
  <li><strong>Rejoindre les réseaux nationaux d'écoles « vertes » engagées dans le développement durable</strong></li>
  <li><strong>Répondre aux objectifs de développement durable</strong> à l'horizon de 2030, préconisés par les Nations-Unies</li>
</ul>
<p><strong>Les référents EDD sont :</strong><br>
<strong>Mme Roula Chalabi</strong> au 1er degré<br>
<strong>M. Robert Sreih</strong> au 2nd degré</p>
<p>Dans ce contexte, le Lycée Montaigne organise, en partenariat avec des institutions et des ONG nationales (Terre Liban, Arc en ciel, B clean, etc.), des campagnes de sensibilisation au sein de l'école visant à édifier des pratiques environnementales durables tels que le tri des déchets à la source. À titre d'exemple, l'école a procédé à :</p>
<ul>
  <li>L'installation de poubelles de tri dans les classes et dans les couloirs.</li>
  <li>L'installation dans la cantine et dans les cours de récréation de conteneurs transparents pour les déchets alimentaires, qui seront ultérieurement collectés par les élèves et transportés vers la ferme de l'école.</li>
  <li>L'implication des élèves dans le processus de collecte des poubelles de tri (une fois par semaine, deux élèves par classe accompagnés par un surveillant, vident les bennes contenant les déchets recyclables collectés, dans des conteneurs appropriés destinés au recyclage).</li>
</ul>
<p>Le Lycée Montaigne a le plaisir d'annoncer sa labellisation au niveau 3 (expert) en tant qu'établissement français à l'étranger en démarche de développement durable — <strong>EFE3D</strong>. Nous venons d'obtenir le plus haut niveau de labellisation, concrétisant ainsi un travail qui a débuté lors de la création de notre établissement.</p>`,
      "https://lycee-montaigne.edu.lb/storage/development-durables/November2024/IXjTyiAwx79KnYFRYWvR.jpg",
      1
    );

    await upsertSection(
      pid,
      "webradio",
      "Webradio du Lycée Montaigne",
      `<p>Bienvenue sur les ondes captivantes de la webradio du Lycée Montaigne, où la diversité des voix rencontre l'éclectisme des talents. Plongez dans un univers sonore dynamique, créatif et inspirant, façonné par la passion et l'énergie de notre communauté étudiante. De la musique vibrante aux discussions animées, en passant par les reportages engagés, notre webradio est le reflet vivant de l'esprit audacieux qui caractérise le Lycée Montaigne.</p>
<p>Embarquez avec nous pour un voyage radiophonique unique, où la curiosité intellectuelle et la créativité s'entrelacent pour donner vie à des émissions captivantes. Préparez-vous à être entraînés dans une expérience auditive inoubliable au cœur de notre communauté lycéenne dynamique. Bienvenue à bord de la webradio du Lycée Montaigne, où chaque émission est une invitation à découvrir, partager et célébrer l'extraordinaire richesse de nos talents et de nos idées.</p>
<p><strong>Mme Leila Abboud</strong>, référente 1er degré<br>
<strong>Mme Joelle Maalouf</strong>, référente 2nd degré</p>`,
      "https://lycee-montaigne.edu.lb/storage/webradios/November2024/amxLKLrgOzIeBoHAVT4x.jpeg",
      2
    );

    await upsertSection(
      pid,
      "climat",
      "Démocratie scolaire",
      `<p>Le Lycée Montaigne favorise la participation active des élèves à la vie de l'établissement à travers les instances de démocratie scolaire. Deux conseils représentent les élèves et permettent d'exprimer leurs besoins et leurs idées :</p>
<ul>
  <li><strong>CVC (Conseil de Vie Collégienne) :</strong> Instance représentative des collégiens (6e, 5e, 4e, 3e). Les élèves délégués participent aux décisions relatives à la vie du collège.</li>
  <li><strong>CVL (Conseil de Vie Lycéenne) :</strong> Instance représentative des lycéens (Seconde, Première, Terminale). Les représentants élus participent aux orientations de l'établissement.</li>
</ul>`,
      "https://lycee-montaigne.edu.lb/storage/climat-categories/April2025/mNHwl4NOWUZkZgPfyTNi.jpeg",
      3
    );

    await upsertSection(
      pid,
      "egalite",
      "Égalité filles-garçons",
      `<p>L'<strong>égalité filles-garçons</strong> au sein des établissements d'enseignement français à l'étranger et l'<strong>égalité femmes-hommes</strong> à l'Agence et dans le réseau constituent une <strong>politique prioritaire de l'AEFE</strong>, qui s'inscrit pleinement dans la <strong>diplomatie féministe</strong> voulue par le président de la République.</p>
<p><strong>Comité égalité du Lycée Montaigne :</strong></p>
<ul>
  <li><strong>Mme Rachel Atallah</strong>, cheffe d'établissement</li>
  <li><strong>Mme Elisabeth Orsini</strong>, proviseure déléguée</li>
  <li><strong>Mme Salwa Nassar</strong>, directrice du primaire</li>
  <li><strong>M. Fawzi Makhoul</strong>, conseiller</li>
  <li><strong>M. Nadim Eid</strong>, coordinateur EPS</li>
  <li><strong>Mme Anne-Laure Semaan</strong>, contact 1er degré</li>
  <li><strong>Mme Jihane Fakhoury</strong>, contact 2nd degré</li>
</ul>
<p>Dans cette perspective, plusieurs actions sont mises en place au Lycée Montaigne pour promouvoir la valeur et faire germer cette pousse d'égalité en vue d'inculquer aux élèves les compétences suivantes :</p>
<ol>
  <li>Développer l'esprit critique</li>
  <li>S'entraîner au débat, à la controverse et à l'argumentation</li>
  <li>Prévenir contre les « ismes » et promouvoir une ouverture culturelle</li>
  <li>S'engager dans des actions en dehors de l'établissement</li>
</ol>`,
      "https://lycee-montaigne.edu.lb/storage/egalite-intros/October2024/7QOD9LQ0ZmvqaH1ck4qJ.jpg",
      4
    );

    await upsertSection(
      pid,
      "sejour",
      "Séjours pédagogiques",
      `<p>Le Lycée Montaigne organise des séjours pédagogiques et des voyages scolaires qui enrichissent le parcours éducatif des élèves. Ces expériences favorisent l'ouverture culturelle, l'autonomie et la cohésion de groupe.</p>
<p>De la découverte du patrimoine local libanais aux échanges internationaux en Europe, chaque séjour est conçu pour prolonger les apprentissages en classe et offrir aux élèves des expériences inoubliables.</p>`,
      "https://lycee-montaigne.edu.lb/assets/images/flags_image_n.png",
      5
    );

    await upsertSection(
      pid,
      "ligue-sportive",
      "Ligue sportive AEFE-UNSS",
      `<p>Une ligue sportive scolaire AEFE-UNSS est une structure régionale au sein du réseau des établissements français à l'étranger, visant à promouvoir la pratique du sport scolaire selon les principes de l'AEFE (Agence pour l'enseignement français à l'étranger) et de l'UNSS (Union Nationale du Sport Scolaire).</p>
<p>Les élèves du Lycée Montaigne participent régulièrement aux compétitions inter-lycées et obtiennent d'excellents résultats dans de nombreuses disciplines.</p>`,
      "https://lycee-montaigne.edu.lb/storage/actions-sportives/May2025/5AyqpqwCqoBIFxIXphFP.jpeg",
      6
    );
  }
  console.log("  Vie du LM done.\n");

  // ─── CVC ────────────────────────────────────────────────────
  console.log("Migrating CVC sections...");
  {
    const page = await getPage("cvc", "Conseil de Vie Collégienne");
    const pid = page.id;

    await upsertSection(
      pid,
      "cvc-intro",
      "Conseil de Vie Collégienne (CVC)",
      `<p>Le <strong>Conseil de Vie Collégienne (CVC)</strong> est une instance représentative des élèves du collège (6e, 5e, 4e, 3e). Il permet aux collégiens de s'exprimer sur leur vie au sein de l'établissement et de formuler des propositions pour améliorer leurs conditions d'études.</p>
<p>Le CVC se réunit régulièrement et ses membres élus participent activement aux décisions qui concernent la vie quotidienne du collège : ambiance dans les espaces communs, activités culturelles et sportives, projets de classe, etc.</p>
<p>Cette instance est un lieu d'apprentissage de la démocratie et de la citoyenneté, où les élèves apprennent à débattre, à argumenter et à agir collectivement.</p>`,
      "https://lycee-montaigne.edu.lb/storage/climat-categories/April2025/mNHwl4NOWUZkZgPfyTNi.jpeg",
      1
    );

    await upsertSection(
      pid,
      "cvc-elections",
      "Élections des représentants",
      `<p>Chaque année, des élections sont organisées au sein des classes de collège pour élire les délégués qui siégeront au CVC. Ce processus démocratique permet aux élèves de s'engager dans la vie de leur établissement et de représenter leurs camarades.</p>
<p>Les élèves élus au CVC participent aux réunions avec la direction et peuvent soumettre des propositions d'amélioration pour le bien-être de tous les collégiens.</p>`,
      "https://lycee-montaigne.edu.lb/storage/climat-categories/April2025/8WiSVVrXPPzEtNnwZh6J.png",
      2
    );
  }
  console.log("  CVC done.\n");

  // ─── CVL ────────────────────────────────────────────────────
  console.log("Migrating CVL sections...");
  {
    const page = await getPage("cvl", "Conseil de Vie Lycéenne");
    const pid = page.id;

    await upsertSection(
      pid,
      "cvl-intro",
      "Conseil de Vie Lycéenne (CVL)",
      `<p>Le <strong>Conseil de Vie Lycéenne (CVL)</strong> est l'instance représentative des lycéens (Seconde, Première, Terminale) au sein du Lycée Montaigne. Il constitue un espace de dialogue entre les élèves et l'équipe de direction, permettant aux lycéens de prendre part aux décisions qui concernent leur vie quotidienne au lycée.</p>
<p>Les membres du CVL sont élus par leurs pairs et participent notamment aux conseils d'administration. Ils peuvent soumettre des propositions et des avis sur diverses questions telles que la restauration, les activités périscolaires, la communication, et l'organisation de la vie scolaire.</p>`,
      "https://lycee-montaigne.edu.lb/storage/climat-categories/April2025/mNHwl4NOWUZkZgPfyTNi.jpeg",
      1
    );

    await upsertSection(
      pid,
      "cvl-missions",
      "Missions du CVL",
      `<p>Le CVL remplit plusieurs missions au sein de l'établissement :</p>
<ul>
  <li>Représenter l'ensemble des lycéens auprès de la direction et du conseil d'établissement.</li>
  <li>Formuler des avis et des propositions sur les questions relatives à la vie lycéenne.</li>
  <li>Participer à l'organisation d'activités culturelles, sportives et de solidarité.</li>
  <li>Contribuer à l'amélioration du cadre de vie et d'étude des lycéens.</li>
  <li>Favoriser la communication entre les élèves et les adultes de l'établissement.</li>
</ul>`,
      null,
      2
    );
  }
  console.log("  CVL done.\n");

  // ─── ÉGALITÉ ACTIVITÉ ────────────────────────────────────────
  console.log("Migrating egalite-activite sections...");
  {
    const page = await getPage("egalite-activite", "Activités Égalité");
    const pid = page.id;

    await upsertSection(
      pid,
      "egalite-intro",
      "L'Égalité, un mode de vie",
      `<p><strong>L'ÉGALITÉ. Tout un programme.</strong></p>
<p><strong>Le Lycée Montaigne a décidé d'aller au-delà : L'ÉGALITÉ, UN MODE DE VIE.</strong></p>
<p>Tout le Lycée Montaigne, toutes classes confondues, est engagé dans cette formation.</p>`,
      "https://lycee-montaigne.edu.lb/storage/egalite-activites/March2025/bEqoszwY3yxudpBezf3f.png",
      1
    );

    await upsertSection(
      pid,
      "debat-espaces",
      "Débat : Comment aménager les espaces pour que chacun trouve sa place ?",
      `<p>Dans le cadre des activités du 8 mars relatives à la journée de la Femme et à la thématique de l'égalité femmes-hommes et filles-garçons, un débat a eu lieu au CCC sous le thème : <em>"Comment penser et aménager les espaces... Pour que chacun trouve sa place ?"</em></p>
<p>Ce débat a réuni des élèves du 1er et du 2nd degrés, en présence de la Direction et des membres du comité égalité du Lycée. Les échanges étaient très dynamiques et les élèves ont partagé activement leurs visions pour des espaces plus inclusifs, adaptés à toutes et à tous, favorisant le bien-être de toutes et tous.</p>
<p>Des cours de récréation aux salles de classe, chaque élève a pu exprimer ses attentes et proposer des solutions parfois bien innovantes.</p>`,
      "https://lycee-montaigne.edu.lb/storage/egalite-activites/May2025/n2MEOg4B5XaEyppiSdZA.png",
      2
    );

    await upsertSection(
      pid,
      "concours-aefe",
      "Lauréate du concours #AEFEgalité 2025",
      `<p>Princia Mouawad, élève de terminale, a été désignée lauréate du concours #AEFEgalité 2025 par la Directrice générale de l'AEFE. Son affiche illustre avec force et créativité le thème « De l'égalité filles-garçons à l'égalité professionnelle, l'AEFE s'engage ! »</p>
<p>À travers son œuvre, elle met en scène deux protagonistes prisonniers des stéréotypes de genre, avançant vers un horizon plus lumineux et libre, symbole d'un monde où chacun peut choisir son propre chemin. Un message percutant qui allie lucidité et espoir, rappelant que l'égalité est un combat collectif.</p>
<p>Bravo à Princia pour ce prix mérité et un grand merci à sa professeure, Carole Turk, pour son précieux accompagnement !</p>`,
      "https://lycee-montaigne.edu.lb/storage/egalite-activites/May2025/32TchvdKVSXFx3cZ3U8q.png",
      3
    );

    await upsertSection(
      pid,
      "generation-2024",
      "Label Génération 2024",
      `<p>Le <strong>label Génération 2024</strong> vise à développer les passerelles entre le monde scolaire et le mouvement sportif pour encourager la pratique physique et sportive des jeunes. Être labélisé Génération 2024, c'est s'engager à mettre plus de sport dans le quotidien des jeunes et permettre au plus grand nombre de vivre l'aventure olympique et paralympique dès maintenant.</p>`,
      "https://lycee-montaigne.edu.lb/storage/egalite-activites/March2025/sAELm48qiMuUVw81PiQT.png",
      4
    );

    await upsertSection(
      pid,
      "force-feminin",
      "FORCE = nom FÉMININ et SINGULIER",
      `<p><strong>Durant leur formation à La littérature d'idées et la presse du XIXe siècle au XXIe siècle (Programme de Français-Seconde), les élèves ont été sensibilisés à la question des médias et de l'information.</strong></p>
<p>La rencontre avec des textes littéraires avait pour objectif de former leur esprit critique et leur jugement autour de questions d'actualité ; l'étude d'articles de presse leur a permis de mieux comprendre le pouvoir des médias quand il s'agit de se battre pour une cause légitime comme l'égalité des genres.</p>
<p>Patricia Chidiac, élève en 2nde A, a réalisé un documentaire autour des droits des femmes dans lequel, de la Déclaration des droits de l'homme et du citoyen, aux mouvements féministes, en passant par le combat quotidien contre les préjugés, elle a montré que si maintes batailles ont été gagnées, les difficultés liées aux stéréotypes de genre n'ont pas encore été totalement surmontées.</p>`,
      "https://lycee-montaigne.edu.lb/storage/egalite-activites/March2025/wDNEXp7fqrp7wE8cflyM.jpeg",
      5
    );

    await upsertSection(
      pid,
      "sportifs-paralympiques",
      "Rencontres avec des sportifs paralympiques",
      `<p>Dans le cadre d'une initiative visant à promouvoir l'égalité et l'inclusion, les élèves de CM1 ont eu l'opportunité unique de réaliser des recherches, des entretiens et des reportages avec des sportifs paralympiques. Cette activité pluridisciplinaire a permis aux élèves de découvrir les défis et les réalisations extraordinaires de ces athlètes, tout en renforçant leur compréhension de l'importance de l'égalité et de l'inclusion dans notre société.</p>
<p>Nous rendons hommage à ces personnes exceptionnelles qui, malgré les défis auxquels elles sont confrontées, n'ont jamais cessé de se battre et de nous enseigner que le handicap n'est pas un obstacle. Leur détermination, leur force de caractère et leur capacité à surmonter les difficultés sont une source d'inspiration pour tous.</p>`,
      "https://lycee-montaigne.edu.lb/storage/egalite-activites/March2025/AGqGjlCvqMiXvOQUL4db.jpg",
      6
    );
  }
  console.log("  Égalité activité done.\n");

  // ─── ORIENTATION ─────────────────────────────────────────────
  console.log("Migrating orientation sections...");
  {
    const page = await getPage("orientation", "Orientation");
    const pid = page.id;

    await upsertSection(
      pid,
      "orientation-intro",
      "L'orientation au Lycée Montaigne",
      `<p>L'orientation est l'accompagnement des élèves dans leur projet personnel et d'avenir. Elle se construit dès la classe de 6e et tout au long de la scolarité grâce au parcours avenir et à un dialogue régulier entre les élèves, les parents, les enseignants, la CPE et la direction.</p>
<p>Au cours des deux derniers cycles de leur scolarisation (cycle de détermination et cycle terminal), les lycéens sont amenés à réfléchir et à déterminer leur projet d'avenir. Dans cette perspective, les lycéens doivent être informés à propos des exigences de l'enseignement supérieur et des débouchés.</p>
<p>La personne ressource en information et orientation (PRIO), en collaboration avec la professeure documentaliste et la conseillère principale d'éducation (CPE), est à la disposition des élèves pour les aider à forger leur projet professionnel.</p>`,
      "https://lycee-montaigne.edu.lb/storage/orientation-s1/July2025/4WWbVtfsEoVLlFT5F8AR.png",
      1
    );

    await upsertSection(
      pid,
      "parcours-avenir",
      "Parcours Avenir",
      `<p>Le <strong>Parcours Avenir</strong> permet à chaque élève de construire progressivement son orientation et de découvrir le monde économique et professionnel. Ce parcours s'articule autour de trois axes :</p>
<ul>
  <li><strong>Comprendre le monde économique et professionnel :</strong> découverte des métiers, des secteurs d'activité, du monde de l'entreprise.</li>
  <li><strong>Développer son sens de l'engagement et de l'initiative :</strong> projets collectifs, prises de responsabilité, engagement citoyen.</li>
  <li><strong>Élaborer son parcours de formation et son parcours professionnel :</strong> connaissance de soi, exploration des filières, construction du projet d'avenir.</li>
</ul>`,
      null,
      2
    );

    await upsertSection(
      pid,
      "forum-universites",
      "Forum des universités — 14 novembre 2025",
      `<p>Le 14 novembre 2025, le Lycée Montaigne a eu le plaisir d'accueillir 18 universités et 12 grandes écoles, offrant à nos élèves 30 sources d'inspiration pour nourrir leur réflexion sur leur orientation. Cette journée a permis à nos lycéens de découvrir des parcours variés, d'échanger avec des représentants d'établissements supérieurs et d'affiner leurs projets d'études.</p>
<p>Un moment précieux pour les accompagner dans la construction de leur avenir académique et professionnel. Un grand merci à tous nos partenaires pour leur présence et leur engagement auprès de nos élèves !</p>`,
      "https://lycee-montaigne.edu.lb/storage/oriantation-activities/November2025/0HnUrhMFu9ReUOd5Dcbs.jpeg",
      3
    );

    await upsertSection(
      pid,
      "forum-metiers",
      "Forum des Métiers — 22 mars 2025",
      `<p>Le 22 mars 2025, le Lycée Montaigne a organisé son Forum des Métiers, un événement enrichissant permettant aux élèves de rencontrer des professionnels de divers secteurs. Au programme :</p>
<ul>
  <li>Rencontres avec des professionnels issus de divers secteurs : médecine, ingénierie, droit, communication, entrepreneuriat et bien d'autres.</li>
  <li>Conférences et témoignages pour mieux comprendre les réalités des métiers et les parcours possibles.</li>
  <li>Échanges et conseils personnalisés, permettant aux élèves d'affiner leurs choix d'orientation et de poser toutes leurs questions.</li>
</ul>
<p>Un grand merci aux intervenants et aux participants pour cette journée d'échanges passionnants !</p>`,
      "https://lycee-montaigne.edu.lb/storage/oriantation-activities/July2025/xKaDU1qKXJrvkFI8kJc3.jpeg",
      4
    );

    await upsertSection(
      pid,
      "forum-universites-dec2024",
      "Forum des universités — 20 décembre 2024",
      `<p>Le 20 décembre 2024 a eu lieu le Forum des Universités au Lycée Montaigne. Ce rendez-vous a permis aux étudiants de découvrir une multitude d'opportunités d'études, d'échanger avec des représentants d'universités, et de mieux orienter leur parcours académique.</p>
<p>Les élèves ont pu rencontrer des établissements de renom, explorer différentes filières, et obtenir des informations clés pour faire les bons choix pour leur avenir. Des présentations et des échanges personnalisés ont rythmé la journée, offrant à chacun des perspectives enrichissantes pour sa future orientation.</p>`,
      "https://lycee-montaigne.edu.lb/storage/oriantation-activities/July2025/E74I8wu2UsLKK4EImXJU.jpeg",
      5
    );

    await upsertSection(
      pid,
      "admissions",
      "Succès des admissions universitaires 2025-2026",
      `<p>Nous sommes heureux de partager avec vous les résultats des admissions universitaires de nos élèves pour l'année académique 2025-2026. Nos bacheliers ont été acceptés dans de prestigieuses universités à travers le monde — un reflet de leur excellence académique, de leur persévérance et de leur engagement.</p>
<p>Bravo à eux pour cette réussite exceptionnelle et bonne route pour leurs études supérieures !</p>
<p><strong>Mila Haddad</strong>, élève en terminale au lycée Montaigne, a brillamment réussi le concours de médecine de l'Université Saint-Joseph (USJ), obtenant la première place de sa session. Ce succès est le fruit de son travail acharné, de sa persévérance et de sa passion pour les sciences médicales.</p>`,
      "https://lycee-montaigne.edu.lb/storage/oriantation-activities/August2025/jGcBleXqGThjKsghZXBQ.jpeg",
      6
    );

    await upsertSection(
      pid,
      "salon-virtuel",
      "Salon virtuel d'orientation AEFE",
      `<p>Rendez-vous au Salon virtuel d'orientation organisé par l'AEFE sur le thème « Étudier en France ».</p>
<p>Élèves, parents d'élèves et enseignants ont rendez-vous en ligne pour le Salon virtuel d'orientation dédié aux lycéennes et lycéens des établissements d'enseignement français à l'étranger.</p>
<p>Au programme : des visites virtuelles de stands représentant près de cinquante établissements d'enseignement supérieur dans différents domaines d'études, cinquante conférences sur des thématiques d'orientation et de vie étudiante et des échanges avec des intervenants pour accompagner les lycéennes et lycéens du réseau (et leurs familles) dans leur projet.</p>`,
      "https://lycee-montaigne.edu.lb/storage/orientation-s4/March2025/85D8l8qy1D3xZHVOrctC.png",
      7
    );
  }
  console.log("  Orientation done.\n");

  // ─── SÉJOURS PÉDAGOGIQUES ────────────────────────────────────
  console.log("Migrating séjours-pédagogiques sections...");
  {
    const page = await getPage("sejours-pedagogiques", "Séjours Pédagogiques");
    const pid = page.id;

    await upsertSection(
      pid,
      "intro",
      "Voyages et séjours pédagogiques",
      `<p>Le Lycée Montaigne organise des séjours pédagogiques et des voyages scolaires qui enrichissent le parcours éducatif des élèves. Ces expériences favorisent l'ouverture culturelle, l'autonomie et la cohésion de groupe.</p>
<p>De la découverte du patrimoine local libanais aux échanges internationaux, chaque séjour est conçu pour prolonger les apprentissages en classe et offrir aux élèves des expériences inoubliables.</p>`,
      null,
      1
    );

    await upsertSection(
      pid,
      "trip-italy-spain-2025",
      "Italie & Espagne — Printemps 2025",
      `<p>Ces dernières semaines, nos élèves ont fait leurs valises pour vivre une aventure inoubliable hors des murs du lycée.</p>
<p>Les <strong>4e ALM</strong> ont découvert les merveilles de l'Italie : Rome, Florence… Un voyage entre art, histoire et pizza, qui restera gravé dans les mémoires !</p>
<p>Pendant ce temps, les <strong>4e ALE et nos Terminales</strong> se sont envolés pour l'Espagne, à la rencontre de toute la richesse de la culture hispanique. Ils ont goûté à la vie locale et perfectionné leur espagnol au fil des rencontres.</p>
<p>Entre découvertes historiques, échanges culturels et moments de convivialité, ces voyages ont été l'occasion pour nos élèves d'ouvrir leurs horizons et de renforcer leur cohésion de groupe. Un grand merci aux enseignants encadrants et à tous ceux qui ont contribué à faire de ces séjours un véritable succès !</p>`,
      "https://lycee-montaigne.edu.lb/storage/sejour-events/May2025/hFri8cmS7pdemtAgigv7.jpeg",
      2
    );

    await upsertSection(
      pid,
      "trip-faraya-snow",
      "Classe blanche à Faraya — 3ème",
      `<p>Une classe blanche a été organisée pour les élèves des classes de 3ème à Faraya. Une invitation à vivre en harmonie avec la nature hivernale, pendant quelques journées hors du contexte scolaire et de la ville.</p>
<p>Les élèves ont partagé des moments inoubliables, comme la construction d'igloo, le tir à l'arc, le shelter, la technique de survie, les raquettes à neige et bien d'autres moments désormais ancrés dans leurs mémoires. Une fin de semaine remplie de découvertes, de sport et de fun !</p>`,
      "https://lycee-montaigne.edu.lb/storage/lebanon-events/September2024/rCI3113VdhrjKHODLHmu.jpg",
      3
    );

    await upsertSection(
      pid,
      "trip-chouwen",
      "Randonnée à Chouwen — 1ère",
      `<p>Sous le ciel bleu de Chouwen, la classe de 1ère se plonge dans la beauté du Liban. En parcourant les sentiers des montagnes, ils ressentent un lien profond avec cette terre chargée d'histoires. Le bruit apaisant des ruisseaux, le chant joyeux des oiseaux, et une baignade rafraîchissante dans le lac leur offrent un moment de paix avant les derniers examens.</p>
<p>Chaque instant partagé, chaque éclat de rire, crée des souvenirs précieux, renforçant leur amitié sous le doux soleil libanais.</p>`,
      "https://lycee-montaigne.edu.lb/storage/lebanon-events/September2024/YeP0K7OCtnS4jaWPtWCl.jpeg",
      4
    );

    await upsertSection(
      pid,
      "trip-ramlieh-ce1",
      "Classe verte à Ramlieh — CE1",
      `<p>Les élèves de CE1 ont vécu une expérience de vie hors du commun lors de leur classe verte à Ramlieh, située dans la magnifique région du Chouf. Durant quatre jours et trois nuits, ils ont eu l'occasion d'explorer leurs sens en goûtant les plantes et en écoutant les sons de la forêt.</p>
<p>Cette aventure leur a également permis de découvrir le monde fascinant des insectes, de s'initier à l'apiculture et d'observer le cycle de vie du ver à soie. Une excursion dans la réserve du Chouf, où les enfants ont découvert les majestueux cèdres et une variété d'espèces d'arbres, a complété ce séjour riche en découvertes.</p>
<p>En parallèle, les élèves ont pu s'adonner à diverses activités, allant des sports en plein air aux exercices d'écoute en passant par des ateliers de fabrication de savon.</p>`,
      "https://lycee-montaigne.edu.lb/storage/lebanon-events/September2024/m6FjcLi7DtiXLIZ4LS6d.jpg",
      5
    );

    await upsertSection(
      pid,
      "trip-ramlieh-cp",
      "Classe verte à Ramlieh — CP",
      `<p>Les élèves de la classe de CP ont vécu une expérience véritablement inoubliable à Ramlieh située dans la région du Chouf, où ils ont appris à vivre loin de leurs parents, entourés de leurs enseignants, pendant quatre jours et trois nuits.</p>
<p>Au programme : des ateliers créatifs de peinture, des excursions dans la réserve du Chouf, de l'escalade, un feu de camp, différentes activités sportives, animation, découverte du cycle de vie des abeilles, exercice pratique d'extinction de feu et la fabrication artisanale de savon.</p>`,
      "https://lycee-montaigne.edu.lb/storage/lebanon-events/September2024/BTLJmzo4NkSzxFFSToKn.jpeg",
      6
    );

    await upsertSection(
      pid,
      "trip-madrid",
      "Madrid — 4ème ALE/Espagnol",
      `<p>Le voyage à Madrid avec les 4e ALE/espagnol du Lycée Montaigne a été une expérience artistique et culturelle inoubliable.</p>
<p>Dès notre arrivée, nous avons été émerveillés par la beauté de la Plaza España, puis avons continué notre périple en passant par des lieux emblématiques tels que la Puerta de Alcalá, le musée du Prado où nous avons admiré les œuvres de Goya et Velázquez, ainsi que le musée de la robotique, l'armée de l'air et de l'espace.</p>
<p>Le Parc du Retiro, avec son Palais de Crystal, nous a enchanté par sa sérénité et sa splendeur. Nous avons également eu la chance de visiter le célèbre Bernabeu, domicile du Real Madrid, et de déambuler le long de la Gran Vía, l'artère animée de la ville. Les repas typiques, comme la paella et le jambon ibérique, ont comblé nos papilles.</p>`,
      "https://lycee-montaigne.edu.lb/storage/espagne-events/September2024/mPvbRpM1p6McuB3llmtb.jpeg",
      7
    );

    await upsertSection(
      pid,
      "trip-thailand-robotics",
      "Compétition MakeX en Thaïlande — Robotique & IA",
      `<p>Du 7 au 13 août 2024, des élèves du Lycée Montaigne ont eu l'opportunité de vivre une expérience inoubliable en participant à la compétition intercontinentale MakeX, qui s'est déroulée en Thaïlande. Cette compétition internationale, dédiée à la robotique et à l'intelligence artificielle, a permis à nos jeunes talents de représenter fièrement le Liban sur la scène mondiale.</p>
<p>Tout au long de cet événement, nos élèves ont non seulement approfondi leurs compétences techniques en matière de robotique et d'IA, mais ils ont également eu la chance de se mesurer à d'autres équipes venant des quatre coins du globe. Les défis rencontrés ont stimulé leur créativité et renforcé leur expertise technique, tout en favorisant une atmosphère de collaboration et d'innovation.</p>`,
      "https://lycee-montaigne.edu.lb/storage/espagne-events/September2024/40s9JhoWVokBBj9DzImD.jpg",
      8
    );

    await upsertSection(
      pid,
      "trip-italy-5eme",
      "Italie — Rome, Naples, Pompéi (5ème EPI)",
      `<p>Dans le cadre des Enseignements Pratiques Interdisciplinaires (EPI), la classe de 5ème a réalisé un voyage en Italie du 5 au 10 avril, croisant Sciences de la Vie et de la Terre, Histoire et Français autour du thème de la géodynamique et des cités romaines.</p>
<p>Les élèves ont arpenté les rues de Rome (Piazza Navona, Forum romain, Colisée, Vatican, Panthéon, Fontana di Trevi), puis se sont dirigés vers Naples pour une randonnée jusqu'au cratère du Vésuve et une visite des ruines de Pompéi et d'Herculanum.</p>
<p>Ce séjour fut riche, tant sur le plan culturel, qu'artistique et historique. Au-delà de cet aspect, les élèves ont évolué dans l'apprentissage de la prise d'initiatives, de l'autonomie et de la vie en collectivité.</p>`,
      "https://lycee-montaigne.edu.lb/storage/italie-events/September2024/YKnysQQU3d71367FYkVT.jpg",
      9
    );

    await upsertSection(
      pid,
      "trip-france-carcassonne",
      "France — Carcassonne & Toulouse (5ème)",
      `<p>Mercredi 20 mars : ça y est, c'est le grand jour du départ en France pour 25 élèves des classes de 5e du Lycée Montaigne ! Ce séjour était attendu depuis de nombreux mois par nos jeunes.</p>
<p>Durant 8 jours, les élèves ont découvert le patrimoine de Carcassonne, arpenté des ruelles datant du Moyen Âge, flâné au bord du canal du midi, rencontré leurs correspondants et visité la Cité de l'espace de Toulouse.</p>`,
      "https://lycee-montaigne.edu.lb/storage/france-events/September2024/1oUteTkmE0XIXnlfoOns.jpg",
      10
    );

    await upsertSection(
      pid,
      "trip-france-bretagne-cm2",
      "France — Bretagne, Île Grande (CM2)",
      `<p>Les élèves de CM2 ont séjourné en France et vécu ensemble des moments forts de partage et d'ouverture culturelle. Hébergés au centre Le Hedraou de Perros-Guirec, ils ont eu l'opportunité de découvrir toutes les richesses de ce petit coin de Bretagne : la faune, la flore, la gastronomie, le patrimoine scientifique.</p>
<p>Sans oublier les nombreuses rencontres avec leurs correspondants avec qui ils échangeaient depuis septembre. De belles rencontres et de belles amitiés sont nées de ce voyage, clôturé par une soirée dansante : un « fest-noz » animé par des musiciens bretons.</p>`,
      "https://lycee-montaigne.edu.lb/storage/france-events/September2024/3EKgapdBYNKqiujL2aQC.jpg",
      11
    );
  }
  console.log("  Séjours pédagogiques done.\n");

  // ─── PÔLE INCLUSION ──────────────────────────────────────────
  console.log("Migrating pole-inclusion sections...");
  {
    const page = await getPage("pole-inclusion", "Pôle Inclusion");
    const pid = page.id;

    await upsertSection(
      pid,
      "intro",
      "Pôle Inclusion — Élèves à Besoins Éducatifs Particuliers",
      `<p>Le Lycée Montaigne s'engage pour l'inclusion de tous les élèves. Notre pôle inclusion accompagne les élèves à besoins éducatifs particuliers (EBEP) tout au long de leur parcours scolaire, de la maternelle à la terminale.</p>
<p>Notre approche repose sur :</p>
<ul>
  <li>Le regard positif porté sur chaque personne et la confiance dans l'éducabilité de chacun, quels que soient ses besoins spécifiques.</li>
  <li>Une équipe pluridisciplinaire : enseignants, psychologue, orthophoniste et éducateurs travaillent ensemble pour le bien-être de l'élève.</li>
  <li>Des plans adaptés individuels : PAP (Plan d'Accompagnement Personnalisé), PPS (Projet Personnalisé de Scolarisation), PAI (Projet d'Accueil Individualisé).</li>
</ul>`,
      null,
      1
    );

    await upsertSection(
      pid,
      "espace-soleil",
      "Espace Soleil — Maternelle inclusive",
      `<p>L'<strong>Espace Soleil</strong> est dédié à l'inclusion des jeunes enfants présentant des besoins éducatifs particuliers au niveau de la maternelle. Dans un environnement bienveillant et stimulant, les enfants bénéficient d'un accompagnement adapté qui leur permet de s'épanouir et de progresser à leur rythme.</p>
<p>L'équipe de l'Espace Soleil travaille en étroite collaboration avec les familles pour construire un projet éducatif personnalisé pour chaque enfant.</p>`,
      null,
      2
    );

    await upsertSection(
      pid,
      "espace-ebep",
      "Espace Étincelle — Élèves à Besoins Éducatifs Particuliers",
      `<p>L'<strong>Espace Étincelle (EBEP)</strong> accompagne les élèves présentant des difficultés d'apprentissage ou des besoins spécifiques au niveau du primaire et du collège. Grâce à des dispositifs pédagogiques individualisés, chaque élève peut progresser selon son propre rythme et développer ses compétences.</p>
<p>L'équipe pluridisciplinaire (enseignants spécialisés, psychologue, orthophoniste) assure un suivi régulier et maintient un dialogue constant avec les familles.</p>`,
      null,
      3
    );

    await upsertSection(
      pid,
      "espace-arc-en-ciel",
      "Espace Arc-en-Ciel — Inclusion lycée",
      `<p>L'<strong>Espace Arc-en-Ciel</strong> est dédié à l'accompagnement des lycéens à besoins éducatifs particuliers. Il vise à permettre à chaque élève de poursuivre sa scolarité dans les meilleures conditions possibles, en bénéficiant d'aménagements adaptés et d'un soutien personnalisé.</p>
<p>L'objectif est de préparer les élèves à l'autonomie et à la réussite dans les examens nationaux et le passage dans l'enseignement supérieur.</p>`,
      null,
      4
    );

    await upsertSection(
      pid,
      "accompagnement",
      "Accompagnement et dispositifs",
      `<p>Le pôle inclusion du Lycée Montaigne met en place différents dispositifs pour accompagner les élèves à besoins éducatifs particuliers :</p>
<ul>
  <li><strong>PAP (Plan d'Accompagnement Personnalisé) :</strong> Pour les élèves présentant des troubles des apprentissages (dyslexie, dyscalculie, TDA/H, etc.)</li>
  <li><strong>PPS (Projet Personnalisé de Scolarisation) :</strong> Pour les élèves en situation de handicap reconnus par la MDPH</li>
  <li><strong>PAI (Projet d'Accueil Individualisé) :</strong> Pour les élèves présentant des problèmes de santé nécessitant des aménagements spécifiques</li>
  <li><strong>Aménagements aux examens :</strong> Tiers-temps, utilisation d'un ordinateur, secrétariat, etc.</li>
</ul>`,
      null,
      5
    );
  }
  console.log("  Pôle inclusion done.\n");

  // ─── INSCRIPTIONS ────────────────────────────────────────────
  console.log("Migrating inscriptions sections...");
  {
    const page = await getPage("inscriptions", "Inscriptions et réinscriptions");
    const pid = page.id;

    await upsertSection(
      pid,
      "inscription",
      "Procédure d'inscription 2026-2027",
      `<p>Le Lycée Montaigne lance sa campagne de réinscription et d'inscription pour les élèves de la Petite Section à la classe Terminale, <strong>à partir du 1er décembre 2025.</strong></p>
<p>Les familles souhaitant faire une <strong>demande d'inscription</strong> sont priées de présenter les documents suivants lors de l'inscription (Original + photocopie) :</p>
<ul>
  <li>Des photocopies des pages de vaccination du carnet de santé de l'enfant et la fiche médicale complétée.</li>
  <li>Deux photos d'identité récentes de l'enfant.</li>
  <li>Documents d'identité :
    <ul>
      <li>Pour les élèves libanais : l'extrait d'état civil original.</li>
      <li>Pour les élèves binationaux : photocopies de la carte d'identité et du passeport étranger.</li>
      <li>Pour les élèves non libanais : photocopie du passeport étranger.</li>
    </ul>
  </li>
  <li>Attestation scolaire de l'année en cours.</li>
  <li>Photocopies des bulletins scolaires de l'année précédente et de l'année en cours (à partir de la classe de MS).</li>
  <li>Pour l'admission dans les classes secondaires (seconde, première et terminale) : photocopie du brevet libanais pour les élèves non dispensés du programme libanais.</li>
  <li>Dispense officielle éventuelle des études en arabe pour les élèves concernés, obtenue du ministère libanais de l'éducation nationale, à partir de la classe de CE2.</li>
  <li>En cas de divorce, copie du jugement attribuant la garde de l'enfant.</li>
</ul>`,
      "https://lycee-montaigne.edu.lb/storage/adm-s1/December2025/xbMaFrODRj51WGOcKi4k.png",
      1
    );

    await upsertSection(
      pid,
      "bourse",
      "Bourses Scolaires",
      `<p>Bourses scolaires au bénéfice des enfants Français résidant avec leur famille à l'étranger.</p>
<p>Des bourses sont attribuées par l'Agence pour l'Enseignement Français à l'Étranger (AEFE) pour aider les familles françaises à financer la scolarité de leurs enfants dans les établissements du réseau.</p>
<p>Pour plus d'informations sur les conditions d'éligibilité et les modalités de demande, veuillez contacter le service administratif du lycée.</p>`,
      "https://lycee-montaigne.edu.lb/storage/adm-s3/November2024/VOFelUKYIHWGosCjXmsz.png",
      2
    );
  }
  console.log("  Inscriptions done.\n");

  // ─── LIGUE SPORTIVE ──────────────────────────────────────────
  console.log("Migrating ligue-sportive sections...");
  {
    const page = await getPage("ligue-sportive", "Ligue Sportive AEFE-UNSS");
    const pid = page.id;

    await upsertSection(
      pid,
      "ligue-intro",
      "Ligue sportive scolaire AEFE-UNSS",
      `<p>Une ligue sportive scolaire AEFE-UNSS est une structure régionale au sein du réseau des établissements français à l'étranger, visant à promouvoir la pratique du sport scolaire selon les principes de l'AEFE (Agence pour l'enseignement français à l'étranger) et de l'UNSS (Union Nationale du Sport Scolaire).</p>
<p>Les élèves du Lycée Montaigne participent régulièrement aux compétitions inter-lycées dans de nombreuses disciplines : basketball, escalade, relais, tennis de table, badminton, Ultimate Frisbee, ski, échecs, et bien d'autres.</p>`,
      "https://lycee-montaigne.edu.lb/storage/actions-sportives/May2025/5AyqpqwCqoBIFxIXphFP.jpeg",
      1
    );

    await upsertSection(
      pid,
      "resultats-2025-2026",
      "Résultats 2025-2026",
      `<p>Le Lycée Montaigne brille lors des Jeux ZPO Cycle 4 2025-2026 à Saint Famille Fanar :</p>
<ul>
  <li><strong>Rhéa Keirouz</strong> : 1ère place en relais</li>
  <li><strong>Cyrine Bou Chedid</strong> : 3ème place en escalade</li>
</ul>
<p>Lors de la Journée SOP organisée par l'AEFE, nos élèves ont participé avec brio à des activités sportives variées, des défis stimulants et la découverte de disciplines inspirantes, comme les sports paralympiques et les compétitions mixtes.</p>
<p>Aux Jeux ZPO de mai (5e, 4e, 3e) :</p>
<ul>
  <li>1ère place en tennis de table : Karim Fayad & Cyana Haladjian</li>
  <li>3ème place en tennis de table : Cyrine Bou Chedid & Raphaël Karam</li>
  <li>3ème place en relais : Cyrine Bou Chedid, Karim Fayad, Elia Nassif & Thierry Issa</li>
</ul>`,
      "https://lycee-montaigne.edu.lb/storage/ligue-sportive-events/January2026/cu5MtjhcWR9veHHS8X6k.jpeg",
      2
    );

    await upsertSection(
      pid,
      "resultats-2024-2025",
      "Résultats 2024-2025",
      `<p>Le Lycée Montaigne brille au concours ZPO de la Ligue AEFE :</p>
<ul>
  <li>2ème place au tournoi d'<strong>Ultimate Frisbee</strong></li>
  <li>2ème place en <strong>Tennis de table</strong> : Ronaldo Abboud</li>
</ul>
<p>Au criterium de ski à Faraya :</p>
<ul>
  <li><strong>Chris Tchopourian</strong> (Terminale) : 2ème place en catégorie II garçons</li>
</ul>
<p>Au championnat d'échecs de la ligue AEFE-UNSS :</p>
<ul>
  <li><strong>William Mbarak</strong> : 3ème place du cycle 4</li>
</ul>`,
      "https://lycee-montaigne.edu.lb/storage/ligue-sportive-events/May2025/P3OuuxEc709C0u8wyFTB.jpeg",
      3
    );
  }
  console.log("  Ligue sportive done.\n");

  // ─── SANTE ACTIVITE (new page) ───────────────────────────────
  console.log("Migrating sante-activite sections...");
  {
    const page = await getPage("sante-activite", "Activités Santé");
    const pid = page.id;

    await upsertSection(
      pid,
      "sante-intro",
      "Le service de santé du Lycée Montaigne",
      `<p>Le service de santé du Lycée Montaigne assure le suivi médical, visuel et dentaire de l'ensemble des élèves tout au long de l'année scolaire. L'infirmière, le médecin, l'optométriste et le dentiste travaillent en étroite collaboration pour garantir le bien-être de chaque élève.</p>`,
      null,
      1
    );

    await upsertSection(
      pid,
      "controle-visuel",
      "Contrôle visuel — Optométriste",
      `<p>Dans le cadre du suivi de la santé visuelle de nos élèves, nous avons accueilli Mme Nisrine Achkar, optométriste, pour un contrôle allant de la PS à la Terminale. Une visite essentielle pour assurer le bien-être et le confort visuel de chacun.</p>
<p>La vision joue un rôle important pour la réussite scolaire. Il est donc important d'incorporer l'examen de la vue à la routine de chaque rentrée scolaire. L'examen fait par l'optométriste est un examen primitif qui oriente vers d'autres examens approfondis. Beaucoup de troubles de vision sont détectés comme la myopie, l'hypermétropie et l'astigmatisme.</p>`,
      "https://lycee-montaigne.edu.lb/storage/sante-activities/November2025/Jp06V1zAqPQwscGoCzYA.jpeg",
      2
    );

    await upsertSection(
      pid,
      "hygiene-corps",
      "Mon corps, mon trésor — Hygiène corporelle",
      `<p>Ton corps, c'est ton trésor, et il mérite toute ton attention ! Pour rester propre et en bonne santé, il faut adopter de bons gestes chaque jour :</p>
<ul>
  <li>Se laver les mains avant de manger, après être allé aux toilettes ou après avoir joué, pour éliminer les microbes.</li>
  <li>Se brosser les dents matin et soir afin de garder un sourire propre et frais.</li>
  <li>Prendre sa douche ou son bain pour enlever la sueur, la poussière et les microbes qui s'accumulent.</li>
  <li>Changer de vêtements chaque jour, surtout les sous-vêtements et les chaussettes.</li>
  <li>Utiliser un mouchoir lors des éternuements et le jeter à la poubelle.</li>
</ul>`,
      "https://lycee-montaigne.edu.lb/storage/sante-activities/November2025/iJV9rus72H1Y0VjVOQPd.jpeg",
      3
    );

    await upsertSection(
      pid,
      "massage-cardiaque",
      "Journée de la Résilience — Massage cardiaque",
      `<p>Dans le cadre d'une mobilisation mondiale initiée par le réseau AEFE, le Lycée Montaigne a pris part à un défi symbolique et porteur de sens : assurer un massage cardiaque en continu sur un mannequin, dans un relais animé par des élèves et des membres du personnel, formés ou non aux premiers secours.</p>
<p>Encadrés par l'infirmière, les participants se sont relayés pendant près d'une heure. Chaque geste a été guidé, corrigé, valorisé, dans un esprit de bienveillance et de transmission. Cette initiative s'inscrit pleinement dans l'esprit de la Journée de la Résilience, qui vise à renforcer les capacités de chacun à faire face aux imprévus avec calme, compétence et solidarité.</p>`,
      "https://lycee-montaigne.edu.lb/storage/sante-activities/November2025/jZZKohDGk8ej4TyK1hJH.jpeg",
      4
    );

    await upsertSection(
      pid,
      "medicaments-enfants",
      "Médicaments et enfants — Sensibilisation PS",
      `<p>Dans le but de sensibiliser les enfants aux dangers liés à l'ingestion de médicaments, même lorsqu'ils ressemblent à des bonbons ou des sucreries, Dr Antoine Nader, un pharmacien, est intervenu à l'école pour aider les élèves de la classe de PS à comprendre ce message crucial.</p>
<p>Bien que certains médicaments puissent avoir l'apparence de bonbons en raison de leur forme, de leur couleur ou de leur goût, cela ne signifie pas qu'ils sont destinés à être consommés comme des sucreries. Les médicaments doivent toujours être pris sous la supervision d'un adulte, notamment pour éviter les risques d'intoxication ou de réactions indésirables.</p>`,
      "https://lycee-montaigne.edu.lb/storage/sante-activities/May2025/I7u6re9ygOCL07sZ5ekE.jpeg",
      5
    );

    await upsertSection(
      pid,
      "corps-appartient",
      "Mon corps m'appartient — CP",
      `<p>Avec l'infirmière, les élèves de la classe de CP ont appris que leur corps leur appartient et que personne n'a le droit de les toucher s'ils ne le veulent pas, et que certaines parties du corps sont « privées ».</p>
<p>Ils ont appris aussi à ne pas avoir honte et d'avoir confiance pour parler en cas d'abus. Un enfant ne doit pas se sentir obligé de recevoir un bisou ou même une caresse. Il a le droit de dire « Non » et même doit dire « Non ».</p>`,
      "https://lycee-montaigne.edu.lb/storage/sante-activities/May2025/HETpC5M7GnpHAPvz1puu.jpeg",
      6
    );

    await upsertSection(
      pid,
      "sommeil-ecrans",
      "Sommeil et écrans — CM1 et 4ème",
      `<p>La privation de sommeil diminue la capacité de concentration et de mémorisation, ce qui peut avoir des effets sur l'acquisition des compétences scolaires. Un jeune qui n'a pas assez dormi n'est pas dans les meilleures conditions pour apprendre.</p>
<p>Avec l'infirmière, les élèves de CM1 et de 4ème ont découvert les effets nocifs des écrans (la lumière bleue) et des ondes électromagnétiques sur le fonctionnement du corps et surtout du cerveau. Des artifices comportementaux peuvent être mis en place :</p>
<ul>
  <li>Éteindre le téléphone ou, a minima, le mettre en mode avion</li>
  <li>Placer les écrans dans une autre pièce</li>
  <li>Passer l'écran en noir et blanc pour être moins attiré</li>
  <li>Limiter l'accès à certaines applications avec une limite de temps quotidienne</li>
</ul>`,
      "https://lycee-montaigne.edu.lb/storage/sante-activities/May2025/HETpC5M7GnpHAPvz1puu.jpeg",
      7
    );

    await upsertSection(
      pid,
      "puberte",
      "La puberté — 6ème",
      `<p>Avec l'infirmière, les élèves de la classe de 6ème ont assisté à une intervention interactive sur le sujet de la puberté. Ils ont appris que la puberté est une période pleine de changements physiques, psychologiques et mentaux, due aux hormones qui sont des substances chimiques agissant comme des messagers dans le corps.</p>
<p>Chez certains, la puberté commence tôt. Chez d'autres, elle commence tard. Cette période peut être une source de confusion — mais ces changements sont tout à fait naturels, on passe tous par là !</p>`,
      "https://lycee-montaigne.edu.lb/storage/sante-activities/May2025/HETpC5M7GnpHAPvz1puu.jpeg",
      8
    );

    await upsertSection(
      pid,
      "sport-sante",
      "Sport et santé — CP",
      `<p>Avec la professeure d'EPS Mme Daher, les élèves de la classe de CP ont accueilli Mme Gharby pour une séance de sport et de santé. Ils ont appris qu'il n'y a pas d'âge pour bouger. Pour être en bonne santé, il est recommandé de bouger au moins 30 minutes par jour.</p>
<p>Quand on bouge, le cœur bat plus vite, le souffle est plus rapide et on transpire. Plus on bouge et on fait du sport, plus le cœur et les muscles sont forts. C'est facile de bouger tous les jours — c'est bon pour la santé !</p>`,
      "https://lycee-montaigne.edu.lb/storage/sante-activities/May2025/82wiyWqgcdRfHzjZ2Rrl.jpeg",
      9
    );
  }
  console.log("  Santé activité done.\n");

  // ── 4. ACTIVITY ITEMS ──────────────────────────────────────────
  console.log("Migrating activity items...");

  // Orientation activities
  const orientationActivities = await db.activityItem.findMany({
    where: { category: "orientation" },
  });
  if (orientationActivities.length === 0) {
    await db.activityItem.createMany({
      data: [
        {
          title: "Forum des universités — 14 novembre 2025",
          description: "18 universités et 12 grandes écoles ont participé à cette journée, offrant 30 sources d'inspiration à nos élèves pour nourrir leur réflexion sur leur orientation.",
          image: "https://lycee-montaigne.edu.lb/storage/oriantation-activities/November2025/0HnUrhMFu9ReUOd5Dcbs.jpeg",
          category: "orientation",
          order: 1,
        },
        {
          title: "Forum des Métiers — 22 mars 2025",
          description: "Médecine, ingénierie, droit, communication, entrepreneuriat — des professionnels de divers secteurs ont partagé leurs parcours et conseils personnalisés aux élèves.",
          image: "https://lycee-montaigne.edu.lb/storage/oriantation-activities/July2025/xKaDU1qKXJrvkFI8kJc3.jpeg",
          category: "orientation",
          order: 2,
        },
        {
          title: "Forum des universités — 20 décembre 2024",
          description: "Journée d'échanges avec les représentants d'universités locales et internationales pour découvrir les opportunités d'études et affiner son parcours académique.",
          image: "https://lycee-montaigne.edu.lb/storage/oriantation-activities/July2025/E74I8wu2UsLKK4EImXJU.jpeg",
          category: "orientation",
          order: 3,
        },
        {
          title: "Salon virtuel AEFE — Étudier en France",
          description: "Salon virtuel d'orientation organisé par l'AEFE avec 50 établissements d'enseignement supérieur, 50 conférences et des échanges personnalisés.",
          image: "https://lycee-montaigne.edu.lb/storage/orientation-s4/March2025/85D8l8qy1D3xZHVOrctC.png",
          category: "orientation",
          order: 4,
        },
      ],
      skipDuplicates: true,
    });
    console.log("  Orientation activities created.");
  } else {
    console.log("  Orientation activities already exist, skipping.");
  }

  // Sante activities
  const santeActivities = await db.activityItem.findMany({
    where: { category: "sante-activites" },
  });
  if (santeActivities.length === 0) {
    await db.activityItem.createMany({
      data: [
        {
          title: "Contrôle visuel annuel",
          description: "Visite de l'optométriste pour un contrôle visuel de la PS à la Terminale, avec dépistage de la myopie, hypermétropie et astigmatisme.",
          image: "https://lycee-montaigne.edu.lb/storage/sante-activities/November2025/Jp06V1zAqPQwscGoCzYA.jpeg",
          category: "sante-activites",
          order: 1,
        },
        {
          title: "Journée de la Résilience — Massage cardiaque",
          description: "Mobilisation AEFE : relais de massage cardiaque encadré par l'infirmière pour sensibiliser élèves et personnel aux gestes de premiers secours.",
          image: "https://lycee-montaigne.edu.lb/storage/sante-activities/November2025/jZZKohDGk8ej4TyK1hJH.jpeg",
          category: "sante-activites",
          order: 2,
        },
        {
          title: "Hygiène corporelle — PS/MS",
          description: "Séances d'éveil sur l'hygiène du corps : lavage des mains, brossage des dents, notion d'intimité et respect du corps.",
          image: "https://lycee-montaigne.edu.lb/storage/sante-activities/May2025/SAcMF3CmVs6wupNqFF5m.jpeg",
          category: "sante-activites",
          order: 3,
        },
        {
          title: "Mon corps m'appartient — CP",
          description: "Sensibilisation à la protection du corps : apprendre à dire non, distinguer les parties privées et briser les tabous autour de la sécurité corporelle.",
          image: "https://lycee-montaigne.edu.lb/storage/sante-activities/May2025/HETpC5M7GnpHAPvz1puu.jpeg",
          category: "sante-activites",
          order: 4,
        },
        {
          title: "Sommeil et écrans — CM1 & 4ème",
          description: "Découverte des effets nocifs de la lumière bleue et des ondes électromagnétiques sur le sommeil et les apprentissages, avec des conseils pratiques.",
          image: "https://lycee-montaigne.edu.lb/storage/sante-activities/March2025/TNsrl7Ni0MBwLCGVnvYM.jpeg",
          category: "sante-activites",
          order: 5,
        },
        {
          title: "La puberté — 6ème",
          description: "Intervention interactive sur les changements physiques, psychologiques et mentaux de la puberté pour dédramatiser et informer les élèves de 6ème.",
          image: "https://lycee-montaigne.edu.lb/storage/sante-activities/May2025/HETpC5M7GnpHAPvz1puu.jpeg",
          category: "sante-activites",
          order: 6,
        },
        {
          title: "Médicaments ≠ bonbons — PS",
          description: "Sensibilisation des tout-petits aux dangers des médicaments qui ressemblent à des bonbons, avec l'intervention du pharmacien Dr Antoine Nader.",
          image: "https://lycee-montaigne.edu.lb/storage/sante-activities/May2025/I7u6re9ygOCL07sZ5ekE.jpeg",
          category: "sante-activites",
          order: 7,
        },
        {
          title: "Sport et santé — CP",
          description: "Séance combinant EPS et éducation à la santé : l'importance de bouger 30 minutes par jour pour un cœur et des muscles forts.",
          image: "https://lycee-montaigne.edu.lb/storage/sante-activities/May2025/82wiyWqgcdRfHzjZ2Rrl.jpeg",
          category: "sante-activites",
          order: 8,
        },
      ],
      skipDuplicates: true,
    });
    console.log("  Santé activities created.");
  } else {
    console.log("  Santé activities already exist, skipping.");
  }

  // Ligue sportive activities
  const ligueActivities = await db.activityItem.findMany({
    where: { category: "ligue-sportive" },
  });
  if (ligueActivities.length === 0) {
    await db.activityItem.createMany({
      data: [
        {
          title: "Jeux ZPO Cycle 4 — Décembre 2025",
          description: "Basketball, escalade et relais à Saint Famille Fanar. Rhéa Keirouz 1ère en relais, Cyrine Bou Chedid 3ème en escalade.",
          image: "https://lycee-montaigne.edu.lb/storage/ligue-sportive-events/January2026/cu5MtjhcWR9veHHS8X6k.jpeg",
          category: "ligue-sportive",
          order: 1,
        },
        {
          title: "Journée SOP AEFE",
          description: "Sports variés, défis stimulants et disciplines inspirantes incluant les sports paralympiques et compétitions mixtes. Esprit d'équipe et solidarité au rendez-vous.",
          image: "https://lycee-montaigne.edu.lb/storage/ligue-sportive-events/May2025/P3OuuxEc709C0u8wyFTB.jpeg",
          category: "ligue-sportive",
          order: 2,
        },
        {
          title: "Jeux ZPO — Mai 2025",
          description: "Tennis de table, badminton et relais. 1ère place en tennis de table : Karim Fayad & Cyana Haladjian.",
          image: "https://lycee-montaigne.edu.lb/storage/ligue-sportive-events/May2025/4RSzcaY5Pm9PpOYkhyfK.jpeg",
          category: "ligue-sportive",
          order: 3,
        },
        {
          title: "ZPO Ligue AEFE — Ultimate & Tennis de table",
          description: "2ème place au tournoi d'Ultimate Frisbee et 2ème place en tennis de table pour Ronaldo Abboud.",
          image: "https://lycee-montaigne.edu.lb/storage/ligue-sportive-events/May2025/oXxwOv94KQ89cfaEnDuy.jpeg",
          category: "ligue-sportive",
          order: 4,
        },
        {
          title: "Criterium de ski à Faraya",
          description: "Chris Tchopourian (Terminale) : 2ème place en catégorie II garçons. Christy Khairallah et Michael Khoury ont aussi participé dans leurs catégories.",
          image: "https://lycee-montaigne.edu.lb/storage/ligue-sportive-events/September2024/LiFT96PPIbuZ7icTClEs.jpg",
          category: "ligue-sportive",
          order: 5,
        },
        {
          title: "Championnat d'échecs AEFE-UNSS",
          description: "William Mbarak remporte la 3ème place du cycle 4 au championnat d'échecs de la ligue AEFE-UNSS Zone Proche Orient.",
          image: "https://lycee-montaigne.edu.lb/storage/ligue-sportive-events/September2024/zaHImTS6XcJCm6ND56Tf.jpg",
          category: "ligue-sportive",
          order: 6,
        },
      ],
      skipDuplicates: true,
    });
    console.log("  Ligue sportive activities created.");
  } else {
    console.log("  Ligue sportive activities already exist, skipping.");
  }

  // Égalité activities
  const egaliteActivities = await db.activityItem.findMany({
    where: { category: "egalite" },
  });
  if (egaliteActivities.length === 0) {
    await db.activityItem.createMany({
      data: [
        {
          title: "Débat 8 mars — Aménager les espaces pour l'égalité",
          description: "Débat réunissant élèves du 1er et 2nd degrés sous le thème : « Comment penser et aménager les espaces pour que chacun trouve sa place ? »",
          image: "https://lycee-montaigne.edu.lb/storage/egalite-activites/May2025/n2MEOg4B5XaEyppiSdZA.png",
          category: "egalite",
          order: 1,
        },
        {
          title: "Lauréate #AEFEgalité 2025 — Princia Mouawad",
          description: "Princia Mouawad (Terminale) désignée lauréate du concours #AEFEgalité 2025 par la Directrice générale de l'AEFE pour son affiche sur l'égalité professionnelle.",
          image: "https://lycee-montaigne.edu.lb/storage/egalite-activites/May2025/32TchvdKVSXFx3cZ3U8q.png",
          category: "egalite",
          order: 2,
        },
        {
          title: "Label Génération 2024",
          description: "Le Lycée Montaigne labélisé Génération 2024 pour son engagement à développer la pratique sportive et faire vivre l'aventure olympique aux jeunes.",
          image: "https://lycee-montaigne.edu.lb/storage/egalite-activites/March2025/sAELm48qiMuUVw81PiQT.png",
          category: "egalite",
          order: 3,
        },
        {
          title: "Documentaire « FORCE = nom FÉMININ » — Patricia Chidiac",
          description: "Élève de 2nde, Patricia Chidiac réalise un documentaire sur les droits des femmes dans le cadre du programme de Français sur la littérature d'idées.",
          image: "https://lycee-montaigne.edu.lb/storage/egalite-activites/March2025/wDNEXp7fqrp7wE8cflyM.jpeg",
          category: "egalite",
          order: 4,
        },
        {
          title: "Rencontres avec des sportifs paralympiques — CM1",
          description: "Les élèves de CM1 réalisent des recherches, entretiens et reportages avec des sportifs paralympiques pour promouvoir l'égalité et l'inclusion.",
          image: "https://lycee-montaigne.edu.lb/storage/egalite-activites/March2025/AGqGjlCvqMiXvOQUL4db.jpg",
          category: "egalite",
          order: 5,
        },
      ],
      skipDuplicates: true,
    });
    console.log("  Égalité activities created.");
  } else {
    console.log("  Égalité activities already exist, skipping.");
  }

  console.log("\nMigration complete!");
}

main()
  .catch((e) => {
    console.error("Migration failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
