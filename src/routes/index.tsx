import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { NewsCard } from "@/components/news-card";
import { SchoolCarousel } from "@/components/school-carousel";
import { news } from "@/lib/content";

import bookShelf from "@/assets/book-shelf.jpg";
import courtyard from "@/assets/courtyard.jpg";
import libraryTables from "@/assets/library-tables.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sekolah Aldergrove — Lumen et Labor" },
      {
        name: "description",
        content:
          "Aldergrove adalah sekolah swasta SMP dan SMA di Bandung untuk usia 11–18 tahun, yang mengajarkan siswa membaca dengan teliti dan berargumen dengan adil.",
      },
      { property: "og:title", content: "Sekolah Aldergrove — Lumen et Labor" },
      {
        property: "og:description",
        content:
          "Sekolah swasta SMP dan SMA di Bandung. Kelas kecil, empat bidang, satu standar.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const focusAreas = [
  {
    n: "01",
    title: "Bahasa dan Tulisan",
    body: "Menulis, retorika, dan membaca kritis dari kelas 7 hingga kelas 12.",
  },
  {
    n: "02",
    title: "Ilmu Alam",
    body: "Biologi, kimia, serta kebun botani dan lahan basah di area sekolah.",
  },
  {
    n: "03",
    title: "Karya Tangan",
    body: "Desain & teknologi, bengkel cetak, dan studio kerajinan.",
  },
  {
    n: "04",
    title: "Meja Bersama",
    body: "Musik, debat, dan diskusi mingguan lintas angkatan.",
  },
];

const advantages = [
  {
    stat: "1:9",
    title: "Rasio guru dan siswa",
    body: "Cukup kecil sehingga setiap nama dikenal dan setiap tulisan dibaca dua kali.",
  },
  {
    stat: "62%",
    title: "Masuk PTN favorit",
    body: "UI, ITB, dan UGM termasuk tujuan lulusan terbaru kami.",
  },
  {
    stat: "14",
    title: "Hektar lahan hijau",
    body: "Hutan kecil, lahan basah, dan taman yang dekat dari kelas.",
  },
  {
    stat: "1 dari 3",
    title: "Menerima beasiswa",
    body: "Bantuan nyata agar bakat, bukan keadaan, yang menentukan siapa yang bersekolah.",
  },
];

const stats = [
  { value: "126", label: "Siswa per angkatan" },
  { value: "38", label: "Guru tetap" },
  { value: "94%", label: "Lanjut ke SMA Aldergrove" },
  { value: "2019", label: "Gedung terbaru" },
];

function Index() {
  return (
    <div className="bg-canvas">
      <SiteHeader />

      <main className="font-body text-ink">
        <SchoolCarousel />

        <section id="focus" className="bg-paper">
          <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-28">
            <div className="grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <p className="mb-4 font-body text-xs tracking-[0.24em] uppercase text-umber">
                  Fokus kami
                </p>
                <h2 className="max-w-[16ch] font-display text-3xl leading-tight font-[620] tracking-tight text-balance text-ink">
                  Empat bidang, satu standar.
                </h2>
                <p className="mt-5 max-w-[40ch] font-body text-base leading-relaxed text-ink-soft">
                  Kami mengajarkan bukan sekadar daftar mata pelajaran, melainkan kebiasaan berpikir yang dilatih setiap hari dan dinilai dengan jujur.
                </p>
              </div>
              <div className="divide-y divide-ink/10 lg:col-span-8">
                {focusAreas.map((f, i) => (
                  <a
                    key={f.n}
                    href="#admissions"
                    className={`group flex items-baseline justify-between gap-6 py-6 ${i === 0 ? "border-t border-ink/10" : ""}`}
                  >
                    <div className="flex items-baseline gap-5">
                      <span className="w-8 shrink-0 font-display text-sm text-umber">{f.n}</span>
                      <div>
                        <h3 className="font-display text-2xl font-[560] tracking-tight text-ink transition-colors group-hover:text-umber">
                          {f.title}
                        </h3>
                        <p className="mt-1 max-w-[52ch] font-body text-sm text-ink-soft">{f.body}</p>
                      </div>
                    </div>
                    <span className="shrink-0 font-body text-sm text-ink-soft">→</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-canvas">
          <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-28">
            <p className="mb-4 font-body text-xs tracking-[0.24em] uppercase text-umber">
              Mengapa keluarga memilih Aldergrove
            </p>
            <h2 className="max-w-[20ch] font-display text-3xl leading-tight font-[620] tracking-tight text-balance text-ink lg:text-4xl">
              Sekolah kecil, dan memang disengaja.
            </h2>
            <div className="mt-12 grid gap-px overflow-hidden rounded-[min(1.4vw,14px)] bg-ink/10 ring-1 ring-ink/10 sm:grid-cols-2 lg:grid-cols-4">
              {advantages.map((a) => (
                <div key={a.title} className="bg-canvas p-7">
                  <span className="font-display text-2xl text-umber">{a.stat}</span>
                  <h3 className="mt-4 font-display text-lg font-[560] tracking-tight text-ink">
                    {a.title}
                  </h3>
                  <p className="mt-2 font-body text-sm leading-relaxed text-ink-soft">{a.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="campus" className="bg-ink text-canvas">
          <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-24">
            <div className="grid items-end gap-8 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <p className="mb-4 font-body text-xs tracking-[0.24em] uppercase text-brass">
                  Kehidupan kampus
                </p>
                <h2 className="max-w-[18ch] font-display text-3xl leading-tight font-[620] tracking-tight text-balance">
                  Ketenangan ruang baca yang terawat.
                </h2>
              </div>
              <div className="grid grid-cols-2 gap-4 lg:col-span-7">
                <img
                  src={libraryTables}
                  alt="Siswa membaca di meja kayu panjang di bawah jendela perpustakaan"
                  loading="lazy"
                  width={1088}
                  height={720}
                  className="bg-paper/15 col-span-2 aspect-[16/10] w-full rounded-[min(1.6vw,16px)] object-cover outline-1 -outline-offset-1 outline-white/10"
                />
                <img
                  src={bookShelf}
                  alt="Tangan menaruh buku di rak kayu tinggi"
                  loading="lazy"
                  width={816}
                  height={816}
                  className="bg-paper/15 aspect-square w-full rounded-[min(1.6vw,16px)] object-cover outline-1 -outline-offset-1 outline-white/10"
                />
                <img
                  src={courtyard}
                  alt="Halaman sekolah yang tenang dengan bangku batu dan pepohonan"
                  loading="lazy"
                  width={816}
                  height={816}
                  className="bg-paper/15 aspect-square w-full rounded-[min(1.6vw,16px)] object-cover outline-1 -outline-offset-1 outline-white/10"
                />
              </div>
            </div>

            <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 border-t border-canvas/15 pt-10 md:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="font-display text-4xl font-[620] tracking-tight text-brass">
                    {s.value}
                  </p>
                  <p className="mt-1 font-body text-sm text-canvas/70">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="berita" className="bg-paper">
          <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-28">
            <div className="flex items-end justify-between gap-6">
              <div>
                <p className="mb-4 font-body text-xs tracking-[0.24em] uppercase text-umber">Berita terkini</p>
                <h2 className="font-display text-3xl leading-tight font-[620] tracking-tight text-ink lg:text-4xl">Kabar dari sekolah.</h2>
              </div>
              <Link to="/berita" className="shrink-0 rounded-full px-3 py-1.5 font-body text-xs font-[500] text-ink ring-1 ring-ink/20 transition-colors hover:bg-ink/5">
                Berita lainnya →
              </Link>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {news.slice(0, 3).map((n) => (
                <NewsCard key={n.slug} item={n} />
              ))}
            </div>
          </div>
        </section>

        <section id="admissions" className="bg-canvas">
          <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-28">
            <div className="relative overflow-hidden rounded-[min(2vw,20px)] bg-umber px-8 py-14 text-canvas ring-1 ring-umber-deep/40 lg:px-16">
              <div className="glow pointer-events-none absolute inset-0" />
              <div className="relative max-w-[46ch]">
                <p className="mb-4 font-body text-xs tracking-[0.24em] uppercase text-brass">
                  Penerimaan Siswa Baru 2026
                </p>
                <h2 className="font-display text-3xl leading-tight font-[620] tracking-tight text-balance lg:text-4xl">
                  Datang dan rasakan sendiri suasananya.
                </h2>
                <p className="mt-5 max-w-[52ch] font-body text-base leading-relaxed text-canvas/80">
                  Hari kunjungan terbuka kami jatuh pada Sabtu, 14 November. Ikuti kelas, jelajahi ruang baca, dan temui kepala sekolah serta para guru.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <a
                    href="mailto:admissions@aldergrove.example"
                    className="inline-flex items-center gap-2 rounded-[min(1vw,10px)] bg-canvas px-4 py-2 font-body text-sm font-[500] text-umber-deep ring-1 ring-canvas/40 transition-colors hover:bg-canvas/90"
                  >
                    Pesan tempat
                  </a>
                  <a
                    href="tel:+62221234567"
                    className="inline-flex items-center gap-2 font-body text-sm font-[500] text-canvas transition-colors hover:text-brass"
                  >
                    Hubungi bagian pendaftaran →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
