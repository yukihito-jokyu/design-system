import * as React from "react";
import { Label as LabelPrimitive } from "radix-ui";
import { cn } from "@/registry/cobalt/lib/utils/utils";

function Label({ className, ...props }: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root data-slot="label" className={cn("cobalt-label", className)} {...props} />
  );
}

export { Label };
