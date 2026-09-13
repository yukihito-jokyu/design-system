# FormField

- Registry: `@yukihito/form-field`
- Source: `src/components/patterns/form-field.tsx`

## 導入

```sh
npx shadcn@latest add @yukihito/form-field
```

## 使用例

```tsx
import { FormField } from "@/components/patterns/form-field";

<FormField label="名前" required>
  {(props) => <Input {...props} />}
</FormField>;
```

必要な状態・Propsは導入後の型定義で確認し、Tokenとアクセシビリティ属性を維持する。
