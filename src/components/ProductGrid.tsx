"use client";

import { useState, useEffect, useMemo } from 'react';
import type { Product } from '@/lib/types';
import ProductCard from './ProductCard';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ProductGridProps {
  initialProducts: Product[];
  categories: string[];
  initialCategory?: string;
}

export default function ProductGrid({ initialProducts, categories, initialCategory }: ProductGridProps) {
  const [products, setProducts] = useState(initialProducts);
  const [category, setCategory] = useState(initialCategory || 'all');
  const [sort, setSort] = useState('relevance');
  
  // Update products when initialProducts prop changes
  useEffect(() => {
    setProducts(initialProducts);
  }, [initialProducts]);


  const filteredAndSortedProducts = useMemo(() => {
    let newProducts = [...products];

    if (category !== 'all') {
      newProducts = newProducts.filter(p => p.category === category);
    }
    
    switch (sort) {
      case 'price-asc':
        newProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        newProducts.sort((a, b) => b.price - a.price);
        break;
      case 'rating-desc':
        newProducts.sort((a, b) => b.rating - a.rating);
        break;
      case 'relevance':
        const initialOrder = initialProducts.map(p => p.id);
         newProducts = products.filter(p => initialOrder.includes(p.id));
        newProducts.sort((a,b) => initialOrder.indexOf(a.id) - initialOrder.indexOf(b.id));
        break;
    }

    return newProducts;
  }, [category, sort, products, initialProducts]);

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold font-headline">
          {category === 'all' ? 'All Products' : category}
        </h1>
        <div className="flex gap-4 w-full sm:w-auto">
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map(cat => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Relevance</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="rating-desc">Rating</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      {filteredAndSortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredAndSortedProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-xl text-muted-foreground">No products found.</p>
        </div>
      )}
    </div>
  );
}

    