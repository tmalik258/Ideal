"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ProductWithRelations } from "@/lib/hooks/useProductQueries";
import { formatStorefrontPrice } from "@/lib/site-metadata";
import { StorefrontSectionHeader } from "./storefront-section-header";
import { storefrontContainer } from "@/lib/storefront/surface";

type Props = {
  title: string;
  subtitle?: string;
  products: ProductWithRelations[];
  viewAllHref: string;
  viewAllLabel?: string;
};

export function StorefrontProductRail({
  title,
  subtitle,
  products,
  viewAllHref,
  viewAllLabel = "View all",
}: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  if (!products.length) return null;

  const scrollBy = (delta: number) => {
    scrollRef.current?.scrollBy({ left: delta, behavior: "smooth" });
  };

  return (
    <section className="py-20 md:py-28" aria-label={title}>
      <div className={storefrontContainer}>
        <StorefrontSectionHeader
          eyebrow="Collection"
          title={title}
          subtitle={subtitle}
          actions={
            <>
              <button
                type="button"
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-brand-forest/25 text-brand-forest transition hover:border-brand-forest hover:bg-brand-forest hover:text-brand-champagne"
                aria-label="Scroll products left"
                onClick={() => scrollBy(-360)}
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-brand-forest/25 text-brand-forest transition hover:border-brand-forest hover:bg-brand-forest hover:text-brand-champagne"
                aria-label="Scroll products right"
                onClick={() => scrollBy(360)}
              >
                <ChevronRight className="h-5 w-5" />
              </button>
              <Link
                href={viewAllHref}
                className="ml-1 text-sm font-medium tracking-wide text-brand-forest underline-offset-4 transition hover:underline cursor-pointer"
              >
                {viewAllLabel}
              </Link>
            </>
          }
        />

        <div
          ref={scrollRef}
          className="-mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-2 scroll-px-4 scrollbar-none md:gap-8"
        >
          {products.map((product) => {
            const img =
              product.image ||
              (product.images?.length ? product.images[0] : "/logo_transparent.png");
            return (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="group w-[75vw] shrink-0 snap-start sm:w-[44vw] md:w-[300px] cursor-pointer"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-brand-champagne/40">
                  <Image
                    src={img}
                    alt={product.name}
                    fill
                    className="object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
                    sizes="300px"
                  />
                </div>
                <div className="space-y-1 border-b border-brand-forest/10 pt-4 pb-3">
                  <p className="line-clamp-2 font-serif text-lg tracking-tight text-foreground">
                    {product.name}
                  </p>
                  <p className="text-sm text-foreground/60">
                    {formatStorefrontPrice(product.price)}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
