import { cn } from '@/lib/utils';
import type { ProductStatus } from '@/lib/products/types';

export function ProductStatusBadges({ status }: { status: ProductStatus }) {
  return (
    <div className="flex flex-wrap gap-2">
      {status.active && (
        <span
          className={cn(
            'inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium',
            'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200',
          )}
        >
          Active
        </span>
      )}
      {status.featured && (
        <span
          className={cn(
            'inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium',
            'bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200',
          )}
        >
          Featured
        </span>
      )}
      {!status.active && (
        <span className="inline-flex rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
          Inactive
        </span>
      )}
    </div>
  );
}
