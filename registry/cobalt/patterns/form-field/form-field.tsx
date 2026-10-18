import { useId, type ReactNode } from "react";
import { Label } from "@/registry/cobalt/ui/label/label";
import {
  MotionProvider,
  type MotionPreference,
} from "@/registry/cobalt/components/theme-provider/motion-provider";
export type FieldBinding = {
  id: string;
  "aria-describedby"?: string;
  "aria-invalid"?: true;
  required?: boolean;
};

export function FormField({
  label,
  description,
  error,
  required,
  children,
  motion = "inherit",
}: {
  label: string;
  description?: string;
  error?: string;
  required?: boolean;
  children: (props: FieldBinding) => ReactNode;
  motion?: MotionPreference;
}) {
  const id = useId();

  const described =
    [description ? `${id}-help` : null, error ? `${id}-error` : null].filter(Boolean).join(" ") ||
    undefined;

  return (
    <MotionProvider motion={motion}>
      <div className="cobalt-field">
        <Label htmlFor={id}>
          {label}
          {required ? "（必須）" : ""}
        </Label>
        {children({
          id,
          "aria-describedby": described,
          "aria-invalid": error ? true : undefined,
          required,
        })}
        {description && (
          <p id={`${id}-help`} className="cobalt-note">
            {description}
          </p>
        )}
        {error && (
          <p id={`${id}-error`} className="cobalt-field-error">
            {error}
          </p>
        )}
      </div>
    </MotionProvider>
  );
}
