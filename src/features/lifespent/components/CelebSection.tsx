import type { Stats, Lang, Translation, CelebRow } from "../types";
import { findCeleb } from "../constants/celebrities";

export function CelebSection({ stats, lang, t }: { stats: Stats; lang: Lang; t: Translation }) {
  const cats: Array<{ key: string; years: number; color: string; icon: string; label: string }> = [
    { key: "phone",  years: stats.phoneY,  color: "#F5A623", icon: "📱", label: t.celebPhone },
    { key: "sleep",  years: stats.sleepY,  color: "#5B9CF6", icon: "😴", label: t.celebSleep },
    { key: "work",   years: stats.workY,   color: "#9B7CF5", icon: "💼", label: t.celebWork  },
    { key: "toilet", years: stats.toiletY, color: "#34D399", icon: "🚽", label: t.celebToilet },
  ];
  const rows: CelebRow[] = cats
    .map((c) => ({ ...c, celeb: findCeleb(c.years, c.key) }))
    .filter((c) => c.celeb !== null);

  if (!rows.length) return null;

  return (
    <div style={{ background: "#0F0F1E", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "18px", padding: "24px 22px", marginBottom: "14px" }}>
      <div style={{ color: "#FFD700", fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "12px", letterSpacing: "1.1px", marginBottom: "16px" }}>
        {t.celebTitle}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {rows.map(({ key, years, color, icon, label, celeb }) => {
          if (!celeb) return null;
          const extra = parseFloat((years - celeb.years).toFixed(1));
          const celebName = lang === "tr" ? celeb.tr : celeb.en;
          return (
            <div key={key} style={{ background: "#141428", borderRadius: "10px", padding: "14px", border: `1px solid ${color}15` }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                <span style={{ fontSize: "15px" }}>{icon}</span>
                <span style={{ color, fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "12px" }}>{label}</span>
                <span style={{ color: "#383858", fontSize: "11px", fontFamily: "'Inter',sans-serif" }}>— {t.fmtY(years)}</span>
              </div>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                <span style={{ fontSize: "18px", flexShrink: 0, marginTop: "1px" }}>{celeb.emoji}</span>
                <span style={{ color: "#8888B0", fontSize: "12px", fontFamily: "'Inter',sans-serif", lineHeight: 1.5 }}>
                  {celebName}
                  <span style={{ color: "#484868" }}> ({t.celebYrs(celeb.years)})</span>
                  {extra > 0.09 && (
                    <span style={{ color, fontWeight: 600, marginLeft: "6px" }}>
                      {t.celebMore(t.fmtY(extra))}
                    </span>
                  )}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
