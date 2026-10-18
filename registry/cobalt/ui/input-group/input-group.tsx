import * as React from "react";
import { cn } from "@/registry/cobalt/lib/utils/utils";
import {
  MotionProvider,
  useDesignMotion,
  type MotionPreference,
} from "@/registry/cobalt/components/theme-provider/motion-provider";
import { cva, type VariantProps } from "class-variance-authority";
import { Button } from "@/registry/cobalt/ui/button/button";
import { Input } from "@/registry/cobalt/ui/input/input";
import { Textarea } from "@/registry/cobalt/ui/textarea/textarea";

function InputGroup({
  className,
  motion = "inherit",
  ...props
}: React.ComponentProps<"div"> & { motion?: MotionPreference }) {
  const effective = useDesignMotion(motion);
  return (
    <MotionProvider motion={motion}>
      <div
        data-slot="input-group"
        role="group"
        data-cobalt-motion={effective}
        className={cn("cobalt-input-group", className)}
        {...props}
      />
    </MotionProvider>
  );
}

const inputGroupAddonVariants = cva("cobalt-input-group-addon", {
  variants: {
    align: {
      "inline-start": "cobalt-addon-start",
      "inline-end": "cobalt-addon-end",
      "block-start": "cobalt-addon-top",
      "block-end": "cobalt-addon-bottom",
    },
  },
  defaultVariants: { align: "inline-start" },
});

function InputGroupAddon({
  className,
  align = "inline-start",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof inputGroupAddonVariants>) {
  return (
    <div
      role="group"
      data-slot="input-group-addon"
      data-align={align}
      className={cn(inputGroupAddonVariants({ align }), className)}
      onClick={(event) => {
        if ((event.target as HTMLElement).closest("button")) return;
        event.currentTarget.parentElement
          ?.querySelector<HTMLInputElement | HTMLTextAreaElement>("input, textarea")
          ?.focus();
      }}
      {...props}
    />
  );
}

const inputGroupButtonVariants = cva("cobalt-input-group-button", {
  variants: {
    size: {
      xs: "cobalt-group-button-xs",
      sm: "cobalt-group-button-sm",
      "icon-xs": "cobalt-group-button-icon",
      "icon-sm": "cobalt-group-button-icon",
    },
  },
  defaultVariants: { size: "xs" },
});

function InputGroupButton({
  className,
  type = "button",
  variant = "ghost",
  size = "xs",
  ...props
}: Omit<React.ComponentProps<typeof Button>, "size"> &
  VariantProps<typeof inputGroupButtonVariants>) {
  return (
    <Button
      type={type}
      data-size={size}
      variant={variant}
      className={cn(inputGroupButtonVariants({ size }), className)}
      {...props}
    />
  );
}

function InputGroupText({ className, ...props }: React.ComponentProps<"span">) {
  return <span className={cn("cobalt-input-group-text", className)} {...props} />;
}

function InputGroupInput({ className, ...props }: React.ComponentProps<typeof Input>) {
  return (
    <Input
      data-slot="input-group-control"
      className={cn("cobalt-group-control", className)}
      {...props}
    />
  );
}

function InputGroupTextarea({ className, ...props }: React.ComponentProps<typeof Textarea>) {
  return (
    <Textarea
      data-slot="input-group-control"
      className={cn("cobalt-group-control", className)}
      {...props}
    />
  );
}

export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupInput,
  InputGroupTextarea,
};
