'use client';

import { ProductCard } from './product-card';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { getAllSampleProducts } from '@/lib/products/get-product';
import type { AudienceCategory } from '@/lib/products/types';
import { AUDIENCE_LABELS } from '@/lib/products/types';
import Link from 'next/link';

const products = getAllSampleProducts();

const filters = [
  { id: 'all', label: 'All products' },
  { id: 'women', label: 'Women' },
  { id: 'men', label: 'Men' },
  { id: 'children', label: 'Children' },
] as const;

type FilterId = (typeof filters)[number]['id'];

export function ProductGrid() {
  const [activeFilter, setActiveFilter] = useState<FilterId>('all');

  const filtered =
    activeFilter === 'all'
      ? products
      : products.filter(p => p.audience === (activeFilter as AudienceCategory));

  return (
    <section id="collections" className="scroll-mt-24 bg-background py-12 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center md:mb-14">
          <h2 className="font-display text-3xl text-foreground sm:text-4xl md:text-5xl">
            Our collections
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Browse sarees and traditional wear for women, men, and children. Use the buttons on each
            product to see details.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {filters.map(filter => (
              <button
                key={filter.id}
                type="button"
                onClick={() => setActiveFilter(filter.id)}
                className={cn(
                  'rounded-md border-2 px-6 py-3.5 text-lg font-semibold transition-colors',
                  activeFilter === filter.id
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-card text-foreground hover:border-primary hover:bg-secondary',
                )}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="py-16 text-center text-xl text-muted-foreground">
            No products in {AUDIENCE_LABELS[activeFilter as AudienceCategory]} right now.
          </p>
        )}

        <div className="mt-12 text-center">
          <Link
            href="/products"
            className="tap-target inline-flex items-center justify-center rounded-md bg-primary px-8 py-4 text-lg font-bold text-primary-foreground hover:bg-primary/90"
          >
            See all products
          </Link>
        </div>
      </div>
    </section>
  );
}
