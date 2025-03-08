'use client';

import { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { useCartStore } from '@/lib/store';
import { formatPrice } from '@/lib/utils';

export default function CartPage() {
  const router = useRouter();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const { items, total, removeItem, updateQuantity, clearCart } = useCartStore();

  const handleCheckout = () => {
    setIsCheckingOut(true);

    setTimeout(() => {
      clearCart();
      router.push('/checkout-success');
    }, 1000);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemAnimation = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
    exit: { opacity: 0, x: -20 },
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <ShoppingBag className="mx-auto h-20 w-20 text-gray-300 mb-6" />
          <h1 className="text-4xl font-playfair mb-6">Your Cart is Empty</h1>
          <p className="text-gray-600 font-montserrat mb-8 max-w-md mx-auto">
            Looks like you haven&apos;t added any items to your cart yet. Explore our products and find something
            you&apos;ll love.
          </p>
          <Button asChild size="lg">
            <Link href="/">Continue Shopping</Link>
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-playfair mb-12"
      >
        Shopping Cart
      </motion.h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
            <AnimatePresence mode="wait">
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  variants={itemAnimation}
                  exit="exit"
                  className="flex flex-col sm:flex-row gap-6 pb-8 border-b"
                >
                  <div className="relative aspect-square w-full sm:w-32 h-32 flex-shrink-0">
                    <Image
                      src={item.image.url}
                      alt={item.image.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, 128px"
                      className="object-cover rounded-lg"
                    />
                  </div>

                  <div className="flex-grow">
                    <div className="flex justify-between">
                      <Link href={`/product/${item.id}`} className="font-playfair text-lg hover:underline">
                        {item.title}
                      </Link>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-gray-500 hover:text-red-500 transition-colors"
                        aria-label={`Remove ${item.title} from cart`}
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>

                    <div className="mt-2">
                      <span className="font-montserrat">{formatPrice(item.discountedPrice)}</span>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center gap-4">
                      <div className="flex items-center border rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="p-2 hover:bg-gray-100 transition-colors"
                          aria-label="Decrease quantity"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className={`h-4 w-4 ${item.quantity <= 1 ? 'text-gray-300' : ''}`} />
                        </button>
                        <span className="w-12 text-center font-montserrat">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 hover:bg-gray-100 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <span className="font-montserrat text-gray-500">
                        Total: {formatPrice(item.discountedPrice * item.quantity)}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-1"
        >
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <h2 className="font-playfair text-2xl mb-6 ">Order Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between font-montserrat">
                <span>Subtotal</span>
                <span>{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between font-montserrat">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="border-t pt-4 flex justify-between font-montserrat font-medium">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
            <Button
              onClick={handleCheckout}
              className="w-full mt-8 h-12 bg-black hover:bg-gray-800 group text-white"
              size="lg"
              disabled={isCheckingOut}
            >
              {isCheckingOut ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                <span className="flex items-center">
                  Proceed to Checkout
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              )}
            </Button>

            <div className="mt-6 text-center">
              <Link href="/" className="text-sm text-gray-600 hover:text-black transition-colors font-montserrat">
                Continue Shopping
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
