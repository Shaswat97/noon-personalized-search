"use client";

import Link from "next/link";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, ShoppingBag } from "lucide-react";
import Image from "next/image";

export default function CartView() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, itemCount } = useCart();

  if (itemCount === 0) {
    return (
      <div className="text-center py-20">
        <ShoppingBag className="mx-auto h-24 w-24 text-muted-foreground" />
        <h2 className="mt-6 text-2xl font-semibold">Your cart is empty</h2>
        <p className="mt-2 text-muted-foreground">Looks like you haven't added anything to your cart yet.</p>
        <Button asChild className="mt-6">
          <Link href="/products">Start Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-3 gap-12">
      <div className="md:col-span-2">
        <h1 className="text-3xl font-bold font-headline mb-6">Your Cart ({itemCount} items)</h1>
        <div className="space-y-4">
          {cartItems.map(item => {
            const aiHint = item.tags ? item.tags.slice(0, 2).join(' ') : item.name;
            return (
              <div key={item.id} className="flex items-center gap-4 bg-card p-4 rounded-lg shadow-sm">
                <div className="w-24 h-24 relative bg-secondary rounded-md overflow-hidden flex-shrink-0">
                  <Image 
                    src={item.imageUrl} 
                    alt={item.name} 
                    data-ai-hint={aiHint}
                    fill 
                    className="object-cover" />
                </div>
                <div className="flex-grow">
                  <Link href={`/products/${item.id}`} className="font-semibold hover:text-primary">{item.name}</Link>
                  <p className="text-sm text-muted-foreground">{item.brand}</p>
                  <p className="text-lg font-bold text-primary mt-1">${item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                    className="w-16 h-10 text-center"
                  />
                  <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)}>
                    <Trash2 className="h-5 w-5 text-muted-foreground" />
                  </Button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      
      <div className="md:col-span-1">
        <div className="bg-card p-6 rounded-lg shadow-sm sticky top-24">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-2">
                <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-green-600">FREE</span>
                </div>
                <div className="border-t my-2"></div>
                <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${cartTotal.toFixed(2)}</span>
                </div>
            </div>
            <Button asChild size="lg" className="w-full mt-6 bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link href="/checkout">Proceed to Checkout</Link>
            </Button>
        </div>
      </div>
    </div>
  );
}
