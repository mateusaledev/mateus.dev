import { Section, SectionHeader } from "@/components/ui/Section";

type BlogUnderConstructionProps = {
  title: string;
  description: string;
};

export function BlogUnderConstruction({
  title,
  description,
}: BlogUnderConstructionProps) {
  return (
    <div className="rounded-3xl border border-dashed border-border bg-surface p-10 text-center md:p-14">
      <p className="font-mono text-xs uppercase tracking-wider text-accent">
        blog
      </p>
      <h2 className="mt-4 text-2xl font-semibold tracking-tight md:text-3xl">
        {title}
      </h2>
      <p className="mx-auto mt-4 max-w-xl leading-relaxed text-muted">
        {description}
      </p>
    </div>
  );
}
