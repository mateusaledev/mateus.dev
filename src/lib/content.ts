import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { Locale } from "@/i18n/routing";
import type {
  AboutContent,
  BlogPost,
  BlogPostMeta,
  Project,
  TocItem,
} from "@/types/content";

const contentDir = path.join(process.cwd(), "content");

function readJsonFile<T>(filePath: string): T {
  const fullPath = path.join(contentDir, filePath);
  const raw = fs.readFileSync(fullPath, "utf-8");
  return JSON.parse(raw) as T;
}

function getMdxFiles(dir: string): string[] {
  const fullDir = path.join(contentDir, dir);

  if (!fs.existsSync(fullDir)) {
    return [];
  }

  return fs
    .readdirSync(fullDir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => path.join(fullDir, file));
}

export function getAboutContent(locale: Locale): AboutContent {
  return readJsonFile<AboutContent>(`site/about.${locale}.json`);
}

export type BlogSettings = {
  underConstruction: boolean;
};

export function getBlogSettings(): BlogSettings {
  const filePath = path.join(contentDir, "site", "blog.json");

  if (!fs.existsSync(filePath)) {
    return { underConstruction: false };
  }

  return readJsonFile<BlogSettings>("site/blog.json");
}

export function isBlogUnderConstruction(locale: Locale): boolean {
  const settings = getBlogSettings();
  const hasPublishedPosts = getBlogPosts(locale).length > 0;

  return settings.underConstruction || !hasPublishedPosts;
}

export function getProjects(): Project[] {
  const files = getMdxFiles("projects");

  return files
    .map((filePath) => {
      const raw = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(raw);
      const slug = path.basename(filePath, ".mdx");

      return {
        slug,
        title: data.title,
        description: data.description,
        tags: data.tags ?? [],
        stack: data.stack ?? [],
        githubUrl: data.githubUrl,
        liveUrl: data.liveUrl,
        featured: data.featured ?? false,
        order: data.order ?? 99,
        coverImage: data.coverImage,
        challenges: data.challenges,
        learnings: data.learnings,
        body: {
          pt: localeContent(content, data.localeBodies?.pt),
          en: localeContent(content, data.localeBodies?.en),
        },
      } satisfies Project;
    })
    .sort((a, b) => a.order - b.order);
}

function localeContent(defaultBody: string, localized?: string) {
  return localized ?? defaultBody;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getProjects().find((project) => project.slug === slug);
}

export function getBlogPosts(locale: Locale): BlogPostMeta[] {
  const dir = path.join(contentDir, "blog", locale);

  if (!fs.existsSync(dir)) {
    return [];
  }

  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const filePath = path.join(dir, file);
      const raw = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(raw);
      const slug = path.basename(file, ".mdx");

      return {
        slug,
        title: data.title,
        description: data.description,
        date: data.date,
        locale,
        tags: data.tags ?? [],
        published: data.published ?? true,
        readingTime: readingTime(content).text,
      } satisfies BlogPostMeta;
    })
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getBlogPost(locale: Locale, slug: string): BlogPost | undefined {
  const filePath = path.join(contentDir, "blog", locale, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return undefined;
  }

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const published = data.published ?? true;

  if (!published) {
    return undefined;
  }

  return {
    slug,
    title: data.title,
    description: data.description,
    date: data.date,
    locale,
    tags: data.tags ?? [],
    published,
    readingTime: readingTime(content).text,
    content,
  };
}

export function getAdjacentPosts(locale: Locale, slug: string) {
  const posts = getBlogPosts(locale);
  const index = posts.findIndex((post) => post.slug === slug);

  return {
    previous: index > 0 ? posts[index - 1] : undefined,
    next: index < posts.length - 1 ? posts[index + 1] : undefined,
  };
}

export function extractToc(content: string): TocItem[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const items: TocItem[] = [];
  let match: RegExpExecArray | null;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");

    items.push({ id, text, level });
  }

  return items;
}

export function getAllProjectTags(): string[] {
  const tags = getProjects().flatMap((project) => project.tags);
  return [...new Set(tags)].sort();
}

export function getAllBlogTags(locale: Locale): string[] {
  const tags = getBlogPosts(locale).flatMap((post) => post.tags);
  return [...new Set(tags)].sort();
}
