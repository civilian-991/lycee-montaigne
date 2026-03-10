import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

/**
 * Fix direction staff titles to match old site format:
 * "Mot de la cheffe d'établissement", "Mot de la proviseure déléguée", "Mot de la directrice du primaire"
 *
 * Run with: npx tsx prisma/fix-staff-titles.ts
 */
async function main() {
  const directionStaff = await db.staffMember.findMany({
    where: { section: "direction" },
    orderBy: { order: "asc" },
  });

  console.log("Current direction staff titles:");
  for (const s of directionStaff) {
    console.log(`  [${s.order}] ${s.name} — "${s.title}"`);
  }

  // Title mapping: match by current title (case-insensitive partial match)
  const titleFixes: { match: string; newTitle: string }[] = [
    { match: "cheffe", newTitle: "Mot de la cheffe d'établissement" },
    { match: "proviseure", newTitle: "Mot de la proviseure déléguée" },
    { match: "directrice du primaire", newTitle: "Mot de la directrice du primaire" },
    { match: "directrice primaire", newTitle: "Mot de la directrice du primaire" },
  ];

  for (const s of directionStaff) {
    const lower = s.title.toLowerCase();
    // Skip if already starts with "Mot"
    if (lower.startsWith("mot")) {
      console.log(`  Skipping "${s.title}" (already correct)`);
      continue;
    }

    const fix = titleFixes.find((f) => lower.includes(f.match.toLowerCase()));
    if (fix) {
      await db.staffMember.update({
        where: { id: s.id },
        data: { title: fix.newTitle },
      });
      console.log(`  Updated "${s.title}" → "${fix.newTitle}"`);
    } else {
      console.log(`  No fix found for "${s.title}"`);
    }
  }

  console.log("\nDone!");
}

main()
  .catch(console.error)
  .finally(() => db.$disconnect());
