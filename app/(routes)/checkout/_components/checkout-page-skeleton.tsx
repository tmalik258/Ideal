import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { storefrontCard, storefrontPage } from "@/lib/storefront/surface";
import { cn } from "@/lib/utils";

const skeletonBar = "bg-brand-forest/10";
const skeletonAccent = "bg-brand-champagne/60";

export default function CheckoutPageSkeleton() {
  return (
    <div className={storefrontPage}>
      <div className="container mx-auto px-4 py-8">
        {/* Trust Indicators Skeleton */}
        <div className="mb-8 flex items-center justify-center space-x-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center space-x-2">
              <Skeleton className={cn("h-5 w-5 rounded-full", skeletonBar)} />
              <Skeleton className={cn("h-4 w-24", skeletonBar)} />
            </div>
          ))}
        </div>

        {/* Progress Indicator Skeleton */}
        <div className="mb-8 flex justify-center">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center">
                <Skeleton className={cn("h-8 w-8 rounded-full", skeletonAccent)} />
                <Skeleton className={cn("ml-2 h-4 w-16", skeletonBar)} />
                {i < 3 && <Skeleton className={cn("ml-4 h-0.5 w-16", skeletonBar)} />}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Form Skeleton */}
          <div className="space-y-6 lg:col-span-2">
            <Card className={storefrontCard}>
              <CardHeader>
                <Skeleton className={cn("h-6 w-48", skeletonBar)} />
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Skeleton className={cn("h-4 w-20", skeletonBar)} />
                    <Skeleton className={cn("h-10 w-full", skeletonAccent)} />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className={cn("h-4 w-20", skeletonBar)} />
                    <Skeleton className={cn("h-10 w-full", skeletonAccent)} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Skeleton className={cn("h-4 w-16", skeletonBar)} />
                  <Skeleton className={cn("h-10 w-full", skeletonAccent)} />
                </div>
                <div className="space-y-2">
                  <Skeleton className={cn("h-4 w-20", skeletonBar)} />
                  <Skeleton className={cn("h-10 w-full", skeletonAccent)} />
                </div>
              </CardContent>
            </Card>

            <Card className={storefrontCard}>
              <CardHeader>
                <Skeleton className={cn("h-6 w-40", skeletonBar)} />
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Skeleton className={cn("h-4 w-24", skeletonBar)} />
                  <Skeleton className={cn("h-10 w-full", skeletonAccent)} />
                </div>
                <div className="space-y-2">
                  <Skeleton className={cn("h-4 w-20", skeletonBar)} />
                  <Skeleton className={cn("h-10 w-full", skeletonAccent)} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Skeleton className={cn("h-4 w-12", skeletonBar)} />
                    <Skeleton className={cn("h-10 w-full", skeletonAccent)} />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className={cn("h-4 w-16", skeletonBar)} />
                    <Skeleton className={cn("h-10 w-full", skeletonAccent)} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Skeleton className={cn("h-4 w-20", skeletonBar)} />
                  <Skeleton className={cn("h-10 w-full", skeletonAccent)} />
                </div>
              </CardContent>
            </Card>

            <Card className={storefrontCard}>
              <CardHeader>
                <Skeleton className={cn("h-6 w-32", skeletonBar)} />
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <Skeleton className={cn("h-12 w-full", skeletonAccent)} />
                  <Skeleton className={cn("h-12 w-full", skeletonAccent)} />
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Skeleton className={cn("h-4 w-24", skeletonBar)} />
                    <Skeleton className={cn("h-10 w-full", skeletonAccent)} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Skeleton className={cn("h-4 w-20", skeletonBar)} />
                      <Skeleton className={cn("h-10 w-full", skeletonAccent)} />
                    </div>
                    <div className="space-y-2">
                      <Skeleton className={cn("h-4 w-12", skeletonBar)} />
                      <Skeleton className={cn("h-10 w-full", skeletonAccent)} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Skeleton className={cn("h-4 w-24", skeletonBar)} />
                    <Skeleton className={cn("h-10 w-full", skeletonAccent)} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary Skeleton */}
          <div className="lg:col-span-1">
            <Card className={cn(storefrontCard, "sticky top-4")}>
              <CardHeader>
                <Skeleton className={cn("h-6 w-32", skeletonBar)} />
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  {[1, 2].map((i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Skeleton className={cn("h-12 w-12 rounded-lg", skeletonAccent)} />
                        <div className="space-y-2">
                          <Skeleton className={cn("h-4 w-32", skeletonBar)} />
                          <Skeleton className={cn("h-3 w-24", skeletonBar)} />
                        </div>
                      </div>
                      <Skeleton className={cn("h-4 w-16", skeletonBar)} />
                    </div>
                  ))}
                </div>

                <div className="h-px bg-brand-forest/15" />

                <div className="space-y-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex justify-between">
                      <Skeleton className={cn("h-4 w-16", skeletonBar)} />
                      <Skeleton className={cn("h-4 w-20", skeletonBar)} />
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  <Skeleton className={cn("h-4 w-32", skeletonBar)} />
                  <div className="flex space-x-2">
                    <Skeleton className={cn("h-10 flex-1", skeletonAccent)} />
                    <Skeleton className={cn("h-10 w-16", skeletonAccent)} />
                  </div>
                </div>

                <Skeleton className={cn("h-12 w-full", skeletonAccent)} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
