import { getTranslations, setRequestLocale } from "next-intl/server";
import { ProjectsPageClient } from "@/components/projects/ProjectsPageClient";
import { getAllProjectTags, getProjects } from "@/lib/content";
import type { Locale } from "@/i18n/routing";

type ProjectsPageProps = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({ params }: ProjectsPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "projects" });

  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

export default async function ProjectsPage({ params }: ProjectsPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const projects = getProjects();
  const tags = getAllProjectTags();

  return <ProjectsPageClient projects={projects} tags={tags} />;
}
