import { Navbar } from "@/components/public/navbar";
import { Footer } from "@/components/public/footer";
import { AnnouncementBanner } from "@/components/public/announcement-banner";
import { db } from "@/lib/db";
import { cleanHtml } from "@/lib/sanitize";
import { getSettings } from "@/lib/settings";
import type { NavItem } from "@/lib/navigation";

export const revalidate = 60;

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let announcement = null;
  let navigationItems: NavItem[] = [];

  /* Fetch settings (has its own fallback) in parallel with other DB queries */
  const now = new Date();
  const [settings, dbResult] = await Promise.all([
    getSettings(),
    (async () => {
      try {
        const [ann, menuItems] = await Promise.all([
          db.announcement.findFirst({
            where: {
              active: true,
              status: "PUBLISHED",
              OR: [
                { startDate: null, endDate: null },
                { startDate: { lte: now }, endDate: null },
                { startDate: null, endDate: { gte: now } },
                { startDate: { lte: now }, endDate: { gte: now } },
              ],
            },
            orderBy: { createdAt: "desc" },
          }),
          db.menuItem.findMany({
            where: { parentId: null },
            include: { children: { orderBy: { order: "asc" } } },
            orderBy: { order: "asc" },
          }),
        ]);
        return { ann, menuItems };
      } catch {
        return null;
      }
    })(),
  ]);

  if (dbResult) {
    announcement = dbResult.ann;
    navigationItems = dbResult.menuItems.map((item) => ({
      label: item.label,
      href: item.url || "#",
      ...(item.children.length > 0 && {
        children: item.children.map((child) => ({
          label: child.label,
          href: child.url || "#",
        })),
      }),
    }));
  }

  /* Build serializable props for the client-side Navbar */
  const navbarSocialLinks = [
    settings.facebook && { href: settings.facebook, label: "Facebook" },
    settings.linkedin && { href: settings.linkedin, label: "LinkedIn" },
    settings.instagram && { href: settings.instagram, label: "Instagram" },
  ].filter(Boolean) as { href: string; label: string }[];

  const navbarPartnerLogos = settings.partner_logos.map(({ src, alt }) => ({ src, alt }));

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:bg-[#02355b] focus:text-white focus:px-4 focus:py-2"
      >
        Aller au contenu principal
      </a>
      {announcement && (
        <AnnouncementBanner
          title={announcement.title}
          content={cleanHtml(announcement.contentHtml)}
        />
      )}
      <Navbar
        navigationItems={navigationItems}
        socialLinks={navbarSocialLinks}
        pronoteUrl={settings.pronote_url}
        partnerLogos={navbarPartnerLogos}
        contactPhone={settings.phone}
        contactEmail={settings.email}
      />
      <main id="main-content" className="min-h-screen">{children}</main>
      <Footer
        settings={{
          address: settings.address,
          phone: settings.phone,
          email: settings.email,
          fax: settings.fax,
          facebook: settings.facebook,
          instagram: settings.instagram,
          linkedin: settings.linkedin,
          pronote_url: settings.pronote_url,
          google_maps_url: settings.google_maps_url,
          partner_logos: settings.partner_logos,
          footer_nav_links: settings.footer_nav_links,
          footer_useful_links: settings.footer_useful_links,
        }}
      />
    </>
  );
}
