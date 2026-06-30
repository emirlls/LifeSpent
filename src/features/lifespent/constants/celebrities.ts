import type { CelebrityDB, CelebrityRef } from "../types";

export const CELEB: CelebrityDB = {
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

export function findCeleb(years: number, cat: string): CelebrityRef | null {
  const db = CELEB[cat];
  if (!db) return null;
  let best: CelebrityRef | null = null;
  for (const c of db) {
    if (c.years <= years) best = c;
  }
  return best;
}
