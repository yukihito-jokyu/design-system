import * as React from "react";
import { cn } from "@/registry/new-york/lib/utils/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return <textarea data-slot="textarea" className={cn("ds-textarea", className)} {...props} />;
}

export { Textarea };
