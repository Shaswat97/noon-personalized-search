import { getProduct } from '@/lib/products';
import { notFound } from 'next/navigation';
import { Star, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import AddToCartButton from '@/components/AddToCartButton';
import ProductCarousel from '@/components/ProductCarousel';
import { getTrendingProducts } from '@/lib/products';
import Image from 'next/image';

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);
  const relatedProducts = await getTrendingProducts();

  if (!product) {
    notFound();
  }

  const aiHint = product.tags ? product.tags.slice(0, 2).join(' ') : product.name;


  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
          <div className="w-full">
            <div className="aspect-square relative bg-secondary rounded-lg overflow-hidden">
                <Image
                    src={product.imageUrl}
                    alt={product.name}
                    data-ai-hint={aiHint}
                    fill
                    className="object-cover"
                />
            </div>
          </div>
          <div>
            <span className="text-sm font-medium text-primary">{product.category.toUpperCase()}</span>
            <h1 className="text-3xl md:text-4xl font-bold font-headline my-2">{product.name}</h1>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-5 h-5 ${i < Math.round(product.rating) ? "fill-current" : "text-muted"}`} />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">{product.rating} / 5.0</span>
            </div>
            <p className="text-4xl font-bold text-primary mb-4">${product.price.toFixed(2)}</p>
            <p className="text-muted-foreground mb-6">{product.description}</p>
            
            <div className="flex items-center gap-2 mb-6">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm font-semibold">{product.stockCount > 0 ? `${product.stockCount} in stock` : 'Out of stock'}</span>
            </div>
            
            <AddToCartButton product={product} size="lg" disabled={product.stockCount === 0} />
            
            <div className="mt-8">
                <h3 className="font-semibold text-lg mb-4">Specifications</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div><span className="font-medium text-muted-foreground">Brand:</span> {product.brand}</div>
                    {Object.entries(product.attributes).map(([key, value]) => (
                        <div key={key}><span className="font-medium text-muted-foreground capitalize">{key}:</span> {value}</div>
                    ))}
                </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-secondary">
        <ProductCarousel title="You Might Also Like" products={relatedProducts.filter(p => p.id !== product.id)} />
      </div>
    </div>
  );
}
