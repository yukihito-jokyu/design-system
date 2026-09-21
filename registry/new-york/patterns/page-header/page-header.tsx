import type { ReactNode } from "react";

export function PageHeader({
  title,
  description,
  actions,
  headingLevel = 2,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
  headingLevel?: 1 | 2;
}) {
  const Heading = headingLevel === 1 ? "h1" : "h2";
  return (
    <header className="pattern-page-header">
      <div>
        <Heading>{title}</Heading>
        {description && <p className="note">{description}</p>}
      </div>
      {actions && <div className="actions">{actions}</div>}
    </header>
  );
}
