'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';

export function AutumnSaleBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8 }}
      className="mt-24 mb-12 overflow-hidden relative"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-amber-900 to-black z-0" />

      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
        className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full border border-amber-500/20 z-0"
      />

      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: -360 }}
        transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
        className="absolute bottom-0 right-0 translate-x-1/3 translate-y-1/3 w-[400px] h-[400px] rounded-full border-2 border-amber-500/10 z-0"
      />

      <div className="relative z-10 py-16 px-8 md:py-20 md:px-16 lg:py-24 lg:px-20 flex flex-col md:flex-row items-center justify-between gap-10">
        <div className="text-center md:text-left max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-amber-400 font-montserrat uppercase tracking-widest text-sm mb-4"
          >
            Limited Time Offer
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-playfair mb-6 text-white"
          >
            Autumn <span className="text-amber-400 italic">Collection</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-montserrat mb-8 text-white/80 leading-relaxed"
          >
            Embrace the season with our exclusive autumn collection. Enjoy up to 30% off on selected luxury items, only
            until November 30th.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Button
              variant="outline"
              className="rounded-full border-2 border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-black px-8 h-12 group"
            >
              <span>Shop the Sale</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="hidden lg:block"
        >
          <div className="relative">
            <div className="absolute -inset-4 rounded-full bg-amber-500/50 blur-lg"></div>
            <div className="relative bg-amber-400 text-white font-playfair text-8xl font-bold rounded-full flex items-center justify-center w-40 h-40">
              30%
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
