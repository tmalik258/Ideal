"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Star, ShoppingCart } from "lucide-react";
import { ProductInfoSkeleton } from "../../_components/product-skeleton";
import { Product as PrismaProduct } from "@prisma/client";
import {
  storefrontEyebrow,
  storefrontOutlineBtn,
  storefrontPrimaryBtn,
} from "@/lib/storefront/surface";
import type { ProductAttribute } from "@/lib/storefront/parse-product-description";
import { SITE_CURRENCY } from "@/lib/site-metadata";
import { cn } from "@/lib/utils";

interface Product
  extends Pick<PrismaProduct, "id" | "name" | "description" | "rating"> {
  price: string;
  originalPrice?: string;
  reviewCount: number;
  inStock: boolean;
  stockCount: number;
  sizes: string[];
  colors: { name: string; value: string }[];
  attributes?: ProductAttribute[];
}

interface ProductInfoProps {
  product?: Product;
  loading?: boolean;
  onAddToCart?: (productId: string, size: string, color: string) => void;
  onAddToWishlist?: (productId: string) => void;
  onBuyNow?: (productId: string, size: string, color: string) => void;
}

const chipShape = "rounded-none rounded-tr-2xl rounded-bl-2xl";

export function ProductInfo({
  product,
  loading = false,
  onAddToCart,
  onBuyNow,
}: ProductInfoProps) {
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  useEffect(() => {
    if (!product) return;
    setSelectedSize(product.sizes[0] ?? "");
    setSelectedColor(product.colors[0]?.name ?? "");
  }, [product?.id]);

  if (loading) {
    return <ProductInfoSkeleton />;
  }

  if (!product) {
    return (
      <div className="space-y-6 text-foreground">
        <div className="py-8 text-center">
          <p className="text-foreground/55">Product information not available</p>
        </div>
      </div>
    );
  }

  const activeSize = selectedSize || product.sizes[0] || "";
  const activeColor = selectedColor || product.colors[0]?.name || "";
  const attributes = product.attributes ?? [];
  const hasRating = product.rating > 0;
  const prose =
    attributes.length > 0 ? null : product.description?.trim() || null;

  const priceAmount = Number(
    product.price.replace(new RegExp(`\\s*${SITE_CURRENCY}\\s*`, "i"), "").trim()
  );
  const originalAmount = product.originalPrice
    ? Number(
        product.originalPrice
          .replace(new RegExp(`\\s*${SITE_CURRENCY}\\s*`, "i"), "")
          .trim()
      )
    : null;

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product.id, activeSize, activeColor);
    }
  };

  const handleBuyNow = () => {
    if (onBuyNow) {
      onBuyNow(product.id, activeSize, activeColor);
    }
  };

  return (
    <div className="flex flex-col text-foreground">
      <div
        className={cn(
          "sticky z-20 space-y-5 bg-brand-ivory/95 pb-5 backdrop-blur-md",
          "top-[calc(var(--site-chrome-height,4rem)+0.75rem)]"
        )}
      >
        <div>
          <p className={storefrontEyebrow}>Product</p>
          <h1 className="font-serif text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold leading-[1.1] tracking-tight text-foreground">
            {product.name}
          </h1>
        </div>

        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-brand-forest/10 pb-5">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <p className="flex items-baseline gap-2">
              <span className="font-serif text-[0.7rem] font-semibold tracking-[0.2em] text-brand-forest/50 uppercase">
                {SITE_CURRENCY}
              </span>
              <span className="font-serif text-[clamp(2rem,4.5vw,2.75rem)] font-semibold leading-none tracking-tight text-brand-forest tabular-nums">
                {Number.isFinite(priceAmount)
                  ? priceAmount.toLocaleString("en-PK", {
                      maximumFractionDigits: 0,
                    })
                  : product.price}
              </span>
            </p>
            {originalAmount != null && Number.isFinite(originalAmount) ? (
              <span className="text-base text-foreground/35 line-through tabular-nums sm:text-lg">
                {SITE_CURRENCY}{" "}
                {originalAmount.toLocaleString("en-PK", {
                  maximumFractionDigits: 0,
                })}
              </span>
            ) : null}
          </div>

          <div className="flex flex-col items-end gap-1.5 pb-1">
            {hasRating ? (
              <div
                className="flex items-center gap-1.5"
                aria-label={`${product.rating} out of 5 stars`}
              >
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={cn(
                      "h-4 w-4",
                      star <= Math.floor(product.rating)
                        ? "fill-brand-forest text-brand-forest"
                        : "text-brand-forest/25"
                    )}
                  />
                ))}
                {product.reviewCount > 0 ? (
                  <span className="ml-1 text-xs text-foreground/45">
                    ({product.reviewCount})
                  </span>
                ) : null}
              </div>
            ) : null}
            <p
              className={cn(
                "font-serif text-[0.65rem] font-semibold tracking-[0.18em] uppercase",
                product.inStock ? "text-brand-forest/70" : "text-destructive"
              )}
            >
              {product.inStock ? "In stock" : "Out of stock"}
            </p>
          </div>
        </div>

        {product.sizes.length > 0 ? (
          <div>
            <h3 className="mb-3 font-serif text-[0.65rem] font-semibold tracking-[0.22em] text-brand-forest/50 uppercase">
              Size
            </h3>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={cn(
                    chipShape,
                    "cursor-pointer border px-4 py-2 text-sm font-medium transition-colors",
                    activeSize === size
                      ? "border-brand-forest bg-brand-forest text-brand-champagne"
                      : "border-brand-forest/15 bg-brand-ivory text-foreground hover:border-brand-forest/40"
                  )}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        ) : null}

        {product.colors.length > 0 ? (
          <div>
            <h3 className="mb-3 font-serif text-[0.65rem] font-semibold tracking-[0.22em] text-brand-forest/50 uppercase">
              Color
            </h3>
            <div className="flex flex-wrap gap-3">
              {product.colors.map((color) => (
                <button
                  key={color.name}
                  type="button"
                  onClick={() => setSelectedColor(color.name)}
                  className={cn(
                    "relative h-10 w-10 cursor-pointer rounded-full border-2 transition-transform",
                    activeColor === color.name
                      ? "scale-110 border-brand-forest"
                      : "border-brand-forest/20 hover:border-brand-forest/50"
                  )}
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                >
                  {activeColor === color.name ? (
                    <div className="absolute inset-0 rounded-full border-2 border-brand-champagne/80" />
                  ) : null}
                </button>
              ))}
            </div>
            {activeColor ? (
              <p className="mt-2 text-sm capitalize text-foreground/50">
                Selected: {activeColor}
              </p>
            ) : null}
          </div>
        ) : null}

        <div className="flex flex-col gap-3 border-b border-brand-forest/10 pb-5 sm:flex-row">
          <Button
            onClick={handleAddToCart}
            size="lg"
            className={cn(
              storefrontPrimaryBtn,
              chipShape,
              "h-12 w-full text-base font-semibold sm:flex-1"
            )}
            disabled={!product.inStock}
          >
            <ShoppingCart className="mr-2 h-5 w-5 shrink-0" />
            Add to Cart
          </Button>
          <Button
            onClick={handleBuyNow}
            variant="outline"
            size="lg"
            className={cn(
              storefrontOutlineBtn,
              chipShape,
              "h-12 w-full border bg-brand-ivory text-base font-semibold sm:flex-1"
            )}
            disabled={!product.inStock}
          >
            Buy Now
          </Button>
        </div>
      </div>

      {attributes.length > 0 ? (
        <dl className="mt-2 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
          {attributes.map((attr) => (
            <div
              key={`${attr.label}-${attr.value}`}
              className="border-b border-brand-forest/10 pb-3"
            >
              <dt className="font-serif text-[0.65rem] font-semibold tracking-[0.18em] text-brand-forest/50 uppercase">
                {attr.label}
              </dt>
              <dd className="mt-1 text-sm leading-snug text-foreground">
                {attr.value}
              </dd>
            </div>
          ))}
        </dl>
      ) : prose ? (
        <p className="mt-2 text-sm leading-relaxed text-foreground/60 sm:text-base">
          {prose}
        </p>
      ) : null}
    </div>
  );
}

export default ProductInfo;
