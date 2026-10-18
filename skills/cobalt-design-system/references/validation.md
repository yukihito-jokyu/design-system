# 検証

## 導入とAPI

- `view @yukihi/cobalt-<item>`のname・依存・targetを確認する。利用アプリに`@/registry/`のimportやnew-york専用Token・テーマが残らないことを確認する。
- 個別導入では必要な依存とCSSが入り、一括導入ではcobaltだけが含まれることを確認する。CSSは入口から一度読み込み、Providerの`theme="light"`を確認する。
- [導入手順](installation.md#cssとprovider)に従い、Google FontsのimportをTailwindより前に置く。production buildでimport順序の警告がなく、ブラウザーでNoto Sans JPが読み込まれることを確認する。CSSの`font-family`指定だけで読み込み成功と判断しない。
- 変更した使用例を導入後の型定義で検査する。依存まで実際に導入して確かめ、原本のimport先だけを手作業で書き換えた検査と区別する。
- 利用アプリのスクリプトに合わせ、型検査・lint・production buildを実行する。たとえば`npm run typecheck`、`npm run lint`、`npm run build`。失敗・未実施を成功としない。

## 見た目と操作

代表的なPC（1280px）とスマホ（390px）の画面を外部一時アプリで組み立てる。320px、600/601px、767/768pxも影響する切替の前後で確認する。画像で見出し、文字の欠け、余白、主要操作、画面全体の横はみ出しを確認する。

- Portal：Dialog・Select・Combobox・Toastの色とToken継承。
- Form：disabled・invalid・loading、IME確定時の意図しない送信防止、失敗後の値保持、二重送信防止。
- Overlay：Tab・Shift+Tab・Escape、外側操作、閉じた後のフォーカス復帰、狭い画面でのスクロール。
- Calendar：日本語表記、無効日、キーボード操作。FileUpload：accept、上限、複数選択、失敗・再試行。
- DataTable：検索、フィルター解除、並べ替え、選択範囲、ページ送り、初回0件と検索0件。
- AppShell：スキップリンク、ナビゲーション、aside、モバイルメニュー。画面内の`main`を重複させない。対応するページでは`contentElement="section"`を使える。
- アイコンのみの操作に名前を付け、FormFieldのbindingを入力へ渡す。エラーを色だけで伝えず、状態通知でフォーカスを奪わない。

## Motion

動く部品に対し、親ON/OFF × 部品inherit/on/off × Reduced Motion有無をPC・スマホで確認する。期待値は[優先順位](motion.md)に従う。全設定を同じ見た目と判断せず、実際の押下・開閉・選択・保存などを起こして確認する。

再生途中のOFF、OFF→ON、連続操作を試し、不要な再生がなく、入力値・選択・フォーカス・処理結果が保持されることを確認する。Portal内でも同じ優先順位を確かめる。ブラウザーのメディア設定による検証と、実機OS設定による検証は区別して報告する。

検証用アプリ・画像・ログ・静的出力はこのリポジトリへ追加しない。実装・配布物・スキルの整合と実行結果を示して、人間の内容確認を受ける。自動検査だけで人間の確認済みとは扱わない。
