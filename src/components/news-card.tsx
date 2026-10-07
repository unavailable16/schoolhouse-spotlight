import { Link } from "@tanstack/react-router";
import type { NewsItem } from "@/lib/content";

export function NewsCard({ item }: { item: NewsItem }) {
  return (
    <Link
      to="/berita/$slug"
      params={{ slug: item.slug }}
      className="group flex flex-col overflow-hidden rounded-[min(1.6vw,16px)] bg-canvas ring-1 ring-ink/10 transition-shadow hover:shadow-lg"
    >
      <img src={item.image} alt="" loading="lazy" className="aspect-[16/10] w-full bg-paper object-cover" />
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs tracking-[0.18em] uppercase text-umber">
          {item.category} · {item.date}
        </p>
        <h3 className="mt-3 font-display text-xl leading-snug font-[560] tracking-tight text-ink group-hover:text-umber">
          {item.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">{item.excerpt}</p>
        <span className="mt-auto pt-5 text-sm font-[500] text-ink">Baca selengkapnya →</span>
      </div>
    </Link>
  );
}
