import type { Translation } from "../types";

export function HourBar({ sl, ph, wk, tl, t }: { sl: number; ph: number; wk: number; tl: number; t: Translation }) {
  const total = 24;
  const free = Math.max(0, total - sl - ph - wk - tl);
  const segs = [
    { pct: (sl / total) * 100, color: "#5B9CF6", label: `${t.fSleep} ${sl}${t.hUnit}` },
    { pct: (wk / total) * 100, color: "#9B7CF5", label: `${t.fWork} ${wk}${t.hUnit}` },
    { pct: (ph / total) * 100, color: "#F5A623", label: `${t.fPhone} ${ph}${t.hUnit}` },
    { pct: (tl / total) * 100, color: "#34D399", label: `${t.fToilet} ${tl}${t.hUnit}` },
  ];
  return (
    <div style={{ marginTop: "20px" }}>
      <div style={{ color: "#363656", fontSize: "10px", fontFamily: "'Inter',sans-serif", letterSpacing: "0.9px", marginBottom: "8px" }}>{t.bar24}</div>
      <div style={{ display: "flex", height: "8px", borderRadius: "4px", overflow: "hidden", gap: "1.5px" }}>
        {segs.map((s, i) => (
          <div key={i} style={{ width: `${s.pct}%`, background: s.color, transition: "width 0.4s ease" }} />
        ))}
        <div style={{ flex: 1, background: "#1E1E38" }} />
      </div>
      <div style={{ display: "flex", flexWrap: "wrap" as const, gap: "8px 14px", marginTop: "8px" }}>
        {segs.map((s, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <div style={{ width: "7px", height: "7px", borderRadius: "2px", background: s.color, flexShrink: 0 }} />
            <span style={{ color: "#383858", fontSize: "10px", fontFamily: "'Inter',sans-serif" }}>{s.label}</span>
          </div>
        ))}
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <div style={{ width: "7px", height: "7px", borderRadius: "2px", background: "#2A2A44", border: "1px solid #3A3A54", flexShrink: 0 }} />
          <span style={{ color: "#383858", fontSize: "10px", fontFamily: "'Inter',sans-serif" }}>{t.barFree(parseFloat(free.toFixed(1)))}</span>
        </div>
      </div>
    </div>
  );
}
