import { useMotionFeedback } from "@/registry/cobalt/components/theme-provider/motion-feedback";
import * as React from "react";
import { cn } from "@/registry/cobalt/lib/utils/utils";
import {
  MotionProvider,
  type MotionPreference,
} from "@/registry/cobalt/components/theme-provider/motion-provider";
import { RadioGroup as RadioGroupPrimitive } from "radix-ui";
import { CircleIcon } from "lucide-react";

function RadioGroup({
  className,
  motion = "inherit",
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root> & { motion?: MotionPreference }) {
  return (
    <MotionProvider motion={motion}>
      <RadioGroupPrimitive.Root
        data-slot="radio-group"
        className={cn("cobalt-radio-group", className)}
        {...props}
      />
    </MotionProvider>
  );
}

function RadioGroupItem({
  className,
  ref: forwardedRef,
  motion = "inherit",
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item> & { motion?: MotionPreference }) {
  const { ref, effective } = useMotionFeedback<HTMLButtonElement>({
    motion,
    ref: forwardedRef,
    feedback: "radio",
  });

  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      ref={ref}
      data-cobalt-motion={effective}
      className={cn("cobalt-radio", className)}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="cobalt-radio-indicator"
      >
        <CircleIcon aria-hidden="true" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
}

export { RadioGroup, RadioGroupItem };
