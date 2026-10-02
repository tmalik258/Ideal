"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { ProductTabsSkeleton } from "../../_components/product-skeleton";
import { cn } from "@/lib/utils";
import { storefrontCard, storefrontEyebrow } from "@/lib/storefront/surface";
import { SITE_CURRENCY } from "@/lib/site-metadata";
import type { ProductAttribute } from "@/lib/storefront/parse-product-description";

interface Product {
  longDescription?: string;
  keyFeatures: string[];
  specifications: ProductAttribute[];
}

interface ProductTabsProps {
  product?: Product;
  loading?: boolean;
}

type TabType = "description" | "specifications" | "shipping" | "returns";

const TABS: { id: TabType; label: string }[] = [
  { id: "description", label: "Description" },
  { id: "specifications", label: "Specifications" },
  { id: "shipping", label: "Shipping" },
  { id: "returns", label: "Returns" },
];

function TabSectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-4 font-serif text-xl font-semibold tracking-tight text-foreground">
      {children}
    </h3>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((text) => (
        <li key={text} className="flex items-start gap-3">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-forest" />
          <span className="text-sm leading-relaxed text-foreground/60 sm:text-base">
            {text}
          </span>
        </li>
      ))}
    </ul>
  );
}

export function ProductTabs({ product, loading = false }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<TabType>("description");
  const listRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [indicator, setIndicator] = useState({ left: 0, width: 0, ready: false });

  const updateIndicator = useCallback(() => {
    const list = listRef.current;
    const index = TABS.findIndex((tab) => tab.id === activeTab);
    const tab = tabRefs.current[index];
    if (!list || !tab) return;

    setIndicator({
      left: tab.offsetLeft,
      width: tab.offsetWidth,
      ready: true,
    });
  }, [activeTab]);

  useLayoutEffect(() => {
    updateIndicator();

    const list = listRef.current;
    if (!list) return;

    const resizeObserver = new ResizeObserver(() => updateIndicator());
    resizeObserver.observe(list);
    tabRefs.current.forEach((tab) => {
      if (tab) resizeObserver.observe(tab);
    });

    window.addEventListener("resize", updateIndicator);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateIndicator);
    };
  }, [updateIndicator]);

  if (loading) {
    return <ProductTabsSkeleton />;
  }

  if (!product) {
    return (
      <div className={cn(storefrontCard, "p-8")}>
        <div className="py-8 text-center">
          <p className="text-foreground/55">Product details not available</p>
        </div>
      </div>
    );
  }

  const hasSpecs = product.specifications.length > 0;
  const hasFeatures = product.keyFeatures.length > 0;
  const hasDescription = Boolean(product.longDescription?.trim());

  return (
    <div className="space-y-6">
      <p className={storefrontEyebrow}>Details</p>

      <div
        ref={listRef}
        className="relative flex max-w-full gap-2 overflow-x-auto scroll-smooth border-b border-brand-forest/10 pb-px sm:gap-3"
        role="tablist"
        aria-label="Product details"
      >
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute bottom-0 h-[2px] bg-brand-forest",
            indicator.ready
              ? "transition-[left,width] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
              : "opacity-0"
          )}
          style={{ left: indicator.left, width: indicator.width }}
        />

        {TABS.map((tab, index) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "relative z-10 cursor-pointer whitespace-nowrap px-3 py-3 font-serif text-sm tracking-tight transition-colors duration-200 sm:px-4 sm:text-base",
                isActive
                  ? "text-brand-forest"
                  : "text-foreground/45 hover:text-foreground/70"
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className={cn(storefrontCard, "p-6 sm:p-8")}>
        {activeTab === "description" ? (
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
            <div>
              <TabSectionTitle>Description</TabSectionTitle>
              {hasDescription ? (
                <p className="text-sm leading-relaxed text-foreground/60 sm:text-base">
                  {product.longDescription}
                </p>
              ) : hasSpecs ? (
                <p className="text-sm leading-relaxed text-foreground/60 sm:text-base">
                  See the specifications for fabric, cut, and wear details.
                </p>
              ) : (
                <p className="text-foreground/45">No detailed description available.</p>
              )}
            </div>
            <div>
              <TabSectionTitle>Key Features</TabSectionTitle>
              {hasFeatures ? (
                <BulletList items={product.keyFeatures} />
              ) : hasSpecs ? (
                <BulletList
                  items={product.specifications.map(
                    (spec) => `${spec.label}: ${spec.value}`
                  )}
                />
              ) : (
                <p className="text-foreground/45">No key features listed.</p>
              )}
            </div>
          </div>
        ) : null}

        {activeTab === "specifications" ? (
          <div>
            <TabSectionTitle>Specifications</TabSectionTitle>
            {hasSpecs ? (
              <div className="grid grid-cols-1 gap-x-10 gap-y-1 md:grid-cols-2">
                {product.specifications.map((spec) => (
                  <div
                    key={`${spec.label}-${spec.value}`}
                    className="flex justify-between gap-4 border-b border-brand-forest/10 py-3.5"
                  >
                    <span className="font-serif text-[0.65rem] font-semibold tracking-[0.16em] text-brand-forest/50 uppercase">
                      {spec.label}
                    </span>
                    <span className="text-right text-sm text-foreground">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-foreground/45">No specifications available.</p>
            )}
          </div>
        ) : null}

        {activeTab === "shipping" ? (
          <div>
            <TabSectionTitle>Shipping Information</TabSectionTitle>
            <BulletList
              items={[
                `Free shipping on orders over 50 ${SITE_CURRENCY}`,
                "Standard delivery: 3-5 business days",
              ]}
            />
          </div>
        ) : null}

        {activeTab === "returns" ? (
          <div>
            <TabSectionTitle>Returns &amp; Exchanges</TabSectionTitle>
            <BulletList
              items={[
                "30-day return policy for all items",
                "Items must be in original condition with tags attached",
                "Free returns for defective or damaged items",
                "Exchange available for different sizes or colors",
                "Refunds processed within 5-7 business days",
              ]}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default ProductTabs;
