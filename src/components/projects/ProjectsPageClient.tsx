"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Section, SectionHeader } from "@/components/ui/Section";
import { cn } from "@/lib/utils";
import type { Project } from "@/types/content";
import type { Locale } from "@/i18n/routing";

type ProjectsPageClientProps = {
  projects: Project[];
  tags: string[];
};

export function ProjectsPageClient({ projects, tags }: ProjectsPageClientProps) {
  const t = useTranslations("projects");
  const locale = useLocale() as Locale;
  const [activeTag, setActiveTag] = useState<string>("all");

  const filteredProjects = useMemo(() => {
    if (activeTag === "all") {
      return projects;
    }

    return projects.filter((project) => project.tags.includes(activeTag));
  }, [activeTag, projects]);

  return (
    <Section narrow>
      <SectionHeader title={t("title")} subtitle={t("subtitle")} />

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
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project.slug}
            project={project}
            locale={locale}
            ctaLabel={t("viewProject")}
          />
        ))}
      </div>
    </Section>
  );
}
