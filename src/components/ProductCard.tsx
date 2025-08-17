import Link from "next/link";
import { Star } from "lucide-react";
import type { Product } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AddToCartButton from "./AddToCartButton";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const aiHint = product.tags ? product.tags.slice(0, 2).join(' ') : product.name;

  return (
    <Card className="w-full h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg">
      <CardHeader className="p-0 border-b relative">
        <Link href={`/products/${product.id}`} className="block">
          <div className="aspect-square overflow-hidden">
            <Image
              src={product.imageUrl}
              alt={product.name}
              data-ai-hint={aiHint}
              width={400}
              height={400}
              className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
            />
          </div>
        </Link>
        {product.tags?.includes('new-arrival') && 
          <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground">NEW</Badge>
        }
        {product.tags?.includes('sale') && 
          <Badge variant="destructive" className="absolute top-2 right-2">SALE</Badge>
        }
      </CardHeader>
      <CardContent className="p-4 flex flex-col flex-grow">
        <div className="flex-grow">
          <p className="text-sm text-muted-foreground">{product.category}</p>
          <CardTitle className="text-lg font-medium leading-tight mt-1">
            <Link href={`/products/${product.id}`} className="hover:text-primary transition-colors">
              {product.name}
            </Link>
          </CardTitle>
          <div className="flex items-center mt-2">
            <div className="flex items-center text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i < Math.round(product.rating) ? "fill-current" : "text-muted-foreground"}`}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground ml-2">({product.rating})</span>
          </div>
        </div>
        <div className="flex items-end justify-between mt-4">
          <p className="text-2xl font-bold text-primary">${product.price.toFixed(2)}</p>
          <AddToCartButton product={product} size="sm" />
        </div>
      </CardContent>
    </Card>
  );
}
