import type { Locale } from "@/i18n/routing";

export type LocalizedString = {
  pt: string;
  en: string;
};

export type SocialLink = {
  label: string;
  href: string;
  icon: "github" | "linkedin" | "email";
};

export type ExperienceItem = {
  company: string;
  role: LocalizedString;
  period: string;
  description: LocalizedString;
};

export type SkillGroup = {
  category: LocalizedString;
  items: string[];
};

export type EducationItem = {
  institution: LocalizedString;
  course: LocalizedString;
  period: string;
};

export type AboutContent = {
  name: string;
  title: LocalizedString;
  bio: LocalizedString;
  location: LocalizedString;
  email: string;
  social: SocialLink[];
  experience: ExperienceItem[];
  education?: EducationItem[];
  skills: SkillGroup[];
};

export type Project = {
  slug: string;
  title: LocalizedString;
  description: LocalizedString;
  tags: string[];
  stack: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  order: number;
  coverImage?: string;
  challenges?: LocalizedString;
  learnings?: LocalizedString;
  body: LocalizedString;
};

export type BlogPostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  locale: Locale;
  tags: string[];
  published: boolean;
  readingTime: string;
};

export type BlogPost = BlogPostMeta & {
  content: string;
};

export type TocItem = {
  id: string;
  text: string;
  level: number;
};
