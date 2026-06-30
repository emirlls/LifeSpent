export type Lang = "tr" | "en";

export interface Translation {
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

export interface CelebrityRef {
  years: number;
  emoji: string;
  tr: string;
  en: string;
}

export interface CelebrityDB {
  phone: CelebrityRef[];
  sleep: CelebrityRef[];
  toilet: CelebrityRef[];
  work: CelebrityRef[];
  [key: string]: CelebrityRef[];
}

export interface FormData {
  age: string;
  exp: string;
  sl: string;
  ph: string;
  wk: string;
  tl: string;
  partnerH: string;
}

export interface Stats {
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

export interface AltItem {
  i: string;
  t: string;
}

export interface CelebRow {
  key: string;
  years: number;
  color: string;
  icon: string;
  label: string;
  celeb: CelebrityRef | null;
}
