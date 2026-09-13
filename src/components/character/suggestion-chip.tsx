import { Button } from "../ui/button";

export function SuggestionChip({
  label,
  onSelect,
  disabled,
}: {
  label: string;
  onSelect: () => void;
  disabled?: boolean;
}) {
  return (
    <Button
      type="button"
      variant="secondary"
      className="rounded-pill"
      disabled={disabled}
      onClick={onSelect}
    >
      {label}
    </Button>
  );
}
