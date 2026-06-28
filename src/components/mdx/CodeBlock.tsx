import { highlightCode } from "@/lib/shiki";

type CodeBlockProps = {
  code: string;
  lang: string;
  theme?: "github-light" | "github-dark";
};

export async function CodeBlock({
  code,
  lang,
  theme = "github-dark",
}: CodeBlockProps) {
  const html = await highlightCode(code, lang, theme);

  return (
    <div
      className="my-6 overflow-x-auto rounded-xl border border-border bg-surface-muted p-4 text-sm [&_pre]:!bg-transparent [&_pre]:!p-0"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
