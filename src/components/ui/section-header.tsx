import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  className?: string;
}

export function SectionHeader({ title, className }: SectionHeaderProps) {
  return (
    <div className={cn("mb-8 text-center", className)}>
      <h2 className="text-2xl font-bold md:text-3xl">{title}</h2>
      <svg
        className="mx-auto mt-3 h-3 w-24"
        viewBox="0 0 100 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M0 6 C 20 0, 30 12, 50 6 S 80 0, 100 6"
          stroke="var(--color-secondary)"
          strokeWidth="3"
          fill="none"
        />
      </svg>
    </div>
  );
}
