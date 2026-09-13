# Avatar

- Registry: `@yukihito/avatar`
- Source: `src/components/ui/avatar.tsx`

## 導入

```sh
npx shadcn@latest add @yukihito/avatar
```

## 使用例

```tsx
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarBadge,
  AvatarGroup,
  AvatarGroupCount,
} from "@/components/ui/avatar";

<Avatar />;
```

必要な状態・Propsは導入後の型定義で確認し、Tokenとアクセシビリティ属性を維持する。
