import Image from "next/image";
import Link from "next/link";
import type { ProductWithRelations } from "@/lib/hooks/useProductQueries";
import { formatStorefrontPrice } from "@/lib/site-metadata";
import { storefrontContainer } from "@/lib/storefront/surface";

type Props = {
  title: string;
  subtitle?: string;
  products: ProductWithRelations[];
};

export function StorefrontHeroSecondaryStrip({ title, subtitle, products }: Props) {
  if (!products.length) return null;

  return (
    <section
      className="border-b border-brand-forest/10 bg-brand-ivory py-6 md:py-8"
      aria-label={title}
    >
      <div className={storefrontContainer}>
        <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-serif text-lg font-semibold tracking-tight text-foreground md:text-xl">
              {title}
            </h2>
            {subtitle ? (
              <p className="mt-1 text-sm text-foreground/55">{subtitle}</p>
            ) : null}
          </div>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-1 snap-x snap-mandatory md:gap-4">
          {products.map((product) => {
            const img =
              product.image ||
              (product.images?.length ? product.images[0] : "/logo_transparent.png");
            return (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="flex w-[140px] shrink-0 snap-start flex-col gap-2 sm:w-[160px] cursor-pointer"
              >
                <div className="relative aspect-square overflow-hidden bg-brand-champagne/40">
                  <Image src={img} alt={product.name} fill className="object-cover" sizes="160px" />
                </div>
                <p className="line-clamp-2 text-xs font-medium text-foreground">{product.name}</p>
                <p className="text-xs text-foreground/60">{formatStorefrontPrice(product.price)}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
