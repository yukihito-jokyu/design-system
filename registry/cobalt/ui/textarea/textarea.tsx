import { useMotionFeedback } from "@/registry/cobalt/components/theme-provider/motion-feedback";
import * as React from "react";
import { cn } from "@/registry/cobalt/lib/utils/utils";
import { type MotionPreference } from "@/registry/cobalt/components/theme-provider/motion-provider";

function Textarea({
  className,
  ref: forwardedRef,
  motion = "inherit",
  ...props
}: React.ComponentProps<"textarea"> & { motion?: MotionPreference }) {
  const { ref, effective } = useMotionFeedback<HTMLTextAreaElement>({
    motion,
    ref: forwardedRef,
    feedback: "invalid",
  });

  return (
    <textarea
      data-slot="textarea"
      ref={ref}
      data-cobalt-motion={effective}
      className={cn("cobalt-input cobalt-textarea", className)}
      {...props}
    />
  );
}

export { Textarea };
