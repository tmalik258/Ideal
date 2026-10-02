"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { Product, Category, Review } from "@prisma/client";
import { useWishlistStore } from "@/lib/stores/wishlist-store";
import { ProductWithRelations } from "@/lib/hooks/useProductQueries";
import { LOGO_PATH, formatStorefrontPrice } from "@/lib/site-metadata";
import { cn } from "@/lib/utils";

export type CardProductType = Product & {
  category?: Category | string;
  reviews?: Review[] | number;
};

export type TransformedProductType = {
  id: string;
  name: string;
  subtitle?: string;
  price: number;
  rating: number;
  image: string;
  images?: string[];
  originalPrice?: number;
  inStock?: boolean;
  category?: string;
  onSale?: boolean;
};

interface ProductCardProps {
  product: ProductWithRelations | CardProductType | TransformedProductType;
}

function resolveProductImageSrc(
  product: ProductWithRelations | CardProductType | TransformedProductType
): string {
  if (typeof product.image === "string" && product.image.trim() !== "") {
    return product.image.trim();
  }
  if ("images" in product && Array.isArray(product.images)) {
    const first = product.images.find(
      (img): img is string => typeof img === "string" && img.trim() !== ""
    );
    if (first) return first.trim();
  }
  return LOGO_PATH;
}

function productCategoryLabel(
  product: ProductWithRelations | CardProductType | TransformedProductType
): string {
  if ("category" in product && product.category) {
    if (typeof product.category === "string" && product.category.trim() !== "") {
      return product.category;
    }
    if (typeof product.category === "object" && "name" in product.category) {
      return product.category.name;
    }
  }
  return "Collection";
}

export function ProductCard({ product }: ProductCardProps) {
  const { toggleItem, isInWishlist } = useWishlistStore();
  const isWishlisted = isInWishlist(product.id);
  const resolvedSrc = resolveProductImageSrc(product);
  const [imageSrc, setImageSrc] = useState(resolvedSrc);
  const isLogoFallback = imageSrc === LOGO_PATH;
  const categoryLabel = productCategoryLabel(product);

  useEffect(() => {
    setImageSrc(resolvedSrc);
  }, [resolvedSrc]);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    toggleItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: resolveProductImageSrc(product),
      category: categoryLabel,
      inStock: product.inStock ?? true,
    });
  };

  return (
    <Link
      href={`/products/${product.id}`}
      className="group block h-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-forest/30 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-ivory"
    >
      <article className="flex h-full flex-col">
        <div className="relative aspect-[3/4] overflow-hidden bg-brand-champagne/40">
          <Image
            src={imageSrc}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className={cn(
              "transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100",
              isLogoFallback ? "object-contain p-10 opacity-80" : "object-cover"
            )}
            onError={() => {
              if (imageSrc !== LOGO_PATH) setImageSrc(LOGO_PATH);
            }}
          />

          {product.onSale ? (
            <span className="absolute top-4 left-4 z-10 bg-brand-forest px-2.5 py-1 font-serif text-[0.65rem] font-semibold tracking-[0.2em] text-brand-champagne uppercase">
              Sale
            </span>
          ) : null}

          <button
            type="button"
            onClick={handleWishlistClick}
            className="absolute top-3 right-3 z-10 cursor-pointer rounded-full border border-brand-forest/10 bg-brand-ivory/90 p-2.5 text-brand-forest/70 backdrop-blur-sm transition-[color,background-color,transform] duration-200 hover:bg-brand-ivory hover:text-brand-forest motion-reduce:hover:scale-100"
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart
              className={cn(
                "h-4 w-4 transition-[transform,fill,color] duration-200",
                isWishlisted
                  ? "scale-110 fill-brand-forest text-brand-forest"
                  : "text-brand-forest/70"
              )}
            />
          </button>

          {/* Hover veil — desktop only; details stay below for a clean editorial read */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-brand-forest/0 transition-colors duration-500 group-hover:bg-brand-forest/10 motion-reduce:group-hover:bg-transparent"
          />
        </div>

        <div className="flex flex-1 flex-col space-y-1.5 border-b border-brand-forest/10 pt-4 pb-4">
          <p className="font-serif text-[0.65rem] font-semibold tracking-[0.22em] text-brand-forest/45 uppercase">
            {product.onSale ? "Sale" : categoryLabel}
          </p>
          <h3 className="line-clamp-2 font-serif text-lg leading-snug tracking-tight text-foreground transition-colors duration-300 group-hover:text-brand-forest md:text-xl">
            {product.name}
          </h3>
          <div className="flex items-baseline gap-2 pt-0.5">
            <span className="text-sm text-foreground/60">
              {formatStorefrontPrice(product.price)}
            </span>
            {product.originalPrice ? (
              <span className="text-xs text-foreground/35 line-through">
                {formatStorefrontPrice(product.originalPrice)}
              </span>
            ) : null}
          </div>
        </div>
      </article>
    </Link>
  );
}

export default ProductCard;
