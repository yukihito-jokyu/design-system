import { useMotionFeedback } from "@/registry/cobalt/components/theme-provider/motion-feedback";
import * as React from "react";
import { cn } from "@/registry/cobalt/lib/utils/utils";
import { type MotionPreference } from "@/registry/cobalt/components/theme-provider/motion-provider";
import { cva, type VariantProps } from "class-variance-authority";
import { Toggle as TogglePrimitive } from "radix-ui";

const toggleVariants = cva("cobalt-toggle", {
  variants: {
    variant: { default: "cobalt-toggle-default", outline: "cobalt-toggle-outline" },
    size: { default: "cobalt-size-md", sm: "cobalt-size-sm", lg: "cobalt-size-lg" },
  },
  defaultVariants: { variant: "default", size: "default" },
});

function Toggle({
  className,
  ref: forwardedRef,
  variant,
  size,
  motion = "inherit",
  ...props
}: React.ComponentProps<typeof TogglePrimitive.Root> &
  VariantProps<typeof toggleVariants> & { motion?: MotionPreference }) {
  const { ref, effective } = useMotionFeedback<HTMLButtonElement>({
    motion,
    ref: forwardedRef,
    feedback: "toggle",
  });

  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      ref={ref}
      data-cobalt-motion={effective}
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Toggle, toggleVariants };
