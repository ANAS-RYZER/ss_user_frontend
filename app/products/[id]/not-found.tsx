import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';

export default function ProductNotFound() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-24 text-center">
        <h1 className="font-display text-3xl text-foreground">Product not found</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          This item may have been removed or the link is incorrect.
        </p>
        <Button asChild className="mt-8 rounded-md">
          <Link href="/#collections">Browse collections</Link>
        </Button>
      </div>
      <Footer />
    </main>
  );
}
