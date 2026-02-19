export type Role = "SUPER_ADMIN" | "ADMIN" | "EDITOR";

// Resources that EDITOR can access (content only)
const EDITOR_RESOURCES = [
  "news",
  "documents",
  "announcements",
  "pages",
  "alumni-events",
  "activities",
  "certifications",
  "governance-instances",
];

// Resources that ADMIN can access (everything except user management)
const ADMIN_RESOURCES = [
  ...EDITOR_RESOURCES,
  "carousel",
  "links",
  "staff",
  "contact-submissions",
  "menu-items",
  "media",
  "settings",
];

export function canAccess(role: Role, resource: string): boolean {
  if (role === "SUPER_ADMIN") return true;
  if (role === "ADMIN") return ADMIN_RESOURCES.includes(resource);
  if (role === "EDITOR") return EDITOR_RESOURCES.includes(resource);
  return false;
}

export function canManageUsers(role: Role): boolean {
  return role === "SUPER_ADMIN";
}

export function canAccessSettings(role: Role): boolean {
  return role === "SUPER_ADMIN" || role === "ADMIN";
}
