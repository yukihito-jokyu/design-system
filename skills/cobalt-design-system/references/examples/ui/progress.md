# Progress

- Registry: `@yukihi/cobalt-progress`
- Source: `registry/cobalt/ui/progress/progress.tsx`

## 導入

```sh
npx shadcn@4.21.0 add @yukihi/cobalt-progress
```

## 使用例

```tsx
import { Progress } from "@/components/ui/progress";

<Progress value={60} aria-label="進捗" />;
```

アプリを[Provider](../theme-provider.md)で囲み、必要な状態・Propsは導入後の型定義で確認する。Tokenとアクセシビリティ属性を維持する。
