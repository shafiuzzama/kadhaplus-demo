import PageHeader from "./PageHeader";
import Reveal from "./Reveal";

export default function LegalPage({
  title,
  subtitle,
  updated = "Last updated: [To be confirmed]",
  children,
}: {
  title: string;
  subtitle?: string;
  updated?: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <PageHeader eyebrow="Legal" title={title} subtitle={subtitle} />
      <section className="section">
        <div className="container-px mx-auto max-w-3xl">
          <Reveal>
            <p className="mb-8 text-sm text-ink-muted">{updated}</p>
            <div className="prose-herbal">{children}</div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
