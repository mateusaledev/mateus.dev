import { getTranslations, setRequestLocale } from "next-intl/server";
import { ProfileAvatar } from "@/components/about/ProfileAvatar";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Tag } from "@/components/ui/Tag";
import { getAboutContent } from "@/lib/content";
import type { Locale } from "@/i18n/routing";

type AboutPageProps = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({ params }: AboutPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });

  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "about" });
  const about = getAboutContent(locale);

  return (
    <Section narrow>
      <SectionHeader title={t("title")} subtitle={t("subtitle")} />

      <div className="grid gap-12">
        <div className="rounded-3xl border border-border bg-surface p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight">{about.name}</h2>
              <p className="mt-2 font-mono text-sm text-accent">{about.title[locale]}</p>
              <p className="mt-2 text-sm text-muted">{about.location[locale]}</p>
            </div>
            <ProfileAvatar />
          </div>
          <p className="mt-6 leading-8 text-muted">{about.bio[locale]}</p>
        </div>

        <section>
          <h2 className="mb-6 text-2xl font-semibold tracking-tight">{t("experience")}</h2>
          <div className="space-y-6">
            {about.experience.map((item) => (
              <div
                key={`${item.company}-${item.period}`}
                className="rounded-2xl border border-border bg-surface p-6"
              >
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                  <h3 className="text-lg font-semibold">{item.role[locale]}</h3>
                  <span className="font-mono text-sm text-muted">{item.period}</span>
                </div>
                <p className="mt-1 text-sm text-accent">{item.company}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {item.description[locale]}
                </p>
              </div>
            ))}
          </div>
        </section>

        {about.education && about.education.length > 0 ? (
          <section>
            <h2 className="mb-6 text-2xl font-semibold tracking-tight">{t("education")}</h2>
            <div className="space-y-6">
              {about.education.map((item) => (
                <div
                  key={`${item.institution[locale]}-${item.period}`}
                  className="rounded-2xl border border-border bg-surface p-6"
                >
                  <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <h3 className="text-lg font-semibold">{item.institution[locale]}</h3>
                    <span className="font-mono text-sm text-muted">{item.period}</span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {item.course[locale]}
                  </p>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        <section>
          <h2 className="mb-6 text-2xl font-semibold tracking-tight">{t("skills")}</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {about.skills.map((group) => (
              <div
                key={group.category[locale]}
                className="rounded-2xl border border-border bg-surface p-6"
              >
                <h3 className="font-mono text-sm text-accent">{group.category[locale]}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <Tag key={skill}>{skill}</Tag>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-6 text-2xl font-semibold tracking-tight">{t("connect")}</h2>
          <div className="flex flex-wrap gap-4">
            {about.social.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="inline-flex h-11 items-center rounded-full border border-border bg-surface px-5 text-sm font-medium transition hover:bg-surface-muted"
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noreferrer" : undefined}
              >
                {item.label}
              </a>
            ))}
          </div>
        </section>
      </div>
    </Section>
  );
}
