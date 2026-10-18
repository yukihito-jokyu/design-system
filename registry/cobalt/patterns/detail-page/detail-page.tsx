import type { ReactNode } from "react";
import { PageHeader } from "@/registry/cobalt/patterns/page-header/page-header";
import { LoadingState } from "@/registry/cobalt/patterns/loading-state/loading-state";
import { ErrorState } from "@/registry/cobalt/patterns/error-state/error-state";
import {
  MotionProvider,
  type MotionPreference,
} from "@/registry/cobalt/components/theme-provider/motion-provider";

export function DetailPage({
  title,
  description,
  back,
  actions,
  children,
  status = "ready",
  error,
  onRetry,
  motion = "inherit",
}: {
  title: string;
  description?: string;
  back?: ReactNode;
  actions?: ReactNode;
  children: ReactNode;
  status?: "ready" | "loading" | "missing" | "forbidden" | "error";
  error?: string;
  onRetry?: () => void;
  motion?: MotionPreference;
}) {
  const message =
    status === "missing"
      ? "対象が見つかりません。"
      : status === "forbidden"
        ? "この対象を表示する権限がありません。"
        : (error ?? "詳細を読み込めませんでした。");

  return (
    <MotionProvider motion={motion}>
      <main className="cobalt-stack cobalt-pattern-page">
        {back && <nav aria-label="戻り先">{back}</nav>}
        <PageHeader
          title={title}
          description={description}
          actions={status === "ready" ? actions : undefined}
          headingLevel={1}
        />
        {status === "error" || status === "missing" || status === "forbidden" ? (
          <ErrorState description={message} onRetry={status === "error" ? onRetry : undefined} />
        ) : (
          <LoadingState loading={status === "loading"} initial>
            <div className="cobalt-stack">{children}</div>
          </LoadingState>
        )}
      </main>
    </MotionProvider>
  );
}
