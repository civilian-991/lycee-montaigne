import { db } from "@/lib/db";
import Link from "next/link";
import {
  Newspaper,
  Mail,
  FileText,
  Users,
  Image,
  Link2,
  Plus,
  MessageSquare,
} from "lucide-react";

async function getStats() {
  try {
    const [
      newsCount,
      messagesCount,
      documentsCount,
      staffCount,
      slidesCount,
      linksCount,
      unreadCount,
    ] = await Promise.all([
      db.newsItem.count(),
      db.contactSubmission.count(),
      db.document.count(),
      db.staffMember.count(),
      db.carouselSlide.count(),
      db.quickLink.count(),
      db.contactSubmission.count({ where: { read: false } }),
    ]);
    return {
      newsCount,
      messagesCount,
      documentsCount,
      staffCount,
      slidesCount,
      linksCount,
      unreadCount,
      totalContent: newsCount + documentsCount + staffCount,
    };
  } catch {
    return {
      newsCount: 0,
      messagesCount: 0,
      documentsCount: 0,
      staffCount: 0,
      slidesCount: 0,
      linksCount: 0,
      unreadCount: 0,
      totalContent: 0,
    };
  }
}

async function getRecentActivity() {
  try {
    const [recentNews, unreadMessages] = await Promise.all([
      db.newsItem.findMany({
        orderBy: { publishedAt: "desc" },
        take: 5,
        select: { id: true, title: true, category: true, publishedAt: true },
      }),
      db.contactSubmission.findMany({
        where: { read: false },
        orderBy: { createdAt: "desc" },
        take: 3,
        select: { id: true, name: true, email: true, message: true, createdAt: true },
      }),
    ]);
    return { recentNews, unreadMessages };
  } catch {
    return { recentNews: [], unreadMessages: [] };
  }
}

export default async function AdminDashboardPage() {
  const stats = await getStats();
  const { recentNews, unreadMessages } = await getRecentActivity();

  const cards = [
    {
      label: "Actualités",
      value: stats.newsCount,
      icon: Newspaper,
      color: "bg-blue-500",
      href: "/admin/news",
    },
    {
      label: "Messages",
      value: stats.messagesCount,
      icon: Mail,
      color: "bg-green-500",
      href: "/admin/contact-submissions",
      extra: stats.unreadCount > 0 ? `${stats.unreadCount} non lu(s)` : undefined,
    },
    {
      label: "Documents",
      value: stats.documentsCount,
      icon: FileText,
      color: "bg-purple-500",
      href: "/admin/documents",
    },
    {
      label: "Équipe",
      value: stats.staffCount,
      icon: Users,
      color: "bg-pink-500",
      href: "/admin/staff",
    },
    {
      label: "Slides",
      value: stats.slidesCount,
      icon: Image,
      color: "bg-amber-500",
      href: "/admin/carousel",
    },
    {
      label: "Liens rapides",
      value: stats.linksCount,
      icon: Link2,
      color: "bg-cyan-500",
      href: "/admin/links",
    },
    {
      label: "Non lus",
      value: stats.unreadCount,
      icon: MessageSquare,
      color: "bg-red-500",
      href: "/admin/contact-submissions",
    },
    {
      label: "Total contenus",
      value: stats.totalContent,
      icon: FileText,
      color: "bg-orange-500",
      href: "#",
    },
  ];

  const quickActions = [
    {
      label: "Nouvelle actualité",
      href: "/admin/news/new",
      icon: Newspaper,
    },
    {
      label: "Nouveau document",
      href: "/admin/documents/new",
      icon: FileText,
    },
    {
      label: "Nouveau membre",
      href: "/admin/staff/new",
      icon: Users,
    },
  ];

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-text">Tableau de bord</h1>
        <p className="mt-1 text-sm text-text-muted">Vue d&apos;ensemble de votre site</p>
      </div>

      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.label}
              href={card.href}
              className="rounded-xl border border-border bg-white p-5 transition-shadow hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-muted">{card.label}</p>
                  <p className="mt-1 text-2xl font-bold text-text">{card.value}</p>
                  {card.extra && (
                    <p className="mt-1 text-xs text-secondary">{card.extra}</p>
                  )}
                </div>
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-lg text-white ${card.color}`}
                >
                  <Icon className="h-5 w-5" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Actions rapides */}
      <div className="mt-8 rounded-xl border border-border bg-white p-6">
        <h2 className="text-lg font-semibold text-text">Actions rapides</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.label}
                href={action.href}
                className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white hover:bg-primary-light"
              >
                <Plus className="h-4 w-4" />
                {action.label}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Activité récente */}
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {/* Dernières actualités */}
        <div className="rounded-xl border border-border bg-white p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-text">Dernières actualités</h2>
            <Link
              href="/admin/news"
              className="text-sm font-medium text-primary hover:text-primary-light"
            >
              Voir tout
            </Link>
          </div>
          {recentNews.length === 0 ? (
            <p className="mt-4 text-sm text-text-muted">Aucune actualité.</p>
          ) : (
            <ul className="mt-4 divide-y divide-border">
              {recentNews.map((item) => (
                <li key={item.id} className="py-3 first:pt-0 last:pb-0">
                  <Link
                    href={`/admin/news/${item.id}`}
                    className="group block"
                  >
                    <p className="text-sm font-medium text-text group-hover:text-primary">
                      {item.title}
                    </p>
                    <div className="mt-0.5 flex items-center gap-2 text-xs text-text-muted">
                      {item.category && (
                        <span className="rounded bg-background-alt px-1.5 py-0.5">
                          {item.category}
                        </span>
                      )}
                      <span>
                        {new Intl.DateTimeFormat("fr-FR").format(item.publishedAt)}
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Messages non lus */}
        <div className="rounded-xl border border-border bg-white p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-text">Messages non lus</h2>
            <Link
              href="/admin/contact-submissions"
              className="text-sm font-medium text-primary hover:text-primary-light"
            >
              Voir tout
            </Link>
          </div>
          {unreadMessages.length === 0 ? (
            <p className="mt-4 text-sm text-text-muted">Aucun message non lu.</p>
          ) : (
            <ul className="mt-4 divide-y divide-border">
              {unreadMessages.map((msg) => (
                <li key={msg.id} className="py-3 first:pt-0 last:pb-0">
                  <Link
                    href="/admin/contact-submissions"
                    className="group block"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-text group-hover:text-primary">
                        {msg.name}
                      </p>
                      <span className="text-xs text-text-muted">
                        {new Intl.DateTimeFormat("fr-FR").format(msg.createdAt)}
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs text-text-muted">{msg.email}</p>
                    <p className="mt-1 line-clamp-2 text-sm text-text-muted">
                      {msg.message}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
