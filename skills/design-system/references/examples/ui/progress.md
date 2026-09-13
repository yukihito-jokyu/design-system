# Progress

- Registry: `@yukihito/progress`
- Source: `src/components/ui/progress.tsx`

## 導入

```sh
npx shadcn@latest add @yukihito/progress
```

## 使用例

```tsx
import { Progress } from "@/components/ui/progress";

<Progress value={60} aria-label="進捗" />;
```

必要な状態・Propsは導入後の型定義で確認し、Tokenとアクセシビリティ属性を維持する。
