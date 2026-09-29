import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-metadata";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl().origin;

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin",
        "/api",
        "/auth",
        "/checkout",
        "/cart",
        "/wishlist",
        "/orders",
        "/my-account",
        "/order-confirmed",
        "/unauthorized",
      ],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
