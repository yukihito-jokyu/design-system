import {
  MotionProvider,
  type MotionPreference,
} from "@/registry/cobalt/components/theme-provider/motion-provider";
import { useId, useRef, useState } from "react";
import { Input } from "@/registry/cobalt/ui/input/input";
import { Label } from "@/registry/cobalt/ui/label/label";
import { Button } from "@/registry/cobalt/ui/button/button";
import { useListMotion } from "@/registry/cobalt/components/theme-provider/motion-layout";
import { useDesignMotion } from "@/registry/cobalt/components/theme-provider/motion-provider";
export type FileUploadProps = {
  label: string;
  motion?: MotionPreference;
  accept?: string;
  multiple?: boolean;
  maxSize?: number;
  disabled?: boolean;
  onFilesChange?: (files: File[]) => void;
  onUpload?: (files: File[]) => Promise<void>;
};

export function acceptsFile(file: File, accept?: string) {
  return (
    !accept ||
    accept.split(",").some((rule) => {
      const r = rule.trim().toLowerCase();
      return r.startsWith(".")
        ? file.name.toLowerCase().endsWith(r)
        : r.endsWith("/*")
          ? file.type.startsWith(r.slice(0, -1))
          : file.type === r;
    })
  );
}

export function FileUpload({
  label,
  accept,
  multiple = false,
  maxSize = 10 * 1024 * 1024,
  disabled,
  onFilesChange,
  onUpload,
  motion = "inherit",
}: FileUploadProps) {
  const id = useId();
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [state, setState] = useState<"idle" | "uploading" | "success" | "error">("idle");
  const busy = useRef(false);
  const effective = useDesignMotion(motion);

  const motionRef = useListMotion<HTMLDivElement>(
    motion,
    JSON.stringify(files.map((file) => [file.name, file.size])),
    "li",
  );

  async function upload() {
    if (!onUpload || busy.current || !files.length) return;
    busy.current = true;
    setState("uploading");
    try {
      await onUpload(files);
      setState("success");
    } catch {
      setState("error");
    } finally {
      busy.current = false;
    }
  }

  return (
    <MotionProvider motion={motion}>
      <div className="cobalt-field cobalt-file-upload" ref={motionRef}>
        <Label htmlFor={id}>{label}</Label>
        <Input
          id={id}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled || state === "uploading"}
          aria-describedby={`${id}-help ${id}-state`}
          aria-invalid={errors.length > 0 || undefined}
          onChange={(e) => {
            const incoming = Array.from(e.target.files ?? []);
            const valid: File[] = [];
            const messages: string[] = [];
            for (const file of incoming) {
              if (file.size > maxSize) messages.push(`${file.name}：サイズの上限を超えています。`);
              else if (!acceptsFile(file, accept))
                messages.push(`${file.name}：対応していない形式です。`);
              else valid.push(file);
            }
            setFiles(valid);
            setErrors(messages);
            setState("idle");
            onFilesChange?.(valid);
            e.target.value = "";
          }}
        />
        <p id={`${id}-help`} className="cobalt-note">
          上限{Math.round((maxSize / 1024 / 1024) * 10) / 10}MB{accept ? `、形式：${accept}` : ""}
        </p>
        {files.length > 0 && (
          <ul>
            {files.map((file, i) => (
              <li key={`${file.name}-${i}`}>{file.name}</li>
            ))}
          </ul>
        )}
        <div id={`${id}-state`} role="status">
          {errors.map((message) => (
            <p className="cobalt-field-error" key={message}>
              {message}
            </p>
          ))}
          {state === "error" && (
            <p className="cobalt-field-error">
              送信できませんでした。選択したファイルを保持しています。
            </p>
          )}
          {state === "success" && (
            <p className="cobalt-feedback-notice" data-cobalt-motion={effective}>
              送信しました。
            </p>
          )}
        </div>
        {onUpload && (
          <Button
            type="button"
            disabled={disabled || !files.length}
            loading={state === "uploading"}
            onClick={() => void upload()}
          >
            {state === "error" ? "再試行" : "送信する"}
          </Button>
        )}
      </div>
    </MotionProvider>
  );
}
