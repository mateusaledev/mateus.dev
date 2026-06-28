import type { MDXComponents } from "mdx/types";
import { CodeBlock } from "@/components/mdx/CodeBlock";

export function createMdxComponents(
  theme: "github-light" | "github-dark" = "github-dark",
): MDXComponents {
  return {
    h2: ({ children, ...props }) => {
      const text = String(children);
      const id = slugify(text);

      return (
        <h2 id={id} className="scroll-mt-24 text-2xl font-semibold tracking-tight" {...props}>
          {children}
        </h2>
      );
    },
    h3: ({ children, ...props }) => {
      const text = String(children);
      const id = slugify(text);

      return (
        <h3 id={id} className="scroll-mt-24 text-xl font-semibold tracking-tight" {...props}>
          {children}
        </h3>
      );
    },
    p: (props) => <p className="leading-7 text-muted" {...props} />,
    ul: (props) => <ul className="my-4 list-disc space-y-2 pl-6 text-muted" {...props} />,
    ol: (props) => <ol className="my-4 list-decimal space-y-2 pl-6 text-muted" {...props} />,
    li: (props) => <li className="leading-7" {...props} />,
    a: (props) => (
      <a
        className="font-medium text-accent underline-offset-4 transition hover:text-accent/80 hover:underline"
        target={props.href?.startsWith("http") ? "_blank" : undefined}
        rel={props.href?.startsWith("http") ? "noreferrer" : undefined}
        {...props}
      />
    ),
    blockquote: (props) => (
      <blockquote
        className="my-6 border-l-2 border-accent/40 pl-4 italic text-muted"
        {...props}
      />
    ),
    code: ({ children, className, ...props }) => {
      const isBlock = className?.includes("language-");

      if (isBlock) {
        const lang = className?.replace("language-", "") || "text";
        return (
          <CodeBlock code={String(children).trimEnd()} lang={lang} theme={theme} />
        );
      }

      return (
        <code
          className="rounded-md bg-surface-muted px-1.5 py-0.5 font-mono text-sm text-foreground"
          {...props}
        >
          {children}
        </code>
      );
    },
    pre: ({ children }) => <>{children}</>,
  };
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}
