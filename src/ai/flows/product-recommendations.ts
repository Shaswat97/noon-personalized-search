'use server';

/**
 * @fileOverview Product recommendation AI agent.
 *
 * - personalizedProductRecommendations - A function that handles the product recommendation process.
 * - PersonalizedProductRecommendationsInput - The input type for the personalizedProductRecommendations function.
 * - PersonalizedProductRecommendationsOutput - The return type for the personalizedProductRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedProductRecommendationsInputSchema = z.object({
  userHistory: z
    .string()
    .describe(
      `A string containing the user's history of viewed product categories and brands.  Example: "The user has viewed products in the following categories: Electronics, Fashion. The user has viewed products from the following brands: Samsung, Adidas."`
    ),
  trendingProducts: z.string().describe('A list of trending products.'),
  saleItems: z.string().describe('A list of products currently on sale.'),
});
export type PersonalizedProductRecommendationsInput = z.infer<
  typeof PersonalizedProductRecommendationsInputSchema
>;

const PersonalizedProductRecommendationsOutputSchema = z.object({
  recommendations: z
    .string()
    .describe(
      'A list of personalized product recommendations based on the user history, trending products and sale items.'
    ),
});
export type PersonalizedProductRecommendationsOutput = z.infer<
  typeof PersonalizedProductRecommendationsOutputSchema
>;

export async function personalizedProductRecommendations(
  input: PersonalizedProductRecommendationsInput
): Promise<PersonalizedProductRecommendationsOutput> {
  return personalizedProductRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedProductRecommendationsPrompt',
  input: {schema: PersonalizedProductRecommendationsInputSchema},
  output: {schema: PersonalizedProductRecommendationsOutputSchema},
  prompt: `You are an expert e-commerce product recommender.

You will use this information about the user's history, the current trending products, and sale items to generate a list of personalized product recommendations.

User History: {{{userHistory}}}
Trending Products: {{{trendingProducts}}}
Sale Items: {{{saleItems}}}

Based on this information, what products would you recommend? Be as specific as possible.
`,
});

const personalizedProductRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedProductRecommendationsFlow',
    inputSchema: PersonalizedProductRecommendationsInputSchema,
    outputSchema: PersonalizedProductRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
