import { useMotionEntry } from "@/registry/cobalt/components/theme-provider/motion-feedback";
import * as React from "react";
import { cn } from "@/registry/cobalt/lib/utils/utils";
import {
  MotionProvider,
  type MotionPreference,
} from "@/registry/cobalt/components/theme-provider/motion-provider";
import { Popover as PopoverPrimitive } from "radix-ui";
import {
  DesignThemeProvider,
  useDesignTheme,
  useDesignTokens,
} from "@/registry/cobalt/components/theme-provider/theme-provider";

function Popover({
  motion = "inherit",
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Root> & { motion?: MotionPreference }) {
  return (
    <MotionProvider motion={motion}>
      <PopoverPrimitive.Root {...props} />
    </MotionProvider>
  );
}

function PopoverTrigger(props: React.ComponentProps<typeof PopoverPrimitive.Trigger>) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />;
}

function PopoverContent({
  className,
  ref: forwardedRef,
  align = "center",
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Content>) {
  const theme = useDesignTheme();
  const tokens = useDesignTokens();
  const { ref, effective } = useMotionEntry<HTMLDivElement>(forwardedRef);
  return (
    <PopoverPrimitive.Portal>
      <DesignThemeProvider theme={theme} tokens={tokens}>
        <PopoverPrimitive.Content
          data-slot="popover-content"
          ref={ref}
          data-cobalt-motion={effective}
          align={align}
          sideOffset={sideOffset}
          className={cn("cobalt-popover", className)}
          {...props}
        />
      </DesignThemeProvider>
    </PopoverPrimitive.Portal>
  );
}

function PopoverAnchor(props: React.ComponentProps<typeof PopoverPrimitive.Anchor>) {
  return <PopoverPrimitive.Anchor data-slot="popover-anchor" {...props} />;
}

function PopoverHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="popover-header" className={cn("cobalt-stack", className)} {...props} />;
}

function PopoverTitle({ className, ...props }: React.ComponentProps<"h2">) {
  return (
    <h2 data-slot="popover-title" className={cn("cobalt-popover-title", className)} {...props} />
  );
}

function PopoverDescription({ className, ...props }: React.ComponentProps<"p">) {
  return <p data-slot="popover-description" className={cn("cobalt-note", className)} {...props} />;
}

export {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverAnchor,
  PopoverHeader,
  PopoverTitle,
  PopoverDescription,
};
