/**
 * Page: FAQ
 * Rendering: SSG (static help content)
 * Reason: Standalone FAQ page linked from footer
 */

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  storefrontCard,
  storefrontEyebrow,
  storefrontOutlineBtn,
  storefrontPage,
  storefrontPrimaryBtn,
  storefrontTitle,
} from "@/lib/storefront/surface";
import { cn } from "@/lib/utils";

const faqSections = [
  {
    title: "Orders",
    items: [
      {
        question: "How can I track my order?",
        answer:
          "Sign in and open My Account or Orders to view order status and tracking details for recent purchases.",
      },
      {
        question: "Can I modify or cancel my order?",
        answer:
          "Orders can be modified or cancelled within 1 hour of placement. Contact us immediately if you need to make changes.",
      },
    ],
  },
  {
    title: "Shipping",
    items: [
      {
        question: "What are your shipping options?",
        answer:
          "We offer standard shipping (5-7 business days), express shipping (2-3 business days), and overnight shipping within Pakistan.",
      },
      {
        question: "Do you ship internationally?",
        answer:
          "International shipping is available to select destinations. Delivery times vary by location.",
      },
    ],
  },
  {
    title: "Payments",
    items: [
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept major credit and debit cards, bank transfers, and other secure payment options at checkout.",
      },
      {
        question: "Is my payment information secure?",
        answer:
          "Yes. We use industry-standard encryption and secure payment processing to protect your information.",
      },
    ],
  },
  {
    title: "Account",
    items: [
      {
        question: "How do I create an account?",
        answer:
          "Click Join in the navigation and complete the registration form with your details.",
      },
      {
        question: "I forgot my password. What should I do?",
        answer:
          "Use Forgot Password on the login page and we will email you a reset link.",
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <div className={storefrontPage}>
      <div className="container mx-auto px-4 py-12 md:py-16">
        <header className="mx-auto mb-10 max-w-2xl text-center">
          <p className={storefrontEyebrow}>Help</p>
          <h1 className={storefrontTitle}>Frequently asked questions</h1>
          <p className="mt-4 text-lg text-foreground/55">
            Quick answers about orders, shipping, payments, and your account.
          </p>
        </header>

        <div className="mx-auto max-w-3xl space-y-8">
          {faqSections.map((section) => (
            <section key={section.title}>
              <h2 className="mb-4 font-serif text-xl font-semibold text-foreground">
                {section.title}
              </h2>
              <div
                className={cn(
                  storefrontCard,
                  "overflow-hidden rounded-none"
                )}
              >
                {section.items.map((item) => (
                  <details
                    key={item.question}
                    className="group border-b border-brand-forest/15 last:border-b-0"
                  >
                    <summary className="cursor-pointer list-none px-4 py-4 font-medium text-foreground marker:content-none [&::-webkit-details-marker]:hidden">
                      <span className="flex items-center justify-between gap-4">
                        {item.question}
                        <span className="text-brand-forest/40 transition group-open:rotate-45">
                          +
                        </span>
                      </span>
                    </summary>
                    <p className="px-4 pb-4 text-sm leading-relaxed text-foreground/55">
                      {item.answer}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div
          className={cn(
            storefrontCard,
            "mx-auto mt-12 max-w-xl rounded-none p-8 text-center"
          )}
        >
          <h2 className="font-serif text-xl font-semibold text-foreground">Still need help?</h2>
          <p className="mt-2 text-foreground/55">
            Our team is happy to answer anything not covered here.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button asChild className={cn(storefrontPrimaryBtn, "cursor-pointer")}>
              <Link href="/contact">Contact Us</Link>
            </Button>
            <Button asChild variant="outline" className={cn(storefrontOutlineBtn, "cursor-pointer")}>
              <Link href="/orders">Track Order</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
