import type { AudienceCategory, Product } from '@/lib/products/types';

function parseImages(raw: unknown): string[] {
  if (!Array.isArray(raw)) return [];
  const urls = raw
    .map(item => {
      if (typeof item === 'string') return item;
      if (item && typeof item === 'object' && 'url' in item) {
        return String((item as { url: string }).url);
      }
      return null;
    })
    .filter((url): url is string => Boolean(url));

  const primary = raw.find(
    item => item && typeof item === 'object' && (item as { isPrimary?: boolean }).isPrimary,
  ) as { url?: string } | undefined;

  if (primary?.url) {
    return [primary.url, ...urls.filter(u => u !== primary.url)];
  }

  return urls;
}

function parsePrice(raw: Record<string, unknown>): number {
  if (raw.price != null && !Number.isNaN(Number(raw.price))) {
    return Number(raw.price);
  }
  const range = String(raw.priceRange ?? '');
  const nums = range.replace(/,/g, '').match(/\d+(?:\.\d+)?/g);
  if (nums?.length) return Math.round(Number(nums[0]));
  return 0;
}

function parseAudience(raw: Record<string, unknown>): AudienceCategory {
  const value = String(raw.audience ?? raw.gender ?? raw.targetAudience ?? '').toLowerCase();
  if (value === 'men' || value === 'man' || value === 'mens') return 'men';
  if (value === 'children' || value === 'kids' || value === 'child') return 'children';
  if (value === 'women' || value === 'woman' || value === 'womens') return 'women';
  return 'women';
}

export function normalizeProduct(raw: Record<string, unknown>): Product {
  const seo = raw.seo as { keywords?: string[] } | undefined;
  const images = parseImages(raw.images);
  const priceRange = raw.priceRange ? String(raw.priceRange) : undefined;
  const price = parsePrice(raw);

  return {
    id: String(raw.id ?? raw._id ?? ''),
    name: String(raw.name ?? ''),
    slug: String(raw.slug ?? ''),
    company: String(raw.company ?? raw.designer ?? ''),
    category: String(raw.category ?? 'General'),
    audience: parseAudience(raw),
    fabricType: String(raw.fabricType ?? raw.fabric_type ?? ''),
    colors: Array.isArray(raw.colors) ? raw.colors.map(String) : [],
    materials: Array.isArray(raw.materials) ? raw.materials.map(String) : [],
    price,
    mrp: raw.mrp != null ? Number(raw.mrp) : undefined,
    priceRange: priceRange?.startsWith('₹') ? priceRange : priceRange ? `₹${priceRange}` : undefined,
    rating: raw.rating != null ? Number(raw.rating) : undefined,
    reviewCount: raw.reviewCount != null ? Number(raw.reviewCount) : undefined,
    bestseller: Boolean(raw.bestseller ?? raw.isFeatured),
    modelNote: raw.modelNote ? String(raw.modelNote) : undefined,
    sizes: Array.isArray(raw.sizes)
      ? (raw.sizes as { label: string; available: boolean }[])
      : undefined,
    certifications: Array.isArray(raw.certifications) ? raw.certifications.map(String) : [],
    tags: Array.isArray(raw.tags) ? raw.tags.map(String) : [],
    seoKeywords: Array.isArray(raw.seoKeywords)
      ? raw.seoKeywords.map(String)
      : Array.isArray(seo?.keywords)
        ? seo!.keywords!.map(String)
        : [],
    images,
    designer: String(raw.designer ?? raw.company ?? ''),
    status: {
      active: Boolean(raw.isActive ?? (raw.status as { active?: boolean })?.active ?? true),
      featured: Boolean(raw.isFeatured ?? (raw.status as { featured?: boolean })?.featured ?? false),
    },
    createdAt: raw.createdAt ? String(raw.createdAt) : undefined,
    updatedAt: raw.updatedAt ? String(raw.updatedAt) : undefined,
  };
}

export function formatProductPrice(product: Product): string {
  if (product.price > 0) {
    return `₹${product.price.toLocaleString('en-IN')}`;
  }
  if (product.priceRange) {
    return product.priceRange.includes('₹') ? product.priceRange : `₹${product.priceRange}`;
  }
  return 'Price on request';
}
