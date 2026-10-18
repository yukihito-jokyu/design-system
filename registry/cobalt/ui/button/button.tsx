import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import { cn } from "@/registry/cobalt/lib/utils/utils";
import { Spinner } from "@/registry/cobalt/ui/spinner/spinner";
import {
  useDesignMotion,
  type MotionPreference,
} from "@/registry/cobalt/components/theme-provider/motion-provider";

const buttonVariants = cva("cobalt-button", {
  variants: {
    variant: {
      default: "cobalt-button-primary",
      destructive: "cobalt-button-destructive",
      outline: "cobalt-button-outline",
      secondary: "cobalt-button-secondary",
      ghost: "cobalt-button-ghost",
      link: "cobalt-button-link",
    },
    size: {
      default: "cobalt-size-md",
      sm: "cobalt-size-sm",
      lg: "cobalt-size-lg",
      icon: "cobalt-size-md cobalt-icon-button",
      "icon-sm": "cobalt-size-sm cobalt-icon-button",
      "icon-lg": "cobalt-size-lg cobalt-icon-button",
    },
  },
  defaultVariants: { variant: "default", size: "default" },
});

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  loading = false,
  motion = "inherit",
  disabled,
  tabIndex,
  onClick,
  onClickCapture,
  onKeyDownCapture,
  children,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    loading?: boolean;
    asChild?: boolean;
    motion?: MotionPreference;
  }) {
  const Comp = asChild ? Slot.Root : "button";
  const effective = useDesignMotion(motion);
  const unavailable = disabled || loading;

  return (
    <Comp
      {...props}
      data-slot="button"
      data-variant={variant}
      data-size={size}
      data-cobalt-motion={effective}
      className={cn(buttonVariants({ variant, size, className }))}
      disabled={asChild ? undefined : unavailable}
      aria-disabled={unavailable || undefined}
      aria-busy={loading || undefined}
      tabIndex={asChild && unavailable ? -1 : tabIndex}
      onClickCapture={(event) => {
        if (unavailable) {
          event.preventDefault();
          event.stopPropagation();
          return;
        }
        onClickCapture?.(event);
      }}
      onKeyDownCapture={(event) => {
        if (unavailable && (event.key === "Enter" || event.key === " ")) {
          event.preventDefault();
          event.stopPropagation();
          return;
        }
        onKeyDownCapture?.(event);
      }}
      onClick={(event) => {
        if (unavailable) {
          event.preventDefault();
          event.stopPropagation();
          return;
        }
        onClick?.(event);
      }}
    >
      {asChild ? (
        children
      ) : (
        <>
          {loading && (
            <Spinner motion={motion} className="cobalt-button-spinner" aria-hidden="true" />
          )}
          {children}
        </>
      )}
    </Comp>
  );
}

export { Button, buttonVariants };
