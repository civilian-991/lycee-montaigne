import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

function fixAccents(str: string | null): string | null {
  if (!str) return str;
  return str
    .replace(/Lycee Montaigne/g, "Lycée Montaigne")
    .replace(/Lycee /g, "Lycée ")
    .replace(/\bLycee\b/g, "Lycée")
    .replace(/etablissement/g, "établissement")
    .replace(/Etablissement/g, "Établissement")
    .replace(/eleves/g, "élèves")
    .replace(/Eleves/g, "Élèves")
    .replace(/ a la /g, " à la ")
    .replace(/ a l'/g, " à l'")
    .replace(/\becole\b/g, "école")
    .replace(/\bEcole\b/g, "École")
    .replace(/pedagogique/g, "pédagogique")
    .replace(/Pedagogique/g, "Pédagogique")
    .replace(/periscolaire/g, "périscolaire")
    .replace(/Periscolaire/g, "Périscolaire")
    .replace(/\bActivites\b/g, "Activités")
    .replace(/\bactivites\b/g, "activités")
    .replace(/variees/g, "variées")
    .replace(/\bapres\b/g, "après")
    .replace(/\bApres\b/g, "Après")
    .replace(/\bSejours\b/g, "Séjours")
    .replace(/\bsejours\b/g, "séjours")
    .replace(/\bsejour\b/g, "séjour")
    .replace(/competitions/g, "compétitions")
    .replace(/inter-etablissements/g, "inter-établissements")
    .replace(/opportunites/g, "opportunités")
    .replace(/\bProcedure\b/g, "Procédure")
    .replace(/\bprocedure\b/g, "procédure")
    .replace(/\bPieces\b/g, "Pièces")
    .replace(/identite\b/g, "identité")
    .replace(/etrangeres/g, "étrangères")
    .replace(/\becheant\b/g, "échéant")
    .replace(/desormais/g, "désormais")
    .replace(/\bannee\b/g, "année")
    .replace(/reinscriptions/g, "réinscriptions")
    .replace(/\bdelegue\b/g, "délégué")
    .replace(/\bdeleguee\b/g, "déléguée")
    .replace(/\bDeléguée\b/g, "Déléguée")
    .replace(/\bequipe\b/g, "équipe")
    .replace(/\bEquipe\b/g, "Équipe")
    .replace(/\bgenerale\b/g, "générale")
    .replace(/\bGeneral\b/g, "Général")
    .replace(/\bscolaire\b/g, "scolaire")
    .replace(/\bacademique\b/g, "académique")
    .replace(/\bAcademique\b/g, "Académique")
    .replace(/superieur/g, "supérieur")
    .replace(/\betudes\b/g, "études")
    .replace(/\bEtudes\b/g, "Études");
}

async function main() {
  console.log("Fixing accents in database content...\n");

  // Fix announcements
  const announcements = await db.announcement.findMany();
  for (const a of announcements) {
    const fixedTitle = fixAccents(a.title) ?? a.title;
    const fixedHtml = fixAccents(a.contentHtml) ?? a.contentHtml;
    if (fixedTitle !== a.title || fixedHtml !== a.contentHtml) {
      await db.announcement.update({
        where: { id: a.id },
        data: { title: fixedTitle, contentHtml: fixedHtml },
      });
      console.log("  Fixed announcement:", a.title);
    }
  }

  // Fix staff members
  const staff = await db.staffMember.findMany();
  for (const s of staff) {
    const fixedTitle = fixAccents(s.title) ?? s.title;
    const fixedMsg = fixAccents(s.messageHtml);
    if (fixedTitle !== s.title || fixedMsg !== s.messageHtml) {
      await db.staffMember.update({
        where: { id: s.id },
        data: { title: fixedTitle, messageHtml: fixedMsg },
      });
      console.log("  Fixed staff:", s.name, "/", s.title);
    }
  }

  // Fix page sections
  const sections = await db.pageSection.findMany();
  for (const sec of sections) {
    const fixedTitle = fixAccents(sec.title);
    const fixedHtml = fixAccents(sec.contentHtml);
    if (fixedTitle !== sec.title || fixedHtml !== sec.contentHtml) {
      await db.pageSection.update({
        where: { id: sec.id },
        data: { title: fixedTitle, contentHtml: fixedHtml },
      });
      console.log("  Fixed section:", sec.sectionKey);
    }
  }

  // Fix activity items
  const activities = await db.activityItem.findMany();
  for (const act of activities) {
    const fixedTitle = fixAccents(act.title) ?? act.title;
    const fixedDesc = fixAccents(act.description);
    if (fixedTitle !== act.title || fixedDesc !== act.description) {
      await db.activityItem.update({
        where: { id: act.id },
        data: { title: fixedTitle, description: fixedDesc },
      });
      console.log("  Fixed activity:", act.title);
    }
  }

  console.log("\nDone! All accents fixed in database.");
}

main()
  .catch(console.error)
  .finally(() => db.$disconnect());
