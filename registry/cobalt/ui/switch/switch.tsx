import { useMotionFeedback } from "@/registry/cobalt/components/theme-provider/motion-feedback";
import * as React from "react";
import { cn } from "@/registry/cobalt/lib/utils/utils";
import { type MotionPreference } from "@/registry/cobalt/components/theme-provider/motion-provider";
import { Switch as SwitchPrimitive } from "radix-ui";

function Switch({
  className,
  ref: forwardedRef,
  size = "default",
  motion = "inherit",
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root> & {
  size?: "sm" | "default";
  motion?: MotionPreference;
}) {
  const { ref, effective } = useMotionFeedback<HTMLButtonElement>({
    motion,
    ref: forwardedRef,
    feedback: "switch",
  });

  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      ref={ref}
      data-size={size}
      data-cobalt-motion={effective}
      className={cn("cobalt-switch", className)}
      {...props}
    >
      <SwitchPrimitive.Thumb data-slot="switch-thumb" className="cobalt-switch-thumb" />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
