import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { documentSchema } from "@/lib/validations";
import { parseBody, checkOrigin } from "@/lib/api-utils";
import { logAudit } from "@/lib/audit";

export async function GET() {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

    const docs = await db.document.findMany({ orderBy: [{ category: "asc" }, { order: "asc" }] });
    return NextResponse.json(docs);
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

    const parsed = await parseBody(req, documentSchema);
    if (parsed instanceof NextResponse) return parsed;

    const doc = await db.document.create({
      data: {
        title: parsed.title,
        fileUrl: parsed.fileUrl,
        category: parsed.category,
        academicYear: parsed.academicYear ?? null,
      },
    });

    await logAudit(session.user!.id!, "CREATE", "document", doc.id, { title: doc.title });
    return NextResponse.json(doc, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
