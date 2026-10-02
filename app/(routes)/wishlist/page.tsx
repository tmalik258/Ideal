"use client";

import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Heart, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useWishlistStore } from "@/lib/stores/wishlist-store";
import { storefrontCard, storefrontEyebrow, storefrontOutlineBtn, storefrontPage, storefrontPrimaryBtn, storefrontTitle, storefrontContainer } from "@/lib/storefront/surface";
import { cn } from "@/lib/utils";

export default function WishlistPage() {
  const { items } = useWishlistStore();

  return (
    <div className={storefrontPage}>
      <div className={cn(storefrontContainer, "py-10 pb-16 lg:py-14")}>
        <header className="mb-10">
          <p className={storefrontEyebrow}>Saved</p>
          <h1 className={storefrontTitle}>Your wishlist</h1>
          {items.length > 0 && (
            <p className="mt-2 text-sm text-foreground/55">
              {items.length} {items.length === 1 ? "piece" : "pieces"} saved for later
            </p>
          )}
        </header>

        {items.length === 0 ? (
          <div className="mx-auto max-w-md text-center">
            <div className={cn(storefrontCard, "mb-8 p-10")}>
              <Heart className="mx-auto mb-6 h-16 w-16 text-brand-forest/35" />
              <p className={storefrontEyebrow}>Wishlist</p>
              <h2 className={cn(storefrontTitle, "mb-3 text-2xl md:text-3xl")}>
                Your wishlist is empty
              </h2>
              <p className="leading-relaxed text-foreground/55">
                Start adding products you love — they&apos;ll appear here.
              </p>
            </div>
            <Button size="lg" className={cn(storefrontPrimaryBtn, "px-8")} asChild>
              <Link href="/products">Browse products</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="mb-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {items.map((item) => (
                <ProductCard
                  key={item.id}
                  product={{
                    id: item.productId || item.id,
                    name: item.name,
                    price: item.price,
                    image: item.image,
                    inStock: item.inStock,
                    rating: 0,
                  }}
                />
              ))}
            </div>

            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <Button variant="outline" className={storefrontOutlineBtn} asChild>
                <Link href="/my-account" className="flex cursor-pointer items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to profile
                </Link>
              </Button>

              <Button className={storefrontPrimaryBtn} asChild>
                <Link href="/products" className="cursor-pointer">
                  Continue shopping
                </Link>
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
