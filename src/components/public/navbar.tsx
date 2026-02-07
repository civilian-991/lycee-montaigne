"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown, ExternalLink, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { navigation } from "@/lib/navigation";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [navStuck, setNavStuck] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      ([entry]) => setNavStuck(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const handleDropdownEnter = (label: string) => {
    clearTimeout(timeoutRef.current);
    setOpenDropdown(label);
  };

  const handleDropdownLeave = () => {
    timeoutRef.current = setTimeout(() => setOpenDropdown(null), 150);
  };

  return (
    <>
      <header className="bg-background">
        {/* Row 1 — Brand bar */}
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <Link href="/" className="flex shrink-0 items-center">
            <Image
              src="/images/logo.png"
              alt="Lycee Montaigne - Beit Chabab"
              width={220}
              height={84}
              className="h-14 w-auto"
              priority
            />
          </Link>
          <div className="hidden items-center gap-5 lg:flex">
            <Image src="/images/infos/June2025/epI0N3MR04HkiCEJL5RO.png" alt="Reseau mlfmonde" width={120} height={48} className="h-10 w-auto opacity-80" />
            <Image src="/images/infos/June2025/rHzXQq9eC2AmCsOYzLgz.png" alt="AEFE" width={80} height={48} className="h-10 w-auto opacity-80" />
            <Image src="/images/infos/June2025/uCw1d3Difxn6BtzjXI90.png" alt="Homologation" width={120} height={48} className="h-10 w-auto opacity-80" />
          </div>
        </div>

        {/* Row 2 — Actions bar */}
        <div className="border-t border-border/60">
          <div className="mx-auto flex max-w-7xl items-center justify-center gap-4 px-4 py-2 lg:justify-between">
            {/* Search */}
            <div className="relative hidden lg:block">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
              <input
                type="text"
                placeholder="Rechercher..."
                className="h-9 w-52 rounded-full border border-border bg-background-alt pl-9 pr-4 text-sm text-text outline-none transition-all duration-300 focus:w-64 focus:border-primary focus:ring-2 focus:ring-primary/10"
              />
            </div>

            {/* Social icons */}
            <div className="hidden items-center gap-2 md:flex">
              <a href="https://www.facebook.com/LyceeMontaigneBeitChabab" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary hover:text-white">
                <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
              </a>
              <a href="https://www.linkedin.com/school/lyc%C3%A9e-montaigne-beit-chabab/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary hover:text-white">
                <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
              </a>
              <a href="https://www.instagram.com/lyceemontaignebeitchabab/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary hover:text-white">
                <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 100 12.324 6.162 6.162 0 100-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405a1.441 1.441 0 11-2.88 0 1.441 1.441 0 012.88 0z" /></svg>
              </a>
            </div>

            {/* CTA buttons */}
            <div className="hidden items-center gap-2 lg:flex">
              <a href="https://2050048n.index-education.net/pronote/" target="_blank" rel="noopener noreferrer" className="rounded-full border-2 border-primary px-5 py-1.5 text-sm font-semibold text-primary transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary hover:text-white hover:shadow-[var(--shadow-warm)]">
                Pronote
              </a>
              <Link href="/contact" className="rounded-full border-2 border-primary px-5 py-1.5 text-sm font-semibold text-primary transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary hover:text-white hover:shadow-[var(--shadow-warm)]">
                Contactez-nous
              </Link>
              <Link href="/anciens" className="rounded-full bg-primary px-5 py-1.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-light hover:shadow-[var(--shadow-warm)]">
                Anciens eleves
              </Link>
            </div>

            {/* Mobile hamburger */}
            <div className="flex items-center gap-2 lg:hidden">
              <button className="rounded-xl p-2 text-text-muted transition-colors hover:bg-background-alt hover:text-primary" onClick={() => setMobileOpen(true)} aria-label="Ouvrir le menu">
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Sentinel */}
      <div ref={sentinelRef} className="h-0" />

      {/* Row 3 — Sticky navigation */}
      <motion.nav
        className={cn(
          "sticky top-0 z-50 bg-background/95 backdrop-blur-md transition-shadow duration-300",
          navStuck ? "shadow-[var(--shadow-warm)]" : ""
        )}
        aria-label="Navigation principale"
      >
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex h-12 items-center justify-between">
            {/* Compact logo — appears when stuck */}
            <Link href="/" className={cn(
              "shrink-0 transition-all duration-300",
              navStuck ? "mr-4 w-auto opacity-100" : "mr-0 w-0 overflow-hidden opacity-0"
            )}>
              <Image src="/images/logo.png" alt="Lycee Montaigne" width={140} height={54} className="h-9 w-auto" />
            </Link>

            {/* Desktop nav links */}
            <div className="hidden w-full items-center justify-between lg:flex">
              {navigation.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => handleDropdownEnter(item.label)}
                  onMouseLeave={handleDropdownLeave}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "block rounded-full px-3 py-1.5 text-center text-sm font-medium transition-all duration-200",
                      isActive(item.href)
                        ? "bg-primary text-white shadow-[var(--shadow-soft)]"
                        : "text-text hover:bg-primary/5 hover:text-primary"
                    )}
                  >
                    {item.label}
                  </Link>

                  {/* Dropdown */}
                  <AnimatePresence>
                    {item.children && openDropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="absolute left-1/2 top-full z-50 min-w-60 -translate-x-1/2 pt-2"
                        onMouseEnter={() => handleDropdownEnter(item.label)}
                        onMouseLeave={handleDropdownLeave}
                      >
                        <div className="overflow-hidden rounded-2xl border border-border bg-background p-1.5 shadow-[var(--shadow-elevated)]">
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="block rounded-xl px-4 py-2 text-sm text-text-muted transition-colors duration-150 hover:bg-primary/5 hover:text-primary"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Compact CTAs — appear when stuck */}
            <div className={cn(
              "hidden shrink-0 items-center gap-2 transition-all duration-300 lg:flex",
              navStuck ? "ml-2 w-auto opacity-100" : "pointer-events-none w-0 overflow-hidden opacity-0"
            )}>
              <a href="https://2050048n.index-education.net/pronote/" target="_blank" rel="noopener noreferrer" className="whitespace-nowrap rounded-full border border-primary px-3 py-1 text-xs font-semibold text-primary transition-all duration-200 hover:bg-primary hover:text-white">
                Pronote
              </a>
              <Link href="/contact" className="whitespace-nowrap rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white transition-all duration-200 hover:bg-primary-light">
                Contact
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button className="rounded-xl p-2 text-text-muted transition-colors hover:bg-background-alt hover:text-primary lg:hidden" onClick={() => setMobileOpen(true)} aria-label="Ouvrir le menu">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
        {/* Bottom accent line */}
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </motion.nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile menu panel */}
      <motion.div
        className="fixed inset-y-0 right-0 z-50 w-80 max-w-[85vw] bg-background shadow-[var(--shadow-elevated)] lg:hidden"
        initial={false}
        animate={{ x: mobileOpen ? 0 : "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
      >
        <div className="flex items-center justify-between border-b border-border p-4">
          <Image src="/images/logo.png" alt="Lycee Montaigne" width={140} height={54} className="h-9 w-auto" />
          <button onClick={() => setMobileOpen(false)} className="rounded-xl p-2 transition-colors hover:bg-background-alt" aria-label="Fermer le menu">
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="overflow-y-auto p-4" style={{ maxHeight: "calc(100vh - 65px)" }}>
          {/* Mobile search */}
          <div className="relative mb-5">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
            <input type="text" placeholder="Rechercher..." className="h-10 w-full rounded-2xl border border-border bg-background-alt pl-9 pr-4 text-sm text-text outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/10" />
          </div>

          {navigation.map((item) => (
            <div key={item.label} className="border-b border-border/40 last:border-0">
              {item.children ? (
                <details className="group">
                  <summary className={cn(
                    "flex cursor-pointer list-none items-center justify-between py-3 text-sm font-medium transition-colors",
                    isActive(item.href) ? "text-primary" : "text-text"
                  )}>
                    {item.label}
                    <ChevronDown className="h-4 w-4 text-text-muted transition-transform duration-200 group-open:rotate-180" />
                  </summary>
                  <div className="mb-3 ml-3 space-y-0.5">
                    <Link href={item.href} onClick={() => setMobileOpen(false)} className="block rounded-xl px-3 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/5">
                      Voir tout
                    </Link>
                    {item.children.map((child) => (
                      <Link key={child.href} href={child.href} onClick={() => setMobileOpen(false)} className="block rounded-xl px-3 py-2 text-sm text-text-muted transition-colors hover:bg-primary/5 hover:text-primary">
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </details>
              ) : (
                <Link href={item.href} onClick={() => setMobileOpen(false)} className={cn(
                  "block py-3 text-sm font-medium transition-colors",
                  isActive(item.href) ? "text-primary" : "text-text"
                )}>
                  {item.label}
                </Link>
              )}
            </div>
          ))}

          {/* Mobile CTA buttons */}
          <div className="mt-5 space-y-2.5">
            <a href="https://2050048n.index-education.net/pronote/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-2xl border-2 border-primary px-4 py-2.5 text-sm font-semibold text-primary transition-all hover:bg-primary hover:text-white">
              Pronote <ExternalLink className="h-3.5 w-3.5" />
            </a>
            <Link href="/contact" onClick={() => setMobileOpen(false)} className="block rounded-2xl border-2 border-primary px-4 py-2.5 text-center text-sm font-semibold text-primary transition-all hover:bg-primary hover:text-white">
              Contactez-nous
            </Link>
            <Link href="/anciens" onClick={() => setMobileOpen(false)} className="block rounded-2xl bg-primary px-4 py-2.5 text-center text-sm font-semibold text-white transition-all hover:bg-primary-light">
              Anciens eleves
            </Link>
          </div>

          {/* Mobile social */}
          <div className="mt-5 flex items-center justify-center gap-3 border-t border-border/40 pt-5">
            <a href="https://www.facebook.com/LyceeMontaigneBeitChabab" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary transition-all hover:-translate-y-0.5 hover:bg-primary hover:text-white">
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
            </a>
            <a href="https://www.linkedin.com/school/lyc%C3%A9e-montaigne-beit-chabab/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary transition-all hover:-translate-y-0.5 hover:bg-primary hover:text-white">
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
            </a>
            <a href="https://www.instagram.com/lyceemontaignebeitchabab/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary transition-all hover:-translate-y-0.5 hover:bg-primary hover:text-white">
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 100 12.324 6.162 6.162 0 100-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405a1.441 1.441 0 11-2.88 0 1.441 1.441 0 012.88 0z" /></svg>
            </a>
          </div>
          <div className="mt-4 flex items-center justify-center gap-4 border-t border-border/40 pt-4">
            <Image src="/images/infos/June2025/epI0N3MR04HkiCEJL5RO.png" alt="Reseau mlfmonde" width={60} height={30} className="h-7 w-auto opacity-60" />
            <Image src="/images/infos/June2025/rHzXQq9eC2AmCsOYzLgz.png" alt="AEFE" width={50} height={30} className="h-7 w-auto opacity-60" />
            <Image src="/images/infos/June2025/uCw1d3Difxn6BtzjXI90.png" alt="Homologation" width={60} height={30} className="h-7 w-auto opacity-60" />
          </div>
        </nav>
      </motion.div>
    </>
  );
}
