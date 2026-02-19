import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { alumniPhotoSchema } from "@/lib/validations";
import { parseBody, checkOrigin } from "@/lib/api-utils";
import { logAudit } from "@/lib/audit";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const csrfError = checkOrigin(req);
    if (csrfError) return csrfError;

    const session = await auth();
    if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

    const { id } = await params;
    const parsed = await parseBody(req, alumniPhotoSchema);
    if (parsed instanceof NextResponse) return parsed;

    const photo = await db.alumniPhoto.create({
      data: {
        eventId: id,
        imageUrl: parsed.imageUrl,
        altText: parsed.altText || "",
        order: parsed.order ?? 0,
      },
    });

    await logAudit(session.user!.id!, "CREATE", "alumniPhoto", photo.id, { eventId: id });
    return NextResponse.json(photo, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
