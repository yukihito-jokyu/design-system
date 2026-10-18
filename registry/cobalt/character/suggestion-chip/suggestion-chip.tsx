import { Button } from "@/registry/cobalt/ui/button/button";
import type { MotionPreference } from "@/registry/cobalt/components/theme-provider/motion-provider";

export function SuggestionChip({
  label,
  onSelect,
  disabled,
  motion = "inherit",
}: {
  label: string;
  onSelect: () => void;
  disabled?: boolean;
  motion?: MotionPreference;
}) {
  return (
    <Button
      type="button"
      variant="secondary"
      className="cobalt-suggestion-chip"
      motion={motion}
      disabled={disabled}
      onClick={onSelect}
    >
      {label}
    </Button>
  );
}
