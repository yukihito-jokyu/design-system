import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from "@/registry/new-york/ui/table/table";
import { Button } from "@/registry/new-york/ui/button/button";
import { Checkbox } from "@/registry/new-york/ui/checkbox/checkbox";
import { TableToolbar } from "@/registry/new-york/patterns/table-toolbar/table-toolbar";
import { EmptyState } from "@/registry/new-york/character/empty-state/empty-state";
export type DataColumn<T> = {
  id: string;
  header: string;
  value: (row: T) => string | number;
  render?: (row: T) => ReactNode;
  sortable?: boolean;
};

export function DataTable<T>({
  rows,
  columns,
  getRowId,
  caption,
  pageSize = 5,
  filters,
  filterRow,
  onSelectionChange,
  filterKey,
  selectionScope = "page",
  emptyAction,
}: {
  rows: T[];
  columns: DataColumn<T>[];
  getRowId: (row: T) => string;
  caption: string;
  pageSize?: number;
  filters?: ReactNode;
  filterRow?: (row: T) => boolean;
  onSelectionChange?: (ids: string[]) => void;
  filterKey?: string | number;
  selectionScope?: "page" | "filtered";
  emptyAction?: ReactNode;
}) {
  const [query, setQuery] = useState("");
  const [pageState, setPageState] = useState({ key: filterKey, value: 1 });
  const [sort, setSort] = useState<{ id: string; desc: boolean } | null>(null);
  const [selectionState, setSelectionState] = useState({ key: filterKey, value: [] as string[] });
  const previousFilterKey = useRef(filterKey);
  const page = pageState.key === filterKey ? pageState.value : 1;
  const selection = selectionState.key === filterKey ? selectionState.value : [];
  const setPage = (value: number) => setPageState({ key: filterKey, value });
  const setSelection = (value: string[]) => setSelectionState({ key: filterKey, value });

  useEffect(() => {
    if (previousFilterKey.current !== filterKey) {
      previousFilterKey.current = filterKey;
      onSelectionChange?.([]);
    }
  }, [filterKey, onSelectionChange]);

  const filtered = useMemo(() => {
    const list = rows.filter(
      (row) =>
        (!filterRow || filterRow(row)) &&
        columns.some((c) =>
          String(c.value(row)).toLocaleLowerCase().includes(query.toLocaleLowerCase()),
        ),
    );

    const column = columns.find((c) => c.id === sort?.id);
    return column
      ? list.sort((a, b) => {
          const av = column.value(a),
            bv = column.value(b);

          return (
            (typeof av === "number" && typeof bv === "number"
              ? av - bv
              : String(av).localeCompare(String(bv), "ja", { numeric: true })) *
            (sort?.desc ? -1 : 1)
          );
        })
      : list;
  }, [rows, columns, query, sort, filterRow]);

  const limit = Math.max(1, Math.floor(pageSize) || 5);
  const pages = Math.max(1, Math.ceil(filtered.length / limit));
  const current = Math.min(page, pages);
  const visible = filtered.slice((current - 1) * limit, current * limit);
  const selected = selection.filter((id) => rows.some((row) => getRowId(row) === id));
  const selectable = selectionScope === "filtered" ? filtered : visible;
  const selectableIds = selectable.map(getRowId);

  const allSelected =
    selectableIds.length > 0 && selectableIds.every((id) => selected.includes(id));

  const someSelected = selectableIds.some((id) => selected.includes(id));
  return (
    <div className="stack">
      <TableToolbar
        query={query}
        onQueryChange={(q) => {
          setQuery(q);
          setPage(1);
          setSelection([]);
          onSelectionChange?.([]);
        }}
        count={filtered.length}
      >
        {filters}
        {onSelectionChange && <span>{selected.length}件選択</span>}
      </TableToolbar>
      <Table className="table-fixed">
        <TableCaption>{caption}</TableCaption>
        <colgroup>
          {onSelectionChange && <col style={{ width: "var(--ds-control-height-md)" }} />}
          {columns.map((column) => (
            <col key={column.id} />
          ))}
        </colgroup>
        <TableHeader>
          <TableRow>
            {onSelectionChange && (
              <TableHead>
                <span className="inline-flex items-center align-middle">
                  <Checkbox
                    aria-label={`${selectionScope === "page" ? "表示中" : "絞り込み後"}の項目をすべて選択`}
                    disabled={selectableIds.length === 0}
                    checked={allSelected ? true : someSelected ? "indeterminate" : false}
                    onCheckedChange={(checked) => {
                      const next = checked
                        ? [...new Set([...selected, ...selectableIds])]
                        : selected.filter((id) => !selectableIds.includes(id));

                      setSelection(next);
                      onSelectionChange(next);
                    }}
                  />
                </span>
              </TableHead>
            )}
            {columns.map((column) => (
              <TableHead
                key={column.id}
                aria-sort={
                  sort?.id === column.id
                    ? sort.desc
                      ? "descending"
                      : "ascending"
                    : column.sortable
                      ? "none"
                      : undefined
                }
              >
                {column.sortable ? (
                  <Button
                    variant="ghost"
                    className="!px-0 !border-0"
                    onClick={() =>
                      setSort((current) =>
                        current?.id !== column.id
                          ? { id: column.id, desc: false }
                          : current.desc
                            ? null
                            : { id: column.id, desc: true },
                      )
                    }
                  >
                    {column.header}
                    <span
                      className="inline-block w-[var(--ds-space-4)] text-center"
                      aria-hidden="true"
                    >
                      {sort?.id === column.id ? (sort.desc ? "↓" : "↑") : ""}
                    </span>
                  </Button>
                ) : (
                  column.header
                )}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {visible.map((row) => (
            <TableRow key={getRowId(row)}>
              {onSelectionChange && (
                <TableCell>
                  <span className="inline-flex items-center align-middle">
                    <Checkbox
                      aria-label={`${columns[0]?.value(row)}を選択`}
                      checked={selected.includes(getRowId(row))}
                      onCheckedChange={(checked) => {
                        const next = checked
                          ? [...selected, getRowId(row)]
                          : selected.filter((id) => id !== getRowId(row));

                        setSelection(next);
                        onSelectionChange(next);
                      }}
                    />
                  </span>
                </TableCell>
              )}
              {columns.map((column) => (
                <TableCell key={column.id}>{column.render?.(row) ?? column.value(row)}</TableCell>
              ))}
            </TableRow>
          ))}
          {!visible.length && (
            <TableRow>
              <TableCell
                colSpan={columns.length + (onSelectionChange ? 1 : 0)}
                className="whitespace-normal"
              >
                <EmptyState
                  kind={query ? "search" : filterRow ? "filter" : "initial"}
                  title={query ? "検索に一致する項目がありません" : "項目がありません"}
                  description={
                    query || filterRow
                      ? "検索や絞り込みを変更してください。"
                      : "項目を作成すると、ここに表示されます。"
                  }
                  action={emptyAction}
                />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <nav className="actions" aria-label={`${caption}のページ送り`}>
        <Button variant="outline" disabled={current === 1} onClick={() => setPage(current - 1)}>
          前へ
        </Button>
        <span aria-live="polite">
          {current} / {pages}
        </span>
        <Button variant="outline" disabled={current === pages} onClick={() => setPage(current + 1)}>
          次へ
        </Button>
      </nav>
    </div>
  );
}
