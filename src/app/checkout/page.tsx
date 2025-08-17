import CheckoutForm from '@/components/CheckoutForm';

export default function CheckoutPage() {
  return (
    <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold font-headline mb-8 text-center">Checkout</h1>
        <CheckoutForm />
    </div>
  );
}
