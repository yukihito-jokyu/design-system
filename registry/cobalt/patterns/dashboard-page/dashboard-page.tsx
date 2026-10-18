import type { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/registry/cobalt/ui/card/card";
import { PageHeader } from "@/registry/cobalt/patterns/page-header/page-header";
import { LoadingState } from "@/registry/cobalt/patterns/loading-state/loading-state";
import { ErrorState } from "@/registry/cobalt/patterns/error-state/error-state";
import { EmptyState } from "@/registry/cobalt/character/empty-state/empty-state";
import {
  MotionProvider,
  type MotionPreference,
} from "@/registry/cobalt/components/theme-provider/motion-provider";

export type DashboardMetric = { label: string; value: ReactNode; description?: string };

export function DashboardPage({
  title,
  description,
  metrics,
  sections,
  actions,
  loading = false,
  error,
  onRetry,
  motion = "inherit",
}: {
  title: string;
  description?: string;
  metrics: DashboardMetric[];
  sections?: ReactNode;
  actions?: ReactNode;
  loading?: boolean;
  error?: string;
  onRetry?: () => void;
  motion?: MotionPreference;
}) {
  return (
    <MotionProvider motion={motion}>
      <main className="cobalt-stack cobalt-pattern-page">
        <PageHeader title={title} description={description} actions={actions} headingLevel={1} />
        {error ? (
          <ErrorState description={error} onRetry={onRetry} />
        ) : (
          <LoadingState loading={loading} initial>
            {metrics.length > 0 && (
              <div className="cobalt-metric-grid">
                {metrics.map((metric) => (
                  <Card key={metric.label}>
                    <CardHeader>
                      <CardTitle>{metric.label}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="cobalt-metric-value">{metric.value}</p>
                      {metric.description && <p className="cobalt-note">{metric.description}</p>}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
            {sections ? (
              <div className="cobalt-stack">{sections}</div>
            ) : (
              metrics.length === 0 && (
                <EmptyState
                  title="指標はありません"
                  description="指標が追加されると、ここに表示されます。"
                />
              )
            )}
          </LoadingState>
        )}
      </main>
    </MotionProvider>
  );
}
