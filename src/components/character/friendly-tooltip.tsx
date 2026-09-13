import type { ReactElement } from "react";
import { Tooltip, TooltipTrigger, TooltipContent } from "../ui/tooltip";

export function FriendlyTooltip({
  content,
  children,
}: {
  content: string;
  children: ReactElement;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent>{content}</TooltipContent>
    </Tooltip>
  );
}
