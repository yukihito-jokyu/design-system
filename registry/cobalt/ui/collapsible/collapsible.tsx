import { useMotionEntry } from "@/registry/cobalt/components/theme-provider/motion-feedback";
import * as React from "react";
import { cn } from "@/registry/cobalt/lib/utils/utils";
import {
  MotionProvider,
  useDesignMotion,
  type MotionPreference,
} from "@/registry/cobalt/components/theme-provider/motion-provider";
import { Collapsible as CollapsiblePrimitive } from "radix-ui";

function Collapsible({
  motion = "inherit",
  className,
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.Root> & { motion?: MotionPreference }) {
  const effective = useDesignMotion(motion);
  return (
    <MotionProvider motion={motion}>
      <CollapsiblePrimitive.Root
        data-slot="collapsible"
        data-cobalt-motion={effective}
        className={cn("cobalt-collapsible", className)}
        {...props}
      />
    </MotionProvider>
  );
}

function CollapsibleTrigger({
  className,
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleTrigger>) {
  const effective = useDesignMotion();
  return (
    <CollapsiblePrimitive.CollapsibleTrigger
      data-slot="collapsible-trigger"
      data-cobalt-motion={effective}
      className={cn("cobalt-collapsible-trigger", className)}
      {...props}
    />
  );
}

function CollapsibleContent({
  className,
  ref: forwardedRef,
  children,
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleContent>) {
  const { ref, effective } = useMotionEntry<HTMLDivElement>(forwardedRef);
  return (
    <CollapsiblePrimitive.CollapsibleContent
      data-slot="collapsible-content"
      ref={ref}
      data-cobalt-motion={effective}
      className={cn("cobalt-collapsible-content", className)}
      {...props}
    >
      {/* asChildの要素は維持し、通常は実寸で開くための内側の枠を置く。 */}
      {props.asChild ? children : <div className="cobalt-collapsible-body">{children}</div>}
    </CollapsiblePrimitive.CollapsibleContent>
  );
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
