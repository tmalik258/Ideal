"use client";

import { Skeleton } from "@/components/ui/skeleton";

const sk = "bg-brand-forest/10";

// Product Card Skeleton for grid view — matches editorial ProductCard
export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col">
      <Skeleton className={`aspect-[3/4] w-full rounded-none bg-brand-champagne/60 ${sk}`} />
      <div className="space-y-2 border-b border-brand-forest/10 pt-4 pb-4">
        <Skeleton className={`h-3 w-20 ${sk}`} />
        <Skeleton className={`h-5 w-4/5 ${sk}`} />
        <Skeleton className={`h-4 w-16 ${sk}`} />
      </div>
    </div>
  );
}

// Products Grid Skeleton
export function ProductsGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-x-8 lg:gap-y-12">
      {[...Array(count)].map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

// Product Detail Image Skeleton
export function ProductImageSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className={`aspect-square w-full rounded-none bg-brand-champagne/50 ${sk}`} />
      <div className="flex gap-2">
        {[...Array(4)].map((_, i) => (
          <Skeleton
            key={i}
            className={`aspect-square w-16 shrink-0 rounded-none bg-brand-champagne/40 ${sk}`}
          />
        ))}
      </div>
    </div>
  );
}

// Product Info Skeleton
export function ProductInfoSkeleton() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Skeleton className={`h-3 w-24 ${sk}`} />
        <Skeleton className={`h-9 w-3/4 sm:h-10 ${sk}`} />
        <Skeleton className={`h-4 w-1/3 ${sk}`} />
      </div>

      <div className="space-y-3">
        <Skeleton className={`h-4 w-16 ${sk}`} />
        <div className="grid grid-cols-5 gap-2">
          {[...Array(10)].map((_, i) => (
            <Skeleton key={i} className={`h-10 w-full rounded-none ${sk}`} />
          ))}
        </div>
      </div>

      <div className="space-y-3 pt-2">
        <Skeleton className={`h-12 w-full rounded-none ${sk}`} />
        <Skeleton className={`h-12 w-full rounded-none ${sk}`} />
      </div>
    </div>
  );
}

// Product Tabs Skeleton
export function ProductTabsSkeleton() {
  return (
    <div className="border border-brand-forest/10 bg-brand-ivory p-6 sm:p-8">
      <div className="mb-8 flex gap-6 border-b border-brand-forest/10 pb-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className={`h-5 w-20 ${sk}`} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="space-y-3">
          <Skeleton className={`h-5 w-32 ${sk}`} />
          <Skeleton className={`h-4 w-full ${sk}`} />
          <Skeleton className={`h-4 w-full ${sk}`} />
          <Skeleton className={`h-4 w-3/4 ${sk}`} />
        </div>
        <div className="space-y-3">
          <Skeleton className={`h-5 w-32 ${sk}`} />
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-start gap-3">
              <Skeleton className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${sk}`} />
              <Skeleton className={`h-4 flex-1 ${sk}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Related Products Skeleton
export function RelatedProductsSkeleton() {
  return (
    <div className="mt-2 space-y-6">
      <Skeleton className={`h-8 w-48 ${sk}`} />
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-8">
        {[...Array(4)].map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

// Main Product Detail Skeleton
export function ProductDetailSkeleton() {
  return (
    <div className="min-h-screen bg-brand-ivory pt-[var(--site-chrome-height,4rem)] pb-8">
      <div className="mx-auto max-w-7xl space-y-10 px-4 pt-10 lg:px-6">
        <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-2 md:gap-8">
          <ProductImageSkeleton />
          <ProductInfoSkeleton />
        </div>
        <ProductTabsSkeleton />
        <RelatedProductsSkeleton />
      </div>
    </div>
  );
}

// Error State Component
export function ProductError({
  message = "Failed to load products",
  onRetry,
}: {
  message?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center border border-dashed border-brand-forest/20 bg-brand-champagne/20 py-16 text-center">
      <h3 className="mb-2 font-serif text-lg font-semibold text-brand-forest">
        Something went wrong
      </h3>
      <p className="mb-4 text-sm text-foreground/60">{message}</p>
      {onRetry ? (
        <button
          onClick={onRetry}
          className="cursor-pointer bg-brand-forest px-5 py-2.5 text-sm font-medium text-brand-champagne transition-colors hover:bg-brand-forest/90"
        >
          Try again
        </button>
      ) : null}
    </div>
  );
}
