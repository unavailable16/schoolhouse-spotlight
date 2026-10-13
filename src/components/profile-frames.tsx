import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import type { ProfileSettings } from "@/lib/school-settings";
export function ProfileFrames({ images }: { images: ProfileSettings["images"] }) {
  const [selected, setSelected] = useState<ProfileSettings["images"][number] | null>(null);
  return (
    <>
      <div className="grid aspect-[1.12] grid-cols-[1.15fr_1fr] grid-rows-2 gap-3 overflow-hidden rounded-3xl border border-umber/15 bg-paper p-3">
        {images.map((row, i) => (
          <button
            key={row.id}
            onClick={() => setSelected(row)}
            aria-label={`Perbesar ${row.title}`}
            className={`group relative min-h-0 overflow-hidden rounded-2xl text-left ${i === 0 ? "row-span-2" : ""}`}
          >
            <img
              src={row.image}
              alt={row.title}
              className="h-full w-full object-cover transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent px-3 pt-7 pb-3 text-xs text-white">
              {row.title}
            </div>
          </button>
        ))}
      </div>
      <Dialog
        open={!!selected}
        onOpenChange={(open) => {
          if (!open) setSelected(null);
        }}
      >
        <DialogContent className="max-h-[90vh] max-w-5xl overflow-y-auto rounded-2xl bg-canvas">
          <DialogTitle className="pr-8">{selected?.title}</DialogTitle>
          <DialogDescription>Galeri profil sekolah.</DialogDescription>
          {selected && (
            <img
              src={selected.image}
              alt={selected.title}
              className="max-h-[70vh] w-full object-contain"
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
