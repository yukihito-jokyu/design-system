import type { ComponentProps, ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/registry/cobalt/ui/card/card";
import { Badge } from "@/registry/cobalt/ui/badge/badge";
import { PageHeader } from "@/registry/cobalt/patterns/page-header/page-header";
import { EmptyState } from "@/registry/cobalt/character/empty-state/empty-state";
import {
  MotionProvider,
  useDesignMotion,
  type MotionPreference,
} from "@/registry/cobalt/components/theme-provider/motion-provider";

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
  motion = "inherit",
}: {
  title: string;
  description?: string;
  tasks: WorkflowTask[];
  complete?: boolean;
  completionAction?: ReactNode;
  motion?: MotionPreference;
}) {
  const effective = useDesignMotion(motion);

  const isComplete =
    complete ?? (tasks.length > 0 && tasks.every((task) => task.status === "complete"));

  return (
    <MotionProvider motion={motion}>
      <main className="cobalt-stack cobalt-pattern-page">
        <PageHeader title={title} description={description} headingLevel={1} />
        <p role="status" aria-live="polite">
          {tasks.filter((task) => task.status === "complete").length} / {tasks.length} 件完了
        </p>
        {tasks.length > 0 ? (
          <div className="cobalt-workflow-grid">
            {tasks.map((task) => (
              <Card key={task.id}>
                <CardHeader>
                  <CardTitle>{task.title}</CardTitle>
                  <div className="cobalt-actions">
                    <Badge variant={badgeVariants[task.status]}>{labels[task.status]}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="cobalt-stack">
                  {task.description && <p>{task.description}</p>}
                  {task.action && <div className="cobalt-actions">{task.action}</div>}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          !isComplete && (
            <EmptyState
              title="作業はありません"
              description="作業が追加されると、ここに表示されます。"
            />
          )
        )}
        {isComplete && (
          <div
            role="status"
            className="cobalt-stack cobalt-workflow-complete cobalt-feedback-notice"
            data-cobalt-motion={effective}
          >
            <p>すべての作業が完了しました。</p>
            {completionAction}
          </div>
        )}
      </main>
    </MotionProvider>
  );
}
