import Image from "next/image";
import { SITE_NAME } from "@/lib/site-metadata";
import { storefrontContainer } from "@/lib/storefront/surface";
import { cn } from "@/lib/utils";

export function AboutStorySection() {
  return (
    <section className="py-16 md:py-20">
      <div className={cn(storefrontContainer, "grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16")}>
        <div className="order-2 flex justify-center lg:order-1 lg:justify-start">
          <div className="relative overflow-hidden rounded-none border border-brand-forest/15 bg-brand-champagne/25 p-4 shadow-none">
            <Image
              src="/images/staircase.png"
              alt="Our story illustration"
              width={400}
              height={500}
              className="object-contain"
            />
          </div>
        </div>

        <div className="order-1 space-y-5 lg:order-2">
          <h2 className="font-serif text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Our Story
          </h2>
          <p className="text-lg leading-relaxed text-foreground/60">
            At <span className="font-semibold text-foreground">{SITE_NAME}</span>, we believe
            the future of shopping isn&apos;t just digital — it&apos;s personal, reliable, and
            inspiring. We started with one goal: to bring together technology and trust,
            creating an online experience that feels effortless.
          </p>
          <p className="text-lg leading-relaxed text-foreground/60">
            Our mission is to keep pushing boundaries with smarter, faster, and more reliable
            solutions. Our vision is bold yet simple: to become the e-commerce brand that
            customers not only trust, but love to return to.
          </p>
        </div>
      </div>
    </section>
  );
}
