import { getAllCategories } from '@/lib/products';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { sampleProducts } from '@/lib/sample-data';
import Image from 'next/image';

const uniqueCategories = [...new Set(sampleProducts.map(p => p.category))];

const categoryData = uniqueCategories.map(category => {
    const product = sampleProducts.find(p => p.category === category);
    return {
        name: category,
        imageUrl: product?.imageUrl || 'https://placehold.co/100x100.png',
        tags: product?.tags || []
    };
});

export default async function CategoryLinks() {

  return (
    <div className="py-12">
        <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold font-headline mb-8">Shop by Category</h2>
            <div className="flex flex-wrap justify-center gap-4">
                {categoryData.map(category => (
                    <Link key={category.name} href={`/products?category=${encodeURIComponent(category.name)}`} passHref>
                        <Button variant="outline" size="lg" className="text-base">
                            {category.name}
                        </Button>
                    </Link>
                ))}
            </div>
        </div>
    </div>
  );
}
