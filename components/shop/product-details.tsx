'use client';

import { memo, useState } from 'react';

import Image from 'next/image';

import { motion } from 'framer-motion';
import { Check, ShoppingCart } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { StarRating } from '@/components/ui/star-rating';
import { useToast } from '@/components/ui/use-toast';

import { useCartStore } from '@/lib/store';
import { Product } from '@/lib/types';
import { calculateDiscount, formatPrice } from '@/lib/utils';

import { ProductReviews } from './product-reviews';

interface ProductDetailsProps {
  product: Product;
}

export const ProductDetails = memo(function ProductDetails({ product }: ProductDetailsProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const { addItem } = useCartStore();
  const { toast } = useToast();

  const hasDiscount = product.price > product.discountedPrice;
  const discount = hasDiscount ? calculateDiscount(product.price, product.discountedPrice) : 0;

  const handleAddToCart = () => {
    setIsAdding(true);

    // Add a small delay to show the loading state
    setTimeout(() => {
      addItem(product);
      setIsAdding(false);
      setIsAdded(true);

      toast({
        title: 'Added to Cart',
        description: `${product.title} has been added to your cart.`,
      });

      // Reset the button state after 1.5 seconds
      setTimeout(() => {
        setIsAdded(false);
      }, 1500);
    }, 300);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      {/* Product Image */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="relative aspect-square rounded-lg overflow-hidden bg-gray-100"
      >
        <Image
          src={product.image.url}
          alt={product.image.alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
        {hasDiscount && (
          <div className="absolute top-4 right-4 bg-black text-white px-4 py-2 rounded-full text-sm font-montserrat">
            {discount}% OFF
          </div>
        )}
      </motion.div>

      {/* Product Details */}
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
        <h1 className="text-4xl font-playfair mb-4">{product.title}</h1>

        <div className="flex items-center gap-4 mb-6">
          <span className="text-3xl font-montserrat">{formatPrice(product.discountedPrice)}</span>
          {hasDiscount && (
            <span className="text-xl text-gray-500 line-through font-montserrat">{formatPrice(product.price)}</span>
          )}
        </div>

        <div className="mb-8">
          <StarRating rating={product.rating} size="lg" showCount={true} reviewCount={product.reviews.length} />
        </div>

        {product.tags.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {product.tags.map((tag) => (
              <span key={tag} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-xs font-montserrat">
                {tag}
              </span>
            ))}
          </div>
        )}

        <p className="text-gray-600 mb-8 font-montserrat leading-relaxed">{product.description}</p>

        <Button
          onClick={handleAddToCart}
          size="lg"
          className="w-full md:w-auto mb-10 group"
          disabled={isAdding || isAdded}
        >
          {isAdding ? (
            <span className="flex items-center gap-2">
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Adding...
            </span>
          ) : isAdded ? (
            <span className="flex items-center gap-2">
              <Check size={16} />
              Added to Cart
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <ShoppingCart size={16} className="transition-transform group-hover:scale-110" />
              Add to Cart
            </span>
          )}
        </Button>

        {/* Reviews Section */}
        {product.reviews.length > 0 && <ProductReviews reviews={product.reviews} />}
      </motion.div>
    </div>
  );
});
