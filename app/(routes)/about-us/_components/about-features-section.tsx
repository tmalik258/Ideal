import { features } from "./about-data";
import { SITE_NAME } from "@/lib/site-metadata";

export function AboutFeaturesSection() {
  return (
    <section className="border-t border-brand-forest/10 bg-brand-champagne/20 py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <header className="mb-12 text-center">
          <h2 className="font-serif text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Why Choose {SITE_NAME}?
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-foreground/60">
            Shopping that is simple, secure, and built around you.
          </p>
        </header>

        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="flex flex-col items-center gap-3 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-forest text-brand-champagne">
                  <Icon className="h-6 w-6" aria-hidden />
                </div>
                <h3 className="font-serif text-lg font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="text-sm text-foreground/60 md:text-base">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
