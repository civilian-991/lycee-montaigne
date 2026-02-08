"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown, ExternalLink, Search, Phone, Mail, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { navigation } from "@/lib/navigation";
import { motion, AnimatePresence } from "framer-motion";

/* ── Social icon SVGs ────────────────────────────────────────── */
const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
);
const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
);
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 100 12.324 6.162 6.162 0 100-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405a1.441 1.441 0 11-2.88 0 1.441 1.441 0 012.88 0z" /></svg>
);

const socialLinks = [
  { href: "https://www.facebook.com/LyceeMontaigneBeitChabab", label: "Facebook", Icon: FacebookIcon },
  { href: "https://www.linkedin.com/school/lyc%C3%A9e-montaigne-beit-chabab/", label: "LinkedIn", Icon: LinkedInIcon },
  { href: "https://www.instagram.com/lyceemontaigne.liban/", label: "Instagram", Icon: InstagramIcon },
];

/* ── Animation variants ──────────────────────────────────────── */
const dropdownContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.03, delayChildren: 0.04 },
  },
  exit: { opacity: 0, transition: { duration: 0.12 } },
};
const dropdownItem = {
  hidden: { opacity: 0, x: -6, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const mobileNavContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04, delayChildren: 0.12 } },
};
const mobileNavItem = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const } },
};

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [navStuck, setNavStuck] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const searchInputRef = useRef<HTMLInputElement>(null);

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

  useEffect(() => {
    if (searchOpen) searchInputRef.current?.focus();
  }, [searchOpen]);

  const isActive = useCallback((href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }, [pathname]);

  const handleDropdownEnter = (label: string) => {
    clearTimeout(timeoutRef.current);
    setOpenDropdown(label);
  };

  const handleDropdownLeave = () => {
    timeoutRef.current = setTimeout(() => setOpenDropdown(null), 150);
  };

  return (
    <>
      {/* ─── Row 1: Top Ribbon ────────────────────────────────── */}
      <div className="hidden bg-gradient-to-r from-primary-dark via-primary to-primary-dark lg:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2">
          {/* Contact info */}
          <div className="flex items-center gap-6 text-[13px] tracking-wide text-white/65">
            <a href="tel:+9614982082" className="group flex items-center gap-2 transition-colors duration-300 hover:text-white">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/8 transition-colors duration-300 group-hover:bg-white/15">
                <Phone className="h-2.5 w-2.5" />
              </span>
              <span>+961 4 982 082</span>
            </a>
            <span className="h-3.5 w-px bg-white/12" />
            <a href="mailto:info@lycee-montaigne.edu.lb" className="group flex items-center gap-2 transition-colors duration-300 hover:text-white">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/8 transition-colors duration-300 group-hover:bg-white/15">
                <Mail className="h-2.5 w-2.5" />
              </span>
              <span>info@lycee-montaigne.edu.lb</span>
            </a>
          </div>

          {/* Social + partner logos */}
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-1">
              {socialLinks.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-7 w-7 items-center justify-center rounded-full text-white/45 transition-all duration-300 hover:bg-white/10 hover:text-white hover:scale-110"
                >
                  <Icon className="h-3 w-3 fill-current" />
                </a>
              ))}
            </div>
            <span className="h-4 w-px bg-white/12" />
            <div className="flex items-center gap-4">
              <Image src="/images/infos/June2025/epI0N3MR04HkiCEJL5RO.png" alt="Reseau mlfmonde" width={80} height={32} className="h-5 w-auto brightness-0 invert opacity-35 transition-opacity duration-300 hover:opacity-70" />
              <Image src="/images/infos/June2025/rHzXQq9eC2AmCsOYzLgz.png" alt="AEFE" width={50} height={32} className="h-5 w-auto brightness-0 invert opacity-35 transition-opacity duration-300 hover:opacity-70" />
              <Image src="/images/infos/June2025/uCw1d3Difxn6BtzjXI90.png" alt="Homologation" width={80} height={32} className="h-5 w-auto brightness-0 invert opacity-35 transition-opacity duration-300 hover:opacity-70" />
            </div>
          </div>
        </div>
      </div>

      {/* Thin ornamental accent strip */}
      <div className="hidden h-[3px] bg-gradient-to-r from-secondary/0 via-secondary to-secondary/0 lg:block" />

      {/* ─── Row 2: Brand Header ──────────────────────────────── */}
      <header className="bg-background">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:py-6">
          {/* Logo + tagline */}
          <Link href="/" className="group flex shrink-0 items-center gap-4">
            <Image
              src="/images/logo.png"
              alt="Lycee Montaigne - Beit Chabab"
              width={240}
              height={92}
              className="h-14 w-auto transition-transform duration-500 group-hover:scale-[1.02] lg:h-[72px]"
              priority
            />
            <div className="hidden flex-col xl:flex">
              <span className="font-[var(--font-heading)] text-[11px] font-medium uppercase tracking-[0.2em] text-text-muted">
                Etablissement homologue AEFE
              </span>
              <span className="font-[var(--font-heading)] text-[11px] tracking-[0.15em] text-text-light">
                Beit Chabab &middot; Liban
              </span>
            </div>
          </Link>

          {/* Right side — search + CTAs */}
          <div className="hidden items-center gap-3.5 lg:flex">
            {/* Search toggle */}
            <div className="relative">
              <AnimatePresence mode="wait">
                {searchOpen ? (
                  <motion.div
                    key="search-input"
                    initial={{ width: 40, opacity: 0.5 }}
                    animate={{ width: 260, opacity: 1 }}
                    exit={{ width: 40, opacity: 0.5 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="flex items-center overflow-hidden rounded-full border border-border bg-background-alt"
                  >
                    <Search className="ml-3.5 h-4 w-4 shrink-0 text-text-muted" />
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder="Rechercher..."
                      className="h-10 w-full bg-transparent px-2.5 text-sm text-text outline-none placeholder:text-text-light"
                      onBlur={() => setSearchOpen(false)}
                    />
                  </motion.div>
                ) : (
                  <motion.button
                    key="search-btn"
                    initial={{ opacity: 0.5 }}
                    animate={{ opacity: 1 }}
                    onClick={() => setSearchOpen(true)}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-transparent text-text-muted transition-all duration-300 hover:border-border hover:bg-background-alt hover:text-primary"
                    aria-label="Rechercher"
                  >
                    <Search className="h-[18px] w-[18px]" />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            <span className="h-6 w-px bg-border" />

            {/* CTA buttons */}
            <a
              href="https://2050048n.index-education.net/pronote/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-1.5 rounded-full border-2 border-primary/15 px-5 py-2 text-sm font-semibold text-primary transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-primary hover:text-white hover:shadow-[0_4px_16px_-2px_rgba(2,53,91,0.25)]"
            >
              Pronote
              <ExternalLink className="h-3 w-3 opacity-30 transition-all duration-300 group-hover:opacity-80 group-hover:translate-x-0.5" />
            </a>
            <Link
              href="/contact"
              className="rounded-full border-2 border-primary/15 px-5 py-2 text-sm font-semibold text-primary transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-primary hover:text-white hover:shadow-[0_4px_16px_-2px_rgba(2,53,91,0.25)]"
            >
              Contactez-nous
            </Link>
            <Link
              href="/anciens"
              className="rounded-full bg-secondary px-5 py-2 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-secondary-light hover:shadow-[0_4px_16px_-2px_rgba(51,153,51,0.3)]"
            >
              Anciens eleves
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border/60 text-text transition-all duration-300 hover:border-border hover:bg-background-alt hover:text-primary lg:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Ouvrir le menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* Sentinel for sticky detection */}
      <div ref={sentinelRef} className="h-0" />

      {/* ─── Row 3: Sticky Navigation Bar ─────────────────────── */}
      <nav
        className={cn(
          "sticky top-0 z-50 transition-all duration-500",
          navStuck
            ? "border-b border-border/50 bg-background/95 shadow-[0_4px_24px_-4px_rgba(28,25,23,0.08)] backdrop-blur-2xl"
            : "border-b border-border/30 bg-background-alt/80 backdrop-blur-sm"
        )}
        aria-label="Navigation principale"
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex h-[52px] items-center">
            {/* Compact logo — appears when stuck */}
            <div className={cn(
              "shrink-0 overflow-hidden transition-all duration-600 ease-[cubic-bezier(0.22,1,0.36,1)]",
              navStuck ? "mr-6 w-[120px] opacity-100" : "mr-0 w-0 opacity-0"
            )}>
              <Link href="/" className="block">
                <Image src="/images/logo.png" alt="Lycee Montaigne" width={120} height={46} className="h-8 w-auto" />
              </Link>
            </div>

            {/* Desktop nav links */}
            <div className="hidden flex-1 items-center justify-center lg:flex">
              <div className="flex items-center gap-0.5">
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
                        "relative flex items-center gap-1 rounded-xl px-3 py-2 text-[13.5px] font-semibold tracking-[0.01em] transition-all duration-250",
                        isActive(item.href)
                          ? "text-primary"
                          : "text-text/65 hover:bg-primary/[0.03] hover:text-primary"
                      )}
                    >
                      {item.label}
                      {item.children && (
                        <ChevronDown className={cn(
                          "h-3 w-3 transition-transform duration-300",
                          openDropdown === item.label ? "rotate-180" : ""
                        )} />
                      )}
                      {/* Active indicator — organic wave shape */}
                      {isActive(item.href) && (
                        <motion.div
                          layoutId="nav-indicator"
                          className="absolute -bottom-[11px] left-2 right-2"
                          transition={{ type: "spring", stiffness: 380, damping: 28 }}
                        >
                          <svg viewBox="0 0 100 6" preserveAspectRatio="none" className="h-[3px] w-full">
                            <path d="M0 3 Q25 0 50 3 Q75 6 100 3" fill="none" stroke="var(--color-secondary)" strokeWidth="3" strokeLinecap="round" />
                          </svg>
                        </motion.div>
                      )}
                    </Link>

                    {/* Dropdown menu */}
                    <AnimatePresence>
                      {item.children && openDropdown === item.label && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.98 }}
                          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                          className="absolute left-1/2 top-full z-50 min-w-72 -translate-x-1/2 pt-4"
                          onMouseEnter={() => handleDropdownEnter(item.label)}
                          onMouseLeave={handleDropdownLeave}
                        >
                          <div className="overflow-hidden rounded-2xl border border-border/80 bg-background shadow-[0_12px_40px_-8px_rgba(28,25,23,0.12)]">
                            {/* Decorative gradient accent */}
                            <div className="h-[2.5px] bg-gradient-to-r from-primary via-secondary to-accent" />

                            {/* Dropdown header */}
                            <div className="border-b border-border/40 bg-background-alt/50 px-4 py-2.5">
                              <Link
                                href={item.href}
                                className="group flex items-center justify-between"
                                onClick={() => setOpenDropdown(null)}
                              >
                                <span className="font-[var(--font-heading)] text-xs font-bold uppercase tracking-[0.15em] text-primary/70">
                                  {item.label}
                                </span>
                                <ArrowRight className="h-3 w-3 text-text-light transition-all duration-300 group-hover:translate-x-1 group-hover:text-primary" />
                              </Link>
                            </div>

                            <motion.div
                              className="p-1.5"
                              variants={dropdownContainer}
                              initial="hidden"
                              animate="visible"
                              exit="exit"
                            >
                              {item.children.map((child) => (
                                <motion.div key={child.href} variants={dropdownItem}>
                                  <Link
                                    href={child.href}
                                    onClick={() => setOpenDropdown(null)}
                                    className="group flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-[13px] text-text/70 transition-all duration-200 hover:bg-background-alt hover:text-primary"
                                  >
                                    <span className="flex h-1.5 w-1.5 shrink-0 rounded-full bg-border-dark transition-all duration-300 group-hover:bg-secondary group-hover:scale-125" />
                                    <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                                      {child.label}
                                    </span>
                                  </Link>
                                </motion.div>
                              ))}
                            </motion.div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>

            {/* Compact CTAs — appear when stuck */}
            <div className={cn(
              "hidden shrink-0 items-center gap-2.5 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:flex",
              navStuck ? "w-auto opacity-100" : "pointer-events-none w-0 overflow-hidden opacity-0"
            )}>
              <a
                href="https://2050048n.index-education.net/pronote/"
                target="_blank"
                rel="noopener noreferrer"
                className="whitespace-nowrap rounded-full border border-primary/20 px-4 py-1.5 text-xs font-semibold text-primary transition-all duration-250 hover:-translate-y-0.5 hover:border-primary hover:bg-primary hover:text-white hover:shadow-[0_3px_12px_-2px_rgba(2,53,91,0.2)]"
              >
                Pronote
              </a>
              <Link
                href="/contact"
                className="whitespace-nowrap rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-white transition-all duration-250 hover:-translate-y-0.5 hover:bg-primary-light hover:shadow-[0_3px_12px_-2px_rgba(2,53,91,0.25)]"
              >
                Contact
              </Link>
            </div>

            {/* Mobile hamburger (in sticky bar) */}
            <button
              className="ml-auto flex h-9 w-9 items-center justify-center rounded-xl text-text-muted transition-all duration-300 hover:bg-background-dark hover:text-primary lg:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Ouvrir le menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </nav>

      {/* ─── Mobile Menu Overlay ──────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-50 bg-primary/20 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* ─── Mobile Menu Panel ────────────────────────────────── */}
      <motion.div
        className="fixed inset-y-0 right-0 z-50 w-[340px] max-w-[90vw] bg-background shadow-[var(--shadow-elevated)] lg:hidden"
        initial={false}
        animate={{ x: mobileOpen ? 0 : "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border/60 px-5 py-4">
          <Link href="/" onClick={() => setMobileOpen(false)}>
            <Image src="/images/logo.png" alt="Lycee Montaigne" width={130} height={50} className="h-10 w-auto" />
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            className="flex h-10 w-10 items-center justify-center rounded-2xl border border-border/60 text-text-muted transition-all duration-300 hover:border-border hover:bg-background-alt hover:text-primary"
            aria-label="Fermer le menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="overflow-y-auto" style={{ maxHeight: "calc(100dvh - 73px)" }}>
          {/* Search */}
          <div className="px-5 pt-5">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-light" />
              <input
                type="text"
                placeholder="Rechercher..."
                className="h-11 w-full rounded-2xl border border-border bg-background-alt pl-10 pr-4 text-sm text-text outline-none transition-all duration-300 placeholder:text-text-light focus:border-secondary/50 focus:ring-2 focus:ring-secondary/10"
              />
            </div>
          </div>

          {/* Navigation */}
          <motion.nav
            className="px-5 py-4"
            variants={mobileNavContainer}
            initial="hidden"
            animate={mobileOpen ? "visible" : "hidden"}
          >
            {navigation.map((item) => (
              <motion.div key={item.label} variants={mobileNavItem} className="border-b border-border/25 last:border-0">
                {item.children ? (
                  <details className="group">
                    <summary className={cn(
                      "flex cursor-pointer list-none items-center justify-between py-3.5 text-[15px] font-semibold transition-colors duration-300",
                      isActive(item.href) ? "text-primary" : "text-text"
                    )}>
                      <span>{item.label}</span>
                      <ChevronDown className="h-4 w-4 text-text-light transition-transform duration-400 group-open:rotate-180" />
                    </summary>
                    <div className="mb-4 ml-1 space-y-0.5 border-l-2 border-secondary/20 pl-4">
                      <Link
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-secondary transition-all duration-200 hover:bg-secondary/5"
                      >
                        <ArrowRight className="h-3 w-3" />
                        Voir tout
                      </Link>
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setMobileOpen(false)}
                          className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-text-muted transition-all duration-200 hover:bg-background-alt hover:text-primary"
                        >
                          <span className="h-1 w-1 rounded-full bg-border-dark" />
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </details>
                ) : (
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "block py-3.5 text-[15px] font-semibold transition-colors duration-300",
                      isActive(item.href) ? "text-primary" : "text-text"
                    )}
                  >
                    {item.label}
                  </Link>
                )}
              </motion.div>
            ))}
          </motion.nav>

          {/* CTAs */}
          <div className="space-y-2.5 border-t border-border/30 px-5 pt-5">
            <a
              href="https://2050048n.index-education.net/pronote/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-2xl border-2 border-primary/15 py-3 text-sm font-semibold text-primary transition-all duration-300 hover:border-primary/40 hover:bg-primary hover:text-white"
            >
              Pronote <ExternalLink className="h-3.5 w-3.5 opacity-40" />
            </a>
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="block rounded-2xl border-2 border-primary/15 py-3 text-center text-sm font-semibold text-primary transition-all duration-300 hover:border-primary/40 hover:bg-primary hover:text-white"
            >
              Contactez-nous
            </Link>
            <Link
              href="/anciens"
              onClick={() => setMobileOpen(false)}
              className="block rounded-2xl bg-secondary py-3 text-center text-sm font-semibold text-white transition-all duration-300 hover:bg-secondary-light"
            >
              Anciens eleves
            </Link>
          </div>

          {/* Social + Partner logos */}
          <div className="px-5 pb-8 pt-6">
            <div className="flex items-center justify-center gap-3">
              {socialLinks.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-2xl border border-primary/10 bg-primary/[0.04] text-primary transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:bg-primary hover:text-white"
                >
                  <Icon className="h-4 w-4 fill-current" />
                </a>
              ))}
            </div>
            <div className="mt-5 flex items-center justify-center gap-5 border-t border-border/25 pt-5">
              <Image src="/images/infos/June2025/epI0N3MR04HkiCEJL5RO.png" alt="Reseau mlfmonde" width={60} height={24} className="h-6 w-auto opacity-30" />
              <Image src="/images/infos/June2025/rHzXQq9eC2AmCsOYzLgz.png" alt="AEFE" width={40} height={24} className="h-6 w-auto opacity-30" />
              <Image src="/images/infos/June2025/uCw1d3Difxn6BtzjXI90.png" alt="Homologation" width={60} height={24} className="h-6 w-auto opacity-30" />
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
