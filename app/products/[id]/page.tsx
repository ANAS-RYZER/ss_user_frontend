import { notFound } from 'next/navigation';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { ProductDetailPanel } from '@/components/product-detail-panel';
import { getProductById } from '@/lib/products/get-product';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const result = await getProductById(id);

  if (!result) {
    notFound();
  }

  return (
    <main id="main-content" className="min-h-screen bg-background">
      <Navbar />
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
        <ProductDetailPanel product={result.product} />
      </div>
      <Footer />
    </main>
  );
}
