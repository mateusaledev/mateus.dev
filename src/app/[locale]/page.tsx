import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PostCard } from "@/components/blog/PostCard";
import { BlogUnderConstruction } from "@/components/blog/BlogUnderConstruction";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Section, SectionHeader } from "@/components/ui/Section";
import { getAboutContent, getBlogPosts, getProjects, isBlogUnderConstruction } from "@/lib/content";
import type { Locale } from "@/i18n/routing";

type HomePageProps = {
  params: Promise<{ locale: Locale }>;
};

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "home" });
  const tProjects = await getTranslations({ locale, namespace: "projects" });
  const tBlog = await getTranslations({ locale, namespace: "blog" });
  const about = getAboutContent(locale);
  const projects = getProjects().filter((project) => project.featured).slice(0, 2);
  const posts = getBlogPosts(locale).slice(0, 2);
  const blogUnderConstruction = isBlogUnderConstruction(locale);

  return (
    <>
      <Section className="pb-10 pt-20 md:pt-28">
        <div className="fade-in max-w-3xl">
          <p className="font-mono text-sm text-muted">{t("greeting")}</p>
          <h1 className="mt-4 text-5xl font-semibold tracking-tight md:text-7xl">
            {about.name}
            <span className="text-accent">.</span>
          </h1>
          <p className="mt-6 text-xl leading-relaxed text-muted md:text-2xl">
            {t("headline")}
          </p>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
            {t("subheadline")}
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/projects"
              className="inline-flex h-11 items-center rounded-full bg-foreground px-5 text-sm font-medium text-background transition hover:bg-foreground/90"
            >
              {t("ctaProjects")}
            </Link>
            <Link
              href="/blog"
              className="inline-flex h-11 items-center rounded-full border border-border bg-surface px-5 text-sm font-medium transition hover:bg-surface-muted"
            >
              {t("ctaBlog")}
            </Link>
          </div>
        </div>
      </Section>

      <Section narrow className="py-12">
        <SectionHeader title={t("featuredProjects")} />
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
              locale={locale}
              ctaLabel={tProjects("viewProject")}
            />
          ))}
        </div>
        <Link
          href="/projects"
          className="mt-8 inline-flex text-sm font-medium text-accent transition hover:text-accent/80"
        >
          {t("viewAll")} →
        </Link>
      </Section>

      <Section narrow>
        <SectionHeader title={t("latestPosts")} />
        {blogUnderConstruction ? (
          <BlogUnderConstruction
            title={tBlog("underConstruction.title")}
            description={tBlog("underConstruction.homeTeaser")}
          />
        ) : (
          <>
            <div className="grid gap-6 md:grid-cols-2">
              {posts.map((post) => (
                <PostCard
                  key={post.slug}
                  post={post}
                  locale={locale}
                  readMoreLabel={tBlog("readMore")}
                />
              ))}
            </div>
            <Link
              href="/blog"
              className="mt-8 inline-flex text-sm font-medium text-accent transition hover:text-accent/80"
            >
              {t("viewAll")} →
            </Link>
          </>
        )}
      </Section>
    </>
  );
}
