import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { checkOrigin } from "@/lib/api-utils";
import { logAudit } from "@/lib/audit";

const MODEL_MAP: Record<string, string> = {
  carousel: "carouselSlide",
  staff: "staffMember",
  links: "quickLink",
  certifications: "certification",
  activities: "activityItem",
  documents: "document",
  "page-sections": "pageSection",
  "menu-items": "menuItem",
  "alumni-photos": "alumniPhoto",
  "governance-instances": "governanceInstance",
};

export async function POST(req: Request) {
  try {
    const csrfError = checkOrigin(req);
    if (csrfError) return csrfError;

    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Non autorise" }, { status: 401 });
    }

    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Corps invalide" }, { status: 400 });
    }

    const { resource, items } = body as {
      resource: string;
      items: { id: string; order: number }[];
    };

    if (!resource || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "Donnees invalides" }, { status: 400 });
    }

    const modelName = MODEL_MAP[resource];
    if (!modelName) {
      return NextResponse.json({ error: "Ressource inconnue" }, { status: 400 });
    }

    // Validate each item has id (string) and order (number)
    for (const item of items) {
      if (typeof item.id !== "string" || typeof item.order !== "number") {
        return NextResponse.json({ error: "Donnees invalides" }, { status: 400 });
      }
    }

    // Update all items in a transaction
    await db.$transaction(
      items.map((item) =>
        (db[modelName as keyof typeof db] as any).update({
          where: { id: item.id },
          data: { order: item.order },
        }),
      ),
    );

    await logAudit(session.user!.id!, "UPDATE", modelName, "batch-reorder", {
      resource,
      count: items.length,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
