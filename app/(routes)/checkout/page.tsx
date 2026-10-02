"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";
import { useCartStore } from "@/lib/stores/cart-store";
import { useUserStore } from "@/lib/stores/user-store";
import { ErrorComponent } from "@/components/ui/error-component";
import {
  OrderSummary,
  ShippingInformation,
  PaymentMethod,
  CheckoutPageSkeleton,
} from "./_components";
import type {
  PromoCodeValidationResponse,
  PromoCodeApplicationResponse,
} from "@/lib/types/promo-code";
import { formatStorefrontPrice } from "@/lib/site-metadata";
import { storefrontEyebrow, storefrontPage, storefrontTitle, storefrontContainer } from "@/lib/storefront/surface";
import { cn } from "@/lib/utils";

type CheckoutFormData = {
  name: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  area: string;
  postalCode: string;
};

type CheckoutFormErrors = {
  name: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  area: string;
  postalCode: string;
};

const EMPTY_ERRORS: CheckoutFormErrors = {
  name: "",
  email: "",
  phone: "",
  street: "",
  city: "",
  area: "",
  postalCode: "",
};

function getValidationErrors(formData: CheckoutFormData): CheckoutFormErrors {
  const errors: CheckoutFormErrors = { ...EMPTY_ERRORS };

  if (!formData.name.trim()) {
    errors.name = "Full name is required";
  }
  if (!formData.email.trim()) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = "Please enter a valid email";
  }
  if (!formData.phone.trim()) {
    errors.phone = "Phone number is required";
  } else if (
    !/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/[\s\-\(\)]/g, ""))
  ) {
    errors.phone = "Please enter a valid phone number";
  }

  if (!formData.city.trim()) {
    errors.city = "City is required";
  }
  if (!formData.area.trim()) {
    errors.area = "Area is required";
  }
  if (!formData.postalCode.trim()) {
    errors.postalCode = "Postal code is required";
  } else if (formData.postalCode.trim().length < 3) {
    errors.postalCode = "Please enter a valid postal code";
  }

  return errors;
}

function hasRequiredErrors(errors: CheckoutFormErrors): boolean {
  return Boolean(
    errors.name ||
      errors.email ||
      errors.phone ||
      errors.city ||
      errors.area ||
      errors.postalCode
  );
}

export default function CheckoutPage() {
  const { items: cartItems, getTotalPrice, clearCartSilently } = useCartStore();
  const { profile } = useUserStore();
  const router = useRouter();
  const isSignedIn = Boolean(profile?.id);

  const [formErrors, setFormErrors] = useState<CheckoutFormErrors>(EMPTY_ERRORS);
  const [showErrors, setShowErrors] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isConfirming, setIsConfirming] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromoCode, setAppliedPromoCode] = useState<string | null>(null);
  const [promoCodeDiscount, setPromoCodeDiscount] = useState(0);
  const [isApplyingPromoCode, setIsApplyingPromoCode] = useState(false);
  const [formData, setFormData] = useState<CheckoutFormData>({
    name: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    area: "",
    postalCode: "",
  });
  const [paymentData, setPaymentData] = useState({
    selectedPaymentType: "cod",
    saveCard: false,
  });

  const handlePaymentDataChange = (data: {
    paymentMethod?: string;
    paymentStatus?: string;
    selectedPaymentType?: string;
    saveCard?: boolean;
  }) => {
    setPaymentData((prev) => ({
      selectedPaymentType: data.selectedPaymentType ?? prev.selectedPaymentType,
      saveCard: data.saveCard ?? prev.saveCard,
    }));
  };

  useEffect(() => {
    setIsLoading(false);
    if (cartItems.length === 0) {
      toast.error("Your cart is empty. Redirecting to shop...");
      router.push("/products");
    }
  }, [router, cartItems.length]);

  useEffect(() => {
    if (!profile) return;
    setFormData((prev) => ({
      ...prev,
      name: prev.name || profile.name || "",
      email: prev.email || profile.email || "",
    }));
  }, [profile]);

  const subtotal = getTotalPrice();
  const shipping = 200;
  const tax = 0;
  const discount = isSignedIn ? promoCodeDiscount : 0;
  const total = Math.max(0, subtotal + shipping + tax - discount);

  const syncErrorsIfNeeded = useCallback(
    (nextFormData: CheckoutFormData, shouldShow: boolean) => {
      if (!shouldShow) return;
      setFormErrors(getValidationErrors(nextFormData));
    },
    []
  );

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => {
      const next = { ...prev, [field]: value };
      syncErrorsIfNeeded(next, showErrors);
      return next;
    });
  };

  const applyPromoCode = async () => {
    if (!isSignedIn) {
      toast.error("Sign in to use promo codes");
      return;
    }

    if (!promoCode.trim()) {
      toast.error("Please enter a valid promo code");
      return;
    }

    if (appliedPromoCode === promoCode.trim()) {
      toast.info("This promo code is already applied");
      return;
    }

    setIsApplyingPromoCode(true);

    try {
      const orderTotal = subtotal + shipping + tax;
      const validationResponse = await axios.post<PromoCodeValidationResponse>(
        "/api/promo-codes/validate",
        {
          code: promoCode.trim(),
          orderTotal,
        }
      );

      if (!validationResponse.data.valid) {
        toast.error(validationResponse.data.error || "Invalid promo code");
        return;
      }

      const applicationResponse = await axios.post<PromoCodeApplicationResponse>(
        "/api/promo-codes/apply",
        {
          code: promoCode.trim(),
          orderTotal,
        }
      );

      if (applicationResponse.data.success) {
        setAppliedPromoCode(promoCode.trim());
        setPromoCodeDiscount(applicationResponse.data.discountAmount ?? 0);
        toast.success(
          `Promo code applied! You saved ${formatStorefrontPrice(applicationResponse.data.discountAmount ?? 0)}`
        );
      } else {
        toast.error(applicationResponse.data.error || "Failed to apply promo code");
      }
    } catch (error) {
      console.error("Promo code application error:", error);
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to apply promo code. Please try again.");
      }
    } finally {
      setIsApplyingPromoCode(false);
    }
  };

  const removePromoCode = () => {
    setAppliedPromoCode(null);
    setPromoCodeDiscount(0);
    setPromoCode("");
    toast.success("Promo code removed");
  };

  const validateShippingAddress = async () => {
    try {
      const response = await fetch("/api/shipping/validate-address", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          street: formData.street,
          city: formData.city,
          area: formData.area,
          postalCode: formData.postalCode,
        }),
      });

      const result = await response.json();

      if (!result.isValid) {
        const errorMessage = result.issues?.join(", ") || "Invalid address";
        toast.error(`Address validation failed: ${errorMessage}`);
        return false;
      }

      if (result.suggestions && result.suggestions.length > 0) {
        toast.info(`Suggestion: ${result.suggestions.join(", ")}`);
      }

      return true;
    } catch (error) {
      console.log("Address validation error:", error);
      toast.warning(
        "Address validation service unavailable, proceeding with checkout"
      );
      return true;
    }
  };

  const handleConfirmOrder = async () => {
    setShowErrors(true);
    const errors = getValidationErrors(formData);
    setFormErrors(errors);

    if (hasRequiredErrors(errors)) {
      toast.error("Please fix the errors in the form before submitting");
      return;
    }

    setIsConfirming(true);
    toast.info("Submitting order...");

    try {
      const isAddressValid = await validateShippingAddress();
      if (!isAddressValid) {
        return;
      }

      const paymentMethod = paymentData.selectedPaymentType || "cod";

      const orderData = {
        ...(profile?.id ? { userId: profile.id } : {}),
        email: formData.email,
        items: cartItems.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
        })),
        shippingAddress: {
          name: formData.name,
          street: formData.street,
          city: formData.city,
          area: formData.area,
          postalCode: formData.postalCode,
          phone: formData.phone,
        },
        paymentMethod,
        subtotal,
        tax,
        shipping,
        discount,
        totalAmount: total,
        promoCode: isSignedIn ? appliedPromoCode : null,
      };

      const response = await fetch("/api/orders/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        const errorMessage =
          typeof result.error === "string"
            ? result.error
            : result.error?.message || "Failed to place order";
        toast.error(errorMessage);
        return;
      }

      const orderId = result.orderId || null;
      toast.success("Order placed with Cash on Delivery!");
      clearCartSilently();

      if (orderId) {
        router.push(`/order-confirmed?orderId=${orderId}`);
      } else {
        router.push("/order-confirmed");
      }
    } catch (error: unknown) {
      console.log("Order failed:", error);

      if (error instanceof Error) {
        if (error.name === "TypeError" && error.message.includes("fetch")) {
          toast.error(
            "Network error: Unable to connect to the server. Please check your internet connection and try again."
          );
        } else if (error.name === "SyntaxError") {
          toast.error(
            "Server returned an invalid response. Please try again later."
          );
        } else {
          toast.error(
            error.message || "Failed to place order. Please try again."
          );
        }
      } else {
        toast.error("Failed to place order. Please try again.");
      }
    } finally {
      setIsConfirming(false);
    }
  };

  if (isLoading) {
    return <CheckoutPageSkeleton />;
  }

  if (cartItems.length === 0) {
    return (
      <ErrorComponent
        title="Cart is Empty"
        message="Your cart is empty. Please add some items before proceeding to checkout."
      />
    );
  }

  return (
    <div className={storefrontPage}>
      <div className={cn(storefrontContainer, "pb-16 pt-10 md:pt-12")}>
        <header className="mb-10">
          <p className={storefrontEyebrow}>Checkout</p>
          <h1
            className={cn(storefrontTitle, "text-[clamp(1.5rem,3vw,2.25rem)]")}
          >
            Complete your order
          </h1>
        </header>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <ShippingInformation
              formData={formData}
              formErrors={showErrors ? formErrors : EMPTY_ERRORS}
              handleInputChange={handleInputChange}
            />

            <PaymentMethod
              paymentData={paymentData}
              onPaymentDataChange={handlePaymentDataChange}
            />
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <OrderSummary
                cartItems={cartItems}
                subtotal={subtotal}
                shipping={shipping}
                discount={discount}
                total={total}
                promoCode={promoCode}
                setPromoCode={setPromoCode}
                applyPromoCode={applyPromoCode}
                appliedPromoCode={appliedPromoCode}
                removePromoCode={removePromoCode}
                isApplyingPromoCode={isApplyingPromoCode}
                canUsePromo={isSignedIn}
                onConfirmOrder={handleConfirmOrder}
                isConfirming={isConfirming}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
