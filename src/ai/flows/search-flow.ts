'use server';
/**
 * @fileOverview A product search AI agent.
 *
 * - searchProducts - A function that handles the product search process.
 * - SearchProductsInput - The input type for the searchProducts function.
 * - SearchProductsOutput - The return type for the searchProducts function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { sampleProducts } from '@/lib/sample-data';

const SearchProductsInputSchema = z.object({
  query: z
    .string()
    .describe(
      'The user search query. This can be a natural language query.'
    ),
});
export type SearchProductsInput = z.infer<typeof SearchProductsInputSchema>;

const SearchProductsOutputSchema = z.object({
  products: z
    .string()
    .nullable()
    .optional()
    .describe(
      'A comma-separated list of product names that best match the search query. Only include products.'
    ),
});
export type SearchProductsOutput = z.infer<typeof SearchProductsOutputSchema>;

export async function searchProducts(
  input: SearchProductsInput
): Promise<SearchProductsOutput> {
  return searchProductsFlow(input);
}

const productCatalog = sampleProducts
  .map(
    (p) =>
      `ID: ${p.id}, Name: ${p.name}, Description: ${p.description}, Category: ${p.category}, Brand: ${p.brand}, Tags: ${p.tags?.join(', ')}`
  )
  .join('\n');

const prompt = ai.definePrompt({
  name: 'searchRouterPrompt',
  input: { schema: SearchProductsInputSchema },
  output: { schema: SearchProductsOutputSchema },
  prompt: `You are an expert e-commerce search engine. Your job is to find products in the catalog that best match the user's query.

User Query: {{{query}}}

Product Catalog:
${productCatalog}

- Based on the user's query, find the most relevant products from the catalog.
- Return a comma-separated list of product names.
- If no relevant products are found, return null for the products field.
- Handle misspellings gracefully. For example, "nkie shose" should be treated as a product search for "Nike shoes".`,
});


const searchProductsFlow = ai.defineFlow(
  {
    name: 'searchProductsFlow',
    inputSchema: SearchProductsInputSchema,
    outputSchema: SearchProductsOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    
    // Ensure the output is not null and has some value
    if (!output || !output.products) {
        // Fallback or default behavior if AI returns nothing
        return { products: null };
    }
    return output;
  }
);
