import { useEffect, useRef, type FormEvent, type ReactNode } from "react";
import { Button } from "@/registry/cobalt/ui/button/button";
import { PageHeader } from "@/registry/cobalt/patterns/page-header/page-header";
import { ErrorState } from "@/registry/cobalt/patterns/error-state/error-state";
import {
  MotionProvider,
  type MotionPreference,
} from "@/registry/cobalt/components/theme-provider/motion-provider";

export function EditPage({
  title,
  variant,
  description,
  children,
  onSubmit,
  onCancel,
  submitting = false,
  error,
  dirty = false,
  header,
  contentElement = "main",
  noValidate = false,
  motion = "inherit",
}: {
  title: string;
  variant: "create" | "edit";
  description?: string;
  children: ReactNode;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onCancel?: () => void;
  submitting?: boolean;
  error?: string;
  dirty?: boolean;
  header?: ReactNode;
  contentElement?: "main" | "section";
  noValidate?: boolean;
  motion?: MotionPreference;
}) {
  const Content = contentElement;
  const errorRef = useRef<HTMLDivElement>(null);
  // 保存に失敗したら、説明へ移動して内容を確認できるようにする。
  useEffect(() => {
    if (error && !submitting) errorRef.current?.focus();
  }, [error, submitting]);
  return (
    <MotionProvider motion={motion}>
      <Content className="cobalt-stack">
        {header ?? <PageHeader title={title} description={description} headingLevel={1} />}
        <form
          className="cobalt-stack"
          aria-label={title}
          aria-busy={submitting}
          noValidate={noValidate}
          onSubmit={(event) => {
            event.preventDefault();
            if (!submitting) onSubmit(event);
          }}
        >
          {error && (
            <div ref={errorRef} tabIndex={-1} role="group" aria-label="保存エラー">
              <ErrorState title="保存できませんでした" description={error} />
            </div>
          )}
          <fieldset className="cobalt-edit-fields" disabled={submitting}>
            {children}
          </fieldset>
          {dirty && (
            <p className="cobalt-note" role="status">
              未保存の変更があります。
            </p>
          )}
          <div className="cobalt-edit-actions">
            <Button type="submit" loading={submitting}>
              {submitting ? "保存中…" : variant === "create" ? "作成" : "保存"}
            </Button>
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel} disabled={submitting}>
                キャンセル
              </Button>
            )}
          </div>
        </form>
      </Content>
    </MotionProvider>
  );
}
