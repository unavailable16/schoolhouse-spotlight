import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { news } from "@/lib/content";

export const Route = createFileRoute("/berita/$slug")({
  loader: ({ params }) => {
    const item = news.find((n) => n.slug === params.slug);
    if (!item) throw notFound();
    return { item };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Berita tidak ditemukan" }, { name: "robots", content: "noindex" }] };
    const { item } = loaderData;
    return {
      meta: [
        { title: `${item.title} — Sekolah Aldergrove` },
        { name: "description", content: item.excerpt },
        { property: "og:title", content: item.title },
        { property: "og:description", content: item.excerpt },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: BeritaNotFound,
  component: BeritaDetail,
});

function BeritaNotFound() {
  return (
    <div className="bg-canvas">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-6 py-24 text-center font-body text-ink">
        <h1 className="font-display text-3xl font-[620]">Berita tidak ditemukan</h1>
        <Link to="/berita" className="mt-6 inline-block text-umber">← Kembali ke semua berita</Link>
      </main>
      <SiteFooter />
    </div>
  );
}

function BeritaDetail() {
  const { item } = Route.useLoaderData();
  const others = news.filter((n) => n.slug !== item.slug).slice(0, 3);
  return (
    <div className="bg-canvas">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-6 py-16 font-body text-ink lg:py-20">
        <Link to="/berita" className="text-sm text-ink-soft hover:text-umber">← Semua berita</Link>
        <p className="mt-8 text-xs tracking-[0.2em] uppercase text-umber">
          {item.category} · {item.date}
        </p>
        <h1 className="mt-3 font-display text-3xl leading-tight font-[620] tracking-tight text-balance lg:text-5xl">
          {item.title}
        </h1>
        <img src={item.image} alt="" className="mt-10 aspect-[16/9] w-full rounded-[min(1.6vw,16px)] bg-paper object-cover" />
        <div className="mt-10 space-y-5 text-lg leading-relaxed text-ink-soft">
          {item.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
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
