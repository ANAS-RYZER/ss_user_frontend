'use client';

import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { Product } from '@/lib/products/types';
import { ProductQuickViewDialog } from '@/components/product-quick-view-dialog';

interface ProductQuickViewContextValue {
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
}

const ProductQuickViewContext = createContext<ProductQuickViewContextValue | null>(null);

export function ProductQuickViewProvider({ children }: { children: React.ReactNode }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [open, setOpen] = useState(false);

  const openQuickView = useCallback((p: Product) => {
    setProduct(p);
    setOpen(true);
  }, []);

  const closeQuickView = useCallback(() => {
    setOpen(false);
  }, []);

  const value = useMemo(
    () => ({ openQuickView, closeQuickView }),
    [openQuickView, closeQuickView],
  );

  return (
    <ProductQuickViewContext.Provider value={value}>
      {children}
      <ProductQuickViewDialog
        product={product}
        open={open}
        onOpenChange={next => {
          setOpen(next);
          if (!next) setProduct(null);
        }}
      />
    </ProductQuickViewContext.Provider>
  );
}

export function useProductQuickView() {
  const ctx = useContext(ProductQuickViewContext);
  if (!ctx) {
    throw new Error('useProductQuickView must be used within ProductQuickViewProvider');
  }
  return ctx;
}
