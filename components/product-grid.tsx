'use client';

import { ProductCard } from './product-card';
import { useState } from 'react';

const products = [
  {
    id: '1',
    name: 'Pure Silk Kanjeevaram Saree',
    designer: 'Sambavi Creations',
    price: 18500,
    image:
      'https://images.unsplash.com/photo-1605777695826-4a4d8d5e4d5c?w=500&h=600&fit=crop',
    category: 'saree',
  },
  {
    id: '2',
    name: 'Kanchipuram Temple Saree',
    designer: 'Heritage Collection',
    price: 21000,
    image:
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&h=600&fit=crop',
    category: 'saree',
  },
  {
    id: '3',
    name: 'Traditional Gold Border Saree',
    designer: 'Sambavi Creations',
    price: 16500,
    image:
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=600&fit=crop',
    category: 'saree',
  },
  {
    id: '4',
    name: 'Silk Pattu Kids Lehenga',
    designer: 'Heritage Collection',
    price: 8500,
    image:
      'https://images.unsplash.com/photo-1588710227913-d9ad21c4d6c6?w=500&h=600&fit=crop',
    category: 'kids',
  },
  {
    id: '5',
    name: 'Kids Traditional Saree',
    designer: 'Sambavi Creations',
    price: 7500,
    image:
      'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=500&h=600&fit=crop',
    category: 'kids',
  },
  {
    id: '6',
    name: 'Ethnic Kids Pattu Pavadai',
    designer: 'Heritage Collection',
    price: 9200,
    image:
      'https://images.unsplash.com/photo-1577804661236-e3c942f3e313?w=500&h=600&fit=crop',
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
