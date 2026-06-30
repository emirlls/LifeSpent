interface SliderInputProps {
  label: string;
  icon: string;
  value: string;
  onChange: (v: string) => void;
  min: number;
  max: number;
  step: number;
  color: string;
  hUnit: string;
}

export function SliderInput({ label, icon, value, onChange, min, max, step, color, hUnit }: SliderInputProps) {
  return (
    <div style={{ marginBottom: "18px" }}>
      <style>{`input[type=range]::-webkit-slider-thumb{background:${color}}input[type=range]::-moz-range-thumb{background:${color}}`}</style>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "7px" }}>
        <span style={{ color: "#8080A0", fontSize: "13px", fontFamily: "'Inter',sans-serif", display: "flex", alignItems: "center", gap: "7px" }}>
          <span style={{ fontSize: "15px" }}>{icon}</span>{label}
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <input
            type="number" min={min} max={max} step={step} value={value}
            onChange={(e) => onChange(e.target.value)}
            style={{ width: "50px", background: "#1A1A2E", border: `1px solid ${color}35`, borderRadius: "6px", color, fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "14px", textAlign: "center", padding: "4px 2px", outline: "none" }}
          />
          <span style={{ color: "#383858", fontSize: "11px", fontFamily: "'Inter',sans-serif" }}>{hUnit}</span>
        </div>
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ width: "100%", cursor: "pointer", accentColor: color, height: "4px" }}
      />
    </div>
  );
}
