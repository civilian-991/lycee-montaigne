import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { governanceInstanceSchema } from "@/lib/validations";
import { parseBody, checkOrigin } from "@/lib/api-utils";
import { cleanHtml } from "@/lib/sanitize";
import { logAudit } from "@/lib/audit";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

    const { id } = await params;
    const item = await db.governanceInstance.findUnique({ where: { id } });
    if (!item) return NextResponse.json({ error: "Non trouvé" }, { status: 404 });
    return NextResponse.json(item);
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const csrfError = checkOrigin(req);
    if (csrfError) return csrfError;

    const session = await auth();
    if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

    const { id } = await params;
    const parsed = await parseBody(req, governanceInstanceSchema);
    if (parsed instanceof NextResponse) return parsed;

    const item = await db.governanceInstance.update({
      where: { id },
      data: {
        slug: parsed.slug,
        title: parsed.title,
        subtitle: parsed.subtitle,
        iconName: parsed.iconName,
        accentColor: parsed.accentColor,
        descriptionHtml: cleanHtml(parsed.descriptionHtml),
        compositionHtml: cleanHtml(parsed.compositionHtml),
        membersJson: parsed.membersJson ?? null,
        meetingFrequency: parsed.meetingFrequency ?? null,
        presidence: parsed.presidence ?? null,
        responsibilitiesHtml: cleanHtml(parsed.responsibilitiesHtml),
        order: parsed.order,
      },
    });

    await logAudit(session.user!.id!, "UPDATE", "governanceInstance", item.id, { title: item.title });
    return NextResponse.json(item);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
      return NextResponse.json({ error: "Ressource introuvable" }, { status: 404 });
    }
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const csrfError = checkOrigin(_req);
    if (csrfError) return csrfError;

    const session = await auth();
    if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

    const { id } = await params;
    const existing = await db.governanceInstance.findUnique({ where: { id } });
    if (!existing) return NextResponse.json({ error: "Instance introuvable" }, { status: 404 });

    await db.governanceInstance.delete({ where: { id } });
    await logAudit(session.user!.id!, "DELETE", "governanceInstance", id, { title: existing.title });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
