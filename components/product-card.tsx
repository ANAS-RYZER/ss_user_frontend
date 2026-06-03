'use client';

import Link from 'next/link';
import { useProductQuickView } from '@/contexts/product-quick-view-context';
import type { Product } from '@/lib/products/types';
import { formatProductPrice } from '@/lib/products/normalize';
import { MediaImage } from '@/components/media-image';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { openQuickView } = useProductQuickView();
  const primaryImage = product.images[0] ?? '/placeholder.jpg';

  return (
    <article className="flex flex-col overflow-hidden rounded-md border-2 border-border bg-card shadow-sm">
      <Link
        href={`/products/${product.id}`}
        className="relative block aspect-[3/4] overflow-hidden bg-muted"
      >
        <MediaImage
          src={primaryImage}
          alt={product.name}
          filename={product.imageFilename}
          placeholderLabel="Product photo"
          sizes="(max-width: 768px) 100vw, 50vw"
          imageClassName="object-cover object-top"
        />
        {(product.status.featured || product.bestseller) && (
          <span className="absolute top-3 left-3 rounded-md bg-primary px-3 py-1.5 text-sm font-bold text-primary-foreground">
            Featured
          </span>
        )}
        {!product.status.featured && product.category && (
          <span className="absolute top-3 left-3 rounded-md bg-background px-3 py-1.5 text-sm font-semibold text-foreground shadow-sm">
            {product.category}
          </span>
        )}
      </Link>

      <div className="flex flex-col gap-3 p-4 sm:p-5">
        <div>
          <p className="text-base font-medium text-muted-foreground">
            {product.company || product.designer}
          </p>
          <Link
            href={`/products/${product.id}`}
            className="mt-1 block text-lg font-semibold leading-snug text-foreground underline-offset-2 hover:text-primary hover:underline sm:text-xl"
          >
            {product.name}
          </Link>
          <p className="mt-2 text-2xl font-bold text-primary">{formatProductPrice(product)}</p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={() => openQuickView(product)}
            className="tap-target flex-1 rounded-md border-2 border-foreground bg-background px-4 py-3.5 text-center text-base font-bold text-foreground hover:bg-secondary"
          >
            Quick look
          </button>
          <Link
            href={`/products/${product.id}`}
            className="tap-target flex flex-1 items-center justify-center rounded-md bg-primary px-4 py-3.5 text-center text-base font-bold text-primary-foreground hover:bg-primary/90"
          >
            View details
          </Link>
        </div>
      </div>
    </article>
  );
}
