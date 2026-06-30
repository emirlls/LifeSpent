import type { Lang } from "../types";

export function LangToggle({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  return (
    <div style={{ background: "#141428", borderRadius: "8px", padding: "3px", display: "flex", gap: "2px" }}>
      {(["tr", "en"] as Lang[]).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          style={{
            padding: "5px 12px", border: "none", borderRadius: "6px", cursor: "pointer",
            background: lang === l ? "#F03D71" : "transparent",
            color: lang === l ? "#fff" : "#484868",
            fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "12px",
            transition: "all 0.2s",
          }}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
