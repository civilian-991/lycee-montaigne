import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { menuItemSchema } from "@/lib/validations";
import { parseBody, checkOrigin } from "@/lib/api-utils";

export async function GET() {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

    const items = await db.menuItem.findMany({
      where: { parentId: null },
      include: { children: { orderBy: { order: "asc" } } },
      orderBy: { order: "asc" },
    });
    return NextResponse.json(items);
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const csrfError = checkOrigin(req);
    if (csrfError) return csrfError;

    const session = await auth();
    if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

    const parsed = await parseBody(req, menuItemSchema);
    if (parsed instanceof NextResponse) return parsed;

    // Validate max 2 levels of nesting
    if (parsed.parentId) {
      const parent = await db.menuItem.findUnique({
        where: { id: parsed.parentId },
        select: { parentId: true },
      });
      if (!parent) {
        return NextResponse.json({ error: "Element parent introuvable" }, { status: 400 });
      }
      if (parent.parentId) {
        return NextResponse.json(
          { error: "Imbrication limitée à 2 niveaux. L'élément parent est déjà un sous-menu." },
          { status: 400 }
        );
      }
    }

    const item = await db.menuItem.create({
      data: {
        label: parsed.label,
        url: parsed.url ?? null,
        parentId: parsed.parentId ?? null,
        order: parsed.order ?? 0,
        pageId: parsed.pageId ?? null,
      },
    });

    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
