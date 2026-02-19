import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { certificationSchema } from "@/lib/validations";
import { parseBody, checkOrigin } from "@/lib/api-utils";
import { logAudit } from "@/lib/audit";

export async function GET() {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

    const items = await db.certification.findMany({ orderBy: { order: "asc" } });
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

    const parsed = await parseBody(req, certificationSchema);
    if (parsed instanceof NextResponse) return parsed;

    const item = await db.certification.create({
      data: {
        name: parsed.name,
        image: parsed.image || null,
        description: parsed.description || null,
        order: parsed.order ?? 0,
      },
    });

    await logAudit(session.user!.id!, "CREATE", "certification", item.id, { name: item.name });
    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
