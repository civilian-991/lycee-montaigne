import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { canAccess, type Role } from "@/lib/permissions";

export async function GET() {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

    const userRole = session.user?.role as Role;
    if (!canAccess(userRole, "contact-submissions")) {
      return NextResponse.json({ error: "Accès non autorisé" }, { status: 403 });
    }

    const submissions = await db.contactSubmission.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(submissions);
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
