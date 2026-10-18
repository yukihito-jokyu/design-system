import type { ReactNode } from "react";
import { Skeleton } from "@/registry/cobalt/ui/skeleton/skeleton";
import { Spinner } from "@/registry/cobalt/ui/spinner/spinner";
import { useMotionFeedback } from "@/registry/cobalt/components/theme-provider/motion-feedback";
import {
  MotionProvider,
  type MotionPreference,
} from "@/registry/cobalt/components/theme-provider/motion-provider";

export function LoadingState({
  loading,
  children,
  label = "読み込み中",
  initial = false,
  motion = "inherit",
}: {
  loading: boolean;
  children?: ReactNode;
  label?: string;
  initial?: boolean;
  motion?: MotionPreference;
}) {
  const { ref, effective } = useMotionFeedback<HTMLDivElement>({ motion, feedback: "ready" });
  return (
    <MotionProvider motion={motion}>
      <div
        aria-busy={loading}
        data-state={loading ? "loading" : "ready"}
        data-cobalt-motion={effective}
        ref={ref}
        className="cobalt-stack"
      >
        <p role="status" className="cobalt-loading-label">
          {loading && (
            <>
              <Spinner aria-hidden="true" />
              {label}
            </>
          )}
        </p>
        {loading && initial ? (
          <div aria-hidden="true" className="cobalt-stack">
            <Skeleton className="cobalt-loading-heading" />
            <Skeleton className="cobalt-loading-content" />
          </div>
        ) : (
          children
        )}
      </div>
    </MotionProvider>
  );
}
