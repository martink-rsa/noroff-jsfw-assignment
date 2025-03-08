import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { ProductDetails } from '@/components/shop/product-details';

import { ApiError, getProductById } from '@/lib/api';

export type paramsType = Promise<{ id: string }>;

type ProductPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  try {
    const { id } = await params;
    const productData = await getProductById(id);
    const product = productData.data;

    return {
      title: `${product.title} | Luxury Store`,
      description: product.description.slice(0, 160),
      openGraph: {
        title: product.title,
        description: product.description.slice(0, 160),
        images: [{ url: product.image.url, alt: product.image.alt }],
        type: 'website',
      },
    };
  } catch {
    // Ignore error, just return default metadata
    return {
      title: 'Product Not Found | Luxury Store',
      description: 'The requested product could not be found.',
    };
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  try {
    const { id } = await params;
    const productData = await getProductById(id);
    const product = productData.data;

    if (!product) {
      notFound();
    }

    return (
      <div className="container mx-auto px-4 py-16">
        <ProductDetails product={product} />
      </div>
    );
  } catch (err) {
    console.error('Error fetching product:', err);

    if (err instanceof ApiError && err.status === 404) {
      notFound();
    }

    throw err; // Let Next.js error boundary handle other errors
  }
}
