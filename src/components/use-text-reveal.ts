import { useEffect } from "react";
import { useLocation } from "@tanstack/react-router";

export function useTextReveal() {
  const pathname = useLocation({ select: (location) => location.pathname });
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observed = new Set<HTMLElement>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).dataset["revealed"] = "true";
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.08 },
    );
    const scan = () => {
      document
        .querySelectorAll<HTMLElement>("main h1, main h2, main h3, main section p")
        .forEach((element) => {
          if (
            observed.has(element) ||
            element.closest("a, button, [role=dialog], [data-slide-motion]") ||
            element.classList.contains("rise")
          )
            return;
          observed.add(element);
          element.dataset["textReveal"] = element.matches("h1, h2") ? "side" : "fade";
          observer.observe(element);
        });
    };
    scan();
    const mutations = new MutationObserver(scan);
    const main = document.querySelector("main");
    if (main) mutations.observe(main, { childList: true, subtree: true });
    return () => {
      mutations.disconnect();
      observer.disconnect();
      for (const element of observed) {
        delete element.dataset["textReveal"];
        delete element.dataset["revealed"];
      }
    };
  }, [pathname]);
}
