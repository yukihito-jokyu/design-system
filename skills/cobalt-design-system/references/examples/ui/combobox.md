# Combobox

- Registry: `@yukihi/cobalt-combobox`
- Source: `registry/cobalt/ui/combobox/combobox.tsx`

## 導入

```sh
npx shadcn@4.21.0 add @yukihi/cobalt-combobox
```

## 使用例

```tsx
import {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxGroup,
  ComboboxLabel,
  ComboboxCollection,
  ComboboxEmpty,
  ComboboxSeparator,
  ComboboxChips,
  ComboboxChip,
  ComboboxChipsInput,
  ComboboxTrigger,
  ComboboxValue,
} from "@/components/ui/combobox";

<Combobox items={["アイデア", "議事録"]}>
  <ComboboxInput placeholder="分類を検索" />
  <ComboboxContent>
    <ComboboxEmpty>候補がありません</ComboboxEmpty>
    <ComboboxList>
      {(item: string) => (
        <ComboboxItem key={item} value={item}>
          {item}
        </ComboboxItem>
      )}
    </ComboboxList>
  </ComboboxContent>
</Combobox>;
```

アプリを[Provider](../theme-provider.md)で囲み、必要な状態・Propsは導入後の型定義で確認する。Tokenとアクセシビリティ属性を維持する。
