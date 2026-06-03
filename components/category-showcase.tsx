import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { MediaImage } from '@/components/media-image';

const categories = [
  {
    title: 'Women',
    description: 'Sarees, half-sarees & festive silks',
    href: '/products?audience=women',
    src: '/images/categories/women.jpg',
    filename: 'public/images/categories/women.jpg',
  },
  {
    title: 'Men',
    description: 'Veshti, kurta sets & ceremonial wear',
    href: '/products?audience=men',
    src: '/images/categories/men.jpg',
    filename: 'public/images/categories/men.jpg',
  },
  {
    title: 'Children',
    description: 'Pattu pavadai, lehenga & little traditions',
    href: '/products?audience=children',
    src: '/images/categories/children.jpg',
    filename: 'public/images/categories/children.jpg',
  },
];

export function CategoryShowcase() {
  return (
    <section className="border-y border-border bg-card py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col items-center text-center md:mb-16">
          <h2 className="font-display text-3xl text-foreground sm:text-4xl md:text-5xl">
            Shop by category
          </h2>
          <p className="mt-3 text-lg text-muted-foreground">Women, men, and children</p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {categories.map(category => (
            <Link
              key={category.title}
              href={category.href}
              className="group relative block overflow-hidden rounded-sm bg-muted"
            >
              <div className="relative aspect-[4/5]">
                <MediaImage
                  src={category.src}
                  alt={category.title}
                  filename={category.filename}
                  placeholderLabel="Category image"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  imageClassName="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/75 via-foreground/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <h3 className="font-display text-3xl text-primary-foreground sm:text-4xl">
                        {category.title}
                      </h3>
                      <p className="mt-2 text-lg text-primary-foreground/90">{category.description}</p>
                    </div>
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-primary-foreground/30 bg-primary-foreground/10 text-primary-foreground backdrop-blur-sm transition group-hover:bg-primary-foreground group-hover:text-foreground">
                      <ArrowUpRight size={18} strokeWidth={1.5} />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
