import { db } from "@/lib/db";
import { MenuItemsManager } from "./menu-items-manager";

export default async function AdminMenuItemsPage() {
  let menuItems: {
    id: string;
    label: string;
    url: string | null;
    parentId: string | null;
    order: number;
    children: { id: string; label: string; url: string | null; parentId: string | null; order: number }[];
  }[] = [];

  try {
    menuItems = await db.menuItem.findMany({
      where: { parentId: null },
      include: { children: { orderBy: { order: "asc" } } },
      orderBy: { order: "asc" },
    });
  } catch {
    // DB not connected
  }

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text">Navigation</h1>
        <p className="mt-1 text-sm text-text-muted">
          Gérez les éléments du menu de navigation du site
        </p>
      </div>
      <MenuItemsManager initialItems={menuItems} />
    </>
  );
}
