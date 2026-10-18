import { useMotionEntry } from "@/registry/cobalt/components/theme-provider/motion-feedback";
import * as React from "react";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { Select as SelectPrimitive } from "radix-ui";
import { cn } from "@/registry/cobalt/lib/utils/utils";
import {
  DesignThemeProvider,
  useDesignTheme,
  useDesignTokens,
} from "@/registry/cobalt/components/theme-provider/theme-provider";
import {
  MotionProvider,
  useDesignMotion,
  type MotionPreference,
} from "@/registry/cobalt/components/theme-provider/motion-provider";

function Select({
  motion = "inherit",
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Root> & { motion?: MotionPreference }) {
  return (
    <MotionProvider motion={motion}>
      <SelectPrimitive.Root {...props} />
    </MotionProvider>
  );
}

function SelectGroup(props: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />;
}

function SelectValue(props: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />;
}

function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & { size?: "sm" | "default" }) {
  const effective = useDesignMotion();
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      data-cobalt-motion={effective}
      className={cn("cobalt-input cobalt-select-trigger", className)}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon aria-hidden="true" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

function SelectContent({
  className,
  ref: forwardedRef,
  children,
  position = "item-aligned",
  align = "center",
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  const theme = useDesignTheme();
  const tokens = useDesignTokens();
  const { ref, effective } = useMotionEntry<HTMLDivElement>(forwardedRef);
  return (
    <SelectPrimitive.Portal>
      <DesignThemeProvider theme={theme} tokens={tokens}>
        <SelectPrimitive.Content
          data-slot="select-content"
          ref={ref}
          data-cobalt-motion={effective}
          className={cn("cobalt-select-content", className)}
          position={position}
          align={align}
          {...props}
        >
          <SelectScrollUpButton />
          <SelectPrimitive.Viewport className="cobalt-select-viewport">
            {children}
          </SelectPrimitive.Viewport>
          <SelectScrollDownButton />
        </SelectPrimitive.Content>
      </DesignThemeProvider>
    </SelectPrimitive.Portal>
  );
}

function SelectLabel({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn("cobalt-select-label", className)}
      {...props}
    />
  );
}

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn("cobalt-select-item", className)}
      {...props}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <span className="cobalt-select-indicator">
        <SelectPrimitive.ItemIndicator>
          <CheckIcon aria-hidden="true" />
        </SelectPrimitive.ItemIndicator>
      </span>
    </SelectPrimitive.Item>
  );
}

function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("cobalt-select-separator", className)}
      {...props}
    />
  );
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn("cobalt-select-scroll", className)}
      {...props}
    >
      <ChevronUpIcon aria-hidden="true" />
    </SelectPrimitive.ScrollUpButton>
  );
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn("cobalt-select-scroll", className)}
      {...props}
    >
      <ChevronDownIcon aria-hidden="true" />
    </SelectPrimitive.ScrollDownButton>
  );
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};
