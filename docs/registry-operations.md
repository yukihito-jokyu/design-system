# Registry運用・導入手順書

## 1. 目的と確定した構成

この文書は、デザインシステムを継続的に検査・配布・導入するための手順です。

```text
GitHub（registry/new-york、registry.json、public/r）
  ↓ CI（検査、生成、空アプリへの導入検証）
HTTPS（https://design.yukihi.tokyo/v1/r/）
  ↓ @yukihi名前空間
Reactアプリ（npx shadcn@latest add @yukihi/button）
```

Cloudflareで管理する`design.yukihi.tokyo`を正式な配信先とします。名前空間は`@yukihi`です。

## 2. 管理するものと置かないもの

GitHubでは次を管理します。

- `registry/new-york/`：承認済みコンポーネント、Pattern、Character、SVG、hook、utility
- `registry/new-york/styles/registry.json`：Tokenと共通CSSの正本
- ルートと分類別の`registry.json`：Registry項目と依存関係
- `scripts/serve-registry.mjs`：ローカル配信とCI検証
- `public/r/`：HTTPS配信へ渡す生成済みJSON
- README、運用手順、第三者ライセンス表記

承認済みPattern 10種類のStorybookだけを例外として本体に置きます。StoryはPattern原本に隣接しますがRegistry項目の`files`には登録しません。それ以外のカタログアプリ、E2E専用アプリ、原案・検証画像、大量のログ、未承認案を置きません。空アプリ検証とStorybook静的出力は一時ディレクトリ、他の手動カタログは別リポジトリまたは`development-preview`で管理します。

### Storybook用CSSの同期

`.storybook/styles.css`は`registry/new-york/styles/registry.json`の`design-system-styles`を、shadcn CLIで一時Vite環境へ導入した結果です。正本を変更したときは、リポジトリ外の一時ディレクトリにReact/Vite環境を作り、`components.json`を複製して`tailwind.css`だけを一時アプリの`src/index.css`へ向けます。`src/index.css`を`@import "tailwindcss";`のみで始め、Registryをローカル配信して、ロック済みCLIでスタイルを導入します。

```sh
npm run registry:build
REGISTRY_BASE_URL=http://127.0.0.1:4173/r npm run registry:serve
# 別ターミナル・一時Vite環境のルートで実行
/path/to/design-system/node_modules/.bin/shadcn add http://127.0.0.1:4173/r/design-system-styles.json --yes
```

CLIが更新した`src/index.css`を`.storybook/styles.css`へ反映します。`components.json`と`registry/new-york/styles/index.css`は変更しません。CIの`storybook-styles`ジョブは同じ導入を一時環境で再現し、CSSの差分を検出します。Storybook設定とStoryの型検査は`npm run typecheck:storybook`、静的出力は`npm run build-storybook`で確認します。

## 3. 公開前に決める項目

| 項目                   | 現在                                | 完了条件                                   |
| ---------------------- | ----------------------------------- | ------------------------------------------ |
| 公開URL                | `https://design.yukihi.tokyo/v1/r/` | 接続済み                                   |
| 名前空間               | `@yukihi`                           | 公式Directoryで重複を確認して申請する      |
| バージョン             | `v1`                                | 確定                                       |
| 公開範囲               | 公開                                | 確定                                       |
| 独自コードのライセンス | MIT                                 | `LICENSE`とpackage metadataへ反映済み      |
| 配信基盤               | Cloudflare Workers                  | GitHub接続、build、custom domainを設定済み |
| CI                     | GitHub Actions想定                  | workflowと必須チェックを設定する           |
| リリース責任者         | Yukihito                            | 確定                                       |

### 3.1 独自ドメインとサブドメイン

Registryに必要なのは、shadcn CLIがJSONを取得できる安定したHTTPS URLです。このプロジェクトでは、所有するドメインをCloudflareで管理し、そのサブドメインをCloudflare Workerへ接続しています。

```text
https://design.yukihi.tokyo/v1/r/button.json
```

Cloudflare WorkerへGitHubリポジトリを接続し、Custom Domainとしてサブドメインを割り当てます。CloudflareがDNSとTLSを管理し、WorkerのStatic AssetsがRegistry JSONを配信します。

### 3.2 公開方法の選択

| 目的                             | 推奨方法                        | ドメイン購入 | 公式登録 |
| -------------------------------- | ------------------------------- | -----------: | -------: |
| 個人・小規模で試す               | 公開GitHub Registry             |         不要 |     不要 |
| 組織内で使う                     | ホスティングURLを各アプリへ登録 |         不要 |     不要 |
| 一般公開する                     | HTTPS/CDNと名前空間             |         任意 |     任意 |
| 設定なしで`@名前/項目`を使わせる | HTTPS/CDNと公式Directory        |         任意 |     必要 |

公開GitHub Registryなら、独自ドメインも静的JSON配信も不要です。

```sh
npx shadcn@latest add <GitHub-owner>/<repository>/button
```

現在の正式経路はCloudflare WorkersのHTTPS URLと`@yukihi`です。GitHub直接導入は代替経路とします。

## 4. ローカル生成

前提はNode.js、npm、React、TypeScript、Tailwind CSS v4です。このデザインシステムはRadix APIを前提にします。

```sh
npm ci
npm run typecheck
npm run registry:build
```

公開用JSONの`@yukihi`は次のURLへ解決します。`REGISTRY_BASE_URL`はローカル配信時にだけbaseの名前空間を差し替え、Git管理する生成JSONは変更しません。

```text
https://design.yukihi.tokyo/v1/r/button.json
```

生成後に確認します。

```sh
test -f public/r/registry.json
test -f public/r/button.json
test -f public/r/design-system.json
npx shadcn@latest view ./public/r/button.json
```

### 詰まりやすい点

- CIと同じ`npm ci`を使う。ロックファイルと`package.json`が不一致なら失敗する
- Tokenと共通CSSは分類別`registry.json`の`cssVars`・`css`を編集する
- ローカル導入検証では`REGISTRY_BASE_URL=http://127.0.0.1:4173/r npm run registry:serve`を使う
- `public/r`を手編集しない。原本を変更して`npm run registry:build`で再生成する
- 生成JSON内に`127.0.0.1`、`localhost`、`example.com`が残っていないことを本番配信前に検査する

## 5. CI

Pull Request検証と本番配信を別ジョブにします。本番配信は、Pull Requestの検査成功後に保護されたブランチまたはリリースタグからだけ実行します。

### 5.1 Pull Request検証

```sh
npm ci
npm run fmt:check
npm run lint
npm run typecheck
npm run registry:build
git diff --exit-code
```

`git diff`はGit管理するRegistry生成物のコミット漏れを検出します。生成物をGit管理しない方針には変更しません。

### 5.2 空アプリへの導入検証

元リポジトリの原本や`node_modules`を参照できないCI一時ディレクトリに、React + TypeScript + Tailwind v4アプリを作ります。次の系統を別々に検証します。

1. `design-system`全体の導入、型検査、production build
2. `button`など小さいセットの導入、型検査、production build
3. 個別アイコン1点の導入。他の47点が存在しないことの確認
4. アイコンbarrel、hook、ThemeProvider、Character、Patternの個別導入
5. `registry:base`のURLを指定した新規`init`とRadix実装・CSS・ビルド

全体導入の概略です。先にRegistryをCI内のHTTPサーバーで配信しておきます。

```sh
cd "$RUNNER_TEMP"
npx shadcn@latest init --template vite --base radix --no-monorepo --preset nova --name registry-consumer --yes
cd "$RUNNER_TEMP/registry-consumer"
npx shadcn@latest registry add '@yukihi=http://127.0.0.1:4173/r/{name}.json'
npx shadcn@latest add http://127.0.0.1:4173/r/design-system.json --yes
npm run build
```

導入アプリのCSSにはTailwindを読み込みます。Registry項目のToken・共通CSSはshadcn CLIが反映します。

```css
@import "tailwindcss";
```

### 詰まりやすい点

- shadcnの既定値に頼らず、必ず`--base radix`を明示する
- 初期化済みアプリへの`add`では、依存解決より先に`@yukihi`を登録する。base URLだけを渡すと公開URLを参照する場合がある
- `add`は既存styleを維持する。`new-york`固定は新規`init`で確認する
- Base UI構成ではRadix用`asChild`が変換され、型エラーになる可能性がある
- JSONファイルのSchema確認だけで成功としない。利用者と同じHTTP URLから`add`する
- 一時アプリが元リポジトリを参照できると、欠落依存を見逃す
- Registry導入後のCSS変数、全palette、Portal、Reduced Motionを画面でも確認する
- 個別アイコンでは対象SVGと`IconFrame`以外が入っていないことを検査する

### 5.3 ブラウザ検証

少なくとも次を実ブラウザで確認します。

- Dialog、Select、Combobox、ToastのPortalがProviderの配色を継承する
- CalendarとDatePickerの日本語日付
- FileUploadの選択、無効状態、エラー表示
- DataTableとAppShellの主要操作、キーボード操作、レスポンシブ表示
- フォーカス復帰、IME、Reduced Motion

テストアプリと検証画像はCI一時領域または別の検証リポジトリに置き、本体へ追加しません。

## 6. HTTPS配信

配信基盤とは、生成したJSONファイルをインターネット上で保存し、HTTPSリクエストへ応答するサービスです。今回はCloudflare WorkersのStatic Assetsを配信基盤とします。Cloudflare DNSはサブドメインの名前解決、Workerはファイルのbuild・保存・配信を担当します。

### 6.1 Cloudflare Workerを設定する

1. Cloudflare DashboardのWorkers & Pagesを開く
2. Workerを作成し、GitHubの`yukihito-jokyu/design-system`を接続する
3. Production branchを保護された既定ブランチにする
4. Root directoryはリポジトリルートにする
5. 次のbuild commandとdeploy commandを設定する

Build command：

```sh
npm ci && npm run typecheck && npm run registry:build && mkdir -p dist/v1 && cp -R public/r dist/v1/r
```

Deploy command：

```text
npx wrangler deploy
```

`public/r`をそのままoutputにすると公開パスは`/r/`となり、決定した`/v1/r/`になりません。そこで配信時だけ`dist/v1/r`へ配置します。`dist`は生成物でありGitへコミットしません。

### 6.2 サブドメインを接続する

1. WorkerのSettingsからDomains & Routesを開く
2. Custom Domainへ`design.yukihi.tokyo`を入力する
3. TLS証明書がActiveになるまで待つ

DNS画面で先にCNAMEを手作業するのではなく、WorkerのCustom Domainから追加します。CloudflareがDNSレコードと証明書を作成します。

### 6.3 配信内容を確認する

配信対象は`public/r/`から作成した`dist/v1/r/`です。

```text
public/r/registry.json → https://design.yukihi.tokyo/v1/r/registry.json
public/r/button.json   → https://design.yukihi.tokyo/v1/r/button.json
```

配信後に実際のサブドメインで確認します。

```sh
curl --fail https://design.yukihi.tokyo/v1/r/registry.json
curl --fail https://design.yukihi.tokyo/v1/r/button.json
npx shadcn@latest list https://design.yukihi.tokyo/v1/r/registry.json
npx shadcn@latest view https://design.yukihi.tokyo/v1/r/button.json
```

別の空ディレクトリから、公開URLをbaseに指定して最終導入確認します。

```sh
npx shadcn@latest init https://design.yukihi.tokyo/v1/r/design-system.json --template vite --base radix --name registry-consumer --yes
cd registry-consumer
npm run build
```

### 詰まりやすい点

- SPAフォールバックにより、存在しないJSONが`200 text/html`にならないようにする。存在しない項目は404を返す
- JSONの`Content-Type`、TLS証明書、DNS、社内プロキシを確認する
- 同じ`v1` URLを更新するため、長すぎるCDNキャッシュを避け、無効化手順を決める
- 生成JSON内の`config.registries.@yukihi`がlocalhostではなく本番URLか確認する
- 非公開Registryでは秘密をGitやJSONへ書かず、headerと環境変数で認証する
- 直前の正常な`public/r`へ戻せるロールバック手順を用意する

## 7. `@yukihi`の登録

名前空間の利用には次の2段階があります。

1. 各利用アプリへURLを登録する：shadcn公式への申請は不要
2. shadcn公式Directoryへ登録する：利用者の事前URL設定を不要にする場合だけ申請

### 7.1 各利用アプリへ登録する

各利用アプリで一度だけ実行します。

```sh
npx shadcn@latest registry add \
  @yukihi=https://design.yukihi.tokyo/v1/r/{name}.json
```

または`components.json`へ追加します。

```json
{
  "registries": {
    "@yukihi": "https://design.yukihi.tokyo/v1/r/{name}.json"
  }
}
```

登録確認：

```sh
npx shadcn@latest list @yukihi
npx shadcn@latest search @yukihi --query button
npx shadcn@latest view @yukihi/button
```

### 詰まりやすい点

- `{name}`を消さない。`@yukihi/button`の`button`がここへ入る
- アプリごとに名前を変えず、`@yukihi`へ統一する
- `@yukihi`はnpmスコープではない。`npm install @yukihi/button`とは別物である
- `components.json`がなければ、先に`npx shadcn@latest init --base radix`を実行する
- 公式Registry Directoryへ未登録なら、各アプリでこのURL登録が必要になる

### 7.2 shadcn公式Directoryへ登録する

公式登録は必須ではありません。未登録でも、前節の`registry add`または`components.json`設定後に`@yukihi/button`を利用できます。

公式Directoryへ登録すると、利用者はURLを事前設定せずに名前空間を利用できます。申請前に https://ui.shadcn.com/r/registries.json で希望する名前が使われていないか確認します。

申請前に公式一覧で`@yukihi`が未使用であることを確認します。使用済みなら`@yukihi-ui`など一意な候補を決め、この文書、README、利用アプリの`components.json`を同時に更新します。

公式Directoryの要件は次です。

- Registryがオープンソースである
- インターネットから認証なしで取得できる
- `registry.json`が公式Schemaに準拠する
- endpoint直下に`registry.json`と各`<item>.json`が並ぶフラット構造である
- catalog内の`files`に`content`を含めない

非公開・社内限定Registryは公式Directoryへ申請せず、利用アプリへ手動登録します。

申請手順：

1. 権利者が独自コードの公開ライセンスと公開範囲を決定する
2. 公開URLから`registry.json`と各item JSONを取得できるようにする
3. 公開URLで`list`、`search`、`view`、`add`を検証する
4. `shadcn-ui/ui`リポジトリをforkする
5. `apps/v4/registry/directory.json`へ名前空間とRegistry URLを追加する
6. shadcn側の開発手順に従い`pnpm validate:registries`を実行する
7. `shadcn-ui/ui`へPull Requestを作成する
8. レビュー指摘を修正し、merge後に新しい空アプリから確認する

申請前の検証例：

```sh
npx shadcn@latest list https://design.yukihi.tokyo/v1/r/registry.json
npx shadcn@latest search https://design.yukihi.tokyo/v1/r/registry.json --query button
npx shadcn@latest view https://design.yukihi.tokyo/v1/r/button.json
```

merge後は、名前空間URLを手動登録していない新しいアプリで確認します。

```sh
npx shadcn@latest add @yukihi/button
```

公式申請は外部リポジトリへのPull Requestを伴います。公開準備と権利確認の完了後、明示的な承認を得て実施します。

## 8. 利用アプリへの導入

通常は必要な項目だけ導入します。

```sh
npx shadcn@latest add @yukihi/button
npx shadcn@latest add @yukihi/dialog
npx shadcn@latest add @yukihi/app-shell
```

個別アイコンと動的Character APIは依存範囲が異なります。

```sh
# 対象アイコンとIconFrameだけ
npx shadcn@latest add @yukihi/ink-idea-feature-icon

# 全Characterアイコンを動的に選択するAPI
npx shadcn@latest add @yukihi/character-icons
```

全項目導入：

```sh
npx shadcn@latest add @yukihi/design-system
```

全体導入は100以上のファイルと関連パッケージを追加します。新規アプリ、検証アプリ、全機能が必要なアプリに限定し、通常は必要なPatternまたは部品だけを導入します。

アプリのCSSではTailwindを読み込みます。共通スタイルはCLIが直接反映します。

```css
@import "tailwindcss";
```

利用範囲をProviderで囲みます。

```tsx
import { DesignThemeProvider } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";

export function SaveAction() {
  return (
    <DesignThemeProvider theme="sage">
      <Button>保存する</Button>
    </DesignThemeProvider>
  );
}
```

### 既存ファイルとの衝突

Registryはソースを利用アプリへコピーします。同名ファイルがあると上書き確認が発生します。未コミット変更がある状態で一括上書きしません。

```sh
git status
npx shadcn@latest view @yukihi/button
# add後
git diff
npm run typecheck
npm run build
```

## 9. 更新とバージョン

`v1`では、既存Propsを壊さない修正、アクセシビリティ改善、意味を変えないToken追加、新項目追加を行えます。

export・Props・Token・importパスの削除や意味変更、primitiveの変更は`v2`を検討します。移行期間は両方を配信できます。

```json
{
  "registries": {
    "@yukihi": "https://design.yukihi.tokyo/v1/r/{name}.json",
    "@yukihi-next": "https://design.yukihi.tokyo/v2/r/{name}.json"
  }
}
```

配信側を更新しても、利用アプリへコピー済みのコードは自動更新されません。更新時は利用アプリで再度`add`し、上書き前後の差分をレビューします。

## 10. AIへ渡すルール

利用アプリの`AGENTS.md`などへ、最低限次を記載します。

```md
- UI実装前に `npx shadcn@latest search @yukihi --query <用途>` で検索する。
- 導入前に `npx shadcn@latest view @yukihi/<item>` で内容と依存を確認する。
- Pattern、Foundation、独自合成の順で検討する。
- 共通値をハードコードせず、導入済みTokenを使用する。
- Tokenの正本`registry/new-york/styles/registry.json`に移した値を不用意に変更しない。
- SVGの形、固有色、名前付きexportを変更しない。
- Portal、disabled、invalid、loading、IME、フォーカス復帰、Reduced Motionを維持する。
- `@yukihi/design-system`を無条件に導入せず、必要項目だけ導入する。
```

現在のRegistryは、多くの項目の説明が汎用的です。AIの選択精度を上げるには、各項目へ「用途」「使わない条件」「主要Props」「短い例」「関連Pattern」を追加する必要があります。

## 11. 公開前チェックリスト

### GitHub

- [ ] 独自コードの公開ライセンスを権利者が決めた
- [ ] `main`へのPull RequestでCIを必須化した
- [ ] Token、SVG、exportのレビュー担当を決めた
- [ ] 秘密情報が履歴と生成JSONにない

### CI

- [ ] install、format、lint、型検査、Registry生成物の同期が成功する
- [ ] 本番URLでRegistryを生成する
- [ ] JSONにlocalhostや仮ドメインが残っていない
- [ ] 全体、小規模、個別アイコンの導入が成功する
- [ ] 一時アプリの型検査、build、主要操作が成功する

### HTTPS

- [ ] 実在ドメイン、DNS、TLSが設定済み
- [ ] `/v1/r/registry.json`と各item JSONを取得できる
- [ ] 存在しない項目が404を返す
- [ ] キャッシュ無効化とロールバック方法がある
- [ ] 非公開の場合は認証とトークン更新方法がある

### 利用者向け

- [ ] `@yukihi`登録手順がある
- [ ] Tailwind v4と`--base radix`を明記した
- [ ] CSSへのRegistry自動反映とProviderの例がある
- [ ] 検索、確認、個別導入方法がある
- [ ] 破壊的変更の通知先と移行方法がある

## 12. 障害の切り分け

| 症状                           | 最初に確認する場所                                |
| ------------------------------ | ------------------------------------------------- |
| `@yukihi/button`が見つからない | `components.json`、`{name}`、公開URL              |
| JSON parse error               | URLが404ページやSPAのHTMLを返していないか         |
| 依存項目だけ取得できない       | `registryDependencies`が本番URLか                 |
| `asChild`付近の型エラー        | `shadcn init --base radix`を使用したか            |
| Tokenが反映されない            | `design-system-styles`が導入されCSSへ反映されたか |
| Portalだけ色が違う             | ProviderとPortalの`data-ds-base`継承              |
| importが解決しない             | `components.json`と`tsconfig.json`のalias         |
| 個別アイコンで全点が入る       | `character-icons`でなく個別itemを指定したか       |
| 更新後も古い                   | CDNキャッシュと配信中JSON                         |
| 利用アプリの変更が消えた       | `add`時に既存ファイルを上書きしていないか         |

報告時は、秘密情報を除いて、実行コマンド、Node.js・shadcnバージョン、`components.json`、対象URL、`shadcn view`結果、エラー、導入前後の差分を添えます。

## 13. 公式仕様

- Registry構築: https://ui.shadcn.com/docs/registry/getting-started
- 名前空間: https://ui.shadcn.com/docs/registry/namespace
- Registry Schema: https://ui.shadcn.com/docs/registry/registry-json
- Registry item例: https://ui.shadcn.com/docs/registry/examples
- CLI: https://ui.shadcn.com/docs/cli

shadcn更新時は、Schema、CLIコマンド、Radix指定、ファイルtargetの動作を再検証します。
