import Link from 'next/link';
import { MediaImage } from '@/components/media-image';
import { Button } from '@/components/ui/button';

export function AboutSection() {
  return (
    <section id="about" className="scroll-mt-24 bg-background py-14 md:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div className="relative aspect-[4/5] overflow-hidden rounded-md border-2 border-border bg-muted">
          <MediaImage
            src="/images/about/heritage.jpg"
            alt="SHARNAYA heritage craftsmanship"
            filename="public/images/about/heritage.jpg"
            placeholderLabel="About image"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        <div>
          <h2 className="font-display text-3xl leading-tight text-foreground sm:text-4xl md:text-5xl">
            Our story
          </h2>
          <div className="mt-6 space-y-5 text-lg leading-relaxed text-muted-foreground md:text-xl">
            <p>
              SHARNAYA celebrates South Indian textile heritage — from Kanjeevaram silk to pattu
              pavadai for little ones.
            </p>
            <p>
              We choose each piece for its weave, comfort, and beauty, so you feel confident at every
              wedding and festival.
            </p>
          </div>
          <Button
            asChild
            className="mt-8 h-14 rounded-md px-8 text-lg font-bold"
          >
            <Link href="/products">Browse all products</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
