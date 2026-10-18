import { useId, useRef } from "react";
import { SearchIcon, XIcon } from "lucide-react";
import { Input } from "@/registry/cobalt/ui/input/input";
import {
  useDesignMotion,
  type MotionPreference,
} from "@/registry/cobalt/components/theme-provider/motion-provider";
import { IconButton } from "@/registry/cobalt/ui/icon-button/icon-button";

export function SearchField({
  label = "検索",
  value,
  onValueChange,
  onSearch,
  motion = "inherit",
}: {
  label?: string;
  value: string;
  onValueChange: (value: string) => void;
  onSearch?: (value: string) => void;
  motion?: MotionPreference;
}) {
  const composing = useRef(false);
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const effective = useDesignMotion(motion);
  return (
    <div className="cobalt-search" data-cobalt-motion={effective}>
      <label htmlFor={inputId} className="cobalt-search-label">
        {label}
      </label>
      <div className="cobalt-search-control">
        <SearchIcon size={20} aria-hidden="true" />
        <Input
          id={inputId}
          ref={inputRef}
          motion={motion}
          className="cobalt-search-input"
          placeholder="キーワードを入力"
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
          variant="secondary"
          motion={motion}
          className="cobalt-search-clear"
          disabled={!value}
          onClick={() => {
            onValueChange("");
            inputRef.current?.focus();
          }}
        >
          <XIcon size={20} />
        </IconButton>
      </div>
    </div>
  );
}
