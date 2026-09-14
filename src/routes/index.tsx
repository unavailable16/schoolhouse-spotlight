import { createFileRoute } from "@tanstack/react-router";

import bookShelf from "@/assets/book-shelf.jpg";
import courtyard from "@/assets/courtyard.jpg";
import libraryTables from "@/assets/library-tables.jpg";
import readingRoom from "@/assets/reading-room.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aldergrove School — Lumen et Labor" },
      {
        name: "description",
        content:
          "Aldergrove is an independent day and sixth-form school in Wexford for ages 11–18, teaching students to read closely and argue fairly.",
      },
      { property: "og:title", content: "Aldergrove School — Lumen et Labor" },
      {
        property: "og:description",
        content:
          "An independent day and sixth-form school in Wexford. Small classes, four disciplines, one standard.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const focusAreas = [
  {
    n: "01",
    title: "The Written Word",
    body: "Composition, rhetoric and close reading from Year 7 to A-Level.",
  },
  {
    n: "02",
    title: "The Natural World",
    body: "Biology, chemistry and our on-site botany garden and wetland.",
  },
  {
    n: "03",
    title: "The Making Hand",
    body: "Design & technology, print workshop and a small craft studio.",
  },
  {
    n: "04",
    title: "The Shared Table",
    body: "Music, debate and the weekly cross-year common room discussion.",
  },
];

const advantages = [
  {
    stat: "1:9",
    title: "Teacher to student",
    body: "Small enough that every name is known and every essay is read twice.",
  },
  {
    stat: "62%",
    title: "Top universities",
    body: "Roxburgh, Ellsworth and Aldermere among our most recent placements.",
  },
  {
    stat: "140",
    title: "Acres of quiet",
    body: "Woodland, wetland and walled garden within a short walk of class.",
  },
  {
    stat: "1 in 3",
    title: "Earn a bursary",
    body: "Meaningful aid so that talent, not circumstance, decides who attends.",
  },
];

const stats = [
  { value: "126", label: "Students per year group" },
  { value: "38", label: "Full-time teachers" },
  { value: "94%", label: "Return for Sixth Form" },
  { value: "2019", label: "Most recent building" },
];

function Index() {
  return (
    <div className="bg-canvas">
      <header className="bg-canvas/85 sticky top-0 z-30 border-b border-ink/10 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <span className="grid size-9 place-items-center rounded-full bg-umber font-display text-lg font-[620] text-canvas">
              A
            </span>
            <span className="font-display text-lg leading-none font-[560] tracking-tight text-ink">
              Aldergrove
            </span>
          </div>
          <nav className="hidden items-center gap-8 font-body text-sm text-ink-soft md:flex">
            <a href="#focus" className="transition-colors hover:text-ink">
              Academics
            </a>
            <a href="#campus" className="transition-colors hover:text-ink">
              Campus Life
            </a>
            <a href="#admissions" className="transition-colors hover:text-ink">
              Admissions
            </a>
            <a href="#admissions" className="transition-colors hover:text-ink">
              Visit
            </a>
          </nav>
          <a
            href="#admissions"
            className="rounded-[min(1vw,10px)] bg-umber px-4 py-2 font-body text-sm font-[500] text-canvas ring-1 ring-umber-deep/40 transition-colors hover:bg-umber-deep"
          >
            Apply
          </a>
        </div>
      </header>

      <main className="font-body text-ink">
        <section className="relative overflow-hidden bg-canvas">
          <div className="glow pointer-events-none absolute inset-0" />
          <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-6 pt-16 pb-20 lg:grid-cols-12 lg:px-8 lg:pt-24 lg:pb-28">
            <div className="absolute top-4 right-32 z-10 hidden h-[68%] w-[46%] lg:block">
              <div className="panel bg-paper/70 absolute inset-0 overflow-hidden rounded-[min(2vw,20px)] shadow-[0_30px_60px_-30px_rgba(34,28,18,.45)] ring-1 ring-ink/10 backdrop-blur-md">
                <div className="panel-inner absolute inset-0 grid place-items-end p-8">
                  <div className="max-w-[30ch]">
                    <p className="mb-3 font-body text-[11px] tracking-[0.22em] uppercase text-umber">
                      Est. 1898 · Wexford
                    </p>
                    <p className="font-display text-2xl leading-tight font-[560] text-ink">
                      A quiet place to think loudly.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative z-20 lg:col-span-7">
              <p className="rise d1 mb-5 font-body text-xs tracking-[0.24em] uppercase text-umber">
                Independent Day &amp; Sixth-Form School · Ages 11–18
              </p>
              <h1 className="rise d2 max-w-[17ch] font-display text-4xl leading-tight font-[620] tracking-tight text-balance text-ink sm:text-5xl lg:text-6xl">
                Lumen et Labor
              </h1>
              <p className="rise d3 mt-6 max-w-[46ch] font-body text-base leading-relaxed text-ink-soft sm:text-lg">
                Light, and the work it makes possible. For a century we have taught students to read
                closely, argue fairly, and carry their ideas into a wider world.
              </p>
              <div className="rise d4 mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#admissions"
                  className="inline-flex items-center gap-2 rounded-[min(1vw,10px)] bg-umber px-4 py-2 font-body text-sm font-[500] text-canvas ring-1 ring-umber-deep/40 transition-colors hover:bg-umber-deep"
                >
                  Book a taster day
                </a>
                <a
                  href="#focus"
                  className="inline-flex items-center gap-2 font-body text-sm font-[500] text-ink transition-colors hover:text-umber"
                >
                  Explore our focus →
                </a>
              </div>
            </div>

            <div className="relative z-20 lg:col-span-5">
              <div className="rise d3">
                <img
                  src={readingRoom}
                  alt="Morning light through tall library windows over long oak reading tables"
                  width={1088}
                  height={1360}
                  className="aspect-[4/5] w-full rounded-[min(1.6vw,16px)] bg-paper object-cover outline-1 -outline-offset-1 outline-black/5"
                />
                <p className="mt-3 font-body text-xs leading-snug text-ink-soft">
                  The Reading Room, Aldergrove Library — open until 7pm on term nights.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="focus" className="bg-paper">
          <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-28">
            <div className="grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <p className="mb-4 font-body text-xs tracking-[0.24em] uppercase text-umber">
                  What we focus on
                </p>
                <h2 className="max-w-[16ch] font-display text-3xl leading-tight font-[620] tracking-tight text-balance text-ink">
                  Four disciplines, one standard.
                </h2>
                <p className="mt-5 max-w-[40ch] font-body text-base leading-relaxed text-ink-soft">
                  Programme leadership is taught not as a list of subjects but as a set of habits of
                  mind, practised daily and assessed honestly.
                </p>
              </div>
              <div className="divide-y divide-ink/10 lg:col-span-8">
                {focusAreas.map((f, i) => (
                  <a
                    key={f.n}
                    href="#admissions"
                    className={`group flex items-baseline justify-between gap-6 py-6 ${i === 0 ? "border-t border-ink/10" : ""}`}
                  >
                    <div className="flex items-baseline gap-5">
                      <span className="w-8 shrink-0 font-display text-sm text-umber">{f.n}</span>
                      <div>
                        <h3 className="font-display text-2xl font-[560] tracking-tight text-ink transition-colors group-hover:text-umber">
                          {f.title}
                        </h3>
                        <p className="mt-1 max-w-[52ch] font-body text-sm text-ink-soft">{f.body}</p>
                      </div>
                    </div>
                    <span className="shrink-0 font-body text-sm text-ink-soft">→</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-canvas">
          <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-28">
            <p className="mb-4 font-body text-xs tracking-[0.24em] uppercase text-umber">
              Why families choose Aldergrove
            </p>
            <h2 className="max-w-[20ch] font-display text-3xl leading-tight font-[620] tracking-tight text-balance text-ink lg:text-4xl">
              A small school, deliberately so.
            </h2>
            <div className="mt-12 grid gap-px overflow-hidden rounded-[min(1.4vw,14px)] bg-ink/10 ring-1 ring-ink/10 sm:grid-cols-2 lg:grid-cols-4">
              {advantages.map((a) => (
                <div key={a.title} className="bg-canvas p-7">
                  <span className="font-display text-2xl text-umber">{a.stat}</span>
                  <h3 className="mt-4 font-display text-lg font-[560] tracking-tight text-ink">
                    {a.title}
                  </h3>
                  <p className="mt-2 font-body text-sm leading-relaxed text-ink-soft">{a.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="campus" className="bg-ink text-canvas">
          <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-24">
            <div className="grid items-end gap-8 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <p className="mb-4 font-body text-xs tracking-[0.24em] uppercase text-brass">
                  Campus life
                </p>
                <h2 className="max-w-[18ch] font-display text-3xl leading-tight font-[620] tracking-tight text-balance">
                  The hush of a well-kept reading room.
                </h2>
              </div>
              <div className="grid grid-cols-2 gap-4 lg:col-span-7">
                <img
                  src={libraryTables}
                  alt="Students reading at a long wooden table beneath arched library windows"
                  loading="lazy"
                  width={1088}
                  height={720}
                  className="bg-paper/15 col-span-2 aspect-[16/10] w-full rounded-[min(1.6vw,16px)] object-cover outline-1 -outline-offset-1 outline-white/10"
                />
                <img
                  src={bookShelf}
                  alt="Hands shelving a leather-bound book on a tall oak shelf"
                  loading="lazy"
                  width={816}
                  height={816}
                  className="bg-paper/15 aspect-square w-full rounded-[min(1.6vw,16px)] object-cover outline-1 -outline-offset-1 outline-white/10"
                />
                <img
                  src={courtyard}
                  alt="Quiet school courtyard with a stone bench and autumn trees"
                  loading="lazy"
                  width={816}
                  height={816}
                  className="bg-paper/15 aspect-square w-full rounded-[min(1.6vw,16px)] object-cover outline-1 -outline-offset-1 outline-white/10"
                />
              </div>
            </div>

            <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 border-t border-canvas/15 pt-10 md:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="font-display text-4xl font-[620] tracking-tight text-brass">
                    {s.value}
                  </p>
                  <p className="mt-1 font-body text-sm text-canvas/70">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="admissions" className="bg-canvas">
          <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-28">
            <div className="relative overflow-hidden rounded-[min(2vw,20px)] bg-umber px-8 py-14 text-canvas ring-1 ring-umber-deep/40 lg:px-16">
              <div className="glow pointer-events-none absolute inset-0" />
              <div className="relative max-w-[46ch]">
                <p className="mb-4 font-body text-xs tracking-[0.24em] uppercase text-brass">
                  Admissions 2026
                </p>
                <h2 className="font-display text-3xl leading-tight font-[620] tracking-tight text-balance lg:text-4xl">
                  Come and see the light for yourself.
                </h2>
                <p className="mt-5 max-w-[52ch] font-body text-base leading-relaxed text-canvas/80">
                  Our autumn open day is Saturday 14 November. Sit in a class, browse the reading
                  room, meet the head and the staff who teach it.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <a
                    href="mailto:admissions@aldergrove.example"
                    className="inline-flex items-center gap-2 rounded-[min(1vw,10px)] bg-canvas px-4 py-2 font-body text-sm font-[500] text-umber-deep ring-1 ring-canvas/40 transition-colors hover:bg-canvas/90"
                  >
                    Reserve a place
                  </a>
                  <a
                    href="tel:+442079460112"
                    className="inline-flex items-center gap-2 font-body text-sm font-[500] text-canvas transition-colors hover:text-brass"
                  >
                    Talk to our registrar →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-ink text-canvas">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-2 lg:px-8">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-full bg-brass font-display text-lg font-[620] text-umber-deep">
                A
              </span>
              <span className="font-display text-lg leading-none font-[560] tracking-tight">
                Aldergrove
              </span>
            </div>
            <p className="mt-6 font-display text-2xl tracking-tight text-brass">Lumen et Labor</p>
            <p className="mt-2 font-body text-sm text-canvas/60">
              Light, and the work it makes possible.
            </p>
          </div>
          <div className="md:justify-self-end">
            <p className="mb-4 font-body text-xs tracking-[0.24em] uppercase text-canvas/50">
              Visit or write
            </p>
            <address className="font-body text-sm leading-relaxed text-canvas/80 not-italic">
              4 Reading Lane, Wexford, WD1 4QZ
              <br />
              <a href="tel:+442079460112" className="transition-colors hover:text-brass">
                +44 20 7946 0112
              </a>
              <br />
              <a
                href="mailto:admissions@aldergrove.example"
                className="transition-colors hover:text-brass"
              >
                admissions@aldergrove.example
              </a>
            </address>
          </div>
        </div>
        <div className="border-t border-canvas/10">
          <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-3 px-6 py-6 sm:flex-row sm:items-center lg:px-8">
            <p className="font-body text-xs text-canvas/50">
              © 2026 Aldergrove School. A registered independent school.
            </p>
            <p className="font-body text-xs text-canvas/50">Safeguarding · Equality · Privacy</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
