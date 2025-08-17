import Hero from '@/components/Hero';
import ProductCarousel from '@/components/ProductCarousel';
import RecommendedProducts from '@/components/RecommendedProducts';
import CategoryLinks from '@/components/CategoryLinks';
import { getTrendingProducts } from '@/lib/products';
import CategoryShowcase from '@/components/CategoryShowcase';

export default async function HomePage() {
  const trendingProducts = await getTrendingProducts();

  return (
    <div>
      <Hero />
      <CategoryShowcase />
      <ProductCarousel title="Trending Now" products={trendingProducts} />
      <RecommendedProducts />
    </div>
  );
}
