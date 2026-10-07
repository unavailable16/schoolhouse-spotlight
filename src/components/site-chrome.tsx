import { Link } from "@tanstack/react-router";

const navCls = "transition-colors hover:text-ink";

export function SiteHeader() {
  return (
    <header className="bg-canvas/85 sticky top-0 z-30 border-b border-ink/10 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <span className="grid size-9 place-items-center rounded-full bg-umber font-display text-lg font-[620] text-canvas">
            A
          </span>
          <span className="font-display text-lg leading-none font-[560] tracking-tight text-ink">
            Aldergrove
          </span>
        </Link>
        <nav className="hidden items-center gap-8 font-body text-sm text-ink-soft md:flex">
          <Link to="/" className={navCls} activeOptions={{ exact: true }} activeProps={{ className: "text-ink font-[500]" }}>
            Beranda
          </Link>
          <Link to="/guru" className={navCls} activeProps={{ className: "text-ink font-[500]" }}>
            Tenaga Pendidik
          </Link>
          <Link to="/berita" className={navCls} activeProps={{ className: "text-ink font-[500]" }}>
            Berita
          </Link>
          <Link to="/spmb" className={navCls} activeProps={{ className: "text-ink font-[500]" }}>
            SPMB
          </Link>
        </nav>
        <Link
          to="/spmb"
          className="rounded-[min(1vw,10px)] bg-umber px-4 py-2 font-body text-sm font-[500] text-canvas ring-1 ring-umber-deep/40 transition-colors hover:bg-umber-deep"
        >
          Daftar
        </Link>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-ink text-canvas">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-2 lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid size-9 place-items-center rounded-full bg-brass font-display text-lg font-[620] text-umber-deep">
              A
            </span>
            <span className="font-display text-lg leading-none font-[560] tracking-tight">Aldergrove</span>
          </div>
          <p className="mt-6 font-display text-2xl tracking-tight text-brass">Lumen et Labor</p>
          <p className="mt-2 font-body text-sm text-canvas/60">Cahaya, dan kerja keras yang lahir darinya.</p>
        </div>
        <div className="md:justify-self-end">
          <p className="mb-4 font-body text-xs tracking-[0.24em] uppercase text-canvas/50">Kunjungi atau hubungi kami</p>
          <address className="font-body text-sm leading-relaxed text-canvas/80 not-italic">
            Jl. Pustaka No. 4, Bandung 40115
            <br />
            <a href="tel:+62221234567" className="transition-colors hover:text-brass">+62 22 123 4567</a>
            <br />
            <a href="mailto:admissions@aldergrove.example" className="transition-colors hover:text-brass">
              admissions@aldergrove.example
            </a>
          </address>
        </div>
      </div>
      <div className="border-t border-canvas/10">
        <div className="mx-auto max-w-6xl px-6 py-6 font-body text-xs text-canvas/50 lg:px-8">
          © 2026 Sekolah Aldergrove. Sekolah swasta terakreditasi A.
        </div>
      </div>
    </footer>
  );
}
