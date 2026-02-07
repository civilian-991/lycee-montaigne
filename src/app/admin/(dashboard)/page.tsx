import { db } from "@/lib/db";
import { Newspaper, Mail, FileText, Users } from "lucide-react";

async function getStats() {
  try {
    const [newsCount, messagesCount, documentsCount, unreadCount] = await Promise.all([
      db.newsItem.count(),
      db.contactSubmission.count(),
      db.document.count(),
      db.contactSubmission.count({ where: { read: false } }),
    ]);
    return { newsCount, messagesCount, documentsCount, unreadCount };
  } catch {
    return { newsCount: 0, messagesCount: 0, documentsCount: 0, unreadCount: 0 };
  }
}

export default async function AdminDashboardPage() {
  const stats = await getStats();

  const cards = [
    { label: "Actualités", value: stats.newsCount, icon: Newspaper, color: "bg-blue-500" },
    { label: "Messages", value: stats.messagesCount, icon: Mail, color: "bg-green-500", extra: stats.unreadCount > 0 ? `${stats.unreadCount} non lu(s)` : undefined },
    { label: "Documents", value: stats.documentsCount, icon: FileText, color: "bg-purple-500" },
    { label: "Total contenus", value: stats.newsCount + stats.documentsCount, icon: Users, color: "bg-orange-500" },
  ];

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-text">Tableau de bord</h1>
        <p className="mt-1 text-sm text-text-muted">Vue d&apos;ensemble de votre site</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="rounded-xl border border-border bg-white p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-muted">{card.label}</p>
                  <p className="mt-1 text-2xl font-bold text-text">{card.value}</p>
                  {card.extra && <p className="mt-1 text-xs text-secondary">{card.extra}</p>}
                </div>
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg text-white ${card.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 rounded-xl border border-border bg-white p-6">
        <h2 className="text-lg font-semibold text-text">Bienvenue</h2>
        <p className="mt-2 text-sm text-text-muted">
          Utilisez le menu latéral pour gérer le contenu de votre site. Vous pouvez ajouter des actualités,
          gérer les documents, consulter les messages de contact et modifier les paramètres du site.
        </p>
      </div>
    </>
  );
}
