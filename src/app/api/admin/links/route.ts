import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { quickLinkSchema } from "@/lib/validations";
import { parseBody, checkOrigin } from "@/lib/api-utils";
import { canAccess, type Role } from "@/lib/permissions";

export async function GET() {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

    const userRole = session.user?.role as Role;
    if (!canAccess(userRole, "links")) {
      return NextResponse.json({ error: "Accès non autorisé" }, { status: 403 });
    }

    const links = await db.quickLink.findMany({ orderBy: { order: "asc" } });
    return NextResponse.json(links);
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

    const userRole = session.user?.role as Role;
    if (!canAccess(userRole, "links")) {
      return NextResponse.json({ error: "Accès non autorisé" }, { status: 403 });
    }

    const parsed = await parseBody(req, quickLinkSchema);
    if (parsed instanceof NextResponse) return parsed;

    const link = await db.quickLink.create({
      data: {
        label: parsed.label,
        url: parsed.url,
        target: parsed.target || "_self",
        order: parsed.order ?? 0,
      },
    });

    return NextResponse.json(link, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
