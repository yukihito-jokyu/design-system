# DatePicker

- Registry: `@yukihi/cobalt-date-picker`
- Source: `registry/cobalt/ui/date-picker/date-picker.tsx`

## 導入

```sh
npx shadcn@4.21.0 add @yukihi/cobalt-date-picker
```

## 使用例

```tsx
import { DatePicker } from "@/components/ui/date-picker";

<DatePicker label="予定日" value={date} onValueChange={setDate} />;
```

アプリを[Provider](../theme-provider.md)で囲み、必要な状態・Propsは導入後の型定義で確認する。Tokenとアクセシビリティ属性を維持する。
