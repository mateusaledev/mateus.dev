import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

type TagProps = HTMLAttributes<HTMLSpanElement>;

export function Tag({ className, ...props }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-border bg-surface-muted px-2.5 py-1 font-mono text-xs text-muted",
        className,
      )}
      {...props}
    />
  );
}
