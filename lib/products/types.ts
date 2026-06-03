export type AudienceCategory = 'women' | 'men' | 'children';

export interface ProductStatus {
  active: boolean;
  featured: boolean;
}

export interface ProductSize {
  label: string;
  available: boolean;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  company: string;
  category: string;
  audience: AudienceCategory;
  fabricType: string;
  colors: string[];
  materials: string[];
  price: number;
  mrp?: number;
  priceRange?: string;
  certifications: string[];
  tags: string[];
  seoKeywords: string[];
  images: string[];
  imageFilename?: string;
  designer: string;
  status: ProductStatus;
  rating?: number;
  reviewCount?: number;
  sizes?: ProductSize[];
  bestseller?: boolean;
  modelNote?: string;
  createdAt?: string;
  updatedAt?: string;
}

export const AUDIENCE_LABELS: Record<AudienceCategory, string> = {
  women: 'Women',
  men: 'Men',
  children: 'Children',
};

export const DEFAULT_SIZES: ProductSize[] = [
  { label: 'XS', available: true },
  { label: 'S', available: true },
  { label: 'M', available: false },
  { label: 'L', available: false },
  { label: 'XL', available: true },
];
