import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { NewsCard } from "@/components/news-card";
import { useNews } from "@/hooks/use-news";
import { SchoolCarousel } from "@/components/school-carousel";

export const Route = createFileRoute("/berita/")({
  head: () => ({
    meta: [
      { title: "Berita Sekolah — SMP Islam Al-Mujahidin Pamulang" },
      {
        name: "description",
        content: "Kabar terbaru, prestasi, dan kegiatan di SMP Islam Al-Mujahidin Pamulang.",
      },
      { property: "og:title", content: "Berita Sekolah — SMP Islam Al-Mujahidin Pamulang" },
      {
        property: "og:description",
        content: "Kabar terbaru, prestasi, dan kegiatan di SMP Islam Al-Mujahidin Pamulang.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BeritaPage,
});

function BeritaPage() {
  const { data: news = [], isPending, isError } = useNews();
  const [type, setType] = useState("all");
  const visible = news.filter((item) => type === "all" || (item.type || "news") === type);
  return (
    <div className="bg-paper">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-6 py-16 font-body text-ink lg:px-8 lg:py-24">
        <p className="mb-4 text-xs tracking-[0.24em] uppercase text-umber">Kabar sekolah</p>
        <h1 className="font-display text-4xl font-[620] tracking-tight lg:text-5xl">
          Kabar dan cerita sekolah
        </h1>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink-soft">
          Informasi SPMB, kehidupan sekolah, dan berita terbaru dalam satu tempat.
        </p>
        <section aria-label="Berita dan informasi utama" className="mt-8">
          <SchoolCarousel compact />
        </section>
        <h2 className="mt-14 font-display text-3xl">Berita & Buletin</h2>
        <div className="mt-6 flex gap-2" aria-label="Filter jenis posting">
          {[
            ["all", "Semua"],
            ["news", "Berita"],
            ["bulletin", "Buletin"],
          ].map(([id, label]) => (
            <button
              key={id}
              onClick={() => setType(id || "all")}
              aria-pressed={type === id}
              className={`rounded-full px-5 py-2 text-sm ${type === id ? "bg-umber text-white" : "border border-ink/15"}`}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {isPending && <p>Memuat berita…</p>}
          {isError && <p>Berita gagal dimuat. Silakan muat ulang halaman.</p>}
          {!isPending && !isError && !visible.length && <p>Belum ada posting untuk jenis ini.</p>}
          {visible.map((n) => (
            <NewsCard key={n.slug} item={n} />
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
