import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Hero() {
  return (
    <div className="relative w-full h-[50vh] md:h-[60vh] bg-secondary">
      <Image
        src="https://placehold.co/1600x900.png"
        alt="E-commerce hero background"
        data-ai-hint="shopping fashion"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative container mx-auto flex flex-col items-center justify-center h-full text-center text-foreground z-10">
        <h1 className="text-4xl md:text-6xl font-headline font-bold mb-4 text-white drop-shadow-lg">
          Products Curated, Just for You
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mb-8 text-white/80 drop-shadow-md">
          Discover a personalized shopping experience. We bring you the best products tailored to your taste.
        </p>
        <Link href="/products">
          <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
            Shop Now
          </Button>
        </Link>
      </div>
    </div>
  );
}
