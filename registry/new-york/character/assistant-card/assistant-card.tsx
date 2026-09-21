import type { ReactNode } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/registry/new-york/ui/card/card";
import {
  CharacterIcon,
  StatusBubble,
  type IconDirection,
} from "@/registry/new-york/character/character-icons/index";
import { SuggestionChip } from "@/registry/new-york/character/suggestion-chip/suggestion-chip";

export function AssistantCard({
  title,
  body,
  suggestions = [],
  status,
  direction = "fold",
}: {
  title: string;
  body: ReactNode;
  suggestions?: { label: string; onSelect: () => void }[];
  status?: "thinking" | "saved";
  direction?: IconDirection;
}) {
  return (
    <Card>
      <CardHeader>
        <div className="actions">
          <CharacterIcon
            direction={direction}
            expression={status === "thinking" ? "thinking" : "welcome"}
          />
          <CardTitle>{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="stack">
        <div>{body}</div>
        {status && <StatusBubble direction={direction} status={status} />}
        <div className="actions">
          {suggestions.map((suggestion, i) => (
            <SuggestionChip key={i} {...suggestion} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
