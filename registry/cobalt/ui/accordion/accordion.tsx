import { useMotionEntry } from "@/registry/cobalt/components/theme-provider/motion-feedback";
import * as React from "react";
import { cn } from "@/registry/cobalt/lib/utils/utils";
import {
  MotionProvider,
  useDesignMotion,
  type MotionPreference,
} from "@/registry/cobalt/components/theme-provider/motion-provider";
import { ChevronDownIcon } from "lucide-react";
import { Accordion as AccordionPrimitive } from "radix-ui";

function Accordion({
  motion = "inherit",
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root> & { motion?: MotionPreference }) {
  const effective = useDesignMotion(motion);
  return (
    <MotionProvider motion={motion}>
      <AccordionPrimitive.Root
        data-slot="accordion"
        data-cobalt-motion={effective}
        className={cn("cobalt-accordion", className)}
        {...props}
      />
    </MotionProvider>
  );
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("cobalt-accordion-item", className)}
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  const effective = useDesignMotion();
  return (
    <AccordionPrimitive.Header className="cobalt-accordion-header">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        data-cobalt-motion={effective}
        className={cn("cobalt-accordion-trigger", className)}
        {...props}
      >
        {children}
        <ChevronDownIcon aria-hidden="true" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  ref: forwardedRef,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  const { ref, effective } = useMotionEntry<HTMLDivElement>(forwardedRef);
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      ref={ref}
      data-cobalt-motion={effective}
      className="cobalt-accordion-content"
      {...props}
    >
      <div className={cn("cobalt-accordion-body", className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
