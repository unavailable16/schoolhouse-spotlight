import { teachers } from "@/lib/content";
export function HeadmasterWelcome() {
  const headmaster = teachers[0];
  if (!headmaster) return null;
  return (
    <section className="bg-canvas">
      <div className="mx-auto grid max-w-6xl items-center gap-9 px-6 py-16 lg:grid-cols-[.7fr_1.3fr] lg:px-8 lg:py-20">
        <div className="relative mx-auto w-full max-w-sm overflow-hidden rounded-3xl border border-umber/15 bg-paper">
          <img
            src={headmaster.photo}
            alt={`Foto ${headmaster.name}`}
            loading="lazy"
            className="aspect-[4/5] w-full object-cover object-top"
          />
          <div className="bg-white p-5">
            <p className="font-display text-xl text-ink">{headmaster.name}</p>
            <p className="mt-1 text-xs text-umber">Kepala Sekolah</p>
          </div>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[.2em] text-umber">Sambutan kepala sekolah</p>
          <h2 className="mt-4 font-display text-3xl leading-tight lg:text-4xl">
            Mendidik dengan ilmu,
            <br />
            menumbuhkan dengan iman.
          </h2>
          <p className="mt-6 text-base font-medium text-umber">
            Assalamu’alaikum warahmatullahi wabarakatuh.
          </p>
          <div className="mt-4 space-y-4 text-sm leading-relaxed text-ink-soft">
            <p>
              SMP Islam Al-Mujahidin Pamulang mengupayakan pendidikan yang menyatukan pembelajaran
              akademik, pembentukan karakter, dan pengamalan nilai Islam. Tujuannya adalah
              mendampingi siswa tumbuh menjadi pribadi berpengetahuan sekaligus berakhlak baik.
            </p>
            <p>
              Melalui website ini, keluarga dan masyarakat dapat mengenal program, kegiatan, serta
              perkembangan sekolah. Komunikasi yang terbuka diharapkan memperkuat kerja sama antara
              orang tua, siswa, guru, dan sekolah.
            </p>
            <p>
              Dengan dukungan bersama, proses pendidikan menjadi langkah untuk menumbuhkan generasi
              yang kreatif, berdaya saing, dan teguh memegang nilai Islam.
            </p>
          </div>
          <p className="mt-5 text-xs text-ink-soft">
            Ringkasan sambutan kepala sekolah dari website resmi.
          </p>
        </div>
      </div>
    </section>
  );
}
