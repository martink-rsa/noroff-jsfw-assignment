'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section className="relative h-[85vh] bg-black text-white flex items-center justify-center overflow-hidden">
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 25, ease: 'easeOut' }}
        className="absolute inset-0 bg-[url('https://plus.unsplash.com/premium_photo-1683140737936-7a4ae1e6b5a6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center opacity-60"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/60" />

      <div className="relative z-10 text-center max-w-4xl px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="mb-3 text-sm uppercase tracking-[0.3em] font-montserrat"
        >
          Exclusive Collection
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-playfair mb-6 leading-tight"
        >
          Discover <span className="italic">Luxury</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl font-montserrat mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          Explore our curated collection of premium products, hand-selected for those who appreciate the finer things in
          life
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col items-center gap-10"
        >
          <Button
            size="lg"
            asChild
            className="rounded-full px-8 text-base h-12 border-2 text-white bg-black/40 hover:bg-white hover:text-black transition-all duration-300"
          >
            <a href="#products">Shop Now</a>
          </Button>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="opacity-70 cursor-pointer"
          >
            <a href="#products">
              <ChevronDown size={32} />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
