# FileUpload

- Registry: `@yukihi/cobalt-file-upload`
- Source: `registry/cobalt/ui/file-upload/file-upload.tsx`

## 導入

```sh
npx shadcn@4.21.0 add @yukihi/cobalt-file-upload
```

## 使用例

```tsx
import { FileUpload } from "@/components/ui/file-upload";

<FileUpload label="資料" accept=".pdf" onUpload={async (files) => upload(files)} />;
```

アプリを[Provider](../theme-provider.md)で囲み、必要な状態・Propsは導入後の型定義で確認する。Tokenとアクセシビリティ属性を維持する。
