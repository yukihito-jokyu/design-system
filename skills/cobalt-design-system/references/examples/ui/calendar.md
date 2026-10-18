# Calendar

- Registry: `@yukihi/cobalt-calendar`
- Source: `registry/cobalt/ui/calendar/calendar.tsx`

## 導入

```sh
npx shadcn@4.21.0 add @yukihi/cobalt-calendar
```

## 使用例

```tsx
import { Calendar, CalendarDayButton } from "@/components/ui/calendar";

<Calendar />;
```

アプリを[Provider](../theme-provider.md)で囲み、必要な状態・Propsは導入後の型定義で確認する。Tokenとアクセシビリティ属性を維持する。
