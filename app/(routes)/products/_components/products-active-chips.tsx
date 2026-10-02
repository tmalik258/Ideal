"use client";

import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useGsapToolbarReveal } from "@/lib/hooks/useGsapProductsReveal";
import type { ProductsFilterChange, ProductsFiltersState } from "./products-filter-types";

type Chip = {
  key: string;
  label: string;
  clear: Partial<ProductsFiltersState>;
};

type Props = {
  filters: ProductsFiltersState;
  categoryName?: string;
  priceLabel?: string;
  onFilterChange: ProductsFilterChange;
  onClearAll: () => void;
};

export function ProductsActiveChips({
  filters,
  categoryName,
  priceLabel,
  onFilterChange,
  onClearAll,
}: Props) {
  const chips: Chip[] = [];

  if (filters.genderTarget) {
    const genderLabel =
      filters.genderTarget === "WOMENS"
        ? "Women's"
        : filters.genderTarget === "MENS"
          ? "Men's"
          : "Unisex";
    chips.push({
      key: "gender",
      label: genderLabel,
      clear: { genderTarget: "" },
    });
  }

  if (filters.category) {
    chips.push({
      key: "category",
      label: categoryName || "Category",
      clear: { category: "" },
    });
  }

  if (filters.minPrice != null || filters.maxPrice != null) {
    chips.push({
      key: "price",
      label: priceLabel || "Price",
      clear: { minPrice: undefined, maxPrice: undefined },
    });
  }

  if (filters.isNew) {
    chips.push({ key: "isNew", label: "New", clear: { isNew: undefined } });
  }
  if (filters.onSale) {
    chips.push({ key: "onSale", label: "Sale", clear: { onSale: undefined } });
  }
  if (filters.featured) {
    chips.push({ key: "featured", label: "Featured", clear: { featured: undefined } });
  }

  const chipsKey = chips.map((chip) => chip.key).join(",");
  const chipsRef = useGsapToolbarReveal(chipsKey);

  if (!chips.length) return null;

  return (
    <div ref={chipsRef} className="flex flex-wrap items-center gap-2">
      {chips.map((chip) => (
        <button
          key={chip.key}
          type="button"
          onClick={() => onFilterChange(chip.clear)}
          className={cn(
            "inline-flex cursor-pointer items-center gap-1.5 border border-brand-forest/15 bg-brand-ivory px-3 py-1.5 font-serif text-[0.7rem] font-medium tracking-[0.12em] text-brand-forest uppercase transition hover:border-brand-forest/40"
          )}
        >
          {chip.label}
          <X className="h-3 w-3 opacity-60" />
        </button>
      ))}
      <button
        type="button"
        onClick={onClearAll}
        className="cursor-pointer font-serif text-[0.7rem] font-medium tracking-[0.12em] text-brand-forest/50 uppercase underline-offset-4 transition hover:text-brand-forest hover:underline"
      >
        Clear all
      </button>
    </div>
  );
}
