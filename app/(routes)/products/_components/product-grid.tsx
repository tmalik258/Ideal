"use client";

import { ProductCard, CardProductType } from "@/components/product-card";
import { ProductsGridSkeleton, ProductError } from "./product-skeleton";
import { ProductWithRelations } from "@/lib/hooks/useProductQueries";
import { useGsapProductsReveal } from "@/lib/hooks/useGsapProductsReveal";

interface ProductGridProps {
  products: (ProductWithRelations | CardProductType)[];
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
  className?: string;
}

export function ProductGrid({
  products,
  loading = false,
  error = null,
  onRetry,
  className = "",
}: ProductGridProps) {
  const depsKey = products.map((p) => p.id).join(",");
  const gridRef = useGsapProductsReveal(depsKey);

  if (loading) {
    return <ProductsGridSkeleton count={8} />;
  }

  if (error && error !== "No products found") {
    return <ProductError message={error} onRetry={onRetry} />;
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center border border-dashed border-brand-forest/20 bg-brand-champagne/20 py-16 text-center">
        <h3 className="font-serif text-lg font-semibold text-brand-forest">No products found</h3>
        <p className="mt-2 max-w-sm text-sm text-foreground/60">
          Try adjusting your filters or clearing them to see more styles.
        </p>
      </div>
    );
  }

  return (
    <div
      ref={gridRef}
      className={`grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-x-8 lg:gap-y-12 ${className}`}
    >
      {products.map((product) => (
        <div key={product.id} data-product-card>
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}

export default ProductGrid;
