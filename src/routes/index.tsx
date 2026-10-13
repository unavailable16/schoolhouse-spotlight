import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { NewsCard } from "@/components/news-card";
import { SchoolCarousel } from "@/components/school-carousel";
import { useNews } from "@/hooks/use-news";

import { useSchoolSettings } from "@/lib/school-settings";
import { school, vision, missions } from "@/lib/school";
import { Accreditation } from "@/components/accreditation";
import { CampusCarousel } from "@/components/campus-carousel";
import { HeadmasterWelcome } from "@/components/headmaster-welcome";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SMP Islam Al-Mujahidin Pamulang" },
      {
        name: "description",
        content:
          "Bergabunglah dengan kami untuk bersama membentuk generasi berprestasi, berakhlak mulia, dan siap menghadapi masa depan gemilang.",
      },
      { property: "og:title", content: "SMP Islam Al-Mujahidin Pamulang" },
      {
        property: "og:description",
        content: "Pendidikan akademik dan karakter Islami di SMP Islam Al-Mujahidin Pamulang.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const advantages = [
  {
    stat: "Islam",
    title: "Ilmu dan akhlak",
    body: "Nilai Islam menjadi bagian dari pembelajaran dan pembiasaan sehari-hari.",
  },
  {
    stat: "3",
    title: "Program unggulan",
    body: "Multimedia, Subuh Bersama, dan Tahfidz memberi ruang bagi potensi siswa.",
  },
  {
    stat: "7",
    title: "Pilihan ekstrakurikuler",
    body: "Seni, olahraga, sains, bahasa, dan kepemimpinan untuk menemukan minat dan bakat.",
  },
];
function Index() {
  const { settings } = useSchoolSettings();
  const focusAreas = settings.profile.missions.map((row, i) => ({
    n: String(i + 1).padStart(2, "0"),
    title: row.title,
    body: row.text,
  }));
  const { data: news = [], isError: newsError } = useNews();
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
                  Visi & Misi
                </h2>
                <p className="mt-5 max-w-[40ch] font-body text-base leading-relaxed text-ink-soft">
                  {settings.profile.vision}
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
                        <p className="mt-1 max-w-[52ch] font-body text-sm text-ink-soft">
                          {f.body}
                        </p>
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
              Mengapa memilih sekolah kami
            </p>
            <h2 className="max-w-[20ch] font-display text-3xl leading-tight font-[620] tracking-tight text-balance text-ink lg:text-4xl">
              Pendidikan yang menumbuhkan ilmu dan akhlak.
            </h2>
            <div className="mt-8">
              <Accreditation />
            </div>
            <div className="mt-6 grid gap-px overflow-hidden rounded-[min(1.4vw,14px)] bg-ink/10 ring-1 ring-ink/10 sm:grid-cols-3">
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

        <CampusCarousel />
        <HeadmasterWelcome />

        <section id="berita" className="bg-paper">
          <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-28">
            <div className="flex items-end justify-between gap-6">
              <div>
                <p className="mb-4 font-body text-xs tracking-[0.24em] uppercase text-umber">
                  Berita terkini
                </p>
                <h2 className="font-display text-3xl leading-tight font-[620] tracking-tight text-ink lg:text-4xl">
                  Kabar dari sekolah.
                </h2>
              </div>
              <Link
                to="/berita"
                className="shrink-0 rounded-full px-3 py-1.5 font-body text-xs font-[500] text-ink ring-1 ring-ink/20 transition-colors hover:bg-ink/5"
              >
                Berita lainnya →
              </Link>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {newsError && <p>Berita belum dapat dimuat. Silakan muat ulang halaman.</p>}
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
                  Penerimaan Siswa Baru {settings.spmb.academicYear}
                </p>
                <h2 className="font-display text-3xl leading-tight font-[620] tracking-tight text-balance lg:text-4xl">
                  Datang dan rasakan sendiri suasananya.
                </h2>
                <p className="mt-5 max-w-[52ch] font-body text-base leading-relaxed text-canvas/80">
                  Kenali program sekolah dan tanyakan informasi pendaftaran, persyaratan, serta
                  jadwal kunjungan melalui tim sekolah.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <a
                    href={school.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-[min(1vw,10px)] bg-canvas px-4 py-2 font-body text-sm font-[500] text-umber-deep ring-1 ring-canvas/40 transition-colors hover:bg-canvas/90"
                  >
                    Hubungi kami
                  </a>
                  <Link
                    to="/spmb"
                    className="inline-flex items-center gap-2 font-body text-sm font-[500] text-canvas transition-colors hover:text-brass"
                  >
                    Lihat informasi SPMB →
                  </Link>
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
