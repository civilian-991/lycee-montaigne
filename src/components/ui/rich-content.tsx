import { cn } from "@/lib/utils";

interface RichContentProps {
  html: string;
  className?: string;
}

export function RichContent({ html, className }: RichContentProps) {
  return (
    <div
      className={cn(
        "prose prose-sm max-w-none prose-headings:text-primary prose-a:text-secondary prose-a:no-underline hover:prose-a:underline prose-img:rounded-lg",
        className
      )}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
