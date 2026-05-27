'use client';

import { ProductCard } from './product-card';
import { useState } from 'react';

const products = [
  {
    id: '1',
    name: 'Pure Silk Kanjeevaram Saree',
    designer: 'SHARNAYA Creations',
    price: 18500,
    image:
      'bb1.webp',
    category: 'saree',
  },
  {
    id: '2',
    name: 'Kanchipuram Temple Saree',
    designer: 'Heritage Collection',
    price: 21000,
    image:
      'bb3.webp',
    category: 'saree',
  },
  {
    id: '3',
    name: 'Traditional Gold Border Saree',
    designer: 'SHARNAYA Creations',
    price: 16500,
    image:
      'bb2.webp',
    category: 'saree',
  },
  {
    id: '4',
    name: 'Mustard Readymade Cotton Pavadai Set',
    designer: 'Heritage Collection',
    price: 8500,
    image:
      'bb4.webp',
    category: 'kids',
  },
  {
    id: '5',
    name: 'Kids Traditional Saree',
    designer: 'SHARNAYA Creations',
    price: 7500,
    image:
      'bb5.avif',
    category: 'kids',
  },
  {
    id: '6',
    name: 'Ethnic Kids Pattu Pavadai',
    designer: 'Heritage Collection',
    price: 9200,
    image:
      'bb6.avif',
    category: 'kids',
  },
];

export function ProductGrid() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filtered = activeFilter === 'all' ? products : products.filter(p => p.category === activeFilter);

  return (
    <section className="bg-background py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-3xl md:text-5xl font-light tracking-widest text-foreground mb-8">
            Collections
          </h2>
          <div className="flex justify-center gap-8 md:gap-12">
            <button
              onClick={() => setActiveFilter('all')}
              className={`text-sm font-light tracking-widest uppercase transition-all duration-300 pb-2 border-b-2 ${
                activeFilter === 'all'
                  ? 'border-accent text-foreground'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveFilter('saree')}
              className={`text-sm font-light tracking-widest uppercase transition-all duration-300 pb-2 border-b-2 ${
                activeFilter === 'saree'
                  ? 'border-accent text-foreground'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              Sarees
            </button>
            <button
              onClick={() => setActiveFilter('kids')}
              className={`text-sm font-light tracking-widest uppercase transition-all duration-300 pb-2 border-b-2 ${
                activeFilter === 'kids'
                  ? 'border-accent text-foreground'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              Kids Wear
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16">
          {filtered.map(product => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
}
