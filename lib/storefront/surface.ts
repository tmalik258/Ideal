/** Shared Ideal storefront surface classes — keep pages consistent. */

export const storefrontPage =
  "min-h-screen bg-brand-ivory pt-[var(--site-chrome-height,4rem)]";

/** Outer chrome gutters — keep in sync with header padding. */
export const storefrontChromeGutter = "px-3 sm:px-4 md:px-6";

/** Matches navbar pill width + outer chrome gutters. */
export const storefrontContainer =
  "mx-auto w-full max-w-6xl px-3 sm:px-4 md:px-6";

export const storefrontCard =
  "rounded-none border border-brand-forest/15 bg-brand-ivory shadow-none";

export const storefrontInput =
  "border-brand-forest/15 bg-brand-ivory text-foreground placeholder:text-foreground/40 focus-visible:border-brand-forest focus-visible:ring-brand-forest/20";

export const storefrontPrimaryBtn =
  "cursor-pointer bg-brand-forest text-brand-champagne hover:bg-brand-forest/90";

export const storefrontOutlineBtn =
  "cursor-pointer border-brand-forest/30 text-brand-forest hover:bg-brand-forest hover:text-brand-champagne";

export const storefrontEyebrow =
  "mb-3 font-serif text-[0.65rem] font-semibold tracking-[0.28em] text-brand-forest/55 uppercase";

export const storefrontTitle =
  "font-serif text-[clamp(1.75rem,4vw,2.75rem)] font-semibold leading-[1.1] tracking-tight text-foreground";
