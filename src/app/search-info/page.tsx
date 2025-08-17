import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Search, Bot, User, ShoppingCart, Cpu, Tags, Clock, MapPin, MessageSquare, AlertTriangle, SearchCheck, TrendingUp, Sparkles, Filter, Smile, Repeat } from 'lucide-react';
import Link from 'next/link';

export default function SearchInfoPage() {
  return (
    <div className="container mx-auto max-w-4xl py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary mb-4">
          Smarter Search, Powered by AI
        </h1>
        <p className="text-xl text-muted-foreground">
          Discover how our intelligent search engine understands you to find the perfect products.
        </p>
      </div>

      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <Sparkles className="w-8 h-8 text-accent" />
              <span>The Benefits of Personalized Search</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-lg">
              <ul className="space-y-4 text-muted-foreground">
                <li className="flex items-start gap-4">
                  <Smile className="w-6 h-6 text-accent mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-foreground">Improved User Experience:</span> It makes shopping feel like a conversation with a knowledgeable assistant, understanding your intent and context rather than just matching keywords.
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <TrendingUp className="w-6 h-6 text-accent mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-foreground">Higher Conversion Rates:</span> By showing more relevant products, you're more likely to find what you're looking for and make a purchase.
                  </div>
                </li>
                 <li className="flex items-start gap-4">
                  <ShoppingCart className="w-6 h-6 text-accent mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-foreground">Increased Basket Size:</span> The AI can suggest related items and complementary products, encouraging you to discover and buy more.
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <Filter className="w-6 h-6 text-accent mt-1 flex-shrink-0" />
                   <div>
                    <span className="font-semibold text-foreground">Reduced Friction:</span> It helps you find products even with vague, misspelled, or complex queries, reducing frustration and abandonment.
                  </div>
                </li>
                 <li className="flex items-start gap-4">
                  <SearchCheck className="w-6 h-6 text-accent mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-foreground">Enhanced Product Discovery:</span> The system can surface niche or "long-tail" products that you might not have found with a simple search.
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <Repeat className="w-6 h-6 text-accent mt-1 flex-shrink-0" />
                   <div>
                    <span className="font-semibold text-foreground">Loyalty and Engagement:</span> A search experience that feels intuitive and helpful encourages you to return, boosting brand loyalty.
                  </div>
                </li>
              </ul>
              <p className="!mt-8 text-sm italic text-muted-foreground">*Note: This summary of business benefits is for informational purposes and would not typically be displayed on a public-facing production site. The user journey examples below illustrate the customer-facing experience.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <User className="w-8 h-8 text-accent" />
              <span>The User Journey: Examples</span>
            </CardTitle>
            <CardDescription>See how your needs are translated into results.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-12">
            
            {/* Example 1: Long-Tail Search */}
            <div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                    <SearchCheck className="w-6 h-6 text-secondary-foreground" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Example 1: The "Long Tail" and Niche Search</h3>
                  <p className="text-muted-foreground">You have a very specific need and search for <span className="font-mono bg-muted p-1 rounded-md text-foreground">"a green yoga mat with a good grip"</span>.</p>
                </div>
              </div>
              <div className="mt-4 pl-16 grid gap-6">
                <div className="flex items-start gap-4">
                  <Bot className="w-6 h-6 text-muted-foreground mt-1" />
                  <div>
                    <h4 className="font-semibold">AI Understanding</h4>
                    <p className="text-muted-foreground">The AI parses multiple specific attributes simultaneously: "green," "yoga mat," and "good grip," and links them to product descriptions and tags.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <ShoppingCart className="w-6 h-6 text-muted-foreground mt-1" />
                  <div>
                    <h4 className="font-semibold">Product Discovery</h4>
                    <p className="text-muted-foreground">The search results show you the "Premium Yoga Mat", which is available in "Forest Green" and has "Excellent" grip mentioned in its description.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Cpu className="w-6 h-6 text-muted-foreground mt-1" />
                  <div>
                    <h4 className="font-semibold">How it Works</h4>
                    <p className="text-muted-foreground">The AI flow <code className="font-mono text-sm bg-muted p-1 rounded-md">searchProducts</code> is triggered. Your query is passed to the Gemini model along with the entire product catalog. The model performs a semantic search, comparing the meaning of your query against the descriptions, categories, and tags of all products to find the best conceptual matches and returns a list of product names.</p>
                    <p className="text-xs italic text-muted-foreground mt-2">* Note: Not displayed on Production</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Example 2: Ambiguous/Misspelled Search */}
            <div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-secondary-foreground" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Example 2: The Ambiguous or Misspelled Search</h3>
                  <p className="text-muted-foreground">You're in a hurry and search for <span className="font-mono bg-muted p-1 rounded-md text-foreground">"nkie shose"</span>.</p>
                </div>
              </div>
              <div className="mt-4 pl-16 grid gap-6">
                 <div className="flex items-start gap-4">
                  <Bot className="w-6 h-6 text-muted-foreground mt-1" />
                  <div>
                    <h4 className="font-semibold">AI Understanding</h4>
                    <p className="text-muted-foreground">The model recognizes the likely misspelling of "Nike shoes" and processes the search for the corrected term.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <ShoppingCart className="w-6 h-6 text-muted-foreground mt-1" />
                  <div>
                    <h4 className="font-semibold">Product Discovery</h4>
                    <p className="text-muted-foreground">Instead of showing "no results," you see a list of Nike running shoes, like the "React Infinity Run."</p>
                  </div>
                </div>
                 <div className="flex items-start gap-4">
                  <Cpu className="w-6 h-6 text-muted-foreground mt-1" />
                  <div>
                    <h4 className="font-semibold">How it Works</h4>
                    <p className="text-muted-foreground">Even before searching the catalog, the AI model is trained to handle common misspellings and understands brand names. It corrects the query internally before attempting to find product matches, ensuring a more resilient search experience.</p>
                    <p className="text-xs italic text-muted-foreground mt-2">* Note: Not displayed on Production</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Example 3: Contextual Search */}
            <div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                    <Clock className="w-6 h-6 text-secondary-foreground" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Example 3: The Contextual and Temporal Search</h3>
                  <p className="text-muted-foreground">You need a gift and search for <span className="font-mono bg-muted p-1 rounded-md text-foreground">"what should I get for my friend's birthday?"</span>.</p>
                </div>
              </div>
              <div className="mt-4 pl-16 grid gap-6">
                 <div className="flex items-start gap-4">
                  <Bot className="w-6 h-6 text-muted-foreground mt-1" />
                  <div>
                    <h4 className="font-semibold">AI Understanding</h4>
                    <p className="text-muted-foreground">The model identifies the intent is to find a "gift." It looks for products with the 'gift' tag in our catalog.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <ShoppingCart className="w-6 h-6 text-muted-foreground mt-1" />
                  <div>
                    <h4 className="font-semibold">Product Discovery</h4>
                    <p className="text-muted-foreground">You are shown a variety of products that make great gifts, like the "Velvet Plush Throw," "SilentStorm Gaming Headset," or a "High-End Perfume," all of which are tagged as suitable gifts.</p>
                  </div>
                </div>
                 <div className="flex items-start gap-4">
                  <Cpu className="w-6 h-6 text-muted-foreground mt-1" />
                  <div>
                    <h4 className="font-semibold">How it Works</h4>
                    <p className="text-muted-foreground">The AI model has been prompted to understand not just keywords, but the user's intent. When it sees "birthday," it associates the query with the concept of "gifting." The model then searches the product catalog for items explicitly tagged with 'gift' to provide relevant suggestions.</p>
                    <p className="text-xs italic text-muted-foreground mt-2">* Note: Not displayed on Production</p>
                  </div>
                </div>
              </div>
            </div>

             {/* Example 4: Follow-up and Evolving Search */}
            <div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                    <Repeat className="w-6 h-6 text-secondary-foreground" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Example 4: The Evolving Search</h3>
                  <p className="text-muted-foreground">You search for <span className="font-mono bg-muted p-1 rounded-md text-foreground">"premium running shoes"</span> and then search for <span className="font-mono bg-muted p-1 rounded-md text-foreground">"sports socks"</span>.</p>
                </div>
              </div>
              <div className="mt-4 pl-16 grid gap-6">
                 <div className="flex items-start gap-4">
                  <Bot className="w-6 h-6 text-muted-foreground mt-1" />
                  <div>
                    <h4 className="font-semibold">AI Understanding</h4>
                    <p className="text-muted-foreground">The AI can use your recent search history as context. It understands you're interested in premium gear and prioritizes high-performance socks.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <ShoppingCart className="w-6 h-6 text-muted-foreground mt-1" />
                  <div>
                    <h4 className="font-semibold">Product Discovery</h4>
                    <p className="text-muted-foreground">You're shown "Premium Sports Socks" instead of basic cotton socks, as the system has inferred your preference for quality.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Cpu className="w-6 h-6 text-muted-foreground mt-1" />
                  <div>
                    <h4 className="font-semibold">How it Works</h4>
                    <p className="text-muted-foreground">While not implemented in this demo, a full system would store anonymized search history. The <code className="font-mono text-sm bg-muted p-1 rounded-md">searchProducts</code> flow could be enhanced to accept a user's recent search terms or viewed products, providing valuable context to the AI model for more relevant results in subsequent searches.</p>
                    <p className="text-xs italic text-muted-foreground mt-2">* Note: Not displayed on Production</p>
                  </div>
                </div>
              </div>
            </div>

          </CardContent>
        </Card>

         <Card className="bg-accent text-accent-foreground border-none">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Ready to try it?</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="mb-4">
              Go ahead, give it a try! Use the search bar at the top of the page.
            </p>
            <Link href="/" className="inline-block px-6 py-2 rounded-md bg-accent-foreground text-accent font-semibold hover:opacity-90">
              Back to Home
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

    