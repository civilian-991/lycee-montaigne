import { FileText, Download } from "lucide-react";
import { cn } from "@/lib/utils";

interface DocumentCardProps {
  title: string;
  fileUrl: string;
  className?: string;
}

export function DocumentCard({ title, fileUrl, className }: DocumentCardProps) {
  return (
    <a
      href={fileUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group flex items-center gap-3 rounded-lg border border-border bg-white p-4 transition-all hover:border-secondary hover:shadow-md",
        className
      )}
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary/10 text-secondary transition-colors group-hover:bg-secondary group-hover:text-white">
        <FileText className="h-5 w-5" />
      </div>
      <span className="flex-1 text-sm font-medium text-text">{title}</span>
      <Download className="h-4 w-4 text-text-muted transition-colors group-hover:text-secondary" />
    </a>
  );
}
