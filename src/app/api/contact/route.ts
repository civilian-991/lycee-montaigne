import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validate
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json({ error: "Nom invalide" }, { status: 400 });
    }
    if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Email invalide" }, { status: 400 });
    }
    if (!message || typeof message !== "string" || message.trim().length < 10) {
      return NextResponse.json({ error: "Message trop court" }, { status: 400 });
    }

    // Save to database
    try {
      await db.contactSubmission.create({
        data: {
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
        },
      });
    } catch {
      // DB might not be connected yet, log to console as fallback
      console.log("Contact form submission:", { name, email, message });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
