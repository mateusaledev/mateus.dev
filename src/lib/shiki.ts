import { createHighlighter, type Highlighter } from "shiki";

let highlighterPromise: Promise<Highlighter> | null = null;

async function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ["github-light", "github-dark"],
      langs: [
        "typescript",
        "javascript",
        "java",
        "bash",
        "json",
        "yaml",
        "sql",
        "markdown",
        "text",
      ],
    });
  }

  return highlighterPromise;
}

export async function highlightCode(
  code: string,
  lang: string,
  theme: "github-light" | "github-dark" = "github-dark",
) {
  const highlighter = await getHighlighter();
  const language = highlighter.getLoadedLanguages().includes(lang as never)
    ? lang
    : "text";

  return highlighter.codeToHtml(code, {
    lang: language,
    theme,
  });
}
