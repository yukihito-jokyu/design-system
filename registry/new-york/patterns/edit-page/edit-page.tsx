import type { FormEvent, ReactNode } from "react";
import { Button } from "@/registry/new-york/ui/button/button";
import { PageHeader } from "@/registry/new-york/patterns/page-header/page-header";
import { ErrorState } from "@/registry/new-york/patterns/error-state/error-state";

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
}) {
  return (
    <main className="stack">
      <PageHeader title={title} description={description} headingLevel={1} />
      <form
        className="stack"
        onSubmit={(event) => {
          event.preventDefault();
          if (!submitting) onSubmit(event);
        }}
        aria-busy={submitting}
      >
        {error && <ErrorState title="保存できませんでした" description={error} />}
        {children}
        {dirty && (
          <p className="note" role="status">
            未保存の変更があります。離れる前に保存または取り消してください。
          </p>
        )}
        <div className="actions">
          <Button type="submit" disabled={submitting}>
            {submitting ? "保存中…" : variant === "create" ? "作成" : "保存"}
          </Button>
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel} disabled={submitting}>
              取消
            </Button>
          )}
        </div>
      </form>
    </main>
  );
}
