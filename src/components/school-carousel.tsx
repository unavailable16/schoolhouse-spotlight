import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, CalendarDays, Newspaper } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { news } from "@/lib/content";
import readingRoom from "@/assets/reading-room.jpg";
import courtyard from "@/assets/courtyard.jpg";

const slides = [
  {
    id: "school",
    eyebrow: "Sekolah Swasta SMP & SMA · Bandung",
    title: "Sekolah Aldergrove",
    description:
      "Tempat tenang untuk berpikir lantang—membaca dengan teliti, berargumen dengan adil, dan membawa gagasan ke dunia yang lebih luas.",
    image: readingRoom,
    imageAlt: "Ruang baca Sekolah Aldergrove dengan cahaya pagi",
    kind: "school" as const,
  },
  {
    id: "spmb",
    eyebrow: "Penerimaan Murid Baru 2026/2027",
    title: "SPMB Aldergrove telah dibuka",
    description:
      "Kenali jadwal, persyaratan, dan tahapan pendaftaran untuk calon murid SMP dan SMA.",
    image: courtyard,
    imageAlt: "Halaman hijau Sekolah Aldergrove",
    kind: "spmb" as const,
  },
  ...news.slice(0, 3).map((item) => ({
    id: item.slug,
    eyebrow: `${item.category} · ${item.date}`,
    title: item.title,
    description: item.excerpt,
    image: item.image,
    imageAlt: `Ilustrasi berita ${item.title}`,
    kind: "news" as const,
    slug: item.slug,
  })),
];

export function SchoolCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!api) return;
    const update = () => setActive(api.selectedScrollSnap());
    update();
    api.on("select", update);
    return () => {
      api.off("select", update);
    };
  }, [api]);

  useEffect(() => {
    if (!api || paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => api.scrollNext(), 6500);
    return () => window.clearInterval(timer);
  }, [api, paused]);

  return (
    <section
      aria-label="Sorotan Sekolah Aldergrove"
      className="bg-ink"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <Carousel setApi={setApi} opts={{ loop: true }} className="mx-auto max-w-[1600px]">
        <CarouselContent className="ml-0">
          {slides.map((slide, index) => (
            <CarouselItem key={slide.id} className="pl-0">
              <div className="relative min-h-[calc(100svh-4rem)] overflow-hidden lg:min-h-[760px]">
                <img
                  src={slide.image}
                  alt={slide.imageAlt}
                  className="absolute inset-0 h-full w-full object-cover"
                  fetchPriority={index === 0 ? "high" : "auto"}
                />
                <div className="absolute inset-0 bg-[linear-gradient(90deg,color-mix(in_oklab,var(--ink)_92%,transparent)_0%,color-mix(in_oklab,var(--ink)_68%,transparent)_52%,color-mix(in_oklab,var(--ink)_18%,transparent)_100%)]" />
                <div className="relative mx-auto flex min-h-[calc(100svh-4rem)] max-w-6xl items-end px-6 pt-24 pb-28 lg:min-h-[760px] lg:items-center lg:px-8 lg:pb-32">
                  <div className="max-w-2xl text-canvas">
                    <p className="mb-5 flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-brass">
                      {slide.kind === "spmb" ? <CalendarDays className="size-4" /> : null}
                      {slide.kind === "news" ? <Newspaper className="size-4" /> : null}
                      {slide.eyebrow}
                    </p>
                    <h1 className="max-w-[18ch] font-display text-4xl leading-tight font-[620] text-balance sm:text-5xl lg:text-6xl">
                      {slide.title}
                    </h1>
                    <p className="mt-6 max-w-[52ch] text-base leading-relaxed text-canvas/80 sm:text-lg">
                      {slide.description}
                    </p>
                    <div className="mt-8">
                      {slide.kind === "news" ? (
                        <Link
                          to="/berita/$slug"
                          params={{ slug: slide.slug }}
                          className="inline-flex items-center gap-2 rounded-md bg-brass px-5 py-3 text-sm font-[600] text-umber-deep transition-colors hover:bg-sage"
                        >
                          Baca berita <ArrowRight className="size-4" />
                        </Link>
                      ) : slide.kind === "spmb" ? (
                        <Link to="/spmb" className="inline-flex items-center gap-2 rounded-md bg-brass px-5 py-3 text-sm font-[600] text-umber-deep transition-colors hover:bg-sage">
                          Lihat informasi SPMB <ArrowRight className="size-4" />
                        </Link>
                      ) : (
                        <a href="#focus" className="inline-flex items-center gap-2 rounded-md bg-brass px-5 py-3 text-sm font-[600] text-umber-deep transition-colors hover:bg-sage">
                          Kenali sekolah kami <ArrowRight className="size-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="absolute right-6 bottom-7 left-6 flex items-center justify-between lg:right-8 lg:bottom-9 lg:left-8">
          <div className="flex items-center gap-2" aria-label={`Slide ${active + 1} dari ${slides.length}`}>
            {slides.map((slide, index) => (
              <Button
                key={slide.id}
                type="button"
                variant="ghost"
                size="icon"
                aria-label={`Buka slide ${index + 1}`}
                aria-current={active === index ? "true" : undefined}
                onClick={() => api?.scrollTo(index)}
                className="size-8 rounded-full hover:bg-canvas/10"
              >
                <span className={`h-1.5 rounded-full transition-all ${active === index ? "w-6 bg-brass" : "w-1.5 bg-canvas/55"}`} />
              </Button>
            ))}
          </div>
          <div className="flex gap-2">
            <Button type="button" variant="ghost" size="icon" onClick={() => api?.scrollPrev()} aria-label="Slide sebelumnya" className="size-10 rounded-full bg-canvas/10 text-canvas ring-1 ring-canvas/25 hover:bg-canvas/20 hover:text-canvas">
              <ArrowLeft className="size-4" />
            </Button>
            <Button type="button" variant="ghost" size="icon" onClick={() => api?.scrollNext()} aria-label="Slide berikutnya" className="size-10 rounded-full bg-canvas/10 text-canvas ring-1 ring-canvas/25 hover:bg-canvas/20 hover:text-canvas">
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>
      </Carousel>
    </section>
  );
}