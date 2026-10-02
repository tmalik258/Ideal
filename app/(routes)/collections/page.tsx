import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { cn } from "@/lib/utils";
import { StorefrontReveal } from "../_components/storefront/storefront-reveal";

export const dynamic = "force-dynamic";

/**
 * Page: Collections index
 * Rendering: SSR (category list from DB)
 * Reason: Editorial collections grid linking into filtered products
 * Last Updated: 2026-10-02
 */

export default async function CollectionsPage() {
  const categories = await prisma.category.findMany({
    where: { isActive: true },
    orderBy: { name: "asc" },
  });

  return (
    <div className="min-h-screen bg-brand-ivory pt-[var(--site-chrome-height,4rem)]">
      <div className="mx-auto max-w-7xl px-4 py-14 md:py-20 lg:px-6">
        <header className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="mb-3 font-serif text-[0.65rem] font-semibold tracking-[0.28em] text-brand-forest/55 uppercase">
              Shop
            </p>
            <h1 className="font-serif text-[clamp(1.75rem,4vw,3.25rem)] font-semibold leading-[1.1] tracking-tight text-foreground">
              Collections
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-foreground/55 md:text-base">
              Browse by category — each collection opens a curated shop view.
            </p>
          </div>
          <Link
            href="/products"
            className="shrink-0 cursor-pointer text-sm font-medium tracking-wide text-brand-forest underline-offset-4 transition hover:underline"
          >
            Shop all
          </Link>
        </header>

        {categories.length === 0 ? (
          <div className="border border-dashed border-brand-forest/20 bg-brand-champagne/20 py-20 text-center">
            <h2 className="font-serif text-lg font-semibold text-brand-forest">
              No collections yet
            </h2>
            <p className="mt-2 text-sm text-foreground/60">
              Check back soon for new drops and categories.
            </p>
          </div>
        ) : (
          <StorefrontReveal staggerChildren>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {categories.map((cat, index) => {
                const img = cat.image?.trim() || "/logo_transparent.png";
                const isLogoFallback = img === "/logo_transparent.png";
                const featured = index === 0 && categories.length >= 3;

                return (
                  <Link
                    key={cat.id}
                    href={`/products?category=${cat.id}`}
                    data-reveal-child
                    className={cn(
                      "group relative overflow-hidden bg-brand-champagne/40 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-forest/30 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-ivory",
                      featured && "sm:col-span-2 lg:col-span-2 lg:row-span-2"
                    )}
                  >
                    <div
                      className={cn(
                        "relative overflow-hidden",
                        featured
                          ? "aspect-[4/5] sm:aspect-[5/4] lg:aspect-auto lg:h-full lg:min-h-[520px]"
                          : "aspect-[3/4]"
                      )}
                    >
                      <Image
                        src={img}
                        alt={cat.name}
                        fill
                        className={cn(
                          "transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100",
                          isLogoFallback
                            ? "object-contain p-12 opacity-80"
                            : "object-cover"
                        )}
                        sizes={
                          featured
                            ? "(max-width: 1024px) 100vw, 66vw"
                            : "(max-width: 640px) 100vw, 33vw"
                        }
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-brand-forest/85 via-brand-forest/25 to-transparent transition-opacity duration-500 group-hover:from-brand-forest/90" />

                      <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 lg:p-8">
                        <p className="font-serif text-[0.65rem] font-semibold tracking-[0.22em] text-brand-champagne/70 uppercase">
                          Collection
                        </p>
                        <h2
                          className={cn(
                            "mt-2 font-serif tracking-tight text-brand-champagne",
                            featured
                              ? "text-2xl md:text-3xl lg:text-4xl"
                              : "text-xl md:text-2xl"
                          )}
                        >
                          {cat.name}
                        </h2>
                        {cat.description ? (
                          <p className="mt-2 line-clamp-2 max-w-md text-sm leading-relaxed text-brand-champagne/75">
                            {cat.description}
                          </p>
                        ) : null}
                        <p className="mt-3 text-[0.65rem] tracking-[0.18em] text-brand-champagne/65 uppercase">
                          {cat.productsCount}{" "}
                          {cat.productsCount === 1 ? "style" : "styles"}
                          <span className="ml-2 inline-block translate-x-0 transition-transform duration-300 group-hover:translate-x-1">
                            →
                          </span>
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </StorefrontReveal>
        )}
      </div>
    </div>
  );
}
