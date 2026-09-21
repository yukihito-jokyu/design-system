import * as React from "react";
import { cn } from "@/registry/new-york/lib/utils/utils";

function Input({
  className,
  type,
  controlSize = "md",
  ...props
}: React.ComponentProps<"input"> & { controlSize?: "sm" | "md" | "lg" }) {
  return (
    <input
      type={type}
      data-slot="input"
      data-size={controlSize}
      className={cn("ds-input", className)}
      {...props}
    />
  );
}

export { Input };
