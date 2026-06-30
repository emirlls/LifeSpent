import { useState, useEffect } from "react";
import type React from "react";
import type { Lang, FormData, Stats } from "./types";
import { T } from "./constants/translations";
import { computeStats, getAlts } from "./utils/helpers";
import { generateCard } from "./utils/card";

import { LangToggle } from "./components/LangToggle";
import { LifeRing } from "./components/LifeRing";
import { WeeksCanvas } from "./components/WeeksCanvas";
import { StatCard } from "./components/StatCard";
import { ActCard } from "./components/ActCard";
import { CelebSection } from "./components/CelebSection";
import { RelationshipCard } from "./components/RelationshipCard";
import { SliderInput } from "./components/SliderInput";
import { HourBar } from "./components/HourBar";
import { SectionTitle } from "./components/SectionTitle";

export default function LifeSpent() {
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=Inter:wght@300;400;500;600&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => link.remove();
  }, []);

  const [lang, setLang] = useState<Lang>("tr");
  const [step, setStep] = useState<"input" | "results">("input");
  const [f, setF] = useState<FormData>({ age: "27", exp: "80", sl: "7", ph: "4", wk: "8", tl: "0.5", partnerH: "1" });
  const [showPartner, setShowPartner] = useState(false);
  const [stats, setStats] = useState<Stats | null>(null);
  const [cardUrl, setCardUrl] = useState<string | null>(null);
  const [cardLoading, setCardLoading] = useState(false);

  const t = T[lang];
  const set = (k: keyof FormData) => (v: string) => setF((p) => ({ ...p, [k]: v }));
  const totalH = [+f.sl, +f.ph, +f.wk, +f.tl].reduce((a, b) => a + b, 0);
  const overLimit = totalH > 24;
  const valid = +f.age > 0 && +f.age < +f.exp && +f.exp <= 120 && !overLimit;

  const handleCalc = () => {
    if (!valid) return;
    setStats(computeStats(f, showPartner));
    setStep("results");
    setCardUrl(null);
    window.scrollTo(0, 0);
  };

  const handleCard = async () => {
    if (!stats) return;
    setCardLoading(true);
    try { setCardUrl(await generateCard(stats, lang)); }
    finally { setCardLoading(false); }
  };

  const APP: React.CSSProperties = { minHeight: "100vh", background: "#09090F", color: "#EEEEFF", fontFamily: "'Inter',-apple-system,sans-serif" };
  const WRAP: React.CSSProperties = { maxWidth: "680px", margin: "0 auto", padding: "0 22px 80px" };
  const CARD: React.CSSProperties = { background: "#0F0F1E", borderRadius: "18px", border: "1px solid rgba(255,255,255,0.05)", padding: "26px 22px", marginBottom: "14px" };

  // ── INPUT ─────────────────────────────────────────────────────────────────────
  if (step === "input") {
    const tagWords = t.appTagline.split(" ");
    const lastWord = tagWords.pop() ?? "";
    return (
      <div style={APP}>
        <div style={WRAP}>
          {/* Top bar */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "22px 0 0" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ width: "30px", height: "30px", borderRadius: "8px", background: "linear-gradient(135deg,#F03D71,#FF8C42)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "15px" }}>⏳</div>
              <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "20px", background: "linear-gradient(90deg,#F03D71,#FF8C42)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>LifeSpent</span>
            </div>
            <LangToggle lang={lang} setLang={setLang} />
          </div>

          {/* Hero */}
          <div style={{ textAlign: "center", padding: "40px 0 36px" }}>
            <h1 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(26px,6vw,40px)", lineHeight: 1.12, margin: "0 0 12px", letterSpacing: "-1px" }}>
              {tagWords.join(" ")}{" "}
              <span style={{ background: "linear-gradient(90deg,#F03D71,#FF8C42)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                {lastWord}
              </span>
            </h1>
            <p style={{ color: "#48486A", fontSize: "13px", lineHeight: 1.7, maxWidth: "360px", margin: "0 auto" }}>{t.appSub}</p>
          </div>

          {/* Form */}
          <div style={{ ...CARD, padding: "28px" }}>
            {/* Age inputs */}
            <div style={{ display: "flex", gap: "14px", marginBottom: "26px" }}>
              {([["age", t.fAge, "27"], ["exp", t.fExp, "80"]] as [keyof FormData, string, string][]).map(([k, label, ph]) => (
                <div key={k} style={{ flex: 1 }}>
                  <label style={{ color: "#484868", fontSize: "10px", fontFamily: "'Inter',sans-serif", letterSpacing: "1px", display: "block", marginBottom: "7px" }}>{label}</label>
                  <input
                    type="number" value={f[k]} onChange={(e) => set(k)(e.target.value)} placeholder={ph}
                    style={{ width: "100%", background: "#141428", border: "1px solid #222240", borderRadius: "10px", color: "#EEEEFF", fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "26px", padding: "12px 14px", outline: "none", boxSizing: "border-box" }}
                  />
                </div>
              ))}
            </div>

            {/* Divider */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "22px" }}>
              <div style={{ flex: 1, height: "1px", background: "#1A1A2E" }} />
              <span style={{ color: "#2E2E4E", fontSize: "10px", fontFamily: "'Inter',sans-serif", letterSpacing: "0.9px" }}>{t.fHabits}</span>
              <div style={{ flex: 1, height: "1px", background: "#1A1A2E" }} />
            </div>

            <SliderInput label={t.fSleep} icon="😴" value={f.sl} onChange={set("sl")} min={0} max={14} step={0.5} color="#5B9CF6" hUnit={t.hUnit} />
            <SliderInput label={t.fPhone} icon="📱" value={f.ph} onChange={set("ph")} min={0} max={16} step={0.5} color="#F5A623" hUnit={t.hUnit} />
            <SliderInput label={t.fWork} icon="💼" value={f.wk} onChange={set("wk")} min={0} max={16} step={0.5} color="#9B7CF5" hUnit={t.hUnit} />
            <SliderInput label={t.fToilet} icon="🚽" value={f.tl} onChange={set("tl")} min={0} max={4} step={0.25} color="#34D399" hUnit={t.hUnit} />

            {/* Partner toggle */}
            <div style={{ marginTop: "6px" }}>
              <button
                onClick={() => setShowPartner(!showPartner)}
                style={{ background: "transparent", border: `1px solid ${showPartner ? "#EC489960" : "#1E1E35"}`, borderRadius: "8px", color: showPartner ? "#EC4899" : "#484868", fontFamily: "'Inter',sans-serif", fontSize: "12px", padding: "8px 14px", cursor: "pointer", transition: "all 0.2s", width: "100%", textAlign: "left" }}
              >
                {t.fPartnerToggle} {showPartner ? "↑" : "↓"}
              </button>
              {showPartner && (
                <div style={{ marginTop: "14px", paddingBottom: "2px" }}>
                  <SliderInput label={t.fPartner} icon="💕" value={f.partnerH} onChange={set("partnerH")} min={0} max={16} step={0.5} color="#EC4899" hUnit={t.hUnit} />
                </div>
              )}
            </div>

            <HourBar sl={+f.sl} ph={+f.ph} wk={+f.wk} tl={+f.tl} t={t} />

            {overLimit && (
              <div style={{ marginTop: "14px", padding: "10px 14px", background: "#F03D7112", border: "1px solid #F03D7128", borderRadius: "8px", color: "#F03D71", fontSize: "12px", fontFamily: "'Inter',sans-serif" }}>
                ⚠️ {t.overLimit(parseFloat(totalH.toFixed(1)))}
              </div>
            )}

            <button
              onClick={handleCalc} disabled={!valid}
              style={{ marginTop: "24px", width: "100%", padding: "16px", background: valid ? "linear-gradient(135deg,#F03D71,#FF6B35)" : "#141428", border: "none", borderRadius: "12px", color: valid ? "#fff" : "#383858", fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "15px", cursor: valid ? "pointer" : "not-allowed", transition: "all 0.2s" }}
            >
              {valid ? t.calcBtn : t.fillBtn}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── RESULTS ───────────────────────────────────────────────────────────────────
  if (!stats) return null;
  const alts = getAlts(stats.phoneTH, stats.phoneY, t);

  return (
    <div style={APP}>
      <div style={WRAP}>
        {/* Nav */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 0 26px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: "linear-gradient(135deg,#F03D71,#FF8C42)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px" }}>⏳</div>
            <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "18px", background: "linear-gradient(90deg,#F03D71,#FF8C42)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>LifeSpent</span>
          </div>
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <LangToggle lang={lang} setLang={setLang} />
            <button
              onClick={() => { setStep("input"); setStats(null); setCardUrl(null); }}
              style={{ background: "#141428", border: "1px solid #222240", borderRadius: "8px", color: "#585878", fontFamily: "'Inter',sans-serif", fontSize: "12px", padding: "7px 12px", cursor: "pointer" }}
            >
              {t.editBtn}
            </button>
          </div>
        </div>

        {/* Life Ring */}
        <div style={{ ...CARD, textAlign: "center" }}>
          <LifeRing pct={stats.lifeP} t={t} />
          <div style={{ display: "inline-flex", alignItems: "center", marginTop: "4px", padding: "5px 14px", background: "#F03D7110", borderRadius: "20px" }}>
            <span style={{ color: "#F03D71", fontSize: "12px", fontFamily: "'Inter',sans-serif", fontWeight: 500 }}>
              {t.lifeMeta(stats.age, Math.round(stats.remY))}
            </span>
          </div>
        </div>

        {/* Weeks Grid */}
        <div style={CARD}>
          <SectionTitle color="#FF8C42">{t.weeksTitle}</SectionTitle>
          <p style={{ color: "#282848", fontSize: "11px", fontFamily: "'Inter',sans-serif", marginBottom: "14px" }}>{t.weeksSub(stats.exp)}</p>
          <p style={{ color: "#363658", fontSize: "10px", fontFamily: "'Inter',sans-serif", marginBottom: "10px", textAlign: "center" }}>{t.weeksCaption}</p>
          <WeeksCanvas age={stats.age} exp={stats.exp} />
        </div>

        {/* So Far */}
        <div style={CARD}>
          <SectionTitle color="#5B9CF6">{t.soFarTitle}</SectionTitle>
          <p style={{ color: "#282848", fontSize: "11px", fontFamily: "'Inter',sans-serif", marginBottom: "14px" }}>{t.soFarSub(stats.age)}</p>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" as const }}>
            <StatCard icon="❤️" value={t.fmtBig(stats.hearts)} label={t.sHearts} color="#F03D71" />
            <StatCard icon="🫁" value={t.fmtBig(stats.breaths)} label={t.sBreaths} color="#5B9CF6" />
            <StatCard icon="📅" value={t.fmtBig(stats.daysLived)} label={t.sDays} color="#9B7CF5" />
            <StatCard icon="😴" value={t.fmtBig(stats.hSlept)} label={t.sSleep} color="#34D399" />
          </div>
        </div>

        {/* Activity Breakdown */}
        <div style={CARD}>
          <SectionTitle color="#F5A623">{t.tempoTitle}</SectionTitle>
          <p style={{ color: "#282848", fontSize: "11px", fontFamily: "'Inter',sans-serif", marginBottom: "16px" }}>{t.tempoSub(stats.remY)}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <ActCard icon="📱" name={t.fPhone} hpd={stats.ph} years={stats.phoneY} color="#F5A623" alts={alts} t={t} />
            <ActCard icon="😴" name={t.fSleep} hpd={stats.sl} years={stats.sleepY} color="#5B9CF6" t={t} />
            <ActCard icon="💼" name={t.fWork} hpd={stats.wk} years={stats.workY} color="#9B7CF5" t={t} />
            <ActCard icon="🚽" name={t.fToilet} hpd={stats.tl} years={stats.toiletY} color="#34D399" t={t} />
          </div>
        </div>

        {/* Celebrity Comparisons */}
        <CelebSection stats={stats} lang={lang} t={t} />

        {/* Relationship */}
        <RelationshipCard stats={stats} t={t} />

        {/* Saturdays */}
        <div style={{ ...CARD, background: "linear-gradient(135deg,#10082A,#0F0F20)", border: "1px solid #3A1A5A", textAlign: "center", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "-80px", right: "-80px", width: "220px", height: "220px", borderRadius: "50%", background: "#9B7CF718", filter: "blur(70px)", pointerEvents: "none" }} />
          <SectionTitle color="#9B7CF5">{t.satTitle}</SectionTitle>
          <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(44px,9vw,64px)", color: "#EEEEFF", lineHeight: 1.05, margin: "14px 0 6px" }}>
            {stats.remSat.toLocaleString()}
          </div>
          <div style={{ color: "#7070A0", fontSize: "14px", fontFamily: "'Inter',sans-serif", marginBottom: "22px" }}>{t.satLabel}</div>
          <div style={{ borderTop: "1px solid #2A1A3E", paddingTop: "16px", textAlign: "left", display: "flex", flexDirection: "column", gap: "7px" }}>
            {([
              ["#F5A623", t.satPhone(t.fmtY(stats.phoneY))],
              ["#5B9CF6", t.satSleep(t.fmtY(stats.sleepY))],
              ["#9B7CF5", t.satWork(t.fmtY(stats.workY))],
              ["#34D399", t.satToilet(t.fmtY(stats.toiletY))],
            ] as [string, string][]).map(([c, txt], i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ width: "3px", height: "14px", background: c, borderRadius: "2px", flexShrink: 0 }} />
                <span style={{ color: "#5A5A80", fontSize: "13px", fontFamily: "'Inter',sans-serif" }}>{txt}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Share Card */}
        <div style={CARD}>
          <SectionTitle color="#F03D71">{t.shareTitle}</SectionTitle>
          <p style={{ color: "#383858", fontSize: "12px", fontFamily: "'Inter',sans-serif", marginBottom: "16px" }}>{t.shareSub}</p>
          {!cardUrl ? (
            <button
              onClick={handleCard} disabled={cardLoading}
              style={{ width: "100%", padding: "14px", background: cardLoading ? "#141428" : "linear-gradient(135deg,#F03D71,#FF6B35)", border: "none", borderRadius: "11px", color: cardLoading ? "#383858" : "#fff", fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "14px", cursor: cardLoading ? "not-allowed" : "pointer" }}
            >
              {cardLoading ? t.shareLoading : t.shareBtn}
            </button>
          ) : (
            <div>
              <img src={cardUrl} alt="share card" style={{ width: "100%", borderRadius: "12px", marginBottom: "12px", display: "block" }} />
              <div style={{ display: "flex", gap: "10px" }}>
                <a
                  href={cardUrl} download="lifespent.png"
                  style={{ flex: 1, padding: "12px", textAlign: "center", background: "linear-gradient(135deg,#F03D71,#FF6B35)", borderRadius: "10px", color: "#fff", fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "13px", textDecoration: "none", display: "block" }}
                >
                  {t.dlBtn}
                </a>
                <button
                  onClick={() => setCardUrl(null)}
                  style={{ padding: "12px 18px", background: "#141428", border: "1px solid #222240", borderRadius: "10px", color: "#585878", fontFamily: "'Inter',sans-serif", fontSize: "12px", cursor: "pointer" }}
                >
                  {t.refreshBtn}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
