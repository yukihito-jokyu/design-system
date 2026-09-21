import type { ReactNode } from "react";
import { PageHeader } from "@/registry/new-york/patterns/page-header/page-header";
import { LoadingState } from "@/registry/new-york/patterns/loading-state/loading-state";
import { ErrorState } from "@/registry/new-york/patterns/error-state/error-state";

export function DetailPage({
  title,
  description,
  back,
  actions,
  children,
  status = "ready",
  error,
  onRetry,
}: {
  title: string;
  description?: string;
  back?: ReactNode;
  actions?: ReactNode;
  children: ReactNode;
  status?: "ready" | "loading" | "missing" | "forbidden" | "error";
  error?: string;
  onRetry?: () => void;
}) {
  const message =
    status === "missing"
      ? "対象が見つかりません。"
      : status === "forbidden"
        ? "この対象を表示する権限がありません。"
        : (error ?? "詳細を読み込めませんでした。");

  return (
    <main className="stack">
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
          <div className="stack">{children}</div>
        </LoadingState>
      )}
    </main>
  );
}
