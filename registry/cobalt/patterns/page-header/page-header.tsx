import type { ReactNode } from "react";
import {
  MotionProvider,
  type MotionPreference,
} from "@/registry/cobalt/components/theme-provider/motion-provider";

export function PageHeader({
  title,
  description,
  actions,
  headingLevel = 2,
  motion = "inherit",
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
  headingLevel?: 1 | 2;
  motion?: MotionPreference;
}) {
  const Heading = headingLevel === 1 ? "h1" : "h2";
  return (
    <MotionProvider motion={motion}>
      <header className="cobalt-page-header">
        <div>
          <Heading>{title}</Heading>
          {description && <p className="cobalt-note">{description}</p>}
        </div>
        {actions && <div className="cobalt-actions">{actions}</div>}
      </header>
    </MotionProvider>
  );
}
