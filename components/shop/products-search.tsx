'use client';

import { useEffect, useState } from 'react';

import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp, Filter, Loader2, Search, SlidersHorizontal, X } from 'lucide-react';

import { ProductCard } from '@/components/shop/product-card';
import { Input } from '@/components/ui/input';

import { useDebounce } from '@/lib/hooks/use-debounce';
import { Product } from '@/lib/types';

interface ProductsSearchProps {
  initialProducts: Product[];
}

type SortOption = 'default' | 'price-low' | 'price-high' | 'rating-high' | 'name-asc' | 'name-desc';

export function ProductsSearch({ initialProducts }: ProductsSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(initialProducts);
  const [isSearching, setIsSearching] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [minRating, setMinRating] = useState<number>(0);
  const [sortOption, setSortOption] = useState<SortOption>('default');
  const [activeTags, setActiveTags] = useState<Set<string>>(new Set());
  const [availableTags, setAvailableTags] = useState<string[]>([]);

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  // Extract all unique tags from products
  useEffect(() => {
    const tagSet = new Set<string>();
    initialProducts.forEach((product) => {
      product.tags.forEach((tag) => tagSet.add(tag));
    });
    setAvailableTags(Array.from(tagSet).sort());
  }, [initialProducts]);

  // Only perform API search if query is non-empty
  useEffect(() => {
    const performSearch = async () => {
      if (debouncedSearchQuery.trim() === '') {
        setProducts(initialProducts);
        return;
      }

      try {
        setIsSearching(true);
        const { searchProducts } = await import('@/lib/api');
        const results = await searchProducts(debouncedSearchQuery);
        setProducts(results.data);
      } catch (error) {
        console.error('Search failed:', error);
        // Fallback to client-side filtering
        const filtered = initialProducts.filter((product) =>
          product.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase()),
        );
        setProducts(filtered);
      } finally {
        setIsSearching(false);
      }
    };

    performSearch();
  }, [debouncedSearchQuery, initialProducts]);

  // Apply filters and sorting
  useEffect(() => {
    let result = [...products];

    // Apply price filter
    result = result.filter(
      (product) => product.discountedPrice >= priceRange[0] && product.discountedPrice <= priceRange[1],
    );

    // Apply rating filter
    result = result.filter((product) => product.rating >= minRating);

    // Apply tag filters
    if (activeTags.size > 0) {
      result = result.filter((product) => product.tags.some((tag) => activeTags.has(tag)));
    }

    // Apply sorting
    switch (sortOption) {
      case 'price-low':
        result.sort((a, b) => a.discountedPrice - b.discountedPrice);
        break;
      case 'price-high':
        result.sort((a, b) => b.discountedPrice - a.discountedPrice);
        break;
      case 'rating-high':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'name-asc':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'name-desc':
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        // Default sorting (no specific sort)
        break;
    }

    setFilteredProducts(result);
  }, [products, priceRange, minRating, sortOption, activeTags]);

  const handleTagToggle = (tag: string) => {
    const newActiveTags = new Set(activeTags);
    if (newActiveTags.has(tag)) {
      newActiveTags.delete(tag);
    } else {
      newActiveTags.add(tag);
    }
    setActiveTags(newActiveTags);
  };

  const resetFilters = () => {
    setPriceRange([0, 2000]);
    setMinRating(0);
    setSortOption('default');
    setActiveTags(new Set());
  };

  // Container animation for staggered children
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  // Animation for individual product items
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-playfair mb-4">Our Collection</h2>
          <p className="text-gray-600 max-w-2xl mx-auto font-montserrat">
            Browse our carefully curated selection of luxury items, designed to elevate your lifestyle
          </p>
        </div>

        <div className="max-w-xl mx-auto">
          <div className="relative flex items-center gap-3">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 border-2 focus:border-black transition-colors duration-200"
              />
              {isSearching && (
                <Loader2
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 animate-spin"
                  size={18}
                />
              )}
            </div>
            <button
              className={`p-3 rounded-md transition-colors duration-200 ${isFilterOpen ? 'bg-black text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <SlidersHorizontal size={20} />
            </button>
          </div>

          {/* Filter and sort panel */}
          {isFilterOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4 p-4 border border-gray-200 rounded-lg shadow-md bg-white"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <Filter size={16} /> Filter & Sort
                </h3>
                <button onClick={resetFilters} className="text-sm text-gray-500 hover:text-black">
                  Reset
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Price Range */}
                <div>
                  <h4 className="font-medium mb-2">Price Range</h4>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      min={0}
                      max={priceRange[1]}
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                      className="w-24"
                    />
                    <span>to</span>
                    <Input
                      type="number"
                      min={priceRange[0]}
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                      className="w-24"
                    />
                  </div>
                </div>

                {/* Min Rating */}
                <div>
                  <h4 className="font-medium mb-2">Minimum Rating</h4>
                  <div className="flex items-center">
                    <input
                      type="range"
                      min={0}
                      max={5}
                      step={0.5}
                      value={minRating}
                      onChange={(e) => setMinRating(Number(e.target.value))}
                      className="w-full mr-2"
                    />
                    <span className="min-w-8 text-center">{minRating}</span>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="mt-4">
                <h4 className="font-medium mb-2">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {availableTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => handleTagToggle(tag)}
                      className={`px-3 py-1 text-sm rounded-full ${
                        activeTags.has(tag) ? 'bg-black text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort Options */}
              <div className="mt-4">
                <h4 className="font-medium mb-2">Sort By</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  <button
                    onClick={() => setSortOption('default')}
                    className={`px-3 py-2 text-sm rounded ${
                      sortOption === 'default' ? 'bg-black text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Default
                  </button>
                  <button
                    onClick={() => setSortOption('price-low')}
                    className={`px-3 py-2 text-sm rounded flex items-center justify-center gap-1 ${
                      sortOption === 'price-low' ? 'bg-black text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Price <ChevronDown size={14} />
                  </button>
                  <button
                    onClick={() => setSortOption('price-high')}
                    className={`px-3 py-2 text-sm rounded flex items-center justify-center gap-1 ${
                      sortOption === 'price-high'
                        ? 'bg-black text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Price <ChevronUp size={14} />
                  </button>
                  <button
                    onClick={() => setSortOption('rating-high')}
                    className={`px-3 py-2 text-sm rounded ${
                      sortOption === 'rating-high'
                        ? 'bg-black text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Top Rated
                  </button>
                  <button
                    onClick={() => setSortOption('name-asc')}
                    className={`px-3 py-2 text-sm rounded ${
                      sortOption === 'name-asc' ? 'bg-black text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Name (A-Z)
                  </button>
                  <button
                    onClick={() => setSortOption('name-desc')}
                    className={`px-3 py-2 text-sm rounded ${
                      sortOption === 'name-desc' ? 'bg-black text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Name (Z-A)
                  </button>
                </div>
              </div>

              {/* Active filters */}
              {(activeTags.size > 0 ||
                minRating > 0 ||
                priceRange[0] > 0 ||
                priceRange[1] < 2000 ||
                sortOption !== 'default') && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Active filters:</span>
                    <div className="flex flex-wrap gap-2">
                      {minRating > 0 && (
                        <span className="bg-gray-100 text-xs px-2 py-1 rounded-full flex items-center">
                          Rating: {minRating}+
                          <button onClick={() => setMinRating(0)} className="ml-1 text-gray-500 hover:text-black">
                            <X size={12} />
                          </button>
                        </span>
                      )}
                      {(priceRange[0] > 0 || priceRange[1] < 2000) && (
                        <span className="bg-gray-100 text-xs px-2 py-1 rounded-full flex items-center">
                          Price: ${priceRange[0]} - ${priceRange[1]}
                          <button
                            onClick={() => setPriceRange([0, 2000])}
                            className="ml-1 text-gray-500 hover:text-black"
                          >
                            <X size={12} />
                          </button>
                        </span>
                      )}
                      {sortOption !== 'default' && (
                        <span className="bg-gray-100 text-xs px-2 py-1 rounded-full flex items-center">
                          Sort: {sortOption.replace('-', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                          <button
                            onClick={() => setSortOption('default')}
                            className="ml-1 text-gray-500 hover:text-black"
                          >
                            <X size={12} />
                          </button>
                        </span>
                      )}
                      {Array.from(activeTags).map((tag) => (
                        <span key={tag} className="bg-gray-100 text-xs px-2 py-1 rounded-full flex items-center">
                          {tag}
                          <button onClick={() => handleTagToggle(tag)} className="ml-1 text-gray-500 hover:text-black">
                            <X size={12} />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </motion.div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 font-montserrat">No products found. Try adjusting your filters or search.</p>
        </div>
      ) : (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12"
        >
          {filteredProducts.map((product) => (
            <motion.div key={product.id} variants={item}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Product count */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-8 text-right text-sm text-gray-500 font-montserrat"
      >
        Showing {filteredProducts.length}{' '}
        {searchQuery.trim() !== '' ? 'matching products' : `of ${products.length} products`}
      </motion.div>
    </>
  );
}
