import { db } from "@/lib/db";

export async function logAudit(
  userId: string,
  action: "CREATE" | "UPDATE" | "DELETE",
  resource: string,
  resourceId: string,
  details?: Record<string, unknown>,
) {
  try {
    await db.auditLog.create({
      data: {
        userId,
        action,
        resource,
        resourceId,
        details: details ? JSON.stringify(details) : null,
      },
    });
  } catch {
    // Audit logging is best-effort — never break operations
  }
}
