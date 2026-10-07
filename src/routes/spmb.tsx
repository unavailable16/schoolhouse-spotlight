import { createFileRoute } from "@tanstack/react-router";
import { CalendarDays, CheckCircle2, FileText, MapPin } from "lucide-react";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { SchoolMap } from "@/components/school-map";

export const Route = createFileRoute("/spmb")({
  head: () => ({
    meta: [
      { title: "SPMB 2026/2027 — Sekolah Aldergrove" },
      { name: "description", content: "Informasi jadwal, persyaratan, dan tahapan SPMB Sekolah Aldergrove tahun ajaran 2026/2027." },
      { property: "og:title", content: "SPMB 2026/2027 — Sekolah Aldergrove" },
      { property: "og:description", content: "Informasi lengkap penerimaan murid baru SMP dan SMA Sekolah Aldergrove." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SpmbPage,
});

const requirements = [
  "Salinan akta kelahiran dan kartu keluarga",
  "Rapor dua semester terakhir",
  "Pas foto terbaru calon murid",
  "Surat keterangan dari sekolah asal",
];

const stages = [
  { n: "01", title: "Pendaftaran", date: "1 Oktober–7 November 2026", text: "Kirim formulir dan berkas calon murid melalui bagian penerimaan." },
  { n: "02", title: "Asesmen & wawancara", date: "14–21 November 2026", text: "Calon murid mengikuti asesmen dasar dan percakapan bersama tim pendidikan." },
  { n: "03", title: "Pengumuman", date: "28 November 2026", text: "Hasil disampaikan langsung kepada orang tua atau wali melalui surel." },
];

function SpmbPage() {
  return (
    <div className="bg-canvas">
      <SiteHeader />
      <main className="font-body text-ink">
        <section className="bg-umber text-canvas">
          <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-28">
            <p className="mb-5 flex items-center gap-2 text-xs tracking-[0.22em] uppercase text-brass"><CalendarDays className="size-4" /> Tahun ajaran 2026/2027</p>
            <h1 className="max-w-[16ch] font-display text-4xl leading-tight font-[620] text-balance sm:text-5xl lg:text-6xl">Sistem Penerimaan Murid Baru</h1>
            <p className="mt-6 max-w-[58ch] text-base leading-relaxed text-canvas/80 sm:text-lg">Pendaftaran calon murid SMP dan SMA dibuka mulai 1 Oktober 2026. Kami mengundang keluarga untuk mengenal cara belajar, lingkungan, dan komunitas Aldergrove.</p>
            <a href="mailto:admissions@aldergrove.example?subject=Pendaftaran%20SPMB%202026%2F2027" className="mt-8 inline-flex items-center gap-2 rounded-md bg-brass px-5 py-3 text-sm font-[600] text-umber-deep transition-colors hover:bg-sage">Mulai pendaftaran</a>
          </div>
        </section>

        <section className="bg-paper">
          <div className="mx-auto grid max-w-6xl gap-14 px-6 py-20 lg:grid-cols-12 lg:px-8 lg:py-24">
            <div className="lg:col-span-5">
              <p className="mb-4 text-xs tracking-[0.22em] uppercase text-umber">Yang perlu disiapkan</p>
              <h2 className="font-display text-3xl font-[620]">Persyaratan pendaftaran</h2>
              <div className="mt-8 space-y-4">
                {requirements.map((item) => <p key={item} className="flex gap-3 text-sm leading-relaxed text-ink-soft"><CheckCircle2 className="mt-0.5 size-5 shrink-0 text-moss" />{item}</p>)}
              </div>
            </div>
            <div className="lg:col-span-7">
              <p className="mb-4 text-xs tracking-[0.22em] uppercase text-umber">Alur penerimaan</p>
              <div className="divide-y divide-ink/10 border-y border-ink/10">
                {stages.map((stage) => (
                  <div key={stage.n} className="grid gap-3 py-6 sm:grid-cols-[3rem_1fr]">
                    <span className="font-display text-lg text-umber">{stage.n}</span>
                    <div><h3 className="font-display text-xl font-[560]">{stage.title}</h3><p className="mt-1 text-sm font-[600] text-umber">{stage.date}</p><p className="mt-2 text-sm leading-relaxed text-ink-soft">{stage.text}</p></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-canvas">
          <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-24">
            <div className="mb-10 grid gap-6 lg:grid-cols-2 lg:items-end">
              <div><p className="mb-4 flex items-center gap-2 text-xs tracking-[0.22em] uppercase text-umber"><MapPin className="size-4" /> Kunjungi sekolah</p><h2 className="font-display text-3xl font-[620]">Kenali Aldergrove dari dekat.</h2></div>
              <p className="max-w-[52ch] text-sm leading-relaxed text-ink-soft lg:justify-self-end">Temui guru, lihat ruang belajar, dan bicarakan kebutuhan calon murid bersama tim penerimaan kami.</p>
            </div>
            <SchoolMap />
            <div className="mt-5 flex flex-wrap items-center justify-between gap-4 text-sm text-ink-soft"><address className="not-italic">Jl. Pustaka No. 4, Bandung 40115</address><a href="mailto:admissions@aldergrove.example" className="inline-flex items-center gap-2 font-[600] text-umber hover:text-umber-deep"><FileText className="size-4" /> Hubungi bagian penerimaan</a></div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}