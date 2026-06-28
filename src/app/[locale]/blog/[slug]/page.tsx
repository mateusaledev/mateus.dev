import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { MdxContent } from "@/components/mdx/MdxContent";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { Section } from "@/components/ui/Section";
import { Tag } from "@/components/ui/Tag";
import { Link } from "@/i18n/navigation";
import {
  extractToc,
  getAdjacentPosts,
  getBlogPost,
  getBlogPosts,
} from "@/lib/content";
import { formatDate } from "@/lib/utils";
import type { Locale } from "@/i18n/routing";

type BlogPostPageProps = {
  params: Promise<{ locale: Locale; slug: string }>;
};

export async function generateStaticParams() {
  const locales: Locale[] = ["pt", "en"];
  const params: Array<{ locale: Locale; slug: string }> = [];

  for (const locale of locales) {
    const posts = getBlogPosts(locale);
    for (const post of posts) {
      params.push({ locale, slug: post.slug });
    }
  }

  return params;
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { locale, slug } = await params;
  const post = getBlogPost(locale, slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "blog" });
  const post = getBlogPost(locale, slug);

  if (!post) {
    notFound();
  }

  const toc = extractToc(post.content);
  const { previous, next } = getAdjacentPosts(locale, slug);

  return (
    <Section narrow>
      <article>
        <header className="mb-10">
          <div className="mb-4 flex flex-wrap items-center gap-2 text-sm text-muted">
            <time dateTime={post.date}>{formatDate(post.date, locale)}</time>
            <span>·</span>
            <span>{post.readingTime}</span>
          </div>
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
            {post.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            {post.description}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        </header>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_240px]">
          <MdxContent source={post.content} />
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <TableOfContents items={toc} title={t("tableOfContents")} />
          </aside>
        </div>

        <nav className="mt-16 grid gap-4 border-t border-border pt-8 md:grid-cols-2">
          {previous ? (
            <Link
              href={`/blog/${previous.slug}`}
              className="rounded-2xl border border-border bg-surface p-5 transition hover:bg-surface-muted"
            >
              <p className="font-mono text-xs text-muted">{t("previous")}</p>
              <p className="mt-2 font-medium">{previous.title}</p>
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link
              href={`/blog/${next.slug}`}
              className="rounded-2xl border border-border bg-surface p-5 transition hover:bg-surface-muted md:text-right"
            >
              <p className="font-mono text-xs text-muted">{t("next")}</p>
              <p className="mt-2 font-medium">{next.title}</p>
            </Link>
          ) : null}
        </nav>
      </article>
    </Section>
  );
}
