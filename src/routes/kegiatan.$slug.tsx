import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  CalendarDays,
  Clock3,
  MapPin,
  UserRound,
  ArrowLeft,
  Images,
  Expand,
  Check,
} from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { ActivityPhoto } from "@/components/activity-photo";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useActivities, type ActivityPhoto as Photo } from "@/lib/activities";
export const Route = createFileRoute("/kegiatan/$slug")({
  head: () => ({ meta: [{ title: "Program Ekstrakurikuler — SMP Islam Al-Mujahidin Pamulang" }] }),
  component: ClubDetail,
});
function ClubDetail() {
  const { slug } = Route.useParams();
  const { data, isPending, isError, refetch } = useActivities();
  const [selected, setSelected] = useState<Photo | null>(null);
  const club = data?.clubs.find((c) => c.id === slug);
  return (
    <div className="bg-canvas font-body text-ink">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-6 py-12 lg:px-8 lg:py-16">
        <Link to="/kegiatan" className="inline-flex items-center gap-2 text-sm text-umber">
          <ArrowLeft size={16} />
          Semua kegiatan
        </Link>
        {isPending ? (
          <p className="py-16" role="status">
            Memuat program…
          </p>
        ) : isError ? (
          <div role="alert" className="py-16">
            <p>Program belum dapat dimuat.</p>
            <button className="mt-4 text-umber underline" onClick={() => void refetch()}>
              Coba lagi
            </button>
          </div>
        ) : !club ? (
          <div className="py-16">
            <h1 className="font-display text-3xl">Program tidak ditemukan</h1>
            <p className="mt-4 text-ink-soft">
              Program mungkin sudah dihapus atau alamatnya berubah.
            </p>
          </div>
        ) : (
          <>
            <div className="mt-9 grid items-center gap-8 lg:grid-cols-[1.2fr_.8fr]">
              <div>
                <p className="text-xs uppercase tracking-[.2em] text-umber">
                  Ekstrakurikuler / {club.category}
                </p>
                <h1 className="mt-4 font-display text-5xl tracking-tight lg:text-6xl">
                  {club.name}
                </h1>
                <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-soft">
                  {club.description}
                </p>
                <a
                  href="#galeri"
                  className="mt-7 inline-flex items-center gap-2 rounded-full border border-ink/20 px-5 py-3 text-sm"
                >
                  <Images size={16} />
                  Lihat dokumentasi
                </a>
              </div>
              <div
                className={`flex aspect-[4/3] items-center justify-center overflow-hidden rounded-3xl border border-ink/10 ${club.cover.crop ? "bg-white" : "bg-paper"}`}
              >
                <ActivityPhoto
                  photo={club.cover}
                  className={club.cover.crop ? "w-52" : ""}
                  loading="eager"
                />
              </div>
            </div>
            <section
              className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
              aria-label="Informasi program"
            >
              {[
                { label: "Hari latihan", value: club.day, Icon: CalendarDays },
                { label: "Waktu", value: club.time, Icon: Clock3 },
                { label: "Tempat", value: club.location, Icon: MapPin },
                { label: "Penanggung jawab", value: club.supervisor, Icon: UserRound },
              ].map(({ label, value, Icon }) => (
                <div key={label} className="rounded-2xl border border-ink/10 bg-paper/60 p-5">
                  <Icon size={20} className="text-umber" />
                  <h2 className="mt-4 text-xs text-ink-soft">{label}</h2>
                  <p className="mt-2 text-sm font-medium">{value || "Belum diinformasikan"}</p>
                </div>
              ))}
            </section>
            <section className="mt-12 grid gap-8 border-t border-ink/10 pt-10 lg:grid-cols-[.8fr_1.2fr]">
              <div>
                <p className="text-xs uppercase tracking-[.2em] text-umber">Mengenal program</p>
                <h2 className="mt-3 font-display text-3xl">Apa saja kegiatannya?</h2>
                <p className="mt-4 text-sm leading-relaxed text-ink-soft">
                  Ruang untuk belajar bersama, mengembangkan keterampilan, dan mencoba hal baru.
                </p>
              </div>
              <ul className="space-y-3">
                {club.activities.map((row, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 rounded-2xl border border-ink/10 bg-paper/60 p-5"
                  >
                    <Check size={18} className="mt-0.5 shrink-0 text-umber" />
                    <span className="text-sm leading-relaxed">{row}</span>
                  </li>
                ))}
                {!club.activities.length && (
                  <li className="text-sm text-ink-soft">
                    Informasi kegiatan akan segera ditambahkan.
                  </li>
                )}
              </ul>
            </section>
            <section id="galeri" className="mt-12 scroll-mt-28 border-t border-ink/10 pt-10">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <h2 className="font-display text-3xl">Cerita dalam gambar.</h2>
                <p className="text-sm text-ink-soft">Galeri {club.name}</p>
              </div>
              {club.photos.length ? (
                <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {club.photos.map((photo, i) => (
                    <figure key={i}>
                      <button
                        onClick={() => setSelected(photo)}
                        aria-label={`Perbesar ${photo.alt}`}
                        className="relative block aspect-[4/3] w-full overflow-hidden rounded-2xl"
                      >
                        <ActivityPhoto photo={photo} />
                        <span className="absolute right-3 bottom-3 rounded-full bg-canvas/90 p-2">
                          <Expand size={16} />
                        </span>
                      </button>
                      <figcaption className="mt-3 text-sm text-ink-soft">{photo.alt}</figcaption>
                    </figure>
                  ))}
                </div>
              ) : (
                <div className="mt-7 rounded-2xl border border-dashed border-ink/20 bg-paper/40 px-6 py-12 text-center">
                  <Images className="mx-auto text-umber" size={30} />
                  <p className="mt-4 text-sm font-medium">
                    Dokumentasi {club.name} belum ditambahkan.
                  </p>
                  <p className="mt-2 text-xs text-ink-soft">
                    Foto kegiatan akan ditampilkan setelah tersedia.
                  </p>
                </div>
              )}
            </section>
            <div className="mt-12 rounded-2xl bg-umber-deep p-7 text-canvas">
              <h2 className="font-display text-2xl">Tertarik bergabung?</h2>
              <p className="mt-3 text-sm leading-relaxed text-canvas/80">
                Hubungi wali kelas atau penanggung jawab program untuk informasi pendaftaran dan
                jadwal terbaru.
              </p>
            </div>
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
        <DialogContent className="max-h-[90vh] max-w-5xl overflow-y-auto rounded-2xl bg-canvas">
          <DialogTitle className="pr-8 font-display text-xl">{selected?.alt}</DialogTitle>
          <DialogDescription>Dokumentasi ekstrakurikuler.</DialogDescription>
          {selected && <ActivityPhoto photo={selected} className="max-h-[70vh] object-contain" />}
        </DialogContent>
      </Dialog>
    </div>
  );
}
