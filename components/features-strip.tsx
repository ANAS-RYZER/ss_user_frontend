import { Gem, Leaf, ShieldCheck, Truck } from 'lucide-react';

const features = [
  {
    icon: Gem,
    title: 'Authentic craftsmanship',
    description: 'Trusted weaves from South Indian artisans',
  },
  {
    icon: Truck,
    title: 'Delivery across India',
    description: 'Careful packing and tracked shipping',
  },
  {
    icon: ShieldCheck,
    title: 'Quality checked',
    description: 'Every item inspected before dispatch',
  },
  {
    icon: Leaf,
    title: 'Fine natural fabrics',
    description: 'Silk, cotton, and traditional motifs',
  },
];

export function FeaturesStrip() {
  return (
    <section className="border-y-2 border-border bg-secondary/50 py-10 md:py-14">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:gap-8 lg:px-8">
        {features.map(({ icon: Icon, title, description }) => (
          <div key={title} className="flex flex-col gap-3 sm:flex-row sm:items-start">
            <div className="flex size-14 shrink-0 items-center justify-center rounded-md border-2 border-border bg-background text-primary">
              <Icon size={28} strokeWidth={1.75} aria-hidden />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground">{title}</h3>
              <p className="mt-1 text-lg leading-relaxed text-muted-foreground">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
