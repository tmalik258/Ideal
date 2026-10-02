import { CheckCircle } from "lucide-react";
import {
  storefrontCard,
  storefrontEyebrow,
  storefrontTitle,
} from "@/lib/storefront/surface";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
  orderNumber?: string;
  customerEmail?: string;
}

export function HeroSection({ orderNumber, customerEmail }: HeroSectionProps) {
  return (
    <section className="relative bg-brand-ivory px-4 py-16 sm:px-6 lg:px-8">
      <div className="relative mx-auto max-w-4xl text-center">
        <div className="mb-8 flex justify-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full border border-brand-forest/15 bg-brand-champagne/30">
            <CheckCircle className="h-14 w-14 text-brand-forest" strokeWidth={1.5} />
          </div>
        </div>

        <p className={storefrontEyebrow}>Confirmed</p>
        <h1 className={cn(storefrontTitle, "mb-6")}>
          Thank you — order placed
        </h1>

        <p className="mx-auto mb-8 max-w-2xl text-xl leading-relaxed text-foreground/55 sm:text-2xl">
          We&apos;ve sent your order details to your email.
        </p>

        {orderNumber && (
          <div className={cn(storefrontCard, "mx-auto max-w-md p-6")}>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-foreground/55">Order Number:</span>
                <span className="font-semibold text-foreground">#{orderNumber}</span>
              </div>
              {customerEmail && (
                <div className="flex items-center justify-between">
                  <span className="text-foreground/55">Email:</span>
                  <span className="ml-2 truncate font-medium text-foreground">{customerEmail}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
