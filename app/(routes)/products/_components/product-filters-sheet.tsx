"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useFilters, usePriceStatistics } from "@/lib/hooks/useFilters";
import { storefrontPrimaryBtn } from "@/lib/storefront/surface";
import {
  buildPriceRanges,
  filterChipClass,
  filterRowClass,
  GENDER_OPTIONS,
} from "./product-filters-helpers";
import type { ProductsFilterChange, ProductsFiltersState } from "./products-filter-types";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  filters: ProductsFiltersState;
  onFilterChange: ProductsFilterChange;
  onClearAll: () => void;
};

export function ProductFiltersSheet({
  open,
  onOpenChange,
  filters,
  onFilterChange,
  onClearAll,
}: Props) {
  const { filterSections, isLoading } = useFilters();
  const { data: priceStats, isLoading: priceStatsLoading } = usePriceStatistics();

  const realMin = priceStats?.min ?? 15;
  const realMax = priceStats?.max ?? 300;
  const priceRanges = buildPriceRanges(realMin, realMax, priceStats?.priceRanges);

  const selectedPriceValue =
    filters.minPrice != null
      ? `${filters.minPrice}-${filters.maxPrice != null && filters.maxPrice >= realMax ? "max" : filters.maxPrice}`
      : "";

  const hasActive =
    Boolean(filters.category) ||
    Boolean(filters.genderTarget) ||
    filters.minPrice != null ||
    filters.maxPrice != null;

  const categoryOptions = filterSections[0]?.options ?? [];

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="z-[4001] flex h-full w-full max-w-full flex-col gap-0 border-l border-brand-forest/10 bg-brand-ivory p-0 sm:max-w-md"
      >
        <SheetHeader className="shrink-0 space-y-0 border-b border-brand-forest/10 px-5 py-5 text-left">
          <div className="flex items-center justify-between gap-3 pr-8">
            <div>
              <p className="mb-1 font-serif text-[0.65rem] font-semibold tracking-[0.28em] text-brand-forest/55 uppercase">
                Refine
              </p>
              <SheetTitle className="font-serif text-xl tracking-tight text-foreground">
                Filters
              </SheetTitle>
            </div>
            {hasActive ? (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={onClearAll}
                className="h-8 cursor-pointer px-2 font-serif text-[0.7rem] tracking-[0.12em] text-brand-forest/60 uppercase hover:bg-brand-champagne/40 hover:text-brand-forest"
              >
                Clear
              </Button>
            ) : null}
          </div>
          <SheetDescription className="sr-only">
            Refine products by gender, category, and price
          </SheetDescription>
        </SheetHeader>

        <div className="min-h-0 flex-1 space-y-8 overflow-y-auto px-5 py-6">
          <section className="space-y-3">
            <h3 className="font-serif text-[0.65rem] font-semibold tracking-[0.22em] text-brand-forest/50 uppercase">
              Shop for
            </h3>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {GENDER_OPTIONS.map((opt) => (
                <button
                  key={opt.value || "all"}
                  type="button"
                  className={cn(filterChipClass(filters.genderTarget === opt.value), "w-full")}
                  onClick={() => onFilterChange({ genderTarget: opt.value })}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </section>

          <section className="space-y-3">
            <h3 className="font-serif text-[0.65rem] font-semibold tracking-[0.22em] text-brand-forest/50 uppercase">
              Category
            </h3>
            {isLoading ? (
              <div className="space-y-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-11 animate-pulse rounded-tr-2xl rounded-bl-2xl bg-brand-forest/10"
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-2" role="listbox" aria-label="Category">
                <button
                  type="button"
                  role="option"
                  aria-selected={!filters.category}
                  className={filterRowClass(!filters.category)}
                  onClick={() => onFilterChange({ category: "" })}
                >
                  All categories
                </button>
                {categoryOptions.map((option) => {
                  const selected = filters.category === option.id;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      role="option"
                      aria-selected={selected}
                      className={filterRowClass(selected)}
                      onClick={() => onFilterChange({ category: option.id })}
                    >
                      <span className="min-w-0 truncate">{option.name}</span>
                      {option.count != null && option.count > 0 ? (
                        <span
                          className={cn(
                            "shrink-0 text-xs tabular-nums",
                            selected ? "text-brand-champagne/70" : "text-foreground/40"
                          )}
                        >
                          {option.count}
                        </span>
                      ) : null}
                    </button>
                  );
                })}
              </div>
            )}
          </section>

          <section className="space-y-3">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-serif text-[0.65rem] font-semibold tracking-[0.22em] text-brand-forest/50 uppercase">
                Price
              </h3>
              {!priceStatsLoading && priceStats ? (
                <span className="text-xs text-foreground/40">
                  {priceStats.min} – {priceStats.max}+
                </span>
              ) : null}
            </div>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {priceRanges.map((range) => (
                <button
                  key={range.value}
                  type="button"
                  onClick={() => {
                    const maxPrice =
                      range.max === "max" ? realMax : (range.max as number);
                    onFilterChange({ minPrice: range.min, maxPrice });
                  }}
                  className={cn(
                    filterChipClass(selectedPriceValue === range.value, "sm"),
                    "w-full text-left"
                  )}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </section>
        </div>

        <div className="shrink-0 border-t border-brand-forest/10 px-5 py-4">
          <Button
            type="button"
            className={cn(storefrontPrimaryBtn, "h-11 w-full rounded-none rounded-tr-2xl rounded-bl-2xl")}
            onClick={() => onOpenChange(false)}
          >
            Show results
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
