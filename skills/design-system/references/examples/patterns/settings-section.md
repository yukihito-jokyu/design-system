# SettingsSection

- Registry: `@yukihi/settings-section`
- Source: `src/components/patterns/settings-section.tsx`

## 導入

```sh
npx shadcn@latest add @yukihi/settings-section
```

## 使用例

```tsx
import { SettingsSection } from "@/components/patterns/settings-section";

<SettingsSection title="通知設定">
  <Switch aria-label="通知を受け取る" />
</SettingsSection>;
```

必要な状態・Propsは導入後の型定義で確認し、Tokenとアクセシビリティ属性を維持する。
