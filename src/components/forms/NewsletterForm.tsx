"use client";

import { MagneticButton } from "@/components/ui/MagneticButton";

function NewsletterForm() {
  return (
    <form
      className="flex w-full gap-2 sm:w-auto"
      onSubmit={(e) => e.preventDefault()}
    >
      <label htmlFor="newsletter-email" className="sr-only">Email address</label>
      <input
        id="newsletter-email"
        type="email"
        placeholder="you@company.com"
        aria-label="Email address"
        className="h-11 w-full rounded-full border border-cream/20 bg-charcoal-300 px-4 font-body text-sm text-cream placeholder:text-cream/30 transition-all duration-300 focus:border-clay focus:outline-none focus:ring-2 focus:ring-clay/20 sm:w-64"
      />
      <MagneticButton type="submit" variant="clay" size="md">
        Subscribe
      </MagneticButton>
    </form>
  );
}

export { NewsletterForm };
