import { Link } from "@/i18n/navigation";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import type { Project } from "@/types/content";
import type { Locale } from "@/i18n/routing";

type ProjectCardProps = {
  project: Project;
  locale: Locale;
  ctaLabel: string;
};

export function ProjectCard({ project, locale, ctaLabel }: ProjectCardProps) {
  return (
    <Card hover className="flex h-full flex-col">
      <div className="mb-4 flex flex-wrap gap-2">
        {project.tags.slice(0, 3).map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>

      <h3 className="text-xl font-semibold tracking-tight">
        {project.title[locale]}
      </h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
        {project.description[locale]}
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {project.stack.slice(0, 4).map((item) => (
          <span key={item} className="font-mono text-xs text-muted">
            {item}
          </span>
        ))}
      </div>

      <Link
        href={`/projects/${project.slug}`}
        className="mt-6 inline-flex text-sm font-medium text-accent transition hover:text-accent/80"
      >
        {ctaLabel} →
      </Link>
    </Card>
  );
}
