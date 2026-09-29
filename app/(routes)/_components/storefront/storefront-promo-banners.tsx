import Image from "next/image";
import Link from "next/link";
import { PromoBannerLayout } from "@prisma/client";

type Banner = {
  id: string;
  title: string;
  body: string | null;
  imageUrl: string;
  href: string;
  layout: PromoBannerLayout;
};

type Props = {
  banners: Banner[];
};

export function StorefrontPromoBanners({ banners }: Props) {
  if (!banners.length) return null;

  return (
    <div className="space-y-16 py-20 md:space-y-20 md:py-28">
      {banners.map((b) => {
        const isFull = b.layout === PromoBannerLayout.FULL_WIDTH;
        const imageLeft = b.layout === PromoBannerLayout.SPLIT_LEFT_IMAGE;

        if (isFull) {
          return (
            <section key={b.id} className="relative mx-auto max-w-7xl overflow-hidden px-4">
              <Link
                href={b.href}
                className="relative block aspect-[21/9] min-h-[240px] overflow-hidden bg-brand-forest cursor-pointer md:min-h-[320px]"
              >
                <Image
                  src={b.imageUrl}
                  alt={b.title}
                  fill
                  className="object-cover opacity-80"
                  sizes="100vw"
                />
                <div className="absolute inset-0 flex flex-col justify-center bg-brand-forest/45 p-8 md:p-14">
                  <h3 className="max-w-xl font-serif text-[clamp(1.75rem,4vw,3rem)] font-semibold leading-tight tracking-tight text-brand-champagne">
                    {b.title}
                  </h3>
                  {b.body ? (
                    <p className="mt-4 max-w-xl text-sm text-brand-champagne/75 md:text-base">
                      {b.body}
                    </p>
                  ) : null}
                  <span className="mt-8 inline-flex w-fit border border-brand-champagne/50 px-6 py-2.5 text-sm font-medium tracking-wide text-brand-champagne transition hover:bg-brand-champagne hover:text-brand-forest">
                    Shop now
                  </span>
                </div>
              </Link>
            </section>
          );
        }

        return (
          <section key={b.id} className="mx-auto max-w-7xl px-4" aria-label={b.title}>
            <div className="grid overflow-hidden bg-white md:grid-cols-2">
              <div
                className={`relative aspect-[4/3] md:aspect-auto md:min-h-[380px] ${imageLeft ? "md:order-first" : "md:order-last"}`}
              >
                <Link
                  href={b.href}
                  className="relative block h-full min-h-[260px] cursor-pointer md:min-h-[380px]"
                >
                  <Image
                    src={b.imageUrl}
                    alt={b.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </Link>
              </div>
              <div className="flex flex-col justify-center bg-brand-ivory px-8 py-12 md:px-14 md:py-16 lg:px-16">
                <h3 className="font-serif text-[clamp(1.75rem,3vw,2.75rem)] font-semibold leading-tight tracking-tight text-foreground">
                  {b.title}
                </h3>
                {b.body ? (
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-foreground/60 md:text-base">
                    {b.body}
                  </p>
                ) : null}
                <Link
                  href={b.href}
                  className="mt-8 inline-flex w-fit bg-brand-forest px-6 py-3 text-sm font-medium tracking-wide text-brand-champagne transition hover:opacity-90 cursor-pointer"
                >
                  Explore
                </Link>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
