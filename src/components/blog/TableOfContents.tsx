import { cn } from "@/lib/utils";
import type { TocItem } from "@/types/content";

type TableOfContentsProps = {
  items: TocItem[];
  title: string;
};

export function TableOfContents({ items, title }: TableOfContentsProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <nav className="rounded-2xl border border-border bg-surface p-5">
      <p className="mb-4 font-mono text-xs uppercase tracking-wider text-muted">
        {title}
      </p>
      <ul className="space-y-2 text-sm">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={cn(
                "block text-muted transition hover:text-foreground",
                item.level === 3 && "pl-4",
              )}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
