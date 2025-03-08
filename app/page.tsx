import { Metadata } from 'next';

import { AutumnSaleBanner } from '@/components/shop/autumn-sale-banner';
import { HeroSection } from '@/components/shop/hero-section';
import { ProductsSearch } from '@/components/shop/products-search';

import { getProducts } from '@/lib/api';

export const metadata: Metadata = {
  title: 'Luxury Store | Premium Products for Discerning Customers',
  description:
    'Discover our curated collection of luxury products. High-quality items for those who appreciate the finer things in life.',
  openGraph: {
    title: 'Luxury Store | Premium Products',
    description: 'Discover our curated collection of luxury products.',
    url: 'https://luxury-store.example.com',
    siteName: 'Luxury Store',
    type: 'website',
  },
};

export default async function Home() {
  try {
    const productsData = await getProducts();
    const products = productsData.data;

    return (
      <div className="min-h-screen bg-gray-50">
        <HeroSection />

        <section id="products" className="container mx-auto px-4 py-16">
          <ProductsSearch initialProducts={products} />
          {products.length >= 4 && <AutumnSaleBanner />}
        </section>
      </div>
    );
  } catch (error) {
    console.error('Error fetching products:', error);

    // Provide a fallback UI with empty products
    return (
      <div className="min-h-screen bg-gray-50">
        <HeroSection />

        <section id="products" className="container mx-auto px-4 py-16">
          <ProductsSearch initialProducts={[]} />
        </section>
      </div>
    );
  }
}
