import type { ReactNode } from "react";
import { SearchField } from "@/registry/cobalt/patterns/search-field/search-field";
import {
  MotionProvider,
  type MotionPreference,
} from "@/registry/cobalt/components/theme-provider/motion-provider";

export function TableToolbar({
  query,
  onQueryChange,
  count,
  children,
  motion = "inherit",
}: {
  query: string;
  onQueryChange: (value: string) => void;
  count: number;
  children?: ReactNode;
  motion?: MotionPreference;
}) {
  return (
    <MotionProvider motion={motion}>
      <div className="cobalt-table-toolbar">
        <SearchField label="一覧を検索" value={query} onValueChange={onQueryChange} />
        <div className="cobalt-actions">
          <span role="status" aria-live="polite" className="cobalt-note">
            {count}件
          </span>
          {children}
        </div>
      </div>
    </MotionProvider>
  );
}
