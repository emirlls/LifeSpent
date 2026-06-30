import type { FormData, Stats, Translation, AltItem } from "../types";

export const toY = (hpd: number, days: number): number => (hpd * days) / (24 * 365.25);

export function computeStats(f: FormData, usePartner: boolean): Stats {
  const age = +f.age;
  const exp = +f.exp;
  const sl = +f.sl;
  const ph = +f.ph;
  const wk = +f.wk;
  const tl = +f.tl;
  const pH = usePartner ? +(f.partnerH || 0) : 0;
  const dL = age * 365.25;
  const rD = (exp - age) * 365.25;
  const partnerY = pH > 0 ? toY(pH, rD) : 0;

  return {
    age, exp,
    lifeP: (age / exp) * 100,
    remY: exp - age,
    remSat: Math.floor((exp - age) * 52),
    daysLived: Math.floor(dL),
    hearts: Math.floor(dL * 24 * 60 * 70),
    breaths: Math.floor(dL * 24 * 60 * 15),
    hSlept: Math.floor(sl * dL),
    sleepY: toY(sl, rD),
    phoneY: toY(ph, rD),
    workY: toY(wk, rD),
    toiletY: toY(tl, rD),
    phoneTH: ph * rD,
    sl, ph, wk, tl,
    partnerY,
    partnerSat: pH > 0 ? Math.floor(partnerY * 52) : 0,
    partnerMeals: pH > 0 ? Math.floor(partnerY * 365 * 1.5) : 0,
    partnerBdays: Math.floor(exp - age),
    partnerPct: pH > 0 ? (pH / 24) * 100 : 0,
    hasPartner: pH > 0,
  };
}

export function getAlts(phoneTH: number, phoneY: number, t: Translation): AltItem[] {
  const items: AltItem[] = [];
  if (phoneY >= 6) items.push({ i: "🏥", t: t.altMed });
  else if (phoneY >= 4) items.push({ i: "🎓", t: t.altDeg });
  const langs = Math.min(Math.floor(phoneTH / 600), 5);
  if (langs >= 1) items.push({ i: "🌍", t: t.altLangs(langs) });
  const books = Math.floor(phoneTH / 9);
  if (books >= 50) items.push({ i: "📚", t: t.altBooks(Math.round(books / 50) * 50) });
  const instrs = Math.min(Math.floor(phoneTH / 1000), 3);
  if (instrs >= 1) items.push({ i: "🎸", t: t.altInstrs(instrs) });
  const courses = Math.min(Math.floor(phoneTH / 100), 20);
  if (courses >= 3) items.push({ i: "💻", t: t.altCourses(courses) });
  return items.slice(0, 5);
}
