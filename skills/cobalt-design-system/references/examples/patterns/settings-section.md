# SettingsSection

- Registry: `@yukihi/cobalt-settings-section`
- Source: `registry/cobalt/patterns/settings-section/settings-section.tsx`

## 導入

```sh
npx shadcn@4.21.0 add @yukihi/cobalt-settings-section @yukihi/cobalt-switch
```

## 使用例

```tsx
import { Switch } from "@/components/ui/switch";
import { SettingsSection } from "@/components/patterns/settings-section";

<SettingsSection title="通知設定">
  <Switch aria-label="通知を受け取る" />
</SettingsSection>;
```

アプリを[Provider](../theme-provider.md)で囲み、必要な状態・Propsは導入後の型定義で確認する。Tokenとアクセシビリティ属性を維持する。
