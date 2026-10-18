# InputGroup

- Registry: `@yukihi/cobalt-input-group`
- Source: `registry/cobalt/ui/input-group/input-group.tsx`

## 導入

```sh
npx shadcn@4.21.0 add @yukihi/cobalt-input-group
```

## 使用例

```tsx
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupInput,
  InputGroupTextarea,
} from "@/components/ui/input-group";

<InputGroup />;
```

アプリを[Provider](../theme-provider.md)で囲み、必要な状態・Propsは導入後の型定義で確認する。Tokenとアクセシビリティ属性を維持する。
