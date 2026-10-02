"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ErrorComponent } from "@/components/ui/error-component";
import { CartSkeleton } from "@/components/ui/route-skeletons";
import { Trash2, Plus, Minus, Heart, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/lib/stores";
import { toast } from "sonner";
import { formatStorefrontPrice } from "@/lib/site-metadata";
import {
  storefrontCard,
  storefrontEyebrow,
  storefrontOutlineBtn,
  storefrontPage,
  storefrontPrimaryBtn,
  storefrontTitle,
} from "@/lib/storefront/surface";
import { cn } from "@/lib/utils";

export default function CartPage() {
  const {
    items: cartItems,
    loading,
    error,
    updateQuantity,
    removeItem,
    subtotal,
    itemCount,
  } = useCartStore();

  const handleUpdateQuantity = async (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    try {
      await updateQuantity(id, newQuantity);
    } catch {
      toast.error("Failed to update quantity");
    }
  };

  const handleRemoveItem = async (id: string) => {
    try {
      await removeItem(id);
      toast.success("Item removed from cart");
    } catch {
      toast.error("Failed to remove item");
    }
  };

  const taxVat = Math.round(subtotal * 0.15);
  const finalTotal = subtotal + taxVat;

  if (loading) {
    return <CartSkeleton />;
  }

  if (error) {
    return (
      <div className={storefrontPage}>
        <div className="mx-auto max-w-7xl px-4 py-16">
          <ErrorComponent
            title="Cart Error"
            message={error}
            onRefresh={() => window.location.reload()}
          />
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className={storefrontPage}>
        <div className="mx-auto max-w-7xl px-4 py-16">
          <div className="mx-auto max-w-md text-center">
            <div className={cn(storefrontCard, "mb-8 p-10")}>
              <ShoppingBag className="mx-auto mb-6 h-16 w-16 text-brand-forest/35" />
              <p className={storefrontEyebrow}>Cart</p>
              <h1 className={cn(storefrontTitle, "mb-3")}>Your cart is empty</h1>
              <p className="leading-relaxed text-foreground/55">
                Nothing here yet — explore the shop and add pieces you love.
              </p>
            </div>
            <Button size="lg" className={cn(storefrontPrimaryBtn, "px-8")} asChild>
              <Link href="/products">Continue shopping</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={storefrontPage}>
      <div className="mx-auto max-w-7xl px-4 py-10 lg:px-6 lg:py-14">
        <header className="mb-10">
          <p className={storefrontEyebrow}>Cart</p>
          <h1 className={storefrontTitle}>Your bag</h1>
          <p className="mt-2 text-sm text-foreground/55">
            {itemCount} {itemCount === 1 ? "piece" : "pieces"}
          </p>
        </header>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            {cartItems.map((item) => (
              <Card key={item.id} className={storefrontCard}>
                <CardContent className="p-5 md:p-6">
                  <div className="flex items-start gap-4">
                    <div className="relative h-24 w-20 shrink-0 overflow-hidden bg-brand-champagne/50">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="font-serif text-lg tracking-tight text-foreground">
                            {item.name}
                          </h3>
                          <div className="mt-1 text-sm text-foreground/55">
                            {item.size ? <p>Size: {item.size}</p> : null}
                            {item.color ? <p>Color: {item.color}</p> : null}
                          </div>
                          <div className="mt-2 flex items-center gap-2">
                            <span className="font-medium text-foreground">
                              {formatStorefrontPrice(item.price)}
                            </span>
                            {item.originalPrice && item.originalPrice > item.price ? (
                              <span className="text-sm text-foreground/35 line-through">
                                {formatStorefrontPrice(item.originalPrice)}
                              </span>
                            ) : null}
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            disabled={loading}
                            className="cursor-pointer text-brand-forest/60 hover:text-brand-forest"
                            onClick={() => toast.success("Added to wishlist")}
                          >
                            <Heart className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveItem(item.id)}
                            disabled={loading}
                            className="cursor-pointer text-foreground/40 hover:text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1 || loading}
                            className={cn(storefrontOutlineBtn, "h-8 w-8 p-0")}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center font-medium text-foreground">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                            disabled={loading}
                            className={cn(storefrontOutlineBtn, "h-8 w-8 p-0")}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <p className="font-medium text-foreground">
                          {formatStorefrontPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div>
            <Card className={cn(storefrontCard, "sticky top-4")}>
              <CardContent className="p-6">
                <h2 className="mb-6 font-serif text-xl tracking-tight text-foreground">
                  Order summary
                </h2>

                <div className="space-y-4 text-foreground">
                  <div className="flex justify-between text-sm">
                    <span className="text-foreground/60">Subtotal ({itemCount})</span>
                    <span className="font-medium">{formatStorefrontPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-foreground/60">
                    <span>Tax / VAT</span>
                    <span>{formatStorefrontPrice(taxVat)}</span>
                  </div>
                  <Separator className="bg-brand-forest/10" />
                  <div className="flex justify-between font-serif text-lg font-semibold">
                    <span>Total</span>
                    <span>{formatStorefrontPrice(finalTotal)}</span>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <Button
                    size="lg"
                    disabled={loading || cartItems.length === 0}
                    className={cn(storefrontPrimaryBtn, "w-full")}
                    asChild
                  >
                    <Link href="/checkout">
                      {loading ? "Processing..." : "Proceed to checkout"}
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className={cn(storefrontOutlineBtn, "w-full")}
                    asChild
                  >
                    <Link href="/products">Continue shopping</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
