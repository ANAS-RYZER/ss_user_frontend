'use client';

import { ProductQuickViewProvider } from '@/contexts/product-quick-view-context';
import { ProductGrid } from '@/components/product-grid';

export function ProductGridSection() {
  return (
    <ProductQuickViewProvider>
      <ProductGrid />
    </ProductQuickViewProvider>
  );
}
