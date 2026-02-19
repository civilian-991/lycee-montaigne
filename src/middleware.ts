import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import { canAccess, type Role } from "@/lib/permissions";

export default auth((req) => {
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https://lycee-montaigne.edu.lb https://*.public.blob.vercel-storage.com",
    "font-src 'self' data:",
    "connect-src 'self' https://*.vercel-storage.com",
    "frame-src 'self' https://www.google.com",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join("; ");

  const { pathname } = req.nextUrl;
  const isAuthenticated = !!req.auth;

  // API admin routes: return 401 JSON instead of redirect
  if (pathname.startsWith("/api/admin") && !isAuthenticated) {
    const response = NextResponse.json(
      { error: "Non autorise" },
      { status: 401 }
    );
    response.headers.set("Content-Security-Policy", csp);
    return response;
  }

  // Role-based access control for admin API routes
  if (pathname.startsWith("/api/admin") && isAuthenticated) {
    const role = (req.auth?.user as any)?.role as Role | undefined;
    // Extract resource name from /api/admin/{resource}/...
    const segments = pathname.split("/");
    const resource = segments[3]; // ["", "api", "admin", "resource", ...]
    if (resource && role && !canAccess(role, resource)) {
      const response = NextResponse.json(
        { error: "Acces non autorise" },
        { status: 403 }
      );
      response.headers.set("Content-Security-Policy", csp);
      return response;
    }
  }

  const isAdminRoute = pathname.startsWith("/admin");
  const isLoginPage = pathname === "/admin/login";

  if (isAdminRoute && !isLoginPage && !isAuthenticated) {
    const response = NextResponse.redirect(
      new URL("/admin/login", req.url)
    );
    response.headers.set("Content-Security-Policy", csp);
    return response;
  }

  if (isLoginPage && isAuthenticated) {
    const response = NextResponse.redirect(new URL("/admin", req.url));
    response.headers.set("Content-Security-Policy", csp);
    return response;
  }

  const response = NextResponse.next();
  response.headers.set("Content-Security-Policy", csp);

  return response;
});

export const config = {
  matcher: [
    // Run on all routes except static files and images
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
