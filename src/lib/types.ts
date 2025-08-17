export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string; // Changed to string to allow more flexibility
  brand: string;
  imageUrl: string;
  attributes: Record<string, string>;
  rating: number;
  stockCount: number;
  tags?: string[];
}

export interface CartItem extends Product {
  quantity: number;
}
