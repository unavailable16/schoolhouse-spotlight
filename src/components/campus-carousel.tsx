import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Pause, Play, Expand } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useSchoolSettings } from "@/lib/school-settings";
import { useDirectionalSlide } from "@/components/use-directional-slide";
export function CampusCarousel() {
  const { settings } = useSchoolSettings();
  const slides = settings.campus;
  const { active, direction, step } = useDirectionalSlide(slides.length);
  const [playing, setPlaying] = useState(false);
  const [photoOpen, setPhotoOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  useEffect(() => {
    setPlaying(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);
  useEffect(() => {
    if (!playing || hovered || photoOpen || slides.length < 2) return;
    const timer = window.setInterval(() => step(1), 6000);
    return () => window.clearInterval(timer);
  }, [playing, hovered, photoOpen, slides.length, step]);
  const row = slides[active];
  if (!row) return null;
  return (
    <section id="campus" className="bg-paper/60">
      <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
        <p className="text-xs uppercase tracking-[.2em] text-umber">Lingkungan sekolah</p>
        <h2 className="mt-3 font-display text-3xl text-ink lg:text-4xl">
          Kenali ruang tumbuh kami.
        </h2>
        <p className="mt-4 mb-7 max-w-2xl text-sm leading-relaxed text-ink-soft">
          Jelajahi lingkungan sekolah dan Masjid Al-Mujahidin Pamulang melalui foto serta cerita
          singkatnya.
        </p>
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onFocusCapture={() => setHovered(true)}
          onBlurCapture={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) setHovered(false);
          }}
          className="grid gap-5 lg:grid-cols-[.9fr_1.1fr]"
        >
          <div className="flex flex-col overflow-hidden rounded-3xl bg-umber-deep p-7 text-canvas lg:p-9">
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-[.2em] text-brass">Lingkungan sekolah</p>
              <button
                aria-label={playing ? "Jeda lingkungan sekolah" : "Putar lingkungan sekolah"}
                onClick={() => setPlaying(!playing)}
                className="rounded-full border border-canvas/30 p-2"
              >
                {playing ? <Pause size={15} /> : <Play size={15} />}
              </button>
            </div>
            <div
              key={row.id}
              data-slide-motion={direction}
              className="flex-1 py-8"
              aria-live={playing ? "off" : "polite"}
            >
              <p className="font-display text-6xl text-brass">0{active + 1}</p>
              <h3 className="mt-4 font-display text-3xl leading-tight">{row.title}</h3>
              <p className="mt-5 text-sm leading-relaxed text-canvas/85">{row.description}</p>
            </div>
            <div className="flex items-center justify-between border-t border-canvas/20 pt-5">
              <p className="text-xs">
                0{active + 1} / 0{slides.length}
              </p>
              <div className="flex gap-2">
                <button
                  aria-label="Foto lingkungan sebelumnya"
                  onClick={() => step(-1)}
                  className="rounded-full border border-canvas/30 p-3"
                >
                  <ArrowLeft size={17} />
                </button>
                <button
                  aria-label="Foto lingkungan berikutnya"
                  onClick={() => step(1)}
                  className="rounded-full bg-brass p-3 text-ink"
                >
                  <ArrowRight size={17} />
                </button>
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setPhotoOpen(true)}
            aria-label={`Perbesar foto ${row.label}`}
            className="flex flex-col overflow-hidden rounded-3xl border border-ink/10 bg-canvas text-left"
          >
            <div
              key={row.id}
              data-slide-motion={direction}
              className="flex h-full w-full flex-1 flex-col"
            >
              <div className="flex flex-1 items-center justify-center p-3 lg:p-5">
                <img
                  src={row.image}
                  alt={row.label}
                  loading="lazy"
                  className="max-h-[420px] w-full rounded-2xl object-contain"
                />
              </div>
              <div className="flex w-full items-center justify-between gap-4 border-t border-ink/10 px-6 py-5">
                <div>
                  <p className="text-sm font-medium">
                    {row.label}
                    {row.isIllustration ? " · Ilustrasi" : ""}
                  </p>
                  <p className="mt-1 text-xs text-ink-soft">Pilih foto untuk memperbesar</p>
                </div>
                <Expand className="shrink-0 text-umber" size={18} />
              </div>
            </div>
          </button>
        </div>
      </div>
      <Dialog open={photoOpen} onOpenChange={setPhotoOpen}>
        <DialogContent className="max-h-[90vh] max-w-5xl overflow-y-auto rounded-2xl bg-canvas">
          <DialogTitle className="pr-8">{row.label}</DialogTitle>
          <DialogDescription>Foto lingkungan sekolah.</DialogDescription>
          <img src={row.image} alt={row.label} className="max-h-[70vh] w-full object-contain" />
        </DialogContent>
      </Dialog>
    </section>
  );
}
