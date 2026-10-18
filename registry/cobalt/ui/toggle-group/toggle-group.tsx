import { useMotionFeedback } from "@/registry/cobalt/components/theme-provider/motion-feedback";
import {
  MotionProvider,
  type MotionPreference,
} from "@/registry/cobalt/components/theme-provider/motion-provider";
import * as React from "react";
import { type VariantProps } from "class-variance-authority";
import { cn } from "@/registry/cobalt/lib/utils/utils";
import { ToggleGroup as ToggleGroupPrimitive } from "radix-ui";

import { toggleVariants } from "@/registry/cobalt/ui/toggle/toggle";

const ToggleGroupContext = React.createContext<
  VariantProps<typeof toggleVariants> & {
    spacing?: number;
  }
>({
  size: "default",
  variant: "default",
  spacing: 0,
});

function ToggleGroup({
  className,
  variant,
  size,
  spacing = 0,
  motion = "inherit",
  children,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Root> &
  VariantProps<typeof toggleVariants> & {
    spacing?: number;
    motion?: MotionPreference;
  }) {
  return (
    <MotionProvider motion={motion}>
      <ToggleGroupPrimitive.Root
        data-slot="toggle-group"
        data-variant={variant}
        data-size={size}
        data-spacing={spacing}
        style={{ "--cobalt-toggle-gap": `${spacing * 4}px` } as React.CSSProperties}
        className={cn("cobalt-toggle-group", className)}
        {...props}
      >
        <ToggleGroupContext.Provider value={{ variant, size, spacing }}>
          {children}
        </ToggleGroupContext.Provider>
      </ToggleGroupPrimitive.Root>
    </MotionProvider>
  );
}

function ToggleGroupItem({
  className,
  ref: forwardedRef,
  children,
  variant,
  size,
  motion = "inherit",
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Item> &
  VariantProps<typeof toggleVariants> & { motion?: MotionPreference }) {
  const context = React.useContext(ToggleGroupContext);

  const { ref, effective } = useMotionFeedback<HTMLButtonElement>({
    motion,
    ref: forwardedRef,
    feedback: "toggle",
  });

  return (
    <ToggleGroupPrimitive.Item
      data-slot="toggle-group-item"
      ref={ref}
      data-cobalt-motion={effective}
      data-variant={context.variant || variant}
      data-size={context.size || size}
      data-spacing={context.spacing}
      className={cn(
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size,
        }),
        "cobalt-toggle-group-item",
        className,
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  );
}

export { ToggleGroup, ToggleGroupItem };
