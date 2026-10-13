import { SpmbAnnouncement } from "@/components/spmb-announcement";
import { useTextReveal } from "@/components/use-text-reveal";
import { Link } from "@tanstack/react-router";
import { SchoolMap } from "@/components/school-map";
import { MobileNavigation } from "@/components/mobile-navigation";
import { school } from "@/lib/school";
import { useSchoolSettings } from "@/lib/school-settings";
import { Mail } from "lucide-react";
import { SocialIcon } from "@/components/social-icon";

const navCls = "transition-colors hover:text-ink";

export function SiteHeader() {
  useTextReveal();
  return (
    <header
      data-site-header
      className="bg-canvas/85 sticky top-0 z-30 border-b border-ink/10 backdrop-blur-md"
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <img
            src={school.logo}
            alt="Logo SMP Islam Al-Mujahidin"
            className="h-12 w-11 shrink-0 object-contain"
          />
          <span className="max-w-[190px] font-display text-sm leading-tight font-[560] tracking-tight text-ink lg:max-w-[220px] lg:text-base">
            SMP Islam Al-Mujahidin Pamulang
          </span>
        </Link>
        <nav className="hidden items-center gap-4 font-body text-[13px] text-ink-soft lg:flex">
          <Link
            to="/"
            className={navCls}
            activeOptions={{ exact: true }}
            activeProps={{ className: "text-ink font-[500]" }}
          >
            Beranda
          </Link>
          <Link
            to="/profil-sekolah"
            className={navCls}
            activeProps={{ className: "text-ink font-medium" }}
          >
            Profil Sekolah
          </Link>
          <Link to="/guru" className={navCls} activeProps={{ className: "text-ink font-[500]" }}>
            Tenaga Pendidik
          </Link>
          <Link
            to="/kegiatan"
            className={navCls}
            activeProps={{ className: "text-ink font-[500]" }}
          >
            Kegiatan
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
          className="hidden rounded-[min(1vw,10px)] bg-umber lg:block px-4 py-2 font-body text-sm font-[500] text-canvas ring-1 ring-umber-deep/40 transition-colors hover:bg-umber-deep"
        >
          Daftar
        </Link>
        <MobileNavigation />
      </div>
      <SpmbAnnouncement />
    </header>
  );
}

export function SiteFooter() {
  const { settings } = useSchoolSettings();
  return (
    <footer className="border-t border-umber/15 bg-umber-deep font-body text-canvas">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-14 md:grid-cols-2 lg:px-8">
        <div>
          <div className="flex items-center gap-4">
            <img
              src={school.logo}
              alt="Logo sekolah"
              className="h-20 w-20 rounded-xl bg-canvas p-2 object-contain"
            />
            <span className="max-w-xs font-display text-xl">{school.name}</span>
          </div>
          <p className="mt-5 font-display text-2xl text-brass">{settings.profile.motto}</p>
          <h2 className="mt-8 text-xs uppercase tracking-[.2em] text-brass">Hubungi kami</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {[
              {
                name: "whatsapp" as const,
                label: school.phone,
                detail: "WhatsApp",
                href: school.whatsapp,
              },
              {
                name: "instagram" as const,
                label: "@smpaldinofficial",
                detail: "Instagram",
                href: school.instagram,
              },
              {
                name: "youtube" as const,
                label: "Al-Din 2012 Channel",
                detail: "YouTube",
                href: school.youtube,
              },
            ].map((item) => (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-xl border border-canvas/15 bg-canvas/10 p-3 transition-colors hover:bg-canvas/20"
              >
                <SocialIcon name={item.name} className="size-5 shrink-0 text-brass" />
                <span>
                  <span className="block text-xs text-canvas/80">{item.detail}</span>
                  <span className="text-xs font-medium">{item.label}</span>
                </span>
              </a>
            ))}
            <a
              href={school.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl border border-canvas/15 bg-canvas/10 p-3"
            >
              <SocialIcon name="tiktok" className="size-5 shrink-0 text-brass" />
              <span>
                <span className="block text-xs text-canvas/80">TikTok</span>
                <span className="text-xs font-medium">@aldinreal</span>
              </span>
            </a>
          </div>
          <a
            href={`mailto:${school.email}`}
            className="mt-5 inline-flex items-center gap-2 break-all text-sm text-canvas/80 hover:text-brass"
          >
            <Mail className="size-5 shrink-0" aria-hidden="true" />
            {school.email}
          </a>
        </div>
        <div className="min-w-0">
          <h2 className="mb-4 text-xs uppercase tracking-[.2em] text-brass">Kunjungi kami</h2>
          <SchoolMap />
          <address className="mt-4 text-sm leading-relaxed text-canvas/80 not-italic">
            {school.address}
          </address>
        </div>
      </div>
      <div className="border-t border-canvas/15">
        <div className="mx-auto max-w-6xl px-6 py-5 text-xs text-canvas/80 lg:px-8">
          © {new Date().getFullYear()} {school.name}.
        </div>
      </div>
    </footer>
  );
}
