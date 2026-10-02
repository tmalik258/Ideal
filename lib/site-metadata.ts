import type { Metadata } from "next";

export const SITE_NAME = "Ideal";
export const SITE_DESCRIPTION =
  "Shop curated women's clothing and dresses at Ideal.";
/** Storefront display currency (prices in DB are plain numbers). */
export const SITE_CURRENCY = "PKR";
/** Transparent mark for UI (header, placeholders). */
export const LOGO_PATH = "/logo_transparent.png";
/** Solid mark for favicons / Open Graph / social previews. */
export const LOGO_SOLID_PATH = "/logo.jpeg";

export const SITE_EMAIL_HELLO = "hello@ideal.com";
export const SITE_EMAIL_SUPPORT = "support@ideal.com";
export const SITE_EMAIL_NOREPLY = "noreply@ideal.com";
export const SITE_EMAIL_ADMIN = "admin@ideal.com";

export function formatStorefrontPrice(amount: number): string {
  const rounded = Math.round(amount * 100) / 100;
  const hasFraction = Math.abs(rounded % 1) > Number.EPSILON;

  return `${SITE_CURRENCY} ${rounded.toLocaleString("en-PK", {
    minimumFractionDigits: 0,
    maximumFractionDigits: hasFraction ? 2 : 0,
  })}`;
}

export function getSiteUrl(): URL {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (configured) {
    try {
      return new URL(configured);
    } catch {
      // Fall through to Vercel / local defaults.
    }
  }

  const vercelUrl = process.env.VERCEL_URL?.trim();
  if (vercelUrl) {
    const host = vercelUrl.startsWith("http") ? vercelUrl : `https://${vercelUrl}`;
    return new URL(host);
  }

  return new URL("http://localhost:3000");
}

export const rootMetadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: {
    default: `${SITE_NAME} — Women's Clothing`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: LOGO_SOLID_PATH, type: "image/jpeg" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      { url: LOGO_SOLID_PATH, type: "image/jpeg" },
    ],
    shortcut: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Women's Clothing`,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: LOGO_SOLID_PATH,
        width: 512,
        height: 512,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: "summary",
    title: `${SITE_NAME} — Women's Clothing`,
    description: SITE_DESCRIPTION,
    images: [LOGO_SOLID_PATH],
  },
};

export function buildPageMetadata(title: string, description?: string): Metadata {
  const desc = description ?? SITE_DESCRIPTION;

  return {
    title,
    description: desc,
    openGraph: {
      title,
      description: desc,
      images: [{ url: LOGO_SOLID_PATH, alt: SITE_NAME }],
    },
    twitter: {
      title,
      description: desc,
      images: [LOGO_SOLID_PATH],
    },
  };
}
