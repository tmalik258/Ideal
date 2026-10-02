import Image from "next/image";
import Link from "next/link";
import type { ProductWithRelations } from "@/lib/hooks/useProductQueries";
import { formatStorefrontPrice } from "@/lib/site-metadata";
import { StorefrontSectionHeader } from "./storefront-section-header";
import { cn } from "@/lib/utils";
import { storefrontContainer } from "@/lib/storefront/surface";

type Props = {
  title: string;
  subtitle?: string;
  products: ProductWithRelations[];
};

export function StorefrontEditorialGrid({ title, subtitle, products }: Props) {
  if (!products.length) return null;

  return (
    <section className="bg-brand-ivory py-20 md:py-28" aria-label={title}>
      <div className={storefrontContainer}>
        <StorefrontSectionHeader eyebrow="Edit" title={title} subtitle={subtitle} />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {products.map((product, index) => {
            const img =
              product.image ||
              (product.images?.length ? product.images[0] : "/logo_transparent.png");
            const featured = index === 0 && products.length >= 3;
            return (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                data-reveal-child
                className={cn(
                  "group cursor-pointer",
                  featured && "sm:col-span-2 lg:col-span-2 lg:row-span-2"
                )}
              >
                <div
                  className={cn(
                    "relative overflow-hidden bg-brand-champagne/35",
                    featured ? "aspect-[4/5] lg:aspect-auto lg:h-full lg:min-h-[520px]" : "aspect-[4/5]"
                  )}
                >
                  <Image
                    src={img}
                    alt={product.name}
                    fill
                    className="object-cover transition duration-700 ease-out group-hover:scale-[1.03]"
                    sizes={featured ? "(max-width: 1024px) 100vw, 66vw" : "(max-width: 640px) 100vw, 33vw"}
                  />
                </div>
                <div className="space-y-1.5 pt-4">
                  <p className="font-serif text-[0.65rem] font-semibold tracking-[0.22em] text-brand-forest/50 uppercase">
                    {product.category?.name ?? "Collection"}
                  </p>
                  <h3 className="font-serif text-xl tracking-tight text-foreground md:text-2xl">
                    {product.name}
                  </h3>
                  <p className="text-sm text-foreground/55">
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
