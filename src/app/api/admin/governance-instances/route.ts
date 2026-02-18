import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { governanceInstanceSchema } from "@/lib/validations";
import { parseBody, checkOrigin } from "@/lib/api-utils";
import { cleanHtml } from "@/lib/sanitize";

export async function GET() {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

    const items = await db.governanceInstance.findMany({
      orderBy: { order: "asc" },
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

    const parsed = await parseBody(req, governanceInstanceSchema);
    if (parsed instanceof NextResponse) return parsed;

    const item = await db.governanceInstance.create({
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

    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return NextResponse.json({ error: "Une instance avec ce slug existe deja" }, { status: 409 });
    }
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
