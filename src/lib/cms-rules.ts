import { z } from "zod";

const image = z.string().max(4_300_000).refine((value) => /^(https:\/\/[^\s]+|\/[^\s]*|data:image\/(png|jpeg|webp);base64,[A-Za-z0-9+/=]+)$/.test(value), "Gambar tidak valid.");
const postSchema = z.object({
  slug: z.string().min(1).max(160).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  title: z.string().trim().min(1).max(200), date: z.string().min(1).max(100), image,
  status: z.enum(["draft", "published"]), type: z.enum(["news", "bulletin"]).default("news"),
  category: z.string().default(""), excerpt: z.string().default(""), body: z.array(z.string()).default([]), pinned: z.boolean().default(false), publisher: z.string().optional(),
}).superRefine((item, ctx) => {
  if (item.type === "news" && (!item.category.trim() || !item.excerpt.trim() || !item.body.join("").trim())) ctx.addIssue({ code: "custom", message: "Lengkapi kategori, ringkasan, dan isi berita." });
  if (item.type === "bulletin" && (!/^\d{4}-\d{2}-\d{2}$/.test(item.date) || !Number.isFinite(Date.parse(item.date)) || new Date(item.date).toISOString().slice(0, 10) !== item.date)) ctx.addIssue({ code: "custom", message: "Tanggal buletin tidak valid." });
});
export function publicNews(value: unknown) {
  return z.array(postSchema).parse(value).filter((item) => item.status === "published");
}
export function applyNewsChange(current: unknown, method: string, input: unknown, publisher: string) {
  const items = z.array(postSchema).parse(current);
  const body = z.object({ slug: z.string().optional(), pinned: z.boolean().optional(), originalSlug: z.string().nullable().optional(), item: z.unknown().optional() }).parse(input);
  if (method === "DELETE") {
    if (!body.slug) throw new Error("Slug wajib diisi.");
    return items.filter((item) => item.slug !== body.slug);
  }
  if (method === "PATCH") {
    const item = items.find((post) => post.slug === body.slug);
    if (!item || typeof body.pinned !== "boolean") throw new Error("Berita tidak ditemukan.");
    if (body.pinned && (item.type !== "news" || item.status !== "published")) throw new Error("Hanya berita yang sudah terbit dapat dipin.");
    item.pinned = body.pinned;
    return items;
  }
  if (!["POST", "PUT"].includes(method)) throw new Error("Metode tidak didukung.");
  const parsed = postSchema.parse(body.item);
  const item = { ...parsed, publisher, pinned: parsed.pinned && parsed.type === "news" && parsed.status === "published" };
  if (items.some((post) => post.slug === item.slug && (method === "POST" || post.slug !== body.originalSlug))) throw new Error("Slug sudah digunakan.");
  if (method === "POST") return [...items, item];
  const index = items.findIndex((post) => post.slug === body.originalSlug);
  if (index < 0) throw new Error("Berita tidak ditemukan.");
  items[index] = item;
  return items;
}