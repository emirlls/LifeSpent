import type { Stats, Translation } from "../types";
import { StatCard } from "./StatCard";

export function RelationshipCard({ stats, t }: { stats: Stats; t: Translation }) {
  if (!stats.hasPartner) return null;
  return (
    <div style={{
      background: "linear-gradient(135deg,#130820,#0F0F22)", border: "1px solid #4B1A5A",
      borderRadius: "18px", padding: "26px 22px", marginBottom: "14px",
      position: "relative", overflow: "hidden",
    }}>
      <div style={{ position: "absolute", top: "-80px", left: "-40px", width: "220px", height: "220px", borderRadius: "50%", background: "#EC489918", filter: "blur(70px)", pointerEvents: "none" }} />
      <div style={{ color: "#EC4899", fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "12px", letterSpacing: "1.1px", marginBottom: "16px" }}>
        {t.partnerTitle}
      </div>
      <div style={{ textAlign: "center", padding: "10px 0 18px" }}>
        <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(38px,8vw,56px)", color: "#EEEEFF", lineHeight: 1.05, marginBottom: "6px" }}>
          {t.fmtY(stats.partnerY)}
        </div>
        <div style={{ color: "#7B7BAA", fontSize: "14px", fontFamily: "'Inter',sans-serif", marginBottom: "8px" }}>{t.partnerBig}</div>
        <div style={{ display: "inline-block", padding: "4px 12px", background: "#EC489912", borderRadius: "20px" }}>
          <span style={{ color: "#EC4899", fontSize: "12px", fontFamily: "'Inter',sans-serif" }}>{t.partnerPct(stats.partnerPct)}</span>
        </div>
      </div>
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" as const }}>
        <StatCard icon="🗓️" value={stats.partnerSat.toLocaleString()} label={t.partnerSatL} color="#EC4899" />
        <StatCard icon="🍽️" value={t.fmtBig(stats.partnerMeals)} label={t.partnerMealsL} color="#F59E0B" />
        <StatCard icon="🎂" value={stats.partnerBdays} label={t.partnerBdayL} color="#A78BFA" />
      </div>
    </div>
  );
}
