import { Navbar } from "@/components/public/navbar";
import { Footer } from "@/components/public/footer";
import { AnnouncementBanner } from "@/components/public/announcement-banner";
import { db } from "@/lib/db";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let announcement = null;
  try {
    const now = new Date();
    announcement = await db.announcement.findFirst({
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
    });
  } catch {}

  return (
    <>
      {announcement && (
        <AnnouncementBanner
          title={announcement.title}
          content={announcement.contentHtml}
        />
      )}
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
