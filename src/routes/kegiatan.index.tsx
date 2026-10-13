import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowUpRight, BookOpen, CalendarDays, Expand, Search } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { ActivityPhoto } from "@/components/activity-photo";
import { ScheduleCarousel } from "@/components/schedule-carousel";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useActivities, type ActivityPhoto as Photo } from "@/lib/activities";
export const Route = createFileRoute("/kegiatan/")({
  head: () => ({
    meta: [
      { title: "Kegiatan — SMP Islam Al-Mujahidin Pamulang" },
      {
        name: "description",
        content:
          "Jadwal sekolah, kegiatan belajar, serta program ekstrakurikuler SMP Islam Al-Mujahidin Pamulang.",
      },
    ],
  }),
  component: ActivitiesPage,
});
function ActivitiesPage() {
  const { data, isPending, isError, refetch } = useActivities();
  const [selected, setSelected] = useState<Photo | null>(null);
  const [category, setCategory] = useState("Semua");
  const [search, setSearch] = useState("");
  const categories = [
    "Semua",
    ...new Set(data?.clubs.map((c) => c.category).filter(Boolean) ?? []),
  ];
  const clubs =
    data?.clubs.filter(
      (c) =>
        (category === "Semua" || c.category === category) &&
        `${c.name} ${c.description}`.toLowerCase().includes(search.toLowerCase()),
    ) ?? [];
  return (
    <div className="bg-canvas font-body text-ink">
      <SiteHeader />
      <main>
        <section className="mx-auto max-w-6xl px-6 pt-12 pb-10 lg:px-8 lg:pt-16">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-[.22em] text-umber">Kehidupan di sekolah</p>
              <h1 className="mt-4 font-display text-4xl leading-tight tracking-tight lg:text-6xl">
                Setiap hari, ruang
                <br />
                untuk bertumbuh.
              </h1>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-ink-soft">
              Dari pembiasaan ibadah dan pembelajaran di kelas, hingga menemukan minat dan bakat
              bersama teman.
            </p>
          </div>
          <nav aria-label="Bagian halaman kegiatan" className="mt-8 flex flex-wrap gap-3 text-sm">
            {[
              ["#jadwal", "Jadwal sekolah"],
              ["#intrakurikuler", "Intrakurikuler"],
              ["#ekstrakurikuler", "Ekstrakurikuler"],
            ].map(([url, title]) => (
              <a
                key={url}
                href={url}
                className="rounded-full border border-ink/15 px-4 py-2 transition-colors hover:bg-paper"
              >
                {title} ↗
              </a>
            ))}
          </nav>
        </section>
        {isPending && (
          <p role="status" className="mx-auto max-w-6xl px-6 py-16">
            Memuat kegiatan sekolah…
          </p>
        )}
        {isError && (
          <div role="alert" className="mx-auto max-w-6xl px-6 py-16">
            <p>Kegiatan belum dapat dimuat.</p>
            <button
              onClick={() => void refetch()}
              className="mt-3 rounded-xl bg-umber px-4 py-2 text-white"
            >
              Coba lagi
            </button>
          </div>
        )}
        {data && (
          <>
            <section id="jadwal" className="mx-auto max-w-6xl scroll-mt-32 px-6 pb-16 lg:px-8">
              <div className="mb-5 flex items-center gap-2 text-sm text-ink-soft">
                <CalendarDays size={18} />
                <h2>Jadwal umum sekolah</h2>
              </div>
              <div className="grid gap-5 lg:grid-cols-[.9fr_1.1fr]">
                <ScheduleCarousel items={data.schedule} />
                <button
                  onClick={() => setSelected(data.poster)}
                  className="group flex flex-col overflow-hidden rounded-3xl border border-ink/10 bg-paper text-left"
                >
                  <div className="flex flex-1 items-center p-3 lg:p-5">
                    <img
                      src={data.poster.src}
                      alt={data.poster.alt}
                      className="w-full rounded-2xl object-contain"
                    />
                  </div>
                  <div className="flex items-center justify-between border-t border-ink/10 px-6 py-5">
                    <div>
                      <p className="text-sm font-medium">Sehari bersama Al-Mujahidin</p>
                      <p className="mt-1 text-xs text-ink-soft">Lihat poster jadwal sekolah</p>
                    </div>
                    <Expand size={18} className="text-umber" />
                  </div>
                </button>
              </div>
              <div
                className="mt-5 flex gap-3 overflow-x-auto pb-3"
                aria-label="Urutan jadwal lengkap"
              >
                {data.schedule.map((row) => (
                  <div
                    key={row.id}
                    className="min-w-40 flex-1 rounded-2xl border border-ink/10 bg-paper/50 p-4"
                  >
                    <p className="font-display text-xl text-umber">{row.time.replace(":", ".")}</p>
                    <p className="mt-2 text-xs leading-relaxed">{row.title}</p>
                  </div>
                ))}
              </div>
              <p className="mt-2 text-xs text-ink-soft">
                Jadwal umum dapat menyesuaikan agenda sekolah. Geser untuk melihat seluruh rangkaian
                kegiatan.
              </p>
            </section>
            <section
              id="intrakurikuler"
              className="scroll-mt-28 border-y border-ink/10 bg-paper/60"
            >
              <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
                <div className="mb-9 flex flex-wrap items-end justify-between gap-5">
                  <div>
                    <p className="text-xs uppercase tracking-[.2em] text-umber">
                      01 / Intrakurikuler
                    </p>
                    <h2 className="mt-3 font-display text-3xl lg:text-4xl">Belajar yang hidup.</h2>
                  </div>
                  <p className="max-w-md text-sm leading-relaxed text-ink-soft">
                    Bukan hanya mendengarkan. Siswa juga berdiskusi, berkolaborasi, berlatih, dan
                    membagikan hasil belajar mereka.
                  </p>
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                  {data.learning.map((row, i) => (
                    <article
                      key={row.id}
                      className="overflow-hidden rounded-2xl border border-ink/10 bg-canvas"
                    >
                      <button
                        onClick={() => setSelected(row.photo)}
                        aria-label={`Perbesar foto ${row.title}`}
                        className="group relative block w-full overflow-hidden bg-paper"
                      >
                        <ActivityPhoto
                          photo={row.photo}
                          className={row.photo.crop ? "w-full" : "aspect-[16/9]"}
                        />
                        <span className="absolute right-4 bottom-4 rounded-full bg-canvas/90 p-2">
                          <Expand size={16} />
                        </span>
                      </button>
                      <div className="p-6">
                        <p className="flex items-center gap-2 text-xs uppercase tracking-widest text-umber">
                          <BookOpen size={14} />
                          Kegiatan belajar {String(i + 1).padStart(2, "0")}
                        </p>
                        <h3 className="mt-3 font-display text-2xl">{row.title}</h3>
                        <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                          {row.description}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
                {!data.learning.length && (
                  <p className="py-8 text-ink-soft">
                    Dokumentasi kegiatan belajar akan segera ditambahkan.
                  </p>
                )}
              </div>
            </section>
            <section
              id="ekstrakurikuler"
              className="mx-auto max-w-6xl scroll-mt-28 px-6 py-16 lg:px-8"
            >
              <div className="flex flex-wrap items-end justify-between gap-6">
                <div>
                  <p className="text-xs uppercase tracking-[.2em] text-umber">
                    02 / Ekstrakurikuler
                  </p>
                  <h2 className="mt-3 font-display text-3xl lg:text-4xl">Temukan ruangmu.</h2>
                </div>
                <p className="max-w-md text-sm leading-relaxed text-ink-soft">
                  Jelajahi program seni, olahraga, sains, bahasa, dan kepemimpinan. Pilih program
                  untuk melihat kegiatan, jadwal, pembina, serta dokumentasinya.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2" aria-label="Filter kategori ekskul">
                  {categories.map((c) => (
                    <button
                      key={c}
                      onClick={() => setCategory(c)}
                      aria-pressed={category === c}
                      className={`rounded-full px-4 py-2 text-xs transition-colors ${category === c ? "bg-umber text-white" : "border border-ink/15 hover:bg-paper"}`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
                <label className="flex items-center gap-2 rounded-full border border-ink/15 bg-paper/50 px-4 py-2">
                  <Search size={16} />
                  <input
                    aria-label="Cari ekstrakurikuler"
                    placeholder="Cari ekskul…"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-36 bg-transparent text-sm outline-none"
                  />
                </label>
              </div>
              <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {clubs.map((club) => (
                  <Link
                    key={club.id}
                    to="/kegiatan/$slug"
                    params={{ slug: club.id }}
                    className="group overflow-hidden rounded-2xl border border-ink/10 bg-paper/60 transition-all hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div
                      className={`relative flex aspect-[4/3] items-center justify-center overflow-hidden ${club.cover.crop ? "bg-white" : "bg-paper"}`}
                    >
                      <ActivityPhoto
                        photo={club.cover}
                        className={
                          club.cover.crop
                            ? "w-36 transition-transform duration-300 group-hover:scale-105"
                            : "transition-transform duration-300 group-hover:scale-105"
                        }
                      />
                      <span className="absolute top-4 left-4 rounded-full border border-ink/10 bg-canvas/95 px-3 py-1 text-xs">
                        {club.category}
                      </span>
                    </div>
                    <div className="p-6">
                      <h3 className="font-display text-2xl">{club.name}</h3>
                      <p className="mt-3 line-clamp-2 min-h-10 text-sm leading-relaxed text-ink-soft">
                        {club.description}
                      </p>
                      <div className="mt-5 flex items-center justify-between border-t border-ink/10 pt-4 text-xs font-medium text-umber">
                        <span>Kenali program</span>
                        <ArrowUpRight size={18} />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              {!clubs.length && (
                <p className="py-12 text-center text-ink-soft">
                  Tidak ada ekstrakurikuler yang sesuai.
                </p>
              )}
            </section>
          </>
        )}
      </main>
      <SiteFooter />
      <Dialog
        open={!!selected}
        onOpenChange={(open) => {
          if (!open) setSelected(null);
        }}
      >
        <DialogContent className="max-h-[90vh] max-w-5xl overflow-y-auto rounded-2xl bg-canvas p-6">
          <DialogTitle className="pr-8 font-display text-xl">{selected?.alt}</DialogTitle>
          <DialogDescription>Dokumentasi kegiatan sekolah.</DialogDescription>
          {selected && (
            <ActivityPhoto
              photo={selected}
              className={selected.crop ? "mx-auto w-full" : "max-h-[70vh] object-contain"}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
