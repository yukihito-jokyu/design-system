import type { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/registry/new-york/ui/card/card";
import { PageHeader } from "@/registry/new-york/patterns/page-header/page-header";
import { LoadingState } from "@/registry/new-york/patterns/loading-state/loading-state";
import { ErrorState } from "@/registry/new-york/patterns/error-state/error-state";

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
}: {
  title: string;
  description?: string;
  metrics: DashboardMetric[];
  sections?: ReactNode;
  actions?: ReactNode;
  loading?: boolean;
  error?: string;
  onRetry?: () => void;
}) {
  return (
    <main className="stack">
      <PageHeader title={title} description={description} actions={actions} headingLevel={1} />
      {error ? (
        <ErrorState description={error} onRetry={onRetry} />
      ) : (
        <LoadingState loading={loading} initial>
          <div className="grid gap-[var(--ds-space-4)] sm:grid-cols-2 lg:grid-cols-3">
            {metrics.map((metric) => (
              <Card key={metric.label}>
                <CardHeader>
                  <CardTitle>{metric.label}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{metric.value}</p>
                  {metric.description && <p className="note">{metric.description}</p>}
                </CardContent>
              </Card>
            ))}
          </div>
          {sections && <div className="stack">{sections}</div>}
        </LoadingState>
      )}
    </main>
  );
}
