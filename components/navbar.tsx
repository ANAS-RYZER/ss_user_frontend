'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, ShoppingBag, Menu, X, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AnnouncementBar } from '@/components/announcement-bar';
import { LogoLink } from '@/components/logo';

const navLinks = [
  { href: '/products?audience=women', label: 'Women' },
  { href: '/products?audience=men', label: 'Men' },
  { href: '/products?audience=children', label: 'Children' },
  { href: '/products', label: 'All products' },
  { href: '/#about', label: 'About us' },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50">
      <nav
        className={cn(
          'border-b-2 border-border bg-background',
          scrolled && 'shadow-md',
        )}
        aria-label="Main navigation"
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <LogoLink priority className="min-w-0 shrink" />


            <div className="hidden  md:block">
            <ul className="flex flex-wrap items-center justify-center gap-2">
              {navLinks.map(link => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="inline-block rounded-md px-4 py-2.5 text-lg font-semibold text-foreground hover:bg-secondary hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
            <div className="hidden items-center gap-2 md:flex">
              <a
                href="tel:+919000000000"
                className="tap-target inline-flex items-center gap-2 rounded-md border-2 border-border px-4 py-2 text-base font-semibold text-foreground hover:bg-secondary"
              >
                <Phone size={20} strokeWidth={2} aria-hidden />
                Call us
              </a>
              <button
                type="button"
                className="tap-target inline-flex items-center justify-center rounded-md border-2 border-border px-4 py-2 text-foreground hover:bg-secondary"
                aria-label="Search products"
              >
                <Search size={22} strokeWidth={2} />
              </button>
              <button
                type="button"
                className="tap-target relative inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
                aria-label="Shopping bag, 0 items"
              >
                <ShoppingBag size={22} strokeWidth={2} />
                <span className="ml-2 hidden text-base font-bold sm:inline">Bag (0)</span>
              </button>
            </div>

            <button
              type="button"
              className="tap-target inline-flex items-center gap-2 rounded-md border-2 border-foreground px-3 py-2 text-base font-semibold md:hidden sm:px-4"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              Menu
            </button>
          </div>

       
        </div>

        {mobileOpen && (
          <div id="mobile-menu" className="border-t-2 border-border bg-background px-4 py-4 md:hidden">
            <ul className="flex flex-col gap-2">
              {navLinks.map(link => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-md border-2 border-transparent px-4 py-3.5 text-lg font-semibold text-foreground hover:border-border hover:bg-secondary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-col gap-2 border-t-2 border-border pt-4">
              <a
                href="tel:+919000000000"
                className="tap-target flex items-center justify-center gap-2 rounded-md bg-secondary py-3.5 text-lg font-semibold"
              >
                <Phone size={22} />
                Call us for help
              </a>
              <button
                type="button"
                className="tap-target flex items-center justify-center gap-2 rounded-md bg-primary py-3.5 text-lg font-bold text-primary-foreground"
              >
                <ShoppingBag size={22} />
                View shopping bag (0)
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
