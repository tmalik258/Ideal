'use client';

import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ContentSection } from './content-section';
import { LOGO_PATH, SITE_CURRENCY } from '@/lib/site-metadata';

type OrderApiResponse = {
  id: string;
  orderNumber: string;
  status: string;
  totalAmount: number;
  paymentMethod: string | null;
  guestEmail: string | null;
  estimatedDelivery: string | null;
  createdAt: string;
  user: { id: string; name: string; email: string } | null;
  shippingAddress: {
    name: string;
    street: string | null;
    city: string;
    area: string;
    postalCode: string;
    phone: string | null;
    email: string | null;
  } | null;
  items: Array<{
    id: string;
    quantity: number;
    price: number;
    product: {
      id: string;
      name: string;
      images: string[];
    };
  }>;
};

async function fetchOrder(orderId: string): Promise<OrderApiResponse> {
  const response = await fetch(`/api/orders/${orderId}`);
  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.error || 'Failed to load order');
  }
  return response.json();
}

function formatDelivery(value: string | null): string {
  if (!value) return '3–5 business days';
  return new Date(value).toLocaleDateString('en-PK', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function OrderContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');

  const { data: order, isLoading, error } = useQuery({
    queryKey: ['order-confirmed', orderId],
    queryFn: () => fetchOrder(orderId as string),
    enabled: Boolean(orderId),
  });

  if (!orderId) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 bg-brand-ivory px-4 text-center">
        <p className="text-foreground/60">No order was provided.</p>
        <Button asChild className="cursor-pointer bg-brand-forest text-brand-champagne hover:bg-brand-forest/90">
          <Link href="/">Continue shopping</Link>
        </Button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center bg-brand-ivory text-foreground/50">
        Loading your order…
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 bg-brand-ivory px-4 text-center">
        <p className="text-foreground/60">
          {error instanceof Error ? error.message : 'Order not found'}
        </p>
        <Button asChild className="cursor-pointer bg-brand-forest text-brand-champagne hover:bg-brand-forest/90">
          <Link href="/">Continue shopping</Link>
        </Button>
      </div>
    );
  }

  const shipping = order.shippingAddress;
  const orderItems = order.items.map((item) => ({
    id: item.id,
    name: item.product.name,
    image: item.product.images[0] || LOGO_PATH,
    price: item.price,
    quantity: item.quantity,
  }));

  return (
    <div>
      <div className="bg-brand-forest px-4 py-12 text-center text-brand-champagne sm:px-6">
        <p className="font-serif text-[0.65rem] font-semibold tracking-[0.28em] text-brand-champagne/70 uppercase">
          Order confirmed
        </p>
        <h1 className="mt-3 font-serif text-3xl tracking-tight sm:text-4xl">Thank you</h1>
        <p className="mt-3 text-brand-champagne/80">
          Order <span className="font-medium text-brand-champagne">{order.orderNumber}</span>
          {' · '}
          {SITE_CURRENCY} {order.totalAmount.toFixed(2)}
        </p>
      </div>

      <ContentSection
        orderItems={orderItems}
        shippingAddress={{
          name: shipping?.name ?? '—',
          street: shipping?.street ?? shipping?.area ?? '—',
          city: shipping?.city ?? '—',
          state: shipping?.area ?? '—',
          zipCode: shipping?.postalCode ?? '—',
          country: 'Pakistan',
        }}
        paymentMethod={order.paymentMethod ?? 'Cash on delivery'}
        estimatedDelivery={formatDelivery(order.estimatedDelivery)}
      />
    </div>
  );
}
