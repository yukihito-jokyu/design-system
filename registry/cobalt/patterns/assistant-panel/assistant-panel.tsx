import type { ComponentProps } from "react";
import { AssistantCard } from "@/registry/cobalt/character/assistant-card/assistant-card";
import { IconButton } from "@/registry/cobalt/ui/icon-button/icon-button";
import { XIcon } from "lucide-react";
import { MotionProvider } from "@/registry/cobalt/components/theme-provider/motion-provider";

export function AssistantPanel({
  onClose,
  motion = "inherit",
  ...props
}: ComponentProps<typeof AssistantCard> & { onClose?: () => void }) {
  return (
    <MotionProvider motion={motion}>
      <section aria-label="作業のサポート" className="cobalt-assistant-panel">
        {onClose && (
          <IconButton type="button" aria-label="サポートを閉じる" variant="ghost" onClick={onClose}>
            <XIcon size={20} />
          </IconButton>
        )}
        <AssistantCard {...props} />
      </section>
    </MotionProvider>
  );
}
