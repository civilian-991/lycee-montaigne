"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  Newspaper,
  FileText,
  Image,
  Link2,
  Users,
  Settings,
  Mail,
  LogOut,
  Menu,
  X,
  Megaphone,
  BookOpen,
  GraduationCap,
  Activity,
  Award,
  FolderOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const navSections = [
  {
    items: [
      { label: "Tableau de bord", href: "/admin", icon: LayoutDashboard },
    ],
  },
  {
    title: "Contenu",
    items: [
      { label: "Actualités", href: "/admin/news", icon: Newspaper },
      { label: "Documents", href: "/admin/documents", icon: FileText },
      { label: "Annonces", href: "/admin/announcements", icon: Megaphone },
      { label: "Pages", href: "/admin/pages", icon: BookOpen },
      { label: "Anciens", href: "/admin/alumni-events", icon: GraduationCap },
      { label: "Activités", href: "/admin/activities", icon: Activity },
      { label: "Certifications", href: "/admin/certifications", icon: Award },
    ],
  },
  {
    title: "Gestion",
    items: [
      { label: "Carousel", href: "/admin/carousel", icon: Image },
      { label: "Liens rapides", href: "/admin/links", icon: Link2 },
      { label: "Équipe", href: "/admin/staff", icon: Users },
      { label: "Messages", href: "/admin/contact-submissions", icon: Mail },
      { label: "Médias", href: "/admin/media", icon: FolderOpen },
      { label: "Paramètres", href: "/admin/settings", icon: Settings },
    ],
  },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Escape key handler for mobile sidebar
  useEffect(() => {
    if (!open) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  const nav = (
    <>
      <div className="flex h-16 items-center gap-3 border-b border-border px-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-sm font-bold text-white">
          LM
        </div>
        <div>
          <p className="text-sm font-bold text-text">Admin Panel</p>
          <p className="text-xs text-text-muted">Lycée Montaigne</p>
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto p-3">
        {navSections.map((section, sIdx) => (
          <div key={sIdx}>
            {section.title && (
              <p className="mb-1 mt-4 px-3 text-xs font-semibold uppercase tracking-wider text-text-muted/60">
                {section.title}
              </p>
            )}
            <ul className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon;
                const active =
                  pathname === item.href ||
                  (item.href !== "/admin" && pathname.startsWith(item.href));
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                        active
                          ? "bg-primary/10 font-medium text-primary"
                          : "text-text-muted hover:bg-background-alt hover:text-text"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
      <div className="border-t border-border p-3">
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-text-muted transition-colors hover:bg-red-50 hover:text-red-600"
        >
          <LogOut className="h-4 w-4" />
          Déconnexion
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile trigger */}
      <button
        onClick={() => setOpen(true)}
        className="fixed left-4 top-4 z-40 rounded-lg bg-white p-2 shadow-md lg:hidden"
        aria-label="Ouvrir le menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Mobile overlay */}
      {open && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setOpen(false)} />
      )}

      {/* Mobile sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-white shadow-xl transition-transform lg:hidden",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <button
          onClick={() => setOpen(false)}
          className="absolute right-3 top-4 rounded-lg p-1 hover:bg-background-alt"
          aria-label="Fermer le menu"
        >
          <X className="h-5 w-5" />
        </button>
        {nav}
      </aside>

      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 border-r border-border bg-white lg:flex lg:flex-col">
        {nav}
      </aside>
    </>
  );
}
