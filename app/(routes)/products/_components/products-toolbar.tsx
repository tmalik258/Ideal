"use client";

import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGsapToolbarReveal } from "@/lib/hooks/useGsapProductsReveal";
import {
  SORT_OPTIONS,
  parseSortValue,
  sortValueFromFilters,
  type ProductsFilterChange,
  type ProductsFiltersState,
} from "./products-filter-types";

type Props = {
  title: string;
  productsCount: number;
  filters: ProductsFiltersState;
  onFilterChange: ProductsFilterChange;
  onOpenFilters: () => void;
  activeFilterCount: number;
};

export function ProductsToolbar({
  title,
  productsCount,
  filters,
  onFilterChange,
  onOpenFilters,
  activeFilterCount,
}: Props) {
  const toolbarRef = useGsapToolbarReveal();
  const sortValue = sortValueFromFilters(filters.sortBy, filters.sortOrder);

  return (
    <div
      ref={toolbarRef}
      className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
    >
      <div className="max-w-2xl">
        <p className="mb-3 font-serif text-[0.65rem] font-semibold tracking-[0.28em] text-brand-forest/55 uppercase">
          Shop
        </p>
        <h1 className="font-serif text-[clamp(1.75rem,4vw,2.75rem)] font-semibold leading-[1.1] tracking-tight text-foreground">
          {title}
        </h1>
        <p className="mt-2 text-sm text-foreground/55">
          {productsCount} {productsCount === 1 ? "piece" : "pieces"}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Select
          value={sortValue}
          onValueChange={(value) => {
            const parsed = parseSortValue(value);
            onFilterChange(parsed);
          }}
        >
          <SelectTrigger className="h-10 w-[180px] cursor-pointer border-brand-forest/15 bg-brand-ivory text-sm text-foreground">
            <SelectValue placeholder="Sort" />
          </SelectTrigger>
          <SelectContent>
            {SORT_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value} className="cursor-pointer">
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          type="button"
          variant="outline"
          onClick={onOpenFilters}
          className="h-10 cursor-pointer border-brand-forest/15 bg-brand-ivory text-brand-forest hover:border-brand-forest/35 hover:bg-brand-champagne/40"
        >
          <Filter className="mr-2 h-4 w-4" />
          Filters
          {activeFilterCount > 0 ? (
            <span className="ml-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-forest px-1.5 text-xs font-medium text-brand-champagne">
              {activeFilterCount}
            </span>
          ) : null}
        </Button>
      </div>
    </div>
  );
}
