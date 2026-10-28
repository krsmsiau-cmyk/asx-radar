# ASX Radar V3.5 — 我的追蹤

保留 V3.4 新聞分析及股票掃描，新增收藏、持續追蹤和績效比較。收藏使用最新可取得的日線價格，不會事後更改起點。10、20 交易日使用對應收盤價，一個月使用滿一個曆月之後的第一筆交易日收盤價。需手動按更新或開啟時操作，PWA 關閉不會後台運作。資料儲存在本機 localStorage，請使用 App 的「匯出追蹤備份 JSON」定期備份。

部署：GitHub 專案根目錄替換 index.html、sw.js、CHANGELOG.md、README.md。保留 netlify/functions/research.mjs、manifest.webmanifest、圖示等原檔。Netlify 連動 main 分支時會自動部署。

# ASX Radar V3.0

免電腦的 iPhone PWA，採用 GitHub + Netlify 靜態部署。

## 更新到既有 GitHub Repo
將 `index.html`、`sw.js`、`manifest.webmanifest` 三個檔案上傳到現有專案的**根目錄**並覆蓋同名檔案，另外新增 `CHANGELOG.md`。若 Netlify 已連接 GitHub main，部署會自動啟動。檢查 App 標頭顯示 `V3.0 · 基本面研究版`。不要上傳整個 ZIP 當作網站。

## 基本面功能的資料來源
Yahoo Finance 非官方 chart endpoint 只提供價格與交易資料；完整 ASX 財報無法在不具授權及穩定 API 的情況下保證自動抓取。V3 提供 ASX 公告、Yahoo 財務報表與統計資料的查找入口，使用者自行核對財報後填入數字。所有填入內容僅保存在 iPhone 本地瀏覽器，不會傳到伺服器。

## 已知限制
- 精選前三名僅從預設 16 檔觀察名單使用技術指標排名，不包含基本面。
- 基本面不會自動填入，未取得的欄位顯示缺值，沒有虛構獲利機率。
- 公開網頁免費 Yahoo 行情代理可能中斷、限流、延遲。
- 不能保證獲利或達成 +10%。


V3.1 精簡介面：預設保留三檔候選、個股價格與訊號、10%情境及停損參考。其他分析點按展開。更新時替換 index.html、sw.js，並新增 CHANGELOG.md。


## V3.2
- 開啟 App 自動播放短暫的 ASX Radar 啟動畫面，然後進入精簡首頁。
- GitHub/Netlify 更新：覆蓋 index.html、sw.js、CHANGELOG.md；保留其餘檔案。


## V3.3 新聞搜尋（需 Netlify）
精選股會透過 netlify/functions/research.mjs 查詢 Google 新聞 RSS。必須部署整個資料夾（包含 netlify/functions/research.mjs），不能只更新 index.html。新聞摘要不代表事實已核對，財報仍以官方 ASX 文件為準。無法取得新聞時不提供買進結論。無法保證 Google 新聞 RSS 永遠可用或涵蓋所有 ASX 公告。


V3.4: 掃描卡會自動呈現規則式結論和三項理由；新聞證據置於可展開區。此版本僅能比對新聞標題，尚未自動驗證財報或 ASX 公告全文，無法證明買進成功率。
