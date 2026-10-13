import { useCallback, useState } from "react";

export function useDirectionalSlide(count: number) {
  const [slide, setSlide] = useState({ index: 0, direction: "none" });
  const active = count ? slide.index % count : 0;
  const step = useCallback(
    (delta: number) => {
      if (count < 2) return;
      setSlide((current) => ({
        index: ((current.index % count) + delta + count) % count,
        direction: delta > 0 ? "forward" : "backward",
      }));
    },
    [count],
  );
  const goTo = (index: number) => {
    if (index === active || index < 0 || index >= count) return;
    setSlide({ index, direction: index > active ? "forward" : "backward" });
  };
  return { active, direction: slide.direction, step, goTo };
}
