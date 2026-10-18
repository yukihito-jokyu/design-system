# FormField

- Registry: `@yukihi/cobalt-form-field`
- Source: `registry/cobalt/patterns/form-field/form-field.tsx`

## 導入

```sh
npx shadcn@4.21.0 add @yukihi/cobalt-form-field @yukihi/cobalt-input
```

## 使用例

```tsx
import { Input } from "@/components/ui/input";
import { FormField } from "@/components/patterns/form-field";

<FormField label="名前" required>
  {(props) => <Input {...props} />}
</FormField>;
```

アプリを[Provider](../theme-provider.md)で囲み、必要な状態・Propsは導入後の型定義で確認する。Tokenとアクセシビリティ属性を維持する。
