import type React from "react";

export function SectionTitle({ color, children }: { color: string; children: React.ReactNode }) {
  return (
    <div style={{ color, fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "12px", letterSpacing: "1.1px", marginBottom: "5px" }}>
      {children}
    </div>
  );
}
