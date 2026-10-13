import { news, type NewsItem } from "./content";
export type ManagedNews = NewsItem & { status: "draft" | "published" };
export async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(path, {
    ...options,
    headers: { "Content-Type": "application/json", ...options?.headers },
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Tidak dapat menghubungi server.");
  return data;
}
export async function getNews(): Promise<NewsItem[]> {
  const response = await request<ManagedNews[] | null>("/api/news");
  return response ?? news;
}
export const initialNews: ManagedNews[] = news.map((item) => ({ ...item, status: "published" }));

export function displayPublishDate(date: string) {
  if (/^\d{4}-\d{2}-\d{2}$/.test(date))
    return new Date(date + "T00:00:00").toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  return date;
}
