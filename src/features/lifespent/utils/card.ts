import type { Stats, Lang } from "../types";
import { T } from "../constants/translations";

export async function generateCard(stats: Stats, lang: Lang): Promise<string> {
  await document.fonts.ready;
  const t = T[lang];
  const W = 1080, H = 1080;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d")!;

  // Background
  const bg = ctx.createLinearGradient(0, H, W, 0);
  bg.addColorStop(0, "#04040C");
  bg.addColorStop(0.5, "#0B0618");
  bg.addColorStop(1, "#08080F");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // Grid
  ctx.strokeStyle = "rgba(255,255,255,0.02)";
  ctx.lineWidth = 1;
  for (let x = 0; x <= W; x += 72) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
  for (let y = 0; y <= H; y += 72) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }

  // Life ring
  const cx = W / 2;
  const cy = stats.hasPartner ? 370 : 415;
  const R = stats.hasPartner ? 210 : 248;

  ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2);
  ctx.strokeStyle = "#141428"; ctx.lineWidth = 26; ctx.stroke();

  const rg = ctx.createLinearGradient(cx - R, cy - R, cx + R, cy + R);
  rg.addColorStop(0, "#F03D71"); rg.addColorStop(1, "#FF8C42");
  ctx.shadowColor = "#F03D71"; ctx.shadowBlur = 22;
  ctx.beginPath();
  ctx.arc(cx, cy, R, -Math.PI / 2, -Math.PI / 2 + (stats.lifeP / 100) * Math.PI * 2);
  ctx.strokeStyle = rg; ctx.lineWidth = 26; ctx.lineCap = "round"; ctx.stroke();
  ctx.shadowBlur = 0;

  // Ring text
  ctx.textAlign = "center";
  ctx.fillStyle = "#EEEEFF";
  ctx.font = `800 ${stats.hasPartner ? 90 : 108}px 'Syne','Arial Black',sans-serif`;
  ctx.fillText(`%${Math.round(stats.lifeP)}`, cx, cy + (stats.hasPartner ? 30 : 38));
  ctx.fillStyle = "#404060";
  ctx.font = `400 ${stats.hasPartner ? 22 : 26}px 'Inter',Arial,sans-serif`;
  ctx.fillText(t.ringLabel, cx, cy + (stats.hasPartner ? 66 : 80));

  // App name
  ctx.fillStyle = "#F03D71";
  ctx.font = "800 50px 'Syne','Arial Black',sans-serif";
  ctx.fillText("LifeSpent", cx, 74);

  // Divider
  const divY = stats.hasPartner ? 628 : 710;
  ctx.strokeStyle = "#1E1E35"; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(120, divY); ctx.lineTo(960, divY); ctx.stroke();

  // Saturday headline (auto font-size)
  const satText =
    lang === "tr"
      ? `Sadece ${stats.remSat.toLocaleString("tr-TR")} cumartesim kaldı`
      : `Only ${stats.remSat.toLocaleString()} Saturdays left`;
  let satFs = 54;
  ctx.font = `800 ${satFs}px 'Syne','Arial Black',sans-serif`;
  while (ctx.measureText(satText).width > 900 && satFs > 26) {
    satFs -= 2;
    ctx.font = `800 ${satFs}px 'Syne','Arial Black',sans-serif`;
  }
  ctx.fillStyle = "#EEEEFF";
  ctx.fillText(satText, cx, divY + 62);

  // Time stats
  const cardItems = [
    { txt: t.satPhone(t.fmtY(stats.phoneY)), col: "#F5A623" },
    { txt: t.satSleep(t.fmtY(stats.sleepY)), col: "#5B9CF6" },
    { txt: t.satWork(t.fmtY(stats.workY)),   col: "#9B7CF5" },
    { txt: t.satToilet(t.fmtY(stats.toiletY)), col: "#34D399" },
  ];
  ctx.font = "400 27px 'Inter',Arial,sans-serif";
  cardItems.forEach((it, i) => {
    ctx.fillStyle = i === 0 ? it.col : "#4B4B70";
    ctx.fillText(it.txt, cx, divY + 120 + i * 50);
  });

  // Partner row
  if (stats.hasPartner) {
    const pY = divY + 120 + cardItems.length * 50 + 18;
    ctx.strokeStyle = "#2A1A3A"; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(200, pY - 8); ctx.lineTo(880, pY - 8); ctx.stroke();
    ctx.fillStyle = "#EC4899";
    ctx.font = "400 26px 'Inter',Arial,sans-serif";
    ctx.fillText(`💕 ${t.fmtY(stats.partnerY)} ${t.partnerBig}`, cx, pY + 28);
  }

  // Footer
  ctx.fillStyle = "#222238";
  ctx.font = "22px 'Inter',Arial,sans-serif";
  ctx.fillText("lifespent.app", cx, H - 36);

  return canvas.toDataURL("image/png");
}
