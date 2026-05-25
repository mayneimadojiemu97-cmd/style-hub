import { useEffect } from "react";
import { useRouter } from "@tanstack/react-router";

const SELECTOR = [
  "main img",
  "main h1", "main h2", "main h3", "main h4", "main h5", "main h6",
  "main p", "main blockquote", "main li",
  "main figure", "main article", "main aside",
  "main section > div",
].join(", ");

export function ScrollReveal() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const apply = () => {
      if (typeof IntersectionObserver === "undefined") return;
      const nodes = document.querySelectorAll<HTMLElement>(SELECTOR);
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("sr-visible");
              io.unobserve(e.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
      );
      nodes.forEach((n) => {
        if (n.classList.contains("sr-init")) return;
        n.classList.add("sr-init");
        io.observe(n);
      });
      return io;
    };

    let io = apply();
    const unsub = router.subscribe("onResolved", () => {
      // Re-scan after navigation
      requestAnimationFrame(() => {
        io?.disconnect();
        io = apply();
      });
    });

    return () => {
      io?.disconnect();
      unsub();
    };
  }, [router]);

  return null;
}
