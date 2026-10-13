import { useSchoolSettings } from "@/lib/school-settings";
export function Accreditation() {
  const { settings } = useSchoolSettings();
  const item = settings.profile.accreditation;
  return (
    <div className="flex flex-wrap items-center gap-6 rounded-3xl border border-umber/15 bg-white p-6 lg:p-8">
      {item.image ? (
        <img
          src={item.image}
          alt={`Lencana akreditasi ${item.grade}`}
          className="h-36 w-32 object-contain"
        />
      ) : (
        <div className="flex size-32 shrink-0 flex-col items-center justify-center rounded-full border-4 border-umber bg-paper ring-4 ring-brass/50">
          <span className="text-[10px] uppercase tracking-widest text-umber">Akreditasi</span>
          <span className="mt-2 max-w-full break-words px-2 font-display text-4xl text-umber">
            {item.grade}
          </span>
        </div>
      )}
      <div className="min-w-48 flex-1">
        <p className="text-xs uppercase tracking-[.2em] text-umber">
          Komitmen pada mutu pendidikan
        </p>
        <h3 className="mt-3 font-display text-3xl text-ink">Terakreditasi {item.grade}</h3>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-soft">{item.description}</p>
      </div>
    </div>
  );
}
