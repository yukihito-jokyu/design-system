# IconButton

- Registry: `@yukihito/icon-button`
- Source: `src/components/ui/icon-button.tsx`

## 導入

```sh
npx shadcn@latest add @yukihito/icon-button
```

## 使用例

```tsx
import { IconButton } from "@/components/ui/icon-button";

<IconButton aria-label="閉じる">
  <XIcon size={20} />
</IconButton>;
```

必要な状態・Propsは導入後の型定義で確認し、Tokenとアクセシビリティ属性を維持する。
