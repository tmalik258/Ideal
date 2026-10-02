import { RefreshCw, Shield, Truck } from "lucide-react";
import type { TrustBadge } from "@/lib/storefront/get-home-data";
import { storefrontContainer } from "@/lib/storefront/surface";
import { cn } from "@/lib/utils";

const DEFAULT_BADGES: TrustBadge[] = [
  { icon: "truck", label: "Free shipping", sub: "On qualifying orders" },
  { icon: "refresh", label: "Easy returns", sub: "30-day policy" },
  { icon: "shield", label: "Secure checkout", sub: "Encrypted payments" },
];

function IconFor({ name }: { name: string }) {
  const n = name.toLowerCase();
  if (n.includes("shield")) return <Shield className="h-5 w-5" strokeWidth={1.5} />;
  if (n.includes("refresh") || n.includes("return"))
    return <RefreshCw className="h-5 w-5" strokeWidth={1.5} />;
  return <Truck className="h-5 w-5" strokeWidth={1.5} />;
}

type Props = {
  badges: TrustBadge[] | null;
};

export function StorefrontTrustRow({ badges }: Props) {
  const rows = badges?.length ? badges : DEFAULT_BADGES;

  return (
    <section
      className="border-y border-brand-forest/10 bg-white py-14 md:py-16"
      aria-label="Store policies"
    >
      <div className={cn(storefrontContainer, "grid gap-10 sm:grid-cols-3 sm:gap-8")}>
        {rows.map((b, i) => (
          <div
            key={`${b.label}-${i}`}
            className="flex items-start gap-4 sm:justify-center sm:text-center sm:flex-col sm:items-center"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-champagne text-brand-forest">
              <IconFor name={b.icon} />
            </div>
            <div>
              <p className="font-serif text-lg tracking-tight text-foreground">{b.label}</p>
              <p className="mt-1 text-sm text-foreground/50">{b.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
