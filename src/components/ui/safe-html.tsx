import { cleanHtml } from "@/lib/sanitize";

/**
 * Server component that renders sanitized HTML.
 * Use this instead of raw dangerouslySetInnerHTML to prevent stored XSS.
 */
export function SafeHtml({
  html,
  className,
}: {
  html: string;
  className?: string;
}) {
  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: cleanHtml(html) }}
    />
  );
}
