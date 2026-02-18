import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { pageSectionSchema } from "@/lib/validations";
import { parseBody, checkOrigin } from "@/lib/api-utils";
import { cleanHtmlNullable } from "@/lib/sanitize";

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const csrfError = checkOrigin(req);
    if (csrfError) return csrfError;

    const session = await auth();
    if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

    const { id } = await params;
    const parsed = await parseBody(req, pageSectionSchema);
    if (parsed instanceof NextResponse) return parsed;

    const section = await db.pageSection.create({
      data: {
        pageId: id,
        sectionKey: parsed.sectionKey,
        title: parsed.title || null,
        contentHtml: cleanHtmlNullable(parsed.contentHtml),
        image: parsed.image || null,
        order: parsed.order ?? 0,
      },
    });

    return NextResponse.json(section, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
