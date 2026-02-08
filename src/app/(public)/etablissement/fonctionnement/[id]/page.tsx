import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { instances, getInstanceById } from "./data";
import { FonctionnementContent } from "./content";

/* ── Static Params ─────────────────────────────────────── */

export function generateStaticParams() {
  return instances.map((inst) => ({ id: inst.id }));
}

/* ── Dynamic Metadata ──────────────────────────────────── */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
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
  const instance = getInstanceById(id);

  if (!instance) {
    notFound();
  }

  return <FonctionnementContent instanceId={id} />;
}
