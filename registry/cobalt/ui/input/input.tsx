import { useMotionFeedback } from "@/registry/cobalt/components/theme-provider/motion-feedback";
import * as React from "react";
import { cn } from "@/registry/cobalt/lib/utils/utils";
import { type MotionPreference } from "@/registry/cobalt/components/theme-provider/motion-provider";

function Input({
  className,
  ref: forwardedRef,
  type,
  controlSize = "md",
  motion = "inherit",
  ...props
}: React.ComponentProps<"input"> & {
  controlSize?: "sm" | "md" | "lg";
  motion?: MotionPreference;
}) {
  const { ref, effective } = useMotionFeedback<HTMLInputElement>({
    motion,
    ref: forwardedRef,
    feedback: "invalid",
  });

  return (
    <input
      type={type}
      data-slot="input"
      ref={ref}
      data-size={controlSize}
      data-cobalt-motion={effective}
      className={cn("cobalt-input", className)}
      {...props}
    />
  );
}

export { Input };
