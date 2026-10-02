import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

// Cart Page Skeleton
export function CartSkeleton() {
  return (
    <div className="min-h-screen bg-brand-ivory pt-[var(--site-chrome-height,4rem)]">
      <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          <Skeleton className="h-8 w-32 mb-6 bg-brand-forest/10" />
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} className="rounded-none border border-brand-forest/15 bg-brand-ivory shadow-none">
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <Skeleton className="h-20 w-20 rounded-md bg-brand-forest/10" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-48 bg-brand-forest/10" />
                    <Skeleton className="h-3 w-32 bg-brand-forest/10" />
                    <div className="flex items-center space-x-4">
                      <Skeleton className="h-8 w-24 bg-brand-forest/10" />
                      <Skeleton className="h-4 w-16 bg-brand-forest/10" />
                    </div>
                  </div>
                  <Skeleton className="h-8 w-8 bg-brand-forest/10" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Order Summary */}
        <div>
          <Card className="rounded-none border border-brand-forest/15 bg-brand-ivory shadow-none">
            <CardHeader>
              <Skeleton className="h-6 w-32 bg-brand-forest/10" />
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-16 bg-brand-forest/10" />
                  <Skeleton className="h-4 w-12 bg-brand-forest/10" />
                </div>
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-20 bg-brand-forest/10" />
                  <Skeleton className="h-4 w-12 bg-brand-forest/10" />
                </div>
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-12 bg-brand-forest/10" />
                  <Skeleton className="h-4 w-12 bg-brand-forest/10" />
                </div>
              </div>
              <Skeleton className="h-10 w-full bg-brand-forest/10" />
            </CardContent>
          </Card>
        </div>
      </div>
      </div>
    </div>
  );
}

// Products Page Skeleton — matches loaded /products editorial layout
export const ProductsPageSkeleton = () => {
  return (
    <div className="min-h-screen bg-brand-ivory pt-[var(--site-chrome-height,4rem)]">
      <div className="mx-auto max-w-7xl px-4 py-10 lg:px-6 lg:py-14">
        <div className="space-y-8 md:space-y-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl space-y-3">
              <Skeleton className="h-3 w-14 bg-brand-forest/10" />
              <Skeleton className="h-10 w-56 bg-brand-forest/10 sm:h-12 sm:w-72" />
              <Skeleton className="h-4 w-24 bg-brand-forest/10" />
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-10 w-[180px] rounded-md bg-brand-forest/10" />
              <Skeleton className="h-10 w-28 rounded-md bg-brand-forest/10" />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-x-8 lg:gap-y-12">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex flex-col">
                <Skeleton className="aspect-[3/4] w-full rounded-none bg-brand-champagne/70" />
                <div className="space-y-2 border-b border-brand-forest/10 pt-4 pb-4">
                  <Skeleton className="h-3 w-20 bg-brand-forest/10" />
                  <Skeleton className="h-5 w-4/5 bg-brand-forest/10" />
                  <Skeleton className="h-4 w-16 bg-brand-forest/10" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Checkout Page Skeleton
export function CheckoutSkeleton() {
  return (
    <div className="min-h-screen bg-brand-ivory pt-[var(--site-chrome-height,4rem)]">
      <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Checkout Form */}
        <div className="space-y-6">
          <Skeleton className="mb-6 h-8 w-40 bg-brand-forest/10" />
          
          {/* Contact Information */}
          <Card className="rounded-2xl border-0 bg-white shadow-sm">
            <CardHeader>
              <Skeleton className="h-6 w-48 bg-brand-forest/10" />
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-10 w-full bg-brand-forest/10" />
              <Skeleton className="h-10 w-full bg-brand-forest/10" />
            </CardContent>
          </Card>
          
          {/* Shipping Address */}
          <Card className="rounded-2xl border-0 bg-white shadow-sm">
            <CardHeader>
              <Skeleton className="h-6 w-36 bg-brand-forest/10" />
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-10 w-full bg-brand-forest/10" />
              <div className="grid grid-cols-2 gap-4">
                <Skeleton className="h-10 w-full bg-brand-forest/10" />
                <Skeleton className="h-10 w-full bg-brand-forest/10" />
              </div>
              <Skeleton className="h-10 w-full bg-brand-forest/10" />
            </CardContent>
          </Card>
          
          {/* Payment Method */}
          <Card className="rounded-2xl border-0 bg-white shadow-sm">
            <CardHeader>
              <Skeleton className="h-6 w-32 bg-brand-forest/10" />
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex items-center space-x-2">
                    <Skeleton className="h-4 w-4 rounded-full bg-brand-forest/10" />
                    <Skeleton className="h-4 w-24 bg-brand-forest/10" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Order Summary */}
        <div>
          <Card className="rounded-2xl border-0 bg-white shadow-sm">
            <CardHeader>
              <Skeleton className="h-6 w-32 bg-brand-forest/10" />
            </CardHeader>
            <CardContent className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <Skeleton className="h-16 w-16 rounded-md bg-brand-forest/10" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-32 bg-brand-forest/10" />
                    <Skeleton className="h-3 w-20 bg-brand-forest/10" />
                  </div>
                  <Skeleton className="h-4 w-12 bg-brand-forest/10" />
                </div>
              ))}
              <div className="space-y-2 border-t border-zinc-100 pt-4">
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-16 bg-brand-forest/10" />
                  <Skeleton className="h-4 w-12 bg-brand-forest/10" />
                </div>
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-20 bg-brand-forest/10" />
                  <Skeleton className="h-4 w-12 bg-brand-forest/10" />
                </div>
                <div className="flex justify-between font-bold">
                  <Skeleton className="h-5 w-12 bg-brand-forest/10" />
                  <Skeleton className="h-5 w-16 bg-brand-forest/10" />
                </div>
              </div>
              <Skeleton className="h-12 w-full bg-brand-forest/10" />
            </CardContent>
          </Card>
        </div>
      </div>
      </div>
    </div>
  );
}

// Contact Page Skeleton
export function ContactSkeleton() {
  return (
    <div className="min-h-screen bg-brand-ivory pt-[var(--site-chrome-height,4rem)]">
      <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <Skeleton className="h-10 w-48 mx-auto mb-4" />
          <Skeleton className="h-4 w-96 mx-auto" />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="space-y-6">
            <Skeleton className="h-6 w-32 mb-4" />
            <div className="space-y-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
          
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <Skeleton className="h-6 w-40 mb-4" />
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex items-center space-x-4">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="space-y-1">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-3 w-32" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <Skeleton className="h-6 w-48 mb-4" />
              <div className="space-y-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-48" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

// My Account Page Skeleton — shared with my-account route
export { MyAccountSkeleton } from "@/app/(routes)/my-account/_components/my-account-skeleton";

// Wishlist Page Skeleton — matches editorial ProductCard
export function WishlistSkeleton() {
  return (
    <div className="min-h-screen bg-brand-ivory pt-[var(--site-chrome-height,4rem)]">
      <div className="mx-auto max-w-7xl px-4 py-10 lg:px-6 lg:py-14">
        <div className="mb-10 space-y-3">
          <Skeleton className="h-3 w-16 bg-brand-forest/10" />
          <Skeleton className="h-10 w-40 bg-brand-forest/10" />
          <Skeleton className="h-4 w-48 bg-brand-forest/10" />
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-x-8 lg:gap-y-12">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex flex-col">
              <Skeleton className="aspect-[3/4] w-full rounded-none bg-brand-champagne/70" />
              <div className="space-y-2 border-b border-brand-forest/10 pt-4 pb-4">
                <Skeleton className="h-3 w-20 bg-brand-forest/10" />
                <Skeleton className="h-5 w-4/5 bg-brand-forest/10" />
                <Skeleton className="h-4 w-16 bg-brand-forest/10" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Track Order Page Skeleton
export function TrackOrderSkeleton() {
  return (
    <div className="min-h-screen bg-brand-ivory pt-[var(--site-chrome-height,4rem)]">
      <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 space-y-2">
          <Skeleton className="h-9 w-48 bg-brand-forest/10" />
          <Skeleton className="h-4 w-64 bg-brand-forest/10" />
        </div>
        
        {/* Search Form */}
        <Card className="mb-8 rounded-2xl border-0 bg-white shadow-sm">
          <CardContent className="p-6">
            <div className="flex gap-4">
              <Skeleton className="h-12 flex-1 bg-brand-forest/10" />
              <Skeleton className="h-12 w-32 bg-brand-forest/10" />
            </div>
          </CardContent>
        </Card>
        
        {/* Order Status */}
        <div className="space-y-6">
          <Card className="rounded-2xl border-0 bg-white shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Skeleton className="h-6 w-32 bg-brand-forest/10" />
                <Skeleton className="h-6 w-20 bg-brand-forest/10" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Skeleton className="h-3 w-24 bg-brand-forest/10" />
                  <Skeleton className="h-4 w-32 bg-brand-forest/10" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-3 w-20 bg-brand-forest/10" />
                  <Skeleton className="h-4 w-28 bg-brand-forest/10" />
                </div>
              </div>
              <Skeleton className="h-2 w-full bg-brand-forest/10" />
            </CardContent>
          </Card>
          
          {/* Timeline */}
          <Card className="rounded-2xl border-0 bg-white shadow-sm">
            <CardHeader>
              <Skeleton className="h-6 w-40 bg-brand-forest/10" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex items-center space-x-4">
                    <Skeleton className="h-8 w-8 rounded-full bg-brand-forest/10" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-48 bg-brand-forest/10" />
                      <Skeleton className="h-3 w-32 bg-brand-forest/10" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      </div>
    </div>
  );
}
