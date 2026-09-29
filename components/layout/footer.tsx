"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  helpLinks,
  legalLinks,
  marqueeItems,
  shopLinks,
  socialLinks,
} from "./footer-data";
import { SITE_EMAIL_HELLO, SITE_NAME } from "@/lib/site-metadata";

interface FooterProps {
  className?: string;
}

function FooterLinkList({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <p className="mb-4 font-serif text-[0.7rem] font-semibold tracking-[0.28em] text-brand-champagne uppercase">
        {title}
      </p>
      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="group inline-flex cursor-pointer items-center text-sm text-brand-champagne/65 transition-colors duration-200 hover:text-brand-champagne"
            >
              <span className="mr-0 max-w-0 overflow-hidden transition-all duration-300 group-hover:mr-2 group-hover:max-w-[0.75rem]">
                →
              </span>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer({ className = "" }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer
      className={cn("relative isolate bg-brand-forest text-brand-champagne", className)}
      role="contentinfo"
    >
      <div className="relative overflow-hidden">
        <div
          aria-hidden
          className="footer-grain pointer-events-none absolute inset-0 opacity-[0.12]"
        />
        <p
          aria-hidden
          className="pointer-events-none absolute -right-4 -bottom-10 select-none font-serif text-[clamp(6rem,22vw,16rem)] font-bold leading-none tracking-tighter text-brand-champagne/[0.04]"
        >
          I
        </p>

        <div className="relative overflow-hidden border-b border-brand-champagne/10 py-3">
          <div className="footer-marquee flex w-max gap-10 whitespace-nowrap text-[0.7rem] font-medium tracking-[0.22em] text-brand-champagne/45 uppercase">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span key={`${item}-${i}`} className="flex items-center gap-10">
                {item}
                <span className="text-brand-champagne/50">✦</span>
              </span>
            ))}
          </div>
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-16">
            <div className="space-y-8">
              <div className="space-y-4">
                <p className="font-serif text-[0.7rem] font-semibold tracking-[0.32em] text-brand-champagne/70 uppercase">
                  Est. Lahore
                </p>
                <h2 className="font-serif text-4xl font-semibold tracking-tight text-brand-champagne sm:text-5xl">
                  {SITE_NAME}
                </h2>
                <p className="max-w-md text-sm leading-relaxed text-brand-champagne/60 sm:text-base">
                  Modern clothing for women — curated drops, timeless staples,
                  and responsive service you can trust.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {socialLinks.map((social) => (
                  <Link
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-md border border-brand-champagne/15 text-brand-champagne/70 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-champagne/40 hover:bg-brand-champagne/5 hover:text-brand-champagne"
                    aria-label={`Follow us on ${social.name}`}
                  >
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d={social.path} />
                    </svg>
                  </Link>
                ))}
              </div>

              <address className="space-y-2 text-sm not-italic text-brand-champagne/55">
                <p>42 Mall Road, Gulberg III, Lahore, Punjab 54000, Pakistan</p>
                <p>
                  <a
                    href="tel:+923008472653"
                    className="cursor-pointer transition-colors hover:text-brand-champagne"
                  >
                    +92 300 847 2653
                  </a>
                  <span className="mx-2 text-brand-champagne/25">·</span>
                  <a
                    href={`mailto:${SITE_EMAIL_HELLO}`}
                    className="cursor-pointer transition-colors hover:text-brand-champagne"
                  >
                    {SITE_EMAIL_HELLO}
                  </a>
                </p>
              </address>
            </div>

            <div className="grid grid-cols-2 gap-10 sm:gap-12">
              <FooterLinkList title="Shop" links={shopLinks} />
              <FooterLinkList title="Help" links={helpLinks} />
            </div>
          </div>
        </div>

        <div className="relative border-t border-brand-champagne/10">
          <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-6 text-xs text-brand-champagne/45 sm:px-6 lg:flex-row lg:justify-between lg:px-8">
            <p className="text-center lg:text-left">
              © {year} {SITE_NAME}. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
              {legalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="cursor-pointer whitespace-nowrap transition-colors hover:text-brand-champagne"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <p className="text-center lg:text-right">Made with care in Pakistan</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
