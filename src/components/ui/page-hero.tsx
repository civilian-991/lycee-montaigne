import { cn } from "@/lib/utils";
import Image from "next/image";

interface PageHeroProps {
  title: string;
  image?: string;
  className?: string;
}

export function PageHero({ title, image, className }: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative flex min-h-[240px] items-center justify-center overflow-hidden bg-primary md:min-h-[320px]",
        className
      )}
    >
      {image && (
        <Image
          src={image}
          alt=""
          fill
          className="object-cover opacity-30"
          priority
        />
      )}
      <div className="relative z-10 px-4 text-center">
        <h1 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
          {title}
        </h1>
        <svg
          className="mx-auto mt-4 h-3 w-24"
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
    </section>
  );
}
