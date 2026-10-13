import { createFileRoute } from "@tanstack/react-router";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { teachers } from "@/lib/content";

export const Route = createFileRoute("/guru")({
  head: () => ({
    meta: [
      { title: "Tenaga Pendidik — SMP Islam Al-Mujahidin Pamulang" },
      {
        name: "description",
        content: "Kenali kepala sekolah dan tenaga pendidik SMP Islam Al-Mujahidin Pamulang.",
      },
      { property: "og:title", content: "Tenaga Pendidik — SMP Islam Al-Mujahidin Pamulang" },
      {
        property: "og:description",
        content: "Kenali kepala sekolah dan tenaga pendidik SMP Islam Al-Mujahidin Pamulang.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: GuruPage,
});

function GuruPage() {
  const [headmaster, ...educators] = teachers;

  if (!headmaster) return null;

  return (
    <div className="bg-canvas">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-6 py-16 font-body text-ink lg:px-8 lg:py-24">
        <p className="mb-4 text-xs tracking-[0.24em] uppercase text-umber">Komunitas pendidikan</p>
        <h1 className="font-display text-4xl font-[620] tracking-tight lg:text-5xl">
          Tenaga Pendidik
        </h1>
        <p className="mt-4 max-w-[50ch] text-ink-soft">
          Para pendidik yang mengenal setiap siswa dengan nama dan membaca setiap tulisan dengan
          teliti.
        </p>
        <div className="mx-auto mt-12 max-w-xs text-center">
          <img
            src={headmaster.photo}
            alt={`Foto ${headmaster.name}`}
            className="mx-auto aspect-[4/5] w-full rounded-lg bg-paper object-cover"
          />
          <p className="mt-5 text-xs tracking-[0.2em] uppercase text-umber">Kepala sekolah</p>
          <h2 className="mt-2 font-display text-2xl font-[560] tracking-tight">
            {headmaster.name}
          </h2>
        </div>
        <div className="mt-16 border-t border-ink/10 pt-12">
          <h2 className="font-display text-2xl font-[620]">Guru bidang studi</h2>
          <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-3">
            {educators.map((t) => (
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
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
