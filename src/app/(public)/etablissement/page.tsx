import { db } from "@/lib/db";
import { EtablissementContent } from "./etablissement-content";

export default async function EtablissementPage() {
  const staff = await db.staffMember.findMany({ orderBy: { order: "asc" } });
  return <EtablissementContent staff={staff} />;
}
