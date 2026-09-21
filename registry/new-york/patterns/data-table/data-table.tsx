import { useMemo, useState, type ReactNode } from "react";
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
}: {
  rows: T[];
  columns: DataColumn<T>[];
  getRowId: (row: T) => string;
  caption: string;
  pageSize?: number;
  filters?: ReactNode;
  filterRow?: (row: T) => boolean;
  onSelectionChange?: (ids: string[]) => void;
}) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<{ id: string; desc: boolean } | null>(null);
  const [selection, setSelection] = useState<string[]>([]);

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
  return (
    <div className="stack">
      <TableToolbar
        query={query}
        onQueryChange={(q) => {
          setQuery(q);
          setPage(1);
        }}
        count={filtered.length}
      >
        {filters}
        {onSelectionChange && <span>{selected.length}件選択</span>}
      </TableToolbar>
      <Table>
        <TableCaption>{caption}</TableCaption>
        <TableHeader>
          <TableRow>
            {onSelectionChange && <TableHead>選択</TableHead>}
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
                    onClick={() =>
                      setSort({ id: column.id, desc: sort?.id === column.id ? !sort.desc : false })
                    }
                  >
                    {column.header}
                    {sort?.id === column.id ? (sort.desc ? " ↓" : " ↑") : ""}
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
                </TableCell>
              )}
              {columns.map((column) => (
                <TableCell key={column.id}>{column.render?.(row) ?? column.value(row)}</TableCell>
              ))}
            </TableRow>
          ))}
          {!visible.length && (
            <TableRow>
              <TableCell colSpan={columns.length + (onSelectionChange ? 1 : 0)}>
                一致する項目がありません。検索や絞り込みを変更してください。
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
