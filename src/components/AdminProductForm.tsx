"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { addProduct, seedDatabase } from '@/actions/productActions';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const productSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  price: z.coerce.number().positive('Price must be a positive number'),
  category: z.string().min(1, 'Category is required'),
  brand: z.string().min(1, 'Brand is required'),
  imageUrl: z.string().url('Must be a valid URL'),
  stockCount: z.coerce.number().int().min(0, 'Stock count cannot be negative'),
});

export default function AdminProductForm() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      category: '',
      brand: '',
      imageUrl: '',
      stockCount: 0,
    },
  });

  async function onSubmit(values: z.infer<typeof productSchema>) {
    const result = await addProduct(values);
    if (result.success) {
      toast({ title: 'Success', description: result.message });
      form.reset();
    } else {
      toast({ title: 'Error', description: result.error, variant: 'destructive' });
    }
  }

  async function handleSeed() {
    const result = await seedDatabase();
    if (result.success) {
        toast({ title: 'Database Seeded', description: result.message });
    } else {
        toast({ title: 'Error Seeding', description: result.error, variant: 'destructive' });
    }
  }

  return (
    <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle>Add New Product</CardTitle>
                    <CardDescription>Fill out the form to add a new product to the catalog.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Product Name</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g., Galaxy S25" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Product description..." {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="price"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Price</FormLabel>
                                    <FormControl>
                                    <Input type="number" step="0.01" placeholder="99.99" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="stockCount"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Stock Count</FormLabel>
                                    <FormControl>
                                    <Input type="number" placeholder="100" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="category"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <FormControl>
                                    <Input placeholder="Electronics" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name="brand"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Brand</FormLabel>
                                    <FormControl>
                                    <Input placeholder="Samsung" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="imageUrl"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Image URL</FormLabel>
                                <FormControl>
                                <Input placeholder="https://placehold.co/600x600.png" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <Button type="submit" disabled={form.formState.isSubmitting}>
                            {form.formState.isSubmitting ? 'Adding...' : 'Add Product'}
                        </Button>
                    </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Database Tools</CardTitle>
                    <CardDescription>Use these actions to manage the store's data.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-sm mb-4">Populate the database with the initial set of 20 sample products. This is useful for development and testing.</p>
                    <Button variant="outline" onClick={handleSeed}>Seed Database</Button>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
