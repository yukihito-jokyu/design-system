import { useMotionFeedback } from "@/registry/cobalt/components/theme-provider/motion-feedback";
import {
  MotionProvider,
  useDesignMotion,
  type MotionPreference,
} from "@/registry/cobalt/components/theme-provider/motion-provider";
import * as React from "react";
import { cn } from "@/registry/cobalt/lib/utils/utils";
import { ChevronLeftIcon, ChevronRightIcon, MoreHorizontalIcon } from "lucide-react";

import { buttonVariants, type Button } from "@/registry/cobalt/ui/button/button";

function Pagination({
  className,
  motion = "inherit",
  ...props
}: React.ComponentProps<"nav"> & { motion?: MotionPreference }) {
  const effective = useDesignMotion(motion);
  return (
    <MotionProvider motion={motion}>
      <nav
        role="navigation"
        aria-label="ページ切り替え"
        data-slot="pagination"
        data-cobalt-motion={effective}
        className={cn("cobalt-pagination", className)}
        {...props}
      />
    </MotionProvider>
  );
}

function PaginationContent({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("cobalt-pagination-content", className)}
      {...props}
    />
  );
}

function PaginationItem({ ...props }: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />;
}

type PaginationLinkProps = {
  isActive?: boolean;
  motion?: MotionPreference;
} & Pick<React.ComponentProps<typeof Button>, "size"> &
  React.ComponentProps<"a">;

function PaginationLink({
  className,
  ref: forwardedRef,
  isActive,
  size = "icon",
  motion = "inherit",
  onClick,
  onKeyDown,
  ...props
}: PaginationLinkProps) {
  const { ref, effective } = useMotionFeedback<HTMLAnchorElement>({
    motion,
    ref: forwardedRef,
    feedback: "toggle",
  });

  const disabled = props["aria-disabled"] === true || props["aria-disabled"] === "true";
  return (
    <a
      aria-current={isActive ? "page" : undefined}
      data-slot="pagination-link"
      ref={ref}
      data-active={isActive}
      data-cobalt-motion={effective}
      onClick={(event) => {
        if (disabled) {
          event.preventDefault();
          return;
        }
        onClick?.(event);
      }}
      onKeyDown={(event) => {
        if (disabled && (event.key === "Enter" || event.key === " ")) {
          event.preventDefault();
          return;
        }
        onKeyDown?.(event);
      }}
      className={cn(
        "cobalt-pagination-link",
        buttonVariants({
          variant: isActive ? "default" : "ghost",
          size,
        }),
        className,
      )}
      {...props}
      tabIndex={disabled ? -1 : props.tabIndex}
    />
  );
}

function PaginationPrevious({ className, ...props }: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="前のページへ"
      size="default"
      className={cn("cobalt-pagination-previous", className)}
      {...props}
    >
      <ChevronLeftIcon />
      <span className="cobalt-pagination-label">前へ</span>
    </PaginationLink>
  );
}

function PaginationNext({ className, ...props }: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="次のページへ"
      size="default"
      className={cn("cobalt-pagination-next", className)}
      {...props}
    >
      <span className="cobalt-pagination-label">次へ</span>
      <ChevronRightIcon />
    </PaginationLink>
  );
}

function PaginationEllipsis({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn("cobalt-pagination-ellipsis", className)}
      {...props}
    >
      <MoreHorizontalIcon className="size-4" />
      <span className="sr-only">他のページ</span>
    </span>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
};
