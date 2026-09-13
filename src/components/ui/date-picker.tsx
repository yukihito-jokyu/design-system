"use client";
import { useState, useId } from "react";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "./calendar";
import { Input } from "./input";
import { IconButton } from "./icon-button";
import { Popover, PopoverTrigger, PopoverContent } from "./popover";

export function dateText(date?: Date) {
  return date
    ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
    : "";
}

export function parseDate(text: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(text)) return undefined;
  const [y, m, d] = text.split("-").map(Number);
  const date = new Date(0);
  date.setFullYear(y, m - 1, d);
  date.setHours(0, 0, 0, 0);
  return dateText(date) === text ? date : undefined;
}

export type DatePickerProps = {
  id?: string;
  label: string;
  value?: Date;
  onValueChange: (value: Date | undefined) => void;
  disabled?: boolean;
  disabledDate?: (date: Date) => boolean;
  "aria-describedby"?: string;
  "aria-invalid"?: boolean;
};

export function DatePicker({
  id,
  label,
  value,
  onValueChange,
  disabled,
  disabledDate,
  ...aria
}: DatePickerProps) {
  const generated = useId();
  const inputId = id ?? generated;
  const [draft, setDraft] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");

  function change(text: string) {
    setDraft(text);
    if (!text) {
      setError("");
      onValueChange(undefined);
      return;
    }
    const parsed = parseDate(text);
    if (!parsed || disabledDate?.(parsed)) {
      setError("選択できる日付をYYYY-MM-DD形式で入力してください。");
      return;
    }
    setError("");
    onValueChange(parsed);
  }

  return (
    <div className="field">
      <div className="actions flex-nowrap">
        <Input
          id={inputId}
          aria-label={label}
          value={draft ?? dateText(value)}
          onChange={(e) => change(e.target.value)}
          onBlur={() => {
            if (!error) setDraft(null);
          }}
          disabled={disabled}
          placeholder="YYYY-MM-DD"
          aria-invalid={Boolean(error) || aria["aria-invalid"] || undefined}
          aria-describedby={
            [aria["aria-describedby"], error ? `${inputId}-error` : null]
              .filter(Boolean)
              .join(" ") || undefined
          }
        />
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <IconButton
              aria-label={`${label}のカレンダーを開く`}
              disabled={disabled}
              variant="outline"
            >
              <CalendarIcon size={20} />
            </IconButton>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-2" align="end">
            <Calendar
              mode="single"
              selected={value}
              defaultMonth={value}
              disabled={disabledDate}
              onSelect={(date) => {
                onValueChange(date);
                setDraft(null);
                setError("");
                setOpen(false);
              }}
              autoFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      {error && (
        <p id={`${inputId}-error`} className="error">
          {error}
        </p>
      )}
    </div>
  );
}
