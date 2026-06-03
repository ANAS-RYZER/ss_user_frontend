import { Suspense } from 'react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { ProductCatalog } from '@/components/product-catalog';
import { fetchProductCatalog, type ProductSort } from '@/lib/products/fetch-catalog';
import type { AudienceCategory } from '@/lib/products/types';

interface ProductsPageProps {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    sort?: string;
    audience?: string;
  }>;
}

export const metadata = {
  title: 'Product Catalog | SHARNAYA',
  description: 'Browse our full collection of traditional South Indian wear.',
};

async function CatalogContent({
  searchParams,
}: {
  searchParams: ProductsPageProps['searchParams'];
}) {
  const params = await searchParams;
  const page = Math.max(1, Number(params.page) || 1);
  const limit = Math.min(50, Math.max(1, Number(params.limit) || 20));
  const sort = (params.sort as ProductSort) || 'newest';
  const audience = params.audience ?? 'all';

  const catalog = await fetchProductCatalog({
    page,
    limit,
    sort,
    audience: audience as AudienceCategory | 'all',
  });

  return <ProductCatalog initialData={catalog} />;
}

export default function ProductsCatalogPage({ searchParams }: ProductsPageProps) {
  return (
    <main id="main-content" className="min-h-screen bg-background">
      <Navbar />
      <Suspense
        fallback={
          <div className="flex min-h-[40vh] items-center justify-center text-muted-foreground">
            Loading catalog…
          </div>
        }
      >
        <CatalogContent searchParams={searchParams} />
      </Suspense>
      <Footer />
    </main>
  );
}
