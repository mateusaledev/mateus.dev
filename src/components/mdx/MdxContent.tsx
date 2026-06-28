import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { createMdxComponents } from "@/lib/mdx-components";

type MdxContentProps = {
  source: string;
  theme?: "github-light" | "github-dark";
};

export async function MdxContent({ source, theme = "github-dark" }: MdxContentProps) {
  const { content } = await compileMDX({
    source,
    components: createMdxComponents(theme),
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeSlug],
      },
    },
  });

  return (
    <article className="prose-custom mx-auto max-w-none space-y-6">{content}</article>
  );
}
