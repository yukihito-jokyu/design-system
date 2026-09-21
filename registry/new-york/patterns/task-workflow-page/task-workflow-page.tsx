import type { ComponentProps, ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/registry/new-york/ui/card/card";
import { Badge } from "@/registry/new-york/ui/badge/badge";
import { PageHeader } from "@/registry/new-york/patterns/page-header/page-header";

export type WorkflowTask = {
  id: string;
  title: string;
  description?: string;
  status: "not-started" | "in-progress" | "complete" | "blocked";
  action?: ReactNode;
};

const labels = {
  "not-started": "未開始",
  "in-progress": "進行中",
  complete: "完了",
  blocked: "問題あり",
};

const badgeVariants: Record<WorkflowTask["status"], ComponentProps<typeof Badge>["variant"]> = {
  "not-started": "secondary",
  "in-progress": "warning",
  complete: "success",
  blocked: "destructive",
};

export function TaskWorkflowPage({
  title,
  description,
  tasks,
  complete,
  completionAction,
}: {
  title: string;
  description?: string;
  tasks: WorkflowTask[];
  complete?: boolean;
  completionAction?: ReactNode;
}) {
  const isComplete =
    complete ?? (tasks.length > 0 && tasks.every((task) => task.status === "complete"));

  return (
    <main className="stack">
      <PageHeader title={title} description={description} headingLevel={1} />
      <p role="status" aria-live="polite">
        {tasks.filter((task) => task.status === "complete").length} / {tasks.length} 件完了
      </p>
      <div className="grid gap-[var(--ds-space-4)] sm:grid-cols-2">
        {tasks.map((task) => (
          <Card key={task.id}>
            <CardHeader>
              <CardTitle>{task.title}</CardTitle>
              <Badge variant={badgeVariants[task.status]}>{labels[task.status]}</Badge>
            </CardHeader>
            <CardContent className="stack">
              {task.description && <p>{task.description}</p>}
              {task.action && <div className="actions">{task.action}</div>}
            </CardContent>
          </Card>
        ))}
      </div>
      {isComplete && (
        <div role="status" className="stack">
          <p>すべての作業が完了しました。</p>
          {completionAction}
        </div>
      )}
    </main>
  );
}
