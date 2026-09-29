import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  className?: string;
  align?: "start" | "center";
};

export function StorefrontSectionHeader({
  eyebrow,
  title,
  subtitle,
  actions,
  className,
  align = "start",
}: Props) {
  return (
    <div
      className={cn(
        "mb-10 flex flex-col gap-6 md:mb-14",
        align === "center" ? "items-center text-center" : "md:flex-row md:items-end md:justify-between",
        className
      )}
    >
      <div className={cn(align === "center" ? "max-w-2xl" : "max-w-3xl")}>
        {eyebrow ? (
          <p className="mb-3 font-serif text-[0.65rem] font-semibold tracking-[0.28em] text-brand-forest/55 uppercase">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="font-serif text-[clamp(1.75rem,4vw,3.25rem)] font-semibold leading-[1.1] tracking-tight text-foreground">
          {title}
        </h2>
        {subtitle ? (
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-foreground/55 md:text-base">
            {subtitle}
          </p>
        ) : null}
      </div>
      {actions ? <div className="flex shrink-0 flex-wrap items-center gap-3">{actions}</div> : null}
    </div>
  );
}
