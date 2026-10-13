import { news, type NewsItem } from "./content";
import { supabase } from "@/integrations/supabase/client";
import { readSchoolContent, manageSchoolContent } from "./cms.functions";
export type ManagedNews = NewsItem & { status: "draft" | "published" };
export async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const method = options?.method ?? "GET";
  if (path === "/api/admin/login") {
    const input = JSON.parse(String(options?.body || "{}"));
    const { error } = await supabase.auth.signInWithPassword({ email: input.username, password: input.password });
    if (error) throw new Error("Email atau password salah.");
    try { return await manageSchoolContent({ data: { path: "/api/admin/session", method: "GET" } }) as T; }
    catch (error) { await supabase.auth.signOut(); throw error; }
  }
  if (path === "/api/admin/logout") {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error("Belum dapat keluar.");
    return { ok: true } as T;
  }
  if (path === "/api/admin/session") {
    const { data } = await supabase.auth.getSession();
    if (!data.session) return { authenticated: false, username: null } as T;
  }
  if (method === "GET" && !path.includes("admin")) return await readSchoolContent({ data: path.split("/")[2] ?? "" }) as T;
  return await manageSchoolContent({ data: { path, method, body: typeof options?.body === "string" ? options.body : undefined } }) as T;
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
