import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Motion is decorative: content stays readable during interrupted navigation. */
export function useSectionMotion() {
  const scope = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        const elements = scope.current?.querySelectorAll("[data-reveal]");
        if (!elements?.length) return;
        gsap.from(elements, {
          y: 24,
          duration: 0.8,
          stagger: 0.07,
          ease: "power2.out",
          scrollTrigger: {
            trigger: scope.current,
            start: "top 90%",
            once: true,
          },
        });
      });
      return () => media.revert();
    },
    { scope },
  );
  return scope;
}
