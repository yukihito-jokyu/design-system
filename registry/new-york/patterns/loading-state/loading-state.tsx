import type { ReactNode } from "react";
import { Skeleton } from "@/registry/new-york/ui/skeleton/skeleton";
import { Spinner } from "@/registry/new-york/ui/spinner/spinner";

export function LoadingState({
  loading,
  children,
  label = "読み込み中",
  initial = false,
}: {
  loading: boolean;
  children?: ReactNode;
  label?: string;
  initial?: boolean;
}) {
  return (
    <div aria-busy={loading}>
      <p role="status">
        {loading && (
          <>
            <Spinner aria-hidden="true" />
            {label}
          </>
        )}
      </p>
      {loading && initial ? (
        <div aria-hidden="true" className="stack">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-20 w-full" />
        </div>
      ) : (
        children
      )}
    </div>
  );
}
