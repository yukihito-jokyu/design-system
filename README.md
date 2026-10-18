# design-system

再利用する2つのデザインシステムを管理します。new-yorkとcobaltは、それぞれUI 41種類・Character 7種類・Pattern 18種類・個別SVG 48点と、共通スタイル・Provider・補助機能を持ちます。同一アプリでは一方を選びます。

## 構成

- `registry/new-york/`・`registry/cobalt/`：各システムの原本とカテゴリ別索引
- 各システムの`styles/registry.json`：Tokenと共通CSSの正本
- `registry.json` → 各システムの`registry.json` → カテゴリ別`registry.json`：配布項目と依存の定義
- `public/r/`：Git管理する生成済みRegistry JSON

```sh
npm ci
npm run typecheck
npm run registry:build
```

ReactとTailwind v4を用いるアプリで利用します。共通スタイルはRegistry導入時にCSSへ反映され、テーマの切り替えは`DesignThemeProvider`を使用します。

## Patternとcobaltの部品をStorybookで見る

承認済みPattern 18種類と、cobaltのUI 41種類・Character 7種類・SVG 48種類とPattern全18種類を、このリポジトリのStorybookで閲覧できます。Storyは各原本の隣にあり、Registry配布用JSONには含めません。cobaltはサイドバーの`Cobalt/UI`・`Cobalt/Character`・`Cobalt/Icons`・`Cobalt/Patterns`から選び、Controlsで種類・サイズ・状態・`motion`を変更できます。Buttonの`size`、Inputの`controlSize`でサイズを変更できます。600px以下ではButtonとInputの高さ・余白・角丸を抑え、Cardも本文15px・内側の余白16pxへ切り替わります。Footerは主要ボタンのみ全幅になります。上部のThemeは既存Patternの5テーマ用です。表示幅メニューでは狭い画面に切り替えられます。検索・並べ替え・入力などはプレビュー内で操作できます。

```sh
npm ci
npm run storybook
```

表示されたURLをブラウザで開き、左側の`Patterns`、`Cobalt/UI`、`Cobalt/Patterns`から選びます。終了は`Ctrl+C`です。静的な閲覧サイトを作る場合はリポジトリ外へ出力し、HTTPサーバー経由で開きます。

```sh
npm run build-storybook -- --output-dir /tmp/design-system-storybook
npx http-server /tmp/design-system-storybook
```

`.storybook/styles.css`はnew-york、`.storybook/cobalt.css`はcobaltの`cobalt-design-system-styles`から反映したCSSです。Tokenや共通CSSの正本を変更したときだけ、[運用手順](docs/registry-operations.md#storybook用cssの同期)に従って再反映します。`npm run storybook`は閲覧用、`npm run registry:serve`はRegistry JSONのローカル配信用で、用途が異なります。

`.storybook/compatibility.css`は、両テーマを同時に読むStorybookで書体と動きの共通指定が干渉するのを防ぎます。配布する部品の寸法や色は上書きしません。

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

標準の公開先は`https://design.yukihi.tokyo/v1/r`です。ローカル検証時だけ、`serve-registry.mjs`が両システムの一括導入項目の名前空間を`REGISTRY_BASE_URL`へ切り替えます。Git管理する生成JSONは公開URLのままです。

```sh
REGISTRY_BASE_URL=http://127.0.0.1:4173/r npm run registry:serve
```

GitHub・CI・Cloudflare Workers配信・`@yukihi`名前空間を含む正式運用は、[Registry運用・導入手順書](docs/registry-operations.md)を参照してください。

## cobaltを導入する

cobaltも同じ`@yukihi`を使い、配布名だけに`cobalt-`が付きます。たとえば`cobalt-button`の導入先は`src/components/ui/button.tsx`で、export名は`Button`です。新しいnamespaceの登録は不要です。cobaltの公開は、この変更をデプロイした後に利用できます。

```sh
# 公開後：新規アプリの初期化・一括導入
npx shadcn@4.21.0 init https://design.yukihi.tokyo/v1/r/cobalt-design-system.json --template vite --base radix --name my-cobalt-app --yes

# 公開後：既存のRadixアプリへ個別・一括導入
npx shadcn@4.21.0 add @yukihi/cobalt-button
npx shadcn@4.21.0 add @yukihi/cobalt-design-system
```

```tsx
import { DesignThemeProvider } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";

export function Example() {
  return (
    <DesignThemeProvider theme="light" motion="on">
      <Button motion="off">保存する</Button>
    </DesignThemeProvider>
  );
}
```

Noto Sans JPの400/500/600/700は、共通CSSのGoogle Fonts importから読み込みます。色・寸法・動きの共通値は`registry/cobalt/styles/registry.json`が正本です。

ローカルでは、先に既存の`registry add`例で`@yukihi`をローカルURLへ向け、`@yukihi/cobalt-button`または`@yukihi/cobalt-design-system`を導入します。新規initには`http://127.0.0.1:4173/r/cobalt-design-system.json`を指定します。

## 配布物を検査する

```sh
npm run registry:build
npm run registry:check
npm run registry:prepare -- /tmp/design-system-dist
REGISTRY_ROOT=/tmp/design-system-dist REGISTRY_BASE_URL=http://127.0.0.1:4173/v1/r npm run registry:serve
```

生成物は両システムとも`public/r/`へ集まり、検索索引は242項目です。一括導入は`design-system`と`cobalt-design-system`に分かれ、互いの部品を含みません。ビルドは原本・依存・importを検査してから出力し、古い生成JSONを取り除きます。`registry:check`は古い生成物やCSS・targetの不一致も検出します。`registry:prepare`は既定で`dist/v1/r/`へ配置し、引数で外部一時ディレクトリを指定できます。上の例では`http://127.0.0.1:4173/v1/r/cobalt-button.json`を確認できます。

CIはロック済みshadcn CLIで、両システムの検索・個別/一括導入・新規init・既存add・再導入・CSS同期・型検査・production buildを検査します。静的Storybookと検証アプリはリポジトリ外へ出力します。

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

承認済みPatternとcobaltのUI・Character・SVG部品のStorybook以外のカタログ・検証環境・画像原案・設計履歴は本体に含めません。開発時の一式は元の作業場所の `development-preview/` に保存しています。

このリポジトリ独自コードは[MIT License](LICENSE)で公開します。第三者由来コードと依存パッケージの表記は[THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)を参照してください。
