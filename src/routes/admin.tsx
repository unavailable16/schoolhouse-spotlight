import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Plus, Pencil, Trash2, Pin, PinOff, ExternalLink, LogOut } from "lucide-react";
import { initialNews, request, displayPublishDate, type ManagedNews } from "@/lib/news-api";
import { AdminActivities } from "@/components/admin-activities";
import { AdminSchoolSettings } from "@/components/admin-school-settings";
import { AdminMedia } from "@/components/admin-media";
import { school } from "@/lib/school";
export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Dashboard Admin — Al-Mujahidin" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: Admin,
});
const field =
  "mt-2 w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-umber/30";
const button = "rounded-xl bg-umber px-5 py-3 text-sm font-medium text-white disabled:opacity-50";
const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 160)
    .replace(/-$/, "");
const today = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};
const empty = (): ManagedNews => ({
  type: "news",
  slug: "",
  title: "",
  date: today(),
  category: "Kegiatan",
  excerpt: "",
  image: "",
  body: [""],
  status: "draft",
});
function Admin() {
  const queryClient = useQueryClient();
  const [section, setSection] = useState("news");
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const [password, setPassword] = useState("");
  const [items, setItems] = useState<ManagedNews[]>([]);
  const [editing, setEditing] = useState<ManagedNews | null>(null);
  const [originalSlug, setOriginalSlug] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState(false);
  async function load() {
    const session = await request<{ authenticated: boolean; username: string | null }>(
      "/api/admin/session",
    );
    setAuthenticated(session.authenticated);
    setCurrentUser(session.username || "");
    if (session.authenticated) {
      const stored = await request<ManagedNews[] | null>("/api/news?admin=1");
      setItems(
        stored ??
          (await request<ManagedNews[]>("/api/news", {
            method: "POST",
            body: JSON.stringify({ action: "initialize", items: initialNews }),
          })),
      );
    }
  }
  useEffect(() => {
    load()
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);
  async function login(event: FormEvent) {
    event.preventDefault();
    setError("");
    setBusy(true);
    try {
      await request("/api/admin/login", {
        method: "POST",
        body: JSON.stringify({ username: username.trim(), password }),
      });
      setPassword("");
      await load();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  async function logout() {
    setBusy(true);
    setError("");
    try {
      await request("/api/admin/logout", { method: "POST" });
      setAuthenticated(false);
      setCurrentUser("");
      setItems([]);
      setEditing(null);
      setSection("news");
      setNotice("");
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  function open(item?: ManagedNews) {
    setOriginalSlug(item?.slug ?? null);
    setEditing(item ? { ...item, type: item.type || "news", body: [...item.body] } : empty());
    setError("");
    setNotice("");
  }
  async function save(event: FormEvent) {
    event.preventDefault();
    if (!editing) return;
    setBusy(true);
    setError("");
    try {
      const item = {
        ...editing,
        slug: editing.type === "bulletin" ? originalSlug || slugify(editing.title) : editing.slug,
      };
      setItems(
        await request<ManagedNews[]>("/api/news", {
          method: originalSlug ? "PUT" : "POST",
          body: JSON.stringify({ originalSlug, item }),
        }),
      );
      setEditing(null);
      setNotice("Posting berhasil disimpan.");
      await queryClient.invalidateQueries({ queryKey: ["public-news"] });
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  async function togglePin(item: ManagedNews) {
    setBusy(true);
    setError("");
    try {
      setItems(
        await request<ManagedNews[]>("/api/news", {
          method: "PATCH",
          body: JSON.stringify({ slug: item.slug, pinned: !item.pinned }),
        }),
      );
      setNotice(item.pinned ? "Pin berita dilepas." : "Berita dipin ke carousel beranda.");
      await queryClient.invalidateQueries({ queryKey: ["public-news"] });
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  async function remove(item: ManagedNews) {
    if (!window.confirm(`Hapus ${item.title}?`)) return;
    setBusy(true);
    setError("");
    try {
      setItems(
        await request<ManagedNews[]>("/api/news", {
          method: "DELETE",
          body: JSON.stringify({ slug: item.slug }),
        }),
      );
      setNotice("Posting berhasil dihapus.");
      await queryClient.invalidateQueries({ queryKey: ["public-news"] });
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  async function upload(file?: File) {
    if (!file) return;
    setError("");
    if (
      !["image/png", "image/jpeg", "image/webp"].includes(file.type) ||
      file.size > 3 * 1024 * 1024
    ) {
      setError("Pilih JPG, PNG, atau WebP maksimal 3 MB.");
      return;
    }
    setUploading(true);
    try {
      const image = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result));
        reader.onerror = () => reject(Error("Gambar gagal dibaca."));
        reader.readAsDataURL(file);
      });
      await new Promise<void>((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = () => reject(Error("File gambar tidak valid."));
        img.src = image;
      });
      setEditing((value) => (value ? { ...value, image } : value));
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setUploading(false);
    }
  }
  const visible = items.filter(
    (item) =>
      (filter === "all" ||
        (filter === "news"
          ? (item.type || "news") === "news"
          : filter === "bulletin"
            ? item.type === "bulletin"
            : item.status === filter)) &&
      `${item.title} ${item.category}`.toLowerCase().includes(search.toLowerCase()),
  );
  if (loading)
    return <main className="min-h-screen bg-canvas p-12 font-body">Memuat dashboard…</main>;
  if (!authenticated)
    return (
      <main className="flex min-h-screen items-center justify-center bg-canvas p-6 font-body text-ink">
        <div className="w-full max-w-md rounded-3xl border border-ink/10 bg-paper p-8">
          <img src={school.logo} alt="Logo sekolah" className="mx-auto h-20 w-20 object-contain" />
          <h1 className="mt-5 font-display text-3xl">Masuk ruang admin</h1>
          <p className="mt-3 text-sm text-ink-soft">
            Kelola berita, buletin, kegiatan, dan media sekolah.
          </p>
          <form onSubmit={login} className="mt-6 space-y-4">
            <label className="block text-sm">
              Username
              <input
                required
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={field}
              />
            </label>
            <label className="block text-sm">
              Password
              <input
                required
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={field}
              />
            </label>
            {error && (
              <p role="alert" className="text-sm text-red-700">
                {error}
              </p>
            )}
            <button disabled={busy} className={`${button} w-full`}>
              {busy ? "Memproses…" : "Masuk dashboard"}
            </button>
          </form>
          <Link to="/" className="mt-6 block text-center text-sm text-ink-soft">
            ← Website sekolah
          </Link>
        </div>
      </main>
    );
  return (
    <div className="min-h-screen bg-canvas font-body text-ink">
      <header className="border-b border-ink/10 bg-paper">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-6 py-5">
          <div>
            <p className="font-display text-xl">Admin Al-Mujahidin</p>
            <p className="mt-1 text-xs text-ink-soft">Masuk sebagai {currentUser}</p>
          </div>
          <div className="flex gap-4 text-sm">
            <Link to="/" className="flex items-center gap-2">
              <ExternalLink size={15} />
              Lihat website
            </Link>
            <button onClick={logout} disabled={busy} className="flex items-center gap-2">
              <LogOut size={15} />
              Keluar
            </button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-7 flex flex-wrap gap-2">
          {[
            ["news", "Berita & Buletin"],
            ["activities", "Kegiatan"],
            ["media", "Media sekolah"],
            ["spmb", "Pengaturan SPMB"],
            ["profile", "Profil Sekolah"],
          ].map(([id, label]) => (
            <button
              key={id}
              disabled={busy || uploading}
              onClick={() => setSection(id || "news")}
              aria-pressed={section === id}
              className={`rounded-xl px-5 py-3 text-sm ${section === id ? "bg-umber text-white" : "border border-ink/15 bg-paper"}`}
            >
              {label}
            </button>
          ))}
        </div>
        <div hidden={section !== "news"}>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="font-display text-3xl">Berita & Buletin</h1>
              <p className="mt-3 text-sm text-ink-soft">
                Nama penerbit diambil otomatis dari akun admin.
              </p>
            </div>
            {!editing && (
              <button
                disabled={busy}
                onClick={() => open()}
                className={`${button} flex items-center gap-2`}
              >
                <Plus size={16} />
                Tambah posting
              </button>
            )}
          </div>
          <div className="my-7 grid gap-4 sm:grid-cols-3">
            {[
              ["Total posting", items.length],
              ["Terbit", items.filter((n) => n.status === "published").length],
              ["Buletin", items.filter((n) => n.type === "bulletin").length],
            ].map(([label, count]) => (
              <div key={label} className="rounded-2xl border border-ink/10 bg-paper p-5">
                <p className="text-xs text-ink-soft">{label}</p>
                <p className="mt-3 font-display text-3xl">{count}</p>
              </div>
            ))}
          </div>
          {error && (
            <p role="alert" className="mb-5 rounded-xl bg-red-50 p-4 text-sm text-red-700">
              {error}
            </p>
          )}
          {notice && (
            <p role="status" className="mb-5 rounded-xl bg-green-50 p-4 text-sm text-green-800">
              {notice}
            </p>
          )}
          {editing ? (
            <form onSubmit={save} className="rounded-2xl border border-ink/10 bg-paper p-6">
              <div className="flex justify-between gap-3">
                <h2 className="font-display text-2xl">
                  {originalSlug ? "Edit posting" : "Posting baru"}
                </h2>
                <button
                  type="button"
                  disabled={busy || uploading}
                  onClick={() => setEditing(null)}
                  className="text-sm"
                >
                  Batal
                </button>
              </div>
              <fieldset
                disabled={busy || uploading}
                className="mt-6 grid gap-6 lg:grid-cols-[2fr_1fr]"
              >
                <div className="space-y-5">
                  <label className="block text-sm">
                    Jenis posting
                    <select
                      className={field}
                      value={editing.type || "news"}
                      onChange={(e) =>
                        setEditing({
                          ...editing,
                          type: e.target.value as "news" | "bulletin",
                          status: e.target.value === "bulletin" ? "published" : editing.status,
                        })
                      }
                    >
                      <option value="news">Berita</option>
                      <option value="bulletin">Buletin</option>
                    </select>
                  </label>
                  <label className="block text-sm">
                    Judul
                    <input
                      required
                      maxLength={200}
                      className={field}
                      value={editing.title}
                      onChange={(e) =>
                        setEditing({
                          ...editing,
                          title: e.target.value,
                          slug: originalSlug ? editing.slug : slugify(e.target.value),
                        })
                      }
                    />
                  </label>
                  {editing.type !== "bulletin" && (
                    <>
                      <label className="block text-sm">
                        Alamat berita (slug)
                        <input
                          required
                          pattern="[a-z0-9]+(-[a-z0-9]+)*"
                          maxLength={160}
                          className={field}
                          value={editing.slug}
                          onChange={(e) => setEditing({ ...editing, slug: e.target.value })}
                        />
                      </label>
                      <label className="block text-sm">
                        Ringkasan
                        <textarea
                          required
                          maxLength={500}
                          rows={3}
                          className={field}
                          value={editing.excerpt}
                          onChange={(e) => setEditing({ ...editing, excerpt: e.target.value })}
                        />
                      </label>
                      <label className="block text-sm">
                        Isi berita
                        <textarea
                          required
                          rows={10}
                          className={field}
                          value={editing.body.join("\n\n")}
                          onChange={(e) =>
                            setEditing({ ...editing, body: e.target.value.split("\n\n") })
                          }
                        />
                      </label>
                    </>
                  )}
                </div>
                <div className="space-y-5">
                  <label className="block text-sm">
                    Tanggal publish
                    <input
                      required
                      type={/^\d{4}-\d{2}-\d{2}$/.test(editing.date) ? "date" : "text"}
                      className={field}
                      value={editing.date}
                      onChange={(e) => setEditing({ ...editing, date: e.target.value })}
                    />
                  </label>
                  {editing.type !== "bulletin" && (
                    <>
                      <label className="block text-sm">
                        Kategori
                        <select
                          className={field}
                          value={editing.category}
                          onChange={(e) => setEditing({ ...editing, category: e.target.value })}
                        >
                          {[
                            ...new Set([
                              "Kegiatan",
                              "Prestasi",
                              "Fasilitas",
                              "Sosial",
                              "Pengumuman",
                              "SPMB",
                              editing.category,
                            ]),
                          ].map((row) => (
                            <option key={row}>{row}</option>
                          ))}
                        </select>
                      </label>
                      <label className="block text-sm">
                        Status
                        <select
                          className={field}
                          value={editing.status}
                          onChange={(e) =>
                            setEditing({
                              ...editing,
                              status: e.target.value as "draft" | "published",
                            })
                          }
                        >
                          <option value="draft">Draf</option>
                          <option value="published">Terbit</option>
                        </select>
                      </label>
                    </>
                  )}
                  <label className="block text-sm">
                    {editing.type === "bulletin" ? "Gambar buletin" : "Foto berita"}
                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/webp"
                      className={`${field} text-xs`}
                      onChange={(e) => void upload(e.target.files?.[0])}
                    />
                  </label>
                  <p className="text-xs text-ink-soft">JPG, PNG, WebP · maksimal 3 MB.</p>
                  {editing.image && (
                    <img
                      src={editing.image}
                      alt="Pratinjau posting"
                      className="max-h-80 w-full rounded-xl bg-canvas object-contain"
                    />
                  )}
                  <p className="text-xs text-ink-soft">
                    Penerbit: {editing.publisher || currentUser}
                    {editing.type === "bulletin" ? " · Buletin langsung diterbitkan." : ""}
                  </p>
                </div>
              </fieldset>
              <button disabled={busy || uploading || !editing.image} className={`${button} mt-7`}>
                {busy ? "Menyimpan…" : uploading ? "Memuat gambar…" : "Simpan posting"}
              </button>
            </form>
          ) : (
            <section className="rounded-2xl border border-ink/10 bg-paper p-5">
              <div className="mb-5 flex flex-wrap gap-3">
                <input
                  aria-label="Cari posting"
                  placeholder="Cari judul atau kategori…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className={`${field} mt-0 min-w-48 flex-1`}
                />
                <select
                  aria-label="Filter posting"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm"
                >
                  <option value="all">Semua posting</option>
                  <option value="news">Berita</option>
                  <option value="bulletin">Buletin</option>
                  <option value="published">Terbit</option>
                  <option value="draft">Draf</option>
                </select>
              </div>
              <div className="space-y-3">
                {visible.map((item) => (
                  <article
                    key={item.slug}
                    className="flex flex-wrap items-center gap-4 rounded-xl border border-ink/10 p-4"
                  >
                    <img
                      src={item.image}
                      alt=""
                      className="h-20 w-28 rounded-lg bg-canvas object-contain"
                    />
                    <div className="min-w-44 flex-1">
                      <p className="text-xs text-umber">
                        {item.type === "bulletin" ? "Buletin" : "Berita"}{" "}
                        {item.pinned ? "· Dipin" : ""} ·{" "}
                        {item.status === "published" ? "Terbit" : "Draf"}
                      </p>
                      <h2 className="mt-2 font-medium">{item.title}</h2>
                      <p className="mt-1 text-xs text-ink-soft">
                        {displayPublishDate(item.date)} · {item.publisher || "Admin sekolah"}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {(item.type || "news") === "news" && (
                        <button
                          type="button"
                          disabled={busy || item.status !== "published"}
                          aria-label={`${item.pinned ? "Lepas pin" : "Pin"} ${item.title}`}
                          aria-pressed={!!item.pinned}
                          title={
                            item.status === "published"
                              ? "Tampilkan berita di carousel beranda"
                              : "Terbitkan berita sebelum mengepin"
                          }
                          onClick={() => void togglePin(item)}
                          className={`rounded-lg border p-3 disabled:opacity-30 ${item.pinned ? "border-umber bg-umber text-white" : "border-ink/15"}`}
                        >
                          {item.pinned ? <PinOff size={15} /> : <Pin size={15} />}
                        </button>
                      )}

                      {item.status === "published" && (
                        <Link
                          to="/berita/$slug"
                          params={{ slug: item.slug }}
                          aria-label={`Lihat ${item.title}`}
                          className="rounded-lg border border-ink/15 p-3"
                        >
                          <ExternalLink size={15} />
                        </Link>
                      )}
                      <button
                        disabled={busy}
                        onClick={() => open(item)}
                        aria-label={`Edit ${item.title}`}
                        className="rounded-lg border border-ink/15 p-3"
                      >
                        <Pencil size={15} />
                      </button>
                      <button
                        disabled={busy}
                        onClick={() => void remove(item)}
                        aria-label={`Hapus ${item.title}`}
                        className="rounded-lg border border-ink/15 p-3 text-red-700"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </article>
                ))}
                {!visible.length && (
                  <p className="py-10 text-center text-sm text-ink-soft">
                    Tidak ada posting yang sesuai.
                  </p>
                )}
              </div>
            </section>
          )}
        </div>
        <div hidden={section !== "activities"}>
          <AdminActivities />
        </div>
        <div hidden={section !== "spmb"}>
          <AdminSchoolSettings section="spmb" />
        </div>
        <div hidden={section !== "profile"}>
          <AdminSchoolSettings section="profile" />
        </div>
        <div hidden={section !== "media"}>
          <AdminMedia />
        </div>
      </main>
    </div>
  );
}
