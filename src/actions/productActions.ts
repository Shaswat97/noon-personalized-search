"use server";

import { revalidatePath } from "next/cache";
import { sampleProducts } from "@/lib/sample-data";

// In a real app, these actions would interact with a database like Firestore.
// For this demo, we'll log to the console and simulate success.

export async function addProduct(productData: any) {
  try {
    console.log("Adding new product:", productData);
    // await db.collection('products').add(productData);
    
    revalidatePath("/admin");
    revalidatePath("/products");
    
    return { success: true, message: "Product added successfully!" };
  } catch (error) {
    console.error("Error adding product:", error);
    return { success: false, error: "Failed to add product." };
  }
}

export async function seedDatabase() {
    try {
        console.log(`Seeding database with ${sampleProducts.length} products...`);
        // const batch = db.batch();
        // sampleProducts.forEach(product => {
        //     const docRef = db.collection('products').doc(product.id);
        //     batch.set(docRef, product);
        // });
        // await batch.commit();

        console.log("Database seeded successfully!");
        revalidatePath("/products");
        return { success: true, message: `Successfully seeded ${sampleProducts.length} products.` };
    } catch (error) {
        console.error("Error seeding database:", error);
        return { success: false, error: "Failed to seed database." };
    }
}
