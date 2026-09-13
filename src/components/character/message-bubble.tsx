import type { ReactNode } from "react";
import { Button } from "../ui/button";

export function MessageBubble({
  author,
  time,
  children,
  status = "sent",
  onRetry,
}: {
  author: string;
  time?: string;
  children: ReactNode;
  status?: "sending" | "sent" | "error";
  onRetry?: () => void;
}) {
  return (
    <article className="message-bubble">
      <header className="actions">
        <strong>{author}</strong>
        {time && <time dateTime={time}>{new Date(time).toLocaleString("ja-JP")}</time>}
      </header>
      <div>{children}</div>
      <p role="status">
        {status === "sending" ? "送信中" : status === "error" ? "送信できませんでした" : ""}
      </p>
      {status === "error" && onRetry && (
        <Button variant="outline" onClick={onRetry}>
          再試行
        </Button>
      )}
    </article>
  );
}
