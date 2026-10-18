import * as React from "react";
import { cn } from "@/registry/cobalt/lib/utils/utils";
import {
  MotionProvider,
  useDesignMotion,
  type MotionPreference,
} from "@/registry/cobalt/components/theme-provider/motion-provider";

function Card({
  className,
  variant = "surface",
  motion = "inherit",
  ...props
}: React.ComponentProps<"div"> & {
  variant?: "surface" | "soft";
  motion?: MotionPreference;
}) {
  const effective = useDesignMotion(motion);
  return (
    <MotionProvider motion={motion}>
      <div
        data-slot="card"
        data-variant={variant}
        data-cobalt-motion={effective}
        data-interactive={
          Boolean(props.onClick || props.role === "button" || props.role === "link") || undefined
        }
        className={cn("cobalt-card", className)}
        {...props}
      />
    </MotionProvider>
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-header" className={cn("cobalt-card-header", className)} {...props} />;
}

function CardTitle({ className, ...props }: React.ComponentProps<"h2">) {
  return <h2 data-slot="card-title" className={cn("cobalt-card-title", className)} {...props} />;
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("cobalt-card-description", className)}
      {...props}
    />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-action" className={cn("cobalt-card-action", className)} {...props} />;
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="card-content" className={cn("cobalt-card-content", className)} {...props} />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-footer" className={cn("cobalt-card-footer", className)} {...props} />;
}

export { Card, CardHeader, CardFooter, CardTitle, CardAction, CardDescription, CardContent };
