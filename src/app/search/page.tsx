import ProductGrid from '@/components/ProductGrid';
import { getProductsByNames, getProducts } from '@/lib/products';
import { searchProducts } from '@/ai/flows/search-flow';
import { getAllCategories } from '@/lib/products';
import { Suspense } from 'react';

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const query = searchParams?.q;
  const categories = await getAllCategories();
  let allProducts = await getProducts();
  let searchResultProducts: any[] = [];

  if (typeof query === 'string' && query.trim() !== '') {
    const searchResult = await searchProducts({ query });

    if (searchResult.products) {
      const productNames = searchResult.products
        .split(',')
        .map((name) => name.trim());
      searchResultProducts = await getProductsByNames(productNames);
    }
    
    // Fallback to simple text search if AI search returns no products.
    if (searchResultProducts.length === 0) {
      const lowerCaseQuery = query.toLowerCase();
      searchResultProducts = allProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(lowerCaseQuery) ||
          product.description.toLowerCase().includes(lowerCaseQuery) ||
          product.category.toLowerCase().includes(lowerCaseQuery) ||
          product.brand.toLowerCase().includes(lowerCaseQuery)
      );
    }
  } else {
    // If no query, show all products
    searchResultProducts = allProducts;
  }

  return (
    <div className="container mx-auto py-8">
      {searchResultProducts.length > 0 ? (
        <Suspense fallback={<div>Loading...</div>}>
          <ProductGrid
            initialProducts={searchResultProducts}
            categories={categories}
            initialCategory="all"
          />
        </Suspense>
      ) : (
        <div className="text-center py-16">
          <h2 className="text-2xl font-semibold mb-4">No Products Found</h2>
          <p className="text-muted-foreground">We couldn't find any products matching your search for "{query}".</p>
        </div>
      )}
    </div>
  );
}
