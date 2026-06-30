import type { AltItem, Translation } from "../types";

interface ActCardProps {
  icon: string;
  name: string;
  hpd: number;
  years: number;
  color: string;
  alts?: AltItem[];
  t: Translation;
}

export function ActCard({ icon, name, hpd, years, color, alts, t }: ActCardProps) {
  return (
    <div style={{
      background: "#111120", border: `1px solid ${color}15`,
      borderRadius: "14px", padding: "18px", position: "relative", overflow: "hidden",
    }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: `linear-gradient(90deg,${color},transparent)` }} />
      <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", marginBottom: alts?.length ? "14px" : 0 }}>
        <span style={{ fontSize: "22px", flexShrink: 0, marginTop: "2px" }}>{icon}</span>
        <div style={{ flex: 1 }}>
          <div style={{ color: "#C0C0D8", fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: "14px" }}>{name}</div>
          <div style={{ color: "#363658", fontFamily: "'Inter',sans-serif", fontSize: "11px", marginTop: "2px" }}>{t.dailyH(hpd)}</div>
        </div>
        <div style={{ textAlign: "right", flexShrink: 0 }}>
          <div style={{ color, fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "21px" }}>{t.fmtY(years)}</div>
          <div style={{ color: "#28284A", fontSize: "10px", fontFamily: "'Inter',sans-serif" }}>{t.inRem}</div>
        </div>
      </div>
      {alts && alts.length > 0 && (
        <div style={{ borderTop: "1px solid #1C1C30", paddingTop: "12px" }}>
          <div style={{ color: "#2A2A48", fontSize: "10px", fontFamily: "'Inter',sans-serif", marginBottom: "7px", letterSpacing: "0.9px" }}>
            {t.altsTitle}
          </div>
          {alts.map((a, i) => (
            <div key={i} style={{ color: "#565678", fontSize: "12px", fontFamily: "'Inter',sans-serif", marginBottom: "3px", display: "flex", alignItems: "center", gap: "6px" }}>
              <span>{a.i}</span><span>{a.t}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
