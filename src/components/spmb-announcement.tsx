import { createContext, useContext, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Megaphone, X } from "lucide-react";
import { useSchoolSettings } from "@/lib/school-settings";

type AnnouncementState = "open" | "closing" | "hidden";
const AnnouncementContext = createContext<{
  state: AnnouncementState;
  setState: (state: AnnouncementState) => void;
} | null>(null);

export function AnnouncementProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AnnouncementState>("open");
  return (
    <AnnouncementContext.Provider value={{ state, setState }}>
      {children}
    </AnnouncementContext.Provider>
  );
}

export function SpmbAnnouncement() {
  const announcement = useContext(AnnouncementContext);
  const { settings } = useSchoolSettings();
  if (!announcement || announcement.state === "hidden") return null;
  const { state, setState } = announcement;
  return (
    <aside
      aria-label="Informasi SPMB"
      data-announcement={state}
      className="spmb-announcement bg-umber font-body text-canvas"
      onAnimationEnd={(event) => {
        if (event.target === event.currentTarget && state === "closing") setState("hidden");
      }}
    >
      <div className="min-h-0 overflow-hidden">
        <div className="announcement-content mx-auto flex max-w-6xl items-center gap-3 px-6 py-3 lg:px-8">
          <Megaphone className="hidden size-5 shrink-0 text-brass sm:block" aria-hidden="true" />
          <div className="flex min-w-0 flex-1 flex-wrap items-center justify-between gap-x-6 gap-y-2">
            <p className="text-sm font-medium">Informasi SPMB {settings.spmb.academicYear}</p>
            <Link
              to="/spmb"
              className="inline-flex items-center gap-2 rounded-lg bg-brass px-3 py-2 text-xs font-semibold text-ink"
            >
              Lihat info SPMB <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
          <button
            type="button"
            aria-label="Tutup informasi SPMB"
            disabled={state === "closing"}
            onClick={() => setState("closing")}
            className="shrink-0 rounded-full border border-canvas/30 p-2 hover:bg-canvas/15"
          >
            <X size={16} aria-hidden="true" />
          </button>
        </div>
      </div>
    </aside>
  );
}
