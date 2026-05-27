'use client';

import Image from 'next/image';
import { useState } from 'react';

interface ProductCardProps {
  id: string;
  name: string;
  designer: string;
  price: number;
  image: string;
  category: string;
}

export function ProductCard({ id, name, designer, price, image, category }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="group">
      <div
        className="relative overflow-hidden rounded-lg mb-6 bg-muted aspect-square"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Image
          src={image}
          alt={name}
          fill
          className={`object-cover transition-transform duration-500 ${
            isHovered ? 'scale-105' : 'scale-100'
          }`}
        />
        {isHovered && (
          <div className="absolute inset-0 bg-black/5 transition-opacity duration-300"></div>
        )}
        <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <button className="px-8 py-2 bg-background text-foreground font-light text-sm tracking-widest uppercase border border-foreground hover:bg-foreground hover:text-background transition-all duration-300">
            View
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="text-center">
        <p className="text-xs font-light tracking-widest text-muted-foreground uppercase mb-2">
          {designer}
        </p>
        <h3 className="text-sm font-light tracking-wide text-foreground mb-3 text-balance">
          {name}
        </h3>
        <p className="text-base font-light text-accent">
          ₹{price.toLocaleString('en-IN')}
        </p>
      </div>
    </div>
  );
}
