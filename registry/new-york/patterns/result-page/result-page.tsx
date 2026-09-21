import type { ReactNode } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/registry/new-york/ui/alert/alert";
import { Button } from "@/registry/new-york/ui/button/button";
import { PageHeader } from "@/registry/new-york/patterns/page-header/page-header";

export function ResultPage({
  title,
  description,
  status,
  details,
  targetLink,
  action,
  onRetry,
}: {
  title: string;
  description: string;
  status: "success" | "partial" | "failure";
  details?: ReactNode;
  targetLink?: ReactNode;
  action?: ReactNode;
  onRetry?: () => void;
}) {
  return (
    <main className="stack">
      <PageHeader title={title} description={description} headingLevel={1} />
      <Alert variant={status === "failure" ? "destructive" : "default"} role="status">
        <AlertTitle>
          {status === "success"
            ? "完了"
            : status === "partial"
              ? "一部完了"
              : "完了できませんでした"}
        </AlertTitle>
        <AlertDescription>{details}</AlertDescription>
      </Alert>
      <div className="actions">
        {targetLink}
        {status === "success" && action}
        {status !== "success" && onRetry && (
          <Button type="button" onClick={onRetry}>
            再試行
          </Button>
        )}
      </div>
    </main>
  );
}
