import { cn, localImage } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface CardProps {
  title: string;
  image?: string;
  href?: string;
  description?: string;
  className?: string;
  children?: React.ReactNode;
}

export function Card({
  title,
  image,
  href,
  description,
  className,
  children,
}: CardProps) {
  const imgSrc = localImage(image);
  const content = (
    <div
      className={cn(
        "group overflow-hidden rounded-[20px] border border-border bg-background shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-elevated)]",
        className
      )}
    >
      {imgSrc && (
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={imgSrc}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
      <div className="p-5">
        <h3 className="text-lg font-semibold">{title}</h3>
        {description && (
          <p className="mt-2 text-sm text-text-muted">{description}</p>
        )}
        {children}
      </div>
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}
