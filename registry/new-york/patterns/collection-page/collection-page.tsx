import type { ReactNode } from "react";
import { PageHeader } from "@/registry/new-york/patterns/page-header/page-header";
import { DataTable, type DataColumn } from "@/registry/new-york/patterns/data-table/data-table";
import { LoadingState } from "@/registry/new-york/patterns/loading-state/loading-state";
import { ErrorState } from "@/registry/new-york/patterns/error-state/error-state";
import { EmptyState } from "@/registry/new-york/character/empty-state/empty-state";

export function CollectionPage<T>({
  title,
  description,
  actions,
  rows,
  columns,
  getRowId,
  caption,
  filters,
  filterRow,
  filterKey,
  onSelectionChange,
  renderList,
  loading = false,
  error,
  onRetry,
  empty,
  emptyAction,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
  rows: T[];
  columns: DataColumn<T>[];
  getRowId: (row: T) => string;
  caption: string;
  filters?: ReactNode;
  filterRow?: (row: T) => boolean;
  filterKey?: string | number;
  onSelectionChange?: (ids: string[]) => void;
  renderList?: (rows: T[]) => ReactNode;
  loading?: boolean;
  error?: string;
  onRetry?: () => void;
  empty?: ReactNode;
  emptyAction?: ReactNode;
}) {
  const visibleRows = filterRow ? rows.filter(filterRow) : rows;

  return (
    <main className="stack">
      <PageHeader title={title} description={description} actions={actions} headingLevel={1} />
      {error ? (
        <ErrorState description={error} onRetry={onRetry} />
      ) : (
        <LoadingState loading={loading} initial>
          {rows.length === 0 && !filterRow ? (
            <div role="status">
              {empty ?? (
                <EmptyState
                  kind="initial"
                  title="項目がありません"
                  description="項目を作成すると、ここに表示されます。"
                  action={emptyAction}
                />
              )}
            </div>
          ) : renderList ? (
            <div className="stack">
              <div className="actions">
                {filters}
                <span role="status">{visibleRows.length}件</span>
              </div>
              {visibleRows.length ? (
                renderList(visibleRows)
              ) : (
                <EmptyState
                  kind="filter"
                  title="条件に一致する項目がありません"
                  description="絞り込み条件を変更してください。"
                  action={emptyAction}
                />
              )}
            </div>
          ) : (
            <DataTable
              rows={rows}
              columns={columns}
              getRowId={getRowId}
              caption={caption}
              filters={filters}
              filterRow={filterRow}
              filterKey={filterKey}
              onSelectionChange={onSelectionChange}
              emptyAction={emptyAction}
            />
          )}
        </LoadingState>
      )}
    </main>
  );
}
