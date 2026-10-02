"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Loader2, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CartItem } from "@/lib/stores/cart-store";
import { formatStorefrontPrice } from "@/lib/site-metadata";
import {
  storefrontCard,
  storefrontInput,
  storefrontOutlineBtn,
  storefrontPrimaryBtn,
} from "@/lib/storefront/surface";
import { cn } from "@/lib/utils";

interface OrderSummaryProps {
  cartItems: CartItem[];
  subtotal: number;
  shipping: number;
  discount?: number;
  total: number;
  promoCode?: string;
  setPromoCode?: (value: string) => void;
  applyPromoCode?: () => void;
  appliedPromoCode?: string | null;
  removePromoCode?: () => void;
  isApplyingPromoCode?: boolean;
  canUsePromo?: boolean;
  onConfirmOrder?: () => void;
  isConfirming?: boolean;
}

export const OrderSummary = ({
  cartItems,
  subtotal,
  shipping,
  discount = 0,
  total,
  promoCode = "",
  setPromoCode = () => {},
  applyPromoCode = () => {},
  appliedPromoCode = null,
  removePromoCode = () => {},
  isApplyingPromoCode = false,
  canUsePromo = true,
  onConfirmOrder,
  isConfirming = false,
}: OrderSummaryProps) => {
  return (
    <Card className={cn(storefrontCard, "sticky top-4")}>
      <CardHeader>
        <CardTitle className="font-serif text-foreground">Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <div className="relative h-12 w-12 shrink-0 overflow-hidden bg-brand-champagne/50">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="truncate text-sm font-medium text-foreground">
                    {item.name}
                  </h4>
                  <p className="text-xs text-foreground/60">
                    {item.size ? `Size: ${item.size}` : null}
                    {item.size && item.color ? ", " : null}
                    {item.color ? `Color: ${item.color}` : null}
                    {!item.size && !item.color ? `Qty: ${item.quantity}` : ` · Qty: ${item.quantity}`}
                  </p>
                </div>
              </div>
              <p className="shrink-0 text-sm font-semibold text-foreground tabular-nums">
                {formatStorefrontPrice(item.price * item.quantity)}
              </p>
            </div>
          ))}
        </div>

        <Separator className="bg-brand-forest/15" />

        <div className="space-y-2">
          <div className="flex justify-between text-sm text-foreground/60">
            <span>Subtotal</span>
            <span className="tabular-nums">{formatStorefrontPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm text-foreground/60">
            <span>Shipping</span>
            <span className="tabular-nums">
              {shipping === 0 ? "Free" : formatStorefrontPrice(shipping)}
            </span>
          </div>
          {discount > 0 ? (
            <div className="flex justify-between text-sm text-green-700">
              <span>Discount</span>
              <span className="tabular-nums">-{formatStorefrontPrice(discount)}</span>
            </div>
          ) : null}
        </div>

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
            <div className="flex items-center justify-between border border-green-200 bg-green-50 p-3">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  {appliedPromoCode}
                </Badge>
                <span className="text-sm text-green-600">Applied</span>
              </div>
              <Button
                type="button"
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
                type="button"
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

        <div className="border border-brand-forest/15 bg-brand-champagne/30 p-4">
          <div className="flex justify-between text-lg font-bold text-foreground">
            <span>Total Amount</span>
            <span className="tabular-nums">{formatStorefrontPrice(total)}</span>
          </div>
        </div>

        {onConfirmOrder ? (
          <Button
            type="button"
            onClick={onConfirmOrder}
            disabled={isConfirming}
            className={cn(
              storefrontPrimaryBtn,
              "h-12 w-full rounded-none rounded-tr-2xl rounded-bl-2xl text-base font-semibold disabled:cursor-not-allowed disabled:opacity-50"
            )}
          >
            {isConfirming ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              "Confirm Order"
            )}
          </Button>
        ) : null}
      </CardContent>
    </Card>
  );
};
