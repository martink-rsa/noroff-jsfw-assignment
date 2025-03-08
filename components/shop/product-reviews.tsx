'use client';

import { memo, useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, User } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { StarRating } from '@/components/ui/star-rating';

import { Review } from '@/lib/types';

interface ProductReviewsProps {
  reviews: Review[];
}

export const ProductReviews = memo(function ProductReviews({ reviews }: ProductReviewsProps) {
  const [expanded, setExpanded] = useState(false);

  // Show first 3 reviews initially, then all when expanded
  const displayedReviews = expanded ? reviews : reviews.slice(0, 3);
  const hasMoreReviews = reviews.length > 3;

  // Calculate average rating
  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  // Container animation
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  // Item animation
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <div className="mt-12 pt-8 border-t">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-playfair">Customer Reviews</h2>
        <div className="flex items-center gap-2">
          <StarRating rating={averageRating} size="md" />
          <span className="text-sm text-gray-600 font-montserrat">
            ({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})
          </span>
        </div>
      </div>

      <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
        <AnimatePresence>
          {displayedReviews.map((review) => (
            <motion.div key={review.id} variants={item} exit={{ opacity: 0, height: 0 }} className="border-b pb-6">
              <div className="flex items-start gap-3">
                <div className="bg-gray-100 rounded-full p-2 mt-1">
                  <User size={16} className="text-gray-600" />
                </div>

                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="font-montserrat font-medium">{review.username}</span>
                    <div className="flex-1 min-w-[120px]">
                      <StarRating rating={review.rating} size="sm" />
                    </div>
                  </div>
                  <p className="text-gray-600 font-montserrat">{review.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {hasMoreReviews && (
        <div className="mt-6 text-center">
          <Button variant="outline" onClick={() => setExpanded(!expanded)} className="group">
            <span>{expanded ? 'Show Less' : 'Show All Reviews'}</span>
            <ChevronDown className={`ml-2 h-4 w-4 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`} />
          </Button>
        </div>
      )}
    </div>
  );
});
