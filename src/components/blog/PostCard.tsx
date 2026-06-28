import { Link } from "@/i18n/navigation";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import { formatDate } from "@/lib/utils";
import type { BlogPostMeta } from "@/types/content";
import type { Locale } from "@/i18n/routing";

type PostCardProps = {
  post: BlogPostMeta;
  locale: Locale;
  readMoreLabel: string;
};

export function PostCard({ post, locale, readMoreLabel }: PostCardProps) {
  return (
    <Card hover className="flex h-full flex-col">
      <div className="mb-4 flex flex-wrap items-center gap-2 text-sm text-muted">
        <time dateTime={post.date}>{formatDate(post.date, locale)}</time>
        <span>·</span>
        <span>{post.readingTime}</span>
      </div>

      <h3 className="text-xl font-semibold tracking-tight">{post.title}</h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
        {post.description}
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>

      <Link
        href={`/blog/${post.slug}`}
        className="mt-6 inline-flex text-sm font-medium text-accent transition hover:text-accent/80"
      >
        {readMoreLabel} →
      </Link>
    </Card>
  );
}
