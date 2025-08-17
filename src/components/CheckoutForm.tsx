"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import { Loader2, CheckCircle2 } from 'lucide-react';

export default function CheckoutForm() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // In a real app, you would process payment here.

    setIsLoading(false);
    setIsSuccess(true);
    clearCart();
    toast({
      title: 'Order Placed!',
      description: 'Thank you for your purchase.',
    });
  };

  if (isSuccess) {
    return (
        <Card className="w-full max-w-lg mx-auto">
            <CardHeader className="text-center">
                <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <CardTitle className="text-2xl">Order Successful!</CardTitle>
                <CardDescription>A confirmation email has been sent to you.</CardDescription>
            </CardHeader>
            <CardContent>
                <Button className="w-full" onClick={() => router.push('/products')}>Continue Shopping</Button>
            </CardContent>
        </Card>
    );
  }

  return (
    <div className="grid md:grid-cols-2 gap-12">
        <div>
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>Shipping Information</CardTitle>
                </CardHeader>
                <CardContent>
                    <form id="checkout-form" onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input id="name" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="address">Address</Label>
                            <Input id="address" required />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="city">City</Label>
                                <Input id="city" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="zip">ZIP Code</Label>
                                <Input id="zip" required />
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
        <div>
            <Card className="sticky top-24">
                <CardHeader>
                    <CardTitle>Your Order</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {cartItems.map(item => (
                            <div key={item.id} className="flex justify-between items-center text-sm">
                                <span>{item.name} x {item.quantity}</span>
                                <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        ))}
                    </div>
                    <div className="border-t my-4"></div>
                    <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span>${cartTotal.toFixed(2)}</span>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button type="submit" form="checkout-form" size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" disabled={isLoading}>
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Processing...
                            </>
                        ) : (
                            'Place Order'
                        )}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    </div>
  );
}
