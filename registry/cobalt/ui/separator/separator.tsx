import * as React from "react";
import { cn } from "@/registry/cobalt/lib/utils/utils";
import {
  useDesignMotion,
  type MotionPreference,
} from "@/registry/cobalt/components/theme-provider/motion-provider";
import { Separator as SeparatorPrimitive } from "radix-ui";

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  motion = "inherit",
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root> & { motion?: MotionPreference }) {
  const effective = useDesignMotion(motion);
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      data-cobalt-motion={effective}
      decorative={decorative}
      orientation={orientation}
      className={cn("cobalt-separator", className)}
      {...props}
    />
  );
}

export { Separator };
