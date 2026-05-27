'use client';

import Image from 'next/image';

export function HeroSection() {
  return (
    <section className="bg-background py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative h-64 md:h-[500px] mb-12 md:mb-16 rounded-lg overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1612021695888-4a02a2d5e2f3?w=1200&h=600&fit=crop"
            alt="Traditional South Indian Sarees Collection"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        {/* Hero Text */}
        <div className="text-center mb-16 md:mb-20 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-light tracking-widest text-foreground mb-6 text-balance">
            Timeless Elegance
          </h1>
          <p className="text-sm md:text-base font-light text-muted-foreground tracking-wide mb-10 leading-relaxed">
            Handcrafted South Indian traditional wear that celebrates heritage and contemporary grace.
            Each piece tells a story of artistry and cultural richness.
          </p>
          <button className="px-10 py-3 border border-foreground text-foreground font-light tracking-widest text-sm uppercase hover:bg-foreground hover:text-background transition-all duration-300">
            Explore Collection
          </button>
        </div>
      </div>
    </section>
  );
}
