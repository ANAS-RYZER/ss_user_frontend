'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useTransition } from 'react';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { ProductCard } from '@/components/product-card';
import { ProductQuickViewProvider } from '@/contexts/product-quick-view-context';
import type { ProductCatalogResult, ProductSort } from '@/lib/products/fetch-catalog';
import type { AudienceCategory } from '@/lib/products/types';
import { AUDIENCE_LABELS } from '@/lib/products/types';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const audienceFilters = [
  { id: 'all', label: 'All products' },
  { id: 'women', label: 'Women' },
  { id: 'men', label: 'Men' },
  { id: 'children', label: 'Children' },
] as const;

const sortOptions: { id: ProductSort; label: string }[] = [
  { id: 'newest', label: 'Newest first' },
  { id: 'oldest', label: 'Oldest first' },
  { id: 'name', label: 'Name (A to Z)' },
  { id: 'price_asc', label: 'Price: low to high' },
  { id: 'price_desc', label: 'Price: high to low' },
];

interface ProductCatalogProps {
  initialData: ProductCatalogResult;
}

export function ProductCatalog({ initialData }: ProductCatalogProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const page = Number(searchParams.get('page') ?? initialData.meta.page) || 1;
  const sort = (searchParams.get('sort') as ProductSort) || 'newest';
  const audience = searchParams.get('audience') ?? 'all';

  const updateParams = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, value]) => {
        if (value === null) params.delete(key);
        else params.set(key, value);
      });
      startTransition(() => {
        router.push(`/products?${params.toString()}`);
      });
    },
    [router, searchParams],
  );

  const { items, meta, source } = initialData;
  const { total, totalPages } = meta;

  return (
    <ProductQuickViewProvider>
      <section className="bg-background py-10 md:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <header className="mb-10 border-b-2 border-border pb-8">
            <h1 className="font-display text-3xl text-foreground sm:text-4xl md:text-5xl">
              All products
            </h1>
            <p className="mt-3 text-lg text-muted-foreground">
              Showing {total} {total === 1 ? 'item' : 'items'}
              {source === 'sample' && (
                <span className="ml-2 font-medium text-amber-800">
                  (Sample list — connect your shop API)
                </span>
              )}
            </p>

            <div className="mt-6">
              <label htmlFor="sort-products" className="readable-label block">
                Sort products
              </label>
              <select
                id="sort-products"
                value={sort}
                onChange={e => updateParams({ sort: e.target.value, page: '1' })}
                className="mt-2 h-12 min-w-[240px] rounded-md border-2 border-border bg-card px-4 text-lg text-foreground"
              >
                {sortOptions.map(opt => (
                  <option key={opt.id} value={opt.id}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </header>

          <div className="mb-10 flex flex-wrap gap-3" role="group" aria-label="Filter by category">
            {audienceFilters.map(filter => (
              <button
                key={filter.id}
                type="button"
                onClick={() => updateParams({ audience: filter.id, page: '1' })}
                className={cn(
                  'rounded-md border-2 px-6 py-3.5 text-lg font-semibold',
                  audience === filter.id
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-card text-foreground hover:border-primary hover:bg-secondary',
                )}
              >
                {filter.label}
              </button>
            ))}
          </div>

          <div className={cn('relative', isPending && 'pointer-events-none opacity-60')}>
            {isPending && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/80">
                <Loader2 className="size-10 animate-spin text-primary" aria-label="Loading" />
              </div>
            )}

            {items.length > 0 ? (
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
                {items.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <p className="py-20 text-center text-xl text-muted-foreground">
                {audience !== 'all'
                  ? `No products for ${AUDIENCE_LABELS[audience as AudienceCategory]} yet.`
                  : 'No products found.'}
              </p>
            )}
          </div>

          {totalPages > 1 && (
            <nav
              className="mt-14 flex flex-col items-center gap-4 border-t-2 border-border pt-8 sm:flex-row sm:justify-between"
              aria-label="Product pages"
            >
              <p className="text-lg font-medium text-foreground">
                Page {page} of {totalPages}
              </p>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  disabled={page <= 1 || isPending}
                  onClick={() => updateParams({ page: String(page - 1) })}
                  className="h-12 min-w-[140px] rounded-md border-2 text-base font-bold"
                >
                  <ChevronLeft size={22} className="mr-1" />
                  Previous
                </Button>
                <Button
                  variant="outline"
                  disabled={page >= totalPages || isPending}
                  onClick={() => updateParams({ page: String(page + 1) })}
                  className="h-12 min-w-[140px] rounded-md border-2 text-base font-bold"
                >
                  Next
                  <ChevronRight size={22} className="ml-1" />
                </Button>
              </div>
            </nav>
          )}
        </div>
      </section>
    </ProductQuickViewProvider>
  );
}
