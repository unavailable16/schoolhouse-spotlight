import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Pause, Play, Clock3 } from "lucide-react";
import { useDirectionalSlide } from "@/components/use-directional-slide";
import type { SchoolSchedule } from "@/lib/activities";
export function ScheduleCarousel({ items }: { items: SchoolSchedule[] }) {
  const { active, direction, step, goTo } = useDirectionalSlide(items.length);
  const [playing, setPlaying] = useState(false);
  const [hovered, setHovered] = useState(false);
  useEffect(() => {
    setPlaying(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);
  useEffect(() => {
    if (!playing || hovered || items.length < 2) return;
    const timer = window.setInterval(() => step(1), 5000);
    return () => window.clearInterval(timer);
  }, [playing, hovered, items.length, step]);
  if (!items.length)
    return (
      <div className="rounded-3xl bg-umber-deep p-8 text-canvas">
        Jadwal sekolah belum tersedia.
      </div>
    );
  const item = items[active];
  if (!item) return null;
  return (
    <section
      aria-label="Carousel jadwal sekolah"
      aria-roledescription="carousel"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setHovered(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setHovered(false);
      }}
      className="flex h-full flex-col overflow-hidden rounded-3xl bg-umber-deep p-7 text-canvas lg:p-9"
    >
      <div className="flex items-center justify-between">
        <p className="flex items-center gap-2 text-xs uppercase tracking-[.16em] text-canvas/75">
          <Clock3 size={16} />
          Ritme keseharian
        </p>
        <button
          aria-label={playing ? "Jeda carousel" : "Putar carousel"}
          aria-pressed={!playing}
          onClick={() => setPlaying(!playing)}
          className="rounded-full border border-canvas/25 p-2"
        >
          {playing ? <Pause size={16} /> : <Play size={16} />}
        </button>
      </div>
      <div
        key={item.id}
        data-slide-motion={direction}
        aria-live={playing ? "off" : "polite"}
        aria-atomic="true"
        className="flex-1 py-8"
      >
        <p className="font-display text-6xl tracking-tight text-brass lg:text-7xl">
          {item.time.replace(":", ".")}
        </p>
        <h2 className="mt-4 max-w-md font-display text-3xl leading-tight lg:text-4xl">
          {item.title}
        </h2>
        <p className="mt-5 max-w-md text-sm leading-relaxed text-canvas/80">{item.description}</p>
      </div>
      <div className="flex items-center justify-between gap-4 border-t border-canvas/20 pt-5">
        <p className="text-xs text-canvas/65">
          {String(active + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
        </p>
        <div className="flex gap-2">
          <button
            aria-label="Jadwal sebelumnya"
            onClick={() => step(-1)}
            className="rounded-full border border-canvas/30 p-3"
          >
            <ArrowLeft size={18} />
          </button>
          <button
            aria-label="Jadwal berikutnya"
            onClick={() => step(1)}
            className="rounded-full bg-brass p-3 text-ink"
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        {items.map((row, i) => (
          <button
            key={row.id}
            aria-label={`Tampilkan ${row.time} ${row.title}`}
            aria-current={active === i ? "true" : undefined}
            onClick={() => goTo(i)}
            className={`h-1.5 w-5 rounded-full ${active === i ? "bg-brass" : "bg-canvas/25"}`}
          />
        ))}
      </div>
    </section>
  );
}
