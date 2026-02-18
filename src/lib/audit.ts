import { db } from "@/lib/db";

export async function logAudit(params: {
  userId: string;
  action: "create" | "update" | "delete";
  resource: string;
  resourceId: string;
  details?: Record<string, unknown>;
}) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (db as any).auditLog.create({
      data: {
        ...params,
        details: params.details ? JSON.stringify(params.details) : null,
      },
    });
  } catch {
    // Audit logging is best-effort — never break operations
  }
}
