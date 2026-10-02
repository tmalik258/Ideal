import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { SITE_CURRENCY } from "@/lib/site-metadata";
import {
  storefrontCard,
  storefrontOutlineBtn,
  storefrontPrimaryBtn,
} from "@/lib/storefront/surface";
import { cn } from "@/lib/utils";

interface OrderItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  size?: string;
  color?: string;
}

interface Address {
  name: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface ContentSectionProps {
  orderItems: OrderItem[];
  shippingAddress: Address;
  paymentMethod: string;
  estimatedDelivery: string;
}

export function ContentSection({
  orderItems,
  shippingAddress,
  paymentMethod,
  estimatedDelivery,
}: ContentSectionProps) {
  return (
    <section className="min-h-screen bg-brand-ivory px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 space-y-4">
          {orderItems.map((item) => (
            <div key={item.id} className={cn(storefrontCard, "p-4")}>
              <div className="flex items-center gap-4">
                <div className="relative h-16 w-16 overflow-hidden border border-brand-forest/15 bg-brand-champagne/30">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground">&quot;{item.name}&quot;</h3>
                  <div className="mt-1 flex items-center gap-4 text-sm text-foreground/55">
                    {item.color && <span>Color: {item.color}</span>}
                    {item.quantity && <span>Qty: {item.quantity}</span>}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold text-foreground">
                    {SITE_CURRENCY} {item.price.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className={cn(storefrontCard, "p-6")}>
            <h3 className="mb-3 font-semibold text-foreground">Payment Method</h3>
            <p className="text-foreground/55">{paymentMethod} ..........</p>
          </div>

          <div className={cn(storefrontCard, "p-6")}>
            <h3 className="mb-3 font-semibold text-foreground">Shipping Address</h3>
            <p className="text-foreground/55">{shippingAddress.street}</p>
          </div>

          <div className={cn(storefrontCard, "p-6")}>
            <h3 className="mb-3 font-semibold text-foreground">Contact Email</h3>
            <p className="text-foreground/55">Sarah@example.com</p>
          </div>

          <div className={cn(storefrontCard, "p-6")}>
            <h3 className="mb-3 font-semibold text-foreground">Estimated Delivery</h3>
            <p className="text-foreground/55">{estimatedDelivery}</p>
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <Button className={cn(storefrontPrimaryBtn, "cursor-pointer px-8 py-3 font-semibold")}>
            Track My Order
          </Button>
          <Button
            variant="outline"
            className={cn(storefrontOutlineBtn, "cursor-pointer px-8 py-3 font-semibold")}
            asChild
          >
            <Link href="/products">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
