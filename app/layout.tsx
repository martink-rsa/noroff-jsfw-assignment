import type { Metadata } from 'next';
import { Montserrat, Playfair_Display } from 'next/font/google';

import { Footer } from '@/components/ui/footer';
import { Header } from '@/components/ui/header';
import { Toaster } from '@/components/ui/toaster';

import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
});

export const metadata: Metadata = {
  title: 'Luxur | High-End Luxury Store',
  description: "Discover exclusive luxury items at Luxur, New York's premier luxury store.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${montserrat.variable} font-sans min-h-screen flex flex-col`}>
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
