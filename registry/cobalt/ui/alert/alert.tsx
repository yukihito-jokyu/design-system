import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/registry/cobalt/lib/utils/utils";
import {
  MotionProvider,
  type MotionPreference,
} from "@/registry/cobalt/components/theme-provider/motion-provider";
import { useMotionFeedback } from "@/registry/cobalt/components/theme-provider/motion-feedback";

const alertVariants = cva("cobalt-alert", {
  variants: {
    variant: {
      default: "",
      success: "cobalt-alert-success",
      warning: "cobalt-alert-warning",
      destructive: "cobalt-alert-destructive",
    },
  },
  defaultVariants: { variant: "default" },
});

function Alert({
  className,
  ref: forwardedRef,
  motion = "inherit",
  variant,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof alertVariants> & { motion?: MotionPreference }) {
  const { ref, effective } = useMotionFeedback<HTMLDivElement>({
    motion,
    ref: forwardedRef,
    feedback: "status",
  });

  return (
    <MotionProvider motion={motion}>
      <div
        data-slot="alert"
        data-variant={variant ?? "default"}
        data-cobalt-motion={effective}
        ref={ref}
        role="alert"
        className={cn(alertVariants({ variant }), className)}
        {...props}
      />
    </MotionProvider>
  );
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="alert-title" className={cn("cobalt-alert-title", className)} {...props} />;
}

function AlertDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn("cobalt-alert-description", className)}
      {...props}
    />
  );
}

export { Alert, AlertTitle, AlertDescription };
