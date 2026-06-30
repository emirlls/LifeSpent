import { useState, useEffect } from "react";
import type { Translation } from "../types";

export function LifeRing({ pct, t }: { pct: number; t: Translation }) {
  const [ap, setAp] = useState(0);
  const R = 100;
  const C = 2 * Math.PI * R;
  useEffect(() => {
    const tm = setTimeout(() => setAp(Math.min(pct, 100)), 200);
    return () => clearTimeout(tm);
  }, [pct]);

  return (
    <svg width="260" height="260" viewBox="0 0 260 260">
      <defs>
        <linearGradient id="rg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F03D71" />
          <stop offset="100%" stopColor="#FF8C42" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <circle cx="130" cy="130" r={R + 8} fill="none" stroke="#F03D71" strokeWidth="1" opacity="0.07" />
      <circle cx="130" cy="130" r={R} fill="none" stroke="#111120" strokeWidth="14" />
      <circle
        cx="130" cy="130" r={R} fill="none"
        stroke="url(#rg)" strokeWidth="14" strokeLinecap="round"
        strokeDasharray={`${(ap / 100) * C} ${C}`}
        transform="rotate(-90 130 130)"
        filter="url(#glow)"
        style={{ transition: "stroke-dasharray 1.8s cubic-bezier(0.4,0,0.2,1)" }}
      />
      <text x="130" y="118" textAnchor="middle" fill="#EEEEFF" fontSize="50" fontWeight="800" fontFamily="'Syne',sans-serif">
        %{Math.round(ap)}
      </text>
      <text x="130" y="143" textAnchor="middle" fill="#484868" fontSize="10" fontFamily="'Inter',sans-serif" letterSpacing="1.2">
        {t.ringLabel}
      </text>
      <text x="130" y="161" textAnchor="middle" fill="#303050" fontSize="10" fontFamily="'Inter',sans-serif">
        {t.ringRem(Math.round(100 - ap))}
      </text>
    </svg>
  );
}
