# Select

- Registry: `@yukihi/cobalt-select`
- Source: `registry/cobalt/ui/select/select.tsx`

## 導入

```sh
npx shadcn@4.21.0 add @yukihi/cobalt-select
```

## 使用例

```tsx
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

<Select defaultValue="draft">
  <SelectTrigger aria-label="状態">
    <SelectValue />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="draft">下書き</SelectItem>
  </SelectContent>
</Select>;
```

アプリを[Provider](../theme-provider.md)で囲み、必要な状態・Propsは導入後の型定義で確認する。Tokenとアクセシビリティ属性を維持する。
