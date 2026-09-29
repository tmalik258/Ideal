"use client";

import { StorefrontSectionHeader } from "./storefront-section-header";

type ReviewCard = {
  id: string;
  rating: number;
  comment: string | null;
  user: { name: string | null };
  product: { name: string };
};

type Props = {
  title: string;
  subtitle?: string;
  testimonials: ReviewCard[];
};

export function StorefrontHomeTestimonials({ title, subtitle, testimonials }: Props) {
  if (!testimonials.length) return null;

  const [featured, ...rest] = testimonials;

  return (
    <section className="bg-brand-ivory py-20 md:py-28" aria-label="Customer reviews">
      <div className="mx-auto max-w-7xl px-4">
        <StorefrontSectionHeader eyebrow="Voices" title={title} subtitle={subtitle} />

        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          <article className="border-t border-brand-forest/15 pt-8">
            <p className="font-serif text-[0.65rem] tracking-[0.22em] text-brand-forest/45 uppercase">
              {featured.rating}/5 · Verified
            </p>
            {featured.comment ? (
              <p className="mt-6 font-serif text-[clamp(1.5rem,3.5vw,2.5rem)] leading-snug tracking-tight text-foreground">
                &ldquo;{featured.comment}&rdquo;
              </p>
            ) : null}
            <p className="mt-8 text-sm font-medium tracking-wide text-foreground">
              {featured.user.name ?? "Customer"}
            </p>
            <p className="mt-1 text-xs tracking-[0.16em] text-foreground/45 uppercase">
              {featured.product.name}
            </p>
          </article>

          {rest.length ? (
            <div className="space-y-0 border-t border-brand-forest/15 lg:border-t-0 lg:border-l lg:pl-12">
              {rest.map((r) => (
                <article
                  key={r.id}
                  className="border-b border-brand-forest/10 py-7 last:border-b-0"
                >
                  <p className="font-serif text-[0.65rem] tracking-[0.22em] text-brand-forest/45 uppercase">
                    {r.rating}/5
                  </p>
                  {r.comment ? (
                    <p className="mt-3 font-serif text-lg leading-relaxed tracking-tight text-foreground/85 line-clamp-4">
                      &ldquo;{r.comment}&rdquo;
                    </p>
                  ) : null}
                  <p className="mt-4 text-sm text-foreground">
                    {r.user.name ?? "Customer"}
                  </p>
                  <p className="text-xs text-foreground/45">{r.product.name}</p>
                </article>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
