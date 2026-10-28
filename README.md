# ASX Radar iPhone PWA (免費原型)

此為繁體中文手機優先 PWA：查詢 ASX 股票代碼、Yahoo Finance 最新可取得的日線、MA20/50/200、RSI14、MACD、相對成交量、ATR14、規則式觀察訊號，以及 +10% 目標價情境。

## 只用 iPhone 部署（GitHub Pages）

1. 在 iPhone「檔案」App 中點開下載的 `asx-pwa.zip`，會解壓出 `asx-pwa` 資料夾。
2. 用 iPhone Safari 登入 https://github.com 並新建一個 **Public** repository，例：`asx-radar`。
3. 在 repo 點 `Add file` → `Upload files`，從「檔案」App 選取資料夾內 **index.html、manifest.webmanifest、sw.js、icon-192.png、icon-512.png** 五個檔案，上傳到 repo 根目錄。若手機版看不到操作，Safari 選「要求桌面網站」。請不要只上傳 zip。
4. `Settings` → `Pages` → `Build and deployment` → `Deploy from a branch`，選 `main` + `/(root)`，儲存。等 GitHub 完成部署，再開啟 `https://你的帳號.github.io/asx-radar/`。
5. Safari 開啟該網址 → 分享 → 加入主畫面 → 啟用「作為網頁 App 開啟」→ 加入。全程不需要電腦，也不需 App Store。

若 repository 名稱不同，網址最後一段請改成真實名稱。GitHub 免費 Pages 公開存放庫通常可用；依其現行政策為準。首次建立 repo 可能需要驗證帳號。

## 重要限制

- **不能承諾此免費資料鏈路長期穩定。** Yahoo Finance 圖表 API 非官方；Safari 不允許直接跨來源讀取，原型預設經由免費第三方 `https://proxy.cors.dev/` 請求。若代理遭限流、服務故障或 Yahoo 限制查詢，App 會顯示錯誤，不會生成虛構行情。
- 第三方代理會看到所查股票代碼，請勿透過此程式傳送私人資料或 API 金鑰。公開網站也要自行確認資料來源與代理的使用條款。
- 非即時，最新日線與盤中報價可能不同，並非真正秒級訊號；資料若超過五日會禁止顯示新訊號。
- 尚**未**整合最新財報、正式 ASX 公告、全市場掃描、交易策略回測、AI 預測或已校準的 10% 成功機率。不要把規則分數誤認為預測機率。
- PWA 會緩存程式外殼以便離線開啟，但不儲存可離線使用的行情。安裝後仍需要連網查價。

## 修改代理

開啟 `index.html`，搜尋 `https://proxy.cors.dev/`。可改成你自己有授權、支援 CORS 的代理，並確認它允許向 Yahoo 圖表接口讀取資料。不要把第三方 API 金鑰寫進公開的 HTML。
