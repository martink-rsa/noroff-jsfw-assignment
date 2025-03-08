'use client';

import { memo } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { motion } from 'framer-motion';

import { StarRating } from '@/components/ui/star-rating';

import { Product } from '@/lib/types';
import { calculateDiscount, formatPrice, truncateText } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = memo(function ProductCard({ product }: ProductCardProps) {
  const hasDiscount = product.price > product.discountedPrice;
  const discount = hasDiscount ? calculateDiscount(product.price, product.discountedPrice) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.4 }}
    >
      <Link href={`/product/${product.id}`} className="group block h-full">
        <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
          <Image
            src={product.image.url}
            alt={product.image.alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {hasDiscount && (
            <div className="absolute top-4 right-4 bg-black text-white px-3 py-1 rounded-full text-sm font-montserrat z-10">
              {discount}% OFF
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        <div className="mt-4 space-y-2">
          <h3 className="font-playfair text-lg group-hover:underline transition-all duration-200 line-clamp-1">
            {product.title}
          </h3>

          <div className="flex items-center gap-2">
            <span className="font-montserrat text-lg">{formatPrice(product.discountedPrice)}</span>
            {hasDiscount && (
              <span className="font-montserrat text-sm text-gray-500 line-through">{formatPrice(product.price)}</span>
            )}
          </div>

          <div className="flex items-start justify-between">
            <StarRating rating={product.rating} size="sm" showCount={true} reviewCount={product.reviews.length} />

            {product.tags.length > 0 && (
              <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">{product.tags[0]}</span>
            )}
          </div>

          <p className="text-sm text-gray-600 line-clamp-2 min-h-[2.5rem]">{truncateText(product.description, 75)}</p>
        </div>
      </Link>
    </motion.div>
  );
});
