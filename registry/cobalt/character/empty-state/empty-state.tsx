import type { ReactNode } from "react";
import { CharacterIcon } from "@/registry/cobalt/character/character-icons/index";
import {
  MotionProvider,
  useDesignMotion,
  type MotionPreference,
} from "@/registry/cobalt/components/theme-provider/motion-provider";

export function EmptyState({
  kind = "initial",
  title,
  description,
  action,
  motion = "inherit",
}: {
  kind?: "initial" | "search" | "filter";
  title: string;
  description: string;
  action?: ReactNode;
  motion?: MotionPreference;
}) {
  const effective = useDesignMotion(motion);
  return (
    <MotionProvider motion={motion}>
      <section
        className="cobalt-empty-state cobalt-character-entry"
        data-cobalt-motion={effective}
        data-empty-kind={kind}
        aria-label={title}
      >
        <CharacterIcon size={64} />
        <h3>{title}</h3>
        <p>{description}</p>
        {action && <div className="cobalt-actions">{action}</div>}
      </section>
    </MotionProvider>
  );
}
