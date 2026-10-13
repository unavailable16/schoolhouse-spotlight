import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { MediaGallery } from "@/components/media-gallery";
import { displayPublishDate } from "@/lib/news-api";
import { useNews } from "@/hooks/use-news";

export const Route = createFileRoute("/berita/$slug")({
  head: () => ({ meta: [{ title: "Berita Sekolah — SMP Islam Al-Mujahidin Pamulang" }, { name: "description", content: "Berita dan buletin terbaru dari SMP Islam Al-Mujahidin Pamulang." }, { property: "og:title", content: "Berita Sekolah — SMP Islam Al-Mujahidin Pamulang" }, { property: "og:description", content: "Berita dan buletin terbaru dari SMP Islam Al-Mujahidin Pamulang." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  notFoundComponent: BeritaNotFound,
  component: BeritaDetail,
});

function BeritaNotFound() {
  return (
    <div className="bg-canvas">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-6 py-24 text-center font-body text-ink">
        <h1 className="font-display text-3xl font-[620]">Berita tidak ditemukan</h1>
        <Link to="/berita" className="mt-6 inline-block text-umber">
          ← Kembali ke semua berita
        </Link>
      </main>
      <SiteFooter />
    </div>
  );
}

function BeritaDetail() {
  const { slug } = Route.useParams();
  const { data: news = [], isPending, isError } = useNews();
  if (isPending) return <main className="p-12">Memuat berita…</main>;
  if (isError)
    return <main className="p-12">Berita gagal dimuat. Silakan muat ulang halaman.</main>;
  const item = news.find((n) => n.slug === slug);
  if (!item) return <BeritaNotFound />;
  const others = news.filter((n) => n.slug !== item.slug).slice(0, 3);
  return (
    <div className="bg-canvas">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-6 py-16 font-body text-ink lg:py-20">
        <Link to="/berita" className="text-sm text-ink-soft hover:text-umber">
          ← Semua berita
        </Link>
        <p className="mt-8 text-xs tracking-[0.2em] uppercase text-umber">
          {item.type === "bulletin" ? "Buletin" : item.category} · {displayPublishDate(item.date)}
        </p>
        <h1 className="mt-3 font-display text-3xl leading-tight font-[620] tracking-tight text-balance lg:text-5xl">
          {item.title}
        </h1>
        <p className="mt-4 text-sm text-ink-soft">Penerbit: {item.publisher || "Admin sekolah"}</p>
        {item.type === "bulletin" ? (
          <div className="mt-8">
            <MediaGallery
              items={[{ id: item.slug, title: item.title, image: item.image }]}
              label="Buletin sekolah"
              horizontal
            />
          </div>
        ) : (
          <>
            <img
              src={item.image}
              alt={item.title}
              className="mt-10 aspect-[16/9] w-full rounded-2xl object-cover"
            />
            <div className="mt-10 space-y-5 text-lg leading-relaxed text-ink-soft">
              {item.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </>
        )}
        <div className="mt-16 border-t border-ink/10 pt-8">
          <h2 className="font-display text-xl font-[560]">Berita lainnya</h2>
          <ul className="mt-4 space-y-3">
            {others.map((o) => (
              <li key={o.slug}>
                <Link to="/berita/$slug" params={{ slug: o.slug }} className="hover:text-umber">
                  {o.title} →
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
