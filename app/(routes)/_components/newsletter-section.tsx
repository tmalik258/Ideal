"use client";

import axios from "axios";
import { useMemo, useState } from "react";
import { SITE_NAME } from "@/lib/site-metadata";

interface NewsletterSectionProps {
  className?: string;
  title?: string;
  subtitle?: string;
}

const DEFAULT_TITLE = "Stay in the loop";
const DEFAULT_SUBTITLE =
  "Early access to women's releases and members-only offers.";

function isValidEmail(input: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input);
}

export default function NewsletterSection({
  className = "",
  title = DEFAULT_TITLE,
  subtitle = DEFAULT_SUBTITLE,
}: NewsletterSectionProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [state, setState] = useState<"idle" | "success" | "error">("idle");

  const errorMessage = useMemo(() => {
    if (state !== "error") return null;
    return "Please enter a valid email and try again.";
  }, [state]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      setState("error");
      return;
    }

    setIsSubmitting(true);
    setState("idle");

    try {
      const res = await axios.post("/api/newsletter/subscribe", { email });
      if (res.data?.ok) {
        setEmail("");
        setState("success");
        return;
      }
      setState("error");
    } catch {
      setState("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      className={`bg-brand-forest py-20 text-brand-champagne md:py-28 ${className}`}
      aria-label="Newsletter subscription"
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-16">
          <div>
            <p className="mb-4 font-serif text-[0.65rem] font-semibold tracking-[0.28em] text-brand-champagne/55 uppercase">
              Newsletter
            </p>
            <h2 className="font-serif text-[clamp(1.75rem,4vw,3rem)] font-semibold leading-tight tracking-tight text-brand-champagne">
              {title}
            </h2>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-brand-champagne/65 md:text-base">
              {subtitle}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                id="newsletter-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="h-12 flex-1 border border-brand-champagne/30 bg-transparent px-4 text-sm text-brand-champagne placeholder:text-brand-champagne/40 focus:border-brand-champagne focus:outline-none"
                aria-invalid={state === "error"}
                aria-describedby={errorMessage ? "newsletter-error" : undefined}
                required
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex h-12 cursor-pointer items-center justify-center bg-brand-champagne px-7 text-sm font-medium tracking-wide text-brand-forest transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Subscribing..." : "Subscribe"}
              </button>
            </div>
            {errorMessage ? (
              <p id="newsletter-error" className="text-sm text-red-300">
                {errorMessage}
              </p>
            ) : null}
            {state === "success" ? (
              <p className="text-sm text-brand-champagne/80">
                You&apos;re subscribed. Welcome to {SITE_NAME}.
              </p>
            ) : null}
            <p className="text-xs text-brand-champagne/40">
              We respect your privacy. Unsubscribe anytime.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
