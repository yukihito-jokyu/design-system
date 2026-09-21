import { useRef } from "react";
import { SearchIcon, XIcon } from "lucide-react";
import { Input } from "@/registry/new-york/ui/input/input";
import { IconButton } from "@/registry/new-york/ui/icon-button/icon-button";

export function SearchField({
  label = "検索",
  value,
  onValueChange,
  onSearch,
}: {
  label?: string;
  value: string;
  onValueChange: (value: string) => void;
  onSearch?: (value: string) => void;
}) {
  const composing = useRef(false);
  return (
    <div className="actions flex-nowrap">
      <SearchIcon size={20} aria-hidden="true" />
      <Input
        aria-label={label}
        type="search"
        value={value}
        onCompositionStart={() => (composing.current = true)}
        onCompositionEnd={() => (composing.current = false)}
        onChange={(e) => onValueChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !composing.current && !e.nativeEvent.isComposing) {
            e.preventDefault();
            onSearch?.(value);
          }
        }}
      />
      <IconButton
        aria-label={`${label}をクリア`}
        type="button"
        variant="ghost"
        disabled={!value}
        onClick={() => onValueChange("")}
      >
        <XIcon size={20} />
      </IconButton>
    </div>
  );
}
