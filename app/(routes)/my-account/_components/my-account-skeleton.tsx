"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { storefrontCard, storefrontPage } from "@/lib/storefront/surface";
export function MyAccountSkeleton() {
  return (
    <div className={storefrontPage}>
      <div className="container mx-auto mb-8 px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Skeleton className="h-20 w-20 rounded-full bg-brand-forest/10" />
            <div className="space-y-2">
              <Skeleton className="h-8 w-64 bg-brand-forest/10" />
              <Skeleton className="h-4 w-48 bg-brand-forest/10" />
            </div>
          </div>
          <Skeleton className="hidden h-10 w-36 bg-brand-forest/10 sm:block" />
        </div>
      </div>

      <div className="container mx-auto space-y-8 px-4 pb-12">
        <Card className={storefrontCard}>
          <CardHeader>
            <Skeleton className="h-6 w-40 bg-brand-forest/10" />
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center gap-4 md:flex-row">
              <Skeleton className="h-24 w-24 rounded-full bg-brand-forest/10" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-7 w-48 bg-brand-forest/10" />
                <Skeleton className="h-4 w-56 bg-brand-forest/10" />
                <div className="flex gap-3 pt-2">
                  <Skeleton className="h-10 w-32 bg-brand-forest/10" />
                  <Skeleton className="h-10 w-40 bg-brand-forest/10" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className={storefrontCard}>
          <CardHeader>
            <Skeleton className="h-6 w-32 bg-brand-forest/10" />
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Skeleton className="h-10 w-full bg-brand-forest/10" />
              <Skeleton className="h-10 w-full bg-brand-forest/10" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
