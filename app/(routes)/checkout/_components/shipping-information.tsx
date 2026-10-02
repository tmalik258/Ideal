"use client";

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
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="font-serif text-lg font-semibold text-foreground">
            Personal Information
          </h3>

          <div>
            <Label htmlFor="name" className="text-foreground/70">
              Full Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className={cn(
                storefrontInput,
                formErrors.name && "border-red-500 focus-visible:border-red-500"
              )}
              placeholder="John Doe"
              required
            />
            {formErrors.name && (
              <p className="mt-1 text-xs text-red-500">{formErrors.name}</p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="phone" className="text-foreground/70">
                Phone Number <span className="text-red-500">*</span>
              </Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className={cn(
                  storefrontInput,
                  formErrors.phone && "border-red-500 focus-visible:border-red-500"
                )}
                placeholder="(123) 456-7890"
                required
              />
              {formErrors.phone && (
                <p className="mt-1 text-xs text-red-500">{formErrors.phone}</p>
              )}
            </div>
            <div>
              <Label htmlFor="email" className="text-foreground/70">
                Email Address <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className={cn(
                  storefrontInput,
                  formErrors.email && "border-red-500 focus-visible:border-red-500"
                )}
                placeholder="your@email.com"
                required
              />
              {formErrors.email && (
                <p className="mt-1 text-xs text-red-500">{formErrors.email}</p>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-serif text-lg font-semibold text-foreground">
            Shipping Address
          </h3>

          <div className="space-y-2">
            <Label htmlFor="street" className="text-sm font-medium text-foreground/70">
              Street Address <span className="text-red-500">*</span>
            </Label>
            <Input
              id="street"
              type="text"
              value={formData.street}
              onChange={(e) => handleInputChange("street", e.target.value)}
              className={cn(
                storefrontInput,
                formErrors.street && "border-red-500 focus-visible:border-red-500"
              )}
              placeholder="123 Main Street"
              required
            />
            {formErrors.street && (
              <p className="mt-1 text-xs text-red-500">{formErrors.street}</p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="city" className="text-sm font-medium text-foreground/70">
                City <span className="text-red-500">*</span>
              </Label>
              <Input
                id="city"
                type="text"
                value={formData.city}
                onChange={(e) => handleInputChange("city", e.target.value)}
                className={cn(
                  storefrontInput,
                  formErrors.city && "border-red-500 focus-visible:border-red-500"
                )}
                placeholder="Lahore"
                required
              />
              {formErrors.city && (
                <p className="mt-1 text-xs text-red-500">{formErrors.city}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="area" className="text-sm font-medium text-foreground/70">
                Area <span className="text-red-500">*</span>
              </Label>
              <Input
                id="area"
                type="text"
                value={formData.area}
                onChange={(e) => handleInputChange("area", e.target.value)}
                className={cn(
                  storefrontInput,
                  formErrors.area && "border-red-500 focus-visible:border-red-500"
                )}
                placeholder="Gulberg"
                required
              />
              {formErrors.area && (
                <p className="mt-1 text-xs text-red-500">{formErrors.area}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="postalCode" className="text-sm font-medium text-foreground/70">
                Postal Code <span className="text-red-500">*</span>
              </Label>
              <Input
                id="postalCode"
                type="text"
                value={formData.postalCode}
                onChange={(e) => handleInputChange("postalCode", e.target.value)}
                className={cn(
                  storefrontInput,
                  formErrors.postalCode && "border-red-500 focus-visible:border-red-500"
                )}
                placeholder="12345"
                required
              />
              {formErrors.postalCode && (
                <p className="mt-1 text-xs text-red-500">{formErrors.postalCode}</p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
