import * as React from "react";
import { cn } from "@/registry/cobalt/lib/utils/utils";
import {
  MotionProvider,
  useDesignMotion,
  type MotionPreference,
} from "@/registry/cobalt/components/theme-provider/motion-provider";

function Table({
  className,
  motion = "inherit",
  ...props
}: React.ComponentProps<"table"> & { motion?: MotionPreference }) {
  const effective = useDesignMotion(motion);
  return (
    <MotionProvider motion={motion}>
      <div
        data-slot="table-container"
        className="cobalt-table-container"
        data-cobalt-motion={effective}
        role="region"
        aria-label={props["aria-label"] ?? "表の内容"}
        tabIndex={0}
      >
        <table data-slot="table" className={cn("cobalt-table", className)} {...props} />
      </div>
    </MotionProvider>
  );
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead data-slot="table-header" className={cn("cobalt-table-header", className)} {...props} />
  );
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return <tbody data-slot="table-body" className={cn("cobalt-table-body", className)} {...props} />;
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot data-slot="table-footer" className={cn("cobalt-table-footer", className)} {...props} />
  );
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return <tr data-slot="table-row" className={cn("cobalt-table-row", className)} {...props} />;
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return <th data-slot="table-head" className={cn("cobalt-table-head", className)} {...props} />;
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return <td data-slot="table-cell" className={cn("cobalt-table-cell", className)} {...props} />;
}

function TableCaption({ className, ...props }: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("cobalt-table-caption", className)}
      {...props}
    />
  );
}

export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption };
