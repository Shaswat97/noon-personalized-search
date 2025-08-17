import { getProducts, getAllCategories } from '@/lib/products';
import ProductGrid from '@/components/ProductGrid';
import { Suspense } from 'react';

export default async function ProductsPage({ searchParams }: { searchParams: { category?: string } }) {
  const products = await getProducts();
  const categories = await getAllCategories();
  const initialCategory = searchParams.category;

  return (
      <Suspense fallback={<div>Loading...</div>}>
        <ProductGrid 
          initialProducts={products} 
          categories={categories} 
          initialCategory={initialCategory} 
        />
      </Suspense>
  );
}
