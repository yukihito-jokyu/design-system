import { useId, type ReactNode } from "react";
import {
  MotionProvider,
  type MotionPreference,
} from "@/registry/cobalt/components/theme-provider/motion-provider";

export function SettingsSection({
  title,
  description,
  children,
  headingLevel = 3,
  motion = "inherit",
}: {
  title: string;
  description?: string;
  children: ReactNode;
  headingLevel?: 2 | 3;
  motion?: MotionPreference;
}) {
  const id = useId();
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return (
    <MotionProvider motion={motion}>
      <section aria-labelledby={id} className="cobalt-stack cobalt-settings-section">
        <header>
          <Heading id={id}>{title}</Heading>
          {description && <p className="cobalt-note">{description}</p>}
        </header>
        {children}
      </section>
    </MotionProvider>
  );
}
