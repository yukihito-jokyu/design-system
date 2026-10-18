# Alert

- Registry: `@yukihi/cobalt-alert`
- Source: `registry/cobalt/ui/alert/alert.tsx`

## 導入

```sh
npx shadcn@4.21.0 add @yukihi/cobalt-alert
```

## 使用例

```tsx
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

<Alert>
  <AlertTitle>保存しました</AlertTitle>
  <AlertDescription>変更内容を反映しました。</AlertDescription>
</Alert>;
```

アプリを[Provider](../theme-provider.md)で囲み、必要な状態・Propsは導入後の型定義で確認する。Tokenとアクセシビリティ属性を維持する。
