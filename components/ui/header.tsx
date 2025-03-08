'use client';

import Link from 'next/link';

import { ShoppingCart } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from '@/components/ui/navigation-menu';

import { useAuthStore } from '@/lib/store';
import { useCartStore } from '@/lib/store';

export function Header() {
  const { user, isAuthenticated } = useAuthStore();
  const { items } = useCartStore();

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-2xl font-playfair font-bold">
          Luxur
        </Link>

        <NavigationMenu>
          <NavigationMenuList className="gap-6">
            <NavigationMenuItem>
              <Link href="/" className="text-sm font-montserrat">
                Products
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/about" className="text-sm font-montserrat">
                About
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/contact" className="text-sm font-montserrat">
                Contact Us
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-4">
          <Link href="/cart" className="relative">
            <ShoppingCart className="h-6 w-6" />
            {items.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {items.length}
              </span>
            )}
          </Link>

          {isAuthenticated ? (
            <Link href="/dashboard">
              <Avatar>
                {user?.avatar?.url ? (
                  <AvatarImage src={user.avatar.url} alt={user.name || 'User avatar'} />
                ) : (
                  <AvatarFallback>{user?.name?.[0] || 'U'}</AvatarFallback>
                )}
              </Avatar>
            </Link>
          ) : (
            <div className="flex gap-2">
              <Button variant="outline" asChild>
                <Link href="/auth/login">Login</Link>
              </Button>
              <Button asChild>
                <Link href="/auth/register">Register</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
