import {
  SITE_CURRENCY,
  SITE_DESCRIPTION,
  SITE_NAME,
  getSiteUrl,
} from "@/lib/site-metadata";

export function GET() {
  const origin = getSiteUrl().origin;

  const body = `# ${SITE_NAME}

> ${SITE_DESCRIPTION}

${SITE_NAME} is a women's clothing storefront based in Lahore, Pakistan. Prices are shown in ${SITE_CURRENCY}. Use the links below for the main public pages.

## Pages

- [Home](${origin}/): Featured collections and seasonal edits
- [Products](${origin}/products): Full product catalog
- [Collections](${origin}/collections): Curated product collections
- [About Us](${origin}/about-us): Brand story and team

## Optional

- [Contact](${origin}/contact): Customer support and store details
- [FAQ](${origin}/faq): Common questions about orders and shipping
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
