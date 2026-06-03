'use client';

import type { Product } from '@/lib/products/types';
import { ProductQuickViewPanel } from '@/components/product-quick-view-panel';
import {
  Sheet,
  SheetContent,
  SheetTitle,
} from '@/components/ui/sheet';

interface ProductQuickViewDialogProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProductQuickViewDialog({
  product,
  open,
  onOpenChange,
}: ProductQuickViewDialogProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="flex h-full w-full max-w-full flex-col gap-0 border-l-2 border-border p-0 sm:max-w-lg md:max-w-xl [&>button]:top-5 [&>button]:right-5 [&>button]:z-20 [&>button]:size-12 [&>button]:rounded-md [&>button]:border-2 [&>button]:border-border [&>button]:bg-background"
      >
        {product && (
          <>
            <SheetTitle className="sr-only">{product.name}</SheetTitle>
            <ProductQuickViewPanel
              product={product}
              onClose={() => onOpenChange(false)}
            />
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
