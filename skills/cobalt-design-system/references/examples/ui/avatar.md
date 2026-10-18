# Avatar

- Registry: `@yukihi/cobalt-avatar`
- Source: `registry/cobalt/ui/avatar/avatar.tsx`

## 導入

```sh
npx shadcn@4.21.0 add @yukihi/cobalt-avatar
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

アプリを[Provider](../theme-provider.md)で囲み、必要な状態・Propsは導入後の型定義で確認する。Tokenとアクセシビリティ属性を維持する。
