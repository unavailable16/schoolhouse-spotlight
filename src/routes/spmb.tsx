import { createFileRoute } from "@tanstack/react-router";
import { CalendarDays, CheckCircle2, FileText, MapPin } from "lucide-react";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { SchoolMap } from "@/components/school-map";
import { MediaGallery } from "@/components/media-gallery";
import { useSiteMedia } from "@/lib/site-media";
import { useSchoolSettings } from "@/lib/school-settings";
import { school } from "@/lib/school";

export const Route = createFileRoute("/spmb")({
  head: () => ({
    meta: [
      { title: "SPMB 2026/2027 — SMP Islam Al-Mujahidin Pamulang" },
      {
        name: "description",
        content:
          "Informasi jadwal, persyaratan, dan tahapan SPMB SMP Islam Al-Mujahidin Pamulang tahun ajaran 2026/2027.",
      },
      { property: "og:title", content: "SPMB 2026/2027 — SMP Islam Al-Mujahidin Pamulang" },
      {
        property: "og:description",
        content: "Informasi lengkap penerimaan murid baru SMP Islam Al-Mujahidin Pamulang.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SpmbPage,
});

function SpmbPage() {
  const { settings } = useSchoolSettings();
  const spmb = settings.spmb;
  const { data: media, isPending: mediaLoading } = useSiteMedia();
  return (
    <div className="bg-canvas">
      <SiteHeader />
      <main className="font-body text-ink">
        <section className="relative overflow-hidden bg-umber-deep text-canvas">
          {spmb.backgroundImage && (
            <img
              src={spmb.backgroundImage}
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-15"
            />
          )}
          <div className="absolute inset-0 spmb-hero-wash" />
          {spmb.ornamentImage && (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-3 overflow-hidden opacity-50 mix-blend-screen md:inset-5"
            >
              <img src={spmb.ornamentImage} alt="" className="h-full w-full object-fill" />
            </div>
          )}
          <div className="relative mx-auto grid max-w-6xl items-center gap-8 px-10 pt-14 pb-8 md:grid-cols-2 md:py-16 lg:px-12 lg:py-20">
            <div>
              <p className="mb-5 flex items-center gap-2 text-xs uppercase tracking-[.2em] text-brass">
                <CalendarDays className="size-4" />
                Tahun ajaran {spmb.academicYear}
              </p>
              <h1 className="max-w-[17ch] font-display text-4xl leading-tight font-[620] sm:text-5xl lg:text-6xl">
                {spmb.heading}
              </h1>
              <p className="mt-6 max-w-xl text-sm leading-relaxed text-canvas/85 sm:text-base">
                {spmb.description}
              </p>
              <a
                href={school.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-brass px-5 py-3 text-sm font-semibold text-umber-deep"
              >
                {spmb.contactLabel}
              </a>
            </div>
            {spmb.heroImage && (
              <img
                src={spmb.heroImage}
                alt="Siswa SMP Islam Al-Mujahidin menyambut calon murid"
                className="mx-auto h-[280px] w-full self-end object-contain object-bottom scale-[1.35] origin-bottom sm:h-[340px] md:h-[400px] md:scale-[1.65]"
              />
            )}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
          <p className="text-xs uppercase tracking-[.2em] text-umber">Informasi dalam gambar</p>
          <h2 className="mt-3 font-display text-3xl">Pamflet SPMB</h2>
          <p className="mt-4 mb-7 text-sm text-ink-soft">
            Geser untuk melihat pamflet, lalu pilih gambar untuk memperbesar informasi pendaftaran.
          </p>
          {mediaLoading ? (
            <p>Memuat pamflet…</p>
          ) : media?.spmb.length ? (
            <MediaGallery items={media.spmb} label="Pamflet SPMB" horizontal />
          ) : (
            <div className="rounded-2xl border border-dashed border-umber/25 bg-paper/60 p-10 text-center">
              <p className="text-sm text-ink-soft">Pamflet pendaftaran akan segera tersedia.</p>
              <a
                href={school.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block text-sm font-medium text-umber"
              >
                Hubungi kami untuk informasi SPMB →
              </a>
            </div>
          )}
        </section>

        <section className="bg-paper">
          <div className="mx-auto grid max-w-6xl gap-14 px-6 py-20 lg:grid-cols-12 lg:px-8 lg:py-24">
            <div className="lg:col-span-5">
              <p className="mb-4 text-xs tracking-[0.22em] uppercase text-umber">
                Yang perlu disiapkan
              </p>
              <h2 className="font-display text-3xl font-[620]">Persyaratan pendaftaran</h2>
              <p className="mt-4 text-sm text-ink-soft">{spmb.requirementsNote}</p>
              <div className="mt-8 space-y-4">
                {spmb.requirements.map((item) => (
                  <p key={item.id} className="flex gap-3 text-sm leading-relaxed text-ink-soft">
                    <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-moss" />
                    {item.text}
                  </p>
                ))}
              </div>
            </div>
            <div className="lg:col-span-7">
              <p className="mb-4 text-xs tracking-[0.22em] uppercase text-umber">Alur penerimaan</p>
              <div className="divide-y divide-ink/10 border-y border-ink/10">
                {spmb.stages.map((stage, i) => (
                  <div key={stage.id} className="grid gap-3 py-6 sm:grid-cols-[3rem_1fr]">
                    <span className="font-display text-lg text-umber">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-display text-xl font-[560]">{stage.title}</h3>
                      <p className="mt-1 text-sm font-[600] text-umber">{stage.date}</p>
                      <p className="mt-2 text-sm leading-relaxed text-ink-soft">{stage.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-canvas">
          <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-24">
            <div className="mb-10 grid gap-6 lg:grid-cols-2 lg:items-end">
              <div>
                <p className="mb-4 flex items-center gap-2 text-xs tracking-[0.22em] uppercase text-umber">
                  <MapPin className="size-4" /> Kunjungi sekolah
                </p>
                <h2 className="font-display text-3xl font-[620]">
                  Kenali Sekolah kami dari dekat.
                </h2>
              </div>
              <p className="max-w-[52ch] text-sm leading-relaxed text-ink-soft lg:justify-self-end">
                Temui guru, lihat ruang belajar, dan bicarakan kebutuhan calon murid bersama tim
                penerimaan kami.
              </p>
            </div>
            <SchoolMap />
            <div className="mt-5 flex flex-wrap items-center justify-between gap-4 text-sm text-ink-soft">
              <address className="not-italic">
                Jl. Siliwangi No.2 Pamulang Barat, Pamulang, Tangsel, Banten
              </address>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
