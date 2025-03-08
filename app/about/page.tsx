'use client';

import { motion } from 'framer-motion';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[50vh] bg-black text-white flex items-center justify-center">
        <div className="absolute inset-0 bg-[url('/images/about-hero.jpg')] bg-cover bg-center opacity-50" />
        <div className="relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-playfair mb-6"
          >
            Our Story
          </motion.h1>
        </div>
      </section>

      {/* Content Sections */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Mission Statement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-playfair mb-6">Our Mission</h2>
            <p className="text-gray-600 font-montserrat leading-relaxed">
              At Luxur, we believe in curating the finest luxury items from around the world. Our mission is to provide
              our discerning customers with unparalleled quality, exceptional service, and a seamless shopping
              experience.
            </p>
          </motion.div>

          {/* Values */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          >
            <div className="text-center">
              <h3 className="font-playfair text-xl mb-4">Quality</h3>
              <p className="text-gray-600 font-montserrat">
                We source only the highest quality products from trusted artisans and luxury brands.
              </p>
            </div>
            <div className="text-center">
              <h3 className="font-playfair text-xl mb-4">Authenticity</h3>
              <p className="text-gray-600 font-montserrat">
                Every item in our collection is guaranteed authentic and comes with a certificate of authenticity.
              </p>
            </div>
            <div className="text-center">
              <h3 className="font-playfair text-xl mb-4">Service</h3>
              <p className="text-gray-600 font-montserrat">
                Our dedicated team provides personalized service to ensure your complete satisfaction.
              </p>
            </div>
          </motion.div>

          {/* History */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-playfair mb-6 text-center">Our History</h2>
            <div className="prose max-w-none font-montserrat text-gray-600 leading-relaxed">
              <p className="mb-4">
                Founded in 2020 in the heart of New York City, Luxur began with a vision to revolutionize the luxury
                shopping experience. What started as a small boutique has grown into a premier destination for luxury
                enthusiasts worldwide.
              </p>
              <p className="mb-4">
                Our journey has been marked by an unwavering commitment to excellence and a deep understanding of our
                customers&apos; desires. We&apos;ve built strong relationships with renowned artisans and brands,
                allowing us to offer an exclusive collection that meets our exacting standards.
              </p>
              <p>
                Today, Luxur stands as a testament to the timeless appeal of luxury, quality, and sophistication. We
                continue to evolve and innovate while staying true to our founding principles.
              </p>
            </div>
          </motion.div>

          {/* Team */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center"
          >
            <h2 className="text-3xl font-playfair mb-6">Our Team</h2>
            <p className="text-gray-600 font-montserrat mb-8">
              Our team of luxury experts is dedicated to providing you with an exceptional shopping experience. With
              years of experience in the luxury industry, we&apos;re here to help you find the perfect pieces for your
              collection.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
