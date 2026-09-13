import type { ReactNode } from "react";
import { SearchField } from "./search-field";

export function TableToolbar({
  query,
  onQueryChange,
  count,
  children,
}: {
  query: string;
  onQueryChange: (value: string) => void;
  count: number;
  children?: ReactNode;
}) {
  return (
    <div className="stack">
      <SearchField label="一覧を検索" value={query} onValueChange={onQueryChange} />
      <div className="actions">
        <span>{count}件</span>
        {children}
      </div>
    </div>
  );
}
