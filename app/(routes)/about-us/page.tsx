/**
 * Page: About Us
 * Rendering: SSG (static marketing content)
 * Reason: Brand story and team information with no user-specific data
 */

import { AboutFeaturesSection } from "./_components/about-features-section";
import { AboutPillarsSection } from "./_components/about-pillars-section";
import { AboutStorySection } from "./_components/about-story-section";
import { AboutTeamSection } from "./_components/about-team-section";
import { storefrontEyebrow, storefrontPage, storefrontTitle, storefrontContainer } from "@/lib/storefront/surface";
import { cn } from "@/lib/utils";

export default function AboutUsPage() {
  return (
    <div className={storefrontPage}>
      <div className={cn(storefrontContainer, "pb-16 pt-10 md:pb-20 md:pt-12")}>
        <header className="mx-auto mb-10 max-w-3xl text-center">
          <p className={storefrontEyebrow}>Brand</p>
          <h1 className={storefrontTitle}>About Us</h1>
          <p className="mt-4 text-lg text-foreground/60 md:text-xl">
            Women&apos;s clothing with a focus on trust, quality, and customer care.
          </p>
        </header>
      </div>

      <AboutStorySection />
      <AboutPillarsSection />
      <AboutTeamSection />
      <AboutFeaturesSection />
    </div>
  );
}
