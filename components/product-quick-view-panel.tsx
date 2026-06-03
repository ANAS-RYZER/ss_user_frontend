'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ShoppingBag } from 'lucide-react';
import type { Product } from '@/lib/products/types';
import { DEFAULT_SIZES } from '@/lib/products/types';
import { colorToSwatch, getGalleryImages } from '@/lib/products/helpers';
import { formatProductPrice } from '@/lib/products/normalize';
import { MediaImage } from '@/components/media-image';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ProductQuickViewPanelProps {
  product: Product;
  onClose?: () => void;
}

export function ProductQuickViewPanel({ product }: ProductQuickViewPanelProps) {
  const gallery = getGalleryImages(product);
  const [activeImage, setActiveImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0] ?? '');
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const sizes = product.sizes ?? DEFAULT_SIZES;

  const goPrev = () => setActiveImage(i => (i === 0 ? gallery.length - 1 : i - 1));
  const goNext = () => setActiveImage(i => (i === gallery.length - 1 ? 0 : i + 1));

  return (
    <div className="flex h-full flex-col">
      <div className="relative aspect-[4/5] w-full shrink-0 overflow-hidden bg-muted">
        <MediaImage
          src={gallery[activeImage]}
          alt={product.name}
          filename={product.imageFilename}
          placeholderLabel="Product image"
          priority
          sizes="(max-width: 640px) 100vw, 560px"
          imageClassName="object-cover object-top"
        />
        {(product.bestseller || product.status.featured) && (
          <span className="absolute top-4 left-4 rounded-md bg-primary px-3 py-1.5 text-base font-bold text-primary-foreground">
            Featured
          </span>
        )}
        {gallery.length > 1 && (
          <>
            <button
              type="button"
              onClick={goPrev}
              className="tap-target absolute top-1/2 left-3 -translate-y-1/2 rounded-md border-2 border-border bg-background p-3 shadow-md"
              aria-label="Previous photo"
            >
              <ChevronLeft size={24} strokeWidth={2} />
            </button>
            <button
              type="button"
              onClick={goNext}
              className="tap-target absolute top-1/2 right-3 -translate-y-1/2 rounded-md border-2 border-border bg-background p-3 shadow-md"
              aria-label="Next photo"
            >
              <ChevronRight size={24} strokeWidth={2} />
            </button>
          </>
        )}
      </div>

      <div className="flex flex-1 flex-col overflow-y-auto px-5 py-6 sm:px-7">
        <p className="text-lg font-semibold text-primary">{product.company}</p>
        <h2 className="mt-2 font-display text-2xl leading-snug text-foreground sm:text-3xl">
          {product.name}
        </h2>
        <p className="mt-1 text-lg text-muted-foreground">{product.category}</p>

        <p className="mt-5 text-3xl font-bold text-foreground">{formatProductPrice(product)}</p>
        <p className="text-base text-muted-foreground">Price includes all taxes</p>

        {product.colors.length > 0 && (
          <div className="mt-8">
            <p className="readable-label">Colour: {selectedColor}</p>
            <div className="mt-3 flex flex-wrap gap-3">
              {product.colors.map(color => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setSelectedColor(color)}
                  aria-label={`Select colour ${color}`}
                  className={cn(
                    'tap-target rounded-full border-4 p-1',
                    selectedColor === color ? 'border-foreground' : 'border-border',
                  )}
                >
                  <span
                    className="block size-10 rounded-full border-2 border-border"
                    style={{ backgroundColor: colorToSwatch(color) }}
                  />
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8">
          <p className="readable-label">Choose your size</p>
          <div className="mt-3 flex flex-wrap gap-3">
            {sizes.map(size => (
              <button
                key={size.label}
                type="button"
                disabled={!size.available}
                onClick={() => size.available && setSelectedSize(size.label)}
                className={cn(
                  'tap-target min-w-[3.25rem] rounded-md border-2 px-4 py-3 text-lg font-bold',
                  !size.available && 'cursor-not-allowed opacity-40 line-through',
                  size.available && selectedSize === size.label && 'border-primary bg-primary text-primary-foreground',
                  size.available && selectedSize !== size.label && 'border-border bg-card hover:border-primary',
                )}
              >
                {size.label}
              </button>
            ))}
          </div>
          {!selectedSize && (
            <p className="mt-2 text-base font-medium text-amber-900">
              Please select a size before adding to bag.
            </p>
          )}
        </div>

        <Button
          disabled={!selectedSize}
          className="mt-8 h-14 w-full rounded-md text-lg font-bold"
        >
          <ShoppingBag size={22} className="mr-2" strokeWidth={2} />
          Add to shopping bag
        </Button>

        <Button
          asChild
          variant="outline"
          className="mt-3 h-14 w-full rounded-md border-2 text-lg font-bold"
        >
          <Link href={`/products/${product.id}`}>Open full product page</Link>
        </Button>
      </div>
    </div>
  );
}
