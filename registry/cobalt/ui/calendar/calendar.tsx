import { useMotionFeedback } from "@/registry/cobalt/components/theme-provider/motion-feedback";
import {
  MotionProvider,
  useDesignMotion,
  type MotionPreference,
} from "@/registry/cobalt/components/theme-provider/motion-provider";
import { ja } from "react-day-picker/locale";
import * as React from "react";
import { cn } from "@/registry/cobalt/lib/utils/utils";
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import {
  DayPicker,
  getDefaultClassNames,
  type DayButton,
  type Root,
  type Chevron,
  type WeekNumber,
} from "react-day-picker";

import { Button, buttonVariants } from "@/registry/cobalt/ui/button/button";

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "ghost",
  formatters,
  components,
  motion = "inherit",
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>["variant"];
  motion?: MotionPreference;
}) {
  const defaultClassNames = getDefaultClassNames();

  return (
    <MotionProvider motion={motion}>
      <DayPicker
        locale={ja}
        showOutsideDays={showOutsideDays}
        className={cn("cobalt-calendar", className)}
        captionLayout={captionLayout}
        formatters={{
          formatMonthDropdown: (date) => date.toLocaleString("ja-JP", { month: "short" }),
          ...formatters,
        }}
        classNames={{
          root: cn("cobalt-calendar-root", defaultClassNames.root),
          months: cn("cobalt-calendar-months", defaultClassNames.months),
          month: cn("cobalt-calendar-month", defaultClassNames.month),
          nav: cn("cobalt-calendar-nav", defaultClassNames.nav),
          button_previous: cn(
            buttonVariants({ variant: buttonVariant }),
            "cobalt-calendar-nav-button",
            defaultClassNames.button_previous,
          ),
          button_next: cn(
            buttonVariants({ variant: buttonVariant }),
            "cobalt-calendar-nav-button",
            defaultClassNames.button_next,
          ),
          month_caption: cn("cobalt-calendar-month-caption", defaultClassNames.month_caption),
          dropdowns: cn("cobalt-calendar-dropdowns", defaultClassNames.dropdowns),
          dropdown_root: cn("cobalt-calendar-dropdown-root", defaultClassNames.dropdown_root),
          dropdown: cn("cobalt-calendar-dropdown", defaultClassNames.dropdown),
          caption_label: cn("cobalt-calendar-caption-label", defaultClassNames.caption_label),
          month_grid: cn("cobalt-calendar-month-grid", defaultClassNames.month_grid),
          weekdays: cn("cobalt-calendar-weekdays", defaultClassNames.weekdays),
          weekday: cn("cobalt-calendar-weekday", defaultClassNames.weekday),
          week: cn("cobalt-calendar-week", defaultClassNames.week),
          week_number_header: cn(
            "cobalt-calendar-week-number-header",
            defaultClassNames.week_number_header,
          ),
          week_number: cn("cobalt-calendar-week-number", defaultClassNames.week_number),
          day: cn("cobalt-calendar-day", defaultClassNames.day),
          range_start: cn("cobalt-calendar-range-start", defaultClassNames.range_start),
          range_middle: cn("cobalt-calendar-range-middle", defaultClassNames.range_middle),
          range_end: cn("cobalt-calendar-range-end", defaultClassNames.range_end),
          today: cn("cobalt-calendar-today", defaultClassNames.today),
          outside: cn("cobalt-calendar-outside", defaultClassNames.outside),
          disabled: cn("cobalt-calendar-disabled", defaultClassNames.disabled),
          hidden: cn("cobalt-calendar-hidden", defaultClassNames.hidden),
          ...classNames,
        }}
        components={{
          Root: CalendarRoot,
          Chevron: CalendarChevron,
          DayButton: CalendarDayButton,
          WeekNumber: CalendarWeekNumber,
          ...components,
        }}
        {...props}
      />
    </MotionProvider>
  );
}

// 既存の内側で定義する形では設定変更ごとにDOMが作り直されるため、
// 関数の同一性を保ち、選択日とフォーカスを維持する。
function CalendarRoot({ className, rootRef, ...props }: React.ComponentProps<typeof Root>) {
  const effective = useDesignMotion();
  return (
    <div
      data-slot="calendar"
      data-cobalt-motion={effective}
      ref={rootRef}
      className={cn(className)}
      {...props}
    />
  );
}

function CalendarChevron({
  className,
  orientation,
  ...props
}: React.ComponentProps<typeof Chevron>) {
  if (orientation === "left")
    return <ChevronLeftIcon className={cn("size-4", className)} {...props} />;
  if (orientation === "right")
    return <ChevronRightIcon className={cn("size-4", className)} {...props} />;
  return <ChevronDownIcon className={cn("size-4", className)} {...props} />;
}

function CalendarWeekNumber({ children, ...props }: React.ComponentProps<typeof WeekNumber>) {
  return (
    <td {...props}>
      <div className="cobalt-calendar-week-number">{children}</div>
    </td>
  );
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}: React.ComponentProps<typeof DayButton>) {
  const defaultClassNames = getDefaultClassNames();

  const ref = React.useRef<HTMLButtonElement>(null);
  const { ref: motionRef } = useMotionFeedback<HTMLButtonElement>({ ref, feedback: "calendar" });
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);

  return (
    <Button
      ref={motionRef}
      variant="ghost"
      size="icon"
      data-day={day.date.toLocaleDateString()}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn("cobalt-calendar-day-button", defaultClassNames.day, className)}
      {...props}
    />
  );
}

export { Calendar, CalendarDayButton };
