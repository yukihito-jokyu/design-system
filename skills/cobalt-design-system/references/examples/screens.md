# 一覧・編集画面を組み合わせる

複数件を探す主目的に`collection-page`、1件の入力と保存に`edit-page`を選ぶ。外枠は`app-shell`、検索は表の内蔵検索、入力エラーは`form-field`、成功通知は`toast`で組み合わせる。保存処理は利用アプリから渡す。

```sh
npx shadcn@4.21.0 add @yukihi/cobalt-theme-provider @yukihi/cobalt-app-shell @yukihi/cobalt-collection-page @yukihi/cobalt-edit-page @yukihi/cobalt-form-field @yukihi/cobalt-input @yukihi/cobalt-toast
```

```tsx
import { useEffect, useRef, useState } from "react";
import { DesignThemeProvider } from "@/components/theme-provider";
import { AppShell } from "@/components/patterns/app-shell";
import { CollectionPage } from "@/components/patterns/collection-page";
import { EditPage } from "@/components/patterns/edit-page";
import { FormField } from "@/components/patterns/form-field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Toaster, toast } from "@/components/ui/toast";

export function CustomerScreen({
  saveCustomer,
}: {
  saveCustomer: (name: string) => Promise<void>;
}) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);
  const [fieldError, setFieldError] = useState("");
  const [saveError, setSaveError] = useState("");
  const nameRef = useRef<HTMLInputElement>(null);
  const [customers, setCustomers] = useState([
    { id: "1", name: "青空商店" },
    { id: "2", name: "白雲工房" },
  ]);

  useEffect(() => {
    if (fieldError) nameRef.current?.focus();
  }, [fieldError]);

  async function save() {
    if (saving) return;
    if (!name.trim()) {
      setFieldError("名前を入力してください。");
      return;
    }
    setFieldError("");
    setSaveError("");
    setSaving(true);
    try {
      await saveCustomer(name.trim());
      setCustomers((rows) => [...rows, { id: crypto.randomUUID(), name: name.trim() }]);
      setName("");
      setEditing(false);
      toast.success("顧客を作成しました");
    } catch {
      setSaveError("保存できませんでした。入力内容を保持しています。再度お試しください。");
    } finally {
      setSaving(false);
    }
  }

  return (
    <DesignThemeProvider theme="light" motion="on">
      <div className="min-h-screen bg-cobalt-background p-[var(--cobalt-space-4)]">
        <AppShell
          contentElement="section"
          navigation={
            <a href="/customers" aria-current="page">
              顧客管理
            </a>
          }
        >
          {editing ? (
            <EditPage
              title="顧客を作成"
              variant="create"
              noValidate
              onSubmit={() => void save()}
              onCancel={() => setEditing(false)}
              submitting={saving}
              error={saveError}
              dirty={Boolean(name)}
            >
              <FormField label="名前" required error={fieldError}>
                {(binding) => (
                  <Input
                    {...binding}
                    ref={nameRef}
                    value={name}
                    onChange={(event) => {
                      setName(event.target.value);
                      setFieldError("");
                    }}
                  />
                )}
              </FormField>
            </EditPage>
          ) : (
            <CollectionPage
              title="顧客"
              description="顧客を検索して確認します。"
              actions={<Button onClick={() => setEditing(true)}>顧客を作成</Button>}
              rows={customers}
              columns={[{ id: "name", header: "名前", value: (row) => row.name, sortable: true }]}
              getRowId={(row) => row.id}
              caption="顧客一覧"
              emptyAction={<Button onClick={() => setEditing(true)}>最初の顧客を作成</Button>}
            />
          )}
        </AppShell>
      </div>
      <Toaster />
    </DesignThemeProvider>
  );
}
```

これはローカルのサンプルデータを持つ最小例。実アプリでは一覧の取得・更新、永続ID、認可、URL遷移、未保存時の離脱確認を接続する。初回取得の待機・失敗は`CollectionPage`の`loading`・`error`・`onRetry`で表す。

PC・スマホの検証では検索・並べ替え、空の名前、保存中の無効化、失敗後の再試行、作成成功と通知を確認する。複数選択が必要なら`onSelectionChange`を渡し、[一括操作](../interactions/bulk-action.md)のルールを適用する。Motionの継承検証は外側のProviderと対象部品の設定を切り替え、[検証手順](../validation.md)に従う。
