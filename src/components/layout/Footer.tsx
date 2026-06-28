import { getTranslations } from "next-intl/server";
import { getAboutContent } from "@/lib/content";
import type { Locale } from "@/i18n/routing";

type FooterProps = {
  locale: Locale;
};

export async function Footer({ locale }: FooterProps) {
  const t = await getTranslations({ locale, namespace: "footer" });
  const about = getAboutContent(locale);
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="container-wide flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-mono text-sm">{about.name}</p>
          <p className="mt-1 text-sm text-muted">{t("builtWith")}</p>
          <p className="mt-1 text-sm text-muted">
            © {year}. {t("rights")}
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          {about.social.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="font-mono text-sm text-muted transition hover:text-foreground"
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel={item.href.startsWith("http") ? "noreferrer" : undefined}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
