import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { storefrontCard, storefrontPage, storefrontContainer } from "@/lib/storefront/surface";
import { cn } from "@/lib/utils";

export function ContactPageSkeleton() {
  return (
    <div className={storefrontPage}>
      <div className={cn(storefrontContainer, "py-8")}>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <Card className={cn(storefrontCard, "h-fit")}>
              <CardHeader>
                <Skeleton className="h-6 w-32 bg-brand-forest/10" />
              </CardHeader>
              <CardContent className="space-y-6">
                {[1, 2, 3, 4, 5].map((item) => (
                  <div key={item} className="flex items-start space-x-3">
                    <Skeleton className="h-5 w-5 rounded-full bg-brand-forest/10" />
                    <div className="flex-1 space-y-1">
                      <Skeleton className="h-4 w-20 bg-brand-forest/10" />
                      <Skeleton className="h-4 w-32 bg-brand-forest/10" />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card className={storefrontCard}>
              <CardHeader>
                <Skeleton className="h-6 w-40 bg-brand-forest/10" />
                <Skeleton className="h-4 w-64 bg-brand-forest/10" />
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-20 bg-brand-forest/10" />
                    <Skeleton className="h-10 w-full bg-brand-forest/10" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24 bg-brand-forest/10" />
                    <Skeleton className="h-10 w-full bg-brand-forest/10" />
                  </div>
                </div>
                <Skeleton className="h-10 w-full bg-brand-forest/10" />
                <Skeleton className="h-32 w-full bg-brand-forest/10" />
                <Skeleton className="h-12 w-32 bg-brand-forest/10" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
