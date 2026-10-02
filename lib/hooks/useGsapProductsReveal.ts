"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { prefersReducedMotion } from "@/lib/utils/prefers-reduced-motion";

/** Stagger-fade product cards when the product list changes. */
export function useGsapProductsReveal(depsKey: string) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const cards = root.querySelectorAll<HTMLElement>("[data-product-card]");
    if (!cards.length) return;

    if (prefersReducedMotion()) {
      gsap.set(cards, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
          clearProps: "transform",
        }
      );
    }, root);

    return () => ctx.revert();
  }, [depsKey]);

  return containerRef;
}

/** One-shot fade-in for toolbar / chips strip. */
export function useGsapToolbarReveal(depsKey = "") {
  const toolbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = toolbarRef.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      gsap.set(el, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.55, ease: "power3.out" }
      );
    }, el);

    return () => ctx.revert();
  }, [depsKey]);

  return toolbarRef;
}
