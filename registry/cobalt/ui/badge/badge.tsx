import { useMotionFeedback } from "@/registry/cobalt/components/theme-provider/motion-feedback";
import {
  MotionProvider,
  type MotionPreference,
} from "@/registry/cobalt/components/theme-provider/motion-provider";
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import { CheckIcon, MinusIcon } from "lucide-react";
import { cn } from "@/registry/cobalt/lib/utils/utils";

const badgeVariants = cva("cobalt-badge", {
  variants: {
    variant: {
      default: "cobalt-badge-default",
      success: "cobalt-badge-success",
      warning: "cobalt-badge-warning",
      secondary: "cobalt-badge-secondary",
      destructive: "cobalt-badge-destructive",
      outline: "cobalt-badge-outline",
      ghost: "cobalt-badge-ghost",
      link: "cobalt-badge-link",
    },
  },
  defaultVariants: { variant: "default" },
});

function Badge({
  className,
  ref: forwardedRef,
  motion = "inherit",
  variant = "default",
  asChild = false,
  children,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean; motion?: MotionPreference }) {
  const { ref, effective } = useMotionFeedback<HTMLSpanElement>({
    motion,
    ref: forwardedRef,
    feedback: "status",
  });

  const Comp = asChild ? Slot.Root : "span";

  const mark =
    variant === "success" ? (
      <CheckIcon />
    ) : variant === "warning" || variant === "destructive" ? (
      "!"
    ) : variant === "secondary" ? (
      <MinusIcon />
    ) : null;

  // asChildでは既存と同じく、渡された要素をそのまま装飾する。
  return (
    <MotionProvider motion={motion}>
      <Comp
        data-slot="badge"
        data-cobalt-motion={effective}
        ref={ref}
        data-variant={variant}
        className={cn(badgeVariants({ variant }), className)}
        {...props}
      >
        {asChild ? (
          children
        ) : (
          <>
            {mark && (
              <span className="cobalt-badge-mark" aria-hidden="true">
                {mark}
              </span>
            )}
            {children}
          </>
        )}
      </Comp>
    </MotionProvider>
  );
}

export { Badge, badgeVariants };
