# Switch

- Registry: `@yukihi/cobalt-switch`
- Source: `registry/cobalt/ui/switch/switch.tsx`

## 導入

```sh
npx shadcn@4.21.0 add @yukihi/cobalt-switch
```

## 使用例

```tsx
import { Switch } from "@/components/ui/switch";

<Switch aria-label="自動保存" />;
```

アプリを[Provider](../theme-provider.md)で囲み、必要な状態・Propsは導入後の型定義で確認する。Tokenとアクセシビリティ属性を維持する。
