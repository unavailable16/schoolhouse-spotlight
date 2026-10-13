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
import { useNews } from "@/hooks/use-news";
import { selectLatestNews, selectPinnedNews } from "@/lib/news-selection";
import { displayPublishDate } from "@/lib/news-api";
import { useSchoolSettings } from "@/lib/school-settings";
import { school } from "@/lib/school";

export function SchoolCarousel({ compact = false }: { compact?: boolean }) {
  const { data: news = [] } = useNews();
  const { settings } = useSchoolSettings();
  const baseSlides = [
    {
      ...settings.profile.carousel,
      id: "school",
      imageAlt: settings.profile.carousel.title,
      kind: "school" as const,
    },
    {
      ...settings.spmb.carousel,
      id: "spmb",
      imageAlt: settings.spmb.carousel.title,
      kind: "spmb" as const,
    },
  ];
  const highlighted = compact ? selectLatestNews(news, 5) : selectPinnedNews(news);
  const slides = [
    ...highlighted.map((item) => ({
      id: item.slug,
      eyebrow: `${compact ? item.category : "Sorotan pilihan"} · ${displayPublishDate(item.date)}`,
      title: item.title,
      description: item.excerpt,
      image: item.image,
      imageAlt: item.title,
      kind: "news" as const,
      slug: item.slug,
    })),
    ...(compact ? [] : baseSlides),
  ];
  const Heading = compact ? "h2" : "h1";
  const [api, setApi] = useState<CarouselApi>();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!api) return;
    const update = () => setActive(api.selectedScrollSnap());
    update();
    api.on("select", update);
    api.on("reInit", update);
    return () => {
      api.off("select", update);
      api.off("reInit", update);
    };
  }, [api]);

  useEffect(() => {
    if (!api || paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => api.scrollNext(), 6500);
    return () => window.clearInterval(timer);
  }, [api, paused]);

  if (!slides.length)
    return (
      <div className="rounded-2xl border border-ink/10 bg-canvas p-8 text-sm text-ink-soft">
        Belum ada berita yang diterbitkan untuk sorotan.
      </div>
    );

  return (
    <section
      aria-label="Sorotan SMP Islam Al-Mujahidin Pamulang"
      className={compact ? "overflow-hidden rounded-3xl bg-umber-deep" : "bg-umber-deep"}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <Carousel setApi={setApi} opts={{ loop: true }} className="mx-auto max-w-[1600px]">
        <CarouselContent className="ml-0">
          {slides.map((slide, index) => (
            <CarouselItem key={slide.id} className="pl-0">
              <div
                className={`relative overflow-hidden ${compact ? "min-h-[510px] lg:min-h-[470px]" : "min-h-[calc(100svh-4rem)] lg:min-h-[680px]"}`}
              >
                <img
                  src={slide.image}
                  alt={slide.imageAlt}
                  className="absolute inset-0 h-full w-full object-cover"
                  fetchPriority={index === 0 ? "high" : "auto"}
                />
                <div className="absolute inset-0 bg-[linear-gradient(90deg,color-mix(in_oklab,var(--umber-deep)_86%,transparent)_0%,color-mix(in_oklab,var(--umber-deep)_64%,transparent)_52%,color-mix(in_oklab,var(--umber-deep)_12%,transparent)_100%)]" />
                <div
                  className={`relative mx-auto flex max-w-6xl items-center px-6 pt-12 pb-28 lg:px-8 ${compact ? "min-h-[510px] lg:min-h-[470px]" : "min-h-[calc(100svh-4rem)] lg:min-h-[680px]"}`}
                >
                  <div className="max-w-2xl text-canvas">
                    <p className="mb-5 flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-brass">
                      {slide.kind === "spmb" ? <CalendarDays className="size-4" /> : null}
                      {slide.kind === "news" ? <Newspaper className="size-4" /> : null}
                      {slide.eyebrow}
                    </p>
                    <Heading
                      className={`max-w-[22ch] font-display leading-tight font-[620] text-balance ${compact ? "text-3xl lg:text-4xl" : "text-4xl sm:text-5xl lg:text-6xl"}`}
                    >
                      {slide.title}
                    </Heading>
                    <p className="mt-6 max-w-[52ch] text-base leading-relaxed text-canvas/80 sm:text-lg">
                      {slide.description}
                    </p>
                    <div className="mt-8">
                      {slide.kind === "news" ? (
                        <Link
                          to="/berita/$slug"
                          params={{ slug: "slug" in slide ? slide.slug : "" }}
                          className="inline-flex items-center gap-2 rounded-md bg-brass px-5 py-3 text-sm font-[600] text-umber-deep transition-colors hover:bg-sage"
                        >
                          Baca berita <ArrowRight className="size-4" />
                        </Link>
                      ) : slide.kind === "spmb" ? (
                        <Link
                          to="/spmb"
                          className="inline-flex items-center gap-2 rounded-md bg-brass px-5 py-3 text-sm font-[600] text-umber-deep transition-colors hover:bg-sage"
                        >
                          Lihat informasi SPMB <ArrowRight className="size-4" />
                        </Link>
                      ) : (
                        <Link
                          to="/profil-sekolah"
                          className="inline-flex items-center gap-2 rounded-md bg-brass px-5 py-3 text-sm font-[600] text-umber-deep transition-colors hover:bg-sage"
                        >
                          Kenali sekolah kami <ArrowRight className="size-4" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="absolute right-6 bottom-7 left-6 flex items-center justify-between lg:right-8 lg:bottom-9 lg:left-8">
          <div
            className="flex items-center gap-2"
            aria-label={`Slide ${active + 1} dari ${slides.length}`}
          >
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
                <span
                  className={`h-1.5 rounded-full transition-all ${active === index ? "w-6 bg-brass" : "w-1.5 bg-canvas/55"}`}
                />
              </Button>
            ))}
          </div>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => api?.scrollPrev()}
              aria-label="Slide sebelumnya"
              className="size-10 rounded-full bg-canvas/10 text-canvas ring-1 ring-canvas/25 hover:bg-canvas/20 hover:text-canvas"
            >
              <ArrowLeft className="size-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => api?.scrollNext()}
              aria-label="Slide berikutnya"
              className="size-10 rounded-full bg-canvas/10 text-canvas ring-1 ring-canvas/25 hover:bg-canvas/20 hover:text-canvas"
            >
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>
      </Carousel>
    </section>
  );
}
