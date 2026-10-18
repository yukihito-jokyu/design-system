import {
  useDesignMotion,
  type MotionPreference,
} from "@/registry/cobalt/components/theme-provider/motion-provider";
import * as React from "react";
import { cn } from "@/registry/cobalt/lib/utils/utils";
import { Slider as SliderPrimitive } from "radix-ui";

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  thumbLabels,
  motion = "inherit",
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root> & {
  thumbLabels?: string[];
  motion?: MotionPreference;
}) {
  const effective = useDesignMotion(motion);

  const _values = React.useMemo(
    () => (Array.isArray(value) ? value : Array.isArray(defaultValue) ? defaultValue : [min, max]),
    [value, defaultValue, min, max],
  );

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      data-cobalt-motion={effective}
      className={cn("cobalt-slider", className)}
      {...props}
    >
      <SliderPrimitive.Track data-slot="slider-track" className="cobalt-slider-track">
        <SliderPrimitive.Range data-slot="slider-range" className="cobalt-slider-range" />
      </SliderPrimitive.Track>
      {Array.from({ length: _values.length }, (_, index) => (
        <SliderPrimitive.Thumb
          data-slot="slider-thumb"
          key={index}
          aria-label={thumbLabels?.[index]}
          className="cobalt-slider-thumb"
        />
      ))}
    </SliderPrimitive.Root>
  );
}

export { Slider };
