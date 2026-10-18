import type { ComponentProps } from "react";
import { cn } from "@/registry/cobalt/lib/utils/utils";
import {
  useDesignMotion,
  type MotionPreference,
} from "@/registry/cobalt/components/theme-provider/motion-provider";

function Skeleton({
  className,
  motion = "inherit",
  ...props
}: ComponentProps<"div"> & { motion?: MotionPreference }) {
  const effective = useDesignMotion(motion);
  return (
    <div
      data-slot="skeleton"
      data-cobalt-motion={effective}
      className={cn("cobalt-skeleton", className)}
      {...props}
    />
  );
}

export { Skeleton };
