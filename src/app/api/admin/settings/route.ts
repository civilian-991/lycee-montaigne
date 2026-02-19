import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { settingsSchema } from "@/lib/validations";
import { parseBody, checkOrigin } from "@/lib/api-utils";
import { logAudit } from "@/lib/audit";
import { canAccess, type Role } from "@/lib/permissions";

export async function PUT(req: Request) {
  try {
    const csrfError = checkOrigin(req);
    if (csrfError) return csrfError;

    const session = await auth();
    if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

    const userRole = session.user?.role as Role;
    if (!canAccess(userRole, "settings")) {
      return NextResponse.json({ error: "Accès non autorisé" }, { status: 403 });
    }

    const parsed = await parseBody(req, settingsSchema);
    if (parsed instanceof NextResponse) return parsed;

    const entries = Object.entries(parsed) as [string, string][];

    await db.$transaction(
      entries.map(([key, value]) =>
        db.siteSetting.upsert({
          where: { key },
          update: { value },
          create: { key, value },
        })
      )
    );

    await logAudit(session.user!.id!, "UPDATE", "siteSetting", "bulk", { keys: entries.map(([k]) => k) });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
