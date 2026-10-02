"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Banknote } from "lucide-react";
import { toast } from "sonner";
import { storefrontCard, storefrontPrimaryBtn } from "@/lib/storefront/surface";
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
  onProceed: () => void;
  onOrderSubmit: (e: React.FormEvent) => Promise<string | null>;
  orderId?: string | null;
  totalAmount: number;
  isFormValid?: boolean;
}

const PaymentMethod: React.FC<PaymentMethodProps> = ({
  onPaymentDataChange,
  onProceed,
  onOrderSubmit,
  isFormValid,
}) => {
  const [selectedPaymentType] = useState("cod");
  const [processing, setProcessing] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{
    [key: string]: string;
  }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationErrors({});

    if (!selectedPaymentType) {
      setValidationErrors({ paymentMethod: "Please select a payment method" });
      return;
    }

    setProcessing(true);

    try {
      onPaymentDataChange({
        paymentMethod: selectedPaymentType,
        paymentStatus: "pending",
      });

      const createdOrderId = await onOrderSubmit(e);
      if (!createdOrderId) {
        setValidationErrors({ general: "Failed to create order" });
        setProcessing(false);
        return;
      }

      toast.success("Order placed with Cash on Delivery!");
      onProceed();
    } catch (error) {
      console.log("Payment error:", error);
      setValidationErrors({
        general: "An unexpected error occurred. Please try again.",
      });
      toast.error("Payment failed. Please try again.");
    } finally {
      setProcessing(false);
    }
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
      <CardContent className="space-y-6">
        <div>
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-semibold text-foreground">
              Payment Options
            </h3>

            {validationErrors.paymentMethod && (
              <p className="text-sm text-red-600">
                {validationErrors.paymentMethod}
              </p>
            )}

            <div
              className={cn(
                "flex cursor-pointer items-center justify-between rounded-lg border border-brand-forest/15 p-4 ring-2 ring-brand-forest transition-all",
                validationErrors.paymentMethod && "border-red-500"
              )}
            >
              <div className="flex items-center space-x-3">
                <div className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-brand-forest">
                  <div className="h-3 w-3 rounded-full bg-brand-forest" />
                </div>
                <div className="flex items-center space-x-2">
                  <Banknote className="h-5 w-5 text-foreground/70" />
                  <span className="text-base font-medium text-foreground">
                    Cash on Delivery
                  </span>
                </div>
              </div>
            </div>
          </div>

          {validationErrors.general && (
            <p className="mt-4 text-sm text-red-600">
              {validationErrors.general}
            </p>
          )}

          <div className="flex justify-center pt-6">
            <button
              type="button"
              disabled={processing || !isFormValid}
              onClick={handleSubmit}
              className={cn(
                storefrontPrimaryBtn,
                "flex items-center justify-center rounded-none rounded-tr-2xl rounded-bl-2xl px-12 py-3 transition-all disabled:cursor-not-allowed disabled:opacity-50"
              )}
            >
              <span className="text-base font-bold">
                {processing ? "Processing..." : "Place Order"}
              </span>
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentMethod;
