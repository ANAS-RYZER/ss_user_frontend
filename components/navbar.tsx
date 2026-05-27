'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, ShoppingCart, Menu, X } from 'lucide-react';

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between mb-6">
          {/* Logo */}
          <Link href="/" className="text-xl font-light tracking-widest text-foreground">
            SHARNAYA
          </Link>

          {/* Right icons - always visible */}
          <div className="flex items-center gap-6">
            <button className="text-foreground hover:opacity-60 transition-opacity">
              <Search size={20} />
            </button>
            <button className="text-foreground hover:opacity-60 transition-opacity relative">
              <ShoppingCart size={20} />
              <span className="absolute -top-2 -right-2 text-xs bg-accent text-accent-foreground w-5 h-5 rounded-full flex items-center justify-center">
                0
              </span>
            </button>
            <button
              className="md:hidden text-foreground"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex justify-center gap-12">
          <Link
            href="#"
            className="text-sm font-light tracking-widest text-foreground hover:opacity-60 transition-opacity uppercase"
          >
            Sarees
          </Link>
          <Link
            href="#"
            className="text-sm font-light tracking-widest text-foreground hover:opacity-60 transition-opacity uppercase"
          >
            Kids Wear
          </Link>
          <Link
            href="#"
            className="text-sm font-light tracking-widest text-foreground hover:opacity-60 transition-opacity uppercase"
          >
            Collections
          </Link>
          <Link
            href="#"
            className="text-sm font-light tracking-widest text-foreground hover:opacity-60 transition-opacity uppercase"
          >
            About
          </Link>
        </div>

        {/* Mobile Navigation */}
        {mobileOpen && (
          <div className="md:hidden flex flex-col gap-4 mt-6 border-t border-border pt-6">
            <Link
              href="#"
              className="text-sm font-light tracking-widest text-foreground hover:opacity-60 transition-opacity uppercase"
            >
              Sarees
            </Link>
            <Link
              href="#"
              className="text-sm font-light tracking-widest text-foreground hover:opacity-60 transition-opacity uppercase"
            >
              Kids Wear
            </Link>
            <Link
              href="#"
              className="text-sm font-light tracking-widest text-foreground hover:opacity-60 transition-opacity uppercase"
            >
              Collections
            </Link>
            <Link
              href="#"
              className="text-sm font-light tracking-widest text-foreground hover:opacity-60 transition-opacity uppercase"
            >
              About
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
