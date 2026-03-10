# Audit Fix Plan — Lycee Montaigne

> Generated: 2026-02-19 | Total Issues: 77 (2 Critical, 8 High, 32 Medium, 35 Low)
> Strategy: 6 parallel teams, 4 phases, dependency-ordered execution

---

## Phase 1: Critical & Security Hardening
**Priority:** Immediate — deploy blockers and security vulnerabilities
**Teams:** Team Alpha (Security) + Team Bravo (Backend Hardening)

### Team Alpha — Security Fixes
> Scope: Credentials, CSRF, XSS vectors, CSP

#### A1. [CRITICAL] Rotate Database Credentials
- **File:** `.env` (local only — not committed)
- Rotate Neon DB password via Neon dashboard
- Update Vercel env vars with new credentials
- Ensure local `.env` uses separate dev/staging credentials, NOT production
- Verify `.env` is in `.gitignore` (already is)

#### A2. [CRITICAL] Harden AUTH_SECRET Validation
- **File:** `src/lib/env.ts` (29 lines)
- Move the AUTH_SECRET production check to run at module-load time (top-level)
- Ensure `env.ts` is imported in `src/app/layout.tsx` so it runs on every cold start
- Consider adding build-time check in `next.config.ts` as defense-in-depth

#### A3. [HIGH] Fix CSRF Origin Check Bypass
- **File:** `src/lib/api-utils.ts:40-41`
- Change `if (origin && host)` to deny requests where Origin is missing on mutation methods
- Allow GET/HEAD/OPTIONS without Origin (safe methods)
- Add explicit check: if method is POST/PUT/DELETE/PATCH and no Origin header, return 403

#### A4. [HIGH] Remove `style` from HTML Sanitizer
- **File:** `src/lib/sanitize.ts:32`
- Remove `"style"` from the global `"*": ["class", "id", "style"]` attribute list
- If rich text editor needs inline styles, add a CSS property allowlist using sanitize-html's `allowedStyles` option
- Also remove `"id"` to prevent DOM clobbering (Low finding L5)

#### A5. [HIGH] Fix SVG Upload Security
- **File:** `src/app/api/upload/route.ts:49-52`
- Option A (recommended): Remove `"image/svg+xml"` from `ALLOWED_TYPES`
- Option B: Add SVG sanitization with DOMPurify (adds dependency complexity)
- If SVGs are needed, serve them with `Content-Disposition: attachment`

#### A6. [HIGH] Implement Nonce-Based CSP
- **File:** `next.config.ts:40`
- Replace `'unsafe-inline' 'unsafe-eval'` with nonce-based CSP
- Next.js 16 supports CSP nonces — add `generateNonces: true` to config
- Test thoroughly as this may break some inline scripts

#### A7. [MEDIUM] Strengthen Seed Password
- **File:** `prisma/seed.ts:38`
- Replace `process.env.ADMIN_PASSWORD || "admin123"` with:
  ```ts
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw) throw new Error("ADMIN_PASSWORD env var required for seeding");
  ```

#### A8. [MEDIUM] Hide Error Messages in Production
- **File:** `src/app/admin/(dashboard)/error.tsx:17`
- Wrap `error.message` display in `process.env.NODE_ENV === "development"` check
- Show generic "Une erreur est survenue" in production

---

### Team Bravo — Backend Hardening
> Scope: Rate limiting, audit logging, blob cleanup, middleware

#### B1. [HIGH] Replace In-Memory Rate Limiter with Upstash Redis
- **File:** `src/lib/rate-limit.ts` (58 lines — full rewrite)
- Install `@upstash/ratelimit` and `@upstash/redis`
- Create Upstash Redis instance (free tier sufficient)
- Replace `Map`-based limiter with Upstash sliding window
- Update `.env.example` with `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`
- Update consumers: `src/lib/auth.ts:26-30` and `src/app/api/contact/route.ts:11`

#### B2. [HIGH] Wire Up Audit Logging to All Mutation Endpoints
- **File:** `src/lib/audit.ts` (21 lines — fix `as any` cast first)
- Fix: Run `prisma generate` to include AuditLog model, remove `(db as any)` cast
- Add `logAudit()` calls to every admin POST, PUT, DELETE handler:
  - `src/app/api/admin/news/route.ts` (POST)
  - `src/app/api/admin/news/[id]/route.ts` (PUT, DELETE)
  - `src/app/api/admin/documents/route.ts` (POST)
  - `src/app/api/admin/documents/[id]/route.ts` (PUT, DELETE)
  - `src/app/api/admin/staff/route.ts` (POST)
  - `src/app/api/admin/staff/[id]/route.ts` (PUT, DELETE)
  - `src/app/api/admin/carousel/route.ts` (POST)
  - `src/app/api/admin/carousel/[id]/route.ts` (PUT, DELETE)
  - `src/app/api/admin/quick-links/route.ts` (POST)
  - `src/app/api/admin/quick-links/[id]/route.ts` (PUT, DELETE)
  - `src/app/api/admin/certifications/route.ts` (POST)
  - `src/app/api/admin/certifications/[id]/route.ts` (PUT, DELETE)
  - `src/app/api/admin/activities/route.ts` (POST)
  - `src/app/api/admin/activities/[id]/route.ts` (PUT, DELETE)
  - `src/app/api/admin/announcements/route.ts` (POST)
  - `src/app/api/admin/announcements/[id]/route.ts` (PUT, DELETE)
  - `src/app/api/admin/alumni-events/route.ts` (POST)
  - `src/app/api/admin/alumni-events/[id]/route.ts` (PUT, DELETE)
  - `src/app/api/admin/alumni-events/[id]/photos/route.ts` (POST, DELETE)
  - `src/app/api/admin/pages/[id]/route.ts` (PUT)
  - `src/app/api/admin/pages/[id]/sections/route.ts` (PUT)
  - `src/app/api/admin/settings/route.ts` (PUT)
  - `src/app/api/admin/menu-items/route.ts` (POST)
  - `src/app/api/admin/menu-items/[id]/route.ts` (PUT, DELETE)
  - `src/app/api/admin/menu-items/reorder/route.ts` (PUT)
  - `src/app/api/admin/governance/route.ts` (POST)
  - `src/app/api/admin/governance/[id]/route.ts` (PUT, DELETE)
- Pattern for each handler (add after successful DB operation):
  ```ts
  await logAudit(session.user.id, "CREATE", "news", result.id, { title: body.title });
  ```

#### B3. [HIGH] Fix Orphaned Blob Files on Update
- **Files:** All `[id]/route.ts` PUT handlers that handle file fields
- Before updating, fetch existing record
- Compare old image/file URL with new one
- If changed and old URL is a Vercel blob URL, call `del(oldUrl)` from `@vercel/blob`
- Affected routes (same list as B2, only those with image/file fields):
  - news (image), documents (fileUrl), staff (photo), carousel (image),
    activities (image), certifications (logo), alumni photos (url), page sections (image fields)

#### B4. [MEDIUM] Fix Middleware API Route Protection
- **File:** `src/middleware.ts` (22 lines)
- Add `pathname.startsWith("/api/admin")` check
- Return `NextResponse.json({ error: "Non autorise" }, { status: 401 })` for unauthenticated API requests
- Keep the redirect logic for page routes

#### B5. [MEDIUM] Add Max-Length to Admin Zod Schemas
- **File:** `src/lib/validations.ts` (170 lines)
- Add `.max()` constraints to all string fields:
  - Title/name fields: `.max(200)`
  - Description/excerpt fields: `.max(1000)`
  - HTML content fields: `.max(100000)` (100KB)
  - URL fields: `.max(2000)`
  - Slug fields: `.max(100)`

#### B6. [MEDIUM] Use `parseBody()` in Contact Route
- **File:** `src/app/api/contact/route.ts:20-21`
- Replace manual `req.json()` + `schema.parse()` with `parseBody(req, contactFormSchema)`

#### B7. [MEDIUM] Wrap Settings Upserts in Transaction
- **File:** `src/app/api/admin/settings/route.ts:20-28`
- Replace `Promise.all(entries.map(...upsert...))` with `db.$transaction(entries.map(...upsert...))`

---

## Phase 2: Database & Performance Optimization
**Priority:** This week — data integrity and user experience
**Teams:** Team Charlie (Database) + Team Delta (Performance)

### Team Charlie — Database Improvements
> Scope: Schema fixes, indexes, query optimization

#### C1. [MEDIUM] Add Missing Database Indexes
- **File:** `prisma/schema.prisma`
- Add the following indexes:
  ```prisma
  // Page model
  @@index([updatedAt])

  // Document model — replace single category index with composite
  @@index([category, order])

  // StaffMember model — add order index
  @@index([order])

  // AlumniEvent model
  @@index([date])

  // ContactSubmission model — add composite for dashboard query
  @@index([read, createdAt])

  // GovernanceInstance model
  @@index([order])
  ```

#### C2. [MEDIUM] Convert User Role to Enum
- **File:** `prisma/schema.prisma:16`
- Add enum and update model:
  ```prisma
  enum UserRole {
    ADMIN
  }
  model User {
    role UserRole @default(ADMIN)
  }
  ```
- Update any code referencing `role` as a string

#### C3. [MEDIUM] Add `@db.Text` to Long Content Fields
- **File:** `prisma/schema.prisma`
- Add `@db.Text` annotation to:
  - `PageSection.contentHtml`
  - `Announcement.contentHtml`
  - `StaffMember.messageHtml`
  - Any other fields that store HTML or JSON

#### C4. [LOW] Optimize Admin Dashboard Queries
- **File:** `src/app/admin/(dashboard)/page.tsx:79-80`
- Merge `getStats()` and `getRecentActivity()` into a single `Promise.all`

#### C5. [LOW] Replace Sequential Creates with `createMany` in Seed
- **File:** `prisma/seed.ts`
- Convert all `for...of` loops with individual `create()` calls to `createMany()` where relations allow

#### C6. [LOW] Add Pagination to Admin List Endpoints
- **Files:** All admin GET list routes
- Wire up the existing `parsePagination()` from `src/lib/admin-utils.ts`
- Add `take` and `skip` to `findMany()` calls
- Return pagination metadata in response

---

### Team Delta — Performance & Bundle Optimization
> Scope: Dynamic imports, image optimization, rendering, bundle cleanup

#### D1. [HIGH] Dynamic Import framer-motion
- **File:** `src/components/ui/motion.tsx` (137 lines)
- Wrap motion component exports with `next/dynamic`:
  ```tsx
  import dynamic from "next/dynamic";
  export const FadeInView = dynamic(() => import("./motion-impl").then(m => m.FadeInView), { ssr: false });
  ```
- Or use React.lazy + Suspense pattern
- This saves ~33KB gzipped from the initial bundle

#### D2. [MEDIUM] Add `sizes` Prop to Hero/Fill Images
- **Files:**
  - `src/components/ui/page-hero.tsx:23-29` — add `sizes="100vw"`
  - `src/app/(public)/home-content.tsx:99-105` — add `sizes="100vw"`
  - `src/components/public/navbar.tsx:188` — add `sizes="80px"` to partner logos
  - `src/components/public/footer.tsx:138` — add `sizes="80px"` to partner logos

#### D3. [MEDIUM] Add Error & Not-Found Boundaries to (public) Segment
- Create `src/app/(public)/error.tsx` — with navbar/footer wrapper
- Create `src/app/(public)/not-found.tsx` — with navbar/footer wrapper, French text
- Create `src/app/admin/(dashboard)/loading.tsx` — admin skeleton loader

#### D4. [MEDIUM] Move Dev Dependencies to devDependencies
- **File:** `package.json`
- Move to `devDependencies`:
  - `@types/bcryptjs`
  - `@types/node`
  - `@types/react`
  - `@types/react-dom`
  - `prisma`
  - `postcss`
  - `typescript` (test if Vercel build still works — may need to stay)

#### D5. [MEDIUM] Add ESLint Configuration
- Create `.eslintrc.json` or `eslint.config.mjs` at project root
- Include Next.js recommended rules + TypeScript strict rules
- Add rules for: no-console, no-unused-vars, react-hooks/exhaustive-deps

#### D6. [MEDIUM] Clean Up Stale Build Artifacts
- Delete `public/images/.next/` directory entirely
- Add `public/images/.next` to `.gitignore` as precaution

#### D7. [MEDIUM] Add OpenGraph Images
- Create or source a default OG image (1200x630) for social sharing
- Add `openGraph.images` to root metadata in `src/app/layout.tsx`
- Consider per-page OG images for news items (use their featured image)

#### D8. [LOW] Remove Dead Code
- Delete `src/app/(public)/excellence-academique/bcd/layout.tsx` (empty passthrough)
- Remove hardcoded navigation array from `src/lib/navigation.ts:7-108` (keep only type export)
- Remove unused `parsePagination` and `parseSearch` from `src/lib/admin-utils.ts` (or wire them up per C6)

---

## Phase 3: Frontend & UX Polish
**Priority:** Next sprint — accessibility, consistency, user experience
**Teams:** Team Echo (Accessibility) + Team Foxtrot (UI Consistency)

### Team Echo — Accessibility & UX Fixes
> Scope: Focus traps, keyboard navigation, functional search, ARIA

#### E1. [MEDIUM] Add Focus Trap to Photo Gallery Lightbox
- **File:** `src/components/ui/photo-gallery.tsx` (120 lines)
- Install `focus-trap-react` or implement manual focus trap
- Trap focus within lightbox when open
- Add Escape key handler to close lightbox
- Return focus to trigger element on close

#### E2. [MEDIUM] Add Focus Trap to Announcement Popup
- **File:** `src/components/ui/announcement-popup.tsx` (70 lines)
- Add focus trap when modal is open
- Add Escape key handler to dismiss
- Auto-focus the close button on open

#### E3. [MEDIUM] Add Focus Trap to Mobile Menu
- **File:** `src/components/public/navbar.tsx:110-120`
- Trap focus within mobile menu overlay when open
- Add Escape key handler to close menu
- Return focus to hamburger button on close

#### E4. [MEDIUM] Fix Non-Functional Search Inputs
- **File:** `src/components/public/navbar.tsx:236-242` (desktop), `496-503` (mobile)
- Option A (recommended): Remove search inputs entirely if search is not planned
- Option B: Implement client-side search with fuzzy matching across pages
- Option C: Add `aria-hidden` and `tabIndex={-1}` to prevent keyboard access if keeping as placeholder

#### E5. [LOW] Guard Against Empty Image src
- **File:** `src/app/(public)/etablissement/etablissement-content.tsx:93`
- Replace `localImage(s.photo) || ""` with conditional rendering:
  ```tsx
  {s.photo && <Image src={localImage(s.photo)} ... />}
  ```

#### E6. [LOW] Fix Skip Link Design Token
- **File:** `src/app/(public)/layout.tsx:78`
- Replace `focus:bg-[#02355b]` with `focus:bg-primary`

---

### Team Foxtrot — UI Consistency & Content Management
> Scope: Design tokens, shared components, hardcoded content

#### F1. [MEDIUM] Consolidate Off-Palette Colors
- **Files:**
  - `src/app/(public)/excellence-academique/ccc/ccc-content.tsx:47`
  - `src/app/(public)/anciens/anciens-content.tsx:39-44`
  - `src/app/(public)/excellence-academique/excellence-content.tsx`
- Either add these colors to the `@theme` block in `globals.css` as named tokens, or replace with existing palette colors

#### F2. [LOW] Extract Shared Social Icons Component
- **Files:** `src/components/public/navbar.tsx:13-21`, `src/components/public/footer.tsx`, `src/app/(public)/vie-du-lm/vie-content.tsx:12`
- Create `src/components/ui/social-icons.tsx` with Facebook, Instagram, YouTube SVG components
- Replace inline SVGs in all 3 files

#### F3. [LOW] Extract Shared IconCard Component
- Multiple pages use the same icon + title + description card pattern
- Create `src/components/ui/icon-card.tsx`
- Refactor: `home-content.tsx` reasons, `extrascolaire-content.tsx`, `orientation-content.tsx`, `vie-content.tsx`

#### F4. [LOW] Make Hardcoded Content CMS-Driven
- **File:** `src/app/(public)/home-content.tsx`
  - Line 128: "Inscriptions 2026-2027" → pull from SiteSetting
  - Line 251: "Numero 91 - Decembre 2025" → pull from SiteSetting
  - Lines 53-70: `reasons` array → consider moving to DB or settings
- **File:** `src/app/layout.tsx`
  - `numberOfStudents: 1085` → use `stat_eleves` setting value

#### F5. [LOW] Move Large Hardcoded Data to DB
- **File:** `src/app/(public)/etablissement/fonctionnement/[id]/data.ts` (329 lines)
- **File:** `src/app/(public)/excellence-academique/offre-pedagogique/[slug]/offre-pedagogique-content.tsx:138-372`
- Consider migrating to CMS/DB if content changes frequently
- If static, at minimum move to separate data files imported server-side to reduce client bundle

---

## Phase 4: Polish & Future-Proofing
**Priority:** Backlog — nice-to-haves and long-term improvements
**No dedicated team — handled by available agents**

#### G1. [LOW] Add Pagination to Public List Queries
- `src/app/(public)/etablissement/page.tsx` — staff list
- `src/app/(public)/extrascolaire/page.tsx` — activities list
- `src/app/(public)/informations-pratiques/page.tsx` — documents list
- Add "load more" or pagination when data exceeds threshold

#### G2. [LOW] Strengthen Password Policy
- **File:** `src/lib/validations.ts:19-21`
- Add regex or zxcvbn check for password complexity
- Require at least: 1 uppercase, 1 lowercase, 1 digit, 8+ chars

#### G3. [LOW] Reduce Session Max Age
- **File:** `src/lib/auth.ts:9`
- Consider reducing from 24h to 8h
- Or implement idle timeout with token refresh

#### G4. [LOW] Add Email Notifications for Contact Form
- Install/configure Resend (already in dependencies)
- Send notification email to `info@lycee-montaigne.edu.lb` on new contact submissions
- **File:** `src/app/api/contact/route.ts` — add after successful DB create

#### G5. [LOW] Add favicon.ico
- Convert `src/app/icon.png` to `.ico` format
- Place in `public/favicon.ico` for legacy browser compatibility

#### G6. [LOW] Add Suspense Boundaries to Public Pages
- Wrap heavy client components in `<Suspense fallback={<Skeleton />}>`
- Create page-specific skeleton components for better perceived performance

#### G7. [LOW] Add `engines` Field to package.json
- Specify Node.js version requirement: `"engines": { "node": ">=20.0.0" }`

#### G8. [LOW] Consider Environment Validation Library
- Replace manual `requireEnv()` with `@t3-oss/env-nextjs` for type-safe env validation

---

## Team Assignment Summary

| Team | Phase | Agents Needed | Scope | Issues |
|------|-------|---------------|-------|--------|
| **Alpha** | 1 | 2 | Security fixes | A1-A8 (2C, 4H, 2M) |
| **Bravo** | 1 | 3 | Backend hardening | B1-B7 (2H, 5M) |
| **Charlie** | 2 | 1 | Database schema & queries | C1-C6 (3M, 3L) |
| **Delta** | 2 | 2 | Performance & bundle | D1-D8 (1H, 6M, 1L) |
| **Echo** | 3 | 1 | Accessibility | E1-E6 (4M, 2L) |
| **Foxtrot** | 3 | 1 | UI consistency | F1-F5 (1M, 4L) |
| **Ad-hoc** | 4 | — | Polish & backlog | G1-G8 (8L) |

## Execution Dependencies

```
Phase 1 (Security + Backend) ──→ Phase 2 (Database + Performance) ──→ Phase 3 (Frontend + UX) ──→ Phase 4 (Polish)
     │                                    │
     │ A2 must complete before B1         │ C1 (schema changes) before C6 (pagination)
     │ A4 (sanitizer) before B2           │ D4 (deps) before D5 (eslint)
     │ B1 (rate-limit) needs env vars     │ D1 (dynamic imports) is independent
     │                                    │
     └── Phase 1 teams can run in ────────┘ Phase 2 teams can run in
         parallel (Alpha ∥ Bravo)             parallel (Charlie ∥ Delta)
```

## Total Issue Count by Fix

| Priority | Count | Fixed In |
|----------|-------|----------|
| Critical | 2 | Phase 1 (A1, A2) |
| High | 8 | Phase 1-2 (A3-A6, B1-B3, D1) |
| Medium | 17 | Phase 1-3 (A7-A8, B4-B7, C1-C3, D2-D7, E1-E4, F1) |
| Low | 20 | Phase 2-4 (C4-C6, D8, E5-E6, F2-F5, G1-G8) |
| **Total** | **47** | Across 4 phases |

> Note: Some audit findings were informational or duplicated across auditors. This plan consolidates to 47 unique actionable fixes.
