import { createFileRoute } from "@tanstack/react-router";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { teachers } from "@/lib/content";

export const Route = createFileRoute("/guru")({
  head: () => ({
    meta: [
      { title: "Guru Kami — Sekolah Aldergrove" },
      { name: "description", content: "Kenali para guru dan staf pengajar Sekolah Aldergrove." },
      { property: "og:title", content: "Guru Kami — Sekolah Aldergrove" },
      { property: "og:description", content: "Kenali para guru dan staf pengajar Sekolah Aldergrove." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: GuruPage,
});

function GuruPage() {
  return (
    <div className="bg-canvas">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-6 py-16 font-body text-ink lg:px-8 lg:py-24">
        <p className="mb-4 text-xs tracking-[0.24em] uppercase text-umber">Tenaga pengajar</p>
        <h1 className="font-display text-4xl font-[620] tracking-tight lg:text-5xl">Guru Kami</h1>
        <p className="mt-4 max-w-[50ch] text-ink-soft">
          Para pendidik yang mengenal setiap siswa dengan nama dan membaca setiap tulisan dengan teliti.
        </p>
        <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-4">
          {teachers.map((t) => (
            <div key={t.name}>
              <img
                src={t.photo}
                alt={`Foto ${t.name}`}
                loading="lazy"
                className="aspect-[4/5] w-full rounded-[min(1.6vw,16px)] bg-paper object-cover"
              />
              <h2 className="mt-4 font-display text-lg font-[560] tracking-tight">{t.name}</h2>
              <p className="text-sm text-ink-soft">{t.role}</p>
            </div>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
