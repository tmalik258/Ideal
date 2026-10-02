import Image from "next/image";
import Link from "next/link";
import type { Category, HomeCategorySpotlight } from "@prisma/client";
import { StorefrontSectionHeader } from "./storefront-section-header";
import { storefrontContainer } from "@/lib/storefront/surface";

type Row = HomeCategorySpotlight & { category: Category };

type Props = {
  title: string;
  subtitle?: string;
  rows: Row[];
};

export function StorefrontCategorySpotlight({ title, subtitle, rows }: Props) {
  if (!rows.length) return null;

  return (
    <section className="border-y border-brand-forest/10 bg-white py-20 md:py-28" aria-label={title}>
      <div className={storefrontContainer}>
        <StorefrontSectionHeader
          eyebrow="Shop"
          title={title}
          subtitle={subtitle}
          actions={
            <Link
              href="/collections"
              className="text-sm font-medium tracking-wide text-brand-forest underline-offset-4 hover:underline cursor-pointer"
            >
              View all collections
            </Link>
          }
        />
        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4 lg:gap-6">
          {rows.map((row) => {
            const src =
              row.imageOverride?.trim() ||
              row.category.image?.trim() ||
              "/logo_transparent.png";
            const label = row.titleOverride?.trim() || row.category.name;
            return (
              <Link
                key={row.id}
                href={`/products?category=${row.category.id}`}
                data-reveal-child
                className="group relative aspect-[3/4] overflow-hidden bg-brand-forest cursor-pointer"
              >
                <Image
                  src={src}
                  alt={label}
                  fill
                  className="object-cover transition duration-700 ease-out group-hover:scale-[1.05]"
                  sizes="(max-width: 640px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-brand-forest/25 transition group-hover:bg-brand-forest/40" />
                <div className="absolute inset-x-0 bottom-0 bg-brand-forest/80 p-4 md:p-5">
                  <p className="font-serif text-lg tracking-tight text-brand-champagne md:text-xl">
                    {label}
                  </p>
                  <p className="mt-1 text-[0.65rem] tracking-[0.18em] text-brand-champagne/70 uppercase">
                    {row.category.productsCount} styles
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
