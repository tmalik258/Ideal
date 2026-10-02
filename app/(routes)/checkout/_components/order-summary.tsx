"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { X, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CartItem } from "@/lib/stores/cart-store";
import { SITE_CURRENCY } from "@/lib/site-metadata";
import {
  storefrontCard,
  storefrontInput,
  storefrontOutlineBtn,
} from "@/lib/storefront/surface";
import { cn } from "@/lib/utils";

interface OrderSummaryProps {
  cartItems: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  discount?: number;
  total: number;
  promoCode?: string;
  setPromoCode?: (value: string) => void;
  applyPromoCode?: () => void;
  appliedPromoCode?: string | null;
  removePromoCode?: () => void;
  isApplyingPromoCode?: boolean;
  canUsePromo?: boolean;
}

export const OrderSummary = ({
  cartItems,
  subtotal,
  shipping,
  tax,
  discount = 0,
  total,
  promoCode = "",
  setPromoCode = () => {},
  applyPromoCode = () => {},
  appliedPromoCode = null,
  removePromoCode = () => {},
  isApplyingPromoCode = false,
  canUsePromo = true,
}: OrderSummaryProps) => {
  return (
    <Card className={cn(storefrontCard, "sticky top-4")}>
      <CardHeader>
        <CardTitle className="font-serif text-foreground">Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Order Items */}
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative h-12 w-12 flex-shrink-0 rounded-lg bg-brand-champagne/50 p-2">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="rounded-md object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-sm font-medium text-foreground">
                    &quot;{item.name}&quot;
                  </h4>
                  <p className="text-xs text-foreground/60">
                    {item.size && `Size: ${item.size}`}
                    {item.color && `, Color: ${item.color}`}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-foreground">
                  {SITE_CURRENCY} {item.price.toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <Separator className="bg-brand-forest/15" />

        {/* Price Breakdown */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-foreground/60">
            <span>Subtotal</span>
            <span>{SITE_CURRENCY} {subtotal.toFixed(3)}</span>
          </div>
          <div className="flex justify-between text-sm text-foreground/60">
            <span>Shipping</span>
            <span>
              {shipping === 0 ? "Free" : `${SITE_CURRENCY} ${shipping.toFixed(2)}`}
            </span>
          </div>
          <div className="flex justify-between text-sm text-foreground/60">
            <span>Tax (5%)</span>
            <span>{SITE_CURRENCY} {tax.toFixed(3)}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-sm text-green-700">
              <span>Discount</span>
              <span>-{SITE_CURRENCY} {discount.toFixed(3)}</span>
            </div>
          )}
          <div className="flex justify-between pt-2 text-lg font-bold text-foreground">
            <span>Total</span>
            <span>{SITE_CURRENCY} {total.toFixed(3)}</span>
          </div>
        </div>

        {/* Promo Code Section */}
        <div className="space-y-3">
          <h3 className="font-serif font-semibold text-foreground">Promo Code</h3>
          {!canUsePromo ? (
            <p className="text-sm text-foreground/60">
              <Link
                href="/auth/login?next=/checkout"
                className="cursor-pointer font-medium text-foreground underline-offset-4 hover:underline"
              >
                Sign in
              </Link>{" "}
              to use promo codes.
            </p>
          ) : appliedPromoCode ? (
            <div className="flex items-center justify-between rounded-lg border border-green-200 bg-green-50 p-3">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  {appliedPromoCode}
                </Badge>
                <span className="text-sm text-green-600">Applied</span>
              </div>
              <Button
                onClick={removePromoCode}
                variant="ghost"
                size="sm"
                className="h-auto cursor-pointer p-1 text-green-600 hover:bg-green-100 hover:text-green-700"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Input
                placeholder="Enter promo code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className={storefrontInput}
                disabled={isApplyingPromoCode}
              />
              <Button
                onClick={applyPromoCode}
                variant="outline"
                className={storefrontOutlineBtn}
                disabled={isApplyingPromoCode || !promoCode.trim()}
              >
                {isApplyingPromoCode ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Apply"
                )}
              </Button>
            </div>
          )}
        </div>

        {/* Order Total Summary */}
        <div className="rounded-lg border border-brand-forest/15 bg-brand-champagne/30 p-4">
          <div className="flex justify-between text-lg font-bold text-foreground">
            <span>Total Amount:</span>
            <span>{SITE_CURRENCY} {total.toFixed(3)}</span>
          </div>
          <p className="mt-2 text-xs text-foreground/60">
            Complete all steps to place your order
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
