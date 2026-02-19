import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { newsSchema } from "@/lib/validations";
import { parseBody, checkOrigin } from "@/lib/api-utils";
import { logAudit } from "@/lib/audit";

export async function GET(req: Request) {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");

    const items = await db.newsItem.findMany({
      where: {
        ...(status && { status: status as any }),
      },
      orderBy: { publishedAt: "desc" },
    });
    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const csrfError = checkOrigin(req);
    if (csrfError) return csrfError;

    const session = await auth();
    if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

    const parsed = await parseBody(req, newsSchema);
    if (parsed instanceof NextResponse) return parsed;

    const item = await db.newsItem.create({
      data: {
        title: parsed.title,
        image: parsed.image ?? null,
        link: parsed.link ?? null,
        category: parsed.category ?? null,
        status: parsed.status,
      },
    });

    await logAudit(session.user!.id!, "CREATE", "newsItem", item.id, { title: item.title });
    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
