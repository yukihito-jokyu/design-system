import type { ReactElement } from "react";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/registry/cobalt/ui/tooltip/tooltip";
import type { MotionPreference } from "@/registry/cobalt/components/theme-provider/motion-provider";

export function FriendlyTooltip({
  content,
  children,
  motion = "inherit",
}: {
  content: string;
  children: ReactElement;
  motion?: MotionPreference;
}) {
  return (
    <Tooltip motion={motion}>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent>{content}</TooltipContent>
    </Tooltip>
  );
}
