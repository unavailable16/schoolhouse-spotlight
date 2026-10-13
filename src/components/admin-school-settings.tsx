import { useState, type FormEvent } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Plus, Trash2, Save } from "lucide-react";
import { useSchoolSettings, type SchoolSettings } from "@/lib/school-settings";
import { AdminMedia } from "@/components/admin-media";
import { request } from "@/lib/news-api";
const field = "mt-2 w-full rounded-xl border border-ink/15 bg-white px-3 py-2.5 text-sm";
function Text({
  label,
  value,
  onChange,
  area = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  area?: boolean;
}) {
  return (
    <label className="block text-sm">
      {label}
      {area ? (
        <textarea
          aria-label={label}
          rows={3}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={field}
        />
      ) : (
        <input
          aria-label={label}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={field}
        />
      )}
    </label>
  );
}
function Photo({
  label,
  value,
  onChange,
  onBusy,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  onBusy: (v: boolean) => void;
}) {
  const [error, setError] = useState("");
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
    onBusy(true);
    try {
      const data = await new Promise<string>((resolve, reject) => {
        const r = new FileReader();
        r.onload = () => resolve(String(r.result));
        r.onerror = () => reject(Error("Gambar gagal dibaca."));
        r.readAsDataURL(file);
      });
      const img = new Image();
      img.src = data;
      await img.decode();
      onChange(data);
    } catch {
      setError("Gambar tidak dapat dibaca.");
    } finally {
      onBusy(false);
    }
  }
  return (
    <div className="rounded-xl border border-ink/10 bg-canvas/50 p-4">
      <label className="block text-sm">
        {label}
        <input
          type="file"
          accept="image/png,image/jpeg,image/webp"
          onChange={(e) => void upload(e.target.files?.[0])}
          className={`${field} text-xs`}
        />
      </label>
      {value && (
        <img
          src={value}
          alt={label}
          className="mt-3 h-36 w-full rounded-lg bg-paper object-contain"
        />
      )}
      {error && (
        <p role="alert" className="mt-2 text-xs text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}
export function AdminSchoolSettings({ section }: { section: "spmb" | "profile" }) {
  const { data, isPending, isError } = useSchoolSettings();
  if (isPending) return <p className="py-10">Memuat pengaturan…</p>;
  if (isError || !data)
    return <p role="alert">Pengaturan gagal dimuat. Silakan muat ulang halaman.</p>;
  return (
    <>
      <Editor initial={data} section={section} />
      {section === "spmb" && (
        <section className="mt-12 border-t border-ink/10 pt-10">
          <AdminMedia onlySpmb />
        </section>
      )}
    </>
  );
}
function Editor({ initial, section }: { initial: SchoolSettings; section: "spmb" | "profile" }) {
  const [draft, setDraft] = useState(() => structuredClone(initial));
  const [tab, setTab] = useState<"profile" | "campus">("profile");
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const queryClient = useQueryClient();
  const current = section === "spmb" ? "spmb" : tab;
  async function save(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");
    setNotice("");
    try {
      const body = JSON.stringify(draft[current]);
      if (new Blob([body]).size > 32_000_000)
        throw Error("Total ukuran gambar terlalu besar. Kompres foto atau kurangi gambar.");
      const result = await request<SchoolSettings>("/api/school-settings/" + current, {
        method: "PUT",
        body,
      });
      setDraft((value) => ({ ...value, [current]: result[current] }));
      await queryClient.invalidateQueries({ queryKey: ["school-settings"] });
      setNotice("Pengaturan berhasil disimpan dan tampil di website.");
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  const id = (p: string) => p + "-" + crypto.randomUUID();
  return (
    <form onSubmit={save} className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl">
            {section === "spmb" ? "Pengaturan SPMB" : "Profil Sekolah"}
          </h1>
          <p className="mt-3 text-sm text-ink-soft">
            Perubahan digunakan pada halaman publik dan carousel beranda.
          </p>
        </div>
      </div>
      {section === "profile" && (
        <div className="flex gap-2">
          {(["profile", "campus"] as const).map((key) => (
            <button
              type="button"
              disabled={busy || uploading}
              key={key}
              onClick={() => setTab(key)}
              aria-pressed={tab === key}
              className={`rounded-xl px-5 py-3 text-sm ${tab === key ? "bg-umber text-white" : "border border-ink/15"}`}
            >
              {key === "profile" ? "Profil & statistik" : "Lingkungan sekolah"}
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
      <fieldset
        disabled={busy || uploading}
        className="min-w-0 space-y-7 rounded-2xl border border-ink/10 bg-paper p-5 lg:p-7"
      >
        {current === "spmb" && (
          <>
            <h2 className="font-display text-2xl">Halaman SPMB</h2>
            <div className="grid gap-5 md:grid-cols-2">
              {(
                [
                  ["academicYear", "Tahun ajaran"],
                  ["heading", "Judul halaman"],
                  ["description", "Deskripsi pembuka"],
                  ["contactLabel", "Teks tombol kontak"],
                  ["requirementsNote", "Catatan persyaratan"],
                ] as const
              ).map(([key, label]) => (
                <Text
                  key={key}
                  label={label}
                  value={draft.spmb[key]}
                  area={key === "description" || key === "requirementsNote"}
                  onChange={(v) => setDraft({ ...draft, spmb: { ...draft.spmb, [key]: v } })}
                />
              ))}
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {(
                [
                  ["backgroundImage", "Foto latar"],
                  ["heroImage", "Foto siswa"],
                  ["ornamentImage", "Ornamen bingkai"],
                ] as const
              ).map(([key, label]) => (
                <Photo
                  key={key}
                  label={label}
                  value={draft.spmb[key]}
                  onBusy={setUploading}
                  onChange={(v) => setDraft({ ...draft, spmb: { ...draft.spmb, [key]: v } })}
                />
              ))}
            </div>
            <h2 className="font-display text-2xl">Persyaratan pendaftaran</h2>
            <div className="space-y-3">
              {draft.spmb.requirements.map((row) => (
                <div key={row.id} className="flex items-end gap-3">
                  <div className="flex-1">
                    <Text
                      label="Persyaratan"
                      value={row.text}
                      onChange={(text) =>
                        setDraft({
                          ...draft,
                          spmb: {
                            ...draft.spmb,
                            requirements: draft.spmb.requirements.map((x) =>
                              x.id === row.id ? { ...x, text } : x,
                            ),
                          },
                        })
                      }
                    />
                  </div>
                  <button
                    type="button"
                    aria-label="Hapus persyaratan"
                    onClick={() =>
                      setDraft({
                        ...draft,
                        spmb: {
                          ...draft.spmb,
                          requirements: draft.spmb.requirements.filter((x) => x.id !== row.id),
                        },
                      })
                    }
                    className="p-3 text-red-700"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() =>
                setDraft({
                  ...draft,
                  spmb: {
                    ...draft.spmb,
                    requirements: [...draft.spmb.requirements, { id: id("syarat"), text: "" }],
                  },
                })
              }
              className="inline-flex items-center gap-2 text-sm text-umber"
            >
              <Plus size={16} />
              Tambah persyaratan
            </button>
            <h2 className="font-display text-2xl">Alur pendaftaran</h2>
            {draft.spmb.stages.map((row) => (
              <div
                key={row.id}
                className="grid gap-4 rounded-xl border border-ink/10 bg-canvas p-4 md:grid-cols-3"
              >
                {(
                  [
                    ["title", "Nama tahap"],
                    ["date", "Jadwal / waktu"],
                    ["text", "Keterangan tahap"],
                  ] as const
                ).map(([key, label]) => (
                  <Text
                    key={key}
                    label={label}
                    value={row[key]}
                    area={key === "text"}
                    onChange={(v) =>
                      setDraft({
                        ...draft,
                        spmb: {
                          ...draft.spmb,
                          stages: draft.spmb.stages.map((x) =>
                            x.id === row.id ? { ...x, [key]: v } : x,
                          ),
                        },
                      })
                    }
                  />
                ))}
                <button
                  type="button"
                  onClick={() =>
                    setDraft({
                      ...draft,
                      spmb: {
                        ...draft.spmb,
                        stages: draft.spmb.stages.filter((x) => x.id !== row.id),
                      },
                    })
                  }
                  className="text-left text-xs text-red-700"
                >
                  Hapus tahap
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                setDraft({
                  ...draft,
                  spmb: {
                    ...draft.spmb,
                    stages: [
                      ...draft.spmb.stages,
                      { id: id("alur"), title: "Tahap baru", date: "", text: "" },
                    ],
                  },
                })
              }
              className="inline-flex items-center gap-2 text-sm text-umber"
            >
              <Plus size={16} />
              Tambah tahap
            </button>
          </>
        )}
        {current === "profile" && (
          <>
            <h2 className="font-display text-2xl">Identitas dan arah pendidikan</h2>
            <div className="grid gap-5 md:grid-cols-2">
              {(
                [
                  ["heading", "Judul profil"],
                  ["description", "Deskripsi sekolah"],
                  ["motto", "Motto sekolah"],
                  ["vision", "Visi sekolah"],
                ] as const
              ).map(([key, label]) => (
                <Text
                  key={key}
                  label={label}
                  value={draft.profile[key]}
                  area={key === "description" || key === "vision"}
                  onChange={(v) => setDraft({ ...draft, profile: { ...draft.profile, [key]: v } })}
                />
              ))}
            </div>
            <h2 className="font-display text-2xl">Misi sekolah</h2>
            {draft.profile.missions.map((row) => (
              <div key={row.id} className="grid gap-4 rounded-xl bg-canvas p-4 md:grid-cols-2">
                <Text
                  label="Judul misi"
                  value={row.title}
                  onChange={(title) =>
                    setDraft({
                      ...draft,
                      profile: {
                        ...draft.profile,
                        missions: draft.profile.missions.map((x) =>
                          x.id === row.id ? { ...x, title } : x,
                        ),
                      },
                    })
                  }
                />
                <Text
                  label="Isi misi"
                  value={row.text}
                  area
                  onChange={(text) =>
                    setDraft({
                      ...draft,
                      profile: {
                        ...draft.profile,
                        missions: draft.profile.missions.map((x) =>
                          x.id === row.id ? { ...x, text } : x,
                        ),
                      },
                    })
                  }
                />
                <button
                  type="button"
                  onClick={() =>
                    setDraft({
                      ...draft,
                      profile: {
                        ...draft.profile,
                        missions: draft.profile.missions.filter((x) => x.id !== row.id),
                      },
                    })
                  }
                  className="text-left text-xs text-red-700"
                >
                  Hapus misi
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                setDraft({
                  ...draft,
                  profile: {
                    ...draft.profile,
                    missions: [
                      ...draft.profile.missions,
                      { id: id("misi"), title: "Misi baru", text: "" },
                    ],
                  },
                })
              }
              className="inline-flex items-center gap-2 text-sm text-umber"
            >
              <Plus size={16} />
              Tambah misi
            </button>
            <h2 className="font-display text-2xl">Akreditasi</h2>
            <div className="grid gap-5 md:grid-cols-3">
              <Text
                label="Peringkat akreditasi"
                value={draft.profile.accreditation.grade}
                onChange={(grade) =>
                  setDraft({
                    ...draft,
                    profile: {
                      ...draft.profile,
                      accreditation: { ...draft.profile.accreditation, grade },
                      stats: draft.profile.stats.map((x) =>
                        x.id === "akreditasi" ? { ...x, value: grade } : x,
                      ),
                    },
                  })
                }
              />
              <Text
                label="Deskripsi akreditasi"
                area
                value={draft.profile.accreditation.description}
                onChange={(description) =>
                  setDraft({
                    ...draft,
                    profile: {
                      ...draft.profile,
                      accreditation: { ...draft.profile.accreditation, description },
                    },
                  })
                }
              />
              <Photo
                label="Lencana akreditasi (opsional)"
                value={draft.profile.accreditation.image}
                onBusy={setUploading}
                onChange={(image) =>
                  setDraft({
                    ...draft,
                    profile: {
                      ...draft.profile,
                      accreditation: { ...draft.profile.accreditation, image },
                    },
                  })
                }
              />
            </div>
            <h2 className="font-display text-2xl">Statistik sekolah</h2>
            {draft.profile.stats.map((row) => (
              <div key={row.id} className="flex flex-wrap items-end gap-3">
                <div className="min-w-40 flex-1">
                  <Text
                    label="Nilai statistik"
                    value={row.value}
                    onChange={(value) =>
                      setDraft({
                        ...draft,
                        profile: {
                          ...draft.profile,
                          stats: draft.profile.stats.map((x) =>
                            x.id === row.id ? { ...x, value } : x,
                          ),
                        },
                      })
                    }
                  />
                </div>
                <div className="min-w-40 flex-1">
                  <Text
                    label="Label statistik"
                    value={row.label}
                    onChange={(label) =>
                      setDraft({
                        ...draft,
                        profile: {
                          ...draft.profile,
                          stats: draft.profile.stats.map((x) =>
                            x.id === row.id ? { ...x, label } : x,
                          ),
                        },
                      })
                    }
                  />
                </div>
                <button
                  type="button"
                  aria-label="Hapus statistik"
                  onClick={() =>
                    setDraft({
                      ...draft,
                      profile: {
                        ...draft.profile,
                        stats: draft.profile.stats.filter((x) => x.id !== row.id),
                      },
                    })
                  }
                  className="p-3 text-red-700"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                setDraft({
                  ...draft,
                  profile: {
                    ...draft.profile,
                    stats: [
                      ...draft.profile.stats,
                      { id: id("stat"), value: "0", label: "Statistik baru" },
                    ],
                  },
                })
              }
              className="inline-flex items-center gap-2 text-sm text-umber"
            >
              <Plus size={16} />
              Tambah statistik
            </button>
            <h2 className="font-display text-2xl">Tiga bingkai profil</h2>
            <div className="grid gap-5 md:grid-cols-3">
              {draft.profile.images.map((row, i) => (
                <div key={row.id} className="space-y-4">
                  <Text
                    label={`Keterangan bingkai ${i + 1}`}
                    value={row.title}
                    onChange={(title) =>
                      setDraft({
                        ...draft,
                        profile: {
                          ...draft.profile,
                          images: draft.profile.images.map((x) =>
                            x.id === row.id ? { ...x, title } : x,
                          ),
                        },
                      })
                    }
                  />
                  <Photo
                    label={`Foto bingkai ${i + 1}`}
                    value={row.image}
                    onBusy={setUploading}
                    onChange={(image) =>
                      setDraft({
                        ...draft,
                        profile: {
                          ...draft.profile,
                          images: draft.profile.images.map((x) =>
                            x.id === row.id ? { ...x, image } : x,
                          ),
                        },
                      })
                    }
                  />
                </div>
              ))}
            </div>
          </>
        )}
        {current === "campus" && (
          <>
            <h2 className="font-display text-2xl">Slide lingkungan sekolah</h2>
            {draft.campus.map((row) => (
              <div
                key={row.id}
                className="grid gap-5 rounded-xl border border-ink/10 bg-canvas p-5 md:grid-cols-2"
              >
                <div className="space-y-4">
                  {(
                    [
                      ["label", "Nama ruang"],
                      ["title", "Judul slide"],
                      ["description", "Deskripsi ruang"],
                    ] as const
                  ).map(([key, label]) => (
                    <Text
                      key={key}
                      label={label}
                      value={row[key]}
                      area={key === "description"}
                      onChange={(v) =>
                        setDraft({
                          ...draft,
                          campus: draft.campus.map((x) =>
                            x.id === row.id ? { ...x, [key]: v } : x,
                          ),
                        })
                      }
                    />
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm(`Hapus slide ${row.label}?`))
                        setDraft({ ...draft, campus: draft.campus.filter((x) => x.id !== row.id) });
                    }}
                    className="text-xs text-red-700"
                  >
                    Hapus slide
                  </button>
                </div>
                <Photo
                  label={`Foto ${row.label}`}
                  value={row.image}
                  onBusy={setUploading}
                  onChange={(image) =>
                    setDraft({
                      ...draft,
                      campus: draft.campus.map((x) =>
                        x.id === row.id ? { ...x, image, isIllustration: false } : x,
                      ),
                    })
                  }
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                setDraft({
                  ...draft,
                  campus: [
                    ...draft.campus,
                    {
                      id: id("ruang"),
                      label: "Ruang baru",
                      title: "Ruang baru",
                      description: "",
                      image: "/__l5e/assets-v1/6319534f-782c-4086-b443-a8b0e0115ff8/gedung-sekolah-hd.webp",
                      isIllustration: false,
                    },
                  ],
                })
              }
              className="inline-flex items-center gap-2 text-sm text-umber"
            >
              <Plus size={16} />
              Tambah slide lingkungan
            </button>
          </>
        )}
        {current !== "campus" && (
          <>
            <h2 className="font-display text-2xl">Slide carousel beranda</h2>
            <div className="grid gap-5 md:grid-cols-2">
              {(
                [
                  ["eyebrow", "Label carousel"],
                  ["title", "Judul carousel"],
                  ["description", "Deskripsi carousel"],
                ] as const
              ).map(([key, label]) => (
                <Text
                  key={key}
                  label={label}
                  value={draft[current].carousel[key]}
                  area={key === "description"}
                  onChange={(v) =>
                    setDraft({
                      ...draft,
                      [current]: {
                        ...draft[current],
                        carousel: { ...draft[current].carousel, [key]: v },
                      },
                    })
                  }
                />
              ))}
              <Photo
                label="Gambar carousel"
                value={draft[current].carousel.image}
                onBusy={setUploading}
                onChange={(image) =>
                  setDraft({
                    ...draft,
                    [current]: {
                      ...draft[current],
                      carousel: { ...draft[current].carousel, image },
                    },
                  })
                }
              />
            </div>
          </>
        )}
      </fieldset>
      <div className="sticky bottom-0 z-10 rounded-xl border border-ink/10 bg-canvas/95 p-4 backdrop-blur">
        <button
          disabled={busy || uploading}
          className="inline-flex items-center gap-2 rounded-xl bg-umber px-5 py-3 text-sm text-white disabled:opacity-50"
        >
          <Save size={16} />
          {busy ? "Menyimpan…" : uploading ? "Memuat gambar…" : "Simpan pengaturan"}
        </button>
      </div>
    </form>
  );
}
