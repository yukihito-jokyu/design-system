# Checkbox

- Registry: `@yukihi/cobalt-checkbox`
- Source: `registry/cobalt/ui/checkbox/checkbox.tsx`

## 導入

```sh
npx shadcn@4.21.0 add @yukihi/cobalt-checkbox
```

## 使用例

```tsx
import { Checkbox } from "@/components/ui/checkbox";

<Checkbox aria-label="選択する" />;
```

アプリを[Provider](../theme-provider.md)で囲み、必要な状態・Propsは導入後の型定義で確認する。Tokenとアクセシビリティ属性を維持する。
