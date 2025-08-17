import Link from 'next/link';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { sampleProducts } from '@/lib/sample-data';

const uniqueCategories = [
    ...new Set(sampleProducts.map(p => p.category))
];

const categoryData = uniqueCategories.map(category => {
    let imageUrl = 'https://placehold.co/100x100.png';
    const productInCategory = sampleProducts.find(p => p.category === category);
    if(productInCategory) {
        imageUrl = productInCategory.imageUrl;
    }
    
    return {
        name: category,
        imageUrl: imageUrl,
        aiHint: category,
    };
});

export default function CategoryShowcase() {
  return (
    <div className="bg-background">
        <div className="container mx-auto py-8">
             <Carousel
                opts={{
                    align: "start",
                    dragFree: true,
                }}
                className="w-full"
            >
                <CarouselContent className="-ml-2 md:-ml-4">
                    {categoryData.map((category, index) => (
                    <CarouselItem key={index} className="basis-1/4 sm:basis-1/6 md:basis-1/8 lg:basis-[10%] pl-2 md:pl-4">
                        <Link href={`/products?category=${encodeURIComponent(category.name)}`} className="group flex flex-col items-center justify-start gap-2 text-center h-full">
                            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-secondary overflow-hidden border-2 border-transparent group-hover:border-primary transition-all duration-300 transform group-hover:scale-105 flex-shrink-0">
                                <Image
                                    src={category.imageUrl}
                                    alt={category.name}
                                    data-ai-hint={category.aiHint}
                                    width={100}
                                    height={100}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            <span className="text-sm font-medium text-foreground leading-tight">{category.name}</span>
                        </Link>
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
