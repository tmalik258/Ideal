"use client";

import { useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { ProductImageSkeleton } from "../../_components/product-skeleton";
import { CircleArrowLeft, CircleArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { LOGO_PATH } from "@/lib/site-metadata";

interface ProductImagesProps {
  images: string[];
  productName: string;
  brand?: string;
  loading?: boolean;
}

export function ProductImages({
  images,
  productName,
  brand,
  loading = false,
}: ProductImagesProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [brokenIndexes, setBrokenIndexes] = useState<Record<number, true>>({});

  if (loading) {
    return <ProductImageSkeleton />;
  }

  if (!images || images.length === 0) {
    return (
      <div className="space-y-3">
        <div className="relative flex aspect-[3/4] w-full items-center justify-center overflow-hidden bg-brand-champagne/40">
          <div className="text-center text-brand-forest/40">
            <p className="font-serif text-sm tracking-wide">No image available</p>
          </div>
        </div>
      </div>
    );
  }

  const mainSrc = brokenIndexes[selectedImage]
    ? LOGO_PATH
    : images[selectedImage] || LOGO_PATH;

  const goPrev = () =>
    setSelectedImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  const goNext = () =>
    setSelectedImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  return (
    <div className="space-y-3">
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-brand-champagne/30">
        <Image
          src={mainSrc}
          alt={productName}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
          onError={() => {
            if (!brokenIndexes[selectedImage]) {
              setBrokenIndexes((prev) => ({ ...prev, [selectedImage]: true }));
            }
          }}
        />
        {brand ? (
          <Badge className="absolute top-4 left-4 rounded-none bg-brand-forest px-3 py-1 text-xs font-medium tracking-wide text-brand-champagne">
            {brand}
          </Badge>
        ) : null}

        {images.length > 1 ? (
          <div className="absolute inset-x-0 bottom-4 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={goPrev}
              className="cursor-pointer rounded-full bg-brand-ivory/90 p-1.5 text-brand-forest shadow-sm transition-opacity hover:opacity-90"
              aria-label="Previous image"
            >
              <CircleArrowLeft size={22} />
            </button>
            <button
              type="button"
              onClick={goNext}
              className="cursor-pointer rounded-full bg-brand-ivory/90 p-1.5 text-brand-forest shadow-sm transition-opacity hover:opacity-90"
              aria-label="Next image"
            >
              <CircleArrowRight size={22} />
            </button>
          </div>
        ) : null}
      </div>

      {images.length > 1 ? (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((src, index) => (
            <button
              key={`${src}-${index}`}
              type="button"
              onClick={() => setSelectedImage(index)}
              className={cn(
                "relative aspect-square w-16 shrink-0 cursor-pointer overflow-hidden border transition-colors",
                selectedImage === index
                  ? "border-brand-forest"
                  : "border-brand-forest/15 hover:border-brand-forest/40"
              )}
              aria-label={`View image ${index + 1}`}
              aria-current={selectedImage === index}
            >
              <Image
                src={brokenIndexes[index] ? LOGO_PATH : src || LOGO_PATH}
                alt=""
                fill
                className="object-cover"
                sizes="64px"
                onError={() => {
                  if (!brokenIndexes[index]) {
                    setBrokenIndexes((prev) => ({ ...prev, [index]: true }));
                  }
                }}
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default ProductImages;
