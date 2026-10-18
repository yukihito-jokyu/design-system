import { useMotionFeedback } from "@/registry/cobalt/components/theme-provider/motion-feedback";
import * as React from "react";
import { cn } from "@/registry/cobalt/lib/utils/utils";
import { type MotionPreference } from "@/registry/cobalt/components/theme-provider/motion-provider";
import { Progress as ProgressPrimitive } from "radix-ui";

function Progress({
  className,
  ref: forwardedRef,
  value,
  max = 100,
  motion = "inherit",
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root> & { motion?: MotionPreference }) {
  const { ref, effective } = useMotionFeedback<HTMLDivElement>({
    motion,
    ref: forwardedRef,
    feedback: "complete",
  });

  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      ref={ref}
      data-cobalt-motion={effective}
      value={value}
      max={max}
      className={cn("cobalt-progress", className)}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="cobalt-progress-indicator"
        style={{
          width: `${value == null ? 25 : Math.max(0, Math.min(100, (value / (max > 0 ? max : 100)) * 100))}%`,
        }}
      />
    </ProgressPrimitive.Root>
  );
}

export { Progress };
