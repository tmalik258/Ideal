"use client";

import { RelatedProductsSkeleton } from "../../_components/product-skeleton";
import { TransformedProductType } from "@/components/product-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ProductCard from "@/components/product-card";
import { storefrontEyebrow } from "@/lib/storefront/surface";

interface RelatedProductsProps {
  products?: TransformedProductType[];
  loading?: boolean;
  title?: string;
  error?: Error | null;
}

export function RelatedProducts({
  products = [],
  loading = false,
  title = "Explore More",
}: RelatedProductsProps) {
  if (loading) {
    return (
      <div>
        <p className={storefrontEyebrow}>Continue shopping</p>
        <h2 className="mb-8 font-serif text-2xl font-semibold tracking-tight text-foreground">
          {title}
        </h2>
        <RelatedProductsSkeleton />
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div>
        <p className={storefrontEyebrow}>Continue shopping</p>
        <h2 className="mb-8 font-serif text-2xl font-semibold tracking-tight text-foreground">
          {title}
        </h2>
        <div className="border border-dashed border-brand-forest/20 py-12 text-center">
          <p className="font-serif text-sm text-brand-forest/50">
            No related products available
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-5">
      <p className={storefrontEyebrow}>Continue shopping</p>
      <h2 className="mb-8 font-serif text-2xl font-semibold tracking-tight text-foreground">
        {title}
      </h2>
      <div className="relative">
        <Carousel className="w-full" opts={{ align: "start", loop: true }}>
          <CarouselContent className="-ml-2 py-3 md:-ml-4">
            {products.map((product) => (
              <CarouselItem
                key={product.id}
                className="pl-2 xs:basis-full sm:basis-1/2 md:basis-1/3 md:pl-4 lg:basis-1/4"
              >
                <ProductCard product={product} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0 cursor-pointer border-brand-forest/20 bg-brand-ivory text-brand-forest shadow-none hover:bg-brand-champagne/40 md:-left-4" />
          <CarouselNext className="right-0 cursor-pointer border-brand-forest/20 bg-brand-ivory text-brand-forest shadow-none hover:bg-brand-champagne/40 md:-right-4" />
        </Carousel>
      </div>
    </div>
  );
}

export default RelatedProducts;
