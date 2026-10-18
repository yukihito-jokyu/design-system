import { useMotionFeedback } from "@/registry/cobalt/components/theme-provider/motion-feedback";
import * as React from "react";
import { CheckIcon, MinusIcon } from "lucide-react";
import { Checkbox as CheckboxPrimitive } from "radix-ui";
import { cn } from "@/registry/cobalt/lib/utils/utils";
import { type MotionPreference } from "@/registry/cobalt/components/theme-provider/motion-provider";

function Checkbox({
  className,
  ref: forwardedRef,
  motion = "inherit",
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root> & { motion?: MotionPreference }) {
  const { ref, effective } = useMotionFeedback<HTMLButtonElement>({
    motion,
    ref: forwardedRef,
    feedback: "check",
  });

  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      ref={ref}
      data-cobalt-motion={effective}
      className={cn("cobalt-checkbox", className)}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="cobalt-checkbox-indicator"
      >
        <CheckIcon className="cobalt-checkbox-check" aria-hidden="true" />
        <MinusIcon className="cobalt-checkbox-mixed" aria-hidden="true" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
