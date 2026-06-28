"use client";

import { useLocale, useTranslations } from "next-intl";
import { BlogUnderConstruction } from "@/components/blog/BlogUnderConstruction";
import { PostCard } from "@/components/blog/PostCard";
import { Section, SectionHeader } from "@/components/ui/Section";
import { cn } from "@/lib/utils";
import type { BlogPostMeta } from "@/types/content";
import type { Locale } from "@/i18n/routing";
import { useMemo, useState } from "react";

type BlogPageClientProps = {
  posts: BlogPostMeta[];
  tags: string[];
  underConstruction: boolean;
};

export function BlogPageClient({
  posts,
  tags,
  underConstruction,
}: BlogPageClientProps) {
  const t = useTranslations("blog");
  const locale = useLocale() as Locale;
  const [activeTag, setActiveTag] = useState<string>("all");

  const filteredPosts = useMemo(() => {
    if (activeTag === "all") {
      return posts;
    }

    return posts.filter((post) => post.tags.includes(activeTag));
  }, [activeTag, posts]);

  return (
    <Section narrow>
      <SectionHeader title={t("title")} subtitle={t("subtitle")} />

      {underConstruction ? (
        <BlogUnderConstruction
          title={t("underConstruction.title")}
          description={t("underConstruction.description")}
        />
      ) : (
        <>
          <div className="mb-10 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setActiveTag("all")}
              className={cn(
                "rounded-full border px-3 py-1.5 font-mono text-xs transition",
                activeTag === "all"
                  ? "border-foreground bg-foreground text-background"
                  : "border-border text-muted hover:text-foreground",
              )}
            >
              {t("filterAll")}
            </button>
            {tags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setActiveTag(tag)}
                className={cn(
                  "rounded-full border px-3 py-1.5 font-mono text-xs transition",
                  activeTag === tag
                    ? "border-foreground bg-foreground text-background"
                    : "border-border text-muted hover:text-foreground",
                )}
              >
                {tag}
              </button>
            ))}
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {filteredPosts.map((post) => (
              <PostCard
                key={post.slug}
                post={post}
                locale={locale}
                readMoreLabel={t("readMore")}
              />
            ))}
          </div>
        </>
      )}
    </Section>
  );
}
