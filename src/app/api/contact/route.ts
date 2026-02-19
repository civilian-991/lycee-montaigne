import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { contactFormSchema } from "@/lib/validations";
import { parseBody } from "@/lib/api-utils";
import { contactLimiter, checkRateLimit } from "@/lib/rate-limit";

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

  const rl = await checkRateLimit(contactLimiter, `contact:${ip}`);
  if (!rl.allowed) {
    const retryAfter = rl.retryAfterMs ? Math.ceil(rl.retryAfterMs / 1000) : 60;
    return NextResponse.json(
      { error: "Trop de requêtes. Veuillez réessayer plus tard." },
      { status: 429, headers: { "Retry-After": String(retryAfter) } },
    );
  }

  try {
    const data = await parseBody(request, contactFormSchema);
    if (data instanceof NextResponse) return data;

    await db.contactSubmission.create({
      data: {
        name: data.name.trim(),
        email: data.email.trim(),
        subject: data.subject?.trim() ?? null,
        message: data.message.trim(),
      },
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
