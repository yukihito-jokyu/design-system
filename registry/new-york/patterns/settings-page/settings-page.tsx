import type { ReactNode } from "react";
import { Button } from "@/registry/new-york/ui/button/button";
import { PageHeader } from "@/registry/new-york/patterns/page-header/page-header";
import { SettingsSection } from "@/registry/new-york/patterns/settings-section/settings-section";
import { ErrorState } from "@/registry/new-york/patterns/error-state/error-state";

export type SettingsGroup = {
  id: string;
  title: string;
  description?: string;
  content: ReactNode;
  onSave: () => void;
  saving?: boolean;
  saved?: boolean;
  error?: string;
  dangerous?: boolean;
};

export function SettingsPage({
  title,
  description,
  groups,
}: {
  title: string;
  description?: string;
  groups: SettingsGroup[];
}) {
  const regular = groups.filter((group) => !group.dangerous);
  const dangerous = groups.filter((group) => group.dangerous);

  const renderGroup = (group: SettingsGroup, headingLevel: 2 | 3) => (
    <SettingsSection
      key={group.id}
      title={group.title}
      description={group.description}
      headingLevel={headingLevel}
    >
      {group.content}
      {group.error && <ErrorState title="設定を保存できませんでした" description={group.error} />}
      {group.saved && <p role="status">保存しました。</p>}
      <Button
        type="button"
        variant={group.dangerous ? "destructive" : "default"}
        disabled={group.saving}
        onClick={group.onSave}
      >
        {group.saving ? "保存中…" : "保存"}
      </Button>
    </SettingsSection>
  );

  return (
    <main className="stack">
      <PageHeader title={title} description={description} headingLevel={1} />
      {regular.map((group) => renderGroup(group, 2))}
      {dangerous.length > 0 && (
        <section className="stack" aria-label="危険な設定">
          <h2>危険な設定</h2>
          {dangerous.map((group) => renderGroup(group, 3))}
        </section>
      )}
    </main>
  );
}
