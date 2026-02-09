import { cn } from "@/lib/utils";
import { cleanHtml } from "@/lib/sanitize";

interface RichContentProps {
  html: string;
  className?: string;
}

export function RichContent({ html, className }: RichContentProps) {
  return (
    <div
      className={cn(
        "prose prose-sm max-w-none prose-headings:font-heading prose-headings:text-primary prose-a:text-secondary prose-a:no-underline hover:prose-a:underline prose-img:rounded-2xl prose-blockquote:border-secondary/30",
        className
      )}
      dangerouslySetInnerHTML={{ __html: cleanHtml(html) }}
    />
  );
}
