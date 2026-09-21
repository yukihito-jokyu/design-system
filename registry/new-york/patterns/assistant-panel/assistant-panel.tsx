import type { ComponentProps } from "react";
import { AssistantCard } from "@/registry/new-york/character/assistant-card/assistant-card";
import { IconButton } from "@/registry/new-york/ui/icon-button/icon-button";
import { XIcon } from "lucide-react";

export function AssistantPanel({
  onClose,
  ...props
}: ComponentProps<typeof AssistantCard> & { onClose?: () => void }) {
  return (
    <section aria-label="作業のサポート" className="stack">
      {onClose && (
        <IconButton aria-label="サポートを閉じる" variant="ghost" onClick={onClose}>
          <XIcon size={20} />
        </IconButton>
      )}
      <AssistantCard {...props} />
    </section>
  );
}
