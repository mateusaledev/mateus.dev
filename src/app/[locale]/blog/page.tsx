import { getTranslations, setRequestLocale } from "next-intl/server";
import { BlogPageClient } from "@/components/blog/BlogPageClient";
import { getAllBlogTags, getBlogPosts, isBlogUnderConstruction } from "@/lib/content";
import type { Locale } from "@/i18n/routing";

type BlogPageProps = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({ params }: BlogPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });

  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const posts = getBlogPosts(locale);
  const tags = getAllBlogTags(locale);
  const underConstruction = isBlogUnderConstruction(locale);

  return (
    <BlogPageClient
      posts={posts}
      tags={tags}
      underConstruction={underConstruction}
    />
  );
}
