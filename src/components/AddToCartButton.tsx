"use client";

import { useCart } from "@/hooks/useCart";
import { useToast } from "@/hooks/use-toast";
import type { Product } from "@/lib/types";
import { Button, type ButtonProps } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

interface AddToCartButtonProps extends ButtonProps {
  product: Product;
}

export default function AddToCartButton({ product, ...props }: AddToCartButtonProps) {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addToCart(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
      action: (
        <a href="/cart">
          <Button variant="outline" size="sm">
            View Cart
          </Button>
        </a>
      ),
    });
  };

  return (
    <Button onClick={handleAddToCart} {...props}>
      <ShoppingCart className="mr-2 h-4 w-4" />
      Add to Cart
    </Button>
  );
}
