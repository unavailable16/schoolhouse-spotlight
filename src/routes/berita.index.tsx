import { createFileRoute } from "@tanstack/react-router";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { NewsCard } from "@/components/news-card";
import { news } from "@/lib/content";

export const Route = createFileRoute("/berita/")({
  head: () => ({
    meta: [
      { title: "Berita Sekolah — Sekolah Aldergrove" },
      { name: "description", content: "Kabar terbaru, prestasi, dan kegiatan di Sekolah Aldergrove." },
      { property: "og:title", content: "Berita Sekolah — Sekolah Aldergrove" },
      { property: "og:description", content: "Kabar terbaru, prestasi, dan kegiatan di Sekolah Aldergrove." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BeritaPage,
});

function BeritaPage() {
  return (
    <div className="bg-paper">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-6 py-16 font-body text-ink lg:px-8 lg:py-24">
        <p className="mb-4 text-xs tracking-[0.24em] uppercase text-umber">Kabar sekolah</p>
        <h1 className="font-display text-4xl font-[620] tracking-tight lg:text-5xl">Semua Berita</h1>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {news.map((n) => (
            <NewsCard key={n.slug} item={n} />
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
