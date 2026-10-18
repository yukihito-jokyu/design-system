import { useMotionEntry } from "@/registry/cobalt/components/theme-provider/motion-feedback";
import * as React from "react";
import { cn } from "@/registry/cobalt/lib/utils/utils";
import {
  MotionProvider,
  type MotionPreference,
} from "@/registry/cobalt/components/theme-provider/motion-provider";
import {
  DesignThemeProvider,
  useDesignTheme,
  useDesignTokens,
} from "@/registry/cobalt/components/theme-provider/theme-provider";
import { Tooltip as TooltipPrimitive } from "radix-ui";

function TooltipProvider({
  delayDuration = 0,
  motion = "inherit",
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider> & { motion?: MotionPreference }) {
  return (
    <MotionProvider motion={motion}>
      <TooltipPrimitive.Provider
        data-slot="tooltip-provider"
        delayDuration={delayDuration}
        {...props}
      />
    </MotionProvider>
  );
}

function Tooltip({
  motion = "inherit",
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Root> & { motion?: MotionPreference }) {
  return (
    <MotionProvider motion={motion}>
      <TooltipPrimitive.Root data-slot="tooltip" {...props} />
    </MotionProvider>
  );
}

function TooltipTrigger(props: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />;
}

function TooltipContent({
  className,
  ref: forwardedRef,
  sideOffset = 0,
  collisionPadding = 8,
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content>) {
  const theme = useDesignTheme();
  const tokens = useDesignTokens();
  const { ref, effective } = useMotionEntry<HTMLDivElement>(forwardedRef);
  return (
    <TooltipPrimitive.Portal>
      <DesignThemeProvider theme={theme} tokens={tokens}>
        <TooltipPrimitive.Content
          data-slot="tooltip-content"
          ref={ref}
          data-cobalt-motion={effective}
          sideOffset={sideOffset}
          collisionPadding={collisionPadding}
          className={cn("cobalt-tooltip", className)}
          {...props}
        >
          {children}
          <TooltipPrimitive.Arrow className="cobalt-tooltip-arrow" />
        </TooltipPrimitive.Content>
      </DesignThemeProvider>
    </TooltipPrimitive.Portal>
  );
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
