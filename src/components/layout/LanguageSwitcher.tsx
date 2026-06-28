"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="flex items-center gap-1 rounded-full border border-border bg-surface p-1">
      {routing.locales.map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => router.replace(pathname, { locale: item })}
          className={cn(
            "rounded-full px-2.5 py-1 font-mono text-xs uppercase transition",
            item === locale
              ? "bg-foreground text-background"
              : "text-muted hover:text-foreground",
          )}
        >
          {item}
        </button>
      ))}
    </div>
  );
}
