"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Search, Info } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "./ui/button";
import Link from "next/link";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');

  // Update query state if the URL changes
  useEffect(() => {
    setQuery(searchParams.get('q') || '');
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    } else {
      router.push('/products');
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full md:w-80 lg:w-[500px]">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
      <Input
        type="search"
        placeholder="I'm looking for..."
        className="pl-10 pr-20 w-full h-10"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center">
         <Button type="submit" variant="ghost" size="icon" className="h-8 w-8" aria-label="Search">
            <Search className="h-5 w-5 text-muted-foreground" />
        </Button>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Info className="h-5 w-5 text-muted-foreground" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="grid gap-4">
              <h4 className="font-medium leading-none">AI-Powered Search</h4>
              <div className="text-sm text-muted-foreground">
                <p className="mb-2">Our smart search understands you. Try asking for things like:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>"a gift for my friend's birthday"</li>
                  <li>"something to help me fix a flat tyre"</li>
                  <li>"a light jacket for the mountains"</li>
                  <li>"show me some premium running shoes"</li>
                </ul>
              </div>
              <Link href="/search-info" className="text-sm font-medium text-primary hover:underline">
                  Learn more about how it works
              </Link>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </form>
  );
}

    