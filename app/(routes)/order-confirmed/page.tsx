"use client";

import { Suspense } from "react";
import OrderContent from "./_components/order-confirmed/order-content";
import { storefrontPage } from "@/lib/storefront/surface";
import { cn } from "@/lib/utils";

// Main page component with Suspense
export default function OrderConfirmedPage() {
  return (
    <Suspense
      fallback={
        <div className={cn(storefrontPage, "flex min-h-screen items-center justify-center")}>
          <div className="text-center">
            <div className="mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-4 border-brand-forest border-t-transparent"></div>
            <p className="text-lg font-medium text-foreground">Loading order details...</p>
          </div>
        </div>
      }
    >
      <OrderContent />
    </Suspense>
  );
}
