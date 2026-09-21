import type { ReactNode } from "react";
import { CharacterIcon } from "@/registry/new-york/character/character-icons/index";

export function EmptyState({
  kind = "initial",
  title,
  description,
  action,
}: {
  kind?: "initial" | "search" | "filter";
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <section className="empty-state stack" data-empty-kind={kind} aria-label={title}>
      <CharacterIcon size={64} />
      <h3>{title}</h3>
      <p>{description}</p>
      {action}
    </section>
  );
}
