import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, Heart, Monitor, Sun, Users, ArrowRight } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { Accreditation } from "@/components/accreditation";
import { useSchoolSettings } from "@/lib/school-settings";
import { SchoolStats } from "@/components/school-stats";
import { ProfileFrames } from "@/components/profile-frames";
import { school, vision, missions, programs } from "@/lib/school";
import { useSiteMedia } from "@/lib/site-media";
import { teachers } from "@/lib/content";
export const Route = createFileRoute("/profil-sekolah")({
  head: () => ({
    meta: [
      { title: `Profil Sekolah — ${school.name}` },
      {
        name: "description",
        content:
          "Kenali visi, misi, program unggulan, fasilitas, dan tenaga pendidik SMP Islam Al-Mujahidin Pamulang.",
      },
    ],
  }),
  component: SchoolProfile,
});
function SchoolProfile() {
  const { settings } = useSchoolSettings();
  const profile = settings.profile;
  const { data: media } = useSiteMedia();
  return (
    <div className="bg-canvas font-body text-ink">
      <SiteHeader />
      <main>
        <section className="mx-auto grid max-w-6xl items-center gap-9 px-6 py-12 lg:grid-cols-2 lg:px-8 lg:py-20">
          <div>
            <p className="text-xs uppercase tracking-[.2em] text-umber">Profil sekolah</p>
            <h1 className="mt-4 font-display text-4xl leading-tight lg:text-5xl">
              {profile.heading}
            </h1>
            <p className="mt-6 text-base leading-relaxed text-ink-soft">{profile.description}</p>
            <p className="mt-4 text-sm text-umber">{profile.motto}</p>
            <a
              href={school.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-umber px-5 py-3 text-sm text-white"
            >
              Hubungi kami
              <ArrowRight size={16} />
            </a>
          </div>
          <ProfileFrames images={profile.images} />
        </section>
        <section className="mx-auto max-w-6xl px-6 pb-12 lg:px-8">
          <Accreditation />
          <h2 className="mt-10 mb-6 font-display text-3xl">Sekolah dalam angka</h2>
          <SchoolStats />
        </section>
        <section className="bg-paper/60">
          <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-[.8fr_1.2fr] lg:px-8">
            <div>
              <p className="text-xs uppercase tracking-[.2em] text-umber">Arah pendidikan</p>
              <h2 className="mt-3 font-display text-3xl">Visi sekolah</h2>
              <p className="mt-6 text-xl leading-relaxed text-ink">{profile.vision}</p>
            </div>
            <div>
              <h2 className="font-display text-3xl">Misi sekolah</h2>
              <div className="mt-6 space-y-4">
                {profile.missions.map((row, i) => (
                  <article
                    key={row.title}
                    className="flex gap-4 rounded-2xl border border-umber/10 bg-canvas p-5"
                  >
                    <span className="font-display text-xl text-umber">0{i + 1}</span>
                    <div>
                      <h3 className="text-base font-medium">{row.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-ink-soft">{row.text}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
          <p className="text-xs uppercase tracking-[.2em] text-umber">Ruang pengembangan diri</p>
          <h2 className="mt-3 font-display text-3xl">Program unggulan</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {programs.map((row, i) => {
              const Icon = [Monitor, Sun, BookOpen][i] ?? BookOpen;
              return (
                <article
                  key={row.name}
                  className="rounded-2xl border border-umber/10 bg-paper/50 p-6"
                >
                  <img
                    src={
                      media?.programs.find((x) => x.id === ["multimedia", "subuh", "tahfidz"][i])
                        ?.image || `/brand/program-${["multimedia", "subuh", "tahfidz"][i]}.svg`
                    }
                    alt={`Gambar program ${row.name}`}
                    className="mb-5 aspect-[16/10] w-full rounded-xl object-cover"
                  />
                  {(
                    media?.programs.find((x) => x.id === ["multimedia", "subuh", "tahfidz"][i])
                      ?.image || "default.svg"
                  ).endsWith(".svg") && (
                    <p className="mb-4 text-xs text-ink-soft">Ilustrasi program</p>
                  )}
                  <Icon size={26} className="text-umber" />
                  <h3 className="mt-5 font-display text-2xl">{row.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">{row.description}</p>
                </article>
              );
            })}
          </div>
        </section>
        <section className="border-y border-umber/10 bg-paper/60">
          <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
            <h2 className="font-display text-3xl">Sarana dan prasarana</h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-3">
              {[
                { title: "UKS", Icon: Heart },
                { title: "Kantin", Icon: Users },
                { title: "Sarana olahraga", Icon: Sun },
              ].map(({ title, Icon }, i) => (
                <div
                  key={title}
                  className="overflow-hidden rounded-2xl border border-umber/10 bg-canvas p-5"
                >
                  <img
                    src={
                      media?.facilities.find((x) => x.id === ["uks", "kantin", "olahraga"][i])
                        ?.image || `/brand/fasilitas-${["uks", "kantin", "olahraga"][i]}.svg`
                    }
                    alt={`Gambar fasilitas ${title}`}
                    className="mb-4 aspect-[16/10] w-full rounded-xl object-cover"
                  />
                  {(
                    media?.facilities.find((x) => x.id === ["uks", "kantin", "olahraga"][i])
                      ?.image || "default.svg"
                  ).endsWith(".svg") && (
                    <p className="mb-4 text-xs text-ink-soft">Ilustrasi fasilitas</p>
                  )}
                  <Icon className="text-umber" size={23} />
                  <h3 className="font-display text-xl">{title}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="text-xs uppercase tracking-[.2em] text-umber">Pendamping belajar</p>
              <h2 className="mt-3 font-display text-3xl">Tenaga pendidik</h2>
            </div>
            <Link to="/guru" className="text-sm text-umber">
              Kenali semua pendidik →
            </Link>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {teachers.slice(0, 4).map((row) => (
              <article
                key={row.name}
                className="overflow-hidden rounded-2xl border border-umber/10 bg-paper/50"
              >
                <img
                  src={row.photo}
                  alt={`Foto ${row.name}`}
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover object-top"
                />
                <div className="p-4">
                  <h3 className="text-sm font-medium">{row.name}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-ink-soft">{row.role}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
