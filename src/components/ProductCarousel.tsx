import type { Product } from "@/lib/types";
import ProductCard from "./ProductCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface ProductCarouselProps {
  title: string;
  products: Product[];
}

export default function ProductCarousel({ title, products }: ProductCarouselProps) {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className="w-full py-12">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold font-headline mb-8">{title}</h2>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {products.map((product) => (
              <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                <div className="p-1 h-full">
                  <ProductCard product={product} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </div>
    </div>
  );
}
