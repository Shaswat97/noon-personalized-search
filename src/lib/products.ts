import { sampleProducts } from '@/lib/sample-data';
import type { Product } from '@/lib/types';

// In a real app, you'd fetch this from a database like Firestore.
// For this demo, we're using a static sample data file.

export async function getProducts(options?: { category?: string; sort?: string }): Promise<Product[]> {
  let products = [...sampleProducts];

  if (options?.category) {
    products = products.filter(p => p.category === options.category);
  }

  if (options?.sort) {
    switch (options.sort) {
      case 'price-asc':
        products.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        products.sort((a, b) => b.price - a.price);
        break;
      case 'rating-desc':
        products.sort((a, b) => b.rating - a.rating);
        break;
    }
  }
  
  return Promise.resolve(products);
}

export async function getProduct(id: string): Promise<Product | undefined> {
  return Promise.resolve(sampleProducts.find(p => p.id === id));
}

export async function getProductsByNames(names: string[]): Promise<Product[]> {
    const lowerCaseNames = names.map(name => name.toLowerCase().trim());
    return Promise.resolve(sampleProducts.filter(p => lowerCaseNames.includes(p.name.toLowerCase())));
}

export async function getTrendingProducts(): Promise<Product[]> {
  // Simulate fetching trending products (e.g., highest rated)
  const sorted = [...sampleProducts].sort((a, b) => b.rating - a.rating);
  return Promise.resolve(sorted.slice(0, 10));
}

export async function getSaleItems(): Promise<Product[]> {
    // Simulate fetching sale items
    return Promise.resolve(sampleProducts.filter(p => p.tags?.includes('sale')));
}

export async function getAllCategories(): Promise<string[]> {
    const categories = new Set(sampleProducts.map(p => p.category));
    return Promise.resolve(Array.from(categories));
}
