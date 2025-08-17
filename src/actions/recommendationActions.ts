"use server";

import { personalizedProductRecommendations } from "@/ai/flows/product-recommendations";
import { getSaleItems, getTrendingProducts } from "@/lib/products";

export async function getRecommendations() {
  try {
    // In a real app, user history would be fetched from a database based on the logged-in user.
    // For this demo, we'll use a hardcoded example.
    const userHistory = "The user has viewed products in the following categories: Electronics, Fashion. The user has viewed products from the following brands: Samsung, Levi's.";

    const trending = await getTrendingProducts();
    const onSale = await getSaleItems();
    
    const trendingProducts = trending.map(p => p.name).join(', ');
    const saleItems = onSale.map(p => p.name).join(', ');

    const result = await personalizedProductRecommendations({
      userHistory,
      trendingProducts,
      saleItems,
    });
    
    // The AI returns a single string of comma-separated product names.
    const recommendedNames = result.recommendations.split(',').map(name => name.trim());
    
    return { success: true, data: recommendedNames };

  } catch (error) {
    console.error("Error getting recommendations:", error);
    return { success: false, error: "Failed to fetch recommendations." };
  }
}
