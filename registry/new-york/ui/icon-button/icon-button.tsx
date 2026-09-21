import { Button } from "@/registry/new-york/ui/button/button";
import type { ComponentProps } from "react";
export type IconButtonProps = Omit<ComponentProps<typeof Button>, "size" | "asChild"> & {
  "aria-label": string;
  size?: "sm" | "md" | "lg";
};

export function IconButton({ size = "md", children, ...props }: IconButtonProps) {
  if (!props["aria-label"].trim()) throw new Error("IconButton requires a non-empty aria-label");
  return (
    <Button {...props} size={size === "md" ? "icon" : size === "sm" ? "icon-sm" : "icon-lg"}>
      <span aria-hidden="true" className="inline-flex">
        {children}
      </span>
    </Button>
  );
}
