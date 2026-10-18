import * as React from "react";
import { cn } from "@/registry/cobalt/lib/utils/utils";
import {
  MotionProvider,
  useDesignMotion,
  type MotionPreference,
} from "@/registry/cobalt/components/theme-provider/motion-provider";
import { cva } from "class-variance-authority";
import { ChevronDownIcon } from "lucide-react";
import { NavigationMenu as NavigationMenuPrimitive } from "radix-ui";

function NavigationMenu({
  className,
  children,
  viewport = true,
  motion = "inherit",
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Root> & {
  viewport?: boolean;
  motion?: MotionPreference;
}) {
  const effective = useDesignMotion(motion);
  return (
    <MotionProvider motion={motion}>
      <NavigationMenuPrimitive.Root
        data-slot="navigation-menu"
        data-viewport={viewport}
        data-cobalt-motion={effective}
        className={cn("cobalt-navigation-menu", className)}
        {...props}
      >
        {children}
        {viewport && <NavigationMenuViewport />}
      </NavigationMenuPrimitive.Root>
    </MotionProvider>
  );
}

function NavigationMenuList({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.List>) {
  return (
    <NavigationMenuPrimitive.List
      data-slot="navigation-menu-list"
      className={cn("cobalt-navigation-list", className)}
      {...props}
    />
  );
}

function NavigationMenuItem({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Item>) {
  return (
    <NavigationMenuPrimitive.Item
      data-slot="navigation-menu-item"
      className={cn("cobalt-navigation-item", className)}
      {...props}
    />
  );
}

const navigationMenuTriggerStyle = cva("cobalt-navigation-trigger");

function NavigationMenuTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Trigger>) {
  const effective = useDesignMotion();
  return (
    <NavigationMenuPrimitive.Trigger
      data-slot="navigation-menu-trigger"
      data-cobalt-motion={effective}
      className={cn(navigationMenuTriggerStyle(), className)}
      {...props}
    >
      {children}
      <ChevronDownIcon aria-hidden="true" />
    </NavigationMenuPrimitive.Trigger>
  );
}

function NavigationMenuContent({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Content>) {
  const effective = useDesignMotion();
  return (
    <NavigationMenuPrimitive.Content
      data-slot="navigation-menu-content"
      role="group"
      data-cobalt-motion={effective}
      className={cn("cobalt-navigation-content", className)}
      {...props}
    />
  );
}

function NavigationMenuViewport({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Viewport>) {
  const effective = useDesignMotion();
  return (
    <div className="cobalt-navigation-viewport-position">
      <NavigationMenuPrimitive.Viewport
        data-slot="navigation-menu-viewport"
        data-cobalt-motion={effective}
        className={cn("cobalt-navigation-viewport", className)}
        {...props}
      />
    </div>
  );
}

function NavigationMenuLink({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Link>) {
  const effective = useDesignMotion();
  return (
    <NavigationMenuPrimitive.Link
      data-slot="navigation-menu-link"
      data-cobalt-motion={effective}
      className={cn("cobalt-navigation-link", className)}
      {...props}
    />
  );
}

function NavigationMenuIndicator({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Indicator>) {
  const effective = useDesignMotion();
  return (
    <NavigationMenuPrimitive.Indicator
      data-slot="navigation-menu-indicator"
      data-cobalt-motion={effective}
      className={cn("cobalt-navigation-indicator", className)}
      {...props}
    >
      <div className="cobalt-navigation-indicator-arrow" />
    </NavigationMenuPrimitive.Indicator>
  );
}

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
};
