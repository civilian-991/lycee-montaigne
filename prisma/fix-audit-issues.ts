import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function main() {
  console.log("Fixing audit issues...\n");

  // ── 1. Fix phone number format (full number per segment) ──────────────
  await db.siteSetting.upsert({
    where: { key: "phone" },
    update: { value: "+961 4 982 082 / +961 4 983 845 / +961 4 985 256" },
    create: { key: "phone", value: "+961 4 982 082 / +961 4 983 845 / +961 4 985 256" },
  });
  console.log("✓ Phone numbers fixed (full prefix per number)");

  // ── 2. Fix trait_union_link (/documents was 404) ──────────────────────
  await db.siteSetting.upsert({
    where: { key: "trait_union_link" },
    update: { value: "https://lycee-montaigne.edu.lb/storage/hp-services-items/January2026/ypxca3h4YSBTMQbvSzQb.pdf" },
    create: { key: "trait_union_link", value: "https://lycee-montaigne.edu.lb/storage/hp-services-items/January2026/ypxca3h4YSBTMQbvSzQb.pdf" },
  });
  console.log("✓ Trait d'union link fixed (direct PDF URL)");

  // ── 3. Add E-SIDOC to footer useful links ─────────────────────────────
  const usefulLinksSetting = await db.siteSetting.findUnique({ where: { key: "footer_useful_links" } });
  let usefulLinks: { label: string; href: string }[] = [];
  if (usefulLinksSetting) {
    try { usefulLinks = JSON.parse(usefulLinksSetting.value); } catch { /* keep empty */ }
  }
  const hasEsidoc = usefulLinks.some((l) => l.href.includes("esidoc"));
  if (!hasEsidoc) {
    usefulLinks.push({ label: "E-SIDOC", href: "https://2050048n.esidoc.fr/" });
    await db.siteSetting.upsert({
      where: { key: "footer_useful_links" },
      update: { value: JSON.stringify(usefulLinks) },
      create: { key: "footer_useful_links", value: JSON.stringify(usefulLinks) },
    });
    console.log("✓ E-SIDOC added to footer useful links");
  } else {
    console.log("– E-SIDOC already in footer useful links");
  }

  // ── 4. Update cantine menu to March 2026 ─────────────────────────────
  const cantineDoc = await db.document.findFirst({
    where: { category: "restauration", title: { contains: "Cantine", mode: "insensitive" } },
  });
  if (cantineDoc) {
    await db.document.update({
      where: { id: cantineDoc.id },
      data: { fileUrl: "https://lycee-montaigne.edu.lb/storage/restauration-files/March2026/7PL4KyEJpf8CASXVAv2w.pdf" },
    });
    console.log("✓ Cantine menu updated to March 2026");
  } else {
    console.log("– No cantine document in DB; fallback URL updated in code");
  }

  // ── 5. Add Instagram links to orientation activities ──────────────────
  const activityLinks: Record<string, string> = {
    "Forum des universités": "https://www.instagram.com/reel/DRILQ6ZiM3G/?igsh=MW45ejFoMnRhMG9tcQ==",
    "Admissions Post-Bac": "https://www.instagram.com/p/DLpIC1KMiKP/?igsh=djZ4dTdtb2t1dzcy",
    "Forum des métiers": "https://www.instagram.com/reel/DHlgrXSsy6f/?igsh=cjlzdHZpNGJvMnN3",
  };

  const orientationActivities = await db.activityItem.findMany({
    where: { category: "orientation" },
  });

  for (const act of orientationActivities) {
    for (const [titleMatch, link] of Object.entries(activityLinks)) {
      if (act.title.toLowerCase().includes(titleMatch.toLowerCase())) {
        // Check if it's the Nov 2025 or Dec 2024 forum (match by description date)
        let finalLink = link;
        if (titleMatch === "Forum des universités" && act.description?.includes("2024")) {
          finalLink = "https://www.instagram.com/reel/DEm-YDRsVV3/?igsh=dXY0dzQ1YTQzbG4x";
        }
        await db.activityItem.update({
          where: { id: act.id },
          data: { link: finalLink },
        });
        console.log(`✓ Link added to: "${act.title}"`);
        break;
      }
    }
  }

  console.log("\nDone!");
}

main()
  .catch(console.error)
  .finally(() => db.$disconnect());
