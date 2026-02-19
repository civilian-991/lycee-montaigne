import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { pageSchema } from "@/lib/validations";
import { parseBody, checkOrigin } from "@/lib/api-utils";

export async function GET(req: Request) {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");

    const pages = await db.page.findMany({
      where: {
        ...(status && { status: status as any }),
      },
      orderBy: { updatedAt: "desc" },
      include: { _count: { select: { sections: true } } },
    });

    return NextResponse.json(pages);
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

    const parsed = await parseBody(req, pageSchema);
    if (parsed instanceof NextResponse) return parsed;

    const page = await db.page.create({
      data: {
        slug: parsed.slug,
        title: parsed.title,
        metaDescription: parsed.metaDescription || null,
        ogImage: parsed.ogImage || null,
        status: parsed.status,
      },
    });

    return NextResponse.json(page, { status: 201 });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return NextResponse.json({ error: "Une page avec ce slug existe deja" }, { status: 409 });
    }
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
