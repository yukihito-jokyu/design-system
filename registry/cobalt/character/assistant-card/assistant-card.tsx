import type { ReactNode } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/registry/cobalt/ui/card/card";
import {
  CharacterIcon,
  StatusBubble,
  type IconDirection,
} from "@/registry/cobalt/character/character-icons/index";
import { SuggestionChip } from "@/registry/cobalt/character/suggestion-chip/suggestion-chip";
import type { MotionPreference } from "@/registry/cobalt/components/theme-provider/motion-provider";

export function AssistantCard({
  title,
  body,
  suggestions = [],
  status,
  direction = "fold",
  motion = "inherit",
}: {
  title: string;
  body: ReactNode;
  suggestions?: { label: string; onSelect: () => void }[];
  status?: "thinking" | "saved";
  direction?: IconDirection;
  motion?: MotionPreference;
}) {
  return (
    <Card motion={motion} className="cobalt-assistant-card">
      <CardHeader>
        <div className="cobalt-assistant-heading">
          <CharacterIcon
            direction={direction}
            expression={status === "thinking" ? "thinking" : "welcome"}
          />
          <CardTitle>{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="cobalt-stack">
        <div>{body}</div>
        {status && (
          <div className="cobalt-actions">
            <StatusBubble direction={direction} status={status} />
          </div>
        )}
        <div className="cobalt-actions">
          {suggestions.map((suggestion, i) => (
            <SuggestionChip key={i} {...suggestion} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
