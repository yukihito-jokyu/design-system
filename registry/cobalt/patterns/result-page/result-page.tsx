import type { ReactNode } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/registry/cobalt/ui/alert/alert";
import { Button } from "@/registry/cobalt/ui/button/button";
import { PageHeader } from "@/registry/cobalt/patterns/page-header/page-header";
import {
  MotionProvider,
  type MotionPreference,
} from "@/registry/cobalt/components/theme-provider/motion-provider";

export function ResultPage({
  title,
  description,
  status,
  details,
  targetLink,
  action,
  onRetry,
  motion = "inherit",
}: {
  title: string;
  description: string;
  status: "success" | "partial" | "failure";
  details?: ReactNode;
  targetLink?: ReactNode;
  action?: ReactNode;
  onRetry?: () => void;
  motion?: MotionPreference;
}) {
  return (
    <MotionProvider motion={motion}>
      <main className="cobalt-stack cobalt-pattern-page">
        <PageHeader title={title} description={description} headingLevel={1} />
        <Alert
          variant={
            status === "failure" ? "destructive" : status === "success" ? "success" : "warning"
          }
          role="status"
        >
          <AlertTitle>
            {status === "success"
              ? "完了"
              : status === "partial"
                ? "一部完了"
                : "完了できませんでした"}
          </AlertTitle>
          <AlertDescription>{details}</AlertDescription>
        </Alert>
        <div className="cobalt-actions">
          {targetLink}
          {status === "success" && action}
          {status !== "success" && onRetry && (
            <Button type="button" onClick={onRetry}>
              再試行
            </Button>
          )}
        </div>
      </main>
    </MotionProvider>
  );
}
