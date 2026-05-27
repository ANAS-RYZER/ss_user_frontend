import { Navbar } from '@/components/navbar';
import { ProductGrid } from '@/components/product-grid';
import { Footer } from '@/components/footer';
import Carousel from "@/components/Carousel";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Carousel />
      <ProductGrid />
      <Footer />
    </main>
  );
}