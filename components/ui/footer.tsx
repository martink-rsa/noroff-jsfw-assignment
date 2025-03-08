'use client';

import Link from 'next/link';

import { Facebook, Instagram } from 'lucide-react';

import { Button } from './button';
import { Input } from './input';

export function Footer() {
  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-playfair text-xl mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a
                href="https://instagram.com/luxur"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-400 transition-colors"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a
                href="https://facebook.com/luxur"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-400 transition-colors"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a
                href="https://tiktok.com/@luxur"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-400 transition-colors"
              >
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-playfair text-xl mb-4">Company</h3>
            <ul className="space-y-2 font-montserrat text-sm">
              <li>
                <Link href="/privacy" className="hover:text-gray-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-gray-400 transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-gray-400 transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-gray-400 transition-colors">
                  Join Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-playfair text-xl mb-4">Newsletter</h3>
            <p className="font-montserrat text-sm mb-4">
              Subscribe to receive updates about new arrivals and special offers.
            </p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/20 text-center font-montserrat text-sm">
          <p>&copy; {new Date().getFullYear()} Luxur. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
