'use client';

import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12 md:mb-16">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-light tracking-widest mb-4">SAMBAVI</h3>
            <p className="text-sm font-light leading-relaxed text-background/80">
              Celebrating South Indian heritage through timeless traditional wear.
            </p>
          </div>

          {/* Collections */}
          <div>
            <h4 className="text-sm font-light tracking-widest uppercase mb-4">Collections</h4>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-sm font-light hover:opacity-60 transition-opacity">
                  Sarees
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm font-light hover:opacity-60 transition-opacity">
                  Kids Wear
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm font-light hover:opacity-60 transition-opacity">
                  Seasonal
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="text-sm font-light tracking-widest uppercase mb-4">Customer Care</h4>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-sm font-light hover:opacity-60 transition-opacity">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm font-light hover:opacity-60 transition-opacity">
                  Returns
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm font-light hover:opacity-60 transition-opacity">
                  Shipping Info
                </Link>
              </li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h4 className="text-sm font-light tracking-widest uppercase mb-4">Information</h4>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-sm font-light hover:opacity-60 transition-opacity">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm font-light hover:opacity-60 transition-opacity">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm font-light hover:opacity-60 transition-opacity">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 pt-8">
          <p className="text-xs font-light text-center text-background/70">
            © 2024 Sambavi Traditional Fashion. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
