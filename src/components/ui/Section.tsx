import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

type SectionProps = HTMLAttributes<HTMLElement> & {
  narrow?: boolean;
};

export function Section({
  className,
  narrow = false,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(narrow ? "container-narrow" : "container-wide", "py-16 md:py-24", className)}
      {...props}
    >
      {children}
    </section>
  );
}

export function SectionHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-12 max-w-2xl">
      <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">{title}</h1>
      {subtitle ? (
        <p className="mt-4 text-lg leading-relaxed text-muted">{subtitle}</p>
      ) : null}
    </div>
  );
}
