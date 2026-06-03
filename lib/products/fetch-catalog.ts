import { getApiBaseUrl } from '@/lib/products/config';
import { normalizeProduct } from '@/lib/products/normalize';
import type { Product } from '@/lib/products/types';
import { getAllSampleProducts } from '@/lib/products/get-product';

export type ProductSort = 'newest' | 'oldest' | 'name' | 'price_asc' | 'price_desc';

export interface CatalogMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ProductCatalogResult {
  items: Product[];
  meta: CatalogMeta;
  source: 'api' | 'sample';
}

export interface FetchCatalogParams {
  page?: number;
  limit?: number;
  sort?: ProductSort;
  audience?: string;
}

function buildSampleCatalog(params: FetchCatalogParams): ProductCatalogResult {
  const page = params.page ?? 1;
  const limit = params.limit ?? 20;
  let items = getAllSampleProducts();

  if (params.audience && params.audience !== 'all') {
    items = items.filter(p => p.audience === params.audience);
  }

  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const start = (page - 1) * limit;

  return {
    items: items.slice(start, start + limit),
    meta: { page, limit, total, totalPages },
    source: 'sample',
  };
}

export async function fetchProductCatalog(
  params: FetchCatalogParams = {},
): Promise<ProductCatalogResult> {
  const page = params.page ?? 1;
  const limit = params.limit ?? 20;
  const sort = params.sort ?? 'newest';
  const apiBase = getApiBaseUrl();

  const search = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    sort,
  });

  if (params.audience && params.audience !== 'all') {
    search.set('audience', params.audience);
  }

  try {
    const res = await fetch(`${apiBase}/products?${search.toString()}`, {
      headers: { Accept: 'application/json' },
      next: { revalidate: 30 },
    });

    if (!res.ok) {
      throw new Error(`Products API returned ${res.status}`);
    }

    const data = await res.json();
    const rawItems = Array.isArray(data.items)
      ? data.items
      : Array.isArray(data.products)
        ? data.products
        : Array.isArray(data.data)
          ? data.data
          : [];

    let items = rawItems.map((item: Record<string, unknown>) => normalizeProduct(item));

    if (params.audience && params.audience !== 'all') {
      items = items.filter(p => p.audience === params.audience);
    }

    const meta = data.meta ?? data.pagination ?? {};
    const total = Number(meta.total ?? items.length);
    const totalPages = Number(meta.totalPages ?? Math.max(1, Math.ceil(total / limit)));

    return {
      items,
      meta: {
        page: Number(meta.page ?? page),
        limit: Number(meta.limit ?? limit),
        total,
        totalPages,
      },
      source: 'api',
    };
  } catch {
    return buildSampleCatalog(params);
  }
}
