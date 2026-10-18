import * as React from "react";
import { cn } from "@/registry/cobalt/lib/utils/utils";
import {
  MotionProvider,
  useDesignMotion,
  type MotionPreference,
} from "@/registry/cobalt/components/theme-provider/motion-provider";
import { cva, type VariantProps } from "class-variance-authority";
import { Tabs as TabsPrimitive } from "radix-ui";
import { useSelectionIndicator } from "@/registry/cobalt/components/theme-provider/motion-layout";

function Tabs({
  className,
  orientation = "horizontal",
  motion = "inherit",
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root> & { motion?: MotionPreference }) {
  const effective = useDesignMotion(motion);
  return (
    <MotionProvider motion={motion}>
      <TabsPrimitive.Root
        data-slot="tabs"
        data-orientation={orientation}
        orientation={orientation}
        data-cobalt-motion={effective}
        className={cn("cobalt-tabs", className)}
        {...props}
      />
    </MotionProvider>
  );
}

const tabsListVariants = cva("cobalt-tabs-list", {
  variants: { variant: { default: "cobalt-tabs-list-default", line: "cobalt-tabs-list-line" } },
  defaultVariants: { variant: "default" },
});

function TabsList({
  className,
  children,
  ref: forwardedRef,
  variant = "default",
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List> & VariantProps<typeof tabsListVariants>) {
  const { ref, effective } = useSelectionIndicator(forwardedRef);
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      ref={ref}
      data-cobalt-motion={effective}
      data-variant={variant}
      className={cn(tabsListVariants({ variant }), className)}
      {...props}
    >
      {children}
      {!props.asChild && <span className="cobalt-tabs-indicator" aria-hidden="true" />}
    </TabsPrimitive.List>
  );
}

function TabsTrigger({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  const effective = useDesignMotion();
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      data-cobalt-motion={effective}
      className={cn("cobalt-tabs-trigger", className)}
      {...props}
    />
  );
}

function TabsContent({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) {
  const effective = useDesignMotion();
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      data-cobalt-motion={effective}
      className={cn("cobalt-tabs-content", className)}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants };
