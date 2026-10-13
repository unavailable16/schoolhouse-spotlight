import { useState } from "react";
import { Expand } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import type { SchoolMediaItem } from "@/lib/site-media";
export function MediaGallery({
  items,
  label,
  horizontal = false,
}: {
  items: SchoolMediaItem[];
  label: string;
  horizontal?: boolean;
}) {
  const [selected, setSelected] = useState<SchoolMediaItem | null>(null);
  return (
    <>
      <div
        className={
          horizontal
            ? "flex snap-x snap-mandatory gap-5 overflow-x-auto pb-5"
            : "grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        }
      >
        {items.map((row) => (
          <figure
            key={row.id}
            className={
              horizontal
                ? "w-[min(85vw,420px)] shrink-0 snap-start overflow-hidden rounded-2xl border border-ink/10 bg-white"
                : "overflow-hidden rounded-2xl border border-ink/10 bg-canvas"
            }
          >
            <button
              aria-label={`Perbesar ${row.title}`}
              onClick={() => setSelected(row)}
              className="relative block w-full"
            >
              <img
                src={row.image}
                alt={row.title}
                loading="lazy"
                className={
                  horizontal
                    ? "h-[480px] w-full object-contain p-3"
                    : "aspect-[16/10] w-full object-cover"
                }
              />
              <span className="absolute right-4 bottom-4 rounded-full bg-canvas p-2 text-umber">
                <Expand size={16} />
              </span>
            </button>
            <figcaption className="border-t border-ink/10 p-4 text-sm font-medium">
              {row.title}
            </figcaption>
          </figure>
        ))}
      </div>
      <Dialog
        open={!!selected}
        onOpenChange={(value) => {
          if (!value) setSelected(null);
        }}
      >
        <DialogContent className="max-h-[92vh] max-w-5xl overflow-y-auto rounded-2xl bg-canvas">
          <DialogTitle className="pr-8">{selected?.title || label}</DialogTitle>
          <DialogDescription>{label}</DialogDescription>
          {selected && (
            <img
              src={selected.image}
              alt={selected.title}
              className="max-h-[75vh] w-full object-contain"
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
