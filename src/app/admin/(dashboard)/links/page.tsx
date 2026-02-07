import { db } from "@/lib/db";
import { LinksManager } from "./links-manager";

export default async function AdminLinksPage() {
  let links: { id: string; label: string; url: string; target: string; order: number }[] = [];
  try {
    links = await db.quickLink.findMany({ orderBy: { order: "asc" } });
  } catch {
    // DB not connected
  }

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text">Liens rapides</h1>
        <p className="mt-1 text-sm text-text-muted">Gérez les liens utiles affichés sur la page d&apos;accueil</p>
      </div>
      <LinksManager initialLinks={links} />
    </>
  );
}
