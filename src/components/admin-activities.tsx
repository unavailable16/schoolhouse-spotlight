import { useState, type FormEvent } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  Save,
  CalendarDays,
  BookOpen,
  Users,
  ExternalLink,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { ActivityPhoto } from "./activity-photo";
import {
  useActivities,
  type ActivitiesData,
  type ActivityPhoto as Photo,
  type SchoolClub,
} from "@/lib/activities";
import { request } from "@/lib/news-api";
const inputClass =
  "mt-2 w-full rounded-xl border border-ink/15 bg-white px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-umber/30";
const smallButton =
  "inline-flex items-center gap-2 rounded-xl border border-ink/15 bg-canvas px-3 py-2 text-xs disabled:opacity-50";
const makeId = (prefix: string) => `${prefix}-${crypto.randomUUID()}`;
function TextField({
  label,
  value,
  onChange,
  multiline = false,
  required = false,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
  required?: boolean;
  type?: string;
}) {
  return (
    <label className="block text-sm">
      {label}
      {multiline ? (
        <textarea
          rows={3}
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={inputClass}
        />
      ) : (
        <input
          type={type}
          required={required}
          maxLength={type === "text" ? 200 : undefined}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={inputClass}
        />
      )}
    </label>
  );
}
function PhotoField({
  label,
  photo,
  onChange,
  onBusy,
}: {
  label: string;
  photo: Photo;
  onChange: (photo: Photo) => void;
  onBusy: (delta: number) => void;
}) {
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  async function upload(file?: File) {
    if (!file) return;
    setError("");
    if (!["image/png", "image/jpeg", "image/webp"].includes(file.type) || file.size > 1024 * 1024) {
      setError("Pilih gambar JPG, PNG, atau WebP maksimal 1 MB.");
      return;
    }
    setBusy(true);
    onBusy(1);
    try {
      const src = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result));
        reader.onerror = () => reject(Error("Foto gagal dibaca."));
        reader.readAsDataURL(file);
      });
      await new Promise<void>((resolve, reject) => {
        const image = new Image();
        image.onload = () => resolve();
        image.onerror = () => reject(Error("File gambar tidak valid."));
        image.src = src;
      });
      onChange({ src, alt: photo.alt || label });
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
      onBusy(-1);
    }
  }
  return (
    <div className="rounded-xl border border-ink/10 bg-canvas/50 p-4">
      <label className="block text-sm">
        {label}
        <input
          type="file"
          accept="image/png,image/jpeg,image/webp"
          disabled={busy}
          onChange={(e) => void upload(e.target.files?.[0])}
          className={`${inputClass} cursor-pointer`}
        />
      </label>
      <p className="mt-2 text-xs text-ink-soft">JPG, PNG, WebP · maksimal 1 MB per foto.</p>
      {busy && (
        <p role="status" className="mt-2 text-xs">
          Memuat foto…
        </p>
      )}
      {error && (
        <p role="alert" className="mt-2 text-xs text-red-700">
          {error}
        </p>
      )}
      {photo.src && (
        <div className="mt-4 flex h-36 items-center justify-center overflow-hidden rounded-lg bg-white">
          <ActivityPhoto
            photo={photo}
            className={photo.crop ? "h-full w-auto" : "object-contain"}
          />
        </div>
      )}
      <div className="mt-3">
        <TextField
          label="Keterangan foto"
          value={photo.alt}
          onChange={(alt) => onChange({ ...photo, alt })}
        />
      </div>
    </div>
  );
}
export function AdminActivities() {
  const { data, isPending, isError, refetch } = useActivities();
  if (isPending)
    return (
      <p role="status" className="py-12">
        Memuat pengaturan kegiatan…
      </p>
    );
  if (isError || !data)
    return (
      <div role="alert" className="py-12">
        <p>Kegiatan gagal dimuat.</p>
        <button onClick={() => void refetch()} className={`${smallButton} mt-4`}>
          Coba lagi
        </button>
      </div>
    );
  return <ActivitiesEditor initial={data} />;
}
function ActivitiesEditor({ initial }: { initial: ActivitiesData }) {
  const queryClient = useQueryClient();
  const [draft, setDraft] = useState<ActivitiesData>(() => structuredClone(initial));
  const [baseline, setBaseline] = useState(() => JSON.stringify(initial));
  const [tab, setTab] = useState("schedule");
  const [selected, setSelected] = useState(initial.clubs[0]?.id ?? "");
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState(0);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const dirty = JSON.stringify(draft) !== baseline;
  const onBusy = (delta: number) => setUploading((n) => n + delta);
  function updateClub(id: string, patch: Partial<SchoolClub>) {
    setDraft((current) => ({
      ...current,
      clubs: current.clubs.map((club) => (club.id === id ? { ...club, ...patch } : club)),
    }));
    setNotice("");
  }
  function move(index: number, direction: number) {
    const rows = [...draft.schedule];
    const target = index + direction;
    if (target < 0 || target >= rows.length) return;
    const current = rows[index];
    const next = rows[target];
    if (!current || !next) return;
    rows[index] = next;
    rows[target] = current;
    setDraft({ ...draft, schedule: rows });
  }
  async function save(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");
    setNotice("");
    try {
      const body = JSON.stringify(draft);
      if (new Blob([body]).size > 32_000_000)
        throw Error("Total foto terlalu besar. Kurangi jumlah atau ukuran foto sebelum menyimpan.");
      const result = await request<ActivitiesData>("/api/activities", { method: "PUT", body });
      setDraft(result);
      setBaseline(JSON.stringify(result));
      await queryClient.invalidateQueries({ queryKey: ["school-activities"] });
      setNotice("Kegiatan berhasil disimpan dan tampil di website.");
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  const club = draft.clubs.find((row) => row.id === selected);
  return (
    <form onSubmit={save} className="mt-6">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[.2em] text-umber">Konten sekolah</p>
          <h1 className="mt-3 font-display text-3xl">Kelola kegiatan</h1>
          <p className="mt-3 text-sm text-ink-soft">
            Ubah jadwal, kegiatan belajar, serta program dan dokumentasi ekstrakurikuler.
          </p>
        </div>
        <Link to="/kegiatan" className={`${smallButton} py-3`}>
          <ExternalLink size={16} />
          Lihat halaman kegiatan
        </Link>
      </div>
      <div
        className="mb-5 flex flex-wrap gap-2"
        role="group"
        aria-label="Bagian pengaturan kegiatan"
      >
        {[
          { id: "schedule", title: "Jadwal sekolah", Icon: CalendarDays },
          { id: "learning", title: "Intrakurikuler", Icon: BookOpen },
          { id: "clubs", title: "Ekstrakurikuler", Icon: Users },
        ].map(({ id, title, Icon }) => (
          <button
            type="button"
            key={id}
            onClick={() => setTab(id)}
            aria-pressed={tab === id}
            className={`flex items-center gap-2 rounded-xl px-4 py-3 text-sm ${tab === id ? "bg-umber text-white" : "border border-ink/15 bg-paper"}`}
          >
            <Icon size={16} />
            {title}
          </button>
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
      <fieldset
        disabled={busy || uploading > 0}
        className="min-w-0 rounded-2xl border border-ink/10 bg-paper p-5 disabled:opacity-75 lg:p-7"
      >
        {tab === "schedule" && (
          <>
            <div className="grid gap-7 lg:grid-cols-[.8fr_1.2fr]">
              <div>
                <h2 className="mb-4 font-display text-2xl">Poster jadwal</h2>
                <PhotoField
                  label="Gambar jadwal sekolah"
                  photo={draft.poster}
                  onChange={(poster) => setDraft({ ...draft, poster })}
                  onBusy={onBusy}
                />
                <p className="mt-4 text-xs leading-relaxed text-ink-soft">
                  Poster dan carousel adalah dua konten terpisah. Jika jam berubah, unggah poster
                  baru agar keduanya sesuai.
                </p>
              </div>
              <div>
                <div className="mb-4 flex items-center justify-between gap-3">
                  <h2 className="font-display text-2xl">Urutan carousel</h2>
                  <button
                    type="button"
                    disabled={draft.schedule.length >= 30}
                    className={smallButton}
                    onClick={() =>
                      setDraft({
                        ...draft,
                        schedule: [
                          ...draft.schedule,
                          {
                            id: makeId("jadwal"),
                            time: "07:00",
                            title: "Kegiatan baru",
                            description: "",
                          },
                        ],
                      })
                    }
                  >
                    <Plus size={15} />
                    Tambah jadwal
                  </button>
                </div>
                <div className="space-y-4">
                  {draft.schedule.map((row, i) => (
                    <div key={row.id} className="rounded-xl border border-ink/10 bg-canvas p-4">
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-xs font-medium text-umber">Jadwal {i + 1}</p>
                        <div className="flex gap-1">
                          <button
                            type="button"
                            aria-label={`Naikkan jadwal ${i + 1}`}
                            disabled={i === 0}
                            onClick={() => move(i, -1)}
                            className="p-2 disabled:opacity-30"
                          >
                            <ArrowUp size={15} />
                          </button>
                          <button
                            type="button"
                            aria-label={`Turunkan jadwal ${i + 1}`}
                            disabled={i === draft.schedule.length - 1}
                            onClick={() => move(i, 1)}
                            className="p-2 disabled:opacity-30"
                          >
                            <ArrowDown size={15} />
                          </button>
                          <button
                            type="button"
                            aria-label={`Hapus jadwal ${i + 1}`}
                            onClick={() => {
                              if (window.confirm(`Hapus jadwal ${row.title}?`))
                                setDraft({
                                  ...draft,
                                  schedule: draft.schedule.filter((x) => x.id !== row.id),
                                });
                            }}
                            className="p-2 text-red-700"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>
                      <div className="mt-2 grid gap-3 sm:grid-cols-[.4fr_1fr]">
                        <TextField
                          label="Jam"
                          type="time"
                          required
                          value={row.time}
                          onChange={(time) =>
                            setDraft({
                              ...draft,
                              schedule: draft.schedule.map((x) =>
                                x.id === row.id ? { ...x, time } : x,
                              ),
                            })
                          }
                        />
                        <TextField
                          label="Judul jadwal"
                          required
                          value={row.title}
                          onChange={(title) =>
                            setDraft({
                              ...draft,
                              schedule: draft.schedule.map((x) =>
                                x.id === row.id ? { ...x, title } : x,
                              ),
                            })
                          }
                        />
                      </div>
                      <div className="mt-3">
                        <TextField
                          label="Keterangan"
                          multiline
                          value={row.description}
                          onChange={(description) =>
                            setDraft({
                              ...draft,
                              schedule: draft.schedule.map((x) =>
                                x.id === row.id ? { ...x, description } : x,
                              ),
                            })
                          }
                        />
                      </div>
                    </div>
                  ))}
                </div>
                {!draft.schedule.length && (
                  <p className="py-8 text-sm text-ink-soft">Belum ada jadwal.</p>
                )}
              </div>
            </div>
          </>
        )}
        {tab === "learning" && (
          <>
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-display text-2xl">Galeri kegiatan belajar</h2>
              <button
                type="button"
                disabled={draft.learning.length >= 20}
                className={smallButton}
                onClick={() =>
                  setDraft({
                    ...draft,
                    learning: [
                      ...draft.learning,
                      {
                        id: makeId("belajar"),
                        title: "Kegiatan belajar baru",
                        description: "",
                        photo: { src: "", alt: "" },
                      },
                    ],
                  })
                }
              >
                <Plus size={15} />
                Tambah kegiatan
              </button>
            </div>
            <div className="grid gap-6 lg:grid-cols-2">
              {draft.learning.map((row) => (
                <article
                  key={row.id}
                  className="space-y-4 rounded-xl border border-ink/10 bg-canvas p-5"
                >
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => {
                        if (window.confirm(`Hapus ${row.title}?`))
                          setDraft({
                            ...draft,
                            learning: draft.learning.filter((x) => x.id !== row.id),
                          });
                      }}
                      className={`${smallButton} text-red-700`}
                    >
                      <Trash2 size={14} />
                      Hapus
                    </button>
                  </div>
                  <TextField
                    label="Judul kegiatan"
                    required
                    value={row.title}
                    onChange={(title) =>
                      setDraft({
                        ...draft,
                        learning: draft.learning.map((x) =>
                          x.id === row.id ? { ...x, title } : x,
                        ),
                      })
                    }
                  />
                  <TextField
                    label="Deskripsi"
                    multiline
                    value={row.description}
                    onChange={(description) =>
                      setDraft({
                        ...draft,
                        learning: draft.learning.map((x) =>
                          x.id === row.id ? { ...x, description } : x,
                        ),
                      })
                    }
                  />
                  <PhotoField
                    label="Foto kegiatan belajar"
                    photo={row.photo}
                    onChange={(photo) =>
                      setDraft({
                        ...draft,
                        learning: draft.learning.map((x) =>
                          x.id === row.id ? { ...x, photo } : x,
                        ),
                      })
                    }
                    onBusy={onBusy}
                  />
                </article>
              ))}
            </div>
            {!draft.learning.length && (
              <p className="py-8 text-sm text-ink-soft">Belum ada kegiatan belajar.</p>
            )}
          </>
        )}
        {tab === "clubs" && (
          <>
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-display text-2xl">Program ekstrakurikuler</h2>
              <button
                type="button"
                disabled={draft.clubs.length >= 30}
                className={smallButton}
                onClick={() => {
                  const id = makeId("ekskul");
                  setDraft({
                    ...draft,
                    clubs: [
                      ...draft.clubs,
                      {
                        id,
                        name: "Ekskul baru",
                        category: "Lainnya",
                        description: "",
                        activities: [],
                        day: "",
                        time: "",
                        location: "",
                        supervisor: "",
                        cover: { src: "", alt: "" },
                        photos: [],
                      },
                    ],
                  });
                  setSelected(id);
                }}
              >
                <Plus size={15} />
                Tambah ekskul
              </button>
            </div>
            <label className="block text-sm">
              Pilih program
              <select
                value={selected}
                onChange={(e) => setSelected(e.target.value)}
                className={`${inputClass} mb-6`}
              >
                {!draft.clubs.length && <option value="">Belum ada ekskul</option>}
                {draft.clubs.map((row) => (
                  <option key={row.id} value={row.id}>
                    {row.name}
                  </option>
                ))}
              </select>
            </label>
            {club && (
              <>
                <div className="mb-5 flex justify-end">
                  <button
                    type="button"
                    className={`${smallButton} text-red-700`}
                    onClick={() => {
                      if (
                        window.confirm(`Hapus program ${club.name} dan seluruh dokumentasinya?`)
                      ) {
                        const clubs = draft.clubs.filter((x) => x.id !== club.id);
                        setDraft({ ...draft, clubs });
                        setSelected(clubs[0]?.id ?? "");
                      }
                    }}
                  >
                    <Trash2 size={15} />
                    Hapus program
                  </button>
                </div>
                <div className="grid gap-6 lg:grid-cols-2">
                  <div className="space-y-4">
                    <TextField
                      label="Nama program"
                      required
                      value={club.name}
                      onChange={(name) => updateClub(club.id, { name })}
                    />
                    <TextField
                      label="Kategori"
                      value={club.category}
                      onChange={(category) => updateClub(club.id, { category })}
                    />
                    <TextField
                      label="Deskripsi program"
                      multiline
                      value={club.description}
                      onChange={(description) => updateClub(club.id, { description })}
                    />
                    <TextField
                      label="Daftar kegiatan (satu per baris)"
                      multiline
                      value={club.activities.join("\n")}
                      onChange={(value) => updateClub(club.id, { activities: value.split("\n") })}
                    />
                  </div>
                  <div className="space-y-4">
                    <TextField
                      label="Hari latihan"
                      value={club.day}
                      onChange={(day) => updateClub(club.id, { day })}
                    />
                    <TextField
                      label="Waktu latihan (contoh: 16.00–17.00)"
                      value={club.time}
                      onChange={(time) => updateClub(club.id, { time })}
                    />
                    <TextField
                      label="Tempat latihan"
                      value={club.location}
                      onChange={(location) => updateClub(club.id, { location })}
                    />
                    <TextField
                      label="Penanggung jawab / pembina"
                      value={club.supervisor}
                      onChange={(supervisor) => updateClub(club.id, { supervisor })}
                    />
                    <p className="text-xs text-ink-soft">
                      Kolom yang belum diketahui boleh dikosongkan. Website akan menampilkan “Belum
                      diinformasikan”.
                    </p>
                  </div>
                </div>
                <div className="mt-6 max-w-xl">
                  <PhotoField
                    label="Sampul program (foto kegiatan atau logo)"
                    photo={club.cover}
                    onChange={(cover) => updateClub(club.id, { cover })}
                    onBusy={onBusy}
                  />
                </div>
                <div className="mt-8 border-t border-ink/10 pt-6">
                  <h3 className="font-display text-xl">Foto-foto {club.name}</h3>
                  <p className="mt-2 text-xs text-ink-soft">
                    Maksimal 8 foto. Tambahkan keterangan untuk setiap foto.
                  </p>
                  <div className="mt-5 grid gap-5 lg:grid-cols-2">
                    {club.photos.map((photo, i) => (
                      <div key={i}>
                        <PhotoField
                          label={`Foto dokumentasi ${i + 1}`}
                          photo={photo}
                          onChange={(next) =>
                            updateClub(club.id, {
                              photos: club.photos.map((x, j) => (j === i ? next : x)),
                            })
                          }
                          onBusy={onBusy}
                        />
                        <button
                          type="button"
                          className={`${smallButton} mt-2 text-red-700`}
                          onClick={() =>
                            updateClub(club.id, { photos: club.photos.filter((_, j) => j !== i) })
                          }
                        >
                          <Trash2 size={14} />
                          Hapus foto {i + 1}
                        </button>
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    disabled={club.photos.length >= 8}
                    className={`${smallButton} mt-5`}
                    onClick={() =>
                      updateClub(club.id, { photos: [...club.photos, { src: "", alt: "" }] })
                    }
                  >
                    <Plus size={15} />
                    Tambah foto galeri
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </fieldset>
      <div className="sticky bottom-0 z-10 mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-ink/10 bg-canvas/95 p-4 shadow-sm backdrop-blur">
        <p className="text-xs text-ink-soft">
          {dirty ? "Ada perubahan yang belum disimpan." : "Semua perubahan sudah tersimpan."}
        </p>
        <button
          disabled={busy || uploading > 0 || !dirty}
          className="flex items-center gap-2 rounded-xl bg-umber px-5 py-3 text-sm font-medium text-white disabled:opacity-50"
        >
          <Save size={16} />
          {busy ? "Menyimpan…" : uploading > 0 ? "Memuat foto…" : "Simpan kegiatan"}
        </button>
      </div>
    </form>
  );
}
