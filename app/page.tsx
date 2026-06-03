import { Navbar } from '@/components/navbar';
import { ProductGridSection } from '@/components/product-grid-section';
import { Footer } from '@/components/footer';
import Carousel from '@/components/Carousel';
import { CategoryShowcase } from '@/components/category-showcase';
import { FeaturesStrip } from '@/components/features-strip';
import { AboutSection } from '@/components/about-section';
import { NewsletterSection } from '@/components/newsletter-section';

export default function Home() {
  return (
    <main id="main-content" className="min-h-screen bg-background">
      <Navbar />
      <Carousel />
      {/* <FeaturesStrip /> */}
      <CategoryShowcase />
      <ProductGridSection />
      <AboutSection />
      <NewsletterSection />
      <Footer />
    </main>
  );
}
