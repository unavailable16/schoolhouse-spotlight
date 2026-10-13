import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import news from "./imported/news.json";
import activities from "./imported/activities.seed.json";
import settings from "./imported/school-settings.json";
import media from "./imported/site-media.json";
import { applyNewsChange, publicNews } from "./cms-rules";

const imported: Record<string, unknown> = { news, activities, "school-settings": settings, "site-media": media };
type Input = { path: string; method: string; body?: string };
const validateInput = (input: Input) => {
  if (!input || typeof input.path !== "string" || typeof input.method !== "string" || (input.body && input.body.length > 32_000_000)) throw new Error("Permintaan tidak valid.");
  return input;
};

export const readSchoolContent = createServerFn({ method: "GET" })
  .inputValidator((id: string) => {
    if (!Object.hasOwn(imported, id)) throw new Error("Data tidak ditemukan.");
    return id;
  })
  .handler(async ({ data: id }) => {
    // Public reads project only safe collections; never expose draft posts.
    const url = process.env['SUPABASE_URL'];
    const key = process.env['SUPABASE_SERVICE_ROLE_KEY'];
    if (!url || !key) throw new Error("Penyimpanan belum tersedia.");
    const client = createClient(url, key, { auth: { persistSession: false } });
    const { data, error } = await client.from("school_content").select("payload").eq("id", id).maybeSingle();
    if (error) throw new Error("Data sekolah belum dapat dimuat.");
    const value = data?.payload ?? imported[id];
    return id === "news" ? publicNews(value) : value;
  });

export const manageSchoolContent = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(validateInput)
  .handler(async ({ data: input, context }) => {
    const { data: allowed, error: roleError } = await context.supabase.rpc("has_role", { _user_id: context.userId, _role: "admin" });
    if (roleError || !allowed) throw new Error("Akun ini belum memiliki akses admin.");
    const username = typeof context.claims.email === "string" ? context.claims.email : "Admin sekolah";
    if (input.path === "/api/admin/session") return { authenticated: true, username };
    const path = input.path.split("?")[0] ?? "";
    const id = path.split("/")[2] ?? "";
    if (!Object.hasOwn(imported, id)) throw new Error("Data tidak ditemukan.");
    const { data: row, error } = await context.supabase.from("school_content").select("payload, updated_at").eq("id", id).maybeSingle();
    if (error) throw new Error("Data belum dapat dimuat.");
    const current = row?.payload ?? imported[id];
    if (input.method === "GET") return current;
    const body: unknown = JSON.parse(input.body || "{}");
    let value: unknown;
    if (id === "news") value = applyNewsChange(current, input.method, body, username);
    else if (id === "school-settings") {
      const section = path.split("/")[3];
      if (!["profile", "spmb", "campus"].includes(section ?? "")) throw new Error("Bagian tidak valid.");
      value = { ...(current as Record<string, unknown>), [section ?? ""]: body };
    } else {
      if (input.method !== "PUT" || !body || typeof body !== "object") throw new Error("Data tidak valid.");
      value = body;
    }
    const payload = JSON.parse(JSON.stringify(value));
    const updatedAt = new Date().toISOString();
    if (row) {
      const result = await context.supabase.from("school_content").update({ payload, updated_at: updatedAt }).eq("id", id).eq("updated_at", row.updated_at).select("id");
      if (result.error || !result.data?.length) throw new Error("Data berubah. Muat ulang sebelum menyimpan.");
    } else {
      const result = await context.supabase.from("school_content").insert({ id, payload, updated_at: updatedAt });
      if (result.error) throw new Error("Data belum dapat disimpan. Silakan muat ulang.");
    }
    return value;
  });