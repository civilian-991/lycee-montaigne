import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { activitySchema } from "@/lib/validations";
import { parseBody, checkOrigin } from "@/lib/api-utils";
import { logAudit } from "@/lib/audit";

export async function GET() {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

    const items = await db.activityItem.findMany({
      orderBy: [{ category: "asc" }, { order: "asc" }],
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

    const parsed = await parseBody(req, activitySchema);
    if (parsed instanceof NextResponse) return parsed;

    const item = await db.activityItem.create({
      data: {
        title: parsed.title,
        description: parsed.description || null,
        image: parsed.image || null,
        category: parsed.category,
        order: parsed.order ?? 0,
      },
    });

    await logAudit(session.user!.id!, "CREATE", "activityItem", item.id, { title: item.title });
    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
