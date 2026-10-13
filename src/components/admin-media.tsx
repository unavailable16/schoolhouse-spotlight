import { useState, useRef, type SetStateAction, type FormEvent } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Plus, Trash2, Save } from "lucide-react";
import { useSiteMedia, type SiteMedia } from "@/lib/site-media";
import { request } from "@/lib/news-api";
export function AdminMedia({ onlySpmb = false }: { onlySpmb?: boolean }) {
  const { data, isPending, isError } = useSiteMedia();
  if (isPending) return <p className="py-10">Memuat media…</p>;
  if (isError || !data)
    return <p role="alert">Media belum dapat dimuat. Silakan muat ulang halaman.</p>;
  return <MediaEditor initial={data} onlySpmb={onlySpmb} />;
}
function MediaEditor({ initial, onlySpmb }: { initial: SiteMedia; onlySpmb: boolean }) {
  const [draft, setDraft] = useState(() => structuredClone(initial));
  const changed = useRef(new Set<keyof SiteMedia>());
  function changeDraft(value: SetStateAction<SiteMedia>) {
    changed.current.add(group);
    setDraft(value);
  }
  const [group, setGroup] = useState<keyof SiteMedia>(onlySpmb ? "spmb" : "programs");
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const queryClient = useQueryClient();
  async function upload(id: string, file?: File) {
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
        const photo = new Image();
        photo.onload = () => resolve();
        photo.onerror = () => reject(Error("File gambar tidak valid."));
        photo.src = image;
      });
      changeDraft((current) => ({
        ...current,
        [group]: current[group].map((row) => (row.id === id ? { ...row, image } : row)),
      }));
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setUploading(false);
    }
  }
  async function save(event: FormEvent) {
    event.preventDefault();
    setError("");
    setNotice("");
    setBusy(true);
    try {
      const latest = await request<SiteMedia>("/api/site-media");
      const merged = { ...latest };
      for (const key of changed.current) merged[key] = draft[key];
      const body = JSON.stringify(merged);
      if (new Blob([body]).size > 32_000_000)
        throw Error("Total ukuran gambar terlalu besar. Kurangi atau kompres foto.");
      const saved = await request<SiteMedia>("/api/site-media", { method: "PUT", body });
      setDraft(saved);
      changed.current.clear();
      await queryClient.invalidateQueries({ queryKey: ["site-media"] });
      setNotice("Media sekolah berhasil disimpan.");
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <form onSubmit={save} className="space-y-6">
      <div>
        <h2 className="font-display text-3xl">{onlySpmb ? "Pamflet SPMB" : "Media sekolah"}</h2>
        <p className="mt-3 text-sm text-ink-soft">
          {onlySpmb
            ? "Unggah dan kelola pamflet pendaftaran SPMB."
            : "Unggah foto untuk program unggulan serta fasilitas sekolah."}
        </p>
      </div>
      {!onlySpmb && (
        <div className="flex flex-wrap gap-2">
          {[
            ["programs", "Program unggulan"],
            ["facilities", "Sarana & prasarana"],
          ].map(([key, label]) => (
            <button
              type="button"
              key={key}
              disabled={busy || uploading}
              aria-pressed={group === key}
              onClick={() => setGroup(key as keyof SiteMedia)}
              className={`rounded-xl px-4 py-3 text-sm ${group === key ? "bg-umber text-white" : "border border-ink/15 bg-paper"}`}
            >
              {label}
            </button>
          ))}
        </div>
      )}

      {error && (
        <p role="alert" className="rounded-xl bg-red-50 p-4 text-sm text-red-700">
          {error}
        </p>
      )}
      {notice && (
        <p role="status" className="rounded-xl bg-green-50 p-4 text-sm text-green-800">
          {notice}
        </p>
      )}
      <fieldset disabled={busy || uploading} className="space-y-5">
        <div className="grid gap-5 md:grid-cols-2">
          {draft[group].map((row) => (
            <div key={row.id} className="rounded-2xl border border-ink/10 bg-paper p-5">
              <label className="block text-sm">
                Judul gambar
                <input
                  required
                  readOnly={group !== "spmb"}
                  value={row.title}
                  maxLength={200}
                  onChange={(e) =>
                    changeDraft({
                      ...draft,
                      [group]: draft[group].map((x) =>
                        x.id === row.id ? { ...x, title: e.target.value } : x,
                      ),
                    })
                  }
                  className="mt-2 w-full rounded-xl border border-ink/15 bg-white p-3"
                />
              </label>
              {row.image && (
                <img
                  src={row.image}
                  alt={row.title}
                  className="mt-4 h-64 w-full rounded-xl bg-canvas object-contain"
                />
              )}
              <label className="mt-4 block text-sm">
                Unggah gambar
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={(e) => void upload(row.id, e.target.files?.[0])}
                  className="mt-2 block w-full rounded-xl border border-ink/15 bg-white p-3 text-xs"
                />
              </label>
              <p className="mt-2 text-xs text-ink-soft">Maksimal 3 MB per gambar.</p>
              {group === "spmb" && (
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm(`Hapus gambar ${row.title}?`))
                      changeDraft({
                        ...draft,
                        [group]: draft[group].filter((x) => x.id !== row.id),
                      });
                  }}
                  className="mt-4 inline-flex items-center gap-2 text-xs text-red-700"
                >
                  <Trash2 size={15} />
                  Hapus gambar
                </button>
              )}
            </div>
          ))}
        </div>
        {group === "spmb" && (
          <button
            type="button"
            disabled={draft[group].length >= 12}
            onClick={() =>
              changeDraft({
                ...draft,
                [group]: [
                  ...draft[group],
                  { id: "media-" + crypto.randomUUID(), title: "Gambar baru", image: "" },
                ],
              })
            }
            className="inline-flex items-center gap-2 rounded-xl border border-ink/15 px-4 py-3 text-sm"
          >
            <Plus size={16} />
            Tambah gambar
          </button>
        )}
      </fieldset>
      <button
        disabled={busy || uploading}
        className="inline-flex items-center gap-2 rounded-xl bg-umber px-5 py-3 text-sm text-white disabled:opacity-50"
      >
        <Save size={16} />
        {busy ? "Menyimpan…" : uploading ? "Memuat gambar…" : "Simpan media"}
      </button>
    </form>
  );
}
