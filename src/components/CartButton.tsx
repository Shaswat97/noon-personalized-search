"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";

export default function CartButton() {
  const { itemCount } = useCart();

  return (
    <Link href="/cart">
      <Button variant="ghost" size="icon" aria-label="Shopping Cart">
        <div className="relative">
          <ShoppingCart className="h-5 w-5" />
          {itemCount > 0 && (
            <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
              {itemCount}
            </span>
          )}
        </div>
      </Button>
    </Link>
  );
}
