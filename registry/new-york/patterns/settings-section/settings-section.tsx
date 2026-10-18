import { useId, type ReactNode } from "react";

export function SettingsSection({
  title,
  description,
  children,
  headingLevel = 3,
}: {
  title: string;
  description?: string;
  children: ReactNode;
  headingLevel?: 2 | 3;
}) {
  const id = useId();
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return (
    <section aria-labelledby={id} className="stack">
      <header>
        <Heading id={id}>{title}</Heading>
        {description && <p className="note">{description}</p>}
      </header>
      {children}
    </section>
  );
}
