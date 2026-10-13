import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { ArrowUpRight, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const links = [
  { to: "/", label: "Beranda" },
  { to: "/profil-sekolah", label: "Profil Sekolah" },
  { to: "/guru", label: "Tenaga Pendidik" },
  { to: "/kegiatan", label: "Kegiatan" },
  { to: "/berita", label: "Berita" },
  { to: "/spmb", label: "SPMB" },
] as const;

export function MobileNavigation() {
  const [open, setOpen] = useState(false);
  const pathname = useLocation({ select: (location) => location.pathname });
  const gesture = useRef<{ x: number; y: number; time: number } | null>(null);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const resize = () => {
      gesture.current = null;
      if (desktop.matches) setOpen(false);
    };
    desktop.addEventListener("change", resize);
    function start(event: TouchEvent) {
      gesture.current = null;
      if (desktop.matches || event.touches.length !== 1) return;
      const touch = event.touches[0];
      if (!touch || (!open && window.innerWidth - touch.clientX > 32)) return;
      gesture.current = { x: touch.clientX, y: touch.clientY, time: Date.now() };
    }
    function end(event: TouchEvent) {
      const initial = gesture.current;
      gesture.current = null;
      const touch = event.changedTouches[0];
      if (!initial || !touch || desktop.matches || Date.now() - initial.time > 800) return;
      const dx = touch.clientX - initial.x;
      const dy = Math.abs(touch.clientY - initial.y);
      if (dy > 50 || Math.abs(dx) < 60 || Math.abs(dx) < dy * 1.5) return;
      if (!open && dx < 0) setOpen(true);
      if (open && dx > 0) setOpen(false);
    }
    const cancel = () => {
      gesture.current = null;
    };
    window.addEventListener("touchstart", start, { passive: true });
    window.addEventListener("touchend", end, { passive: true });
    window.addEventListener("touchcancel", cancel, { passive: true });
    return () => {
      desktop.removeEventListener("change", resize);
      window.removeEventListener("touchstart", start);
      window.removeEventListener("touchend", end);
      window.removeEventListener("touchcancel", cancel);
    };
  }, [open]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          aria-label="Buka menu navigasi"
          className="grid size-11 shrink-0 place-items-center rounded-xl border border-ink/15 text-ink transition-colors hover:bg-paper focus-visible:outline-2 focus-visible:outline-umber lg:hidden"
        >
          <Menu size={22} />
        </button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="flex h-dvh w-[min(85vw,360px)] flex-col overflow-y-auto border-ink/10 bg-canvas p-6 font-body text-ink motion-reduce:animate-none lg:hidden"
      >
        <div className="mt-7 border-b border-ink/10 pb-6">
          <p className="text-xs uppercase tracking-[.2em] text-umber">SMP Islam Al-Mujahidin</p>
          <SheetTitle className="mt-3 font-display text-3xl font-normal text-ink">
            Jelajahi sekolah
          </SheetTitle>
          <SheetDescription className="mt-3 text-sm text-ink-soft">
            Informasi, kegiatan, dan kabar sekolah.
          </SheetDescription>
        </div>
        <nav aria-label="Navigasi mobile" className="mt-4 space-y-2">
          {links.map((link, index) => (
            <Link
              key={link.to}
              to={link.to}
              activeOptions={{ exact: link.to === "/" }}
              activeProps={{ className: "bg-paper font-medium text-umber" }}
              onClick={() => setOpen(false)}
              className="flex items-center gap-4 rounded-xl px-4 py-4 text-sm transition-colors hover:bg-paper"
            >
              <span className="text-xs text-ink-soft/60">{String(index + 1).padStart(2, "0")}</span>
              <span className="flex-1">{link.label}</span>
              <ArrowUpRight size={17} />
            </Link>
          ))}
        </nav>
        <div className="mt-auto pt-8">
          <Link
            to="/spmb"
            onClick={() => setOpen(false)}
            className="block rounded-xl bg-umber px-5 py-3 text-center text-sm font-medium text-canvas hover:bg-umber-deep"
          >
            Daftar siswa baru
          </Link>
          <p className="mt-4 text-center text-xs text-ink-soft">
            Geser ke kanan untuk menutup menu.
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
