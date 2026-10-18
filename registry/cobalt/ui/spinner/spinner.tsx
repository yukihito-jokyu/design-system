import type { ComponentProps } from "react";
import { Loader2Icon } from "lucide-react";
import { cn } from "@/registry/cobalt/lib/utils/utils";
import {
  useDesignMotion,
  type MotionPreference,
} from "@/registry/cobalt/components/theme-provider/motion-provider";

function Spinner({
  className,
  motion = "inherit",
  ...props
}: ComponentProps<"svg"> & { motion?: MotionPreference }) {
  const effective = useDesignMotion(motion);
  return (
    <Loader2Icon
      data-slot="spinner"
      role="status"
      aria-label="読み込み中"
      data-cobalt-motion={effective}
      className={cn("cobalt-spinner", className)}
      {...props}
    />
  );
}

export { Spinner };
