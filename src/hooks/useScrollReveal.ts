import { useLayoutEffect } from "react";

export function useScrollReveal() {
  useLayoutEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    document.documentElement.classList.add("motion-ready");

    elements.forEach((element) => {
      const delay = Number(element.dataset.delay ?? 0);
      element.style.setProperty("--reveal-delay", `${Math.max(0, delay)}ms`);
    });

    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return () => document.documentElement.classList.remove("motion-ready");
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.02, rootMargin: "300px 0px 300px 0px" },
    );

    elements.forEach((element) => {
      const rect = element.getBoundingClientRect();
      if (rect.top < window.innerHeight + 300) {
        element.classList.add("is-visible");
      } else {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
      document.documentElement.classList.remove("motion-ready");
    };
  }, []);
}
