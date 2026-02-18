import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { staffSchema } from "@/lib/validations";
import { parseBody, checkOrigin } from "@/lib/api-utils";
import { cleanHtmlNullable } from "@/lib/sanitize";

export async function GET() {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

    const staff = await db.staffMember.findMany({
      orderBy: [{ section: "asc" }, { order: "asc" }],
    });

    return NextResponse.json(staff);
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

    const parsed = await parseBody(req, staffSchema);
    if (parsed instanceof NextResponse) return parsed;

    const member = await db.staffMember.create({
      data: {
        name: parsed.name,
        title: parsed.title,
        photo: parsed.photo ?? null,
        messageHtml: cleanHtmlNullable(parsed.messageHtml),
        section: parsed.section,
      },
    });

    return NextResponse.json(member, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
