import type { Product } from '@/lib/products/types';

export function getProductMrp(product: Product): number {
  return product.mrp ?? Math.round(product.price / 0.35);
}

export function getDiscountPercent(product: Product): number {
  const mrp = getProductMrp(product);
  if (mrp <= product.price) return 0;
  return Math.round(((mrp - product.price) / mrp) * 100);
}

export function getGalleryImages(product: Product): string[] {
  if (product.images.length > 1) return product.images;
  const primary = product.images[0] ?? '/placeholder.jpg';
  return [primary, primary, primary, primary];
}

/** Approximate swatch color from color name */
export function colorToSwatch(name: string): string {
  const map: Record<string, string> = {
    maroon: '#6B1D1D',
    gold: '#C9A227',
    green: '#2D5A27',
    red: '#9B2335',
    ivory: '#F5F0E6',
    cream: '#FFF8E7',
    navy: '#1B2A4A',
    mustard: '#C4A035',
    yellow: '#E8C547',
    pink: '#E8A0B8',
    blue: '#4A6FA5',
  };
  const key = name.toLowerCase().split(/[\s,/]+/)[0] ?? '';
  return map[key] ?? '#C4B5A0';
}
