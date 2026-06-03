'use client';

import { Button } from '@/components/ui/button';

export function NewsletterSection() {
  return (
    <section className="border-t-2 border-border bg-primary py-14 text-primary-foreground md:py-18">
      <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
        <h2 className="font-display text-3xl text-white md:text-4xl">Stay in touch with us</h2>
        <p className="mt-4 text-lg leading-relaxed text-primary-foreground/90">
          Hear about new arrivals, festive collections, and special offers by email.
        </p>
        <form
          className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center"
          onSubmit={e => e.preventDefault()}
        >
          <input
            type="email"
            placeholder="Your email address"
            className="h-14 min-w-0 flex-1 rounded-md border-2 border-primary-foreground/30 bg-primary-foreground/10 px-4 text-lg text-primary-foreground placeholder:text-primary-foreground/60"
            aria-label="Email address"
          />
          <Button
            type="submit"
            className="h-14 rounded-md bg-primary-foreground px-8 text-lg font-bold text-foreground hover:bg-primary-foreground/90"
          >
            Subscribe
          </Button>
        </form>
      </div>
    </section>
  );
}
