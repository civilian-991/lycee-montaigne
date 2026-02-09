import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { instances, getInstanceById } from "./data";
import { db } from "@/lib/db";
import { cleanHtml } from "@/lib/sanitize";
import { FonctionnementContent } from "./content";

/* ── Static Params ─────────────────────────────────────── */

export async function generateStaticParams() {
  // Start with hardcoded instance IDs
  const hardcodedParams = instances.map((inst) => ({ id: inst.id }));

  // Also include DB slugs (if DB is reachable)
  try {
    const dbInstances = await db.governanceInstance.findMany({
      select: { slug: true },
    });
    const dbParams = dbInstances.map((inst) => ({ id: inst.slug }));
    // Merge, avoiding duplicates
    const allIds = new Set(hardcodedParams.map((p) => p.id));
    for (const p of dbParams) {
      if (!allIds.has(p.id)) {
        hardcodedParams.push(p);
        allIds.add(p.id);
      }
    }
  } catch {
    // DB not available at build time — rely on hardcoded data
  }

  return hardcodedParams;
}

/* ── Dynamic Metadata ──────────────────────────────────── */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  // Try DB first
  try {
    const dbInstance = await db.governanceInstance.findUnique({
      where: { slug: id },
      select: { title: true, subtitle: true },
    });
    if (dbInstance) {
      return {
        title: dbInstance.title,
        description: dbInstance.subtitle,
      };
    }
  } catch {
    // DB not available
  }

  // Fallback to hardcoded
  const instance = getInstanceById(id);
  if (!instance) return {};
  return {
    title: instance.title,
    description: instance.subtitle,
  };
}

/* ── Page ──────────────────────────────────────────────── */

export default async function FonctionnementPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Try DB first
  let dbInstance = null;
  try {
    dbInstance = await db.governanceInstance.findUnique({
      where: { slug: id },
    });
  } catch {
    // DB not available
  }

  if (dbInstance) {
    // Sanitize HTML fields before passing to the client component
    const sanitizedData = {
      ...dbInstance,
      descriptionHtml: cleanHtml(dbInstance.descriptionHtml),
      compositionHtml: cleanHtml(dbInstance.compositionHtml),
      responsibilitiesHtml: cleanHtml(dbInstance.responsibilitiesHtml),
    };
    return <FonctionnementContent instanceId={id} dbData={sanitizedData} />;
  }

  // Fallback to hardcoded data
  const instance = getInstanceById(id);
  if (!instance) {
    notFound();
  }

  return <FonctionnementContent instanceId={id} />;
}
