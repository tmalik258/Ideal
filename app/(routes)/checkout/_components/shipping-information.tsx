"use client";

import type { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { storefrontCard, storefrontInput } from "@/lib/storefront/surface";
import { cn } from "@/lib/utils";

interface ShippingInformationProps {
  formData: {
    name: string;
    email: string;
    phone: string;
    street: string;
    city: string;
    area: string;
    postalCode: string;
  };
  formErrors: {
    name?: string;
    email?: string;
    phone?: string;
    street?: string;
    city?: string;
    area?: string;
    postalCode?: string;
  };
  handleInputChange: (field: string, value: string) => void;
}

function Field({
  id,
  label,
  required,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-medium text-foreground/70">
        {label}
        {required ? <span className="text-red-500"> *</span> : null}
      </Label>
      {children}
      {error ? <p className="text-xs text-red-500">{error}</p> : null}
    </div>
  );
}

export const ShippingInformation = ({
  formData,
  formErrors,
  handleInputChange,
}: ShippingInformationProps) => {
  return (
    <Card className={storefrontCard}>
      <CardHeader>
        <CardTitle className="flex items-center font-serif text-foreground">
          <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-brand-forest text-sm font-semibold text-brand-champagne">
            1
          </div>
          Shipping Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="space-y-5">
          <h3 className="font-serif text-lg font-semibold tracking-tight text-foreground">
            Personal Information
          </h3>

          <Field id="name" label="Full Name" required error={formErrors.name}>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className={cn(
                storefrontInput,
                "h-11",
                formErrors.name && "border-red-500 focus-visible:border-red-500"
              )}
              placeholder="John Doe"
              autoComplete="name"
            />
          </Field>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <Field
              id="phone"
              label="Phone Number"
              required
              error={formErrors.phone}
            >
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className={cn(
                  storefrontInput,
                  "h-11",
                  formErrors.phone && "border-red-500 focus-visible:border-red-500"
                )}
                placeholder="0300 1234567"
                autoComplete="tel"
              />
            </Field>
            <Field
              id="email"
              label="Email Address"
              required
              error={formErrors.email}
            >
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className={cn(
                  storefrontInput,
                  "h-11",
                  formErrors.email && "border-red-500 focus-visible:border-red-500"
                )}
                placeholder="your@email.com"
                autoComplete="email"
              />
            </Field>
          </div>
        </div>

        <div className="space-y-5">
          <h3 className="font-serif text-lg font-semibold tracking-tight text-foreground">
            Shipping Address
          </h3>

          <Field id="street" label="Street Address" error={formErrors.street}>
            <Input
              id="street"
              type="text"
              value={formData.street}
              onChange={(e) => handleInputChange("street", e.target.value)}
              className={cn(
                storefrontInput,
                "h-11",
                formErrors.street && "border-red-500 focus-visible:border-red-500"
              )}
              placeholder="123 Main Street"
              autoComplete="street-address"
            />
          </Field>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <Field id="city" label="City" required error={formErrors.city}>
              <Input
                id="city"
                type="text"
                value={formData.city}
                onChange={(e) => handleInputChange("city", e.target.value)}
                className={cn(
                  storefrontInput,
                  "h-11",
                  formErrors.city && "border-red-500 focus-visible:border-red-500"
                )}
                placeholder="Lahore"
                autoComplete="address-level2"
              />
            </Field>

            <Field id="area" label="Area" required error={formErrors.area}>
              <Input
                id="area"
                type="text"
                value={formData.area}
                onChange={(e) => handleInputChange("area", e.target.value)}
                className={cn(
                  storefrontInput,
                  "h-11",
                  formErrors.area && "border-red-500 focus-visible:border-red-500"
                )}
                placeholder="Gulberg"
              />
            </Field>

            <Field
              id="postalCode"
              label="Postal Code"
              required
              error={formErrors.postalCode}
            >
              <Input
                id="postalCode"
                type="text"
                value={formData.postalCode}
                onChange={(e) => handleInputChange("postalCode", e.target.value)}
                className={cn(
                  storefrontInput,
                  "h-11",
                  formErrors.postalCode &&
                    "border-red-500 focus-visible:border-red-500"
                )}
                placeholder="54000"
                autoComplete="postal-code"
              />
            </Field>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
