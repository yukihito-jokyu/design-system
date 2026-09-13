import { useId, type ReactNode } from "react";

export function SettingsSection({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  const id = useId();
  return (
    <section aria-labelledby={id} className="stack">
      <header>
        <h3 id={id}>{title}</h3>
        {description && <p className="note">{description}</p>}
      </header>
      {children}
    </section>
  );
}
