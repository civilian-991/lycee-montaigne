/* ── Governance Instance Data ──────────────────────────── */

export interface Member {
  name: string;
  role: string;
}

export interface GovernanceInstance {
  id: string;
  originalId: number;
  title: string;
  subtitle: string;
  iconName: string;
  accentColor: string;
  description: string[];
  composition: string[];
  members?: Member[];
  meetingFrequency?: string;
  keyResponsibilities?: string[];
  presidence?: string;
}

export const instances: GovernanceInstance[] = [
  {
    id: "conseil-strategique",
    originalId: 1,
    title: "Conseil Strategique",
    subtitle: "Instance consultative de pilotage strategique",
    iconName: "Building2",
    accentColor: "from-primary to-primary-dark",
    description: [
      "Un Conseil Strategique, consultatif, qui accompagne le Conseil d\u2019Administration dans sa strategie de croissance, de positionnement, de planification et de developpement.",
      "Cette instance joue un role essentiel dans la definition des orientations a long terme de l\u2019etablissement, en apportant une expertise diversifiee et une vision prospective au service du projet educatif du Lycee Montaigne.",
    ],
    composition: [
      "President",
      "Membre d\u2019honneur",
      "Cheffe d\u2019etablissement",
      "President du Conseil d\u2019Administration",
      "Membres nommes",
    ],
    members: [
      { name: "Raymond Araygi", role: "President" },
      { name: "Yves Aubin De La Messuziere", role: "Membre d\u2019honneur" },
      { name: "Rachel Atallah", role: "Cheffe d\u2019etablissement" },
      { name: "Chaaya Atallah", role: "President du Conseil d\u2019Administration" },
      { name: "Camil Atallah", role: "Membre" },
      { name: "Sami Toubia", role: "Membre" },
      { name: "Andree Daouk", role: "Membre" },
      { name: "Viviane Ghanem", role: "Membre" },
    ],
    keyResponsibilities: [
      "Accompagner le Conseil d\u2019Administration dans sa strategie de croissance",
      "Conseiller sur le positionnement institutionnel",
      "Contribuer a la planification strategique a moyen et long terme",
      "Orienter les axes de developpement de l\u2019etablissement",
    ],
  },
  {
    id: "conseil-etablissement",
    originalId: 2,
    title: "Conseil d\u2019Etablissement",
    subtitle: "Instance principale de gouvernance scolaire",
    iconName: "Scale",
    accentColor: "from-secondary to-secondary-dark",
    description: [
      "Le conseil d\u2019etablissement est une instance importante qui est consultee sur ce qui touche a la vie de l\u2019etablissement.",
      "Il reunit l\u2019ensemble des parties prenantes de la communaute educative pour debattre et orienter les decisions majeures concernant le fonctionnement et le projet pedagogique du lycee.",
    ],
    composition: [
      "Direction",
      "Representants des parents",
      "Eleves du secondaire",
      "Representants des enseignants",
    ],
    meetingFrequency: "Le conseil d\u2019etablissement se reunit au moins 3 fois par an.",
    presidence: "Preside par la Cheffe d\u2019etablissement",
    keyResponsibilities: [
      "Adopter le projet d\u2019etablissement",
      "Emettre des avis sur les questions touchant a la vie de l\u2019etablissement",
      "Examiner le rapport annuel de fonctionnement",
      "Voter le reglement interieur",
    ],
  },
  {
    id: "conseil-ecole",
    originalId: 3,
    title: "Conseil d\u2019Ecole",
    subtitle: "Organe consultatif du premier degre",
    iconName: "GraduationCap",
    accentColor: "from-primary to-primary-dark",
    description: [
      "Le conseil d\u2019ecole est un organe du conseil d\u2019etablissement. Il est l\u2019instance de concertation qui examine les questions relatives a l\u2019organisation et au fonctionnement pedagogique des classes du primaire.",
      "Il couvre l\u2019ensemble du premier degre, de la PS de maternelle au CM2, et permet une coordination etroite entre les equipes pedagogiques et les familles.",
    ],
    composition: [
      "Direction",
      "Representants des parents",
      "Equipe pedagogique",
    ],
    meetingFrequency: "Le conseil d\u2019ecole se reunit a minima trois fois par an.",
    presidence: "Preside par la directrice de l\u2019ecole",
    keyResponsibilities: [
      "Voter le reglement interieur de l\u2019ecole",
      "Adopter le projet d\u2019ecole",
      "Donner un avis sur les questions interessant la vie de l\u2019ecole",
      "Examiner les conditions de bonne integration des enfants en situation de handicap",
    ],
  },
  {
    id: "conseil-pedagogique",
    originalId: 4,
    title: "Conseil Pedagogique",
    subtitle: "Instance de reflexion et d\u2019innovation pedagogique",
    iconName: "BookOpen",
    accentColor: "from-secondary to-secondary-dark",
    description: [
      "Le conseil pedagogique est une instance de consultation des enseignants sur la politique educative de l\u2019etablissement. Il prepare la partie pedagogique du projet d\u2019etablissement.",
      "Il favorise la concertation entre les enseignants, notamment sur la coordination des enseignements, les dispositifs d\u2019aide et de soutien, les innovations pedagogiques et l\u2019evaluation des eleves.",
    ],
    composition: [
      "Cheffe d\u2019etablissement",
      "Adjoints et directeurs",
      "Coordinateurs de discipline",
      "Professeurs representants",
    ],
    presidence: "Preside par la Cheffe d\u2019etablissement",
    keyResponsibilities: [
      "Preparer la partie pedagogique du projet d\u2019etablissement",
      "Coordonner les enseignements et les methodes pedagogiques",
      "Favoriser l\u2019innovation et l\u2019experimentation pedagogique",
      "Proposer des actions de formation des enseignants",
      "Accompagner les dispositifs d\u2019aide et de soutien aux eleves",
    ],
  },
  {
    id: "conseil-discipline",
    originalId: 5,
    title: "Conseil de Discipline",
    subtitle: "Garant du respect du reglement interieur",
    iconName: "Gavel",
    accentColor: "from-primary to-primary-dark",
    description: [
      "Le conseil de discipline est competent pour prononcer les sanctions prevues par le reglement interieur a l\u2019encontre des eleves ayant commis des fautes graves.",
      "Il garantit le respect du droit et de l\u2019equite dans le traitement des situations disciplinaires, en veillant au respect du contradictoire et des droits de la defense.",
    ],
    composition: [
      "Cheffe d\u2019etablissement",
      "Adjoints",
      "Representants des enseignants",
      "Representants des parents",
      "Representants des eleves",
      "Conseiller principal d\u2019education",
    ],
    presidence: "Preside par la Cheffe d\u2019etablissement",
    keyResponsibilities: [
      "Examiner les cas de manquement grave au reglement interieur",
      "Prononcer des sanctions disciplinaires",
      "Garantir le respect des droits de la defense",
      "Veiller a l\u2019equite dans le traitement des situations",
    ],
  },
  {
    id: "conseil-classe",
    originalId: 6,
    title: "Conseil de Classe",
    subtitle: "Suivi individuel et collectif des eleves",
    iconName: "ClipboardList",
    accentColor: "from-secondary to-secondary-dark",
    description: [
      "Le conseil de classe est l\u2019instance qui examine les questions pedagogiques interessant la vie de la classe, notamment les modalites d\u2019organisation du travail personnel des eleves.",
      "Il se prononce sur les conditions dans lesquelles se poursuit la scolarite de chaque eleve, emet des avis et formule des propositions d\u2019orientation.",
    ],
    composition: [
      "Professeur principal",
      "Enseignants de la classe",
      "Delegues des eleves",
      "Delegues des parents",
      "Conseiller principal d\u2019education",
      "Direction",
    ],
    meetingFrequency: "Le conseil de classe se reunit trois fois par an, a chaque fin de trimestre.",
    presidence: "Preside par la Cheffe d\u2019etablissement ou son representant",
    keyResponsibilities: [
      "Examiner les resultats scolaires individuels et collectifs",
      "Emettre des propositions d\u2019orientation",
      "Formuler un avis sur le passage en classe superieure",
      "Identifier les eleves en difficulte et proposer des solutions",
    ],
  },
  {
    id: "conseil-vie-collegienne",
    originalId: 7,
    title: "Conseil de Vie Collegienne",
    subtitle: "CVCO \u2014 Expression et citoyennete des collegiens",
    iconName: "Megaphone",
    accentColor: "from-primary to-primary-dark",
    description: [
      "Le Conseil de Vie Collegienne (CVCO) favorise l\u2019expression des collegiens et contribue a l\u2019apprentissage de la citoyennete.",
      "Instance de dialogue et d\u2019echange, le CVCO permet aux eleves du college de formuler des propositions sur la vie de l\u2019etablissement et de participer activement aux decisions qui les concernent.",
    ],
    composition: [
      "Eleves elus representant les collegiens",
      "Representants de la direction",
      "Representants des enseignants",
      "Conseiller principal d\u2019education",
    ],
    keyResponsibilities: [
      "Favoriser l\u2019expression des collegiens",
      "Contribuer a l\u2019apprentissage de la citoyennete",
      "Formuler des propositions sur la vie scolaire",
      "Participer a l\u2019amelioration du climat scolaire",
      "Porter les projets et initiatives des eleves",
    ],
  },
  {
    id: "commission-hygiene-securite",
    originalId: 8,
    title: "Commission Hygiene et Securite",
    subtitle: "Prevention des risques et bien-etre collectif",
    iconName: "HeartPulse",
    accentColor: "from-secondary to-secondary-dark",
    description: [
      "La Commission Hygiene et Securite est un groupe de travail charge d\u2019identifier les risques potentiels (incendie, accidents, sante), de verifier le respect des normes de securite, et de proposer des mesures de prevention.",
      "Elle assure le suivi des incidents, l\u2019amelioration des conditions de travail et d\u2019etude, et la sensibilisation de la communaute scolaire aux comportements responsables en matiere de securite et d\u2019hygiene.",
    ],
    composition: [
      "Representants de l\u2019administration",
      "Representants des enseignants",
      "Representants du personnel",
      "Representants des parents",
      "Representants des eleves",
    ],
    meetingFrequency: "La commission se reunit deux fois par an et peut soumettre des recommandations a la direction.",
    keyResponsibilities: [
      "Identifier les risques potentiels (incendie, accidents, sante)",
      "Verifier le respect des normes de securite dans les locaux",
      "Proposer des actions de prevention (exercices d\u2019evacuation, formations)",
      "Assurer le suivi des accidents et incidents",
      "Ameliorer les conditions de travail et d\u2019etude",
      "Sensibiliser la communaute aux comportements responsables",
    ],
  },
  {
    id: "conseil-vie-lyceenne",
    originalId: 9,
    title: "Conseil de Vie Lyceenne",
    subtitle: "CVL \u2014 Participation des lyceens aux decisions",
    iconName: "UserCheck",
    accentColor: "from-primary to-primary-dark",
    description: [
      "Le Conseil de Vie Lyceenne (CVL) est le lieu ou les lyceens sont associes aux decisions de l\u2019etablissement.",
      "Les elus y representent les eleves et participent activement a la reflexion sur les grandes questions de la vie scolaire, contribuant ainsi a une gouvernance plus inclusive et democratique.",
    ],
    composition: [
      "Eleves elus representant les lyceens",
      "Representants de la direction",
      "Representants des enseignants",
      "Representants des parents",
    ],
    keyResponsibilities: [
      "Associer les lyceens aux decisions de l\u2019etablissement",
      "Representer les eleves du lycee",
      "Formuler des propositions sur l\u2019organisation scolaire",
      "Contribuer au bien-etre et a la vie lyceenne",
      "Promouvoir l\u2019engagement citoyen des eleves",
    ],
  },
  {
    id: "cellule-formation",
    originalId: 10,
    title: "Cellule de Formation",
    subtitle: "Pilotage de la formation continue des personnels",
    iconName: "Globe",
    accentColor: "from-secondary to-secondary-dark",
    description: [
      "La Cellule de Formation est un groupe de pilotage et de coordination charge d\u2019identifier les besoins en formation des personnels et de proposer des actions de formation continue en coherence avec le projet d\u2019etablissement.",
      "Elle travaille en lien etroit avec les priorites institutionnelles et les orientations du reseau MLF pour garantir un developpement professionnel de qualite au service des eleves.",
    ],
    composition: [
      "Cheffe d\u2019etablissement",
      "Responsables pedagogiques",
      "Coordinateurs de formation",
      "Representants des equipes pedagogiques",
    ],
    keyResponsibilities: [
      "Identifier les besoins en formation des equipes pedagogiques et educatives",
      "Aligner les besoins avec les priorites institutionnelles et les orientations du reseau",
      "Elaborer le plan de formation annuel ou pluriannuel",
      "Suivre et evaluer les actions de formation mises en oeuvre",
      "Favoriser le partage de competences et de pratiques professionnelles",
    ],
  },
  {
    id: "cesce",
    originalId: 11,
    title: "CESCE",
    subtitle: "Comite d\u2019Education a la Sante, a la Citoyennete et a l\u2019Environnement",
    iconName: "Shield",
    accentColor: "from-primary to-primary-dark",
    description: [
      "Le CESCE est une instance de reflexion, d\u2019observation et de proposition qui concoit, met en oeuvre et evalue un projet educatif en matiere d\u2019education a la citoyennete, a la sante, a l\u2019environnement et au developpement durable.",
      "Integre au projet d\u2019etablissement, le CESCE organise des partenariats en fonction des problematiques educatives a traiter et contribue a la formation globale des citoyens de demain.",
    ],
    composition: [
      "Representants de la direction",
      "Representants des enseignants",
      "Representants des parents",
      "Representants des eleves",
      "Partenaires exterieurs",
    ],
    keyResponsibilities: [
      "Concevoir et mettre en oeuvre des projets educatifs en sante et citoyennete",
      "Evaluer l\u2019efficacite des programmes engages",
      "Organiser des partenariats autour de thematiques educatives specifiques",
      "Integrer les actions au projet d\u2019etablissement",
      "Promouvoir l\u2019education au developpement durable et a l\u2019environnement",
    ],
  },
];

export function getInstanceById(id: string): GovernanceInstance | undefined {
  return instances.find((inst) => inst.id === id);
}

export function getAllInstanceIds(): string[] {
  return instances.map((inst) => inst.id);
}
