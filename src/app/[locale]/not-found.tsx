import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function NotFoundPage() {
  const t = await getTranslations("nav");

  return (
    <div className="container-narrow flex min-h-[50vh] flex-col items-start justify-center py-24">
      <p className="font-mono text-sm text-muted">404</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight">Page not found</h1>
      <p className="mt-4 text-muted">The page you are looking for does not exist.</p>
      <Link
        href="/"
        className="mt-8 inline-flex h-11 items-center rounded-full bg-foreground px-5 text-sm font-medium text-background"
      >
        {t("home")}
      </Link>
    </div>
  );
}
