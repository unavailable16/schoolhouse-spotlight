import type { NewsItem } from "./content";
export function publishTimestamp(value: string): number {
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return Date.parse(value + "T00:00:00Z") || 0;
  const months = [
    "januari",
    "februari",
    "maret",
    "april",
    "mei",
    "juni",
    "juli",
    "agustus",
    "september",
    "oktober",
    "november",
    "desember",
  ];
  const match = /^(\d{1,2})\s+([a-z]+)\s+(\d{4})$/i.exec(value.trim());
  if (match) {
    const month = months.indexOf((match[2] || "").toLowerCase());
    if (month >= 0) return Date.UTC(Number(match[3]), month, Number(match[1]));
  }
  return Date.parse(value) || 0;
}
export function selectLatestNews(items: NewsItem[], limit = 5) {
  return items
    .filter((item) => (item.type || "news") === "news")
    .sort((a, b) => publishTimestamp(b.date) - publishTimestamp(a.date))
    .slice(0, limit);
}
export function selectPinnedNews(items: NewsItem[]) {
  return selectLatestNews(
    items.filter((item) => item.pinned === true),
    items.length,
  );
}
