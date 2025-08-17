"use client";

import Link from "next/link";
import { User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import SearchBar from "./SearchBar";
import CartButton from "./CartButton";

export default function Header() {
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/admin", label: "Admin" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="h-6 w-6">
                <circle cx="128" cy="128" r="96" fill="#fec007" />
                <path d="M152 88a24 24 0 0 0-44.13 10.82A24 24 0 1 0 152 88z" fill="#000" />
            </svg>
            <span className="hidden font-bold sm:inline-block text-primary">Personalized Noon</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="transition-colors text-foreground/80 hover:text-foreground">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
           <div className="w-full flex-1 md:w-auto md:flex-none">
            <SearchBar />
          </div>
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle>
                    <Link href="/" className="flex items-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="h-6 w-6">
                           <circle cx="128" cy="128" r="96" fill="#fec007" />
                           <path d="M152 88a24 24 0 0 0-44.13 10.82A24 24 0 1 0 152 88z" fill="#000" />
                        </svg>
                        <span className="font-bold text-primary">Personalized Noon</span>
                    </Link>
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-4 mt-8">
                  {navLinks.map((link) => (
                    <Link key={link.href} href={link.href} className="text-lg font-medium transition-colors hover:text-foreground/80">
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          <nav className="flex items-center">
            <CartButton />
            <Link href="/login">
                <Button variant="ghost" size="icon" aria-label="User Account">
                    <User className="h-5 w-5" />
                </Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
