'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  MapPin,
  Ruler,
  Share2,
  ShoppingBag,
  Star,
} from 'lucide-react';
import type { Product } from '@/lib/products/types';
import { AUDIENCE_LABELS } from '@/lib/products/types';
import {
  colorToSwatch,
  getDiscountPercent,
  getGalleryImages,
  getProductMrp,
} from '@/lib/products/helpers';
import { formatProductPrice, getProductSizes } from '@/lib/products/normalize';
import { MediaImage } from '@/components/media-image';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ProductDetailPanelProps {
  product: Product;
  onClose?: () => void;
  showBreadcrumbs?: boolean;
}

export function ProductDetailPanel({
  product,
  onClose,
  showBreadcrumbs = true,
}: ProductDetailPanelProps) {
  const gallery = getGalleryImages(product);
  const [activeImage, setActiveImage] = useState(0);
  const [thumbStart, setThumbStart] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0] ?? '');
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const sizes = getProductSizes(product);
  const hasApiSizes = Boolean(product.sizes?.length);
  const mrp = getProductMrp(product);
  const discount = getDiscountPercent(product);
  const visibleThumbs = 4;
  const canScrollThumbsUp = thumbStart > 0;
  const canScrollThumbsDown = thumbStart + visibleThumbs < gallery.length;

  const goPrevImage = () => setActiveImage(i => (i === 0 ? gallery.length - 1 : i - 1));
  const goNextImage = () => setActiveImage(i => (i === gallery.length - 1 ? 0 : i + 1));

  const audienceLabel = AUDIENCE_LABELS[product.audience];
  console.log(product);
  

  return (
    <div className="flex flex-col gap-6">
      {showBreadcrumbs && (
        <nav className="text-base font-medium text-muted-foreground sm:text-lg" aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href="/" className="hover:text-foreground">
                Home
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link href="/products" className="underline-offset-2 hover:text-foreground hover:underline">
                {audienceLabel}
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link href="/products" className="underline-offset-2 hover:text-foreground hover:underline">
                {product.category}
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="line-clamp-1 text-foreground">{product.name}</li>
          </ol>
        </nav>
      )}

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-start xl:grid-cols-[72px_minmax(0,1fr)_minmax(300px,420px)] xl:gap-10">
        {/* Thumbnails */}
        <div className="hidden flex-col items-center gap-2 xl:flex">
          <button
            type="button"
            onClick={() => setThumbStart(s => Math.max(0, s - 1))}
            disabled={!canScrollThumbsUp}
            className="rounded-full p-1 text-muted-foreground hover:text-foreground disabled:opacity-30"
            aria-label="Scroll thumbnails up"
          >
            <ChevronUp size={18} strokeWidth={1.5} />
          </button>
          <div className="flex flex-col gap-2">
            {gallery.slice(thumbStart, thumbStart + visibleThumbs).map((src, i) => {
              const index = thumbStart + i;
              return (
                <button
                  key={`${src}-${index}`}
                  type="button"
                  onClick={() => setActiveImage(index)}
                  className={cn(
                    'relative size-[72px] overflow-hidden border bg-muted',
                    activeImage === index ? 'border-foreground ring-1 ring-foreground' : 'border-border',
                  )}
                >
                  <MediaImage
                    src={src}
                    alt=""
                    imageClassName="object-cover object-top"
                    sizes="72px"
                  />
                </button>
              );
            })}
          </div>
          <button
            type="button"
            onClick={() =>
              setThumbStart(s => Math.min(gallery.length - visibleThumbs, s + 1))
            }
            disabled={!canScrollThumbsDown}
            className="rounded-full p-1 text-muted-foreground hover:text-foreground disabled:opacity-30"
            aria-label="Scroll thumbnails down"
          >
            <ChevronDown size={18} strokeWidth={1.5} />
          </button>
        </div>

        {/* Main image */}
        <div className="flex flex-col gap-3">
          <div className="relative aspect-[3/4] max-h-[min(70vh,560px)] w-full overflow-hidden bg-muted sm:aspect-[4/5]">
            <MediaImage
              src={gallery[activeImage]}
              alt={product.name}
              filename={product.imageFilename}
              placeholderLabel="Product image"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              imageClassName="object-cover object-top"
            />

            {(product.bestseller || product.status.featured) && (
              <span className="absolute top-3 left-3 bg-foreground px-2.5 py-1 text-[10px] font-semibold tracking-wider text-background uppercase">
                Bestseller
              </span>
            )}

            <button
              type="button"
              className="absolute top-3 right-3 flex size-9 items-center justify-center rounded-full border border-border/80 bg-background/90 backdrop-blur-sm"
              aria-label="Share product"
            >
              <Share2 size={16} strokeWidth={1.5} />
            </button>

            {gallery.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={goPrevImage}
                  className="absolute top-1/2 left-2 -translate-y-1/2 rounded-full bg-background/80 p-2 shadow-sm backdrop-blur-sm hover:bg-background"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={20} strokeWidth={1.5} />
                </button>
                <button
                  type="button"
                  onClick={goNextImage}
                  className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full bg-background/80 p-2 shadow-sm backdrop-blur-sm hover:bg-background"
                  aria-label="Next image"
                >
                  <ChevronRight size={20} strokeWidth={1.5} />
                </button>
              </>
            )}
          </div>

          {/* Mobile thumbnails */}
          <div className="flex gap-2 overflow-x-auto pb-1 xl:hidden">
            {gallery.map((src, index) => (
              <button
                key={`mobile-${src}-${index}`}
                type="button"
                onClick={() => setActiveImage(index)}
                className={cn(
                  'relative size-16 shrink-0 overflow-hidden border bg-muted',
                  activeImage === index ? 'border-foreground' : 'border-border',
                )}
              >
                <MediaImage src={src} alt="" imageClassName="object-cover" sizes="64px" />
              </button>
            ))}
          </div>

          {product.modelNote && (
            <p className="text-center text-xs text-muted-foreground">{product.modelNote}</p>
          )}
        </div>

        {/* Purchase panel — full width on mobile; beside image on tablet+ */}
        <div className="flex flex-col md:col-span-1 xl:col-span-1">
          <p className="text-xl font-semibold text-primary">{product.company}</p>
          <h1 className="mt-2 font-display text-3xl leading-snug text-foreground sm:text-4xl">
            {product.name}
          </h1>

          {(product.rating != null || product.reviewCount != null) && (
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-md bg-emerald-700 px-3 py-1.5 text-base font-bold text-white">
                {product.rating?.toFixed(1) ?? '4.0'}
                <Star size={16} className="fill-white" />
              </span>
              {product.reviewCount != null && (
                <span className="text-lg text-muted-foreground">
                  {product.reviewCount.toLocaleString('en-IN')} customer ratings
                </span>
              )}
            </div>
          )}

          <div className="mt-5 border-t border-border pt-5">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="text-3xl font-bold text-foreground">{formatProductPrice(product)}</span>
              {product.price > 0 && discount > 0 && (
                <span className="text-lg text-muted-foreground">
                  MRP ₹{mrp.toLocaleString('en-IN')}{' '}
                  <span className="text-emerald-700">({discount}% OFF)</span>
                </span>
              )}
            </div>
            <p className="mt-2 text-base text-muted-foreground">Price includes all taxes</p>
          </div>

          {product.colors.length > 0 && (
            <div className="mt-6">
              <p className="readable-label">Colour: {selectedColor}</p>
              <div className="mt-3 flex flex-wrap gap-3">
                {product.colors.map(color => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setSelectedColor(color)}
                    aria-label={`Color ${color}`}
                    className={cn(
                      'tap-target size-12 rounded-full border-4 p-0.5',
                      selectedColor === color ? 'border-foreground' : 'border-transparent',
                    )}
                  >
                    <span
                      className="block size-full rounded-full border border-border/50"
                      style={{ backgroundColor: colorToSwatch(color) }}
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6">
            <div className="flex items-center justify-between gap-2">
              <p className="readable-label">
                Size {selectedSize ? `— ${selectedSize}` : ''}
              </p>
              <button
                type="button"
                className="inline-flex items-center gap-2 text-base font-medium text-primary underline-offset-2 hover:underline"
              >
                <Ruler size={18} strokeWidth={2} />
                Size chart
              </button>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {sizes.map(size => (
                <button
                  key={size.label}
                  type="button"
                  disabled={!size.available}
                  onClick={() => size.available && setSelectedSize(size.label)}
                  className={cn(
                    'tap-target flex min-w-12 items-center justify-center rounded-md border-2 px-4 py-3 text-lg font-bold uppercase',
                    !size.available &&
                      'cursor-not-allowed border-border text-muted-foreground/50 line-through',
                    size.available &&
                      selectedSize === size.label &&
                      'border-foreground bg-foreground text-background',
                    size.available &&
                      selectedSize !== size.label &&
                      'border-border text-foreground hover:border-foreground',
                  )}
                >
                  {size.label}
                </button>
              ))}
            </div>
            {!hasApiSizes && (
              <p className="mt-2 text-sm text-muted-foreground">
                Standard sizes shown — confirm availability when ordering.
              </p>
            )}
          </div>

          <div className="mt-5 flex items-start gap-3 rounded-md border-2 border-amber-300 bg-amber-50 px-4 py-4 text-base font-medium text-amber-950">
            <MapPin size={22} className="mt-0.5 shrink-0" strokeWidth={2} />
            <p>
              {selectedSize
                ? 'Estimated delivery in 5–7 business days across India.'
                : 'Select your size to know your estimated delivery date.'}
            </p>
          </div>

          <Button
            size="lg"
            disabled={!selectedSize}
            className="mt-6 h-14 w-full rounded-md text-lg font-bold hover:bg-primary/90"
          >
            <ShoppingBag size={22} className="mr-2" strokeWidth={2} />
            Add to shopping bag
          </Button>

          <p className="mt-4 text-center text-base text-muted-foreground">
            Handpicked styles · Quality assured
          </p>

          {onClose ? (
            <button
              type="button"
              onClick={onClose}
              className="mt-6 text-center text-sm text-muted-foreground underline-offset-2 hover:text-foreground hover:underline"
            >
              Continue shopping
            </button>
          ) : (
            <Link
              href="/products"
              className="mt-6 block text-center text-sm text-muted-foreground underline-offset-2 hover:text-foreground hover:underline"
            >
              Continue shopping
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
