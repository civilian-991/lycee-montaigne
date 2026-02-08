import { Navbar } from "@/components/public/navbar";
import { Footer } from "@/components/public/footer";
import { AnnouncementBanner } from "@/components/public/announcement-banner";
import { db } from "@/lib/db";
import type { NavItem } from "@/lib/navigation";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let announcement = null;
  let navigationItems: NavItem[] = [];
  try {
    const now = new Date();
    const [ann, menuItems] = await Promise.all([
      db.announcement.findFirst({
        where: {
          active: true,
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
    announcement = ann;
    navigationItems = menuItems.map((item) => ({
      label: item.label,
      href: item.url || "#",
      ...(item.children.length > 0 && {
        children: item.children.map((child) => ({
          label: child.label,
          href: child.url || "#",
        })),
      }),
    }));
  } catch {}

  return (
    <>
      {announcement && (
        <AnnouncementBanner
          title={announcement.title}
          content={announcement.contentHtml}
        />
      )}
      <Navbar navigationItems={navigationItems} />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
