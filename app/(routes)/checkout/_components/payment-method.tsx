"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Banknote } from "lucide-react";
import { storefrontCard } from "@/lib/storefront/surface";
import { cn } from "@/lib/utils";

interface PaymentMethodProps {
  paymentData: {
    selectedPaymentType: string;
    saveCard: boolean;
  };
  onPaymentDataChange: (data: {
    paymentMethod?: string;
    paymentStatus?: string;
    selectedPaymentType?: string;
    saveCard?: boolean;
  }) => void;
}

const PaymentMethod: React.FC<PaymentMethodProps> = ({
  paymentData,
  onPaymentDataChange,
}) => {
  const [selectedPaymentType, setSelectedPaymentType] = useState(
    paymentData.selectedPaymentType || "cod"
  );

  const selectCod = () => {
    setSelectedPaymentType("cod");
    onPaymentDataChange({
      selectedPaymentType: "cod",
      paymentMethod: "cod",
      paymentStatus: "pending",
    });
  };

  return (
    <Card className={storefrontCard}>
      <CardHeader>
        <CardTitle className="flex items-center font-serif text-foreground">
          <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-brand-forest text-sm font-semibold text-brand-champagne">
            2
          </div>
          Payment Method
        </CardTitle>
      </CardHeader>
      <CardContent>
        <button
          type="button"
          onClick={selectCod}
          className={cn(
            "flex w-full cursor-pointer items-start gap-4 border p-5 text-left transition-colors",
            selectedPaymentType === "cod"
              ? "border-brand-forest bg-brand-champagne/35"
              : "border-brand-forest/15 bg-brand-ivory hover:border-brand-forest/40"
          )}
        >
          <span
            className={cn(
              "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2",
              selectedPaymentType === "cod"
                ? "border-brand-forest"
                : "border-brand-forest/30"
            )}
            aria-hidden
          >
            {selectedPaymentType === "cod" ? (
              <span className="h-2.5 w-2.5 rounded-full bg-brand-forest" />
            ) : null}
          </span>

          <span className="flex min-w-0 flex-1 items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-brand-forest/10 text-brand-forest">
              <Banknote className="h-5 w-5" />
            </span>
            <span className="min-w-0">
              <span className="block font-serif text-base font-semibold tracking-tight text-foreground">
                Cash on Delivery
              </span>
              <span className="mt-1 block text-sm leading-relaxed text-foreground/55">
                Pay in cash when your order is delivered to your door.
              </span>
            </span>
          </span>
        </button>
      </CardContent>
    </Card>
  );
};

export default PaymentMethod;
