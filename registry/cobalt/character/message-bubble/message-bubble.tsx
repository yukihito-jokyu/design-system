import type { ReactNode } from "react";
import { Button } from "@/registry/cobalt/ui/button/button";
import { useMotionFeedback } from "@/registry/cobalt/components/theme-provider/motion-feedback";
import {
  MotionProvider,
  type MotionPreference,
} from "@/registry/cobalt/components/theme-provider/motion-provider";

export function MessageBubble({
  author,
  time,
  children,
  status = "sent",
  onRetry,
  motion = "inherit",
}: {
  author: string;
  time?: string;
  children: ReactNode;
  status?: "sending" | "sent" | "error";
  onRetry?: () => void;
  motion?: MotionPreference;
}) {
  const { ref, effective } = useMotionFeedback<HTMLElement>({ motion, feedback: "message" });
  return (
    <MotionProvider motion={motion}>
      <article
        ref={ref}
        className="cobalt-message-bubble cobalt-character-entry"
        data-cobalt-motion={effective}
        data-status={status}
      >
        <header className="cobalt-actions">
          <strong>{author}</strong>
          {time && <time dateTime={time}>{new Date(time).toLocaleString("ja-JP")}</time>}
        </header>
        <div>{children}</div>
        <p role="status" className="cobalt-message-status">
          {status === "sending" ? "送信中" : status === "error" ? "送信できませんでした" : ""}
        </p>
        {status === "error" && onRetry && (
          <Button variant="outline" onClick={onRetry}>
            再試行
          </Button>
        )}
      </article>
    </MotionProvider>
  );
}
