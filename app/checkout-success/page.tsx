'use client';

import Link from 'next/link';

import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';

export default function CheckoutSuccessPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
          }}
          className="flex justify-center mb-8"
        >
          <CheckCircle className="h-24 w-24 text-green-500" />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <h1 className="text-4xl font-playfair mb-6">Thank You for Your Order!</h1>
          <p className="text-gray-600 font-montserrat mb-8 leading-relaxed">
            Your order has been successfully placed. We&apos;ll send you an email with your order details and tracking
            information once your package ships.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link href="/">Continue Shopping</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/dashboard">View Order History</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
