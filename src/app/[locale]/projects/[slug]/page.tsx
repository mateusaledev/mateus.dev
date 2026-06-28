import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { MdxContent } from "@/components/mdx/MdxContent";
import { Section } from "@/components/ui/Section";
import { Tag } from "@/components/ui/Tag";
import { getProjectBySlug } from "@/lib/content";
import type { Locale } from "@/i18n/routing";

type ProjectDetailPageProps = {
  params: Promise<{ locale: Locale; slug: string }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  const { getProjects } = await import("@/lib/content");
  const projects = getProjects();

  return projects.flatMap((project) => [
    { locale: "pt", slug: project.slug },
    { locale: "en", slug: project.slug },
  ]);
}

export async function generateMetadata({ params }: ProjectDetailPageProps) {
  const { locale, slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {};
  }

  return {
    title: project.title[locale],
    description: project.description[locale],
  };
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "projects" });
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <Section narrow>
      <div className="mb-10">
        <div className="mb-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
        <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
          {project.title[locale]}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          {project.description[locale]}
        </p>

        <div className="mt-6 flex flex-wrap gap-4">
          {project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-medium text-accent transition hover:text-accent/80"
            >
              {t("sourceCode")} →
            </a>
          ) : null}
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-medium text-accent transition hover:text-accent/80"
            >
              {t("liveDemo")} →
            </a>
          ) : null}
        </div>
      </div>

      <div className="mb-10 rounded-2xl border border-border bg-surface p-6">
        <h2 className="font-mono text-sm text-accent">{t("stack")}</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.stack.map((item) => (
            <Tag key={item}>{item}</Tag>
          ))}
        </div>
      </div>

      <MdxContent source={project.body[locale]} />

      {project.challenges ? (
        <div className="mt-10 rounded-2xl border border-border bg-surface p-6">
          <h2 className="text-xl font-semibold">{t("challenges")}</h2>
          <p className="mt-3 leading-relaxed text-muted">
            {project.challenges[locale]}
          </p>
        </div>
      ) : null}

      {project.learnings ? (
        <div className="mt-6 rounded-2xl border border-border bg-surface p-6">
          <h2 className="text-xl font-semibold">{t("learnings")}</h2>
          <p className="mt-3 leading-relaxed text-muted">
            {project.learnings[locale]}
          </p>
        </div>
      ) : null}
    </Section>
  );
}
