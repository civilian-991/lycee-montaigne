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
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const navItems = [
  { label: "Tableau de bord", href: "/admin", icon: LayoutDashboard },
  { label: "Actualités", href: "/admin/news", icon: Newspaper },
  { label: "Documents", href: "/admin/documents", icon: FileText },
  { label: "Carousel", href: "/admin/carousel", icon: Image },
  { label: "Liens rapides", href: "/admin/links", icon: Link2 },
  { label: "Équipe", href: "/admin/staff", icon: Users },
  { label: "Messages", href: "/admin/contact-submissions", icon: Mail },
  { label: "Paramètres", href: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

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
        <ul className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
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
