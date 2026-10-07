import { MapPin } from "lucide-react";

const schoolAddress = "Jl. Pustaka No. 4, Bandung 40115";

export function SchoolMap() {
  const key = import.meta.env["VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_BROWSER_KEY"];

  return (
    <div className="overflow-hidden rounded-lg bg-paper ring-1 ring-ink/10">
      {key ? (
        <iframe
          title="Lokasi Sekolah Aldergrove di Google Maps"
          src={`https://www.google.com/maps/embed/v1/place?key=${key}&q=${encodeURIComponent(schoolAddress)}`}
          className="h-[360px] w-full border-0 lg:h-[430px]"
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      ) : (
        <div className="grid h-[360px] place-items-center p-8 text-center text-ink-soft lg:h-[430px]">
          <div>
            <MapPin className="mx-auto mb-4 size-8 text-umber" />
            <p className="font-[500] text-ink">{schoolAddress}</p>
            <p className="mt-2 text-sm">Peta tersedia setelah Google Maps terhubung.</p>
          </div>
        </div>
      )}
    </div>
  );
}