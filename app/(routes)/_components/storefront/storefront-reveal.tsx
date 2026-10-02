"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { prefersReducedMotion } from "@/lib/utils/prefers-reduced-motion";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  children: ReactNode;
  className?: string;
  staggerChildren?: boolean;
};

/** Fade/slide section into view once when scrolled into viewport. */
export function StorefrontReveal({
  children,
  className,
  staggerChildren = false,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      gsap.set(el, { opacity: 1, y: 0 });
      gsap.set(el.querySelectorAll("[data-reveal-child]"), { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      if (staggerChildren) {
        const kids = el.querySelectorAll("[data-reveal-child]");
        if (kids.length) {
          gsap.fromTo(
            kids,
            { opacity: 0, y: 28 },
            {
              opacity: 1,
              y: 0,
              duration: 0.65,
              stagger: 0.08,
              ease: "power2.out",
              scrollTrigger: {
                trigger: el,
                start: "top 88%",
                once: true,
              },
            }
          );
          return;
        }
      }

      gsap.fromTo(
        el,
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            once: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [staggerChildren]);

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}
