import { useState, useEffect, useRef } from "react";

// ═══════════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════════

type Lang = "tr" | "en";

interface Translation {
  appTagline: string;
  appSub: string;
  fAge: string;
  fExp: string;
  fHabits: string;
  fSleep: string;
  fPhone: string;
  fWork: string;
  fToilet: string;
  fPartner: string;
  fPartnerToggle: string;
  hUnit: string;
  calcBtn: string;
  fillBtn: string;
  editBtn: string;
  overLimit: (h: number) => string;
  ringLabel: string;
  ringRem: (p: number) => string;
  lifeMeta: (age: number, rem: number) => string;
  weeksTitle: string;
  weeksSub: (n: number) => string;
  weeksCaption: string;
  soFarTitle: string;
  soFarSub: (age: number) => string;
  sHearts: string;
  sBreaths: string;
  sDays: string;
  sSleep: string;
  tempoTitle: string;
  tempoSub: (y: number) => string;
  dailyH: (h: number | string) => string;
  inRem: string;
  altsTitle: string;
  celebTitle: string;
  celebPhone: string;
  celebSleep: string;
  celebWork: string;
  celebToilet: string;
  celebYrs: (y: number) => string;
  celebMore: (d: string) => string;
  satTitle: string;
  satLabel: string;
  satPhone: (v: string) => string;
  satSleep: (v: string) => string;
  satWork: (v: string) => string;
  satToilet: (v: string) => string;
  partnerTitle: string;
  partnerBig: string;
  partnerPct: (p: number) => string;
  partnerSatL: string;
  partnerMealsL: string;
  partnerBdayL: string;
  shareTitle: string;
  shareSub: string;
  shareBtn: string;
  shareLoading: string;
  dlBtn: string;
  refreshBtn: string;
  bar24: string;
  barFree: (h: number) => string;
  altMed: string;
  altDeg: string;
  altLangs: (n: number) => string;
  altBooks: (n: number) => string;
  altInstrs: (n: number) => string;
  altCourses: (n: number) => string;
  fmtY: (y: number) => string;
  fmtBig: (n: number) => string;
}

interface CelebrityRef {
  years: number;
  emoji: string;
  tr: string;
  en: string;
}

interface CelebrityDB {
  phone: CelebrityRef[];
  sleep: CelebrityRef[];
  toilet: CelebrityRef[];
  work: CelebrityRef[];
  [key: string]: CelebrityRef[];
}

interface FormData {
  age: string;
  exp: string;
  sl: string;
  ph: string;
  wk: string;
  tl: string;
  partnerH: string;
}

interface Stats {
  age: number;
  exp: number;
  lifeP: number;
  remY: number;
  remSat: number;
  daysLived: number;
  hearts: number;
  breaths: number;
  hSlept: number;
  sleepY: number;
  phoneY: number;
  workY: number;
  toiletY: number;
  phoneTH: number;
  sl: number;
  ph: number;
  wk: number;
  tl: number;
  partnerY: number;
  partnerSat: number;
  partnerMeals: number;
  partnerBdays: number;
  partnerPct: number;
  hasPartner: boolean;
}

interface AltItem {
  i: string;
  t: string;
}

interface CelebRow {
  key: string;
  years: number;
  color: string;
  icon: string;
  label: string;
  celeb: CelebrityRef | null;
}

// ═══════════════════════════════════════════════════════════════════════════════
// TRANSLATIONS
// ═══════════════════════════════════════════════════════════════════════════════

const T: Record<Lang, Translation> = {
  tr: {
    appTagline: "Zamanın gerçekte nereye gidiyor?",
    appSub:
      "Günlük alışkanlıklarını gir, hayatının gerçek tablosunu gör. Paylaş, düşün, harekete geç.",
    fAge: "MEVCUT YAŞ",
    fExp: "TAHMİNİ ÖMÜR",
    fHabits: "GÜNLÜK ALIŞKANLIKLAR",
    fSleep: "Uyku",
    fPhone: "Telefon kullanımı",
    fWork: "Çalışma",
    fToilet: "Tuvalet",
    fPartner: "Partnerinle günlük süre",
    fPartnerToggle: "💕 Partner süresini ekle",
    hUnit: "s",
    calcBtn: "Hayatımı Hesapla →",
    fillBtn: "Bilgileri Tamamla",
    editBtn: "← Düzenle",
    overLimit: (h) => `Toplam ${h}s — 24 saati aşıyor.`,
    ringLabel: "HAYATIN TAMAMLANDI",
    ringRem: (p) => `%${p} hâlâ önünde`,
    lifeMeta: (a, r) => `${a} yaşındasın · ${r} yıl önünde`,
    weeksTitle: "HAYATININ HAFTALARIDA",
    weeksSub: (n) => `${n} yıllık hayatının tüm haftaları`,
    weeksCaption: "Her kare = 1 haftalık hayat · kırmızılar geride kaldı",
    soFarTitle: "ŞİMDİYE KADAR",
    soFarSub: (a) => `${a} yılda neler oldu?`,
    sHearts: "kalp atışı",
    sBreaths: "nefes aldın",
    sDays: "gün gördün",
    sSleep: "saat uyudun",
    tempoTitle: "BU TEMPODA DEVAM EDERSEN",
    tempoSub: (y) => `Kalan ${Math.round(y)} yılında zamanın böyle geçecek:`,
    dailyH: (h) => `Günde ${h} saat`,
    inRem: "kalan ömründe",
    altsTitle: "BU SÜREDE YAPABİLECEKLERİN:",
    celebTitle: "🏆 ÜNLÜYLE KIYASLA",
    celebPhone: "Telefon",
    celebSleep: "Uyku",
    celebWork: "Çalışma",
    celebToilet: "Tuvalet",
    celebYrs: (y) => `${y} yıl`,
    celebMore: (d) => `+${d} daha`,
    satTitle: "HAYAT GERÇEĞİ",
    satLabel: "cumartesi günün kaldı",
    satPhone: (v) => `📱 ${v} telefon ekranında geçireceksin`,
    satSleep: (v) => `😴 ${v} uykuda geçireceksin`,
    satWork: (v) => `💼 ${v} çalışarak geçireceksin`,
    satToilet: (v) => `🚽 ${v} tuvalette geçireceksin`,
    partnerTitle: "💕 PARTNERİNLE ZAMAN",
    partnerBig: "birlikte geçireceksiniz",
    partnerPct: (p) => `Bu, kalan hayatının %${Math.round(p)}'si`,
    partnerSatL: "cumartesi birlikte",
    partnerMealsL: "öğün birlikte",
    partnerBdayL: "doğum günü",
    shareTitle: "PAYLAŞIM KARTI",
    shareSub: "Story'e at, tweet'le — herkesin görmesini sağla.",
    shareBtn: "🎨 Paylaşım Kartı Oluştur",
    shareLoading: "⏳ Oluşturuluyor...",
    dlBtn: "⬇️ PNG İndir",
    refreshBtn: "Yenile",
    bar24: "24 SAATİN",
    barFree: (h) => `Serbest ${h}s`,
    altMed: "Tıp fakültesini baştan sona bitirebilirdin",
    altDeg: "4 yıllık lisans diploması alabilirdin",
    altLangs: (n) => `${n} yabancı dil öğrenebilirdin`,
    altBooks: (n) => `${n} kitap okuyabilirdin`,
    altInstrs: (n) => `${n} enstrüman öğrenebilirdin`,
    altCourses: (n) => `${n} online kurs tamamlayabilirdin`,
    fmtY: (y) => {
      if (y >= 1) return `${parseFloat(y.toFixed(1))} yıl`;
      if (y * 12 >= 1) return `${Math.round(y * 12)} ay`;
      return `${Math.round(y * 52)} hafta`;
    },
    fmtBig: (n) => {
      if (n >= 1e9) return `${(n / 1e9).toFixed(1)} milyar`;
      if (n >= 1e6) return `${(n / 1e6).toFixed(1)} milyon`;
      if (n >= 1e4) return `${Math.round(n / 1000)} bin`;
      return Math.round(n).toLocaleString("tr-TR");
    },
  },
  en: {
    appTagline: "Where does your time really go?",
    appSub:
      "Enter your daily habits and see the real picture of your life. Share it, reflect, take action.",
    fAge: "CURRENT AGE",
    fExp: "EXPECTED LIFESPAN",
    fHabits: "DAILY HABITS",
    fSleep: "Sleep",
    fPhone: "Phone usage",
    fWork: "Work",
    fToilet: "Bathroom",
    fPartner: "Daily time with partner",
    fPartnerToggle: "💕 Add partner time",
    hUnit: "h",
    calcBtn: "Calculate My Life →",
    fillBtn: "Fill in the Details",
    editBtn: "← Edit",
    overLimit: (h) => `Total ${h}h — exceeds 24 hours.`,
    ringLabel: "OF YOUR LIFE DONE",
    ringRem: (p) => `${p}% still ahead`,
    lifeMeta: (a, r) => `You're ${a} · ${r} years ahead`,
    weeksTitle: "YOUR WEEKS OF LIFE",
    weeksSub: (n) => `All ${n} years of your life in weeks`,
    weeksCaption: "Each square = 1 week · red ones are gone, grey ones are still yours",
    soFarTitle: "SO FAR",
    soFarSub: (a) => `What happened in your ${a} years?`,
    sHearts: "heartbeats",
    sBreaths: "breaths taken",
    sDays: "days seen",
    sSleep: "hours slept",
    tempoTitle: "AT THIS PACE",
    tempoSub: (y) => `In your remaining ${Math.round(y)} years, your time will go like this:`,
    dailyH: (h) => `${h}h per day`,
    inRem: "of remaining life",
    altsTitle: "WHAT YOU COULD DO INSTEAD:",
    celebTitle: "🏆 CELEBRITY COMPARISON",
    celebPhone: "Phone",
    celebSleep: "Sleep",
    celebWork: "Work",
    celebToilet: "Bathroom",
    celebYrs: (y) => `${y} yrs`,
    celebMore: (d) => `+${d} longer`,
    satTitle: "LIFE REALITY CHECK",
    satLabel: "Saturdays left in your life",
    satPhone: (v) => `📱 ${v} on your phone screen`,
    satSleep: (v) => `😴 ${v} asleep`,
    satWork: (v) => `💼 ${v} working`,
    satToilet: (v) => `🚽 ${v} in the bathroom`,
    partnerTitle: "💕 TIME WITH YOUR PARTNER",
    partnerBig: "together with your partner",
    partnerPct: (p) => `That's ${Math.round(p)}% of your remaining life`,
    partnerSatL: "Saturdays together",
    partnerMealsL: "meals together",
    partnerBdayL: "birthdays",
    shareTitle: "SHARE CARD",
    shareSub: "Post to your story, tweet it — make people think.",
    shareBtn: "🎨 Generate Share Card",
    shareLoading: "⏳ Generating...",
    dlBtn: "⬇️ Download PNG",
    refreshBtn: "Refresh",
    bar24: "YOUR 24H",
    barFree: (h) => `Free ${h}h`,
    altMed: "You could have finished medical school",
    altDeg: "You could have earned a 4-year university degree",
    altLangs: (n) => `You could have learned ${n} languages`,
    altBooks: (n) => `You could have read ${n} books`,
    altInstrs: (n) => `You could have learned ${n} instruments`,
    altCourses: (n) => `You could have completed ${n} online courses`,
    fmtY: (y) => {
      if (y >= 1) return `${parseFloat(y.toFixed(1))} years`;
      if (y * 12 >= 1) return `${Math.round(y * 12)} months`;
      return `${Math.round(y * 52)} weeks`;
    },
    fmtBig: (n) => {
      if (n >= 1e9) return `${(n / 1e9).toFixed(1)} billion`;
      if (n >= 1e6) return `${(n / 1e6).toFixed(1)} million`;
      if (n >= 1e4) return `${Math.round(n / 1000)}K`;
      return Math.round(n).toLocaleString("en-US");
    },
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// CELEBRITY DATABASE
// ═══════════════════════════════════════════════════════════════════════════════

const CELEB: CelebrityDB = {
  phone: [
    { years: 0.5, emoji: "🎬", tr: "Fast & Furious serisinden bir filmin çekim süresi", en: "filming one Fast & Furious movie" },
    { years: 1,   emoji: "🎵", tr: "Taylor Swift'in Folklore + Evermore albümlerini kaydetmesi", en: "Taylor Swift recording Folklore + Evermore" },
    { years: 2,   emoji: "🏎️", tr: "F1'de iki tam şampiyonluk sezonu", en: "two full Formula 1 championship seasons" },
    { years: 4,   emoji: "🏅", tr: "Bir Olimpiyat döngüsü", en: "one complete Olympic cycle" },
    { years: 6,   emoji: "⚽", tr: "Ronaldo'nun Manchester United'daki ilk dönemi (2003–09)", en: "Ronaldo's first stint at Man Utd (2003–09)" },
    { years: 8,   emoji: "🚀", tr: "NASA'nın Apollo programının tamamı", en: "NASA's entire Apollo program" },
    { years: 11,  emoji: "🎾", tr: "Federer'in Grand Slam dominasyon dönemi", en: "Federer's Grand Slam dominance era" },
    { years: 15,  emoji: "🏀", tr: "Michael Jordan'ın tüm NBA kariyeri", en: "Michael Jordan's entire NBA career" },
    { years: 21,  emoji: "⚽", tr: "Messi'nin tüm FC Barcelona kariyeri (2004–21)", en: "Messi's entire career at FC Barcelona" },
    { years: 24,  emoji: "⚽", tr: "Cristiano Ronaldo'nun tüm profesyonel kariyeri", en: "Cristiano Ronaldo's entire professional career" },
  ],
  sleep: [
    { years: 2,  emoji: "🐾", tr: "Bir köpeğin büyüme çağı", en: "a dog's puppyhood" },
    { years: 7,  emoji: "🐕", tr: "Ortalama bir köpeğin yarı ömrü", en: "half the average lifespan of a dog" },
    { years: 14, emoji: "🦁", tr: "Vahşi bir aslanın tüm ömrü", en: "the full lifespan of a wild lion" },
    { years: 20, emoji: "🐘", tr: "Genç bir filin büyüme dönemi", en: "a young elephant's formative years" },
    { years: 30, emoji: "🌳", tr: "Bir meşe fidanının tam ağaç olması", en: "an oak seedling growing into a full tree" },
    { years: 40, emoji: "🐋", tr: "Bir mavi balinanın ilk on yılları", en: "a blue whale's first four decades" },
  ],
  toilet: [
    { years: 0.1,  emoji: "🎬", tr: "9 ana Star Wars filmini arka arkaya izlemek", en: "watching all 9 main Star Wars films back-to-back" },
    { years: 0.25, emoji: "📺", tr: "Breaking Bad'in tüm sezonlarını izlemek", en: "watching all seasons of Breaking Bad" },
    { years: 0.5,  emoji: "📚", tr: "Tüm Harry Potter serisini okumak", en: "reading the entire Harry Potter series" },
    { years: 1,    emoji: "🎮", tr: "Tüm ana Zelda oyunlarını bitirmek", en: "completing every mainline Zelda game" },
    { years: 1.5,  emoji: "🏗️", tr: "Eyfel Kulesi inşaatının yarısı (2.5 yıl toplam)", en: "half the construction of the Eiffel Tower" },
    { years: 3,    emoji: "🏙️", tr: "Burj Khalifa'nın inşa süresi", en: "the entire construction of the Burj Khalifa" },
  ],
  work: [
    { years: 3,  emoji: "📱", tr: "Apple'ın orijinal iPhone'u geliştirmesi (2004–07)", en: "Apple developing the original iPhone (2004–07)" },
    { years: 6,  emoji: "🚗", tr: "Tesla'nın kuruluşundan ilk Model S teslimatına", en: "Tesla from founding to first Model S delivery" },
    { years: 10, emoji: "📦", tr: "Amazon'un garajdan borsaya yolculuğu", en: "Amazon going from a garage to its IPO" },
    { years: 18, emoji: "🎨", tr: "Da Vinci'nin Mona Lisa dahil en üretken dönemi", en: "Da Vinci's most creative period, including Mona Lisa" },
    { years: 24, emoji: "🍎", tr: "Steve Jobs'ın Apple'a dönüşünden vefatına kadar", en: "Steve Jobs' return to Apple until his passing" },
    { years: 35, emoji: "📈", tr: "Warren Buffett'ın ilk milyarına ulaşması", en: "Warren Buffett's journey to his first billion" },
  ],
};

function findCeleb(years: number, cat: string): CelebrityRef | null {
  const db = CELEB[cat];
  if (!db) return null;
  let best: CelebrityRef | null = null;
  for (const c of db) {
    if (c.years <= years) best = c;
  }
  return best;
}

// ═══════════════════════════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════════════════════════

const toY = (hpd: number, days: number): number => (hpd * days) / (24 * 365.25);

function computeStats(f: FormData, usePartner: boolean): Stats {
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

function getAlts(phoneTH: number, phoneY: number, t: Translation): AltItem[] {
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

// ═══════════════════════════════════════════════════════════════════════════════
// CANVAS SHARE CARD
// ═══════════════════════════════════════════════════════════════════════════════

async function generateCard(stats: Stats, lang: Lang): Promise<string> {
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

// ═══════════════════════════════════════════════════════════════════════════════
// COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════════

function LangToggle({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
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

function LifeRing({ pct, t }: { pct: number; t: Translation }) {
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

function WeeksCanvas({ age, exp }: { age: number; exp: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const W = 7, G = 2, COLS = 52;
    const rows = Math.ceil(exp);
    canvas.width = COLS * (W + G);
    canvas.height = rows * (W + G);
    const lived = Math.floor(age * 52);
    let w = 0;
    for (let r = 0; r < rows; r++) {
      for (let col = 0; col < COLS; col++) {
        ctx.fillStyle = w < lived ? "#F03D71" : w === lived ? "#FF9040" : "#16162A";
        ctx.fillRect(col * (W + G), r * (W + G), W, W);
        w++;
      }
    }
  }, [age, exp]);
  return (
    <canvas
      ref={ref}
      style={{ maxWidth: "100%", borderRadius: "4px", display: "block", margin: "0 auto" }}
    />
  );
}

function StatCard({ icon, value, label, color }: { icon: string; value: string | number; label: string; color: string }) {
  return (
    <div style={{
      background: "#111120", border: `1px solid ${color}18`, borderRadius: "12px",
      padding: "16px 12px", flex: 1, minWidth: "120px", textAlign: "center",
    }}>
      <div style={{ fontSize: "18px", marginBottom: "7px" }}>{icon}</div>
      <div style={{ color, fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "15px", lineHeight: 1.2, marginBottom: "5px" }}>{value}</div>
      <div style={{ color: "#363658", fontSize: "10px", fontFamily: "'Inter',sans-serif", lineHeight: 1.4 }}>{label}</div>
    </div>
  );
}

interface ActCardProps {
  icon: string;
  name: string;
  hpd: number;
  years: number;
  color: string;
  alts?: AltItem[];
  t: Translation;
}
function ActCard({ icon, name, hpd, years, color, alts, t }: ActCardProps) {
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

function CelebSection({ stats, lang, t }: { stats: Stats; lang: Lang; t: Translation }) {
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

function RelationshipCard({ stats, t }: { stats: Stats; t: Translation }) {
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
function SliderInput({ label, icon, value, onChange, min, max, step, color, hUnit }: SliderInputProps) {
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

function HourBar({ sl, ph, wk, tl, t }: { sl: number; ph: number; wk: number; tl: number; t: Translation }) {
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

function SectionTitle({ color, children }: { color: string; children: React.ReactNode }) {
  return (
    <div style={{ color, fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "12px", letterSpacing: "1.1px", marginBottom: "5px" }}>
      {children}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════════════════════════

export default function LifeSpent() {
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=Inter:wght@300;400;500;600&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => link.remove();
  }, []);

  const [lang, setLang] = useState<Lang>("tr");
  const [step, setStep] = useState<"input" | "results">("input");
  const [f, setF] = useState<FormData>({ age: "27", exp: "80", sl: "7", ph: "4", wk: "8", tl: "0.5", partnerH: "1" });
  const [showPartner, setShowPartner] = useState(false);
  const [stats, setStats] = useState<Stats | null>(null);
  const [cardUrl, setCardUrl] = useState<string | null>(null);
  const [cardLoading, setCardLoading] = useState(false);

  const t = T[lang];
  const set = (k: keyof FormData) => (v: string) => setF((p) => ({ ...p, [k]: v }));
  const totalH = [+f.sl, +f.ph, +f.wk, +f.tl].reduce((a, b) => a + b, 0);
  const overLimit = totalH > 24;
  const valid = +f.age > 0 && +f.age < +f.exp && +f.exp <= 120 && !overLimit;

  const handleCalc = () => {
    if (!valid) return;
    setStats(computeStats(f, showPartner));
    setStep("results");
    setCardUrl(null);
    window.scrollTo(0, 0);
  };

  const handleCard = async () => {
    if (!stats) return;
    setCardLoading(true);
    try { setCardUrl(await generateCard(stats, lang)); }
    finally { setCardLoading(false); }
  };

  const APP: React.CSSProperties = { minHeight: "100vh", background: "#09090F", color: "#EEEEFF", fontFamily: "'Inter',-apple-system,sans-serif" };
  const WRAP: React.CSSProperties = { maxWidth: "680px", margin: "0 auto", padding: "0 22px 80px" };
  const CARD: React.CSSProperties = { background: "#0F0F1E", borderRadius: "18px", border: "1px solid rgba(255,255,255,0.05)", padding: "26px 22px", marginBottom: "14px" };

  // ── INPUT ─────────────────────────────────────────────────────────────────────
  if (step === "input") {
    const tagWords = t.appTagline.split(" ");
    const lastWord = tagWords.pop() ?? "";
    return (
      <div style={APP}>
        <div style={WRAP}>
          {/* Top bar */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "22px 0 0" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ width: "30px", height: "30px", borderRadius: "8px", background: "linear-gradient(135deg,#F03D71,#FF8C42)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "15px" }}>⏳</div>
              <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "20px", background: "linear-gradient(90deg,#F03D71,#FF8C42)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>LifeSpent</span>
            </div>
            <LangToggle lang={lang} setLang={setLang} />
          </div>

          {/* Hero */}
          <div style={{ textAlign: "center", padding: "40px 0 36px" }}>
            <h1 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(26px,6vw,40px)", lineHeight: 1.12, margin: "0 0 12px", letterSpacing: "-1px" }}>
              {tagWords.join(" ")}{" "}
              <span style={{ background: "linear-gradient(90deg,#F03D71,#FF8C42)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                {lastWord}
              </span>
            </h1>
            <p style={{ color: "#48486A", fontSize: "13px", lineHeight: 1.7, maxWidth: "360px", margin: "0 auto" }}>{t.appSub}</p>
          </div>

          {/* Form */}
          <div style={{ ...CARD, padding: "28px" }}>
            {/* Age inputs */}
            <div style={{ display: "flex", gap: "14px", marginBottom: "26px" }}>
              {([["age", t.fAge, "27"], ["exp", t.fExp, "80"]] as [keyof FormData, string, string][]).map(([k, label, ph]) => (
                <div key={k} style={{ flex: 1 }}>
                  <label style={{ color: "#484868", fontSize: "10px", fontFamily: "'Inter',sans-serif", letterSpacing: "1px", display: "block", marginBottom: "7px" }}>{label}</label>
                  <input
                    type="number" value={f[k]} onChange={(e) => set(k)(e.target.value)} placeholder={ph}
                    style={{ width: "100%", background: "#141428", border: "1px solid #222240", borderRadius: "10px", color: "#EEEEFF", fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "26px", padding: "12px 14px", outline: "none", boxSizing: "border-box" }}
                  />
                </div>
              ))}
            </div>

            {/* Divider */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "22px" }}>
              <div style={{ flex: 1, height: "1px", background: "#1A1A2E" }} />
              <span style={{ color: "#2E2E4E", fontSize: "10px", fontFamily: "'Inter',sans-serif", letterSpacing: "0.9px" }}>{t.fHabits}</span>
              <div style={{ flex: 1, height: "1px", background: "#1A1A2E" }} />
            </div>

            <SliderInput label={t.fSleep}  icon="😴" value={f.sl} onChange={set("sl")} min={0} max={14} step={0.5}  color="#5B9CF6" hUnit={t.hUnit} />
            <SliderInput label={t.fPhone}  icon="📱" value={f.ph} onChange={set("ph")} min={0} max={16} step={0.5}  color="#F5A623" hUnit={t.hUnit} />
            <SliderInput label={t.fWork}   icon="💼" value={f.wk} onChange={set("wk")} min={0} max={16} step={0.5}  color="#9B7CF5" hUnit={t.hUnit} />
            <SliderInput label={t.fToilet} icon="🚽" value={f.tl} onChange={set("tl")} min={0} max={4}  step={0.25} color="#34D399" hUnit={t.hUnit} />

            {/* Partner toggle */}
            <div style={{ marginTop: "6px" }}>
              <button
                onClick={() => setShowPartner(!showPartner)}
                style={{ background: "transparent", border: `1px solid ${showPartner ? "#EC489960" : "#1E1E35"}`, borderRadius: "8px", color: showPartner ? "#EC4899" : "#484868", fontFamily: "'Inter',sans-serif", fontSize: "12px", padding: "8px 14px", cursor: "pointer", transition: "all 0.2s", width: "100%", textAlign: "left" }}
              >
                {t.fPartnerToggle} {showPartner ? "↑" : "↓"}
              </button>
              {showPartner && (
                <div style={{ marginTop: "14px", paddingBottom: "2px" }}>
                  <SliderInput label={t.fPartner} icon="💕" value={f.partnerH} onChange={set("partnerH")} min={0} max={16} step={0.5} color="#EC4899" hUnit={t.hUnit} />
                </div>
              )}
            </div>

            <HourBar sl={+f.sl} ph={+f.ph} wk={+f.wk} tl={+f.tl} t={t} />

            {overLimit && (
              <div style={{ marginTop: "14px", padding: "10px 14px", background: "#F03D7112", border: "1px solid #F03D7128", borderRadius: "8px", color: "#F03D71", fontSize: "12px", fontFamily: "'Inter',sans-serif" }}>
                ⚠️ {t.overLimit(parseFloat(totalH.toFixed(1)))}
              </div>
            )}

            <button
              onClick={handleCalc} disabled={!valid}
              style={{ marginTop: "24px", width: "100%", padding: "16px", background: valid ? "linear-gradient(135deg,#F03D71,#FF6B35)" : "#141428", border: "none", borderRadius: "12px", color: valid ? "#fff" : "#383858", fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "15px", cursor: valid ? "pointer" : "not-allowed", transition: "all 0.2s" }}
            >
              {valid ? t.calcBtn : t.fillBtn}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── RESULTS ───────────────────────────────────────────────────────────────────
  if (!stats) return null;
  const alts = getAlts(stats.phoneTH, stats.phoneY, t);

  return (
    <div style={APP}>
      <div style={WRAP}>
        {/* Nav */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 0 26px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: "linear-gradient(135deg,#F03D71,#FF8C42)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px" }}>⏳</div>
            <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "18px", background: "linear-gradient(90deg,#F03D71,#FF8C42)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>LifeSpent</span>
          </div>
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <LangToggle lang={lang} setLang={setLang} />
            <button
              onClick={() => { setStep("input"); setStats(null); setCardUrl(null); }}
              style={{ background: "#141428", border: "1px solid #222240", borderRadius: "8px", color: "#585878", fontFamily: "'Inter',sans-serif", fontSize: "12px", padding: "7px 12px", cursor: "pointer" }}
            >
              {t.editBtn}
            </button>
          </div>
        </div>

        {/* Life Ring */}
        <div style={{ ...CARD, textAlign: "center" }}>
          <LifeRing pct={stats.lifeP} t={t} />
          <div style={{ display: "inline-flex", alignItems: "center", marginTop: "4px", padding: "5px 14px", background: "#F03D7110", borderRadius: "20px" }}>
            <span style={{ color: "#F03D71", fontSize: "12px", fontFamily: "'Inter',sans-serif", fontWeight: 500 }}>
              {t.lifeMeta(stats.age, Math.round(stats.remY))}
            </span>
          </div>
        </div>

        {/* Weeks Grid */}
        <div style={CARD}>
          <SectionTitle color="#FF8C42">{t.weeksTitle}</SectionTitle>
          <p style={{ color: "#282848", fontSize: "11px", fontFamily: "'Inter',sans-serif", marginBottom: "14px" }}>{t.weeksSub(stats.exp)}</p>
          <p style={{ color: "#363658", fontSize: "10px", fontFamily: "'Inter',sans-serif", marginBottom: "10px", textAlign: "center" }}>{t.weeksCaption}</p>
          <WeeksCanvas age={stats.age} exp={stats.exp} />
        </div>

        {/* So Far */}
        <div style={CARD}>
          <SectionTitle color="#5B9CF6">{t.soFarTitle}</SectionTitle>
          <p style={{ color: "#282848", fontSize: "11px", fontFamily: "'Inter',sans-serif", marginBottom: "14px" }}>{t.soFarSub(stats.age)}</p>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" as const }}>
            <StatCard icon="❤️" value={t.fmtBig(stats.hearts)}   label={t.sHearts}  color="#F03D71" />
            <StatCard icon="🫁" value={t.fmtBig(stats.breaths)}  label={t.sBreaths} color="#5B9CF6" />
            <StatCard icon="📅" value={t.fmtBig(stats.daysLived)} label={t.sDays}    color="#9B7CF5" />
            <StatCard icon="😴" value={t.fmtBig(stats.hSlept)}   label={t.sSleep}   color="#34D399" />
          </div>
        </div>

        {/* Activity Breakdown */}
        <div style={CARD}>
          <SectionTitle color="#F5A623">{t.tempoTitle}</SectionTitle>
          <p style={{ color: "#282848", fontSize: "11px", fontFamily: "'Inter',sans-serif", marginBottom: "16px" }}>{t.tempoSub(stats.remY)}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <ActCard icon="📱" name={t.fPhone}  hpd={stats.ph} years={stats.phoneY}  color="#F5A623" alts={alts} t={t} />
            <ActCard icon="😴" name={t.fSleep}  hpd={stats.sl} years={stats.sleepY}  color="#5B9CF6" t={t} />
            <ActCard icon="💼" name={t.fWork}   hpd={stats.wk} years={stats.workY}   color="#9B7CF5" t={t} />
            <ActCard icon="🚽" name={t.fToilet} hpd={stats.tl} years={stats.toiletY} color="#34D399" t={t} />
          </div>
        </div>

        {/* Celebrity Comparisons */}
        <CelebSection stats={stats} lang={lang} t={t} />

        {/* Relationship */}
        <RelationshipCard stats={stats} t={t} />

        {/* Saturdays */}
        <div style={{ ...CARD, background: "linear-gradient(135deg,#10082A,#0F0F20)", border: "1px solid #3A1A5A", textAlign: "center", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "-80px", right: "-80px", width: "220px", height: "220px", borderRadius: "50%", background: "#9B7CF718", filter: "blur(70px)", pointerEvents: "none" }} />
          <SectionTitle color="#9B7CF5">{t.satTitle}</SectionTitle>
          <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(44px,9vw,64px)", color: "#EEEEFF", lineHeight: 1.05, margin: "14px 0 6px" }}>
            {stats.remSat.toLocaleString()}
          </div>
          <div style={{ color: "#7070A0", fontSize: "14px", fontFamily: "'Inter',sans-serif", marginBottom: "22px" }}>{t.satLabel}</div>
          <div style={{ borderTop: "1px solid #2A1A3E", paddingTop: "16px", textAlign: "left", display: "flex", flexDirection: "column", gap: "7px" }}>
            {([
              ["#F5A623", t.satPhone(t.fmtY(stats.phoneY))],
              ["#5B9CF6", t.satSleep(t.fmtY(stats.sleepY))],
              ["#9B7CF5", t.satWork(t.fmtY(stats.workY))],
              ["#34D399", t.satToilet(t.fmtY(stats.toiletY))],
            ] as [string, string][]).map(([c, txt], i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ width: "3px", height: "14px", background: c, borderRadius: "2px", flexShrink: 0 }} />
                <span style={{ color: "#5A5A80", fontSize: "13px", fontFamily: "'Inter',sans-serif" }}>{txt}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Share Card */}
        <div style={CARD}>
          <SectionTitle color="#F03D71">{t.shareTitle}</SectionTitle>
          <p style={{ color: "#383858", fontSize: "12px", fontFamily: "'Inter',sans-serif", marginBottom: "16px" }}>{t.shareSub}</p>
          {!cardUrl ? (
            <button
              onClick={handleCard} disabled={cardLoading}
              style={{ width: "100%", padding: "14px", background: cardLoading ? "#141428" : "linear-gradient(135deg,#F03D71,#FF6B35)", border: "none", borderRadius: "11px", color: cardLoading ? "#383858" : "#fff", fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "14px", cursor: cardLoading ? "not-allowed" : "pointer" }}
            >
              {cardLoading ? t.shareLoading : t.shareBtn}
            </button>
          ) : (
            <div>
              <img src={cardUrl} alt="share card" style={{ width: "100%", borderRadius: "12px", marginBottom: "12px", display: "block" }} />
              <div style={{ display: "flex", gap: "10px" }}>
                <a
                  href={cardUrl} download="lifespent.png"
                  style={{ flex: 1, padding: "12px", textAlign: "center", background: "linear-gradient(135deg,#F03D71,#FF6B35)", borderRadius: "10px", color: "#fff", fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "13px", textDecoration: "none", display: "block" }}
                >
                  {t.dlBtn}
                </a>
                <button
                  onClick={() => setCardUrl(null)}
                  style={{ padding: "12px 18px", background: "#141428", border: "1px solid #222240", borderRadius: "10px", color: "#585878", fontFamily: "'Inter',sans-serif", fontSize: "12px", cursor: "pointer" }}
                >
                  {t.refreshBtn}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
