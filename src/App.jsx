import { useState } from "react";

/* Starbucks brand palette */
const C = {
  green: "#00704A",    // Starbucks primary green
  dkGreen: "#1E3932", // Starbucks dark green
  ltGreen: "#D4E9E2",  // Light green tint
  cream: "#F7F4EF",    // Warm cream bg
  warmBg: "#FFFDF8",   // Card bg
  copper: "#C4842D",   // Warm accent
  brown: "#3C2415",    // Dark text
  brownMed: "#5C4033", // Medium text
  brownLt: "#8B7355",  // Muted text
  border: "#E8E0D4",   // Warm border
  gold: "#C4942D",
  tierGreen: "#00704A",
  tierGold: "#B8860B",
  tierPurple: "#7B2D8E",
  red: "#B84040",
};

const Bi = ({ en, zh, lang, enStyle = {}, zhStyle = {} }) => (
  <>
    {(lang === "en" || lang === "both") && (
      <div style={{ fontSize: 15, lineHeight: 1.95, color: C.brown, whiteSpace: "pre-wrap", ...enStyle }}>{en}</div>
    )}
    {lang === "both" && <div style={{ height: 10 }} />}
    {(lang === "zh" || lang === "both") && (
      <div style={{
        fontSize: 15, lineHeight: 1.95, whiteSpace: "pre-wrap",
        color: lang === "both" ? C.green : C.brown,
        borderLeft: lang === "both" ? `2px solid ${C.green}44` : "none",
        paddingLeft: lang === "both" ? 14 : 0, ...zhStyle
      }}>{zh}</div>
    )}
  </>
);

const Stat = ({ value, label, accent = C.green }) => (
  <div style={{
    background: C.warmBg, border: `1px solid ${C.border}`,
    borderRadius: 10, padding: "16px 18px", textAlign: "center", minWidth: 110, flex: "1 1 130px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.04)"
  }}>
    <div style={{ fontSize: 24, fontWeight: "bold", color: accent, fontFamily: "system-ui, -apple-system, sans-serif" }}>{value}</div>
    <div style={{ fontSize: 12, color: C.brownLt, marginTop: 4, lineHeight: 1.4 }}>{label}</div>
  </div>
);

const TierCard = ({ name, range, rate, color, bg, perks, lang }) => (
  <div style={{ flex: "1 1 260px", borderRadius: 12, overflow: "hidden", border: `1px solid ${color}30`, background: bg, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
    <div style={{ background: `${color}15`, padding: "14px 18px", borderBottom: `1px solid ${color}25`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <span style={{ fontWeight: "bold", fontSize: 16, color, letterSpacing: 1 }}>{name}</span>
      <span style={{ fontSize: 11, background: `${color}18`, color, padding: "4px 12px", borderRadius: 20, fontWeight: "bold", border: `1px solid ${color}30` }}>{range}</span>
    </div>
    <div style={{ padding: "16px 18px" }}>
      <div style={{ fontSize: 24, fontWeight: "bold", color, marginBottom: 12, fontFamily: "system-ui, -apple-system, sans-serif" }}>{rate}</div>
      <div style={{ fontSize: 14, lineHeight: 1.85, color: C.brownMed }}>
        {perks.map((p, i) => <div key={i} style={{ marginBottom: 5 }}><span style={{ color, marginRight: 7, fontSize: 10 }}>⬤</span>{lang === "zh" ? p.zh : p.en}</div>)}
      </div>
    </div>
  </div>
);

const SpeechCard = ({ time, label, en, zh, lang }) => {
  const colors = { "30s": { bg: "#FFF8ED", border: C.copper, badge: C.copper }, "15s": { bg: "#EDF5F0", border: C.green, badge: C.green }, "5s": { bg: "#F5EDF8", border: C.tierPurple, badge: C.tierPurple } };
  const c = colors[time] || colors["30s"];
  return (
    <div style={{ background: c.bg, border: `1px solid ${c.border}25`, borderRadius: 12, padding: "20px 22px", marginBottom: 16, borderLeft: `4px solid ${c.border}` }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
        <span style={{ background: `${c.badge}15`, color: c.badge, padding: "4px 14px", borderRadius: 20, fontSize: 12, fontWeight: "bold", border: `1px solid ${c.badge}30` }}>⏱ {time}</span>
        <span style={{ fontSize: 14, fontWeight: "bold", color: C.dkGreen }}>{label}</span>
      </div>
      <Bi en={en} zh={zh} lang={lang}
        enStyle={{ fontStyle: "italic", background: "rgba(255,255,255,0.7)", padding: "14px 16px", borderRadius: 8, fontSize: 13.5, border: `1px solid ${C.border}` }}
        zhStyle={{ background: lang === "both" ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.7)", padding: "14px 16px", borderRadius: 8, fontSize: 13.5, border: `1px solid ${C.border}`, borderLeft: lang === "both" ? `2px solid ${C.green}44` : `1px solid ${C.border}` }}
      />
    </div>
  );
};

const QACard = ({ q, aEn, aZh, lang }) => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ background: C.warmBg, border: `1px solid ${C.border}`, borderRadius: 12, marginBottom: 12, overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.03)" }}>
      <button onClick={() => setOpen(!open)} style={{
        width: "100%", textAlign: "left", background: open ? `${C.green}08` : "transparent",
        border: "none", padding: "16px 20px", cursor: "pointer", display: "flex", alignItems: "flex-start", gap: 10,
        color: C.brown, fontFamily: "inherit", fontSize: 15, lineHeight: 1.6
      }}>
        <span style={{ background: `${C.green}15`, color: C.green, padding: "3px 10px", borderRadius: 4, fontSize: 12, fontWeight: "bold", flexShrink: 0, marginTop: 1 }}>Q</span>
        <span style={{ fontWeight: "bold", flex: 1 }}>{q}</span>
        <span style={{ color: C.brownLt, fontSize: 18, flexShrink: 0, transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "rotate(0)" }}>▾</span>
      </button>
      {open && (
        <div style={{ padding: "0 20px 18px 20px", borderTop: `1px solid ${C.border}` }}>
          <div style={{ display: "flex", gap: 10, alignItems: "flex-start", marginTop: 14 }}>
            <span style={{ background: `${C.copper}15`, color: C.copper, padding: "3px 10px", borderRadius: 4, fontSize: 12, fontWeight: "bold", flexShrink: 0, marginTop: 3 }}>A</span>
            <div style={{ flex: 1 }}><Bi en={aEn} zh={aZh} lang={lang} /></div>
          </div>
        </div>
      )}
    </div>
  );
};

const SH = ({ icon, title }) => (
  <h3 style={{ fontSize: 15, color: C.dkGreen, margin: "28px 0 14px", fontWeight: "bold", display: "flex", alignItems: "center", gap: 8, borderBottom: `1px solid ${C.green}20`, paddingBottom: 10 }}>
    <span>{icon}</span> {title}
  </h3>
);

const NAV = [
  { id: "background", icon: "📋", en: "Case Background", zh: "案例背景" },
  { id: "program", icon: "⭐", en: "Program Details", zh: "計畫細節" },
  { id: "mobile", icon: "📱", en: "Why Mobile Mktg", zh: "為何行動行銷" },
  { id: "backlash", icon: "🔥", en: "Backlash", zh: "消費者反彈" },
  { id: "theory", icon: "📚", en: "Theory Links", zh: "理論連結" },
  { id: "scripts", icon: "🎤", en: "Delivery Scripts", zh: "發言稿" },
  { id: "qa", icon: "❓", en: "Q&A Prep", zh: "問答準備" },
  { id: "data", icon: "📊", en: "Key Numbers", zh: "必記數據" },
];

export default function App() {
  const [sec, setSec] = useState("background");
  const [lang, setLang] = useState("both");
  const [menuOpen, setMenuOpen] = useState(false);
  const effLang = lang === "zh" ? "zh" : "en";

  const R = () => { switch(sec) {
    case "background": return (<div>
      <SH icon="🏢" title="Company Overview / 公司概況" />
      <Bi lang={lang} en={`Starbucks Coffee Company (Nasdaq: SBUX), founded in 1971 in Seattle, operates over 41,000 stores globally. It is the world's largest specialty coffee retailer. CEO Brian Niccol (appointed August 2024, formerly CEO of Chipotle) introduced the "Back to Starbucks" revitalization strategy in October 2024 to address declining comparable store sales, rebuild in-store experience, and reinvigorate the brand's relationship with customers.`} zh={`星巴克咖啡公司（Nasdaq: SBUX），1971年創立於西雅圖，全球營運超過41,000家門市，為全球最大精品咖啡零售商。現任執行長Brian Niccol（2024年8月上任，前Chipotle執行長）於2024年10月推出「Back to Starbucks」復興策略，旨在因應同店銷售下滑、重建門市體驗，並重新活化品牌與顧客的關係。`} />
      <SH icon="📜" title="Starbucks Rewards History / 獎勵計畫沿革" />
      <Bi lang={lang} en={`The Starbucks Rewards program launched in 2009, initially using physical stamp cards. The critical inflection point came with the shift to mobile/digital integration. By Q1 FY26 (ending Dec 2025), the program reached an all-time high of 35.5 million 90-day active U.S. members. Rewards members drive approximately 57–60% of total U.S. company-operated store revenue. Starbucks also holds approximately $1.77 billion in unredeemed prepaid card funds (as of 2024) — functioning effectively as an interest-free loan from customers, a financial moat rivaling some financial institutions.`} zh={`星巴克獎勵計畫於2009年推出，最初使用紙本集點卡。關鍵轉折點在於轉向行動/數位整合。截至FY26第一季（2025年12月止），該計畫達到歷史新高的3,550萬名90天活躍美國會員。獎勵會員貢獻約57–60%的美國直營門市營收。星巴克另持有約17.7億美元未兌換預付卡資金（截至2024年）——實質上等同於顧客提供的無息貸款，形成可與金融機構匹敵的財務護城河。`} />
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", margin: "18px 0" }}>
        <Stat value="2009" label="Program launched" accent={C.dkGreen} />
        <Stat value="35.5M" label="Active U.S. members" accent={C.green} />
        <Stat value="57–60%" label="Revenue from members" accent={C.copper} />
        <Stat value="$1.77B" label="Unredeemed funds" accent={C.red} />
      </div>
      <SH icon="📅" title="What Happened on March 10, 2026 / 3月10日事件" />
      <Bi lang={lang} en={`Starbucks officially launched its reimagined Rewards loyalty program, replacing the previous flat-earning model with a three-tier structure: Green, Gold, and Reserve. This is a key milestone in the "Back to Starbucks" strategy. The overhaul was first unveiled at Starbucks' 2026 Investor Day on January 29, 2026. The entire program operates through the Starbucks mobile app.`} zh={`星巴克正式推出重新設計的獎勵忠誠計畫，以三層級結構（Green綠色、Gold金色、Reserve典藏）取代原先的統一累積模式。這是「Back to Starbucks」策略的關鍵里程碑。改革於2026年1月29日的星巴克投資人日首次公布。整個計畫透過星巴克行動應用程式運作。`} />
    </div>);

    case "program": return (<div>
      <SH icon="🏅" title="Three-Tier Structure / 三層級結構" />
      <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 24 }}>
        <TierCard name="GREEN" range="0–499 ⭐/yr" rate="1 Star / $1" color={C.tierGreen} bg="#F0F8F4" lang={effLang} perks={[
          { en: "Free birthday reward (birthday only)", zh: "生日當天免費獎勵" },
          { en: "Free Mod Mondays (1×/month, up to $2)", zh: "每月免費客製星期一（1次，至多$2）" },
          { en: "Personalized offers & early access", zh: "個人化優惠及早鳥權限" },
          { en: "Stars expire 6 months (extendable)", zh: "星星6個月過期（可延期）" },
        ]} />
        <TierCard name="GOLD" range="500–2,499 ⭐/yr" rate="1.2 Stars / $1" color={C.tierGold} bg="#FDF8ED" lang={effLang} perks={[
          { en: "Stars never expire", zh: "星星永不過期" },
          { en: "4+ extra Double Star Days/year", zh: "每年4+額外Double Star Days" },
          { en: "Birthday window: 7 days", zh: "生日獎勵窗口：7天" },
          { en: "All Green benefits + enhanced offers", zh: "所有Green福利 + 進階優惠" },
        ]} />
        <TierCard name="RESERVE" range="2,500+ ⭐/yr" rate="1.7 Stars / $1" color={C.tierPurple} bg="#F5EDF8" lang={effLang} perks={[
          { en: "Stars never expire", zh: "星星永不過期" },
          { en: "Personalized Reserve membership card", zh: "個人化Reserve會員卡" },
          { en: "Exclusive experiences (Tokyo trip!)", zh: "獨家體驗（東京之旅！）" },
          { en: "Birthday window: full birth month", zh: "生日獎勵窗口：整個生日月" },
        ]} />
      </div>
      <SH icon="🔄" title="Old vs. New System / 新舊制度比較" />
      <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 16 }}>
        <div style={{ flex: "1 1 280px", background: "#FDF2F2", border: "1px solid #E8C0C0", borderRadius: 10, padding: "16px 18px" }}>
          <div style={{ fontSize: 12, fontWeight: "bold", color: C.red, marginBottom: 10, textTransform: "uppercase", letterSpacing: 1 }}>❌ Old System / 舊制度</div>
          <Bi lang={lang} en="Flat structure — all members equal. Earned 2 Stars per $1 via Starbucks Card/app. 1 Star per $1 with other payment. No tier differentiation. Stars expired uniformly." zh="統一結構——所有會員平等。使用星巴克卡/app支付每$1賺2星。其他支付每$1賺1星。無層級區分。星星統一過期。" enStyle={{ fontSize: 13 }} zhStyle={{ fontSize: 13 }} />
        </div>
        <div style={{ flex: "1 1 280px", background: "#EFF8F3", border: `1px solid ${C.ltGreen}`, borderRadius: 10, padding: "16px 18px" }}>
          <div style={{ fontSize: 12, fontWeight: "bold", color: C.green, marginBottom: 10, textTransform: "uppercase", letterSpacing: 1 }}>✅ New System / 新制度</div>
          <Bi lang={lang} en="Tiered structure — benefits scale with engagement. Earning tied to tier level, not payment method. Green base: 1 Star/$1 (down from 2). Digital reload bonuses: 10 Stars for $30+, 25 Stars for $50+. Cross-partner: Delta SkyMiles® & Marriott Bonvoy®." zh="分層結構——福利隨互動升級。累積與層級掛鉤，非支付方式。Green基礎：$1賺1星（從2星降）。數位儲值獎勵：$30+獲10星，$50+獲25星。跨品牌：Delta SkyMiles® & Marriott Bonvoy®。" enStyle={{ fontSize: 13 }} zhStyle={{ fontSize: 13 }} />
        </div>
      </div>
      <div style={{ background: "#FFF8ED", border: `1px solid ${C.copper}30`, borderRadius: 10, padding: "14px 18px", marginBottom: 16, borderLeft: `4px solid ${C.copper}` }}>
        <div style={{ fontSize: 12, fontWeight: "bold", color: C.copper, marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>⚠️ Critical Implication / 關鍵影響</div>
        <Bi lang={lang} en="For the majority of existing members who previously earned 2 Stars/$1 through Starbucks Card, the base earning rate has been CUT by at least 25–50%. Only Reserve members ($2,500+/year) earn at rates comparable to the old system." zh="對大多數原先透過星巴克卡每$1賺2星的現有會員而言，基礎累積率被削減至少25–50%。唯有Reserve會員（年消費$2,500+）才能達到與舊制度相當的累積率。" enStyle={{ fontSize: 13 }} zhStyle={{ fontSize: 13 }} />
      </div>
      <SH icon="🎉" title="Launch Promotions / 上線促銷活動" />
      <Bi lang={lang} en={"Triple Star Day (March 11): Members earn at least 3× Stars on all purchases.\n\nSecret Menu Drinks (limited time, app-exclusive):\n  • Green — Iced Matcha Latte with strawberry purée & banana cream cold foam\n  • Gold — Iced Caramel Macchiato with toasted coconut cream cold foam & caramel crunch\n  • Reserve — Ube Shaken Espresso with mocha drizzle, ube powder & chocolate cream cold foam\n\nFirst Free Mod Monday: March 16 — every member gets one free modifier on any handcrafted drink."} zh={"Triple Star Day（3月11日）：會員所有購買至少賺取3倍星星。\n\n限時祕密菜單飲品（app專屬）：\n  • Green——抹茶拿鐵加草莓果泥及香蕉奶油冷泡沫\n  • Gold——焦糖瑪奇朵加烤椰子奶油冷泡沫及焦糖脆片\n  • Reserve——芋頭搖滾濃縮加摩卡醬、芋頭粉及巧克力奶油冷泡沫\n\n首次Free Mod Monday：3月16日——每位會員可獲一杯手工飲品的免費客製化。"} />
    </div>);

    case "mobile": return (<div>
      <SH icon="📱" title="The App IS the Program / App就是計畫本身" />
      <Bi lang={lang} en="This is not a loyalty program that happens to have an app. The app IS the program. Every single element operates through mobile:" zh="這不是一個「恰好有app」的忠誠計畫。App本身就是計畫。每一個元素都透過行動裝置運作：" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 12, margin: "16px 0 24px" }}>
        {[
          { n:"1", t:"Tier Management / 層級管理", en:"Members check Green/Gold/Reserve status and track progress in real time via the app.", zh:"會員透過app即時查看層級狀態並追蹤晉升進度。" },
          { n:"2", t:"Star Tracking / 星星追蹤", en:"All Star earning — purchases, Double Star Days, reloads, games — recorded and displayed in-app.", zh:"所有星星累積——購買、Double Star Days、儲值、遊戲——均在app內記錄顯示。" },
          { n:"3", t:"Reward Redemption / 獎勵兌換", en:"60-Star ($2 off), 100-Star (free coffee), 200-Star (free drink), 400-Star (merch) — all in-app.", zh:"60星（$2折扣）、100星（免費咖啡）、200星（免費飲品）、400星（商品）——全在app內。" },
          { n:"4", t:"Push Notifications / 推播通知", en:"Tier-specific personalized offers, Double Star Day alerts, product recs based on behavioral data.", zh:"層級專屬個人化優惠、Double Star Day提醒、基於行為數據的產品推薦。" },
          { n:"5", t:"Mobile Order & Pay / 行動點餐支付", en:"Order ahead, scan-to-pay in-store, digital wallet (Starbucks Card reload) — all through app.", zh:"提前點餐、店內掃碼支付、數位錢包（星巴克卡儲值）——全透過app。" },
          { n:"6", t:"App-Exclusive Content / App獨家內容", en:"Tier-specific secret menu drinks are ONLY available to order through the app — not at the counter.", zh:"層級專屬祕密菜單飲品僅能透過app點餐——不能在櫃台點。" },
          { n:"7", t:"Cross-Partner Links / 跨品牌連結", en:"Linking with Delta SkyMiles® and Marriott Bonvoy® managed through app account settings.", zh:"與Delta SkyMiles®及Marriott Bonvoy®的連結透過app帳戶設定管理。" },
          { n:"8", t:"Data Engine / 數據引擎", en:"App processes 100M+ weekly transactions — behavioral data fuels hyper-local, individualized marketing.", zh:"App每週處理1億+交易——行為數據驅動超在地化、個人化行銷。" },
        ].map(item => (
          <div key={item.n} style={{ background: C.warmBg, border: `1px solid ${C.border}`, borderRadius: 10, padding: "14px 16px", boxShadow: "0 1px 3px rgba(0,0,0,0.03)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <span style={{ background: C.ltGreen, color: C.green, width: 26, height: 26, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: "bold", flexShrink: 0 }}>{item.n}</span>
              <span style={{ fontSize: 13, fontWeight: "bold", color: C.dkGreen }}>{item.t}</span>
            </div>
            <div style={{ fontSize: 13.5, lineHeight: 1.8, color: C.brownMed }}>
              {(lang === "en" || lang === "both") && <div>{item.en}</div>}
              {lang === "both" && <div style={{ color: C.green, marginTop: 4, fontSize: 12 }}>{item.zh}</div>}
              {lang === "zh" && <div>{item.zh}</div>}
            </div>
          </div>
        ))}
      </div>
      <SH icon="📈" title="Scale & Impact / 規模與影響" />
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <Stat value="35.5M" label="Active U.S. members" accent={C.green} />
        <Stat value="57–60%" label="Revenue from members" accent={C.copper} />
        <Stat value="3×" label="Spend vs. non-members" accent={C.dkGreen} />
        <Stat value="64%" label="Use app every visit" accent={C.tierPurple} />
        <Stat value="100M+" label="Weekly transactions" accent={C.tierGold} />
      </div>
    </div>);

    case "backlash": return (<div>
      <SH icon="💥" title="Immediate Reaction / 即時反應" />
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 18 }}>
        <Stat value="500K+" label="TikTok views in 24hrs" accent={C.red} />
        <Stat value="3,400" label="Comments in 24hrs" accent={C.red} />
        <Stat value="≥25%" label="Star earning rate cut" accent={C.red} />
      </div>
      <Bi lang={lang} en={"TikTok user @katyinkc posted a video criticizing the changes — 500,000+ views and 3,400 comments within 24 hours. Core complaint: \"They just made it that you have to spend more money in their stores in order to earn the same rewards.\"\n\nCommon criticisms across social media (TikTok, Reddit, X, Instagram):\n  • \"Been a Gold card holder since 2013 and starting off as Green tier is garbage.\"\n  • \"Target and Starbucks have the same rewards system… No rewards at all.\"\n  • \"Remember when it was 12 transactions and you got a free drink.\"\n  • Users describe the overhaul as \"punishing loyalty\" and \"shrinkflation for rewards.\"\n  • Several stated they plan to scale back visits or switch to competitors.\n\nOne analysis: base members' Stars earning potential cut by minimum 25%. Even Gold tier earns less than before. Only Reserve members come out ahead."} zh={"TikTok用戶@katyinkc發布批評影片——24小時內50萬+觀看及3,400則留言。核心抱怨：「他們只是讓你必須在店裡花更多錢，才能賺到和以前一樣的獎勵。」\n\n社群媒體上的常見批評（TikTok、Reddit、X、Instagram）：\n  •「從2013年就是Gold卡持有者，結果現在從Green開始，太離譜了。」\n  •「Target和Starbucks有一樣的獎勵制度……根本沒有獎勵。」\n  •「還記得以前12次消費就能換一杯免費飲料的時代。」\n  • 用戶形容改革是「懲罰忠誠」和「獎勵的縮水通膨」。\n  • 多位用戶表示計畫減少造訪或轉向競爭對手。\n\n分析顯示基礎會員星星累積潛力至少被削減25%。即使Gold層級也比以前少。唯有Reserve會員獲益。"} />
      <SH icon="📖" title="Historical Precedent / 歷史前例" />
      <Bi lang={lang} en="In 2023, Starbucks removed a popular 50-Star reward tier, triggering similar backlash. The pattern is consistent: loyalty program changes are perceived as losses by established customers, even when new benefits are introduced. This is a textbook example of loss aversion in behavioral economics — customers weigh losses ~2× more heavily than equivalent gains (Kahneman & Tversky)." zh="2023年星巴克取消廣受歡迎的50星獎勵層級，同樣引發類似反彈。模式一致：即使引入新福利，既有顧客仍將改變視為損失。這是行為經濟學中損失趨避的教科書案例——顧客對損失的感受約為等值收益的2倍（Kahneman & Tversky）。" />
    </div>);

    case "theory": return (<div>
      {[
        { icon:"🎯", t:"CRM & CLV (Customer Lifetime Value)", en:"The tiered structure maximizes CLV by incentivizing higher-frequency, higher-value engagement. Reserve members ($2,500+/year) receive disproportionate benefits because their CLV justifies the investment. Classic CRM segmentation — treating different customers differently based on their value to the firm.", zh:"分層結構透過激勵更高頻率、更高價值的互動來最大化CLV。Reserve會員（年消費$2,500+）獲得不成比例的福利，因其CLV足以合理化投資。經典CRM區隔——根據顧客對企業的價值差異化對待。" },
        { icon:"💬", t:"Loyalty Program Design (Ch. 17–18)", en:"The shift from transaction-based to engagement-based rewards reflects a fundamental redefinition of 'loyalty.' No longer just purchase frequency — now about depth of relationship with the brand ecosystem (app usage, card reloads, promotional participation, reusable cup usage).", zh:"從交易導向到互動導向獎勵的轉變，反映對「忠誠」定義的根本性改變。不再僅關乎購買頻率——而是與品牌生態系統的關係深度（app使用、卡片儲值、促銷參與、環保杯使用）。" },
        { icon:"💰", t:"Value Proposition & Perceived Value (Ch. 11)", en:"The backlash illustrates the danger of altering an established value proposition. Even if the new program offers more features objectively, customers evaluate change relative to what they previously received. When perceived value decreases for the majority, communication must be exceptionally careful.", zh:"反彈說明改變既有價值主張的危險。即使新計畫客觀上提供更多功能，顧客以先前所獲為基準評估改變。當多數人感知價值下降時，溝通策略必須格外審慎。" },
        { icon:"🧠", t:"Loss Aversion (Behavioral Economics)", en:"Customers weigh losses ~2× more heavily than equivalent gains (Kahneman & Tversky). Green members losing their 2-Stars-per-dollar rate feel this loss far more intensely than they appreciate new Free Mod Monday benefit.", zh:"顧客對損失的感受約為等值收益的2倍（Kahneman & Tversky）。Green會員失去每美元2星的累積率，其損失感遠比新增Free Mod Monday福利的獲得感強烈。" },
        { icon:"📡", t:"Mobile as IMC Channel (Ch. 15–16)", en:"The Starbucks app is a textbook integrated marketing communications platform — combining advertising (in-app promos), sales promotion (Double/Triple Star Days), direct marketing (personalized push notifications), and CRM (behavioral data collection) in a single mobile touchpoint.", zh:"星巴克app是整合行銷溝通平台的教科書案例——在單一行動接觸點中結合廣告（app內促銷）、銷售促進（Double/Triple Star Days）、直效行銷（個人化推播）和CRM（行為數據收集）。" },
        { icon:"🔁", t:"Brand Repositioning ('Back to Starbucks')", en:"CEO Niccol described the old rewards as a 'one-size-fits-all' discount vehicle that eroded premium positioning. The tiered structure attempts to move from discount-driven to premium engagement ecosystem.", zh:"CEO Niccol形容舊獎勵已成為「一體適用」的折扣工具，侵蝕高端定位。分層結構試圖從折扣驅動轉型為高端互動生態系統。" },
      ].map((item, i) => (
        <div key={i} style={{ background: C.warmBg, border: `1px solid ${C.border}`, borderRadius: 12, padding: "18px 20px", marginBottom: 14, boxShadow: "0 1px 3px rgba(0,0,0,0.03)" }}>
          <div style={{ fontSize: 14, fontWeight: "bold", color: C.dkGreen, marginBottom: 10, display: "flex", alignItems: "center", gap: 8 }}><span>{item.icon}</span> {item.t}</div>
          <Bi en={item.en} zh={item.zh} lang={lang} enStyle={{ fontSize: 14.5 }} zhStyle={{ fontSize: 14.5 }} />
        </div>
      ))}
    </div>);

    case "scripts": return (<div>
      <SpeechCard time="30s" label="Summary / 摘要" lang={lang} en={`"My article is from Newsweek, published March 11, 2026. It covers Starbucks' major overhaul of its Rewards loyalty program, which went live on March 10 — two days ago. Starbucks introduced a three-tier structure — Green, Gold, and Reserve — for its 35.5 million active U.S. app members. The entire program operates through the Starbucks mobile app: tier tracking, Star accumulation, personalized push notifications, mobile ordering, and reward redemption. I chose this article because it is a specific, concrete example of mobile marketing — not about loyalty in general, but about how a firm uses app-based engagement to drive customer interaction. The article also highlights immediate consumer backlash, making it a strong case for discussing both strategy and consumer response."`} zh={`「我的文章來自Newsweek，2026年3月11日發表。內容是在談Starbucks對其Rewards忠誠計畫的重大改革，3月10日正式上線——就在兩天前。Starbucks為其3,550萬名活躍美國app會員推出三層級結構：Green、Gold和Reserve。整個計畫透過星巴克行動應用程式運作：層級追蹤、星星累積、個人化推播通知、行動點餐及獎勵兌換。我選這篇文章，是因為它是一個具體的mobile marketing案例——不是泛泛在談loyalty，而是在談一家企業如何透過app-based engagement驅動顧客互動。文章同時也報導了立即出現的消費者反彈，很適合同時討論策略與消費者反應。」`} />
      <SpeechCard time="15s" label="Commentary / 評論" lang={lang} en={`"Starbucks is strategically shifting from a transaction-based to an engagement-based loyalty model, entirely through mobile. The app becomes the central hub for the entire customer relationship. However, the immediate backlash — a TikTok video with 500,000+ views in 24 hours — shows that even a strong mobile strategy can backfire when loyal customers perceive the value proposition has worsened. It's a textbook case of loss aversion."`} zh={`「Starbucks正在戰略性地從交易導向轉向互動導向的忠誠模式，完全透過mobile。App成為整個顧客關係的核心樞紐。然而，立即出現的反彈——一支TikTok影片24小時內50萬+觀看——顯示即使mobile strategy很強，只要忠實顧客覺得value proposition變差了，也可能適得其反。這是loss aversion的教科書案例。」`} />
      <SpeechCard time="5s" label="Ultra-Short One-Liner / 一句話濃縮版" lang={lang} en={`"My article examines Starbucks' new three-tier Rewards overhaul as a mobile marketing case — how app-based engagement can strengthen loyalty at scale, but also trigger immediate backlash when customers perceive rewards have been devalued."`} zh={`「我的文章把Starbucks新的三層級Rewards改革視為一個mobile marketing案例——app-based engagement如何能大規模強化loyalty，但當顧客感知rewards被貶值時，也會立刻引發反彈。」`} />
    </div>);

    case "qa": return (<div>
      <p style={{ fontSize: 13, color: C.brownLt, marginTop: 0, marginBottom: 16 }}>{lang !== "zh" ? "Click each question to expand the prepared answer." : "點擊各問題展開準備好的回答。"}</p>
      <QACard lang={lang} q={`"Why is this mobile marketing?" / 「為何這是行動行銷？」`} aEn={`"Because this article is not about loyalty in general. It is about how Starbucks uses the mobile app as the entire operating system for its customer relationship. Tier management, Star tracking, personalized push notifications, mobile ordering, digital payments, reward redemption, and even exclusive product access — the secret menu drinks are app-only. With 35.5 million active members and the app driving nearly 60% of U.S. revenue, this is one of the largest mobile-first loyalty ecosystems in the world."`} aZh={`「因為這篇文章不是泛泛在談loyalty。它是在談Starbucks如何將行動應用程式作為顧客關係的整個作業系統。層級管理、星星追蹤、個人化推播通知、行動點餐、數位支付、獎勵兌換、甚至獨家產品——祕密菜單飲品只能透過app點。擁有3,550萬活躍會員、app貢獻近60%美國營收，這是全球最大的mobile-first忠誠生態系統之一。」`} />
      <QACard lang={lang} q={`"What would you recommend differently?" / 「你會建議怎麼做？」`} aEn={`"Three recommendations. First, implement a grandfather clause — automatically place long-time loyalists into Gold tier rather than making them start at Green. Second, improve communication transparency through the app — explicitly acknowledge trade-offs rather than framing changes purely as 'more ways to earn.' Third, use the app's behavioral data to identify at-risk high-value members and proactively send personalized retention offers before they defect."`} aZh={`「三項建議。第一，實施祖父條款——自動將長期忠實會員歸入Gold層級，而非讓他們從Green開始。第二，透過app改善溝通透明度——明確承認取捨，而非僅包裝為『更多賺取途徑』。第三，利用app的行為數據識別有流失風險的高價值會員，主動推送個人化留客優惠。」`} />
      <QACard lang={lang} q={`"Is the backlash justified?" / 「反彈合理嗎？」`} aEn={`"Both perspectives have merit. From Starbucks' side, the old system was unsustainable — CEO Niccol acknowledged it had become a 'one-size-fits-all' discount vehicle eroding premium positioning. The tiered model is sound CRM. From customers' side, the backlash is predictable — loss aversion means they feel losses ~2× more intensely than gains. The strategy may be correct long-term, but the transition execution — particularly communication — could have been much better."`} aZh={`「雙方觀點都有道理。從星巴克角度看，舊制度不可持續——CEO Niccol承認它已成為侵蝕高端定位的折扣工具。分層模式是合理的CRM做法。從顧客角度看，反彈完全可預見——損失趨避意味著損失感受約為收益的兩倍。長期策略或許正確，但轉型執行——特別是溝通——本可處理得更好。」`} />
      <QACard lang={lang} q={`"How does this relate to course material?" / 「與課程內容有何關聯？」`} aEn={`"From Ch. 11 (pricing): perceived value — not just actual value — drives customer response. From Ch. 15–18 (IMC): the Starbucks app is a textbook integrated mobile communications platform combining advertising, sales promotion, direct marketing, and CRM. Strategically: digital/mobile transformation creates both tremendous competitive advantages and significant customer relationship risks."`} aZh={`「從Ch. 11（定價）：感知價值——而非僅實際價值——驅動顧客反應。從Ch. 15–18（IMC）：星巴克app是整合行動溝通平台的教科書案例。從策略角度：數位/行動轉型既能創造巨大競爭優勢，又在管理不當時帶來顯著顧客關係風險。」`} />
      <QACard lang={lang} q={`"How does this compare to competitors?" / 「與競爭對手相比如何？」`} aEn={`"Starbucks Rewards is exceptional: 35.5M active members (larger than many banks), $1.77B unredeemed prepaid funds (unique financial moat in QSR). Closest comparisons — McDonald's MyRewards, Chick-fil-A One — achieve neither the same revenue concentration (57–60%) nor mobile integration depth. Cross-partner linking with Delta and Marriott positions Starbucks as a lifestyle ecosystem."`} aZh={`「星巴克獎勵規模卓越：3,550萬活躍會員（超過許多銀行）、17.7億美元未兌換預付資金（QSR獨有的財務護城河）。最接近比較——McDonald's MyRewards、Chick-fil-A One——均未達相同營收集中度（57–60%）或行動整合深度。與Delta和Marriott跨品牌連結將星巴克定位為生活方式生態系統。」`} />
    </div>);

    case "data": return (<div>
      <p style={{ fontSize: 13, color: C.brownLt, marginTop: 0, marginBottom: 16 }}>{lang !== "zh" ? "Memorize these before class. Key figures that demonstrate authority." : "課前背熟。發言時展現專業度的關鍵數字。"}</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 12, marginBottom: 24 }}>
        <Stat value="35.5M" label="Active U.S. members" accent={C.green} />
        <Stat value="57–60%" label="Revenue from members" accent={C.copper} />
        <Stat value="3×" label="App user spend vs. non" accent={C.dkGreen} />
        <Stat value="41K+" label="Stores globally" accent={C.brownMed} />
        <Stat value="$1.77B" label="Unredeemed prepaid" accent={C.red} />
        <Stat value="100M+" label="Weekly transactions" accent={C.tierPurple} />
        <Stat value="64%" label="Use app every visit" accent={C.tierGold} />
        <Stat value="500K+" label="TikTok views (24h)" accent={C.red} />
        <Stat value="3,400" label="TikTok comments (24h)" accent={C.red} />
      </div>
      <SH icon="⭐" title="Tier Earning Rates / 層級累積率" />
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 24 }}>
        <Stat value="1 ⭐/$1" label="GREEN (0–499)" accent={C.tierGreen} />
        <Stat value="1.2 ⭐/$1" label="GOLD (500–2,499)" accent={C.tierGold} />
        <Stat value="1.7 ⭐/$1" label="RESERVE (2,500+)" accent={C.tierPurple} />
      </div>
      <SH icon="📅" title="Key Dates / 關鍵日期" />
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 24 }}>
        <Stat value="Jan 29" label="Unveiled Investor Day" accent={C.brownMed} />
        <Stat value="Mar 10" label="Program launch" accent={C.green} />
        <Stat value="Mar 11" label="Triple Star Day + article" accent={C.copper} />
        <Stat value="Mar 16" label="1st Free Mod Monday" accent={C.dkGreen} />
      </div>
      <SH icon="📎" title="Article Source / 文章來源" />
      <div style={{ background: C.warmBg, border: `1px solid ${C.border}`, borderRadius: 10, padding: "16px 20px", fontSize: 13, lineHeight: 1.9, color: C.brownMed, boxShadow: "0 1px 3px rgba(0,0,0,0.03)" }}>
        <div><strong style={{ color: C.dkGreen }}>Source:</strong> Newsweek</div>
        <div><strong style={{ color: C.dkGreen }}>Author:</strong> Claire Dodds</div>
        <div><strong style={{ color: C.dkGreen }}>Published:</strong> March 11, 2026</div>
        <div style={{ wordBreak: "break-all" }}><strong style={{ color: C.dkGreen }}>URL:</strong> https://www.newsweek.com/starbucks-revamps-rewards-program-2026-11659352</div>
      </div>
    </div>);

    default: return null;
  }};

  return (
    <div style={{ minHeight: "100vh", background: C.cream, fontFamily: "system-ui, -apple-system, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif", color: C.brown }}>
      {/* Header */}
      <div style={{ background: C.dkGreen, padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8, position: "sticky", top: 0, zIndex: 20, boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button onClick={() => setMenuOpen(!menuOpen)} style={{
            background: menuOpen ? "rgba(255,255,255,0.15)" : "none", border: "1px solid rgba(255,255,255,0.25)",
            borderRadius: 6, color: "#fff", padding: "6px 9px", cursor: "pointer", fontSize: 16, lineHeight: 1, display: "flex", alignItems: "center"
          }}>{menuOpen ? "✕" : "☰"}</button>
          <div>
            <div style={{ fontSize: 15, fontWeight: "bold", color: "#fff", letterSpacing: 0.5 }}>Starbucks Rewards × Mobile Marketing</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginTop: 2 }}>MKTG 6200 — Mar 12, 2026</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 4 }}>
          {[{ k:"both", l:"EN/中" },{ k:"en", l:"EN" },{ k:"zh", l:"中文" }].map(o => (
            <button key={o.k} onClick={() => setLang(o.k)} style={{
              padding: "5px 12px", borderRadius: 4, fontSize: 12, cursor: "pointer", fontFamily: "inherit",
              border: lang === o.k ? "1px solid rgba(255,255,255,0.6)" : "1px solid rgba(255,255,255,0.2)",
              background: lang === o.k ? "rgba(255,255,255,0.15)" : "transparent",
              color: lang === o.k ? "#fff" : "rgba(255,255,255,0.45)", transition: "all 0.15s"
            }}>{o.l}</button>
          ))}
        </div>
      </div>

      {/* Overlay */}
      {menuOpen && <div onClick={() => setMenuOpen(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.3)", zIndex: 14 }} />}

      <div style={{ display: "flex", position: "relative" }}>
        {/* Sidebar */}
        <nav style={{
          width: 220, background: "#fff", borderRight: `1px solid ${C.border}`,
          padding: "10px 0", overflowY: "auto", boxShadow: "2px 0 8px rgba(0,0,0,0.06)",
          position: "fixed", top: 52, bottom: 0, left: menuOpen ? 0 : -230,
          transition: "left 0.25s ease", zIndex: 15
        }}>
          {NAV.map(n => (
            <button key={n.id} onClick={() => { setSec(n.id); setMenuOpen(false); }} style={{
              display: "block", width: "100%", textAlign: "left", padding: "13px 18px",
              border: "none", cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s",
              borderLeft: sec === n.id ? `3px solid ${C.green}` : "3px solid transparent",
              background: sec === n.id ? `${C.green}08` : "transparent",
              color: sec === n.id ? C.dkGreen : C.brownLt, fontSize: 14, lineHeight: 1.3
            }}>
              <span style={{ marginRight: 8 }}>{n.icon}</span>{n.en}
              <div style={{ fontSize: 11.5, color: sec === n.id ? C.green : "#bbb", marginLeft: 27, marginTop: 2 }}>{n.zh}</div>
            </button>
          ))}
        </nav>

        {/* Main content */}
        <main style={{ flex: 1, padding: "24px 20px", overflowY: "auto", maxHeight: "calc(100vh - 52px)", minHeight: "calc(100vh - 52px)" }}>
          <h2 style={{ fontSize: 21, color: C.dkGreen, marginTop: 0, marginBottom: 22, borderBottom: `2px solid ${C.green}20`, paddingBottom: 10 }}>
            {NAV.find(n => n.id === sec)?.icon} {NAV.find(n => n.id === sec)?.en}
            <span style={{ fontSize: 13, color: C.brownLt, fontWeight: "normal", marginLeft: 8 }}>{NAV.find(n => n.id === sec)?.zh}</span>
          </h2>
          {R()}
        </main>
      </div>
    </div>
  );
}
