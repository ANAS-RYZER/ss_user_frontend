'use client';

import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { MediaImage } from '@/components/media-image';
import { Button } from '@/components/ui/button';

const slides = [
  {
    src: '/images/banner1.jpg',
    filename: 'public/images/hero/banner-1.jpg',
    title: 'Timeless Elegance',
    subtitle: 'Handwoven Kanjeevaram & Kanchipuram silks',
    cta: 'Shop Sarees',
    href: '/products',
  },
  {
    src: '/images/banner2.jpg',
    filename: 'public/images/hero/banner-2.jpg',
    title: 'Little Traditions',
    subtitle: 'Pattu pavadai & festive kids wear',
    cta: 'Shop Kids',
    href: '/products',
  },
  {
    src: '/images/hero/banner-3.jpg',
    filename: 'public/images/hero/banner-3.jpg',
    title: 'Festive Season',
    subtitle: 'Curated looks for weddings & celebrations',
    cta: 'View Collection',
    href: '/products',
  },
];

export default function Carousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5500, stopOnInteraction: true }),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    onSelect();
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  return (
    <section className="relative bg-foreground">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide, index) => (
            <div className="relative min-w-0 shrink-0 grow-0 basis-full" key={slide.filename}>
              <div className="relative aspect-[4/5] w-full sm:aspect-[16/9] md:aspect-[21/9] md:max-h-[min(72vh,640px)]">
                <MediaImage
                  src={slide.src}
                  alt={slide.title}
                  filename={slide.filename}
                  placeholderLabel="Hero banner"
                  priority={index === 0}
                  sizes="100vw"
                  imageClassName="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/35 to-foreground/10" />
                <div className="absolute inset-0 flex items-end">
                  <div className="mx-auto w-full max-w-7xl px-4 pb-12 sm:px-6 sm:pb-16 lg:px-8">
                    <p className="mb-3 text-lg font-semibold text-primary-foreground sm:text-xl">
                      South Indian heritage
                    </p>
                    <h1 className="font-display max-w-2xl text-3xl leading-tight text-primary-foreground sm:text-4xl md:text-5xl lg:text-6xl">
                      {slide.title}
                    </h1>
                    <p className="mt-4 max-w-xl text-lg leading-relaxed text-primary-foreground sm:text-xl">
                      {slide.subtitle}
                    </p>
                    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                      <Button
                        asChild
                        className="h-14 min-w-[200px] rounded-md bg-primary-foreground px-8 text-lg font-bold text-foreground hover:bg-primary-foreground/90"
                      >
                        <Link href={slide.href}>{slide.cta}</Link>
                      </Button>
                      <Button
                        asChild
                        variant="outline"
                        className="h-14 min-w-[200px] rounded-md border-2 border-primary-foreground bg-transparent px-8 text-lg font-bold text-primary-foreground hover:bg-primary-foreground/15"
                      >
                        <Link href="/#about">About us</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={scrollPrev}
        className="tap-target absolute top-1/2 left-2 -translate-y-1/2 rounded-md border-2 border-primary-foreground bg-foreground/50 p-2.5 text-primary-foreground sm:left-3 sm:p-3"
        aria-label="Previous slide"
      >
        <ChevronLeft size={28} strokeWidth={2} />
      </button>
      <button
        type="button"
        onClick={scrollNext}
        className="tap-target absolute top-1/2 right-2 -translate-y-1/2 rounded-md border-2 border-primary-foreground bg-foreground/50 p-2.5 text-primary-foreground sm:right-3 sm:p-3"
        aria-label="Next slide"
      >
        <ChevronRight size={28} strokeWidth={2} />
      </button>

      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 sm:bottom-6">
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={cn(
              'h-2 rounded-full transition-all duration-300',
              selectedIndex === index
                ? 'w-10 bg-primary-foreground'
                : 'w-6 bg-primary-foreground/50 hover:bg-primary-foreground/80',
            )}
          />
        ))}
      </div>
    </section>
  );
}
