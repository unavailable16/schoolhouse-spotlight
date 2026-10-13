import { useSchoolSettings } from "@/lib/school-settings";
export function SchoolStats() {
  const { settings } = useSchoolSettings();
  if (!settings.profile.stats.length) return null;
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {settings.profile.stats.map((row) => (
        <article key={row.id} className="rounded-2xl border border-umber/15 bg-canvas p-5">
          <p className="break-words font-display text-3xl text-umber">{row.value}</p>
          <p className="mt-2 text-sm text-ink-soft">{row.label}</p>
        </article>
      ))}
    </div>
  );
}
