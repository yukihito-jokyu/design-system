# design-system

再利用するデザインシステム本体です。Foundation 39種類・Character 9種類・Pattern 10種類・個別SVGアイコン48点を含みます。

## 構成

- `registry/new-york/`：UI、Character、Pattern、個別アイコン、hook、utilityの原本
- `registry/new-york/styles/registry.json`：Tokenと共通CSSの正本
- `registry.json`と各分類の`registry.json`：配布項目と依存の定義
- `public/r/`：Git管理する生成済みRegistry JSON

```sh
npm ci
npm run typecheck
npm run registry:build
```

ReactとTailwind v4を用いるアプリで利用します。共通スタイルはRegistry導入時にCSSへ反映され、テーマの切り替えは`DesignThemeProvider`を使用します。

## PatternをStorybookで見る

承認済みPattern 10種類だけを、このリポジトリのStorybookで閲覧できます。Storyは各Pattern原本の隣にあり、Registry配布用JSONには含めません。上部のThemeで5テーマ、表示幅メニューで狭い画面に切り替えられます。検索・並べ替え・入力などはプレビュー内で操作できます。

```sh
npm ci
npm run storybook
```

表示されたURLをブラウザで開き、左側の`Patterns`から選びます。終了は`Ctrl+C`です。静的な閲覧サイトを作る場合は次を実行し、HTTPサーバー経由で開きます。公式の既定どおり`storybook-static/`へ出力し、Gitの管理対象には含めません。

```sh
npm run build-storybook
npx http-server storybook-static
```

`.storybook/styles.css`は`design-system-styles`を一時Vite環境へshadcn CLIで導入した結果です。Tokenや共通CSSの正本を変更したときだけ、[運用手順](docs/registry-operations.md#storybook用cssの同期)に従って再反映します。`npm run storybook`は閲覧用、`npm run registry:serve`はRegistry JSONのローカル配信用で、用途が異なります。

## Registryをローカルで使う

Registryと導入先の両方で、shadcnをRadix構成にします。現行CLIでBase UI構成へ入れると`asChild`が`render`へ変換されるため、このデザインシステムでは`radix`を指定してください。

```sh
# このリポジトリ
npm ci
npm run registry:build
REGISTRY_BASE_URL=http://127.0.0.1:4173/r npm run registry:serve

# 新規Viteプロジェクトをbaseから初期化（別ターミナル、一時ディレクトリ）
npx shadcn@latest init http://127.0.0.1:4173/r/design-system.json --template vite --base radix --name my-app --yes

# 既存のRadix構成アプリへ個別項目を追加する場合
npx shadcn@latest registry add '@yukihi=http://127.0.0.1:4173/r/{name}.json'
npx shadcn@latest add http://127.0.0.1:4173/r/button.json
```

導入先のTailwind CSSファイルにはTailwindを読み込みます。Tokenと共通スタイルはCLIが追加します。`body`や見出しへデザインシステムの見た目は適用されません。

```css
@import "tailwindcss";
```

```tsx
import { DesignThemeProvider } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";

export function Example() {
  return (
    <DesignThemeProvider theme="sage">
      <Button>保存する</Button>
    </DesignThemeProvider>
  );
}
```

全項目は`design-system.json`、動的な6案選択APIは`character-icons.json`から導入できます。

```sh
npx shadcn@latest add http://127.0.0.1:4173/r/design-system.json
```

既存アプリへの全体導入でも、先に上の`registry add`を実行します。`add`は既存のstyleを維持するため、`new-york`固定が必要な新規アプリはbase URLを指定した`init`を使います。

個別SVGはそれぞれ独立項目です。たとえば次の導入は`InkIdeaFeatureIcon`と`IconFrame`だけを追加し、他の47点を追加しません。

```sh
npx shadcn@latest add http://127.0.0.1:4173/r/ink-idea-feature-icon.json
```

標準の公開先は`https://design.yukihi.tokyo/v1/r`です。ローカル検証時だけ、`serve-registry.mjs`が`design-system`の名前空間を`REGISTRY_BASE_URL`へ切り替えます。Git管理する生成JSONは公開URLのままです。

```sh
REGISTRY_BASE_URL=http://127.0.0.1:4173/r npm run registry:serve
```

GitHub・CI・Cloudflare Workers配信・`@yukihi`名前空間を含む正式運用は、[Registry運用・導入手順書](docs/registry-operations.md)を参照してください。

## AI向け利用ルール

このデザインシステム専用のAgent Skillは[`skills/design-system/`](skills/design-system/SKILL.md)で管理します。公開後はGitHubから導入できます。

```sh
npx skills add yukihito-jokyu/design-system --skill design-system
```

Skillにはコンポーネント選択、Token、検証ルールと、Registryで導入できる各コンポーネントの使用例があります。AIは対象を決めた後、`skills/design-system/references/examples/`にある同名ファイルを参照します。

- 新規UIを作る前にRegistryの既存Foundation・Character・Patternを検索し、合成で対応する。
- 配色・寸法の共通値は`registry/new-york/styles/registry.json`を正本とし、移行前の値を維持する。
- SVGの形・固有色、StatusBubbleの独自配色、既存の名前付きexportを変更しない。
- Portal部品は`DesignThemeProvider`のテーマ継承を維持し、disabled、invalid、loading、IME、フォーカス復帰、Reduced Motionを退行させない。

```tsx
import { Button } from "@/components/ui/button";
import { FoldWelcomeCharacterIcon } from "@/components/icons/FoldWelcomeCharacterIcon";
```

配色5セット、操作高36/44/48px、薄い枠4px・濃い枠2px。SVGの固有色と輪郭を保持します。

承認済みPatternのStorybook以外のカタログ・検証環境・画像原案・設計履歴は本体に含めません。開発時の一式は元の作業場所の `development-preview/` に保存しています。

このリポジトリ独自コードは[MIT License](LICENSE)で公開します。第三者由来コードと依存パッケージの表記は[THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)を参照してください。
