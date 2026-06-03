import type { Product } from '@/lib/products/types';
import { getSampleProductById, sampleProducts } from '@/lib/products/data';
import { getApiBaseUrl } from '@/lib/products/config';
import { normalizeProduct } from '@/lib/products/normalize';

export type ProductSource = 'api' | 'sample';

export interface ProductResult {
  product: Product;
  source: ProductSource;
}

export async function getProductById(id: string): Promise<ProductResult | null> {
  const apiBase = getApiBaseUrl();

  try {
    const res = await fetch(`${apiBase}/products/${id}`, {
      headers: { Accept: 'application/json' },
      next: { revalidate: 60 },
    });
    if (res.ok) {
      const data = await res.json();
      const raw = (data.product ?? data) as Record<string, unknown>;
      return { product: normalizeProduct(raw), source: 'api' };
    }
  } catch {
    /* fall back to sample */
  }

  const product = getSampleProductById(id);
  if (!product) return null;
  return { product, source: 'sample' };
}

export function getAllSampleProducts(): Product[] {
  return sampleProducts;
}
