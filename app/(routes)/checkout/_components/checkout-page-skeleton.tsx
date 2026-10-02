import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { storefrontCard, storefrontPage, storefrontContainer } from "@/lib/storefront/surface";
import { cn } from "@/lib/utils";

const bar = "bg-brand-forest/10";
const accent = "bg-brand-champagne/60";

function FieldSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-2", className)}>
      <Skeleton className={cn("h-4 w-24", bar)} />
      <Skeleton className={cn("h-11 w-full", accent)} />
    </div>
  );
}

export default function CheckoutPageSkeleton() {
  return (
    <div className={storefrontPage}>
      <div className={cn(storefrontContainer, "pb-16 pt-10 md:pt-12")}>
        <header className="mb-10 space-y-3">
          <Skeleton className={cn("h-3 w-20", bar)} />
          <Skeleton className={cn("h-9 w-64 max-w-full sm:h-10 sm:w-80", bar)} />
        </header>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            {/* Shipping Information */}
            <Card className={storefrontCard}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Skeleton className={cn("h-8 w-8 shrink-0 rounded-full", accent)} />
                  <Skeleton className={cn("h-6 w-48", bar)} />
                </div>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="space-y-5">
                  <Skeleton className={cn("h-5 w-40", bar)} />
                  <FieldSkeleton />
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <FieldSkeleton />
                    <FieldSkeleton />
                  </div>
                </div>

                <div className="space-y-5">
                  <Skeleton className={cn("h-5 w-36", bar)} />
                  <FieldSkeleton />
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    <FieldSkeleton />
                    <FieldSkeleton />
                    <FieldSkeleton />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card className={storefrontCard}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Skeleton className={cn("h-8 w-8 shrink-0 rounded-full", accent)} />
                  <Skeleton className={cn("h-6 w-40", bar)} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-4 border border-brand-forest/10 p-5">
                  <Skeleton className={cn("mt-0.5 h-5 w-5 shrink-0 rounded-full", bar)} />
                  <Skeleton className={cn("h-10 w-10 shrink-0", accent)} />
                  <div className="min-w-0 flex-1 space-y-2 pt-1">
                    <Skeleton className={cn("h-5 w-40", bar)} />
                    <Skeleton className={cn("h-4 w-full max-w-sm", bar)} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <Card className={storefrontCard}>
                <CardHeader>
                  <Skeleton className={cn("h-6 w-36", bar)} />
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    {[1, 2].map((i) => (
                      <div key={i} className="flex items-center justify-between gap-3">
                        <div className="flex min-w-0 items-center gap-3">
                          <Skeleton className={cn("h-12 w-12 shrink-0", accent)} />
                          <div className="space-y-2">
                            <Skeleton className={cn("h-4 w-28", bar)} />
                            <Skeleton className={cn("h-3 w-20", bar)} />
                          </div>
                        </div>
                        <Skeleton className={cn("h-4 w-16 shrink-0", bar)} />
                      </div>
                    ))}
                  </div>

                  <div className="h-px bg-brand-forest/15" />

                  <div className="space-y-2">
                    {[1, 2].map((i) => (
                      <div key={i} className="flex justify-between">
                        <Skeleton className={cn("h-4 w-16", bar)} />
                        <Skeleton className={cn("h-4 w-20", bar)} />
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3">
                    <Skeleton className={cn("h-5 w-24", bar)} />
                    <div className="flex gap-2">
                      <Skeleton className={cn("h-10 flex-1", accent)} />
                      <Skeleton className={cn("h-10 w-16", accent)} />
                    </div>
                  </div>

                  <div className="border border-brand-forest/10 bg-brand-champagne/30 p-4">
                    <div className="flex justify-between">
                      <Skeleton className={cn("h-6 w-28", bar)} />
                      <Skeleton className={cn("h-6 w-24", bar)} />
                    </div>
                  </div>

                  <Skeleton className={cn("h-12 w-full rounded-none rounded-tr-2xl rounded-bl-2xl", accent)} />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
